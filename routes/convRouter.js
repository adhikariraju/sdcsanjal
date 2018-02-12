var express=require('express')
var cuConv=express.Router();
var convRouter=express.Router();
var connectdb=require('../db');
var ObjectId=require('mongodb').ObjectId;
var assert=require('assert')
convRouter.route('/')
    .post(function(req,res,next){
        console.log("non param");
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
                        $sort:{
                        updatedAt:-1
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
    });

    const checkAvailability=function checkAvailability(domainid,nextid,callback){
        let convexist=false;
        let convDetail;       
        connectdb(function(db){
            db.collection('conversation')
           .findOne({participants:{$all:[
                	ObjectId(domainid),
	                ObjectId(nextid)
                  ]}},function(err,docs){
                    assert.equal(null,err); 
                    if(err) throw err;
                if(docs!==null){
                    convexist=true;
                    convDetail=docs;                         
                }
                
                else{
                    convexist=false;
                }
                 db.close();
                 callback(convexist,convDetail);        
            })  
          
        })        
    };

    cuConv.route('/')
    .post(function(req,res,next){      
     
        let nextUser=req.body.nextid;
        let domainUser=req.body.domainid;
        console.log("domain and next",domainUser +" "+ nextUser);
        checkAvailability(domainUser,nextUser,function(convexist,convDetail){
            
            if(convexist){
                res.send({convDetail:convDetail})
            }            
            else{
            res.send({convDetail:null})
            }
        })
    })
        
exports.cuConv=cuConv;
exports.convRouter=convRouter;
exports.checkAvailability=checkAvailability;