var Locations = require('../models/locations');
var Walk = require('../models/walk');
var Walks = require('../models/walks')
var MapWrapper = require('../mapWrapper.js');
var RestCrimes = require('../models/restCrimes');
var CrimesHelper = require('../models/crimesHelper');
var ColumnChart = require('../models/columnChart.js');
var LightBox = require('./lightbox')



var UI = function() {
  this.locations = new Locations();
  this.walks = new Walks();
  this.restCrimes = new RestCrimes();
  this.crimesHelper = new CrimesHelper();
  this.lightBox = new LightBox();



  var center = {lat: 54.9783, lng: -1.6178};
  var zoom = 12;
  var mapDiv = document.getElementById("main-map");

  this.mainMap = new MapWrapper(mapDiv, center, zoom);
  this.walks.all(function(walks){
    this.populateWishListAndCompleted(walks);

  }.bind(this))

  this.locations.all(function (locations) {
  this.populateDropDown(locations)
  this.locationsArray = locations.map(function(location){
    return location;
  }.bind(this))
  }.bind(this));


  this.saveToWishListHandler();
  this.getRouteButtonHandler();
  this.newLocationButtonHandler();
  this.loadMap();

}

UI.prototype = {

  populateColumnChart: function(){
    var categories = this.crimesHelper.countCategories();
    var catKeys = Object.keys(categories)
    var catValues = Object.values(categories)
    this.columnChart = new ColumnChart(catKeys, catValues);
  },

  newLocationButtonHandler: function(){
    var newLocationButton = document.getElementById('submit-new-location');
    var usersNewLocation = document.getElementById('new-location');
    newLocationButton.addEventListener('click', function(){

      this.mainMap.geocodeAddress(usersNewLocation.value, function(newLatLng){
      var locationName = usersNewLocation.value;
      usersNewLocation.value = "";

        var locationToAdd = {
          name: locationName,
          latlng: newLatLng
        }

        this.locations.add(locationToAdd, function(locations){
          
          var startSelect = document.querySelector('#start');
          var finishSelect = document.querySelector('#finish');
          var index = locations.length -1
          console.log("INDEX ", index);
          var option = this.createDropDownOption(locationToAdd, index);
          console.log("Option",option);
          startSelect.appendChild(option);
          var option = this.createDropDownOption(locationToAdd, index);
          finishSelect.appendChild(option);
          console.log(this)
          this.populateDropDown(locations)
          console.log("locations LEN", locations.length)

          this.locationsArray = locations


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
    return option;

  },

  populateDropDown: function(locations){
    var startSelect = document.querySelector('#start');
    var finishSelect = document.querySelector('#finish');

    console.log("startSelect", startSelect)

    startSelect.innerHTML = ""
    finishSelect.innerHTML = ""

    console.log("startSelect", startSelect)

    locations.forEach(function(location, index){
      var option = this.createDropDownOption(location, index);
      startSelect.appendChild(option);
      var option = this.createDropDownOption(location, index);
      finishSelect.appendChild(option);
    }.bind(this))


  },

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
      this.crimesOnRoute();
    }.bind(this))
  },

  crimesOnRoute: function(){
    var div = document.querySelector("#crime-button");
    div.innerHTML = ""
    var crimeButton = document.createElement("button");
    crimeButton.classList.add("btn")
    crimeButton.innerText = "crimes!!!!!!!!!!!";
    var getRouteButton = document.querySelector("#get-route");
    var start = document.querySelector("#start");
    var finish = document.querySelector("#finish");
    div.innerText = "";
    div.appendChild(crimeButton);

    crimeButton.addEventListener('click', function(){

      console.log("start.value", start.value)
      console.log("this.locationsArray", this.locationsArray)

      var startLocation = this.locationsArray[start.value].latlng;
      var finishLocation = this.locationsArray[finish.value].latlng;
      this.crimesHelper.getCrimes(startLocation, finishLocation, function(){
        this.crimesHelper.crimesArray.forEach(function(crime){
          var lat = parseFloat(crime.lat)
          var lng = parseFloat(crime.lng)
        var coords = {lat: lat, lng: lng}
        this.mainMap.filterCrimeIcons(crime, coords);
        }.bind(this))
      }.bind(this))

    }.bind(this));

    var crimeStats = document.createElement("button");
    crimeStats.classList.add("btn")
    crimeStats.innerHTML = "<i class='fa fa-bar-chart' aria-hidden='true'></i>";
    div.appendChild(crimeStats);
    crimeStats.addEventListener('click', function(){
      this.populateColumnChart();
      var lightBox = document.querySelector(".lightbox");
      lightBox.style.display = "block";
    }.bind(this))


  },

  populateWishListAndCompleted: function(){
    var wishlistDiv = document.querySelector("#wishlist");
    var completedDiv = document.querySelector("#completed-walks")
    wishlistDiv.innerText = "";
    completedDiv.innerText = "";
    this.walks.all(function(walks){
      walks.forEach(function(walk){

        //creates delete button - "deletes" walk on click
        var deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "delete");
        deleteButton.innerHTML = "<i class='fa fa-times'></i>";

        deleteButton.addEventListener("click", function() {
          p.innerText = "";
        });

        //create "show route" button - shows route on map on click
        var showRouteButton = document.createElement("button");
        showRouteButton.classList.add("btn", "showRoute");
        showRouteButton.innerHTML = "<i class='fa fa-map-signs'></i>";

        //when the show route button is clicked it will show the route on
        //the map
        showRouteButton.addEventListener("click", function() {
          var startlatlng = walk.startlatlng;
          var finishlatlng = walk.finishlatlng;
          this.mainMap.onShowRoute(startlatlng, finishlatlng);
        }.bind(this));

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
        completedButton.innerHTML = "<i class='fa fa-check  '></i>";

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
        p.appendChild(showRouteButton);
        p.appendChild(deleteButton);
        wishlistDiv.appendChild(p);
      }

      //if a walk is completed sends it to the correct div
      else if (walk.completed === true) {
        var p = document.createElement("p");

        var walkTitle = walk.name;
        p.innerText = walkTitle;
        p.appendChild(showRouteButton);
        p.appendChild(deleteButton);
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
      var startlatlng = start.options[start.selectedIndex].latlng;
      var finishlatlng = finish.options[finish.selectedIndex].latlng;

        var walkToAdd = {
          name: walkName,
          start: startName,
          finish: finishName,
          completed: false,
          startlatlng: startlatlng,
          finishlatlng: finishlatlng,
        }
        this.walks.add(walkToAdd, function(){
          this.populateWishListAndCompleted();
        }.bind(this))
    }.bind(this))

  }

}

module.exports = UI;
