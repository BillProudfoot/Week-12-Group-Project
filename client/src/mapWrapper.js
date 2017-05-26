var MapWrapper = function(mapDiv, coords, zoom) {
  this.googleMap = new google.maps.Map(mapDiv, {center: coords, zoom: zoom});
}

MapWrapper.prototype = {
  
  addMarker: function(coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP
    });
    return marker;
  },

}

module.exports = MapWrapper;

