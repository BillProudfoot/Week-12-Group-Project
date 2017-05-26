var Locations = require('../models/locations');
var MapWrapper = require('../mapWrapper.js');


var UI = function() {
  var locations = new Locations();
  locations.all(function (locations) {
    this.render(locations);
  }.bind(this));

  this.loadMap();
  // populateDropDowns()
  
}

UI.prototype = {

  loadMap: function(){
  var center = {lat: 55.9533, lng: -3.1883};
  var zoom = 10;
  var mapDiv = document.getElementById("main-map");

  var mainMap = new MapWrapper(mapDiv, center, zoom);
  mainMap.addClickEvent();
  
  var whereAmIButton = document.querySelector('#geolocate')
  whereAmIButton.addEventListener('click', mainMap.geoLocate.bind(mainMap));
},

//THIS WILL CALL THE MONGO DB AND POPULATE START AND FINISH DROP DOWNS WITH OUR CHOSEN START LOCATION NAMES

  populateDropDowns: function(locations) {
  var startSelect = document.querySelector('#start');
  var finishSelect = document.querySelector('#finish');

  locations.forEach(function(location, index){
    location.index = index;
    var option = document.createElement('option');
    option.text = location.name;
    startSelect.appendChild(option)
    finishSelect.appendChild(option)
    })
  }
}

module.exports = UI;