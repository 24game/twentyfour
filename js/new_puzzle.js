function loadJson() {
  var json = null;
  $.ajax({
    'async' : false,
    'global' : false,
    'url' : "./puzzles.json",
    'dataType' : "json",
    success : function (data) {
      console.log("Successfully loaded json.");
      json = data;
    }
  });
  return json;
}

function GetPuzzles() {
  var json = loadJson();
  var puzzles = json.puzzles;
  console.log(puzzles);
  var randomIndex = Math.floor(Math.random() * puzzles.length);
  return puzzles[randomIndex];
}
