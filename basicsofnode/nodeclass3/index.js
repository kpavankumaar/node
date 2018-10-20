// var obj = require('./basic');
// obj.name = 'pavan';
// console.log();
var http = require('http');
var url = require('url');
var config = require('./config');
var StringDecoder = require('string_decoder').StringDecoder;
var server = http.createServer(function(req,res){
    console.log(req.url);
    // getting the parsed url 
    var parsedUrl = url.parse(req.url,true);
    console.log(parsedUrl);
    // get path 
    var trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g,'')
    console.log('pathname ', trimmedPath);
    // get the http method 
    var method = req.method.toLowerCase();
    console.log('method', method );
    // getting the headers 
    var headers = req.headers;
    console.log(headers);
    // get the payload if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data',function(data){
        console.log(decoder.write(data));
        buffer += decoder.write(data);
    })
    req.on('end',function(){
        buffer += decoder.end();
        res.end('hello this is javascript ');
    })
    // 12 -> 00001100
    // L -> 125 ->  
    

})
server.listen(config.port,function(){
    console.log('node is readily listening to port', config.port, 'environment', config.envName);
})