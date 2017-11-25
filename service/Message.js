var express=require('express');
var Router=express.Router();
var connectdb=require('../db.js');

function messageRouter(req,res){
    var convId=req.body.convId
    connectdb(function(db){
        db.collection('conversation')
    })

})

