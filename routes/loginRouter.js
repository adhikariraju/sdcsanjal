var express = require('express');
var loginRouter=express.Router();
var connectdb = require('../db.js');

module.exports=loginRouter.post('/',function(req,res){
    console.log('login enterede',req.body)
    var username=req.body.username;
    var password=req.body.password;
    connectdb(function(db){
        db.collection('account')
          .findOne({username:username,password:password},function(err,docs){
                 if(err) throw err;
                 if(docs!=null){
                    res.json(
                        {
                        isValidInput:true,
                        id:docs.profile.oid
                        }
                        );
                 }
                 else{
                    res.json({
                    isValidInput:false                
                 });
                }
            })
    })

})