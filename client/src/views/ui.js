var Locations = require('../models/locations');
var MapWrapper = require('../mapWrapper.js');
var ApiHelper = require('../models/apiHelper');
var CrimesHelper = require('../models/crimesHelper');
var ColumnChart = require('../models/columnChart.js');
var DateHelper = require('../models/dateHelper.js');
var LightBox = require('./lightbox');




var UI = function() {
  this.locations = new Locations();
  this.apiHelper = new ApiHelper();
  this.crimesHelper = new CrimesHelper();
  this.lightBox = new LightBox();
  this.dateHelper = new DateHelper();

  var center = {lat: 54.9783, lng: -1.6178};
  var zoom = 12;
  var mapDiv = document.getElementById("main-map");
  this.locationsSelect = document.querySelector('#locations');

  this.mainMap = new MapWrapper(mapDiv, center, zoom);

  this.locations.all(function (locations) {
  this.populateDropDown(locations)
  this.locationsArray = locations.map(function(location){
    return location;
  }.bind(this))
  }.bind(this));

  this.renderDateSelecters();
  this.newLocationButtonHandler();
  this.resultsOnRoute();
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

          var index = locations.length -1
          var option = this.createDropDownOption(locationToAdd, index);
          this.locationsSelect.appendChild(option);
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
    this.locationsSelect.innerHTML = "";

    locations.forEach(function(location, index){
      var option = this.createDropDownOption(location, index);
      this.locationsSelect.appendChild(option);
    }.bind(this))


  },

  renderDateSelecters: function(){
    var monthDropDown = document.querySelector("#month")
    var yearDropDown = document.querySelector("#year")
    this.dateHelper.populateMonthDropDown(monthDropDown);
    this.dateHelper.populateYearDropDown(yearDropDown);
  },



  resultsOnRoute: function(){

    var monthSelect = document.querySelector("#month")
    var yearSelect = document.querySelector("#year")
    var crimeButton = document.querySelector("#crime-button")
    var stopSearchButton = document.querySelector("#stop-search-button")
    crimeButton.addEventListener('click', function(){
      var location = this.locationsArray[this.locationsSelect.value].latlng;
      this.mainMap.setCenter(location);
      this.crimesHelper.getResults("street-crime", location, yearSelect.value, monthSelect.value, function(){
        this.crimesHelper.resultsArray.forEach(function(crime){
          var lat = parseFloat(crime.lat)
          var lng = parseFloat(crime.lng)
        var coords = {lat: lat, lng: lng}
        this.mainMap.filterCrimeIcons(crime, coords);
        }.bind(this))
      }.bind(this))

    }.bind(this));

    var crimeStats = document.createElement("button");
    var div = document.querySelector("#crime-button-div")
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
