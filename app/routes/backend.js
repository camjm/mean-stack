// The backend API CRUD routes

// database model
var Nerd = require('../models/nerd');

module.exports = function(app) {

  // arbitrary example of middleware
  app.use(function(req, res, next) {
    // middleware can be used for: user authentication, api analytics, input validation, throwing errors
    console.log('call to API');
    next(); // don't stop here, continue down pipeline
  });

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
      nerd.speak();
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

  // Get single
  app.get('/nerds/:nerd_id', function(req, res) {
    // find the nerd specified in the request params
    Nerd.findById(req.params.nerd_id, function(err, nerd) {
      if (err) {
        res.send(err);
      }
      nerd.speak();
      // return single nerd in json format
      res.json(nerd);
    });
  });

  // Update (and send back all)
  app.put('/nerds/:nerd_id', function(req, res) {
    // find the nerd specified in the request params
    Nerd.findOneAndUpdate({ // use .findById()... .save()... instead?
      _id: req.params.nerd_id
    }, req.body, function(err, nerd) {
      if (err) {
        res.send(err);
      }
      nerd.speak();
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
