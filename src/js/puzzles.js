// Loads the json file which specifies the puzzleSize, the expectedResult and contains an array of puzzles.
function Puzzles() { }

Puzzles.ctor = function() {
  if (Puzzles.__ctor_initialized)
    return;

  var puzzlesJson = Utils.loadJson('./puzzles.json');
  Puzzles.puzzles = puzzlesJson.puzzles;

  Puzzles.__ctor_initialized = true;
};


// Returns a randomly selected puzzle in the puzzles in the json. This method is called whenever there is a new game.
Puzzles.getNewPuzzle = function() {
  Puzzles.ctor();
  var puzzleIndex = Math.floor(Math.random() * Puzzles.puzzles.length);
  var puzzle = this.puzzles[puzzleIndex];
  puzzle.numberTiles = Utils.randomize(puzzle.numberTiles);
  return puzzle;
};