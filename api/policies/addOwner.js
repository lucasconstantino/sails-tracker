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
      data  = actionUtil.parseValues(req);

  // Fullfill createdBy when empty.
  if (Model.attributes.createdBy) {
    data.createdBy = data.createdBy || (req.user && req.user.id || req.user);
  }

  // Continue with parsed data only.
  req.body = data;

  next();
};
