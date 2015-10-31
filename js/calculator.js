function Calculator() {}

Calculator.compute = function(stringToCompute) {
  return Math.round( eval(Utils.cleanStringToCompute(stringToCompute)) * 10 ) / 10;
};
