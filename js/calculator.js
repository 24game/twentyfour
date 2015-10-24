function Calculator() {}

Calculator.compute = function(stringToCompute) {
  return eval(Utils.cleanStringToCompute(stringToCompute));
};
