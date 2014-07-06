/**
 * isOwner
 *
 * @module      :: Policy
 * @description :: Check if current user is the o.
 *
 */

var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil'),
    async      = require('async');

module.exports = function(req, res, next) {

  /**
   * Filter when using multiple models.
   */
  function filterMany() {

    // Filter results.
    req.options.where = req.options.where || {};
    req.options.where.createdBy = req.options.where.createdBy || user.id;

    next();
  }

  /**
   * Filter when using specific model.
   */
  function filterOne() {

    var query = Model.findOne(pk).exec(function found(err, record) {
      if (err) return res.serverError(err);

      if (record && record.createdBy != user.id) {
        return res.forbidden('action must be performed by the owner.');
      }
      
      next();
    });
  }

  /**
   * Find the request's Model, if any.
   */
  function getModel() {
    var Model = err = null;

    try {
      Model = actionUtil.parseModel(req);
    } catch(e) {}

    return Model;
  }

  var Model = getModel(),
      pk    = actionUtil.parsePk(req) || null,
      user  = req.user || data.user;

  if (!Model) {
    sails.log.warn('Used "isOwner" policy against a non model controller.');
    next();
  }

  else if (Model.attributes.createdBy) {

    // Configure the filtering.
    pk ? filterOne() : filterMany();

  } else {
    sails.log.warn('Used "isOwner" policy against a model with no "createdBy" attribute.');
    next();
  }
};
