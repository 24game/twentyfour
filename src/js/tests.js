function Tests() {}

Tests.errors = [];
Tests.tests = [];
Tests.numTestsRan = 0;

Tests.tests.push({
  name: 'Puzzle',
  test: function() {
    var puzzle = Puzzles.getNewPuzzle();
    if (puzzle === undefined) throw 'Puzzles.getNewPuzzle() returns undefined';
    if (!puzzle.hasOwnProperty('numberTiles')) throw "puzzle does not have a 'numberTiles' property";
    if (!puzzle.hasOwnProperty('expectedResult')) throw "puzzle does not have a 'expectedResult' property";
  }
});

Tests.run = function() {
  Tests.tests.forEach(function(testObject) {
    Tests.numTestsRan++;
    try {
      testObject["test"]();
    }
    catch (e) {
      Tests.errors.push({"testName": testObject["name"], "error": e});
    }
  });
  if (Tests.errors.length > 0) {
    console.error(Tests.numTestsRan + ' of ' + Tests.tests.length + ' tests ran and failed with ' + Tests.errors.length + ' errors.');
    Tests.errors.forEach(function(error) {
      console.error(error);
    });
  }
  else {
    console.info('All ' + Tests.tests.length + ' tests passed.')
  }
};

Tests.run();