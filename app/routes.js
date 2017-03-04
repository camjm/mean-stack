// The backend API CRUD routes

// database model
var Nerd = require('./models/nerd');

module.exports = function(app) {

  // SERVER ROUTES

  // api routes

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

  app.post('/api/nerds', function(req, res) {
    //TODO:
  });

  app.delete('/api/nerds', function(req, res) {
    //TODO:
  });

  // authentication routes

  //TODO:


  // FRONTEND routes

  // handle Angular SPA request (for all other routes)
  app.get('*', function(req, res) {
    res.sendfile('./public/views/index.html');
  });


};
