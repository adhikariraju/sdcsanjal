var express = require('express');
var registerRouter=express.Router();
var connectdb = require('../db.js');
var ObjectId=require('mongodb').ObjectId;
var sync = require('synchronize')

module.exports=registerRouter.post('/',function(req,res){
    console.log('register enterede',req.body)
     var userData={
         name:req.body.fullname,
         profile_pic:'defaultavatar.png',
         type:req.body.userType
     }
    let username=req.body.email; 
       
    function checkAvailability(username,callback){
        let userexist=false;
        connectdb(function(db){
            db.collection('account')
            .find({username:username}).toArray(function(err,docs){
                if(err) throw err;
                console.log("check user availabilty",docs)
                if(docs.length>0){
                    console.log("not null");
                    userexist=true;
                } 
                
                else{        
                    console.log("null");
                    userexist=false;
                }

                db.close();
                callback(userexist);
            })
        });
    }

    function registerUser(userData,callback){
        let registerSuccess=false;
        let newUserId=null;
        connectdb(function(db){
             db.collection('user')
                .insert(userData,function(err,docs){
                    if(err) throw err;
                      if(docs!=0){
                     registerSuccess=true;
                     newUserId=docs.ops[0]._id;
                    }

                    else{
                        newUserId=null,
                        registerSuccess=false;
                    }
                callback(newUserId,registerSuccess);    
                });
             db.close();
        })     
    }
    
    checkAvailability(username,function(userexist){
        if(userexist){
            console.log("userexist",userexist);
            res.json(
                {
                userExist:true,
                message:"UserName Already Exist"
                }
            )
        }
            
        else{         
            registerUser(userData,function(newUserId,registerSuccess){
                if(registerSuccess){
                    console.log("registration success");
                    connectdb(function(db){
                    db.collection('account')
                        .insert({username:req.body.email,
                                 password:req.body.password,
                                 profile:{
                                  "$ref" : "user",
                                  "$id" : ObjectId(newUserId)        
                                }}
                                ,function(err,docs){
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
                }
                else{
                    res.json({
                        isValidInput:false                
                    });
                }
            })         
        }
    })  
});