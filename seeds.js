use path_finder;
db.dropDatabase();

db.locations.insert([
  {
  name: "Caroline's Parents' House",
  latlng: { lat: 51.0681597, lng: -0.32122030000005 }
  },
  {
  name: "Horsham Library",
  latlng: { lat: 51.0607901, lng: -0.3322183999999879 }
  },
  {
    name: "Barras Bridge",
    latlng: {lat: 54.978528, lng: -1.610805}
  },
  {
    name: "Forth Banks",
    latlng: {lat: 54.966596, lng: -1.618418}
  },
  {
    name: "Ponteland Road",
    latlng: {lat: 55.001571, lng: -1.667013}
  },
  {
    name: "Newcastle City Hall",
    latlng: {lat: 54.977068, lng: -1.610123}
  },
  {
    name: "High Street Gateshead",
    latlng: {lat: 54.962064, lng: -1.600266}
  },
  {
    name: "intu Eldon Square",
    latlng: {lat: 54.9752, lng: -1.6151}
  }

]);

db.walks.insert([
  {
    name: "High Steet Walk",
    start: "Newcastle City Hall",
    finish: "High Street Gateshead",
    completed: false,
    startlatlng: {lat: 54.977068, lng: -1.610123},
    finishlatlng: {lat: 54.962064, lng: -1.600266}
  }
//trying to seed with this code didn't work until
//i added in the comma after the curly bracket
//just there....weird!

]);
