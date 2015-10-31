function GameManager(Game, Actuator) {
  this.game = new Game();
  this.actuator = new HTMLActuator();
  game.newGame();
  this.puzzle = game.getNewPuzzle();
  actuator.actuate(this.puzzle);
  console.log(this.puzzle);
}
