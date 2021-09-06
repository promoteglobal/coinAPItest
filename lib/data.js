/*
* Library for storing and editing data
* Most of this file I didn't write.  It came from the vanilla javascript node.js class I took a few months ago. I modified it a little to accomodate this project. I don't use all functions defined in this module.
*/

//Dependencies
const fs = require('fs');
const path = require('path');
const helpers = require('./helpers');

//Container for the module (to be exported)
const lib = {};

//Base directory of the data folder
lib.baseDir = path.join(__dirname, '/../.data/');

//Write data to a file
lib.create = function(dir, file, data, callback) {
    //Open the file for writing
    fs.open(lib.baseDir + dir + '/' + file + '.json', 'wx', function (err, fileDescriptor){

      if(!err && fileDescriptor) {
         // Convert data to string
         const stringData = data;

         //Write to file and close it
         fs.writeFile(fileDescriptor, stringData, function(err){
          if(!err) {
            fs.close(fileDescriptor, function(err){
              if(!err) {
                callback(false);
              } else {
                callback('Error closing new file');
              }
            });
          } else {
            callback('Error writing to new file');
          }
         });
      } else {
        callback('Could not create new file, it may already exist');
      }
    });
};

//Read data from a file
lib.read = function (dir, file, callback){
  fs.readFile(lib.baseDir + dir + '/' + file + '.json', 'utf8', function(err, data){
    if(!err && data) {
      const parsedData = helpers.parseJsonToObject(data);
      callback(false, parsedData);
    } else {
      callback(err, data);
    }
  })
};

//Update data inside a file
lib.update = function(dir, file, data, callback) {
  //Open the file for writing
  fs.open(lib.baseDir + dir + '/' + file + '.json', 'r+', function (err, fileDescriptor){

    if(!err && fileDescriptor) {

      // Convert data to string
      const stringData = data;

      //Truncate the file **Note: fs.truncate was depricated.  So I fixed it to fs.ftruncate.  I was using this function to update a file, but it would work 90% of the time.  I think there is an async issue somewhere, but I don't have the tools to see it.
      fs.ftruncate(fileDescriptor, function(err){

        if(!err){
         // Write to the file and close it

          fs.writeFile(fileDescriptor, stringData, function(err) {

            if(!err){
              fs.close(fileDescriptor, function (err) {

                if(!err) {
                  callback (false);
                } else {
                  callback('error closing file');
                }
              });
            } else {
              callback('Error writing to existing file');
            }
          });
        } else {
          callback('Error truncating file');
        }
      });
    } else {
      callback('Could not open the file for updating, it may not exist yet');
    }
  });
};

//Delete a file
lib.delete = function(dir, file, callback) {
  //Unlink the file (remove file from file system)
  fs.unlink(lib.baseDir + dir + '/' + file + '.json', function(err){
    if(!err){
      callback(false);
    } else {
      callback('Error deleting file');
    }
  });
};

// List all the items in a directory
lib.list = function(dir,callback){
  fs.readdir(lib.baseDir+dir+'/', function(err,data){
    if(!err && data && data.length > 0){
      const trimmedFileNames = [];
      data.forEach(function(fileName){
        trimmedFileNames.push(fileName.replace('.json',''));
      });
      callback(false,trimmedFileNames);
    } else {
      callback(err,data);
    }
  });
};

//Export the module
module.exports = lib;