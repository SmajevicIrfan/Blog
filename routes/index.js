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

exports.dummy = function(req, res) {
	res.render('index', {
		pageTitle: 'Blog Homepage',
		feature: {
			title: 'Featured test',
			content: 'Just testing the webpage w/out the db working!',
			author: {
				username: 'TheCrew',
				name: 'The Crew',
				avatar: 'crew-avatar.jpg'
			},
			thumb: 'feature-thumb.jpg',
			created: new Date().toString().split(' '),
			tags: ['testing', 'jade'],
			people: [ {
				username: 'IrfanS',
				name: 'Irfan Smajevic',
				avatar: 'crew-avatar.jpg'
			},
			{
				username: 'Miron',
				name: 'Miron Banjac',
				avatar: 'default-avatar.png'
			}],
			views: 200,
			likes: 27,
			comments: [ {
				user : {
					username: 'Negroops',
					avatar: 'default-avatar.png'
				},
				content: 'The site looks amaying for now!',
				created: new Date().toString().split(' '),
				likes: 2
			}]
		},
		articles: [{
			title: 'Article test 1',
			content: 'Just testing the webpage w/out the db working!',
			author: {
				username: 'IrfanS',
				name: 'Irfan Smajevic',
				avatar: 'crew-avatar.jpg'
			},
			thumb: 'article-thumb1.jpg',
			created: new Date().toString().split(' '),
			tags: ['testing', 'jade'],
			people: [ {
				username: 'IrfanS',
				name: 'Irfan Smajevic',
				avatar: 'crew-avatar.jpg'
			},
			{
				username: 'Miron',
				name: 'Miron Banjac',
				avatar: 'default-avatar.png'
			}],
			views: 172,
			likes: 30,
			comments: []
		}]
	});
};