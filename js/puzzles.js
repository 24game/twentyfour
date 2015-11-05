// Loads the json file which specifies the puzzleSize, the expectedResult and contains an array of puzzles.
function Puzzles() {
  var json = Utils.loadJson('./puzzles.json');
  this.puzzleSize = json.puzzleSize;
  this.expectedResult = json.expectedResult;
  this.puzzles = json.puzzles;
}

// Returns a randomly selected puzzle in the puzzles in the json. This method is called whenever there is a newGame.
Puzzles.prototype.getNewPuzzle = function() {
  var randomIndex = Math.floor(Math.random() * this.puzzles.length);
  return Utils.randomize(this.puzzles[randomIndex]);
};
