/**
 * Passport
 *
 * Passport integration for Sails.js.
 */

var passport = require('passport'),
    sails    = require('sails');

module.exports = {
  express: {
    customMiddleware: function (app) {
      app.use(passport.initialize());
      app.use(passport.session());
      sails.log.debug('express midleware for passport');
    }
  }
};
