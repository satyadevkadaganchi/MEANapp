var http = require("http");

http.createServer(function(req,res){
    
    if(req.url === '/' && req.method === 'GET') {
        res.writeHead(200, {'Content-Type': "text/html"});
        res.end('Hello <strong>home page</strong>');
    }else if(req.url === '/account' && req.method === 'GET'){
        res.writeHead(200, {'Content-Type': "text/html"});
        res.end("Hello<strong>account page</strong>")
    }else if(req.url === '/hypenHeader' && req.method === 'GET'){
        res.writeHead(200, {'Content-Type': "text/html"});
        res.end("Hello" + " "+ req.headers['user-agent']);
    }else{
        res.writeHead(404, {'Content-Type': "text/html"});
        res.end();
    }
    
    
}).listen(1337, '127.0.0.1');

console.log("server running at http://127.0.0.1:1337/");