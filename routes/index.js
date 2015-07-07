/*
 *
 *  Callback functions for routing
 *
 */

var ArticleProvider = require('../util/article-provider').ArticleProvider;

var articleProvider = new ArticleProvider();

// Homepage (INDEX)
exports.index = function(req, res) {
	articleProvider.list(req, function(error, docs){
		if (error) {
			res.send(error);
		}
		else {
			res.render('nav', { pageTitle: 'Blog Homepage', feature: articleProvider.findFeature(), articles: docs });
		}
	});
};

exports.nav = function(req, res) {
	res.render('nav', { pageTitle: 'Blog Nav' });
}

// Engeneering
exports.engineering = function(req, res) {
	res.render('engineering', { pageTitle: 'Engineering' })
};

// Map
exports.map = function(req, res) {
	res.render('map', { pageTitle: 'Map' })
};

// About
exports.about = function(req, res) {
	res.render('about', { pageTitle: 'About' })
};

// Contact
exports.contact = function(req, res) {
	res.render('contact', { pageTitle: 'Contact' })
};

// Login
exports.login = function(req, res) {
	res.render('login', { pageTitle: 'Login' });
};

// New Blog post
exports.newArticleGet = function(req, res) {
	res.render('new-article', { pageTitle: 'New Blog post' });
};

exports.newArticlePost = function(req, res) {
	articleProvider.save({
		title: req.param('title'),
		body: req.param('body')
	}, function(error, docs) {
		res.redirect('/')
	});
};