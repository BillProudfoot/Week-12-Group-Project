var Locations = require('../models/locations');
var Walk = require('../models/walk');
var Walks = require('../models/walks')
var MapWrapper = require('../mapWrapper.js');


var UI = function() {
  var locations = new Locations();
  this.walks = new Walks();

  this.walks.all(function(walks){
    this.populateWishListAndCompleted(walks);
  }.bind(this))

  locations.all(function (locations) {
  this.populateStartDropDown(locations)
  this.populateFinishDropDown(locations)
  }.bind(this));


  this.getRouteButtonHandler();
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


  getRouteButtonHandler: function() {
    var getRouteButton = document.querySelector("#get-route");
    var start = document.querySelector("#start");
    var finish = document.querySelector("#finish");
    var startPointText = document.querySelector("#start-point-wish-list")
    var finishPointText = document.querySelector("#finish-point-wish-list")

    getRouteButton.addEventListener('click', function(){
      //TODO this function will contain google maps stuff. i'm writing
      //the section that populates the "save to wishlish" form.
      var startName = start.options[start.selectedIndex].text;
      var finishName = finish.options[finish.selectedIndex].text;
      startPointText.innerText = "Start point: " + startName;
      finishPointText.innerText = "Finish point: " + finishName;

    })
  },



  populateWishListAndCompleted: function(){
    var wishlistDiv = document.querySelector("#wishlist");
    var completedDiv = document.querySelector("#completed-walks")
    wishlistDiv.innerText = "";
    completedDiv.innerText ="";
    console.log(this)
    this.walks.all(function(walks){
      walks.forEach(function(walk){

        if (walk.completed === true){
        console.log(walk);
        var p = document.createElement("p");
        //TODO fix this when walk name is in the database;
        var walkTitle = walk.start + " to " + walk.finish;
        p.innerText = walkTitle;
        var completedButton = document.createElement("button");
        completedButton.innerText = "completed!";
        p.appendChild(completedButton);
        wishlistDiv.appendChild(p);
      }

      else if (walk.completed === false) {
        var p = document.createElement("p");
        //TODO fix this when walk name is in the database;
        var walkTitle = walk.start + " to " + walk.finish;
        p.innerText = walkTitle;
        completedDiv.appendChild(p);
      }
    })
    }.bind(this))
  }
}

module.exports = UI;
