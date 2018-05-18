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

var EmployeeSchema = new  mongoose.Schema({
   name: {
       first: {
           type: String,
           required: true
       },
       last: {
           type: String,
           required: true
       }
   },
   team: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Team'
   },
   image: {
       type: String,
       default: 'images/user.png'
   },
   address: {
       lines: {
           type: [String]
       },
       postal: {
           type: String
       }
   }
});

var Employee = mongoose.model('Employee', EmployeeSchema);

var Team = mongoose.model('Team', TeamSchema);

db.on('error', function(){
    console.log('there was an error communicating with database');
});

mongoose.connect(dbUrl, function(err){
    if(err) {
        return console.log('there was a problem connecting to database '+ err);
    }
    console.log('connected m');

insertTeams(function(err, pd, devops, acct) {
    if(err) {
        return console.log(err)
    }
    insertEmployees(pd, devops, acct, function(err, result) {
        if (err){
            console.error(err);
        }else {
            console.info('database activity complete')
        }
        db.close();
        process.exit();
    })
}) 
}) 

function insertTeams(callback) {
     Team.create([{
        name: 'product Development'
    }, {
        name: 'Dev Ops'
    }, {
        name: 'Accounting'
    }], function (error, pd, devops, acct) {
        if(error){
           return callback(error);
        }else {
            console.info('team succesfully added');
            callback(null, pd, devops, acct);
        }
    });
}

function insertEmployees(pd, devops, acct, callback) {
    Employee.create([{
        name: {
            first: 'John',
            last: 'Adams'
        },
        team: pd._id,
        address: {
            lines: ['2 Lincon Memorial Cir NW'],
            zip: 20037
        }   
      },{
          name: {
            first: 'Thomas',
            last: 'Jeferson'
        },
        team: devops._id,
        address: {
            lines: ['1600 Pennsylvania Avenue', 'White House'],
            zip: 20500
      }
      }, {
          name: {
            first: 'James',
            last: 'Madinson'
        },
        team: acct._id,
        address: {
            lines: ['2 15th St NW', 'PO Box 8675309'],
            zip: 20007
      }
      }, {
          name: {
            first: 'James',
            last: 'Manore'
        },
        team: acct._id,
        address: {
            lines: ['1850 West basin Dr SW', 'Suite 210'],
            zip: 20242
      }
   }], function(error, johnadams) {
       if(error) {
           return callback(error);
       }else {
           console.info('employees succesfully added');
           callback(null, {
               team: pd,
               employee: johnadams
           });
       }
   })
}
    
  




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