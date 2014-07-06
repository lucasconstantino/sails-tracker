/**
 * User
 *
 * @module      :: Model
 * @description :: This model represents a user with authentication to the
 *                 application.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');

/**
 * Encrypts the password before persisting.
 */
function hashPassword(user, done) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) done(err);
      user.password = hash;
      done();
    });
  });
}

module.exports = {

  attributes: {
  	email: {
      required: true,
      type: 'string',
      unique: true
    },
    password: {
      required: true,
      type: 'string'
    },

    /**
     * Overrides the toJSON method to always remove password, as this could
     * leed to a security flaw.
     */
    toJSON: function () {
      var plain = this.toObject();
      delete plain.password;
      return plain;
    }
  },

  /**
   * Encrypt password before creating a new user.
   */
  beforeCreate: function (user, cb) {
    hashPassword(user, cb);
  },

  /**
   * Encrypt password before updating a new user.
   */
  beforeUpdate: function (user, cb) {
    if (!user.password) return cb();
    hashPassword(user, cb);
  }

};
