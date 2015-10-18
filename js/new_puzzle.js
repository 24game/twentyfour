function Puzzles() {
  $.ajax({
    url: "./puzzle.json",
    dataType: 'json',
    async: false,
    success: function(json) {
      this.json = json;
      console.log("Loaded json successfully!");
      var randomIndex = Math.floor(Math.random() * json.puzzle.length);
      console.log(json.puzzle[randomIndex]);
    }
  });
}

window.Puzzles = new Puzzles();
