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
    var name = document.getElementById('name');
    var nameSpan = document.getElementById('nameSpan');
    var main = document.getElementById('main');
    var box = document.getElementById('box');
    var input = document.getElementById('input');
    var submit = document.getElementById('submit');
    var socket = io();

    nameSpan.innerHTML = username;
    socket.addEventListener('connect', function() {
      socket.emit('join', username);
    });

    socket.addEventListener('inRoom', function(mes) {
      box.innerHTML += '<p class="red">'+mes+'</p>';
      scrollToBottom();
    });

    socket.addEventListener('newMessage', function(mes, user) {
      box.innerHTML += '<p class="black"><span>'+user+'</span>：'+mes+'</p>';
      scrollToBottom();
    });

    submit.addEventListener('click', function() {
      var html = input.value;
      
      if (!html || html === '') {
        return false;
      } else {
        socket.send(html);
      };
      input.value = '';
      input.focus();
      scrollToBottom();
    });

    function scrollToBottom () {
      main.scrollTop = box.offsetHeight + name.offsetHeight;
    }
  }());

}())
