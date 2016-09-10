var express = require('express');
var router = express.Router();
var https = require('https');
var User = require('../models/User');
/*
create a request and send a text message
*/
var data = JSON.stringify({
 api_key: '4c5cc473',
 api_secret: '701785bd2c966392',
 to: '14406688277',
 from: '12404287093',
 text: 'Hello from Alid'
});

var options = {
 host: 'rest.nexmo.com',
 path: '/sms/json',
 port: 443,
 method: 'POST',
 headers: {
   'Content-Type': 'application/json',
   'Content-Length': Buffer.byteLength(data)
 }
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cardiac Sensor' });
});

router.get('/message', function(req, res, next) {
	var nexmoReq = https.request(options);
	nexmoReq.write(data);
	nexmoReq.end();

	var responseData = '';
	nexmoReq.on('response', function(nexmoRes) {
		nexmoRes.on('data', function(chunk) {
			responseData += chunk;
		});

		nexmoRes.on('end', function() {
			var decodedResponse = JSON.parse(responseData);

			console.log('You sent ' + decodedResponse['message-count'] + ' messages.\n');
			decodedResponse['messages'].forEach(function(message) {
	    		if (message['status'] === "0") {
	      			console.log('Success ' + message['message-id']);
	    		}
	    		else {
	      			console.log('Error ' + message['status']  + ' ' +  message['error-text']);
	    		}
			});
		});
	});
});

router.get('/call', function(req, res, next) {

});

router.get('/addUser', function(req, res, next) {
	var user = new User();
	user.save(function(err, writeResult) {
		if (err) {
			console.log(err);
			console.log('Unable to add user');
			res.send(err);
		}
		else {
			console.log(writeResult);
			res.send(writeResult);
		}
	});
});

router.get('/addContact', function(req, res, next) {
	res.send('added contact');
});

module.exports = router;
