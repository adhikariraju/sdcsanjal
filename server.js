var apiRouter =require('./api');
var express =require('express')
var debug=require('debug')('rest-server:server')
var ioserver=require('http').Server(express());
var bodyParser =require('body-parser');
var postRouter = require('./routes/postRouter');
var loginRouter=require('./routes/loginRouter');
var profileRouter=require('./routes/profileRouter');
var registerRouter=require('./routes/registerRouter');
var userListRouter=require('./routes/userListRouter');
var resourceRouter=require('./routes/resourceRouter');
var convRouter=require('./routes/convRouter').convRouter;
var cuConv=require('./routes/convRouter').cuConv;
var checkAvailability=require('./routes/convRouter').checkAvailability;
var commentRouter=require('./routes/commentRouter');
//var messageRouter=require('./')
var socketIo=require('socket.io');
var download=require('download')
//var Message=require('./service/Message');
var connectdb=require('./db.js')
var ObjectId=require('mongodb').ObjectId;
var https=require('https');
var fs=require('fs');


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

server.all('*',function(req,res,next){
  if(req.secure){
    return next();
  }
  res.redirect('https://'+req.hostname+':'+app.get('secPort')+req.url);
})
server.use('/login',loginRouter);
server.use('/profile',profileRouter);
server.use('/register',registerRouter);
server.use('/post',postRouter);
server.use('/userlist',userListRouter);
server.use('/conversation',convRouter);
server.use('/cuConv',cuConv);
server.use('/resource',resourceRouter);
server.use('/comment',commentRouter);

server.get('/download/:file',function(req,res,next){
  var path=require('path');
  let dirname=path.resolve('.')+'/src/appMediaFiles/resources/'+req.params.file;
  let names=(req.params.file).split('-');
  let showname=names[names.length-1];
  console.log("dirname",dirname)
  console.log("showname",showname);
  res.download(dirname,showname);
})


io.on('connection',function(socket){
  console.log('user connected to socket');
  socket.on('message',function(data){
    console.log("data",data);
    let convId=data.convId;
    let senderId=data.sender;
    let content=data.content;
    let convType=data.convType;
    let domainId=data.domainId;
    let nextId=data.nextId;
    
    function updateMessage(){
        connectdb(function(db){
              db.collection('conversation')
                .update(
                  {_id:ObjectId(convId)},
                  {
                    $set:{recentChat:content,updatedAt:new Date()},
                    $push:{messages:{sender:ObjectId(senderId),content:content,createdAt:new Date()}}
                  }
                )
              })
    }
            
        if(convType=='old'){  
           updateMessage();
        }

        else if(convType=='new'){
          checkAvailability(domainId,nextId,function(convExist,convDetail){
              if(convExist){
                 updateMessage();
              }
              
              else{
                connectdb(function(db){
                  db.collection('conversation')
                    .insert(
                      {
                        participants:[ObjectId(domainId),ObjectId(nextId)],
                        recentChat:content,
                        updatedAt:new Date(),
                        messages:[{
                                   sender:ObjectId(senderId),
                                   content:content,
                                   createdAt:new Date()
                                 }]
                      }
                    )
                })
              }
          })
        }    
      
      socket.broadcast.emit(convId,data);      
    }) 
})

server.listen(3000,`localhost`, () => {
console.log('Express listening on port', 3000);
});


/* Creating the https server */
server.set('secPort',3443);

var options={
    key:fs.readFileSync(__dirname+'/private.key'),
    cert:fs.readFileSync(__dirname+'/certificate.pem')
  };
  
  var secureServer=https.createServer(options,server);

  secureServer.listen(server.get('secPort',function(){
    console.log("Server listening on port",server.get('secPort'));
  }))

  secureServer.on('error', onError);
secureServer.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;

    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
  