var Locations = require('../models/locations');
var Walk = require('../models/walk');
var Walks = require('../models/walks')
var MapWrapper = require('../mapWrapper.js');
var RestCrimes = require('../models/restCrimes');
var CrimesHelper = require('../models/crimesHelper');
var ColumnChart = require('../models/columnChart.js');
var DateHelper = require('../models/dateHelper.js');
var LightBox = require('./lightbox');




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

  this.locations.all(function (locations) {
  this.populateDropDown(locations)
  this.locationsArray = locations.map(function(location){
    return location;
  }.bind(this))
  }.bind(this));



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
          var option = this.createDropDownOption(locationToAdd, index);
          startSelect.appendChild(option);
          var option = this.createDropDownOption(locationToAdd, index);
          finishSelect.appendChild(option);
          this.populateDropDown(locations)
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

    startSelect.innerHTML = ""
    finishSelect.innerHTML = ""

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

    getRouteButton.addEventListener('click', function(){

      if(start.value === 'Choose your starting Location' || finish.value === 'Choose your finishing Location') return;

      this.mainMap.onChangeHandler();
      this.crimesOnRoute();
    }.bind(this))
  },

  crimesOnRoute: function(){
    var div = document.querySelector("#crime-button");
    div.innerHTML = ""
    var crimeButton = document.createElement("button");
    crimeButton.classList.add("btn")
    crimeButton.innerHTML = "<i class='fa fa-eye' aria-hidden='true'></i>";
    var getRouteButton = document.querySelector("#get-route");
    var start = document.querySelector("#start");
    var finish = document.querySelector("#finish");
    div.innerText = "";
    div.appendChild(crimeButton);

    crimeButton.addEventListener('click', function(){

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


  }


}

module.exports = UI;
