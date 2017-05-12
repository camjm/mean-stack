module.exports = function(app, passport) {

  /*
   * Process the login form with a custom callback: it's the application's
   * responsibility to establish a session by callking req.login() and send a response
   */
  app.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err) {
        return next(err); // generate HTTP 500 error
      }
      if (!user) {
        return res.json(info);
      }
      req.login(user, function(err) {
        if (err) {
          return next(err);
        }
        res.json(user);
      });
    })(req, res, next);
  });

  /*
   * Process the signup form with a custom callback: the passport stragegy
   * authenticates the request
   */
  app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json(info);
      }
      req.login(user, function(err) {
        if (err) {
          return next(err);
        }
        res.json(user);
      });
    })(req, res, next);
  });

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
