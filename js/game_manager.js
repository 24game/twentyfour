function GameManager(PuzzleGame, Actuator) {
  this.puzzleGame = new PuzzleGame();
  this.actuator = new Actuator();
  this.puzzleGame.newGame();
  this.puzzle = this.puzzleGame.puzzle;
  this.actuator.actuate(this.puzzle);
}
