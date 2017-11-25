var MongoClient = require('mongodb').MongoClient;

function connectdb(callback,err){
var url=  "mongodb://localhost:27017/sdcsanjal"
MongoClient.connect(url,function(err,db){
  if(err) throw err;
  console.log("Connected to database");
  callback(db,err);
  db.close();
})
}
module.exports=connectdb;