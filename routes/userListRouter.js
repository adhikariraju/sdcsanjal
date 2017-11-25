var express = require('express');
var userListRouter=express.Router();
var connectdb = require('../db.js');
var ObjectId=require('mongodb').ObjectId;

module.exports=userListRouter.post('/',function(req,res){
    connectdb(function(db){
    db.collection('account')
        .find({},function(err,docs){
                if(docs!=0){
                    console.log("entered docs")
                    console.log(docs);
                    newUser={
                    username:docs.ops[0].username, 
                    userId:ObjectId(docs.ops[0]._id)                   
                    }
                    res.json(
                    {
                        isValidInput:true,
                        id:docs.ops[0]._id
                    }
                    );
                    registerSuccess=true;
                }

                else{
                    res.json({
                    isValidInput:false                
                    });
                }
            })
            db.close();
    });
    });