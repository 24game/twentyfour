function Box() {}

Box.prototype.number = function(numberValue) {
  this.numberValue = numberValue;
}

Box.prototype.operator = function(operatorValue) {
  this.operatorValue = operatorValue;
}

Box.prototype.result = function(firstNumber, secondNumber, thirdNumber, fourthNumber, firstOperation, secondOperation, thirdOperation) {
  var initial = "";
  var fullEquation = initial.concat(firstNumber.numberValue, firstOperation.operatorValue, secondNumber.numberValue, secondOperation.operatorValue, thirdNumber.numberValue, thirdOperation.operatorValue, fourthNumber.numberValue);
  this.computedResult = Calculator.compute(fullEquation);
}
