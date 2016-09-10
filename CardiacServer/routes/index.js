var express = require('express');
var router = express.Router();
var https = require('https');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
create a request and send a text message
*/
var data = JSON.stringify({
 api_key: '4c5cc473',
 api_secret: '701785bd2c966392',
 to: '4406688277',
 from: '5613793611',
 text: 'Hello from Alid'
});g

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

var req = https.request(options);

req.write(data);
req.end();

var responseData = '';
req.on('response', function(res){
 res.on('data', function(chunk){
   responseData += chunk;
 });

 res.on('end', function(){
   console.log(JSON.parse(responseData));
 });
});

/*
check response codes
Decode the json object you retrieved when you ran the request.
*/
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



module.exports = router;
