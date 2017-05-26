var Locations = function() {

}

Locations.prototype = {
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

  all: function (callback) {
    this.makeRequest('http://localhost:3000/api/locations', function (results) {
      console.log(results)
      // var locations = this.populateFilms(results)
      // console.log(films)
      // callback(films);
    }.bind(this));
  },
}

module.exports = Locations