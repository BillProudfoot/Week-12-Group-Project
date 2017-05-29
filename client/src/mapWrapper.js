var MapWrapper = function(mapDiv, coords, zoom) {
  this.googleMap = new google.maps.Map(mapDiv, {
    center: coords,
    zoom: zoom,
    scrollwheel: false
  });
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

}





module.exports = MapWrapper;
