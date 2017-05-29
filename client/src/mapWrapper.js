var MapWrapper = function(mapDiv, coords, zoom) {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  this.googleMap = new google.maps.Map(mapDiv, {
    center: coords,
    zoom: zoom
  });
  //might need to change this
  directionsDisplay.setMap(this.googleMap);
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
      console.log("button was clicked")
      console.log(this);
      this.googleMap.setCenter(center);
      this.addMarker(center);
    }.bind(this));
  },

  onChangeHandler: function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  },

  calculateAndDisplayRoute: function(directionsService, directionsDisplay) {
    directionsService.route({
      origin: document.getElementById("start").options[start.selectedIndex].text,
      destination: document.getElementById("finish").options[finish.selectedIndex].text,
      travelMode: "WALKING"
    }, function(response, status) {
      if (status === 200) {
        directionsDisplay.setDirections(response);
      } else {
        console.log("Failed to get directions " + status);
      }
    });
  }

}





module.exports = MapWrapper;
