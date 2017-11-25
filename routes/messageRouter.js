var express=require('express');
var Router=express.Router();
var connectdb=require('../db.js');

module.exports=messageRouter.post('/',function(req,res){
    var convId=req.body.convId
    connectdb(function(db){
        db.collection('conversation')
    })

})