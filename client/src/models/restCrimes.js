var Crime = require('./crime.js');

var RestCrimes = function() {

}

RestCrimes.prototype = {
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

  all: function (callback) {
    this.makeRequest(url, function (results) {
      var crimes = this.populateCrimes(results)
      console.log(callback);
      callback(crimes);
    }.bind(this));
  },

  populateCrimes: function (results) {
      var crimes = results.map(function (resultObject) {
        return new Crime(resultObject)
      });
      return crimes;
    }
}

module.exports = RestCrimes;
