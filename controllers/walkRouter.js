var express = require ('express');
var app = express();
var walkRouter = express.Router();

//create new walk query object for accessing the database

// var WalkQuery = require('../db/walkQuery.js')
// var query = new  WalkQuery();
//
// //get walk by id
//
// //get all walks
//
// walkRouter.get('/', function(req, res){
//   query.all(function(walks){
//     res.json(walks);
//   })
// });
//
// //add new walk
// walkRouter.post('/', function(req, res) {
//   var walk = req.body;
//   console.log(req.body);
//   query.add(walk, function(results){
//     res.json(results);
//   })
// });
//
// walkRouter.put('/', function(req, res) {
//   var walk = req.body;
//   query.update(walk, function(results){
//     res.json(results);
//   })
// });


module.exports = walkRouter;
