var Location = require('./location')

var Locations = function() {

}

Locations.prototype = {

  all: function (callback) {
    this.makeRequest('http://localhost:3000/api/locations', function (results) {
      console.log("3rd call: ", results)
      var locations = this.populateLocations(results)
      console.log("6th call: ",locations)
      callback(locations);
      console.log("8th call: ",locations)

    }.bind(this));
  },

  populateLocations: function (results) {
    console.log("4th call: ",results)
    var locations = results.map(function (resultObject) {
      return new Location(resultObject)
    });
    console.log("5th call: ",locations)
    return locations;
  },

  makeRequest: function (url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function () {
      if (request.status !== 200) return;
      var jsonString = request.responseText;
      console.log("1st call: ",jsonString)
      var resultsObject = JSON.parse(jsonString);
      console.log("2nd call: ", resultsObject)
      callback(resultsObject);
    });
    request.send();
  }
}

module.exports = Locations