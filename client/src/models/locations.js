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
    // console.log("4th call: ",results)
    var locations = results.map(function (resultObject) {
      return new Location(resultObject)
    });
    // console.log("5th call: ",locations)
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
  }
}

module.exports = Locations