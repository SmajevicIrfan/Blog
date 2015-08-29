var express = require('express');
var http = require('http');
var path = require('path');

var session = require('express-session');
var passport = require('./config/passport.js');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

var app = express();

// Connection to the DB
require('./config/mongo-client.js');

// All environments
var sessionSecret = process.env.SESSION_SECRET ||
					'thesalviansunwashittinghereyessothatshelookedthemostbeautifullever';
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, 'public')));

// Auth stuff
app.use(session({ secret: sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var routes = require('./routes');
var users = require('./routes/user.js');
var article = require('./routes/article.js');

app.use('/', routes);
app.use('/user', users);
app.use('/article', article);

// Setting up server
var server = http.createServer(app);

server.listen(app.get('port'), '0.0.0.0');
console.log('Server listening on port: ' + app.get('port') + '. If not an error occured.');