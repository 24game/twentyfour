import $ from 'jquery';

export default class Utils {
  static loadJson(file) {
    var json = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': file,
      'dataType': "json",
      success: function (data) {
        console.log('success');
        json = data;
      }
    });
    return json;
  }

  static cleanStringToCompute(stringToCompute) {
    return stringToCompute.replace(/[^0-9\+\-\*\/\(\)]+/g, '');
  }

  static cleanOperators(stringToClean) {
    return stringToClean.replace(/×+/g, '*').replace(/÷+/g, '/').replace(/−+/g, '-');
  }

  static cleanComputedResult(stringToClean) {
    var indexOfDecimal = stringToClean.indexOf('.');
    return indexOfDecimal === -1 ? stringToClean : stringToClean.substring(0, (indexOfDecimal + 3));
  }

  static getRandomValueInArray(array) {
    var random = Math.floor(Math.random() * array.length);
    return array[random];
  }

  static getNewPuzzle(listOfPuzzles) {
    var randomIndex = Math.floor(Math.random() * listOfPuzzles.length);
    return listOfPuzzles[randomIndex].numberTiles;
  }

  static randomize(array) {
    for (var i = 0; i < array.length; i++) {
      var random = Math.floor(Math.random() * array.length);
      this.swap(i, random, array);
    }
    return array;
  }

  static swap(a, b, array) {
    var temp = array[a];
    array[a] = array[b];
    array[b] = temp;
  }
}
