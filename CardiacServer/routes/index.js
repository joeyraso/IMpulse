var express = require('express');
var router = express.Router();
var https = require('https');
var User = require('../models/User');
/*
create a request and send a text message
*/
function createData(to, from, text) {
	return JSON.stringify({
		api_key: '4c5cc473',
 		api_secret: '701785bd2c966392',
 		to: to,
 		from: from,
 		text: text
	});
}

function createOptions(path, host, data) {
	return {
		host: host,
		path: path,
		port: 443,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(data)
		}
	}
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Cardiac Sensor' });
});

router.get('/message', function(req, res, next) {
	sendMessage(req, res, '/sms/json', 'rest.nexmo.com');
});

router.get('/call', function(req, res, next) {
	sendMessage(req, res, '/tts/json', 'api.nexmo.com');
});

function sendMessage(req, res, path, host) {
	var data = createData('14406688277', '12404287093', 'This is an emergency, I am dying');
	var options = createOptions(path, host, data);

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

			if (decodedResponse['messages']) {
				decodedResponse['messages'].forEach(function(message) {
		    		if (message['status'] === "0") {
		      			res.send('Success ' + message['message-id']);
		    		}
		    		else {
		      			res.send('Error ' + message['status']  + ' ' +  message['error-text']);
		    		}
				});
			} else {
				if (decodedResponse['error_text'] === 'Success') {
					res.send('Successfully sent call');
				}
				else {
					res.send('Error sending call');
				}
			}
		});
	});
}

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
