var express=require('express')
var convRouter=express.Router();
var connectdb=require('../db');
var ObjectId=require('mongodb').ObjectId;

convRouter.route('/')
.post(function(req,res,next){
    console.log("req",req.body)
    let userid=req.body._id;
   connectdb(function(db){
       db.collection('conversation')
       .aggregate([
            {
                $match:{
                 participants:ObjectId(userid)
                }
            },  
            {
              $unwind:"$participants"
            },
            {
                $match:{
                participants:{$ne:ObjectId(userid)}
                }
            },
            {
                $lookup:{
                from:"user",
                localField:"participants",
                foreignField:"_id",
                as:"friend"
                }  
            }   
       ],function(err,docs){
           
           if(docs!=0){
               res.send(docs);
               
           } 
            else{
               res.json({status:"Failed"})
            }
       })
   })
})
module.exports=convRouter;