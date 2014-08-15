/**
 * isOwner
 *
 * @module      :: Policy
 * @description :: Check if current user is the o.
 *
 */

var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');

module.exports = function(req, res, next) {

  /**
   * Filter when using multiple models.
   */
  function filterMany() {

    // @todo: find how to construct this criteria.
    // Filter results.
    // req.options.where = req.options.where || {};
    // req.options.where.members = req.options.where.members || [user.id];
    
    Model.find().populate('members').exec(function (err, records) {

      // Filter results.
      req.options.where    = req.options.where || {};
      req.options.where.id = [];

      (records || []).forEach(function (record) {
        var obj = record.toObject();
        (obj.members || []).forEach(function (member) {
          if (member && member.id && member.id == (user && user.id || user)) {
            req.options.where.id.push(obj.id);
          }
        });
      });

      debugger;

      next();
    });
  }

  /**
   * Filter when using specific model.
   */
  function filterOne() {

    Model
      .findOne(pk)
      .exec(function found(err, record) {
        if (err) return res.serverError(err);

        var obj      = record && record.toObject(),
            members  = obj && obj.members || [],
            isMember = false;

        members.forEach(function (member) {
          if (member.id && member.id == (user && user.id || user)) {
            isMember = true;
          }
        });

        if (!isMember) return res.forbidden('only a member is allowed.');
        
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
      pk    = actionUtil.parsePk(req) || req.param('parentid') || null,
      user  = req.user;

  if (!Model) {
    sails.log.warn('Used "isMember" policy against a non model controller.');
    next();
  }

  else if (Model.attributes.createdBy) {

    // Configure the filtering.
    pk ? filterOne() : filterMany();

  } else {
    sails.log.warn('Used "isMember" policy against a model with no "members" attribute.');
    next();
  }
};
