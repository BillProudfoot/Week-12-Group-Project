var Crime = require('./crime.js');
var StopSearch = require('./stopSearch.js')

var ApiHelper = function() {
  this.urls = {
    'street-crime': 'https://data.police.uk/api/crimes-street/all-crime?lat=',
    'stop-search': 'https://data.police.uk/api/stops-street?lat='
  }
};

ApiHelper.prototype = {
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

    allCrimes: function (url, callback) {
      this.makeRequest(url, function (results) {
        var crimes = this.populateCrimes(results)
        callback(crimes);
      }.bind(this));
    },

    allSearches: function (url, callback) {
      this.makeRequest(url, function (results) {
        var searches = this.populateSearches(results)
        callback(searches);
      }.bind(this));
    },

    populateSearches: function (results) {
        var searches = results.map(function (resultObject) {
          return new StopSearch(resultObject)
        });
        return searches;
      },

    populateCrimes: function (results) {
        var crimes = results.map(function (resultObject) {
          return new Crime(resultObject)
        });
        return crimes;
      }
}

module.exports = ApiHelper;
