var Crime = require('./crime.js');
bar StopSearch = require('./stopSearch.js')

var ApiHelper = function() {

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

  all: function (url, callback) {
    this.makeRequest(url, function (results) {
      var myResults = this.populate(results)
      callback(myResults);
    }.bind(this));
  },

  populate: function (datatype, results) {
      var resultsArray = results.map(function (resultObject) {
        return (datatype === "street-crime") ? new Crime(resultObject) : new StopSearch(resultObject)
      });
      return resultsArray;
    }
}

module.exports = ApiHelper;
