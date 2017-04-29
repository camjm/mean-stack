module.exports = function(app, passport) {

  // TODO: see http://passportjs.org/docs#authenticate
  // If authentication succeeds, the next handler will be invoked and the req.user property will be set to the authenticated user.
  // By default, if authentication fails, Passport will respond with a 401 Unauthorized status
  // app.post('/login',
  //   passport.authenticate('local-login'),
  //   function(req, res) {
  //     res.json(req.user);
  //   });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login', // if not specifed, responds with HTTP 401
    failureFlash: true // allow flash messages
  }));

  // passport strategy authenticates request, and handles success/failure
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup', // if not specifed, responds with HTTP 401
    failureFlash: true // allow flash messages
  }));

  // TODO: should this route be moved to frontend.js?
  app.get('/logout', function(req, res) {
    req.logout(); // method provided by passport
    res.redirect('/');
  });

  // sends the user to google to authenticate
  app.get('/google', passport.authenticate('google', {
    // the scope specifies the permissions the users will be asked for
    scope: ['profile', 'email']
  }));

  // url google sends user back to with token and profile
  app.get('/google/callback', passport.authenticate('google', {
    // handle the callback after google has authenticated the user
    successRedirect: '/profile',
    failureRedirect: '/'
  }));

}
