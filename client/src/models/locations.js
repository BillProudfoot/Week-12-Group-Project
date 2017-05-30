var Location = require('./location')

var Locations = function() {

}

Locations.prototype = {

  all: function (callback) {
    this.makeRequest('http://localhost:3000/api/locations', function (results) {
      var locations = this.populateLocations(results)
      callback(locations);

    }.bind(this));
  },

  populateLocations: function (results) {
    var locations = results.map(function (resultObject) {
      return new Location(resultObject)
    });
    return locations;
  },

  makeRequest: function (url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function () {
      if (request.status !== 200) return;
      var jsonString = request.responseText;
      var resultsObject = JSON.parse(jsonString);
      callback(resultsObject);
    });
    request.send();
  },

  add: function(newLocation, callback) {
    var locationData = JSON.stringify(newLocation);
    this.makePostRequest('http://localhost:3000/api/locations', callback, locationData);
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

}

module.exports = Locations