var express = require('express');
var router = express.Router();
var https = require('https');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/message', function(req, res, next) {
	res.send('sent message\n');
});

module.exports = router;
