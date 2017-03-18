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

};
