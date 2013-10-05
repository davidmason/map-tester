var loadImages = require('image-batch-loader'),
    Game = require('crtrdg-gameloop'),
    Mouse = require('crtrdg-mouse');

var canvas = document.getElementById('main-canvas');
var context = canvas.getContext('2d');

var mapFile = function () {
  return window.location.search.split("=")[1];
}

$.getJSON(mapFile())
.fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
})
.done(testTheMap);

function testTheMap (map) {
  document.getElementById('title').innerText = map.name;
  
  if (canvas.getContext) {
    drawMapInContext(context);
  } else {
    console.log("Canvas not supported.")
  }

  function drawMapInContext(context) {

    loadImageThenAction(map.background.file, drawBackground());

    function drawBackground() {
      return function (image) {
        context.drawImage(image, map.background.left, map.background.top);
        loadTiles();
      }
    }

    function loadTiles() {
      var tileImageFiles = [];
      for (var tile in map.tiles) {
        tileImageFiles.push(map.tiles[tile].file);
      }
      loadImages(tileImageFiles, function (images) {
        // draw the images
        var toDraw = map.midground;
        var tiles = map.tiles;
        var boundsPainters = [];
        var name, x, y, w, h, img, bounds;

        for (var i = 0; i < toDraw.length; i++) {
          name = toDraw[i][0];
          img = images[tiles[name].file];
          x = toDraw[i][1][0];
          y = toDraw[i][1][1];
          w = tiles[name].width;
          h = tiles[name].height;

          context.drawImage(img, x, y, w, h);

          if (tiles[name].bounds) {
            bounds = tiles[name].bounds;
            boundsPainters.push(
              prepareBounds(x + bounds.x, y + bounds.y,
                            bounds.width, bounds.height)
            );
          } else {
            boundsPainters.push(prepareBounds(x, y, w, h));
          }

        }

        for (i = 0; i < boundsPainters.length; i++) {
          boundsPainters[i]();
        }
      });
    }

    function prepareBounds (x, y, w, h) {
      return function () {
        context.fillStyle = "rgba(40, 80, 160, 0.5)";
        context.fillRect(x, y, w, h);
        context.strokeStyle = "rgba(40, 80, 160, 0.8)";
        context.strokeRect(x, y, w, h);
      }
    }

    function loadImageThenAction (imageFile, action) {
      var img = new Image();
      img.addEventListener('load', function() {
        action(img);
      }, false);
      img.src = imageFile;
    }
  }
}

var game = new Game({
  canvas: 'main-canvas',
  width: 4000,
  height: 1200,
  backgroundColor: 'rgba(0,0,0,0)'
});

var markerSize = 10;

var mouse = new Mouse(game);
mouse.on('click', function(location){
  var x = location.x - markerSize / 2,
      y = location.y - markerSize / 2,
      w = h = markerSize;
  context.fillStyle = '#333';
  context.strokeStyle = '#aaa';
  context.fillRect(x, y, w, h);
  context.strokeRect(x, y, w, h);

  context.font = "25px Helvetica";
  context.textAlign = "center";

  var text = "(" + location.x + ", " + location.y + ")";
  context.fillText(text, location.x, location.y - 15 );
  context.strokeText(text, location.x, location.y - 15 );
});
