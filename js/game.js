// Loads the json file of puzzles.
function Game() {
  this.puzzles = new Puzzles()
  this.NUMBER_OF_NUMBER_TILES = 4;
}

Game.prototype.initializeTiles = function() {
  this.numbers = new Array(this.NUMBER_OF_NUMBER_TILES);
  for (var i = 0; i < this.numbers.length; i ++) {
    this.numbers[i] = new Tile();
  }
  this.operators = new Array(this.numbers.length - 1);
  for (var i = 0; i < this.operators.length; i ++) {
    this.operators[i] = new Tile();
  }
};

// Selects one puzzle and sets each number tile accordingly
Game.prototype.newGame = function() {
  this.initializeTiles();
  this.puzzle = this.puzzles.getNewPuzzle();
  for (var i = 0; i < this.numbers.length; i ++) {
    this.numbers[i].number(this.puzzle[i]);
  }
  for (var i = 0; i < this.puzzle.length; i ++) {
    $($('.number')[i]).html([this.puzzle[i]]);
  }
};
