var Locations = require('../models/locations');
var Walk = require('../models/walk');
var Walks = require('../models/walks')
var MapWrapper = require('../mapWrapper.js');


var UI = function() {
  var locations = new Locations();
  this.walks = new Walks();

  var center = {lat: 55.9533, lng: -3.1883};
  var zoom = 12;
  var mapDiv = document.getElementById("main-map");

  this.mainMap = new MapWrapper(mapDiv, center, zoom);

  this.walks.all(function(walks){
    this.populateWishListAndCompleted(walks);
  }.bind(this))

  locations.all(function (locations) {
  this.populateDropDown(locations)
  }.bind(this));

  this.saveToWishListHandler();
  this.getRouteButtonHandler();
  this.loadMap();

}

UI.prototype = {

  loadMap: function(){
  this.mainMap.addClickEvent();
  console.log("the map in the load map function - " + this.mainMap);

  var whereAmIButton = document.querySelector('#geolocate')
  whereAmIButton.addEventListener('click', this.mainMap.geoLocate.bind(this.mainMap));

  // var getRouteButton = document.querySelector('#getRouteButton');
  // getRouteButton.addEventListener('click', mainMap.onGetRouteButtonClicked)
},


//THIS CALLS MONGO DB AND POPULATES START AND FINISH DROP DOWNS WITH OUR CHOSEN START LOCATION NAMES AND SETS THE OPTION VALUE TO THEIR CORRESPONDING INDEX

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

      console.log("select options: ", startOption)

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

    getRouteButton.addEventListener('click', function(){
      //TODO this function will contain google maps stuff. i'm writing
      //the section that populates the "save to wishlish" form.
      var startName = start.options[start.selectedIndex].text;
      var finishName = finish.options[finish.selectedIndex].text;
      startPointText.innerText = "Start point: " + startName;
      finishPointText.innerText = "Finish point: " + finishName;
      var walkName = startName + " to " + finishName;
      walkNameText.value = walkName;

    })


      this.mainMap.onChangeHandler();
    }.bind(this))

  },


  populateWishListAndCompleted: function(){
    var wishlistDiv = document.querySelector("#wishlist");
    var completedDiv = document.querySelector("#completed-walks")
    wishlistDiv.innerText = "";
    completedDiv.innerText ="";
    console.log(this)
    this.walks.all(function(walks){
      walks.forEach(function(walk){

        if (walk.completed === false){
        console.log(walk);
        var p = document.createElement("p");
        //TODO fix this when walk name is in the database;
        var walkTitle = walk.start + " to " + walk.finish;
        p.innerText = walkTitle;
        var completedButton = document.createElement("button");
        completedButton.innerText = "completed!";
        p.appendChild(completedButton);
        wishlistDiv.appendChild(p);
      }

      else if (walk.completed === true) {
        var p = document.createElement("p");
        //TODO fix this when walk name is in the database;
        var walkTitle = walk.start + " to " + walk.finish;
        p.innerText = walkTitle;
        completedDiv.appendChild(p);
      }
    })

    }.bind(this))
  },

  saveToWishListHandler: function(){
    var start = document.querySelector("#start");
    var finish = document.querySelector("#finish");
    var saveButton = document.querySelector("#save-to-wishlist");
    var walkNameField = document.querySelector("#walk-name");

    console.log("walk name")
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


    }.bind(this));

  }
}




module.exports = UI;
