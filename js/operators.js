function Operators() {
  this.possibleOperations = ['+', '-', '×', '÷'];
}

Operators.prototype.getRandomOperator = function() {
  return Utils.getRandomValueInArray(this.possibleOperations);
};