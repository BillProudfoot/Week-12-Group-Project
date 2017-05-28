var Locations = require('../models/locations');
var Walk = require('../models/walk');
var Walks = require('../models/walks')
var MapWrapper = require('../mapWrapper.js');


var UI = function() {
  var locations = new Locations();
  this.walks = new Walks();
  this.walks.all(function(walks){
    this.populateWishList(walks);
  }.bind(this))
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

  populateStartDropDown: function(location) {
    console.log("7th call: ", location)
    var startSelect = document.querySelector('#start');

    location.forEach(function(location, index){
    location.index = index;
    var option = document.createElement('option');
    option.value = index;
    option.text = location.name;
    startSelect.appendChild(option)
    })
  },

  populateFinishDropDown: function(location) {
    var finishSelect = document.querySelector('#finish');

    location.forEach(function(location, index){
    location.index = index;
    var option = document.createElement('option');
    option.value = index;
    option.text = location.name;
    finishSelect.appendChild(option)
    })
  },

  populateWishList: function(){
    var div = document.querySelector("#wishlist");
    div.innerText = "";
    console.log(this)
    this.walks.all(function(walks){
      walks.forEach(function(walk){
        console.log(walk);
        var p = document.createElement("p");
        //TODO fix this when walk name is in the database;
        var walkTitle = walk.start + " to " + walk.finish;
        p.innerText = walkTitle;
        div.appendChild(p);
      })
    }.bind(this))
  }
}

module.exports = UI;
