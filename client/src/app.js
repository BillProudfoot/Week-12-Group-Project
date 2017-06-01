var UI = require('./views/ui');
// var express = require('express');
// var app = express();
// var path = require('path');

// app.use(express.static('public'));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

var app = function() {
  new UI();
}

// window.addEventListener('load', function() {
//   new PieChart();
//   new LineChart();
// });

window.addEventListener("load", app);