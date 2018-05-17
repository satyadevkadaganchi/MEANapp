var http = require('http');
var fs = require('fs');
var colors = require('colors');
var m = require('./math-module/mmm');
var mongoose = require('mongoose');
var db = mongoose.connection;
var dbUrl = 'mongodb://localhost:27017/humanresources'; 
var dummyUrl = 'mongodb://username:password@ds043917.mongolab.com:43917'; 

var TeamSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true  
    }
});

var Team = mongoose.model('Team', TeamSchema);

db.on('error', function(){
    console.log('there was an error communicating with database');
});

mongoose.connect(dbUrl, function(err){
    if(err) {
        return console.log('therewas aproblem connecting to database '+ err);
    }
    console.log('connected');
    var team = new Team({
        name: 'product Development'
    });
    
    team.save(function(error, data){
        if(error){
            console.log(error);
        }else {
            console.dir(data._doc);
        }
        db.close();
        process.exit();
    })
})

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