use path_finder;
db.dropDatabase();

db.walks.insert([
  {
    name: "Edinburgh Castle",
    latlng: {lat: 55.9533, lng: -3.1883},
    completed: false
  },
  {
    name: "Hope Park Terrace",
    latlng: {lat: 10, lng: -10},
    completed: true
  }
]);