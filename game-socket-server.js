const express = require('express');
const http = require('http');
const path = require('path');
const sio = require('socket.io');

const app = express();
app.use(express.static(path.join(__dirname,'public')));//托管静态资源
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'./game-socket-browser.html'));
});


const server = http.createServer(app);
const io = sio.listen(server);
io.on('connection',(socket)=>{
  console.log('a user connected...');
  socket.on('move',(data)=>{
    console.log(data);
    socket.broadcast.emit('drag',data);
  });
});

server.listen(3000,()=>{
  console.log('3000 is ok ...');
})
