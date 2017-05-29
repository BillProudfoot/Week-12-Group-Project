var MapWrapper = function(mapDiv, coords, zoom) {
  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.googleMap = new google.maps.Map(mapDiv, {
    center: coords,
    zoom: zoom,
    scrollwheel: false
  });
  this.directionsDisplay.setMap(this.googleMap);
}


MapWrapper.prototype = {
  addMarker: function (coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP
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
      origin: document.getElementById("start").options[start.selectedIndex].text,
      destination: document.getElementById("finish").options[finish.selectedIndex].text,
      travelMode: "WALKING"
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
