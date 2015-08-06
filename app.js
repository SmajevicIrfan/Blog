/* global __dirname */
/* global process */

var express = require('express');
var http = require('http');
var path = require('path');

var bodyParser = require('body-parser');
var multer = require('multer');

var routes = require('./routes');

var app = express();

// All environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// Middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
/*
app.use(multer()); // for parsing multipart/form-data
*/

// create application/json parser 
var jsonParser = bodyParser.json();
 
// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static(path.join(__dirname, 'public')));

// Setting of routes
app.get('/', routes.index);
app.get('/newPost', routes.newArticle);
app.post('/newPost', routes.create);

var server = http.createServer(app);

server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
}, '0.0.0.0');