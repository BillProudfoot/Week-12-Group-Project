var MapWrapper = function(mapDiv, coords, zoom) {
  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.geocoder = new google.maps.Geocoder();
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
        var newLatLng = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
        callback(newLatLng)
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



// //WRONG
// function foo(address){

//       // google map stuff
//       geocoder.geocode( { 'address': address}, function(results, status) {
//           results[0].geometry.location; // I want to return this value
//       })

//     }
//     foo(); //result should be results[0].geometry.location; value


// //RIGHT
// function foo(address, fn){
//   geocoder.geocode( { 'address': address}, function(results, status) {
//      fn(results[0].geometry.location); 
//   });
// }

// foo("address", function(location){
//   alert(location); // this is where you get the return value
// });