/**
 * addOwner
 *
 * @module      :: Policy
 * @description :: Add owner information to model before performing further
 *                 activities.
 *
 */

var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');

module.exports = function(req, res, next) {

  var Model = actionUtil.parseModel(req),
      data  = actionUtil.parseValues(req),
      user  = req.user || data.user;

  // Fullfill createdBy when empty.
  if (Model.attributes.createdBy) {
    data.createdBy = data.createdBy || user;
  }

  next();
};
