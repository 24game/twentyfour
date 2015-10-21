function Box() {}

Box.prototype.number = function(numberValue) {
  this.numberValue = numberValue;
  this.isClicked = false;
};

Box.prototype.operator = function(operatorValue) {
  this.operatorValue = operatorValue;
};

Box.prototype.result = function(gameState) {
  // We will add a function that returns the current game state. The result box will be computed from that state.
  this.computedResult = Calculator.compute(gameState);
};
