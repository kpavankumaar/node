// var obj = require('./basic');
// obj.name = 'pavan';
// console.log();
var http = require('http');
var https = require('https');
var url = require('url');
var config = require('./config');
var fs = require('fs');
var StringDecoder = require('string_decoder').StringDecoder;
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
    console.log(req.url);
    // getting the parsed url 
    var parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl);
    // get path 
    var trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '')
    console.log('pathname ', trimmedPath);
    // get the http method 
    var method = req.method.toLowerCase();
    console.log('method', method);
    // getting the headers 
    var headers = req.headers;
    console.log(headers);
    // get the payload if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function (data) {
        console.log(decoder.write(data));
        buffer += decoder.write(data);
    })
    req.on('end', function () {
        buffer += decoder.end();
        console.log('test content before logic');
        if (trimmedPath === 'sample') {
            console.log('inside sample condition');
            res.writeHead(200);
            var sampleDataSting = JSON.stringify({ 'name': 'sample content' })
            res.end(sampleDataSting);
        } else if (trimmedPath === 'sample1') {
            res.writeHead(200);
            res.end({ 'name': 'sample1 content' });
        }
        else {
            console.log('inside failed path condition');
            res.writeHead(404);
            var failedCondition = JSON.stringify({})
            res.end(failedCondition);
        }

        // res.end('hello this is javascript ');

        // var chooseHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
        // console.log('choose handler function ', chooseHandler);
        // var data = {
        //     'trimmedPath': trimmedPath,
        //     'method': method,
        //     'headers': headers
        // }


        // chooseHandler(data,function(statusCode, payLoad){
        //     statusCode = typeof(statusCode) == 'number' ? statusCode : 200 ;
        //     payLoad = typeof(payLoad) == 'object' ? payLoad : {};
        //     var payLoadString = JSON.stringify(payLoad);
        //     res.setHeader('content-type','application/json');
        //     res.writeHead(statusCode);
        //     res.end(payLoadString);
        // })
    })
    // 12 -> 00001100
    // L -> 125 ->  


}

// define all handlers 
var handlers = {};
handlers.sample = function(data,cb){
    cb(200,{'name':'sample handler'});
}
handlers.sample1 = function(data,cb){
    cb(200, {'name': 'sample handler1'})
}
handlers.notFound = function(data,cb){
    cb(404);
}

// define request router 
var router = {
    'sample' : handlers.sample,
    'sample1': handlers.sample1
}