function Tile() {}

Tile.prototype.number = function(numberValue) {
  this.numberValue = numberValue;
};

Tile.prototype.clicked = function(isClicked) {
  this.isClicked = isClicked;
};

Tile.prototype.doubleClicked = function(isDoubleClicked) {
  this.isDoubleClicked = isDoubleClicked;
};


Tile.prototype.operator = function(operatorValue) {
  this.operatorValue = operatorValue;
};

Tile.prototype.result = function(resultValue) {
  this.resultValue = resultValue;
  this.isExpectedResult = false;
};
