// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function() {
  window.GameManager = new GameManager(Game, HTMLActuator);
});
