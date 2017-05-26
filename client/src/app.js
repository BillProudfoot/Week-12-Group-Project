var mapWrapper = require('./mapWrapper.js')




var app = function() {
  var center = {lat: 55.9533, lng: -3.1883};
  var zoom = 1;
  var mapDiv = document.getElementById("main-map");
  var startMarker = document.getElementById('option')

  var mainMap = new mapWrapper(mapDiv, center, zoom);
  console.log(startMarker.value)
  mainMap.addMarker(startMarker.value)
  mainMap.addMarker(center)

  console.log('Map is loading')
}

window.addEventListener("load", app);