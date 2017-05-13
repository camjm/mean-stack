/*
Holds the configuration for the passportjs strategies (local, facebook, twitter, google)
*/

var User = require('../app/models/user');

var configAuth = require('./authentication');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(passport) {

  /* PASSPORT SESSION SETUP
   * Passport piggybacks off the Express session to store data for authenticated users
   * for persistent login sessions, passport needs to serialize and unserialize
   * users out of session
   */

  // how to serialize the user for the cookie
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // how to deserialize the user, to set to req.user, from the cookie
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  /* LOCAL SIGNUP
   * because we're using multiple local strategies (one for signup, one for login),
   * we should use named strategies - otherwise both default to 'local'
   */

  passport.use('local-signup', new LocalStrategy({
      // override passport defaults because we're using 'email', not 'username'
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    // callback with email and password from the signup form
    function(req, email, password, done) {
      // asynchronous: required for User.findOne?
      process.nextTick(function() {
        // checking if the user trying to login already exists
        User.findOne({
          'local.email': email
        }, function(err, user) {
          if (err) {
            // database error: handled by Express, generates a HTTP 500 response
            return done(err);
          }
          // check if there is already a user with this email
          if (user) {
            // authentication failed: user already exists - return false
            var info = {'signupMessage': 'That email is already used.'}
            return done(null, false, info);
          } else {
            // create the new user
            var newUser = new User();
            // set the new user's local credentials
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);
            // save the new user
            newUser.save(function(err) {
              if (err) {
                // database error: handled by Express, generates a HTTP 500 response
                return done(err);
              }
              // Signup authentication successful: return new user
              return done(null, newUser);
            });
          }
        });
      });
    }));

  /* LOCAL LOGIN
   * because we're using multiple local strategies (one for signup, one for login),
   * we should use named strategies - otherwise both default to 'local'
   */

  passport.use('local-login', new LocalStrategy({
      // override passport defaults because we're using 'email', not 'username'
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    // callback with email and password from the login form
    function(req, email, password, done) {
      // get user trying to log in
      User.findOne({
        'local.email': email
      }, function(err, user) {
        if (err) {
          // database error: handled by Express, generates a HTTP 500 response
          return done(err);
        }
        // check user exists
        if (!user) {
          // authentication failed: user doesn't exist - return false
          var info = {'loginMessage': 'User not found.'};
          return done(null, false, info);
        }
        // check password is valid
        if (!user.validPassword(password)) {
          // authentication failed: password not correct - return false
          var info = {'loginMessage': 'Oops! wrong password.'};
          return done(null, false, info);
        }
        // login authentication successful: return user
        return done(null, user);
      });
    }));

  /* GOOGLE LOGIN
   * google login
   */

  passport.use(new GoogleStrategy(configAuth.googleAuth,
    // handle the data that gets sent back from google
    function(token, refreshToken, profile, done) {
      // asynchronous: User.findOne won't fire until data comes back from Google
      process.nextTick(function() {
        // find the user based on their google id
        User.findOne({
          'google.id': profile.id
        }, function(err, user) {
          if (err) {
            // database error: handled by Express, generates a HTTP 500 response
            return done(err);
          }
          if (user) {
            // if found, log the user in
            return done(null, user);
          } else {
            // user isn't in database - create new user
            var newUser = new User();
            // update the new user's google information
            newUser.google.id = profile.id;
            newUser.google.token = token;
            newUser.google.name = profile.displayName;
            newUser.google.email = profile.emails[0].value;
            // save the new user
            newUser.save(function(err) {
              return done(err, newUser);
            });
          }
        });
      });
    }));

};
