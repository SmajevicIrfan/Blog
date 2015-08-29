var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index', { pageTitle: 'Blog Homepage - dummy', selected: 'Articles', feature:
		{
			title	  : 'Featured story test',
			content	  : 'Nothing special',
			author	  : {
				username	: 'smajevicirfan',
				name 		: 'Irfan Smajevic',
				avatar 		: 'default-avatar.png'
			},
			thumb	  : 'dummyFeatThumb.jpg',
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

router.get('/work', function(req, res) {
	res.render('work', { pageTitle: 'Blog Projects', selected: 'Projects' });
});

router.get('/map', function(req, res) {
	res.render('map', { pageTitle: 'Blog Map', selected: 'Map' });
});

router.get('/about', function(req, res) {
	res.render('about', { pageTitle: 'About Us - Blog', selected: 'About us' });
});

router.get('/contact', function(req, res) {
	res.render('contact', { pageTitle: 'Contact Us - Blog', selected: 'Contact' });
});

module.exports = router;