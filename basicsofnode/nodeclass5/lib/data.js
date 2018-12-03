/*
* this file is used for storing or editing the data 
 */
var fs = require('fs');
var path = require('path');
var helpers = require('./helpers')
var lib = {};
// console.log('directory name ', __dirname);
lib.baseDir = path.join(__dirname,'/../data/');
// console.log(lib.baseDir);
lib.create = function(dir,file,data,callback){
    
    
    // open the file for writing content inside .json
    fs.open(lib.baseDir+ dir +'/'+file+'.json','wx',function(err,fileDescriptor){
        console.log('error',err);
        console.log('filedescriptor',fileDescriptor);
        var stringData = JSON.stringify(data);
        if(!err && fileDescriptor){
            console.log('stringData ', stringData);
            fs.writeFile(fileDescriptor,stringData,function(err){
                console.log('creating the json file and adding data ');
                if(!err){
                    fs.close(fileDescriptor,function(err){

                        if(!err){
                            callback(false);
                        }else{
                            callback('error closing the file')
                        }
                    })
                }else{
                    callback('error writing to a new file ')
                }
            } )
        }else{
            callback('couldnot create new file , file may already exist');
        }
        
    })
}
lib.read = function(dir,file,callback){
    fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',function(err,data){
        if(!err && data){
            var parsedData = helpers.parseJSONToObject(data);
            callback(false,parsedData);
        }else{
            callback(err,data);
        }
    });
}
lib.update = function(dir,file,data,callback){
    fs.open(lib.baseDir+dir+'/'+file+'.json','r+',function(err,fileDescriptor){
        if(!err && fileDescriptor){
            var stringData = JSON.stringify(data);

            fs.truncate(fileDescriptor,function(err){
                if(!err){
                    fs.writeFile(fileDescriptor, stringData, function (err) {
                        if (!err) {
                            fs.close(fileDescriptor, function (err) {
                                if (!err) {
                                    callback(false);
                                } else {
                                    callback('error closing the file');
                                }
                            })
                        } else {
                            callback('error writing to a existing file');
                        }
                    })
                }else{
                    callback('error truncating the file ');
                }
            })
        }else{
            callback('couldnot open the file for updating, file may not exist here');
        }
    })
}
module.exports = lib;
