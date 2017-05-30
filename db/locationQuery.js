var MongoClient = require('mongodb').MongoClient;

var LocationQuery = function () {
  this.url = 'mongodb://localhost:27017/path_finder'
}

LocationQuery.prototype = {
  all: function (onQueryFinished) {
    MongoClient.connect(this.url, function (err, db) {
      if (db) {
        var collection = db.collection('locations');
        collection.find().toArray(function (err, docs) {
          onQueryFinished(docs);
        });
      }
    });
  },

  add: function(locationToAdd, onQueryFinished) {
    MongoClient.connect(this.url, function(err,db){
      if (db) {
        var collection = db.collection('locations');
        console.log(locationToAdd);
        collection.insert(locationToAdd);
        collection.find().toArray(function(err, docs){
          console.log(docs);
          onQueryFinished(docs);
        });
      }
    });
  },

};



module.exports = LocationQuery;
