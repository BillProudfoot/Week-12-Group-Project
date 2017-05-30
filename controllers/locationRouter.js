var express = require('express');
var app = express();
var locationRouter = express.Router();

var LocationQuery = require('../db/locationQuery.js');
var query = new LocationQuery();

// Get location by id
locationRouter.get('/:id', function(req, res){
  res.json(films[req.params.id]);
});

//location index
locationRouter.get('/', function(req, res) {
  query.all(function (locations) {
    res.json(locations);
  });
});

locationRouter.post('/', function(req, res) {
  var location = req.body;
  query.add(location, function(results){
    res.json(results);
  })
});

locationRouter.put('/', function(req, res) {
  var location = req.body;
  query.update(location, function(results){
    res.json(results);
  })
});


module.exports = locationRouter;
