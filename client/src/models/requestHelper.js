//TODO possibly delete this file as its functionality can be handled in apiHelper

var Crime = require('./crime.js')
var StopSearch = require('./stopSearch.js')

var RequestHelper = function(){
  this.urls = {
    'street-crime': 'https://data.police.uk/api/crimes-street/all-crime?lat=',
    'stop-search': 'https://data.police.uk/api/stops-street?lat='
  }
}

RequestHelper.prototype = {
  makeRequest: function(){

  },

  all: function(){

  }

  populate: function(){

  }
}
