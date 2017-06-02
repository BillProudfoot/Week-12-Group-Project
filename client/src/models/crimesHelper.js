var Crime = require ('./crime.js');
var RestCrimes = require('./restCrimes.js');

var CrimesHelper = function() {
  this.restCrimes = new RestCrimes();

  this.urls = {
    'street-crime': 'https://data.police.uk/api/crimes-street/all-crime?lat=',
    'stop-search': 'https://data.police.uk/api/stops-street?lat='
  }

}

CrimesHelper.prototype = {
  coordinateFinder: function(coord1, coord2){
    var avgLat = (coord1.lat + coord2.lat)/2;
    var avgLng = (coord1.lng + coord2.lng)/2;

    var midpoint = {
      lat: avgLat,
      lng: avgLng
    }
    return midpoint;
  },

  urlGenerator: function(datatype, coords, year, month){
    console.log("year", year)
    console.log("month", month)
    var url = this.urls[datatype] + coords.lat + '&lng=' + coords.lng + '&date=' + year + "-" + month;
    return url;
  },

  getCrimes: function(datatype, coords, year, month, callback,){
    // var midpoint = this.coordinateFinder(coords1, coords2);
    var url = this.urlGenerator(datatype, coords, year, month);

    this.restCrimes.all(url, function(crimes){

       this.crimesArray = crimes;
       callback();
    }.bind(this))


  },

  countCategories: function(){
    var counterObject = {}
    var array = this.crimesArray;
    array.forEach(function(crime){
      var category = crime.category;
      if (!counterObject[category]){
        counterObject[category] = 1;
      }
      else {
        counterObject[category] +=1
      }
    }.bind(this))
    return counterObject;
  }

}

module.exports = CrimesHelper;
