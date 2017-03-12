// The backend API CRUD routes

// database model
var Nerd = require('./models/nerd');

module.exports = function(app) {

  // SERVER ROUTES

  // api routes

  // Get All
  app.get('/api/nerds', function(req, res) {
    // use mongoose to get all nerds from db
    Nerd.find(function(err, nerds) {
      if (err) {
        // nothing after res.send will execute
        res.send(err);
      }
      // return all nerds in JSON format
      res.json(nerds);
    });
  });

  // Create (and send back all)
  app.post('/api/nerds', function(req, res) {
    // create the nerd from the ajax request
    Nerd.create({
      name: req.body.text
    }, function(err, nerd) {
      if (err) {
        res.send(err);
      }
      // use mongoose to get all nerds from db
      Nerd.find(function(err, nerds) {
        if (err) {
          // nothing after res.send will execute
          res.send(err);
        }
        // return all nerds in JSON format
        res.json(nerds);
      });
    });
  });

  // Delete (and send back all remaining)
  app.delete('/api/nerds/:nerd_id', function(req, res) {
    // delete the nerd specified in the request params
    Nerd.remove({
      _id : req.params.nerd_id
    }, function(err, nerd){
      if (err) {
        res.send(err);
      }
      // use mongoose to get all nerds from db
      Nerd.find(function(err, nerds) {
        if (err) {
          // nothing after res.send will execute
          res.send(err);
        }
        // return all nerds in JSON format
        res.json(nerds);
      });
    });
  });

  // authentication routes

  //TODO:

  // FRONTEND ROUTES

  // Angular partial views
  app.get('/partials/*', function(req, res, next) {
    res.render('.' + req.path);
  });

  // handle Angular SPA request (for all other routes)
  app.get('*', function(req, res) {
    res.render('index');
  });

};
