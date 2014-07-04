/**
 * User
 *
 * @module      :: Model
 * @description :: This model represents a user with authentication to the
 *                 application.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
  	email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },

    /**
     * Overrides the toJSON method to always remove password, as this could
     * leed to a security flaw.
     */
    toJSON: function () {
      var plain = this.toObject();
      delete plain.password;
      return obj;
    }
  },

  /**
   * Encrypt password before creating a new user.
   */
  beforeCreate: function (user, cb) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) cb(err);
        user.password = hash;
        cb(null, user);
      });
    });
  }

};
