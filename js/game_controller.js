function Game() {}

Game.prototype.newGame = function() {
  var game = new Puzzles();
  var puzzle = game.getNewPuzzle();
  var firstNumber = new Box();
  var secondNumber = new Box();
  var thirdNumber = new Box();
  var fourthNumber = new Box();
  firstNumber.number(puzzle[0]);
  secondNumber.number(puzzle[1]);
  thirdNumber.number(puzzle[2]);
  fourthNumber.number(puzzle[3]);
};
