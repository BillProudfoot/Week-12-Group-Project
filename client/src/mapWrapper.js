var CrimeIcons = require('./models/crimeIcons')

var MapWrapper = function(mapDiv, coords, zoom) {

  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.geocoder = new google.maps.Geocoder();
  this.marker = new google.maps.Marker();
  this.crimeIcons = new CrimeIcons();

  this.googleMap = new google.maps.Map(mapDiv, {
    center: coords,
    zoom: zoom,
    scrollwheel: false
  });

  this.directionsDisplay.setMap(this.googleMap);
}


MapWrapper.prototype = {

  geocodeAddress: function(address, callback) {
    var ukAddress = address + " United Kingdom"
    this.geocoder.geocode({'address': ukAddress}, function(results, status) {
      
      if (status === 'OK') {

        var latlng = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};

        callback(latlng)
        
        this.googleMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: this.googleMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    }.bind(this));
  },

  addMarker: function (coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP,
    });
  },

  addCrimeMarker: function(crimeImage, coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      icon: crimeImage
    })
  },

  filterCrimeIcons: function(crime, coords){
    var crimeIconObj = this.crimeIcons.crimePics
    var imgKeys = Object.keys(crimeIconObj)
    var imgSrc = Object.values(crimeIconObj)

    for(var key of imgKeys){
      if(key === crime.category){
        var crimeImage = {
        url: crimeIconObj[key], 
        scaledSize: new google.maps.Size(60, 60),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(0, 0)
        }
      this.addCrimeMarker(crimeImage, coords)
      }
    }
  },

  addClickEvent: function (){
    google.maps.event.addListener(this.googleMap, 'click', function(event){
      var position = { lat: event.latLng.lat(), lng: event.latLng.lng() }
      this.addMarker(position);
    }.bind(this));
  },

  geoLocate: function(){
    navigator.geolocation.getCurrentPosition(function(position){
      var center = {lat: position.coords.latitude, lng: position.coords.longitude};
      this.googleMap.setCenter(center);
      this.addMarker(center);
    }.bind(this));
  },

  onChangeHandler: function() {
    this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
  },

  calculateAndDisplayRoute: function(directionsService, directionsDisplay) {
    directionsService.route({
      origin: document.getElementById("start").options[start.selectedIndex].latlng,
      destination: document.getElementById("finish").options[finish.selectedIndex].latlng,
      travelMode: "WALKING",
      region: "UK"
    }, function(response, status) {
      if (status === "OK") {
        directionsDisplay.setDirections(response);
      } else {
        console.log("Failed to get directions " + status);
      }
    });
  },

  onShowRoute: function(startlatlng, finishlatlng) {
    this.calculateAndDisplayWishlistRoute(this.directionsService, this.directionsDisplay, startlatlng, finishlatlng);
  },

  calculateAndDisplayWishlistRoute: function(directionsService, directionsDisplay, startlatlng, finishlatlng) {
    directionsService.route({
      origin: startlatlng,
      destination: finishlatlng,
      travelMode: "WALKING",
      region: "UK"
    }, function(response, status) {
      if (status === "OK") {
        directionsDisplay.setDirections(response);
      } else {
        console.log("Failed to get directions " + status);
      }
    });
  }

}

module.exports = MapWrapper;