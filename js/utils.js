function Utils() {}

Utils.loadJson = function(file) {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': file,
    'dataType': "json",
    success: function(data) {
      console.log("Successfully loaded json.");
      json = data;
    }
  });
  return json;
}