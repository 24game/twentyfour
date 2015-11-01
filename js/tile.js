function Tile() {}

Tile.prototype.number = function(numberValue) {
  this.numberValue = numberValue;
};

Tile.prototype.operator = function(operatorValue) {
  this.operatorValue = operatorValue;
};

Tile.prototype.result = function(gameState) {
  // We will add a function that returns the current game state. The result box will be computed from that state.
  this.computedResult = Calculator.compute(gameState);
};
