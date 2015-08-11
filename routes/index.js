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
			res.sendStatus(error);
		}
		else {
			res.render('index', { pageTitle: 'Blog Homepage', feature: articleProvider.findFeature(), articles: docs });
		}
	});
};

exports.dummy = function(req, res) {
	res.render('index', { pageTitle: 'Blog Homepage - dummy', feature:
		{
			title	  : 'Featured story test',
			content	  : 'Nothing special',
			author	  : {
				username	: 'smajevicirfan',
				name 		: 'Irfan Smajevic',
				avatar 		: 'default-avatar.png'
			},
			thumb	  : 'feature-thumb.jpg',
			created	  : new Date().toString().split(' '),
			tags	  : [ 'testing' ],
			people	  : [ {
				username	: 'smajevicirfan',
				name 		: 'Irfan Smajevic',
				avatar 		: 'default-avatar.png'
			}, {
				username	: 'mironb',
				name 		: 'Miron Banjac',
				avatar 		: 'default-avatar.png'
			} ],
			views	  : 200,
			likes	  : 27,
			comments  : [ ]
		}, articles: [ ] } );
};

// Accessing the new article editor
exports.newArticle = function(req, res) {
	req.admin = true;
	if (!req.admin) {
		res.sendStatus(401);
	}
	else {
		res.render('newArticle', { pageTitle: 'New Article' });
	}
};

// Creating a new article
exports.create = function(req, res) {
	req.admin = true;
	
	articleProvider.create(req, function(error) {
		if (error) {
			res.sendStatus(error);
		}
		else {
			res.redirect(200, '..');
		}
	});
};