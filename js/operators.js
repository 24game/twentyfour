function Operators() {}

Operators.getRandomOperator = function() {
  this.possibleOperations = ['+', '-', '×', '÷'];
  return Utils.getRandomValueInArray(this.possibleOperations);
};
