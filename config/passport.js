/*
Holds the configuration for the passportjs strategies (local, facebook, twitter, google)
*/

var User = require('../app/models/user');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

  /* PASSPORT SESSION SETUP
   * for persistent login sessions, passport needs to serialize and unserialize
   * users out of session
   */

  // how to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // how to deserialize the user from the session
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
      passReqToCallback: true // required for flash data
    },
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
            // authentication error: don't generate error, pass false to next()
            // as user object - this will trigger passport's failureRedirect
            var signupMessage = 'That email is already used.';
            // connect-flash: message stored in session so it can be used in template
            return done(null, false, req.flash('signupMessage', signupMessage));
          } else {
            // create the new user
            var newUser = new User();

            // set the new user's local credentials
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);

            // save the new user
            newUser.save(function(err) {
              if (err) throw err
              return done(null, newUser);
            });
          }
        });

      });

    }));

};


// serializeUser, deserializeUser to store user in the session
