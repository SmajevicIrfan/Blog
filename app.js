/* global __dirname */
/* global process */

var express = require('express');
var http = require('http');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var app = express();

// All environments
var sessionSecret = process.env.SESSION_SECRET ||
					'thesalviansunwashittinghereyessothatshelookedthemostbeautifulever';
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Auth stuff
var auth = require('./config/auth.js').primary(passport);

app.use(session({ secret: sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

// Setting of routes
var routes = require('./routes');
var users = require('./routes/user.js')(passport);

app.use('/', routes);
app.use('/user', users);

var server = http.createServer(app);

server.listen(app.get('port'), '0.0.0.0');
console.log('Server listening on port: ' + app.get('port') + '. If not an error occured.');