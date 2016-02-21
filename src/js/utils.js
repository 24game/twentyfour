import $ from 'jquery';

export default class Utils {

  static loadJson(file) {
    var json = null;
    return $.ajax({
      url: file,
      dataType: 'json'
    });
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

  /**
   * Returns n clamped to either the min or max if n is out of bounds.
   */
  static clamp(n, min, max) {
    return Math.max(Math.min(n, max), min);
  }

  /**
   * Returns a non-equivalent array with the element at index {from} swapped with the element at index {to}.
   * Use this to update the React state object, since the object is different, compared to swapping by swapping values by index, which returns the same object.
   */
  static swap(array, a, b) {
    const arr = array.slice(0);
    const val = arr[a];
    arr.splice(a, 1);
    arr.splice(b, 0, val);
    return arr;
  }

  /**
   *  Returns a value in the array at random.
   */
  static randArrayValue(array) {
    var random = Math.floor(Math.random() * array.length);
    return array[random];
  }

  /**
   * Returns a non-equivalent array with the elements randomly shuffled.
   */
  static shuffle(array) {
    return array;
  }
}
