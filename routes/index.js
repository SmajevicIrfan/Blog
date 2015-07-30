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
			res.render('index', { pageTitle: 'Blog Homepage', feature: articleProvider.findFeature(), articles: docs });
		}
	});
};