function HTMLActuator() {}

HTMLActuator.prototype.getCurrentStateToEvaluate = function() {
  this.currentHtmlState = $('[class*=tile]').children();
  this.currentStateToEvaluate = "";
  for (var i = 0; i < this.currentHtmlState.size(); i ++) {
    this.currentStateToEvaluate += Utils.cleanOperators(this.currentHtmlState[i].innerHTML);
  }
};

HTMLActuator.prototype.getCurrentState = function() {
  this.numberTiles = $(".number-tile .number");
  this.operatorTiles = $(".operator-tile .operator");
  this.firstNumberTile = this.numberTiles[0].innerHTML;
  this.secondNumberTile = this.numberTiles[1].innerHTML;
  this.thirdNumberTile = this.numberTiles[2].innerHTML;
  this.fourthNumberTile = this.numberTiles[3].innerHTML;
  this.firstOperator = Utils.cleanOperators(this.operatorTiles[0].innerHTML);
  this.secondOperator = Utils.cleanOperators(this.operatorTiles[1].innerHTML);
  this.thirdOperator = Utils.cleanOperators(this.operatorTiles[2].innerHTML);
};
