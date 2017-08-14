var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

app.use('/js', express.static(path.resolve(__dirname, './build/js')));
app.route('/')
      .get(function(req, res) {
        var html = fs.readFileSync(path.resolve('./build/' + 'index.html'), 'utf-8');
        res.send(html);
      });

app.listen(8888, function() {
    console.log("应用实例，访问地址为 localhost:8888")
});