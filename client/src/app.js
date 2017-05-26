var mapWrapper = require('./mapWrapper.js')
var whereAmIButton = document.querySelector('#geolocate')


var app = function() {
  var center = {lat: 55.9533, lng: -3.1883};
  var zoom = 13;
  var mapDiv = document.getElementById("main-map");

  var mainMap = new mapWrapper(mapDiv, center, zoom);
  mainMap.addClickEvent();
  

  whereAmIButton.addEventListener('click', geoLocate)

}

window.addEventListener("load", app);