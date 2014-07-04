/**
 * Passport
 *
 * Passport service definition.
 */

var passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt        = require('bcrypt'),
    sails         = require('sails');

// Passport session setup.
// To support persistent login sessions, Passport needs to be able to
// serialize users into and deserialize users out of the session. Typically,
// this will be as simple as storing the user ID when serializing, and finding
// the user by ID when deserializing.
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findOne(id, done);
});

/**
 * Default local strategy.
 */
function localStrategy(email, password, done) {
  User.findOne({
    email: email
  })
    .then(function (user) {
      if (!user) return done(null, false, {
        message: 'unkown user with e-mail "' + email + '"'
      });

      bcrypt.compare(password, user.password, function (err, res) {
        if (err) return done(err);
        if (!res) return done(null, false, {
          message: 'wrong password for user "' + email + '"'
        });

        return done(null, user);
      });
    })
    .fail(function (err) {
      done(null, false, err);
    });
}

// Use the LocalStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a username and password), and invoke a callback
// with a user object.
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, localStrategy));