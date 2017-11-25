var apiRouter =require('./api');
var express =require('express')
var ioserver=require('http').Server(express());
var bodyParser =require('body-parser');
var postRouter = require('./routes/postRouter');
var loginRouter=require('./routes/loginRouter');
var profileRouter=require('./routes/profileRouter');
var registerRouter=require('./routes/registerRouter');
var userListRouter=require('./routes/userListRouter');
var resourceRouter=require('./routes/resourceRouter')
var convRouter=require('./routes/convRouter')
var messageRouter=require('./')
var socketIo=require('socket.io');
var download=require('download')
//var Message=require('./service/Message');
var connectdb=require('./db.js')
var ObjectId=require('mongodb').ObjectId;


const server = express();
var io=socketIo(ioserver);

//setting a port for using socket.io
ioserver.listen(80);

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }))

server.use('/login',loginRouter);
server.use('/profile',profileRouter);
server.use('/register',registerRouter);
server.use('/post',postRouter);
// server.use('/userlist',userListRouter);
server.use('/conversation',convRouter);
server.use('/resource',resourceRouter);

server.post('/download',function(res,req){
   res.download(__dirname+'./src/appMediaFiles/resources/'+req.file);
     
})
// server.post('/login',function(res,req){
//     console.log("login post")
// })


io.on('connection',function(socket){
  console.log('user connected to socket');
  socket.on('message',function(data){
    
    console.log("message",data);
    let convId=data.convId;
    let sender=data.sender;
    let content=data.content;
    
      connectdb(function(db){
          db.collection('conversation')
            .update(
              {_id:ObjectId(convId)},
            {$push:{messages:{sender:sender,content:content}}}
          )
        })
      socket.broadcast.emit(convId,data);      
    })
   
  
})

server.listen(3000,`localhost`, () => {
console.log('Express listening on port', 3000);
});      