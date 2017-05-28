var MongoClient = require('mongodb').MongoClient;

var WalksQuery = function() {
  this.url = 'mongodb://localhost:27017/path_finder'
}

WalksQuery.prototype = {

  add:function(walkToAdd, onQueryFinished) {
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
  }

}
