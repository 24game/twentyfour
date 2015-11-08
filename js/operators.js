function Operators() {}

Operators.ctor = function() {
  if (Operators.__ctor_initialized) {
    return;
  }
  Operators.__ctor_initialized = true;
};

Operators.possibleOperators = Object.freeze({
  'ADDITION' : '+',
  'SUBTRACTION' : '-',
  'MULTIPLICATION' : '×',
  'DIVISION' : '÷'
});

Operators.getRandomOperator = function() {
  Operators.ctor();
  return Operators.possibleOperators[Utils.getRandomValueInArray(Object.keys(Operators.possibleOperators))];
};

Operators.getNextOperator = function(currentOperator) {
  switch(currentOperator) {
    case '+':
      return '-';
      break;
    case '-':
      return '×';
      break;
    case '×':
      return '÷';
      break;
    case '÷':
      return '+';
      break;
  }
}
