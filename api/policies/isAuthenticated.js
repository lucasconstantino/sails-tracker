/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Passport authentication police.
 *
 */

module.exports = function(req, res, next) {
  return req.isAuthenticated() ? next() : res.forbidden('not authenticated');
};
