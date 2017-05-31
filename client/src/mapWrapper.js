var MapWrapper = function(mapDiv, coords, zoom) {

  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.geocoder = new google.maps.Geocoder();
  this.marker = new google.maps.Marker();

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

    var drugs = {
        url: 'http://localhost:3000/img/drugsFinished.png', // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    var mapImg = {
        url: 'http://localhost:3000/img/weaponFinished.png', // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };


    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP,
      icon: mapImg
    });
    return marker;
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
  }

}

module.exports = MapWrapper;