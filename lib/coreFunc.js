
const _data = require('./data');  //library to access reading/writing/updating/deleting files
const fs = require('fs');

//These are the corefunctions to operate the app
const coreFunc = {};

coreFunc.createUpdateFullListFile = function (body2) {
  return new Promise ((resolve, reject) => {
  // Update the coinAPITransactionList file with latest info.  If no file exists, create a new file
  const path = './.data/allTransactions/coinAPITransactionList.json';

  if(fs.existsSync(path)) {
   //if the file exists, update data, if not create a new file
     _data.update('allTransactions', 'coinAPITransactionList', body2, function(err) {
       if(!err) {
         console.log(200);
         resolve(body2);


       } else {
         console.log(err);
         console.log(500, {'Error' : 'Couldnt update the datafile.'});
       }
    });

  } else {
    //if coinAPITransactionList file doesn't exist create the file and give lastest info
    _data.create('allTransactions', 'coinAPITransactionList', body2, function(err) {
       if(!err) {
         console.log(200);
         resolve(body2);


       } else {
         console.log(err);
         console.log(500, {'Error' : 'Could not create a new datafile'});

       }
    });
   }
  });
};


coreFunc.calculateAvg = function (body3)  {
  return new Promise ((resolve, reject) => { 
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
    
                  // const roundedAvgP = Math.round((priceAvg + Number.EPSILON) * 100) / 100; //wasn't sure if it was a good idea to include rounding
                  sizeAvg = sizeTotal / objData.length ;
    
                  // const roundedAvgS = Math.round((sizeAvg + Number.EPSILON) * 100) / 100; ////wasn't sure if it was a good idea to include rounding
                }  //end of if condition at end of for loop....Not the end of for loop
              }  //end of for loop  
    
                //Data to put in .json file
                    const avgObj = {
                      avgPrice : priceAvg,
                      avgSize : sizeAvg
                    };
    
                  const stringifiedavgObj = JSON.stringify(avgObj);
                  resolve(stringifiedavgObj);
    
              
            }; //end of find avg function
            
            findAvg();
    
          } else {
            console.log(err);
            console.log(500, {'Error' : 'Could not read the file'});
          } //end of if can read or not read the file
        });//end of the reading of coinAPITransactionList file
  });
};


coreFunc.createUpdateAvgFile = function (stringifiedavgObj) {
  return new Promise ((resolve, reject) => { 
    //insert updated avgs into seperate json file. If no file, create one.
    const isolatedDataPath = './.data/isolatedData/avgPriceSize.json';
    if(fs.existsSync(isolatedDataPath)) {
      //if the file exists, update data, if not create a new file
      
      _data.update('isolatedData', 'avgPriceSize', stringifiedavgObj, function(err) {
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
  });
};

//Export the module
module.exports = coreFunc;