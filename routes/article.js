var express = require('express');
var router = express.Router();

router.get('/new', function(req, res) {
	//res.sendfile('./editor.html', {root: __dirname })
	res.render('editor', { pageTitle: 'New Article - Blog' });
});

module.exports = router;