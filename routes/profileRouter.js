var express = require('express');
var profileRouter=express.Router();
var connectdb = require('../db.js');
var ObjectId = require('mongodb').ObjectId; 

module.exports=profileRouter.post('/',function(req,res){
    console.log('profile get',req.body)
    var id=req.body._id;
    connectdb(function(db){
        db.collection('user')
          .findOne({_id:ObjectId(id)},function(err,docs){
              if(err) throw err;
              console.log("result",docs);
              console.log("details");
 
            if(docs!=0){
              console.log("entered docs");              
               res.json(
                  {
                   profile:docs
                  }
                );
            }
                else{
                    res.json({
                    isValidInput:false                
                });
                }
            })
        console.log(db.result);
    })

})