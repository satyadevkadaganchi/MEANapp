var http = require('http');
var fs = require('fs');
var colors = require('colors');
//require('./lib/connection');
var m = require('./math-module/mmm');
//var mongoose = require('mongoose');
//var db = mongoose.connection;
var express = require('express');
var app =express();

//Route one
app.get('/teams/:teamName/employees/:employeeId', function(req, res, next){
    console.log('teamName =' + req.params.teamName);
    console.log('employeeId =' + req.params.employeeId);
    res.send("path one");
})

//Route two
app.get('/teams/:teamName/employees', function(req, res, next) {
    console.log('Setting content type');
    res.set('Content-Type', 'application/json');
    res.locals.data = 100;
    next();
}, function (req, res, next) {
    console.log('teamName =' + req.params.teamName);
    console.log(res.locals.data);
    res.send('path two');
});

//Route three
app.get(/^\groups\/(\w+)\/(\d+)$/, function(req, res, next) {
    console.log('groupname =' + req.params[0]);
    console.log('groupId = ' + req.params[1]);
    res.send('path three');
});

var server = app.listen(1337, function() {
    console.log('Server startedon port 1337');
});





console.log('Server running at http://127.0.0.1:1337/');