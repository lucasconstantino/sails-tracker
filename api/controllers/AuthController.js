/**
 * AuthController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var passport = require('passport');

module.exports = {

  /**
   * Perform login.
   */
  login: function (req, res) {

    /**
     * Handles any error during login attempt.
     */
    function loginError(info) {
      var message = 'authentication failed';
      if (info) {
        message += ': ';
        if (typeof info == 'string') message += info;
        if (info.message) message += info.message;
      }
      return res.send(401, message);
    }

    if (!req.body.email) res.send(401, 'missing email');
    if (!req.body.password) res.send(401, 'missing password');

    // Attempt to login using local strategy.
    // @todo: this could be enhanced to allow other kinds of authentication.
    passport.authenticate('local', function (err, user, info) {
      if (err || !user) return loginError(info);
      req.login(user, function (err) {
        if (err) return loginError();
        return res.send(200, 'login successfully');
      });
    })(req, res);
  },

  /**
   * Perform logout.
   */
  logout: function (req, res) {
    req.logout();
    res.send(200, 'logout successfully')
  },

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to AuthController)
   */
  _config: {}

  
};
