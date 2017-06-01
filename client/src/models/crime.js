var Crime = function(options) {
  this.category = options.category,
  this.lat = options.location.latitude;
  this.lng = options.location.longitude;
}

Crime.prototype = {

}

module.exports = Crime;
