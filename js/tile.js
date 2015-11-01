function Tile() {}

Tile.prototype.number = function(numberValue) {
  this.numberValue = numberValue;
};

Tile.prototype.operator = function(operatorValue) {
  this.operatorValue = operatorValue;
};

Tile.prototype.result = function(gameState) {
  this.computedResult = Calculator.compute(gameState);
};
