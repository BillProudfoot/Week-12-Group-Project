var app = function() {
  var center = {lat: 50, lng: 50};
  var zoom = 8;
  var container = document.getElementById("main-map");

  var mainMap = new MapWrapper(zoom, center, container);

}

window.addEventListener("load", app);