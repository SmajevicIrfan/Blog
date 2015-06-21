var express = require('express');
var http = require('http');
var path = require('path');

var routes = require('./routes')

var app = express();

// All environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

// Setting of routes
app.get('/', routes.index);
app.get('/engineering', routes.engineering);
app.get('/map', routes.map);
app.get('/about', routes.about);
app.get('/contact', routes.contact);

var server = http.createServer(app);

server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
})