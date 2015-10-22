function Game() {}

Game.prototype.initializeGame = function() {
  this.puzzles = new Puzzles();
  this.firstNumber = new Box;
  this.secondNumber = new Box();
  this.thirdNumber = new Box();
  this.fourthNumber = new Box();
};

Game.prototype.newGame = function() {
  this.initializeGame();
  this.puzzle = this.puzzles.getNewPuzzle();
  this.firstNumber.number(this.puzzle[0]);
  this.secondNumber.number(this.puzzle[1]);
  this.thirdNumber.number(this.puzzle[2]);
  this.fourthNumber.number(this.puzzle[3]);
};
