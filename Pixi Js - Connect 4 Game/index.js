'use strict'
var express = require('express');

var app = express();
app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.listen('3000',function(){
    console.log('Server running at http://localhost:3000 !!')
});

app.get('/',function(req,res){
    res.sendFile('index.html',{'root':__dirname + '/public'});
})