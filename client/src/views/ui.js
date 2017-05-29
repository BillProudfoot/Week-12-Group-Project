var Locations = require('../models/locations');
var Walk = require('../models/walk');
var Walks = require('../models/walks')
var MapWrapper = require('../mapWrapper.js');



var UI = function() {
  this.locations = new Locations();
  this.walks = new Walks();

  var center = {lat: 55.9533, lng: -3.1883};
  var zoom = 12;
  var mapDiv = document.getElementById("main-map");

  this.mainMap = new MapWrapper(mapDiv, center, zoom);
  this.walks.all(function(walks){
    this.populateWishListAndCompleted(walks);

  }.bind(this))

  this.locations.all(function (locations) {
  this.populateDropDown(locations)
  }.bind(this));


  this.saveToWishListHandler();
  this.getRouteButtonHandler();
  this.loadMap();

}

UI.prototype = {

  loadMap: function(){
  this.mainMap.addClickEvent();

  var whereAmIButton = document.querySelector('#geolocate')
  whereAmIButton.addEventListener('click', this.mainMap.geoLocate.bind(this.mainMap));

},

  populateDropDown: function(locations) {
    var startSelect = document.querySelector('#start');
    var finishSelect = document.querySelector('#finish');

    locations.forEach(function(location, index){
      location.index = index;

      var startOption = document.createElement('option');
      var finishOption = document.createElement('option');

      startOption.value = index;
      finishOption.value = index;

      startOption.text = location.name;
      finishOption.text = location.name;

      startOption.latlng = {lat: location.latlng.lat, lng: location.latlng.lng};
      finishOption.latlng = {lat: location.latlng.lat, lng: location.latlng.lng};



      startSelect.appendChild(startOption)
      finishSelect.appendChild(finishOption)
    });
  },



  getRouteButtonHandler: function() {
    var getRouteButton = document.querySelector("#get-route");
    var start = document.querySelector("#start");
    var finish = document.querySelector("#finish");
    var startPointText = document.querySelector("#start-point-wish-list");
    var finishPointText = document.querySelector("#finish-point-wish-list");
    var walkNameText = document.querySelector("#walk-name");
    // this.mainMap.onChangeHandler = this.mainMap.onChangeHandler.bind(this.mainMap);

    console.log("START VALUE: ",start.index)


    getRouteButton.addEventListener('click', function(){

      if(start.value === 'Choose your starting Location' || finish.value === 'Choose your finishing Location') return;

      //TODO this function will contain google maps stuff. i'm writing
      //the section that populates the "save to wishlish" form.

      var startName = start.options[start.selectedIndex].text;
      var finishName = finish.options[finish.selectedIndex].text;
      startPointText.innerText = "Start point: " + startName;
      finishPointText.innerText = "Finish point: " + finishName;
      var walkName = startName + " to " + finishName;
      walkNameText.value = walkName;
      this.mainMap.onChangeHandler();
    }.bind(this))
  },


  populateWishListAndCompleted: function(){
    var wishlistDiv = document.querySelector("#wishlist");
    var completedDiv = document.querySelector("#completed-walks")
    wishlistDiv.innerText = "";
    completedDiv.innerText = "";
    this.walks.all(function(walks){
      walks.forEach(function(walk){

        if (walk.completed === false){
        var p = document.createElement("p");
        //TODO fix this when walk name is in the database;

        var walkTitle = walk.name;
        p.innerText = walkTitle + "  " ;

        var completedButton = document.createElement("button");
        completedButton.value = JSON.stringify(walk);
        completedButton.classList.add("btn", "completed");
        completedButton.innerText = "completed!";

        completedButton.addEventListener('click', function(){
          var walkToUpdate = walk;
          walkToUpdate.completed = true;
          this.walks.update(walkToUpdate, function(){
          }.bind(this))
        }.bind(this))
        p.appendChild(completedButton);
        wishlistDiv.appendChild(p);
      }

      else if (walk.completed === true) {
        var p = document.createElement("p");
        //TODO fix this when walk name is in the database;

        var walkTitle = walk.name;

        p.innerText = walkTitle;
        completedDiv.appendChild(p);
      }
    }.bind(this))

    }.bind(this))
  },

  saveToWishListHandler: function(){
    var start = document.querySelector("#start");
    var finish = document.querySelector("#finish");
    var saveButton = document.querySelector("#save-to-wishlist");
    var walkNameField = document.querySelector("#walk-name");

    var startName = start.options[start.selectedIndex].text;
    var finishName = finish.options[finish.selectedIndex].text;

    saveButton.addEventListener('click', function(){
      var walkName = walkNameField.value;
      var startName = start.options[start.selectedIndex].text;
      var finishName = finish.options[finish.selectedIndex].text;

        var walkToAdd = {
          name: walkName,
          start: startName,
          finish: finishName,
          completed: false
        }
        this.walks.add(walkToAdd, function(){
          this.populateWishListAndCompleted();
        }.bind(this))
    }.bind(this))


  }
  //
  // setWalkAsCompleted: function(){
  //   var buttons = document.getElementsByTagName('button');
  //       for(var i = 0; i < buttons.length; i++) {
  //           var button = buttons[i];
  //           console.log(button)
  //           if(("btn completed").match(button.className)) {
  //               button.addEventListener("click", function(){
  //                 console.log("clickccc")
  //               })
  //           }
  //       }
  // }
}




module.exports = UI;
