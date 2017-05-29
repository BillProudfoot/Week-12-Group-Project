var UI = require('./views/ui');

var app = function() {
  new UI();
}

window.addEventListener("load", app);