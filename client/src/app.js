var UI = require('./views/ui');


var app = function() {
  new UI();
}

var updateStartInfo = function(location){
  var hTag = document.createElement('h1');
  hTag.text = location.name;
  console.log(location.name)
  currentRoute.appendChild(hTag);
}

window.addEventListener("load", app);



