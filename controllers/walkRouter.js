var express = require ('express');
var app = express();
var walkRouter = express.Router();

//create new walk query object for accessing the database

var WalkQuery = require('../db/walkQuery.js')
var query = new  WalkQuery();

//get walk by id

//get all walks

walkRouter.get('/', function(req, res){
  query.all(function(walks){
    res.json(walks);
  })
});

//add new walk
walkRouter.post('/', function(req, res) {
  var walk = req.body;
  console.log(req.body);
  query.add(walk, function(results){
    res.json(results);
  })
});

walkRouter.put(‘/:id’, function(req, res) {
  var walk = new Walk({
    name: req.body.name,
    start: req.body.start,
    finish: req.body.finish,
    completed: req.body.completed
  });
  walks[req.params.id] = walk;
  res.json({data: walks});
});


module.exports = walkRouter;
