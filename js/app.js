// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function() {
  this.game = new Game();
  game.newGame();
});
