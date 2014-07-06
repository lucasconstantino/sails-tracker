/**
 * isOwner
 *
 * @module      :: Policy
 * @description :: Check if current user is the o.
 *
 */

var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');

module.exports = function(req, res, next) {

  var Model = actionUtil.parseModel(req),
      data  = actionUtil.parseValues(req),
      user  = req.user;

  if (user.id != data.id) {
    return res.forbidden('users can only modify themselves.');
  }

  next();
};
