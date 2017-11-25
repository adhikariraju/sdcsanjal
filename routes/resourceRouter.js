var express=require('express')
var resourceRouter=express.Router()
var connectdb=require('../db')
var multer=require('multer')
var ObjectId = require('mongodb').ObjectId; 

 
const storage=multer.diskStorage({
       destination:function(req,file,cb){
           cb(null,'./src/appMediaFiles/resources/');
       },
    
       filename:function(req,file,cb){
          cb(null,Date.now()+'-'+file.originalname);
       }
   })

    const upload=multer({storage})

    resourceRouter.route('/')
        .post(upload.single('file'),function(req,res,next){
            console.log(req.body);
            
            let fileData=req.body;
        
            let tags=fileData.tags;
            let title=fileData.title;
            
            let file=req.file.filename;
            let createdAt=new Date();
            let createdBy=fileData.createdBy
        
            connectdb(function(db){
                db.collection('resource')
                .insert({
                    tags:tags,
                    title:title,
                    file:file,
                    createdAt:createdAt,
                    createdBy:ObjectId(createdBy)
                },function(err,docs){
                    if(err)throw err;

                    if(docs!=0){
                        res.json({
                            status:"Resource upload Successful",
                            success:true
                        })
                    }

                    else{
                        res.json({
                            status:"Error while uploading resource",
                            success:false
                        })
                    }
                })
            })
        })

        .get(function(req,res,next){
            connectdb(function(db){
                db.collection('resource').aggregate([
                  {
                    $lookup:{
                        from:"user",
                        localField:"createdBy",
                        foreignField:"_id",
                        as:"creator"
                    }
              }],function(err,result){
                  if(err) throw err;
                  if(result!=0)
                  res.send(result)
                  
                  else 
                    res.send(null);
              }) 
            })
        })
module.exports=resourceRouter;