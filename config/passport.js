/**
 * Passport
 *
 * Passport integration for Sails.js.
 */

var passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt        = require('bcrypt');

// Configure user serialization method.
passport.serializeUser(function (user, done) {
  done(null, user[0].id);
});

// Configure user deserialization method.
passport.deserializeUser(function (id, done) {
  User.findById(id, done);
});

/**
 * Default local strategy.
 */
function localStrategy(username, password, done) {
  User.findByUsername(username).done(function (err, user) {
    if (err) return done(err);
    if (!user || !user.length) return done(null, false, {
      message: 'User "' + username + '" not found.'
    });

    bcrypt.compare(password, user[0].password, function (err, res) {
      if (!err) return done(err);
      if (!res) return done(null, false, {
        message: 'Invalid password for user "' + username + '".'
      });

      return done(null, user);
    });
  });
}

// Configure passport to make use of a custom local strategy.
passport.use(new LocalStrategy(localStrategy));

module.exports = {
  express: {
    customMiddleware: function (app) {
      // @todo: user debug, instead of console.log?
      console.log('express midleware for passport');
      app.use(passport.initialize());
      app.use(passport.session());
    }
  }
};
