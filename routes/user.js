/*
 *
 *  Callback functions for user routing
 *
 */
 
var express = require('express');
var router = express.Router();

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/user/login');
}

module.exports = function (passport) {
	router.get('/login', function(req, res) {
		res.render('login', { pageTitle: 'Login - Blog', message: req.flash('loginMessage') });
	});
	
	router.post('/login', function(req, res) {
		var post = req.body;
		
		if (post.user === 'smajevicirfan' && post.password === 'testpassword123') {
			req.session.user_id = 1;
			res.redirect('/');
		}
		else {
			res.sendStatus(401);
		}
	});
	
	router.get('/signup', function(req, res) {
		res.render('register', { pageTitle: 'Register - Blog', message: req.flash('signupMessage') });
	});
	
	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/user/signup',
		failureFlash: true
	}));
	
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	return router;
};