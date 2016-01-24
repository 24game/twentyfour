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


  static getConsoleStyle(style) {
    if (style == 'code') {
      return `
    padding: 0 5px 2px;
    border: 1px solid #ddd;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    background-clip: padding-box;
    font-family: Monaco,"DejaVu Sans Mono","Courier New",monospace;
    color: #666;
    `
    } else if (style == 'bold') {
      return `
      font-weight: 600;
    color: rgb(51, 51, 51);
    `;
    } else if (style == 'alert') {
      return `
      font-weight: 600;
    color: red;
    `;
    } else if (style == 'event') {
      return `
    color: green;
    `;
    } else if (style == 'postmessage') {
      return `
    color: orange;
    `;
    } else if (style == 'serviceworkermessage') {
      return `
    color: purple;
    `;
    }
  }

  static clamp(n, min, max) {
    return Math.max(Math.min(n, max), min);
  }

  static reinsert(arr, from, to) {
    const _arr = arr.slice(0);
    const val = _arr[from];
    _arr.splice(from, 1);
    _arr.splice(to, 0, val);
    return _arr;
  }

}