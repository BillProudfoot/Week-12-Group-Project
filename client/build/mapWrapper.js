var MapWrapper = function(zoom, coords, container) {

  this.googleMap = new google.maps.Map(container, {
    zoom: zoom,
    center: coords
  });
}

module.exports = MapWrapper;