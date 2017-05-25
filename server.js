var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('client/build'));

var router = require('./controllers/index.js');
app.use(router);

app.listen(3000, function () {
  console.log('Route Tracker app running on port:', this.address().port);
});
