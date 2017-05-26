var MapWrapper = function(mapDiv, coords, zoom) {
  this.googleMap = new google.maps.Map(mapDiv, {center: coords, zoom: zoom});
}

MapWrapper.prototype = {

}

module.exports = MapWrapper;

