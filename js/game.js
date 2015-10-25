function Game() {}

Game.prototype.initializeGame = function() {
  this.puzzles = new Puzzles();
  this.firstNumber = new Tile();
  this.secondNumber = new Tile();
  this.thirdNumber = new Tile();
  this.fourthNumber = new Tile();
};

Game.prototype.newGame = function() {
  this.initializeGame();
  this.puzzle = this.puzzles.getNewPuzzle();
  this.firstNumber.number(this.puzzle[0]);
  this.secondNumber.number(this.puzzle[1]);
  this.thirdNumber.number(this.puzzle[2]);
  this.fourthNumber.number(this.puzzle[3]);
};
