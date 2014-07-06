/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!documentation/
 */


module.exports.policies = {

  '*': 'isAuthenticated',

  // Allow anonymous to new user registering.
  UserController: {
    '*': ['isAuthenticated', 'self'],
    'find': true,
    'findOne': true,
    'create': true
  },

  // Allow public access to all authentication methods.
  AuthController: {
   '*': true
  },

  OrganizationController: {
    '*': ['isAuthenticated', 'isOwner']
  }
};
