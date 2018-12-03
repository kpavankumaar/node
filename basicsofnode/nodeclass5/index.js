// var obj = require('./basic');
// obj.name = 'pavan';
// console.log();
var http = require('http');
var https = require('https');
var url = require('url');
var config = require('./lib/config');
var fs = require('fs');
var _data = require('./lib/data');
var StringDecoder = require('string_decoder').StringDecoder;
var handlers = require('./lib/handlers');
var helpers = require('./lib/helpers');

// _data.create('users','newfile',{'name':'Pavan'},function(err){
//     console.log('error message ', err);
// })
// _data.read('users','newfile',function(err,data){
//     console.log(err);   
//     console.log(data);
// });

_data.update('users','newfile',{'name':'a'},function(err){
    // console.log('err message', err);
})


var httpsServerOptions = {
    key:fs.readFileSync('./https/key.pem'),
    cert:fs.readFileSync('./https/cert.pem')
}
var httpsServer = https.createServer(httpsServerOptions,function(req,res){
    unifiedServer(req,res);
})
httpsServer.listen(config.httpsPort,function(){
    console.log('the https server is listening to port'+ config.httpsPort + ' in ' + config.envName + ' mode ');
})


var httpServer = http.createServer(function(req,res){
    unifiedServer(req,res)
});
httpServer.listen(config.httpPort, function () {
    console.log('node is readily listening to port', config.httpPort, 'environment', config.envName);
})
var unifiedServer = function (req, res) {
    // console.log(req.url);
    // getting the parsed url 
    var parsedUrl = url.parse(req.url, true);
    console.log("1234",parsedUrl);
    // get the querystring as an object 
    var queryStringObject = parsedUrl.query;
    console.log('123456 queryStringObject',queryStringObject)
    // get path 
    var trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '')
    // console.log('pathname ', trimmedPath);
    // get the http method 
    var method = req.method.toLowerCase();
    // console.log('method', method);
    // getting the headers 
    var headers = req.headers;
    // console.log(headers);
    // get the payload if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function (data) {
        console.log(decoder.write(data));
        buffer += decoder.write(data);
    })
    req.on('end', function () {
        buffer += decoder.end();
        // buffer =  buffer.replace(/^\/+|\/+$/g, '');

        console.log('datatype of buffer',typeof buffer);
        var parsedPayLoad = helpers.parseJSONToObject(buffer);
        // console.log('strigifiedPayLoad ', strigifiedPayLoad );
        var chooseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
        // console.log('choose handler function ', chooseHandler);
        var data = {
            'queryStringObject': queryStringObject,
            'trimmedPath': trimmedPath,
            'method': method,
            'headers': headers,
            'payload': parsedPayLoad
        }


        chooseHandler(data,function(statusCode, payLoad){
            statusCode = typeof(statusCode) == 'number' ? statusCode : 200 ;
            payLoad = typeof(payLoad) == 'object' ? payLoad : {};
            var payLoadString = JSON.stringify(payLoad);
            res.setHeader('content-type','application/json');
            res.writeHead(statusCode);
            res.end(payLoadString);
        })
    })
    // 12 -> 00001100
    // L -> 125 ->  


}



// define request router 
var router = {
    'sample' : handlers.sample,
    'sample1': handlers.sample1,
    'users': handlers.users,
}