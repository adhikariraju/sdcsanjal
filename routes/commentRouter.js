var express=require('express');
var commentRouter=express.Router();
var connectdb=require('../db.js');
var ObjectId = require('mongodb').ObjectId;
module.exports=commentRouter.post('/',function(req,res){
    let postId=req.body.postId;
    let comment=req.body.comment;
    let commenter=req.body.commenter

    connectdb(function(db){
        db.collection('post')
        .update(
              {_id:ObjectId(postId)},
            {$push:{comment:{commenter:commenter,comment:comment}}}
          )
    })

})