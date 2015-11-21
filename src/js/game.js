// Loads the json file.
function Game() {
  this.puzzles = Puzzles.getNewPuzzle();
  this.numberTiles = new Array(this.puzzles.numberTiles.length);
  this.isGameUpdating = false;
  this.newGame();
}

// Initializes the number tiles and operator tiles.
Game.prototype.newGame = function() {
  this.createTileObjects();
  this.puzzle = Puzzles.getNewPuzzle();
  for (var i = 0; i < this.numberTiles.length; i ++) {
    this.numberTiles[i].number(this.puzzle.numberTiles[i]);
  }
  for (var i = 0; i < this.operatorTiles.length; i ++) {
    this.operatorTiles[i].operator(Operators.getRandomOperator());
  }

  // This part will eventually go away after refactor.
  for (var i = 0; i < this.numberTiles.length; i ++) {
    $($('.number')[i]).html([this.numberTiles[i].numberValue]);
  }
  for (var i = 0; i < this.operatorTiles.length; i ++) {
    $($('.operator')[i]).html([this.operatorTiles[i].operatorValue]);
  }
};

// Creates number tile and operator tile objects.
Game.prototype.createTileObjects = function() {
  for (var i = 0; i < this.numberTiles.length; i++) {
    this.numberTiles[i] = new Tile();
  }
  this.operatorTiles = new Array(this.numberTiles.length - 1);
  for (var i = 0; i < this.operatorTiles.length; i++) {
    this.operatorTiles[i] = new Tile();
  }
};

Game.prototype.isUpdating = function(updating) {
  if (updating === undefined) {
    return this.isGameUpdating;
  }
  else {
    this.isGameUpdating = updating;
    return this.isGameUpdating;
  }
};

Game.prototype.updateFrontState = function() {
 /*
  1. Number values
  2. Clicked state -> swappable
  3. Double clicked state -> enclosable
  4. POST - run hooks!
   */
  this.numberTiles.forEach(function(numberTile, index) {
    var number = numberTile.numberValue;
    $($($('#game').children('.number-tile')[index]).find('.number')).html(number);
  });
};
