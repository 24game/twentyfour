function Tile() {}

Tile.prototype.number = function(numberValue) {
  if (numberValue === undefined)
    return this.numberValue;
  this.numberValue = numberValue;
};

Tile.prototype.clicked = function(isClicked) {
  if (isClicked === undefined)
    return this.isClicked;
  if (isClicked === 'toggle') {
    this.isClicked = !this.isClicked;
    return;
  }
  this.isClicked = isClicked;
};

Tile.prototype.doubleClicked = function(isDoubleClicked) {
  if (isDoubleClicked === undefined)
    return this.isDoubleClicked;
  if (isDoubleClicked === 'toggle') {
    this.isDoubleClicked = !this.isDoubleClicked;
    return;
  }
  this.isDoubleClicked = isDoubleClicked;
};


Tile.prototype.operator = function(operatorValue) {
  if (operatorValue === undefined)
    return this.operatorValue;
  this.operatorValue = operatorValue;
};

Tile.prototype.result = function(resultValue) {
  if (resultValue === undefined)
    return this.resultValue;
  this.resultValue = resultValue;
};
