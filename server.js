// MODULES
var path = require('path')
var morgan = require('morgan');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// APP
var app = express();

// CONFIGURATION

// configuration file
var db = require('./config/db');

// set port
var port = process.env.PORT || 8080;

// connect to mongoDB database
mongoose.connect(db.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db');
});

// MIDDLEWARE: run in order

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location: '/public/img' will be '/img' for users
app.use(express.static(path.join(__dirname, '/public')));

// log all requests to the console
app.use(morgan('dev'));

// ROUTES

// configure routes
var apiRouter = express.Router();
require('./app/backendRoutes')(apiRouter);
require('./app/frontEndRoutes')(app);
app.use('/api', apiRouter);

// VIEWS
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

// START SERVER

// startup app at http://localhost:8080
app.listen(port);
console.log('listening on port ' + port);

// expose app
exports = module.exports = app;
