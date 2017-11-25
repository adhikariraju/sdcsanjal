var express = require('express');
var postRouter=express.Router();
var connectdb=require('../db.js')
var ObjectId = require('mongodb').ObjectId; 

  postRouter.route('/')
    .get(function(req,res,next){
        connectdb(function(db){
            let docs=[];
            db.collection('post')
              .aggregate([
                  {
                    $lookup:{
                        from:"user",
                        localField:"userid",
                        foreignField:"_id",
                        as:"userDetail"
                    }
              }],function(err,result){
                  console.log("result",result);
                  res.send(result) 
              })    
            
                              

        db.close();    
        })
    })

    .post(function(req,res){
        console.log(req.body.Title);
        let comment='';
        if(req.body.comment)
        comment=req.body.comment;
        let post={
            title:req.body.Title,
            post:req.body.Question,
            userid:ObjectId(req.body.userid),      
            createdAt:new Date,
            comment:comment
        }
        connectdb(function(db){
        db.collection('post')
        .insert(post,function(err,docs){
            if(err) throw err;

            if(docs!=0){
                res.json({
                    status:"Successfully post",
                    "postId":docs.oid
                })
            }
            
            else{
                res.json({
                    status:"Cannot create Post"
                })
            }
        })
    })
   });
module.exports=postRouter;