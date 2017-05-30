use path_finder;
db.dropDatabase();

//Edinburgh latlng's added incase we need to revert
db.locations.insert([
  {
    name: "Edinburgh Castle",
    latlng: {lat: 55.9533, lng: -3.1883}
  },
  {
    name: "Holyrood Palace",
    latlng: {lat: 55.9527, lng: -3.1723}
  },
  {
    name: "Roseburn",
    latlng: {lat: 55.9434, lng: -3.2395}
  },
  {
    name: "Dean Village",
    latlng: {lat: 55.9523, lng: -3.3167}
  },
  {
    name: "Balerno",
    latlng: {lat: 55.8857, lng: -3.3424}
  },
  {
    name: "Slateford",
    latlng: {lat: 55.9310, lng: -3.2381}
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
    start: "Hope Park Crescent",
    finish: "The Golf Tavern",
    completed: true
  }
//trying to seed with this code didn't work until
//i added in the comma after the curly bracket
//just there....weird!

]);
