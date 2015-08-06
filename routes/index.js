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
	console.log(req.params);
	console.log(req.body);
	console.log(req.query);
	
	//res.json(req.body);
	res.setHeader('Content-Type', 'text/plain')
	res.write('you posted:\n')
	res.end(JSON.stringify(req.body, null, 2))
	
	/*req.body.article.title = req.param('title');
	req.body.article.content = req.param('content');
	
	articleProvider.create(req, function(error) {
		if (error) {
			res.sendStatus(error);
		}
		else {
			this.index();
		}
	})*/
};