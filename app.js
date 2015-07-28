var express = require('express');
var http = require('http');
var path = require('path');

var routes = require('./routes');

var app = express();

// All environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
/*
app.use(require('node-sass-middleware')({
	src: path.join(__dirname, 'src'),
	dest: path.join(__dirname, 'public'),
	debug: true,
	outputStyle: 'compressed',
	prefix: '/css'
}));
*/
app.use(express.static(path.join(__dirname, 'public')));

// Setting of routes
app.get('/', routes.dummy);

var server = http.createServer(app);

server.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
}, '0.0.0.0');