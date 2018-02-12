var express = require('express');
var userListRouter=express.Router();
var connectdb = require('../db.js');
var ObjectId=require('mongodb').ObjectId;

module.exports=userListRouter.get('/',function(req,res){
    connectdb(function(db){
    db.collection('user')
        .find({}).toArray(function(err,docs){
                if(err)throw err;
                if(docs!=0){
                    console.log("entered docs")
                    console.log(docs);
                    res.send({userList:docs});
                }

                else{
                    res.send({userList:null});
                }
            })
            db.close();
    });
    });