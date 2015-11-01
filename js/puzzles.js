// Loads the json file which contains an array of puzzles.
function Puzzles() {
  var json = Utils.loadJson('./puzzles.json');
  this.puzzles = json.puzzles;
}

// Returns a randomly selected puzzle in the json. This method is called whenever there is a newGame.
Puzzles.prototype.getNewPuzzle = function() {
  var randomIndex = Math.floor(Math.random() * this.puzzles.length);
  return Utils.randomize(this.puzzles[randomIndex]);
};
