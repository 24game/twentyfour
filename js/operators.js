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
<<<<<<< HEAD
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
=======
  return Math.random();
};
>>>>>>> 5acc2fdd5cb3d2c1ed63cb1f4b726890a69bf300
