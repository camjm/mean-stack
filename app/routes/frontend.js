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

  // passport strategy authenticates request, and handles success/failure
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup', // if not specifed, responds with HTTP 401
    failureFlash: true // allow flash messages
  }));

  // handle Angular SPA request (for all other routes)
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
