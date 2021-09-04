/*
*Helpers for various tasks
* I didn't write this code.  It came from a vanilla javascipt node example project.
*/


//Dependencies
// const crypto = require('crypto');
// const config = require('./config');
// var https = require('https');
// var querystring = require('querystring');

//Containers for all the helpers
var helpers = {};


//Create a SHA256 hash
// helpers.hash = function (str){
//   if(typeof(str) == 'string' && str.length > 0) {
//     var hash = crypto.createHmac('sha256', config.hashingSecret).update(str).digest('hex');
//     return hash;
//   } else {
//     return false;
//   }
// };

//Parse a JSON string to an object in all cases without throwing
helpers.parseJsonToObject = function(str) {
  try{
    const obj = JSON.parse(str);
    return obj;
  }catch(e){
    return {};
  }
};

//Create a string of random alphanumeric characters, of a given length
// helpers.createRandomString = function(strLength) {
//   strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
//   if(strLength) {
//     //Define all the possible characters that could go into a string
//     const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

//     //Start the final string
//     let str = '';
//     for (i = 1; i <= strLength; i++) {
//       //Get a random character from the possibleCharacters string
//       let randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
//       //Append this character to the final string
//       str += randomCharacter;
//     }

//     //Return the final string
//     return str;

//   } else {
//     return false;
//   }
// };


// helpers.sendTwilioSms = function(phone,msg,callback){
//   const https = require('https');

//   var options = {
//     "method": "GET",
//     "hostname": "rest.coinapi.io",
//     "path": "/v1/assets",
//     "headers": {'X-CoinAPI-Key': '73034021-THIS-IS-SAMPLE-KEY'}
//   };
  
//   var request = https.request(options, function (response) {
//     var chunks = [];
//     response.on("data", function (chunk) {
//       chunks.push(chunk);
//     });
//   });
  
//   request.end();

//     // Instantiate the request object
//     const req = https.request(requestDetails,function(res){
//         // Grab the status of the sent request
//         const status =  res.statusCode;
//         // Callback successfully if the request went through
//         if(status == 200){
//           callback(false);
//         } else {
//           callback('Status code returned was '+status);
//         }
//     });

//     // 400	Bad Request -- There is something wrong with your request
//     // 401	Unauthorized -- Your API key is wrong
//     // 403	Forbidden -- Your API key doesnt't have enough privileges to access this resource
//     // 429	Too many requests -- You have exceeded your API key rate limits
//     // 550	No data -- You requested specific single item that we don't have at this moment.

//     // Bind to the error event so it doesn't get thrown
//     req.on('error',function(e){
//       callback(e);
//     });

//     // Add the payload
//     req.write(stringPayload);

//     // End the request
//     req.end();

//   } else {
//     callback('Given parameters were missing or invalid');
//   }
// };












//Export the module
module.exports = helpers;