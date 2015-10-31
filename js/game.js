function Game() {
  this.puzzles = new Puzzles();
}

Game.prototype.initializeGame = function() {
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
  for (var i = 0; i < this.puzzle.length; i ++) {
    $($('.number')[i]).html([this.puzzle[i]]);
  }
};
