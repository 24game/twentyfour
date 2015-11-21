function Calculator() {}

// Takes in an expression and evaluates that using javascript's built in eval function.
Calculator.compute = function(stringToCompute) {
  return Math.round(eval(Utils.cleanStringToCompute(stringToCompute)) * 10) / 10;
};
