function Game() {}

Game.prototype.newGame = function() {
  var game = new Puzzles();
  var puzzle = Puzzles.getNewPuzzle();
  var firstNumber = new Box();
  var secondNumber = new Box();
  var thirdNumber = new Box();
  var fourthNumber = new Box();
  firstNumber.numberValue(puzzle[0]);
  secondNumber.numberValue(puzzle[1]);
  thirdNumber.numberValue(puzzle[2]);
  fourthNumber.numberValue(puzzle[3]);
}
