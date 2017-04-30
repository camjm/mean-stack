module.exports = function(app) {

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

  // for the rest of the Angular partial views
  app.get('/partials/*', function(req, res, next) {
    res.render('.' + req.path);
  });

  // handle Angular SPA request (for all other routes) TODO: use '/' instead
  app.get('/', function(req, res) {
    res.render('index');
  });

  // route middleware: make sure user is logged in
  function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
      return next();
    }
    // otherwise, redirect user toe the home page
    res.redirect(401, '/login');
  };

};
