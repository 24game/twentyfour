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
  return Math.random();
};