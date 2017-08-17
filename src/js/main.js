import '../style/style.scss';

(window.onload = function() {

  (function(){
    var username = prompt('请输入昵称');
    if (username.length > 4) {
      username = username.slice(0, 4);
    };
    if (username.trim() === '') {
      username = '匿名';
    };
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
      box.innerHTML += '<p class="red">'+mes+'</p>';
    });

    socket.addEventListener('newMessage', function(mes, user) {
      box.innerHTML += '<p class="black"><span>'+user+'</span>：'+mes+'</p>';
    });

    submit.addEventListener('click', function() {
      var html = input.value;
      
      if (!html || html === '') {
        return false;
      } else {
        socket.send(html);
      };
      input.value = '';
    })

    function scrollToBottom () {
      box.scrollTop = box.scrollHeight;
    }
  }());

}())
