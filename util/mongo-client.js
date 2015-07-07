var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');
var mongoURL = process.env.CUSTOMCONNSTR_MONGOLAB_URI;
//mongoURL = "mongodb://localhost:27017/test";
var mongoOptions = { };
/*
MongoClient.connect(mongoURL, function(err, db) {
	assert(null, err);
	console.log('Connection successful to: ' + mongoURL + '!');
});
*/

mongoose.connect(mongoURL, mongoOptions, function(err, res) {
	if (err) { 
		console.log('Connection refused to: ' + mongoURL);
		console.log(err);
	}
	else {
		console.log('Connection successful to: ' + mongoURL);
	}
});


var Schema = mongoose.Schema/*, Myb not needed after all
	ObjectId = Schema.ObjectId*/;

var User = new Schema({
	// myb add names
	// name: { type: String, required: true },
	username  : { type: String, required: true },
	password  : { type: String, required: true },
	email	  : { type: String, required: true },
	avatar	  : { type: String, default: 'default-avatar.jpg' },
	created	  : { type: Date, default: Date.now },
	crewMember: { type: Boolean, default: false }
});

var Comment = new Schema({
	user	  : { type: {
		username	: String,
		avatar 		: String
	}, required: true },
	content   : { type: String, required: true },
	created	  : { type: Date, default: Date.now },
	likes	  : { type: Number, default: 0 }
});

var Article = new Schema({
	title	  : { type: String, required: true },
	content	  : { type: String, required: true },
	author	  : { type: {
		username	: String,
		name 		: String,
		avatar 		: String
	}, default: {
		username	: 'TheCrew',
		name 		: 'The Crew',
		avatar 		: 'crew-avatar.jpg'
	} },
	thumb	  : { type: String },
	created	  : { type: Date, default: Date.now },
	updated	  : { type: Date, default: Date.now },
	published : { type: Boolean, default: false },
	tags	  : [ {type: String} ],
	people	  : [ {
		username	: String,
		name 		: String,
		avatar 		: String
	} ],
	views	  : { type: Number, default: 0},
	likes	  : { type: Number, default: 0},
	comments  : [ Comment ]
});


//Define Models
var userModel = mongoose.model('User', User);
var articleModel = mongoose.model('Article', Article);
var commentModel = mongoose.model('Comment', Comment);

// Export Models
exports.userModel = userModel;
exports.articleModel = articleModel;
exports.commentModel = commentModel;