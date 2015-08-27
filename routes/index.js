/*
 *
 *  Callback functions for routing
 *
 */

var express = require('express');
var router = express.Router();

var ArticleProvider = require('../config/article-provider').ArticleProvider;
var articleProvider = new ArticleProvider();

/*
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
	console.log(req.session.user_id);
	
	res.render('index', req.session.user_id, { pageTitle: 'Blog Homepage - dummy', feature:
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

// Show login page
exports.login = function(req, res) {
	res.render('login', { pageTitle: 'Login - Blog' });
}

// Authentication of user
exports.auth = function(req, res) {
	if (req.session == null)
		req.session = {};
		
	var post = req.body;
	
	if (post.user === 'smajevicirfan' && post.password === 'testpassword123') {
		req.session.user_id = 1;
		res.redirect('..');
	}
	else {
		res.sendStatus(401);
	}
}
*/

router.get('/', function(req, res) {
	
	console.log(req.session);
	
	res.render('index', { session: req.session, pageTitle: 'Blog Homepage - dummy', feature:
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
});

router.get('/newPost', function(req, res) {
	if (!req.session.admin) {
		res.sendStatus(401);
	}
	else {
		res.render('newArticle', { pageTitle: 'New Article' });
	}
});

router.post('/newPost', function(req, res) {
	req.admin = true;
	
	articleProvider.create(req, function(error) {
		if (error) {
			res.sendStatus(error);
		}
		else {
			res.redirect(200, '..');
		}
	});
});

module.exports = router;