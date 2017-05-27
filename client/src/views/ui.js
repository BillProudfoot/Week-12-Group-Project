var Locations = require('../models/locations');
var MapWrapper = require('../mapWrapper.js');


var UI = function() {
  var locations = new Locations();
  locations.all(function (locations) {
    // console.log(".all locationsLLL ", locations)
  this.render(locations)
  }.bind(this));

  this.loadMap();
  // console.log("Will my locations work here?", locations)
  // this.populateDropDowns(locations)
  
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

render: function(locations) {
  var storedLocation = localStorage.getItem('selectedLocation');
    var locationToDisplay = null;

    if (storedLocation) {
      locationToDisplay = JSON.parse(storedLocation);
      
      startSelect.selectedIndex = locationToDisplay.index;
    }
    else {
      locationToDisplay = locations[0];
    }

    this.populateDropDowns(locations);
    // container.appendChild(li);
  },

//THIS WILL CALL THE MONGO DB AND POPULATE START AND FINISH DROP DOWNS WITH OUR CHOSEN START LOCATION NAMES

  populateDropDowns: function(location) {
    console.log("7th call: ", location)
  // var finishSelect = document.querySelector('#finish');
      var startSelect = document.querySelector('#start');
  

  console.log("8th call: ",location)
  location.forEach(function(location, index){
    location.index = index;
    var option = document.createElement('option');
    option.value = index;
    option.text = location.name;
    startSelect.appendChild(option)
    // finishSelect.appendChild(option)
    })
  }
}

module.exports = UI;