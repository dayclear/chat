import '../style/style.scss';

(window.onload = function() {

  (function(){
    var username = prompt('请输入昵称');
    var nameSpan = document.getElementById('name');
    var box = document.getElementById('box');
    var input = document.getElementById('input');
    var submit = document.getElementById('submit');
    var socket = io();

    nameSpan.innerHTML = username;
    socket.addEventListener('connect', function() {
      socket.emit('join', username);
    });

    socket.addEventListener('sys', function(mes) {
      box.innerHTML += '<p>'+mes+'</p>';
    });

    socket.addEventListener('newMessage', function(mes, user) {
      box.innerHTML += '<p>'+user+'说：'+msg+'</p>';
    });

    submit.addEventListener('click', function() {
      var html = input.value;
      if(!html || html === ''){
        return false;
      } else {
        socket.send(html);
      }
    })

    function scrollToBottom () {
      box.scrollTop = box.scrollHeight;
    }
  }());

}())
