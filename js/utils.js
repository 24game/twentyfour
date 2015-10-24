function Utils() {}

Utils.loadJson = function(file) {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': file,
    'dataType': "json",
    success: function(data) {
      console.log("Successfully loaded json.");
      json = data;
    }
  });
  return json;
};

Utils.cleanStringToCompute = function(stringToCompute) {
  return stringToCompute.replace(/[^0-9\+\-\*\/\(\)]+/g, '');
};

Utils.swap = function(a, b, array) {
  var temp = array[a];
  array[a] = array[b];
  array[b] = temp;
};

Utils.randomize = function(array) {
  for (var i = 0; i < array.length; i ++) {
    var random = Math.floor(Math.random() * array.length);
    this.swap(i, random, array);
  }
  return array;
};
