var Crime = require ('./crime.js');
var ApiHelper = require('./apiHelper.js');

var CrimesHelper = function() {
  this.apiHelper = new ApiHelper();

  this.urls = {
    'street-crime': 'https://data.police.uk/api/crimes-street/all-crime?lat=',
    'stop-search': 'https://data.police.uk/api/stops-street?lat='
  }

}

CrimesHelper.prototype = {

  urlGenerator: function(dataset, coords, year, month){
    var url = this.urls[dataset] + coords.lat + '&lng=' + coords.lng + '&date=' + year + "-" + month;
    return url;
  },

  getCrimeResults: function(dataset, coords, year, month, callback,){
    // var midpoint = this.coordinateFinder(coords1, coords2);
    var url = this.urlGenerator(dataset, coords, year, month);

    this.apiHelper.allCrimes(url, function(events){
       this.resultsArray = events;
       callback();
    }.bind(this))

  },

  getSearchResults: function(dataset, coords, year, month, callback,){
    // var midpoint = this.coordinateFinder(coords1, coords2);
    var url = this.urlGenerator(dataset, coords, year, month);

    this.apiHelper.allSearches(url, function(events){
       this.resultsArray = events;
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
