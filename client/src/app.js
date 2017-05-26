var mapWrapper = require('./mapWrapper.js')



var app = function() {
  var center = {lat: 55.9533, lng: -3.1883};
  var zoom = 13;
  var mapDiv = document.getElementById("main-map");

  var mainMap = new mapWrapper(mapDiv, center, zoom);

  console.log('Map is loading')
}

window.addEventListener("load", app);