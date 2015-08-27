var db = require('./mongo-client');

var publicFields = '_id title content url author tags created likes comments';
var ArticleProvider = function() {};

////////////////////////////////////////////////////////////////////
/*
exports.list = function(req, res) {
	var query = db.ArticleModel.find({published: true});

	query.select(publicFields);
	query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}

  		for (var postKey in results) {
    		results[postKey].body = results[postKey].body.substr(0, 400);
    	}

  		return res.json(200, results);
	});
};

exports.listAll = function(req, res) {
	if (!req.user) {
		return res.send(401);
	}

	var query = db.ArticleModel.find();
	query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}

  		for (var postKey in results) {
    		results[postKey].body = results[postKey].body.substr(0, 400);
    	}

  		return res.json(200, results);
	});
};

exports.read = function(req, res) {
	var id = req.params.id || '';
	if (id == '') {
		return res.send(400);
	}

	var query = db.ArticleModel.findOne({_id: id});
	query.select(publicFields);
	query.exec(function(err, result) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}

  		if (result != null) {
  			result.update({ $inc: { views: 1 } }, function(err, nbRows, raw) {
				return res.json(200, result);
			});
  		} else {
  			return res.send(400);
  		}
	});
};

exports.like = function(req, res) {
	var id = req.body.id || '';
	if (id == '') {
		return res.send(400);
	}


	db.ArticleModel.update({_id: id}, { $inc: { likes: 1 } }, function(err, nbRows, raw) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		return res.send(200);
	});
}

exports.unlike = function(req, res) {
	var id = req.body.id || '';
	if (id == '') {
		return res.send(400);
	}


	db.ArticleModel.update({_id: id}, { $inc: { likes: -1 } }, function(err, nbRows, raw) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		return res.send(200);
	});	
}

exports.create = function(req, res) {
	if (!req.user) {
		return res.send(401);
	}

	var post = req.body.post;
	if (post == null || post.title == null || post.body == null 
		|| post.tags == null) {
		return res.send(400);
	}

	var postEntry = new db.ArticleModel();
	postEntry.title = post.title;
	postEntry.tags = post.tags.split(',');
	postEntry.published = post.published;
	postEntry.body = post.body;

	postEntry.save(function(err) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		return res.send(200);
	});
}

exports.update = function(req, res) {
	if (!req.user) {
		return res.send(401);
	}

	var post = req.body.post;

	if (post == null || post._id == null) {
		res.send(400);
	}

	var updatePost = {};

	if (post.title != null && post.title != "") {
		updatePost.title = post.title;
	} 

	if (post.tags != null) {
		if (Object.prototype.toString.call(post.tags) === '[object Array]') {
			updatePost.tags = post.tags;
		}
		else {
			updatePost.tags = post.tags.split(',');
		}
	}

	if (post.published != null) {
		updatePost.published = post.published;
	}

	if (post.body != null && post.body != "") {
		updatePost.body = post.body;
	}

	updatePost.updated = new Date();

	db.ArticleModel.update({_id: post._id}, updatePost, function(err, nbRows, raw) {
		return res.send(200);
	});
};

exports.delete = function(req, res) {
	if (!req.user) {
		return res.send(401);
	}

	var id = req.params.id;
	if (id == null || id == '') {
		res.send(400);
	} 

	var query = db.ArticleModel.findOne({_id:id});

	query.exec(function(err, result) {
		if (err) {
			console.log(err);
			return res.send(400);
		}

		if (result != null) {
			result.remove();
			return res.send(200);
		}
		else {
			return res.send(400);
		}
		
	});
};

exports.listByTag = function(req, res) {
	var tagName = req.params.tagName || '';
	if (tagName == '') {
		return res.send(400);
	}

	var query = db.ArticleModel.find({tags: tagName, published: true});
	query.select(publicFields);
	query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
  			console.log(err);
  			return res.send(400);
  		}

  		for (var postKey in results) {
    		results[postKey].body = results[postKey].body.substr(0, 400);
    	}

  		return res.json(200, results);
	});
}
*/
////////////////////////////////////////////////////////////////////

ArticleProvider.prototype.list = function(req, callback) {
	var query = db.ArticleModel.find({published: true});

	query.select(publicFields);
	query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
  			console.log(err);
  			callback(400, null);
  			return;
  		}

  		callback(null, results);
  	});
};

ArticleProvider.prototype.listAll = function(req, callback) {
	if (!req.admin) {
		callback(401, null);
		return;
	}

	var query = db.ArticleModel.find();
	query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
  			console.log(err);
  			callback(400, null);
  			return;
  		}

  		callback(null, results);
  	});
};

ArticleProvider.prototype.read = function(req, callback) {
	var id = req.params.id || '';
	if (id == '') {
		callback(400, null);
		return;
	}

	var query = db.ArticleModel.findOne({_id: id});
	query.select(publicFields);
	query.exec(function(err, result) {
		if (err) {
  			console.log(err);
  			callback(400, null);
  		}
  		else {
	  		if (result != null) {
	  			//Check cookies before adding views
	  			result.update({ $inc: { views: 1 } }, function(err, nbRows, raw) {
					callback(null, result);
				});
	  		}
	  		else {
	  			callback(400, null);
	  		}
	  	}
	});
};

ArticleProvider.prototype.like = function(req, callback) {
	var id = req.body.id || '';
	if (id == '') {
		callback(400, null);
		return;
	}


	db.ArticleModel.update({_id: id}, { $inc: { likes: 1 } }, function(err, nbRows, raw) {
		if (err) {
			console.log(err);
			callback(400, null);
		}
		else {
			callback(null, null);
		}
	});
};

ArticleProvider.prototype.unlike = function(req, callback) {
	var id = req.body.id || '';
	if (id == '') {
		callback(400, null);
		return;
	}

	db.ArticleModel.update({_id: id}, { $inc: { likes: -1 } }, function(err, nbRows, raw) {
		if (err) {
			console.log(err);
			callback(400, null);
		}
		else {
			callback(null, null);
		}
	});
};

ArticleProvider.prototype.comment = function(req, callback) {
	var id = req.body.id || '';
	if (id == '') {
		callback(400, null);
		return;
	}
	
	var comment = req.body.comment;
	if (comment == null || comment.user == null || comment.content == null) {
		callback(400, null);
	}

	var commentEntry = new db.CommentModel();
	commentEntry.user = comment.user;
	commentEntry.content = comment.content;

	// TODO test this, and change if needed
	db.ArticleModel.update({_id: id}, { $inc: { comments: commentEntry } }, function(err, nbRows, raw) {
		if (err) {
			console.log(err);
			callback(400, null);
		}
		else {
			callback(null, null);
		}
	});
};

ArticleProvider.prototype.create = function(req, callback) {
	if (!req.admin) {
		callback(401);
		return;
	}

	var article = req.body.article;
	if (article == null || article.title == null || article.content == null || article.tags == null) {
		callback(400);
	}

	var articleEntry = new db.ArticleModel();
	articleEntry.title = article.title;
	articleEntry.content = article.content;
	articleEntry.tags = article.tags.split(',');
	articleEntry.published = article.published;
	articleEntry.author = article.author;

	if (article.thumb != null) {
		articleEntry.thumb = article.thumb;
	}
	if (article.people != null) {
		articleEntry.people = article.people.split(',');
	}

	articleEntry.save(function(err) {
		if (err) {
			console.log(err);
			callback(400);
		}
		else {
			callback(null);
		}
	});
};

ArticleProvider.prototype.update = function(req, callback) {
	if (!req.admin) {
		callback(401);
		return;
	}

	var article = req.body.article;
	if (article == null || article._id == null) {
		callback(400);
	}

	var articleUpdate = {};

	if (article.title != null && article.title != "") {
		articleUpdate.title = article.title;
	}

	if (article.content != null && article.content != "") {
		articleUpdate.content = article.content;
	}

	if (article.thumb != null && article.thumb != "") {
		articleUpdate.thumb = article.thumb;
	}

	if (article.people != null) {
		if (Object.prototype.toString.call(article.people) === '[object array]') {
			articleUpdate.people = article.people;
		}
		else {
			articleUpdate.people = article.people.split(',');
		}
	}

	if (article.tags != null) {
		if (Object.prototype.toString.call(article.tags) === '[object array]') {
			articleUpdate.tags = article.tags;
		}
		else {
			articleUpdate.tags = article.tags.split(',');
		}
	}

	if (article.published != null) {
		articleUpdate.published = article.published;
	}

	//TODO See if likes/views/comments work

	articleUpdate.updated = new Date();

	db.ArticleModel.update({_id: article._id}, articleUpdate, function(err, nbRows, raw) {
		callback(null);
	});
};

ArticleProvider.prototype.delete = function(req, callback) {
	if (!req.admin) {
		callback(401, null);
		return;
	}

	var id = req.body.id || '';
	if (id == '') {
		callback(400, null);
		return;
	}

	var query = db.ArticleModel.findOne({_id: id});
	query.exec(function(err, result) {
		if (err) {
			console.log(err);
			callback(400, null);
		}
		else {
			if (result != null) {
				result.remove();
				callback(null, null);
			}
			else {
				callback(400, null);
			}
		}
	});
};

ArticleProvider.prototype.listByTag = function(req, callback) {
	var tagName = req.params.tagName || '';
	if (tagName == '') {
		callback(400, null);
		return;
	}

	var query = db.ArticleModel.find({tags: tagName, published: true});
	query.select(publicFields);
	query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
			console.log(err);
			callback(400, null);
			return;
		}

  		callback(null, results);
	});
};

ArticleProvider.prototype.listByAuthor = function(req, callback) {
	var authorID = req.params.authorID;
	if (authorID == null) {
		callback(400, null);
		return;
	}

	var query = db.ArticleModel.find({author: authorID, published: true});
	query.select(publicFields);
	query.sort('-created');
	query.exec(function(err, results) {
		if (err) {
			console.log(err);
			callback(400, null);
			return;
		}

  		callback(null, results);
	});
};

ArticleProvider.prototype.findFeature = function() {
	var query = db.ArticleModel.find({published: true});

	query.sort('-views');
	query.select(publicFields);
	query.exec(function(err, results) {
		if (err) {
			console.log(err);
			return 400;
		}

		return results[0];
	});
};

exports.ArticleProvider = ArticleProvider;