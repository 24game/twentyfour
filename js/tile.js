function Tile() {}

Tile.prototype.number = function(numberValue) {
  this.numberValue = numberValue;
  this.isClicked = false;
  this.isDoubleClicked = false;
};

Tile.prototype.operator = function(operatorValue) {
  this.operatorValue = operatorValue;
};

Tile.prototype.result = function(resultValue) {
  this.resultValue = resultValue;
  this.isExpectedResult = false;
};
