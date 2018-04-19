var http = require('http');
var fs = require('fs');
var colors = require('colors');
var m = require('mmm');


console.log(m.add(3,5));
console.log(m.multiply(4,5));
console.log(m.factorial(4));
console.log('Hello world'.green);

http.createServer(function (req,res){
    if(req.url === '/favicon.ico'){
        return res.end();
    }
    console.log('Incoming request to ' +req.url);
    
    var i = 2;
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    setTimeout(function(){
        fs.readFile(__filename,{
            encoding: 'utf8'
        }, function (error, contents){
            if (error) {
                console.error(error);
                return res.end();
            }
            console.log('sending response for' + req.url);
            res.end(contents);
        });
    },5000);
    
    while(i--){
        console.log('Loop value:' +i + '\r');
    }
    
    
}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');