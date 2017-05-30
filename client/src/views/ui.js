var Locations = require('../models/locations');
var Walk = require('../models/walk');
var Walks = require('../models/walks')
var MapWrapper = require('../mapWrapper.js');
var RestCrimes = require('../models/restCrimes');



var UI = function() {
  this.locations = new Locations();
  this.walks = new Walks();
  this.restCrimes = new RestCrimes();

  var center = {lat: 54.9783, lng: -1.6178};
  var zoom = 12;
  var mapDiv = document.getElementById("main-map");

  this.mainMap = new MapWrapper(mapDiv, center, zoom);
  this.walks.all(function(walks){
    this.populateWishListAndCompleted(walks);

  }.bind(this))

  this.locations.all(function (locations) {
  this.populateDropDown(locations)
  }.bind(this));


  this.saveToWishListHandler();
  this.getRouteButtonHandler();
  this.newLocationButtonHandler();
  this.loadMap();

}

UI.prototype = {

  newLocationButtonHandler: function(){
    var newLocationButton = document.getElementById('submit-new-location');
    var usersNewLocation = document.getElementById('new-location');
    newLocationButton.addEventListener('click', function(){
      this.mainMap.geocodeAddress(usersNewLocation.value, function(newLatLng){
      console.log("USER ENTERED LOCATION LATLNG: ", newLatLng);
      var locationName = usersNewLocation.value;

        var locationToAdd = {
          name: locationName,
          latlng: newLatLng
        }
        this.locations.add(locationToAdd, function(){
          console.log("POPULATE DROP DOWN?")
        }.bind(this))
      }.bind(this))
    }.bind(this))
  },


  loadMap: function(){
  this.mainMap.addClickEvent();

  var whereAmIButton = document.querySelector('#geolocate')
  whereAmIButton.addEventListener('click', this.mainMap.geoLocate.bind(this.mainMap));

},

  createDropDownOption: function(location, index){
    location.index = index;

    var option = document.createElement('option');
    option.value = index;
    option.text = location.name;
    option.latlng = {lat: location.latlng.lat, lng: location.latlng.lng};
    console.log(option)

  },

  populateDropDown: function(locations){
    var startSelect = document.querySelector('#start');
    var finishSelect = document.querySelector('#finish');

    locations.forEach(function(location, index){
      this.createDropDownOption(location, index);
      console.log(option);
    }.bind(this))

    // startSelect.appendChild(option);
    // finishSelect.appendChild(option);

  },


  // populateDropDown: function(locations) {
  //   var startSelect = document.querySelector('#start');
  //   var finishSelect = document.querySelector('#finish');
  //
  //   locations.forEach(function(location, index){
  //     location.index = index;
  //
  //     var startOption = document.createElement('option');
  //     var finishOption = document.createElement('option');
  //
  //     startOption.value = index;
  //     finishOption.value = index;
  //
  //     startOption.text = location.name;
  //     finishOption.text = location.name;
  //
  //     startOption.latlng = {lat: location.latlng.lat, lng: location.latlng.lng};
  //     finishOption.latlng = {lat: location.latlng.lat, lng: location.latlng.lng};
  //
  //
  //     startSelect.appendChild(startOption)
  //     finishSelect.appendChild(finishOption)
  //   });
  // },



  getRouteButtonHandler: function() {

    var getRouteButton = document.querySelector("#get-route");
    var start = document.querySelector("#start");
    var finish = document.querySelector("#finish");
    var startPointText = document.querySelector("#start-point-wish-list");
    var finishPointText = document.querySelector("#finish-point-wish-list");
    var walkNameText = document.querySelector("#walk-name");
    // this.mainMap.onChangeHandler = this.mainMap.onChangeHandler.bind(this.mainMap);


    getRouteButton.addEventListener('click', function(){

      if(start.value === 'Choose your starting Location' || finish.value === 'Choose your finishing Location') return;



      var startName = start.options[start.selectedIndex].text;
      var finishName = finish.options[finish.selectedIndex].text;

      startPointText.innerText = "Start point: " + startName;
      finishPointText.innerText = "Finish point: " + finishName;

      var walkName = startName + " to " + finishName;
      walkNameText.value = walkName;
      this.mainMap.onChangeHandler();
    }.bind(this))
  },


  populateWishListAndCompleted: function(){
    var wishlistDiv = document.querySelector("#wishlist");
    var completedDiv = document.querySelector("#completed-walks")
    wishlistDiv.innerText = "";
    completedDiv.innerText = "";
    this.walks.all(function(walks){
      walks.forEach(function(walk){

        //this handles going through all walks and separates them into ones
        //which belong in the wishlist and ones for the completed walks div
        if (walk.completed === false){
        //populates wishlist
        var p = document.createElement("p");

        var walkTitle = walk.name;
        p.innerText = walkTitle + "  " ;

        //creates "completed" button
        var completedButton = document.createElement("button");
        completedButton.value = JSON.stringify(walk);
        completedButton.classList.add("btn", "completed");
        completedButton.innerText = "completed!";

        //adds functionality to button where when it is clicked the walk
        // is marked as completed
        completedButton.addEventListener('click', function(){
          var walkToUpdate = walk;
          walkToUpdate.completed = true;
          this.walks.update(walkToUpdate, function(){
          }.bind(this))
          completedDiv.appendChild(p);
          completedButton.style.display = "none";
        }.bind(this))
        p.appendChild(completedButton);
        wishlistDiv.appendChild(p);
      }

      //if a walk is completed sends it to the correct div
      else if (walk.completed === true) {
        var p = document.createElement("p");

        var walkTitle = walk.name;
        p.innerText = walkTitle;
        completedDiv.appendChild(p);
      }
    }.bind(this))

    }.bind(this))
  },

  saveToWishListHandler: function(){
    var start = document.querySelector("#start");
    var finish = document.querySelector("#finish");
    var saveButton = document.querySelector("#save-to-wishlist");
    var walkNameField = document.querySelector("#walk-name");

    var startName = start.options[start.selectedIndex].text;
    var finishName = finish.options[finish.selectedIndex].text;

    saveButton.addEventListener('click', function(){

      //gets details of walk and saves them to database, with completed
      //value as false so they are added to the wish list
      var walkName = walkNameField.value;
      var startName = start.options[start.selectedIndex].text;
      var finishName = finish.options[finish.selectedIndex].text;

        var walkToAdd = {
          name: walkName,
          start: startName,
          finish: finishName,
          completed: false
        }
        this.walks.add(walkToAdd, function(){
          this.populateWishListAndCompleted();
        }.bind(this))
    }.bind(this))

  }

}




module.exports = UI;
