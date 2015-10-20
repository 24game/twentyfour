function Puzzles() {
  var json = Utils.loadJson("./puzzles.json");
  this.puzzles = json.puzzles;
}

Puzzles.prototype.getNewPuzzle = function() {
  var randomIndex = Math.floor(Math.random() * this.puzzles.length);
  return this.puzzles[randomIndex];
}
