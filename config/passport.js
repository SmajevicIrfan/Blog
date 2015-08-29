var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./user-db-client.js');

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});


// =========================================================================
// LOCAL SIGNUP ============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

passport.use('local-signup', new LocalStrategy({
		usernameField : 'username',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, username, password, done) {
		// Check if the 2 passwords fields match up
		if (password != req.body.passwordRepeat)
				return done(null, false, req.flash('signupMessage', 'Passwords do not match up.'));
				
		// find a user whose username is the same as the forms username
		// or a user whose email is the sam as the forms email
		// we are checking to see if the user trying to login already exists
		User.findOne({ $or: [{ 'username':  username.toLowerCase() }, { 'email': req.body.email.toLowerCase() }] }, function(err, user) {
			// if there are any errors, return the error
			if (err)
				return done(err);
	
			// check to see if theres already a user with that username
			if (user) {
				return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
			}
			else {
				// if there is no user with that username or email
				// check if there is a user
				var newUser = new User();
	
				// set the user's local credentials
				newUser.username = username.toLowerCase();
				newUser.email = req.body.email.toLowerCase();
				newUser.password = newUser.generateHash(password); // use the generateHash function in our user model
	
				// save the user
				newUser.save(function(err) {
					if (err)
						return done(err);
						
					return done(null, newUser);
				});
			}
		});
	}
));

// =========================================================================
// LOCAL LOGIN =============================================================
// =========================================================================
// we are using named strategies since we have one for login and one for signup
// by default, if there was no name, it would just be called 'local'

passport.use('local-login', new LocalStrategy({
		usernameField : 'user',
		passwordField : 'password',
		passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	function(req, username, password, done) {
		// find a user whose username is the same as the forms username
		// or a user whose email is the sam as the forms email
		// we are checking to see if the user trying to login already exists
		User.findOne({ $or: [{ 'username':  username.toLowerCase() }, { 'email': username.toLowerCase() }] }, function(err, user) {
			// if there are any errors, return the error before anything else
			if (err)
				return done(err);
	
			// if no user is found, return the message
			if (!user)
				return done(null, false, req.flash('loginMessage', 'Wrong username/email or password.')); // req.flash is the way to set flashdata using connect-flash
			
			// if the user is found but the password is wrong
			if (user.validatePassword(password) !== true)
				return done(null, false, req.flash('loginMessage', 'Wrong username/email or password.')); // create the loginMessage and save it to session as flashdata
			
			// all is well, return successful user
			return done(null, user);
		});
	}
));

module.exports = passport;