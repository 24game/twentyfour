// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function() {
  this.game = new Game();
  this.actuator = new HTMLActuator();
  game.newGame();
  this.puzzle = this.game.puzzle;
  actuator.actuate(this.puzzle);
  console.log(this.puzzle);
});
