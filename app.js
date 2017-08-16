var express = require('express');
var fs = require('fs');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();

app.use('/js', express.static(path.resolve(__dirname, './build/js')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extends: false}))
app.route('/:id')
      .get(function(req, res) {
        var html = fs.readFileSync(path.resolve('./build/' + 'index.html'), 'utf-8');
        res.send(html);
      });

var server = http.createServer(app);
var io = require('socket.io').listen(server);
var roomUser = [];

io.on('connection', function(socket) {
  var url = socket.request.headers.referer;
  var split_arr = url.split('/');
  var roomid = split_arr[split_arr.length-1] || 'index';
  var user = '';

  socket.on('join', function(username) {
    user = username;
    // 将用户归类到房间
    if (!roomUser[roomid]) {
      roomUser[roomid] = [];
    }
    roomUser[roomid].push(user);
    socket.join(roomid);
    socket.to(roomid).emit('sys', user + '加入了房间');
    socket.emit('sys', user + '加入了房间');
  });

  socket.on('message', function(mes) {
    if (roomUser[roomid].indexOf(user)<0) {
      return false;
    }
    socket.to(roomid).emit('newMessage', mes, user);
    socket.emit('newMessage', mes, user);
  });

  socket.on('disconnect', function() {
    socket.leave(roomid, function(err) {
      if (err) {
        log.error(err);
      } else {
        var index = roomUser[roomid].indexOf(user);
        if (index !== -1) {
          roomUser[roomid].splice(index, 1);
          socket.to(roomid.emit('sys', user+'退出了房间'));
        }
      }
    })
  })
})

server.listen(process.env.PORT || 8888,function(){
  console.log("请访问 localhost:8888");
});