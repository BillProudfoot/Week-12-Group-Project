var Crime = require ('./crime.js');
var restCrimes = require('./restCrimes.js');

var CrimeHelper = function() {

}

CrimeHelper.protoype = {
  coordinateFinder: function(coord1, coord2){
    var avgLat = (coord1.lat + coord2.lat)/2;
    var avgLng = (coord1.lng + coord2.lng)/2;

    var midpoint = {
      lat: avgLat,
      lng: avgLng
    }
    return midpoint;
  }

  urlGenerator: function(coords){
    var baseUrl = 'https://data.police.uk/api/crimes-street/all-crime?lat=' + coords.lat + '&lng=' + coords.lng + '&date=2017-03';
    return baseUrl;
  }
}
