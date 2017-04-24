module.exports = function(app, passport) {

  // TODO: authentication routes

  app.get('/partials/login', function(req, res) {
    // render page and pass any flash data in the session
    res.render('./partials/login', {
      message: req.flash('loginMessage')
    });
  });

  app.get('/partials/signup', function(req, res) {
    // render page and pass any flash data in the session
    res.render('./partials/signup', {
      message: req.flash('signupMessage')
    });
  });

  // protected route: isLoggedIn
  app.get('/partials/profile', isLoggedIn, function(req, res) {
    res.render('./partials/profile', {
      user: req.user // get user from session and pass to template
    });
  });

  app.get('/logout', function(req, res) {
    req.logout(); // method provided by passport
    res.redirect('/');
  });

  // for the rest of the Angular partial views
  app.get('/partials/*', function(req, res, next) {
    res.render('.' + req.path);
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login', // if not specifed, responds with HTTP 401
    failureFlash: true // allow flash messages
  }));

  // TODO: see http://passportjs.org/docs#authenticate
  // If authentication succeeds, the next handler will be invoked and the req.user property will be set to the authenticated user.
  // By default, if authentication fails, Passport will respond with a 401 Unauthorized status
  // app.post('/login',
  //   passport.authenticate('local-login'),
  //   function(req, res) {
  //     res.json(req.user);
  //   });

  // passport strategy authenticates request, and handles success/failure
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup', // if not specifed, responds with HTTP 401
    failureFlash: true // allow flash messages
  }));

  // the scope specifies the permissions the users will be asked for
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  // handle the callback after google has authenticated the user
  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/'
  }));

  // handle Angular SPA request (for all other routes) TODO: use '/' instead
  app.get('*', function(req, res) {
    res.render('index');
  });

  // route middleware: make sure user is logged in
  function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
      return next();
    }

    // otherwise, redirect user toe the home page
    res.redirect('/');
  };

};
