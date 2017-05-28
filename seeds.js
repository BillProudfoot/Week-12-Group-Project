use path_finder;
db.dropDatabase();

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


  
]);
