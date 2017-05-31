var Walk = function(options){
  this._id = options._id;
  this.name = options.name;
  this.start = options.start;
  this.finish = options.finish;
  this.completed = options.completed;
  this.startlatlng = options.startlatlng;
  this.finishlatlng = options.finishlatlng;
}

module.exports = Walk;
