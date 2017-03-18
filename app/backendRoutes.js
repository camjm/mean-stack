// The backend API CRUD routes

// database model
var Nerd = require('./models/nerd');

module.exports = function(app) {

  // Get All
  app.get('/nerds', function(req, res) {
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
  app.post('/nerds', function(req, res) {
    // create the nerd from the ajax request
    Nerd.create({
      name: req.body.name
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
  app.delete('/nerds/:nerd_id', function(req, res) {
    // delete the nerd specified in the request params
    Nerd.remove({
      _id: req.params.nerd_id
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

};
