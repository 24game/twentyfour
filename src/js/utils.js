export default class Utils {
  loadJson(file) {
    var json = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': file,
      'dataType': "json",
      success: function (data) {
        json = data;
      }
    });
    return json;
  }

  cleanStringToCompute(stringToCompute) {
    return stringToCompute.replace(/[^0-9\+\-\*\/\(\)]+/g, '');
  }

  cleanOperators(stringToClean) {
    return stringToClean.replace(/×+/g, '*').replace(/÷+/g, '/').replace(/−+/g, '-');
  }

  getRandomValueInArray(array) {
    var random = Math.floor(Math.random() * array.length);
    return array[random];
  }

  randomize(array) {
    for (var i = 0; i < array.length; i++) {
      var random = Math.floor(Math.random() * array.length);
      this.swap(i, random, array);
    }
    return array;
  }

  swap(a, b, array) {
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  }
}