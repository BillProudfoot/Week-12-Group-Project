var Locations = require('../models/locations');
var MapWrapper = require('../mapWrapper.js');
var currentRoute = document.getElementById('currently-selected-route')


var UI = function() {
  var locations = new Locations();
  locations.all(function (locations) {
  this.populateStartDropDown(locations)
  this.populateFinishDropDown(locations)
  }.bind(this));

  this.loadMap();
  
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

//THIS CALLS MONGO DB AND POPULATES START AND FINISH DROP DOWNS WITH OUR CHOSEN START LOCATION NAMES AND SETS THE OPTION VALUE TO THEIR CORRESPONDING INDEX

  populateStartDropDown: function(locations) {
    console.log("7th call: ", locations)
    var startSelect = document.querySelector('#start');

    locations.forEach(function(location, index){
      location.index = index;
      var option = document.createElement('option');
      option.value = index;
      option.text = location.name;
      startSelect.appendChild(option)
    });

    startSelect.addEventListener('change', function (event) {
      var index = this.value;
      var location = locations[index];
        
      app.updateStartInfo(location);
    });
  },

  populateFinishDropDown: function(locations) {
    var finishSelect = document.querySelector('#finish');
    locations.forEach(function(location, index){
      location.index = index;
      var option = document.createElement('option');
      option.value = index;
      option.text = location.name;
      finishSelect.appendChild(option)
    });

    finishSelect.addEventListener('change', function (event) {
      var index = this.value;
      var location = locations[index];
        
      // updateFinsihInfo(location);
    });
  },



}

module.exports = UI;