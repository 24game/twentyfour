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
      array = this.swap(array, i, Math.floor(Math.random() * array.length));
    }
    return array;
  }

  /**
  *  Returns a value in the array at random.
  */
  static randArrayValue(array) {
    var random = Math.floor(Math.random() * array.length);
    return array[random];
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
    if (totalParentheses == 2 || tile.hasParenthesis()) {
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
        if (tile.getPosition() > gameState.getParenthesizedTilePosition()) {
          tile.setRightParenthesis();
        } else {
          gameState.clearParentheses();
          tile.setLeftParenthesis();
        }
      }

    }
  }

  // tiles is an array of the tiles (ex. [1, 4, 5, 6]).
  // operators is an array of the operators (ex. [+, +, -, *]).
  // parenthesesState is an array of the indecies of the left and right
  // parentheses with respect to the tile positions. parenthesesState[0]
  // is the index of the left parenthesis and parenthesesState[1] is the index
  // of the right parenthesis.
  static buildResultToCompute(tiles, operators, parenthesesState) {
    // Build the initial string, ignoring parentheses.
    let initialStringToCompute = tiles[0] + operators[0]
    + tiles[1] + operators[1] + tiles[2] + operators[2] + tiles[3];

    // If there are no parentheses evaluate the result as is.
    // If there is only one parenthesis, then evaluate
    // the result disregarding that parenthesis (the first parenthesis)
    // is always the left parenthesis.
    // Clean operators and return the stringToCompute.
    if (parenthesesState[0] === null || parenthesesState[1] === null) {
      return this.cleanOperators(initialStringToCompute);
    } else {
      // We will append parentheses with respect to the position of
      // the operators, which is invariant.
      let operatorIndecies = [];
      for (let i = 0; i < initialStringToCompute.length; i ++) {
        let operator = this.cleanOperators(initialStringToCompute[i]);
        if (operator === "+" || operator === "-" || operator === "*" || operator === "/") {
          operatorIndecies.push(i);
        }
      }

      // First append the left parenthesis.
      var leftParenthesized = parenthesesState[0] === 0 ? ("(" + initialStringToCompute)
      : ([initialStringToCompute.slice(0, operatorIndecies[parenthesesState[0] - 1] + 1), "(", initialStringToCompute.slice(operatorIndecies[parenthesesState[0] - 1] + 1)].join(''));

      // Then append the right parenthesis.
      var rightParenthesized = parenthesesState[1] === 3 ? (leftParenthesized + ")")
      : ([leftParenthesized.slice(0, operatorIndecies[parenthesesState[1]] + 1), ")", leftParenthesized.slice(operatorIndecies[parenthesesState[1]] + 1)].join(''));
    }
    return this.cleanOperators(rightParenthesized);
  }

}
