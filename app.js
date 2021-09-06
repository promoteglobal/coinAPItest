const coreFunc = require('./lib/coreFunc');  //library to access reading/writing/updating/deleting files
const https = require('https');

const options = {
  "method": "GET",
  "hostname": "rest.coinapi.io",
  "path": "/v1/trades/latest",
  "headers": {'X-CoinAPI-Key': '781CDEE0-265B-4582-9C41-8F62328FA5EC'}
  // "headers": {'X-CoinAPI-Key': '73034021-THIS-IS-SAMPLE-KEY'}  //In case I need to test but not call the api, I'll highlight this line, gray out the real apikey, and gray out updating of the coinAPItransactionList.json file.
};


//call the api, and get the live data
https.get(options, function(res) {
  let body = '';
  res.on('data', function(chunk) {
    body += chunk;
  });

  res.on('end', function() {
    const getLiveData = () => {
      return   new Promise((resolve, reject) => {
        resolve(body);
      });
    };
    getLiveData().then((body) => {
      return coreFunc.createUpdateFullListFile(body);
    })
    .then((body) => {
      return coreFunc.calculateAvg(body);
    })
    .then((avgObj) => {
      return coreFunc.createUpdateAvgFile(avgObj);
    })
    .catch((rejectionReason) => {
      console.log(rejectionReason);
    });
   
  }); //end of the end event
}).on('error', function(e) {
  console.log("Got error: " + e.message);
}); 



