/*
Application Bootstrap
*/

// MODULES
var path = require('path');
var morgan = require('morgan');
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');

var app = express();

// DATABASE CONFIGURATION

// configuration file
var dbConfig = require('./config/database');

// connect to mongoDB database
mongoose.connect(dbConfig.url);

// attach event listeners
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db');
});

// AUTHENTICATION

require('./config/passport')(passport);

// session secret
app.use(session({
  secret: 'thisisreallythesecret',
  saveUnitialized: true,
  resave: false
}));

// persistent login sessions
app.use(passport.initialize());
app.use(passport.session());

// MIDDLEWARE (run in order)

// read cookies for authentication
app.use(cookieParser());

// parse html forms
app.use(bodyParser());

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

var apiRouter = express.Router();
require('./app/routes/backend')(apiRouter);
app.use('/api', apiRouter); // mount

var authRouter = express.Router();
require('./app/routes/authentication')(authRouter, passport);
app.use('/auth', authRouter);

require('./app/routes/frontend')(app);

// VIEWS
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');

// START SERVER

// set port
var port = process.env.PORT || 8080;

// startup localhost app
app.listen(port);
console.log('listening on port ' + port);

// EXPOSE

exports = module.exports = app;
