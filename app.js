const _data = require('./lib/data');  //library to access reading/writing/updating/deleting files
const fs = require('fs')
const https = require('https');

//headers needed for api call
const options = {
  "method": "GET",
  "hostname": "rest.coinapi.io",
  "path": "/v1/trades/latest",
  "headers": {'X-CoinAPI-Key': '781CDEE0-265B-4582-9C41-8F62328FA5EC'}
  // "headers": {'X-CoinAPI-Key': '73034021-THIS-IS-SAMPLE-KEY'}  //In case I need to test but not call the api, I'll highlight this line, gray out the real apikey, and gray out updating of the coinAPItransactionList.json file.
};


//call the api, and get the transaction data
https.get(options, function(res) {
  let body = '';
  res.on('data', function(chunk) {
    body += chunk;
  });
  res.on('end', function() {

   // Update the coinAPITransactionList file with latest info.  If no file exists, create a new file
    const path = './.data/allTransactions/coinAPITransactionList.json';

   if(fs.existsSync(path)) {
    //if the file exists, update data *********NOTE: I did have this as _data.update, but I found that the data in the avg json file would be null sometimes.  I know the concept and how to use promises/async/await, but I need more time to trouble shoot and maybe someone who can show me the ropes since I can't see exactly whats going on, or I don't know of the tools too see it. **************
       _data.delete('allTransactions', 'coinAPITransactionList', function(err) {
         if(!err) {
           console.log(200);

         } else {
           console.log(err);
           console.log(500, {'Error' : 'couldnt delete the file.'});
         }
      });

      _data.create('allTransactions', 'coinAPITransactionList', body, function(err) {
        if(!err) {
          console.log(200);

        } else {
          console.log(err);
          console.log(500, {'Error' : 'Couldnt update the datafile.'});
        }
     });

   } else {
     //if coinAPITransactionList file doesn't exist create the file and give lastest info
     _data.create('allTransactions', 'coinAPITransactionList', body, function(err) {
        if(!err) {
          console.log(200);

        } else {
          console.log(err);
          console.log(500, {'Error' : 'Could not create a new datafile'});
        }
     });
    }

      //grab data from coinAPITransactionList so I can calculate avgs
     _data.read('allTransactions', 'coinAPITransactionList', function(err, objData) {
      if(!err) {
        console.log(200);
       
        const findAvg = () => {
          let priceTotal = 0;
          let sizeTotal = 0;
          let priceAvg;
          let sizeAvg;
        
          //loop through transactions, get price and size data and find an avg for both
          for (let i=0; i < objData.length; i++) {
            const price = objData[i]['price'];
            const size = objData[i]['size'];
            priceTotal += price;
            sizeTotal += size;
      
            //on last loop, calculate the avgs.
            if (i === objData.length - 1) {
              priceAvg = priceTotal / objData.length ;

              // const roundedAvgP = Math.round((priceAvg + Number.EPSILON) * 100) / 100;
              sizeAvg = sizeTotal / objData.length ;

              // const roundedAvgS = Math.round((sizeAvg + Number.EPSILON) * 100) / 100;
            }  //end of if condition at end of for loop....Not the end of for loop
          }  //end of for loop  

            //Data to put in .json file
                const avgObj = {
                  avgPrice : priceAvg,
                  avgSize : sizeAvg
                };

              //change avgobj to jsonstr
              const stringifiedavgObj = JSON.stringify(avgObj);

              //insert updated avgs into seperate json file. If no file, create one.
              const isolatedDataPath = './.data/isolatedData/avgPriceSize.json';
              if(fs.existsSync(isolatedDataPath)) {
                //if the file exists, update data *********NOTE: I did have this as _data.update, but I found that the data in the avg json file would be null sometimes.  I know the concept and how to use promises/async/await, but I need more time to trouble shoot and maybe someone who can show me the ropes since I can't see exactly whats going on, or I don't know of the tools too see it. **************

                 _data.delete('isolatedData', 'avgPriceSize', function(err) {
                   if(!err) {
                     console.log(200);
                
                   } else {
                     console.log(err);
                     console.log(500, {'Error' : 'couldnt delete the file.'});
                   }
                });
                
                _data.create('isolatedData', 'avgPriceSize', stringifiedavgObj, function(err) {
                  if(!err) {
                    console.log(200);
                
                  } else {
                    console.log(err);
                    console.log(500, {'Error' : 'Couldnt update the datafile.'});
                  }
                });
                  
              } else {
              //if the file doesn't exist create the file and insert the data
                 _data.create('isolatedData', 'avgPriceSize', stringifiedavgObj, function(err) {
                     if(!err) {
                       console.log(200);
              
                     } else {
                        console.log(err);
                        console.log(500, {'Error' : 'Could not create a new datafile'});
                      }
                });
              } //end of if exist the update, if not replace new data
        }; //end of find avg function
        
        findAvg();

      } else {
        console.log(err);
        console.log(500, {'Error' : 'Could not read the file'});
      } //end of if can read or not read the file
    });//end of the reading of coinAPITransactionList file
  }); //end of the end function event
}).on('error', function(e) {
  console.log("Got error: " + e.message);
}); 




