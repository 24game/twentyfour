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
  * Returns a non-equivalent array with the elements randomly shuffled.
  */
  static shuffle(array) {
    for (var i = 0; i < array.length; i ++) {
      array = Utils.swap(array, i, Math.floor(Math.random() * array.length));
    }
    return array;
  }

  // tile is the tile which is double clicked.
  // tile has the following methods:
  // (i) hasParenthesis: a boolean determining whether or not this tile has left or right parentheses.
  // (ii) setLeftParenthesis: sets parenthesis to the left of the tile.
  // (iii) setRightParenthesis: sets parenthesis to the right of the tile.
  // (iv) getPosition: returns the position of the current tile, a value between 0 and 3 inclusive.
  //
  // gameState is maintained by Game and has the following properties and methods:
  // (i) totalParentheses: the total number of parentheses on the screen, a value between 0 and 2 inclusive.
  // (ii) clearParentheses: function to reset all parentheses
  // (iii) getParenthesizedTilePosition: function to return the position of the left parenthesis,
  // a value between 0 and 3 inclusive.
  static parentheses(tile, gameState) {
    const totalParentheses = gameState.totalParentheses;
    // We allow only one set of parenthesis. Clicking on a tile with parenthesis resets everything.
    if (totalParentheses == 2 || tile.hasParenthesis) {
      gameState.clearParentheses();
    } else {

      // First parenthesis is always the left parenthesis. Allow it on any tile.
      if (totalParentheses == 0) {
        tile.setLeftParenthesis();
      }

      // Second parenthesis is always the right parenthesis. We check that the right parethensis
      // is to the right of the left parethesis. If it is not we get rid of the left parenthesis
      // and set the left parenthesis to this tile.
      if (totalParentheses == 1) {
        if (tile.getPosition > gameState.getParenthesizedTilePosition()) {
          tile.setRightParenthesis();
        } else {
          gameState.cleanParenthesesState();
          tile.setLeftParenthesis();
        }
      }

    }
  }

}
