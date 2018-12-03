var _data = require('./data');
var helpers = require('./helpers');
// define all handlers 
var handlers = {};
handlers.sample = function (data, cb) {
    cb(200, { 'name': 'sample handler' });
}
handlers.sample1 = function (data, cb) {
    cb(200, { 'name': 'sample handler1' })
}
handlers.notFound = function (data, cb) {
    cb(404);
}
handlers.users = function (data,callback){
    var acceptableMethods = ['post','get','put','delete'];
    if(acceptableMethods.indexOf(data.method)> -1){
        handlers._users[data.method](data,callback);
    }
}
// conatainer of methods for  handlers.users 
handlers._users = {};
// user -post 
// required data : firstname , lastname , phone , password , tosAgreement
// optional data: none 
handlers._users.post = function(data, callback){
    console.log(' payload ', data, 'data type  of payload', typeof(data));
    // verify the payload recived from client

    var firstName = typeof(data.payload.firstName) == "string" && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim(): false;
    var lastName = typeof (data.payload.lastName) == "string" && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
    var phone = typeof (data.payload.phone) == "string" && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
    var password = typeof (data.payload.password) == "string" && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
    var tosAgreement = typeof (data.payload.tosAgreement) == "boolean" && data.payload.tosAgreement == true ? true : false;
    // validating the data we recieved 
    if (firstName && lastName && phone && password && tosAgreement){
        console.log('we have that data we need ');
        // makesure that user doenot exist

        _data.read('users',phone,function(err,data){
            if(err){
                //hash the password 
                var hashedPassword  = helpers.hash(password);
                if(hashedPassword){
                    var userObject = {
                        'firstName': firstName,
                        'lastName': lastName,
                        'phone':phone,
                        'hashedPassword': hashedPassword,
                        tosAgreement: true
                    }
                    // Store the user
                    _data.create('users',phone,userObject,function(err){
                        if(!err){
                            callback(200);
                        }else{
                            callback(500,{'Error':'couldnot create the new user'});
                        }
                    })
                }else{
                    callback(500,{'Error':'couldnot create the hashed password'});
                }

            }else{
                callback(400,{'Error':'user already exists'});
            }
        } )
    }else{
        callback(400,{"error" : "mising required fields "});
    }
}
// required data : phone
// optional data : none
handlers._users.get = function(data,callback){
    var phone = typeof (data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim() == 10 ? data.queryStringObject.phone.trim(): false;
    if(phone){
        
    }
}

module.exports = handlers;