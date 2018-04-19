process.argv.forEach(function(value, index, args){
    console.log('process.argv[' + index + '] = ' + value);
});


console.log("currently execting file is"+ __filename);
console.log("It is located in"+ __dirname);

console.log("starting in " + process.cwd());

try {
    process.chdir("/");
} catch (error) {
    console.error('chdir:' + error.message);
}

console.log('current working directory is now' + process.cwd());



var fs = require('fs');
var data="some file data";

fs.writeFile(__dirname + '/a.txt' , {
    flag: 'wx'
},function(error){
    if(error){
        return console.error(error.message);
    }
    
})




