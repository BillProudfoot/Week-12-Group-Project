var Walk = require('./walk.js');

var Walks = function() {

}

Walks.prototype = {
  makeRequest: function(url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function() {
      if (request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsObject = JSON.parse(jsonString);
      callback(resultsObject);
    });
    request.send();
  },

  makePostRequest: function (url, callback, payload) {
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', function() {
      if (request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsObject = JSON.parse(jsonString);
      callback(resultsObject);
    })
    request.send(payload);
  },

  makePutRequest: function (url, callback, payload) {
    var request = new XMLHttpRequest();
    request.open('PUT', url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', function() {
      if (request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsObject = JSON.parse(jsonString);
      callback(resultsObject);
    })
    console.log(payload)
    request.send(payload);
  },


  all: function (callback) {
  this.makeRequest('http://localhost:3000/api/walks', function (results) {
    var walks = this.populateWalks(results)
    callback(walks);
  }.bind(this));
},

  populateWalks: function(results) {
    var walks = results.map(function (resultsObject) {
      return new Walk(resultsObject)
    });
    return walks;
  },

  add: function(newWalk, callback) {
    var walkData = JSON.stringify(newWalk);
    this.makePostRequest('http://localhost:3000/api/walks', callback, walkData);
  },

  update: function(walkToUpdate, callback) {
    var walkData = JSON.stringify(walkToUpdate);
    console.log(walkData);
    this.makePutRequest('http://localhost:3000/api/walks', callback, walkData);
  }



}

module.exports = Walks;
