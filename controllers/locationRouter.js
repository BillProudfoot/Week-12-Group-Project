var express = require('express');
var app = express();
var locationRouter = express.Router();
//models
//since we don't have a database we'll use our front end models at the moment

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


module.exports = locationRouter;