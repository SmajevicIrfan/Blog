var express = require('express');
var router = express.Router();

var passport = require('../config/passport.js');

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/user/login');
}

router.get('/login', function(req, res) {
	res.render('login', { pageTitle: 'Login - Blog', selected: 'Sign in', message: req.flash('loginMessage') });
});

router.post('/login', passport.authenticate('local-login', {
	successRedirect: '/',
	failureRedirect: '/user/login',
	failureFlash: true
}));

router.get('/signup', function(req, res) {
	res.render('register', { pageTitle: 'Register - Blog', selected: 'Sign in', message: req.flash('signupMessage') });
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

module.exports = router;