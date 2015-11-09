function HTMLActuator() {}

// Returns all HTML tile elements.
HTMLActuator.prototype.getHtmlTiles = function() {
  return $('[class*=tile]').children();
};

// Returns all number tiles.
HTMLActuator.prototype.getNumberTiles = function() {
  return $('span.number');
};

// Returns all operator tiles.
HTMLActuator.prototype.getOperatorTiles = function() {
  return $('span.operator');
};

// Returns a string that is ready to be evaluated
HTMLActuator.prototype.getCurrentStateToEvaluate = function() {
  this.currentHtmlState = this.getHtmlTiles();
  this.currentStateToEvaluate = "";
  for (var i = 0; i < this.currentHtmlState.size(); i ++) {
    this.currentStateToEvaluate += Utils.cleanOperators(this.currentHtmlState[i].innerHTML);
  }
  return this.currentStateToEvaluate;
};

HTMLActuator.prototype.getCurrentTileStates = function() {
  this.numberTiles = this.getNumberTiles();
  this.operatorTiles = this.getOperatorTiles();
  this.firstNumberTile = this.numberTiles[0].innerHTML;
  this.secondNumberTile = this.numberTiles[1].innerHTML;
  this.thirdNumberTile = this.numberTiles[2].innerHTML;
  this.fourthNumberTile = this.numberTiles[3].innerHTML;
  this.firstOperator = Utils.cleanOperators(this.operatorTiles[0].innerHTML);
  this.secondOperator = Utils.cleanOperators(this.operatorTiles[1].innerHTML);
  this.thirdOperator = Utils.cleanOperators(this.operatorTiles[2].innerHTML);
};

// Computes the value of getCurrentStateToEvaluate and sets that as the value.
HTMLActuator.prototype.actuate = function() {
  $('.result').html(Calculator.compute(this.getCurrentStateToEvaluate()));
};