module.exports = function(app) {

  // TODO: authentication routes

  // Angular partial views
  app.get('/partials/*', function(req, res, next) {
    res.render('.' + req.path);
  });

  // handle Angular SPA request (for all other routes)
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/login', function(req, res) {
    // render page and pass any flash data in the session
    res.render('./partials/login', {
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  app.post('/login', function(req, res) {
    //TODO: passport stuff here
  });

  app.get('/signup', function(req, res) {
    // render page and pass any flash data in the session
    res.render('./partials/signup', {
      message: req.flash('signupMessage')
    });
  });

  // process the signup form
  app.post('/signup', function(req, res) {
    //TODO: passport stuff here
  });

  // protected route: isLoggedIn
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('./partials/profile', {
      user: req.user // get user from session and pass to template
    });
  });

  app.get('/logout', function(req, res) {
    req.logout(); // method provided by passport
    res.redirect('/');
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
