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
  },
//trying to seed with this code didn't work until
//i added in the comma after the curly bracket
//just there....weird!

]);
