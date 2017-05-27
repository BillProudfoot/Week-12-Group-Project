var Locations = require('../models/locations');
var MapWrapper = require('../mapWrapper.js');



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
      var currentRoute = document.getElementById('currently-selected-route');

      var startTagName = document.createElement('h3');
      var startTagLatlng = document.createElement('p');

      startTagName.innerText = "Your starting Location: " + location.name;
      startTagLatlng.innerText = "latlng of starting location: " + location.latlng.lat + " " + location.latlng.lng;

      currentRoute.appendChild(startTagName);
      currentRoute.appendChild(startTagLatlng);
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
      var currentRoute = document.getElementById('currently-selected-route');

      var finishTagName = document.createElement('h3');
      var finishTagLatlng = document.createElement('p');

      finishTagName.innerText = "Your finishing Location: " + location.name;
      finishTagLatlng.innerText = "latlng of finishing location: " + location.latlng.lat + " " + location.latlng.lng;

      currentRoute.appendChild(finishTagName);
      currentRoute.appendChild(finishTagLatlng);
    });
  },

  // currentRouteDiv: function (location){
  //   var currentRoute = document.getElementById('currently-selected-route')
  //   var hTag = document.createElement('h3');
  //   var pTag = document.createElement('p');

  //   hTag.text = "Your starting Location: " + location.name;
  //   pTag.text = "latlng of starting location: " + location.latlng;

  //   currentRoute.appendChild(hTag);
  //   currentRoute.appendChild(pTag);
  // },

  // var updateStartInfo = function(location){
  //   
  //   hTag.text = location.name;
  //   console.log(location.name)
  //   currentRoute.appendChild(hTag);
  // }


  // startSelect.addEventListener('change', function (event) {
  //   var index = this.value;
  //   var location = locations[index];
  //   console.log("SOOOOOOOON",location.name)
  //   currentRouteDiv( location );
  // });


}

module.exports = UI;