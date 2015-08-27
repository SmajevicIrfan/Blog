var LocalStrategy = require('passport-local').Strategy;

var db = require('./mongo-client.js');
var UserDB = db.UserModel;

var mongoose = require('mongoose');
var mongoURL = process.env.CUSTOMCONNSTR_MONGOLAB_URI || "mongodb://127.0.0.1:27017/standard";
var mongoOptions = { };

var bcrypt = require('bcrypt-nodejs');

mongoose.connect(mongoURL, mongoOptions, function(err, res) {
	if (err) { 
		console.log('Connection refused to: ' + mongoURL);
		console.log(err);
	}
	else {
		console.log('Connection successful to: ' + mongoURL);
	}
});

var testUser = new UserDB();
testUser.username = "test@" + Date.now();
testUser.email = "test" + Date.now() + "@test.te";
testUser.password = "unhashedPasswordTest";

exports.primary = function(passport) {
	passport.testLoading = function() {
		console.log("Loaded Correctly!");
	}
	
	passport.serializeUser(function(user, done) {
		return done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done) {
		UserDB.findById(id, function(err, user) {
			return done(err, user);
		});
	});
	
	passport.use('local-signup', new LocalStrategy({
			passReqToCallback : true
		},
		function(req, username, password, done) {
			/*console.log("In here!");
			
			if (password != req.body.passwordRepeat)
				done(null, false, req.flash('signupMessage', 'Passwords do not match up.'));
				
			console.log("Passwords match up! Continuing.");
				
			process.nextTick(function() {
				UserDB.findOne({ 'username': username }, function(err, user) {
					if (err)
						return done(err);
					
					console.log("No username error! Continuing.");
					
					if (user)
						return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
					else {
						console.log("Username not found :)! Continuing.");
						
						UserDB.findOne({ 'email': req.body.email }, function(err, user1) {
							if (err)
								return done(err);
								
							if (user1)
								return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
							else {
								console.log("Email not found :)! Continuing.");*/
								
								var newUser = new UserDB();
								
								newUser.username = username;
								newUser.email = req.body.email;
								console.log("Hashing password! :/");
								newUser.password = newUser.generateHash(password);
								console.log("Password hashed! :D Continuing.");
								
								console.log("Saving user");
								
								newUser.save(function(err, result) {
									if (err)
									{
										console.log("Error encountered :(");
										console.log(err);
										throw(err);
									}
									
									console.log(result);
									console.log("Saved! Stopping.");
									
									return done(null);
								});/*
								console.log("What?!");
							}
						});
					}
				});
			});*/
		}
	));
};

exports.test = function() {
	testUser.save(function(err) {
		console.log("Saved test user!");
	});
};