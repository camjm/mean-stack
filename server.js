// MODULES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


// CONFIGURATION

// configuration file
var db = require('./config/db');

// set port
var port = process.env.PORT || 8080;

// connect to mongoDB database
// mongoose.connect(db.url);

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location: '/public/img' will be '/img' for users
app.use(express.static(__dirname + '/public'));


// ROUTES

// configure routes
require('./app/routes')(app);


// START SERVER

// startup app at http://localhost:8080
app.listen(port);
console.log('listening on port ' + port);

// expose app
exports = module.exports = app;
