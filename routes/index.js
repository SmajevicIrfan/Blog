/*
 *
 *  Callback functions for routing
 *
 */

// Homepage (INDEX)
exports.index = function(req, res){
  res.render('index', { pageTitle: 'Blog Homepage' });
};

// Engeneering
exports.engineering = function(req, res){
	res.render('engineering', { pageTitle: 'Engineering' })
};

// Map
exports.map = function(req, res){
	res.render('map', { pageTitle: 'Map' })
};

// About
exports.about = function(req, res){
	res.render('about', { pageTitle: 'About' })
};

// Contact
exports.contact = function(req, res){
	res.render('contact', { pageTitle: 'Contact' })
};