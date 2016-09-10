var express = require('express');
var router = express.Router();
var https = require('https');
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
  res.render('index', { title: 'Express' });
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
			console.log(responseData);
			var decodedResponse = JSON.parse(responseData);

			console.log('You sent ' + decodedResponse['message-count'] + ' messages.\n');
			decodedResponse['messages'].forEach(function(message) {
	    		if (message['status'] === "0") {
	      			console.log('Success ' + decodedResponse['message-id']);
	    		}
	    		else {
	      			console.log('Error ' + decodedResponse['status']  + ' ' +  decodedResponse['error-text']);
	    		}
			});
		});
	});
});

module.exports = router;
