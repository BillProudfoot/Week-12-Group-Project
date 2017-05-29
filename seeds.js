use path_finder;
db.dropDatabase();

db.locations.insert([
  {
    name: "Edinburgh Castle",
    latlng: {lat: 55.9533, lng: -3.1883}
  },
  {
    name: "Holyrood Palace",
    latlng: {lat: 10, lng: -10}
  },
  {
    name: "Roseburn",
    latlng: {lat:10, lng: -10}
  },
  {
    name: "Dean Village",
    latlng: {lat:10, lng: -10}
  },
  {
    name: "Balerno",
    latlng: {lat:10, lng: -10}
  },
  {
    name: "Slateford",
    latlng: {lat:10, lng: -10}
  }
]);

db.walks.insert([
  {
    name: "Royal Mile",
    start: "Edinburgh Castle",
    finish: "Holyrood Palace",
    completed: false
  },
  {
    name: "Meadows",
    start: "Hope Park Terrace",
    finish: "The Golf Tavern",
    completed: true
  }
//trying to seed with this code didn't work until
//i added in the comma after the curly bracket
//just there....weird!

]);
