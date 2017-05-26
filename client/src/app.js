var mapWrapper = require('./mapWrapper.js')


var app = function() {
  loadMap();
  // populateStartDropDown()
  // populateFinishDropDown()
  
  console.log('Map is loading')
}


var loadMap = function(){
  var center = {lat: 55.9533, lng: -3.1883};
  var zoom = 10;
  var mapDiv = document.getElementById("main-map");

  var mainMap = new mapWrapper(mapDiv, center, zoom);
}

//THIS WILL CALL THE MONGO DB AND POPULATE START DROP DOWN WITH OUR CHOSEN START LOCATION NAMES

var populateStartDropDown = function(locations) {
  var select = document.querySelector('#start');

  locations.forEach(function(location, index){
    location.index = index;
    var option = document.createElement('option');
    option.text = location.name;
    select.appendChild(option)
  })
}

window.addEventListener("load", app);