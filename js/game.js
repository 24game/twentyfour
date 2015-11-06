// Loads the json file.
function Game() {
  this.puzzles = new Puzzles();
  this.operations = new Operators();
  this.puzzleSize = this.puzzles.puzzleSize;
}

// Creates number tile and operator tile objects.
Game.prototype.createTileObjects = function() {
  this.numbers = new Array(this.puzzleSize);
  for (var i = 0; i < this.numbers.length; i ++) {
    this.numbers[i] = new Tile();
  }
  this.operators = new Array(this.numbers.length - 1);
  for (var i = 0; i < this.operators.length; i ++) {
    this.operators[i] = new Tile();
  }
};

// Initializes the number tiles and operator tiles.
Game.prototype.newGame = function() {
  this.createTileObjects();
  this.puzzle = this.puzzles.getNewPuzzle();
  for (var i = 0; i < this.numbers.length; i ++) {
    this.numbers[i].number(this.puzzle[i]);
  }
  for (var i = 0; i < this.operators.length; i ++) {
    this.operators[i].operator(this.operations.getRandomOperator());
  }

  // This part will eventually go away after refactor.
  for (var i = 0; i < this.numbers.length; i ++) {
    $($('.number')[i]).html([this.numbers[i].numberValue]);
  }
  for (var i = 0; i < this.operators.length; i ++) {
    $($('.operator')[i]).html([this.operators[i].operatorValue]);
  }
};
