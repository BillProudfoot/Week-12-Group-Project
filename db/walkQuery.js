var MongoClient = require('mongodb').MongoClient;

var WalkQuery = function() {
  this.url = 'mongodb://localhost:27017/path_finder'
}

WalkQuery.prototype = {

  add: function(walkToAdd, onQueryFinished) {
    MongoClient.connect(this.url, function(err,db){
      if (db) {
        var collection = db.collection("walks");
        console.log(walkToAdd);
        collection.insert(walkToAdd);
        collection.find().toArray(function(err, docs){
          console.log(docs);
          onQueryFinished(docs);
        });
      }
    });
  },

  all: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db) {
      if (db) {
        var collection = db.collection("walks");
        collection.find().toArray(function(err,docs) {
          onQueryFinished(docs);
        });
      }
    });
  },

  update: function(walkToUpdate, onQueryFinished) {
    MongoClient.connect(this.url, function(err, db) {
      if (db) {
        var collection = db.collection("walks");
      collection.update(
          {name:walkToUpdate.name},
          {name: walkToUpdate.name,
           start: walkToUpdate.start,
           finish: walkToUpdate.finish,
           completed: true}
      );
      collection.find().toArray(function(err, docs){
        console.log(docs);
        onQueryFinished(docs);
      });
      }
    });
  }

  //TODO write an update function - not quite sure how to
  //wrap one in the MongoClient object


}


module.exports = WalkQuery
