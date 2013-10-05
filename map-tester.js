var loadImages = require('image-batch-loader');

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
  
  var canvas = document.getElementById('main-canvas');
  if (canvas.getContext) {
    drawMapInContext(canvas.getContext('2d'));
  } else {
    console.log("Canvas not supported.")
  }

  function drawMapInContext(context) {

    loadImageThenAction(map.background.file, drawBackground());

    // then load and draw the next part


    function drawBackground() {
      return function (image) {
        context.drawImage(image, map.background.left, map.background.top);
        loadTiles();
      }
    }

    function loadTiles() {
      // this is just about getting all the tiles loaded
      loadImages(['images/leaves.png', 'images/bark.png'], function (images) {
        var leaves = images['images/leaves.png'],
            bark = images['images/bark.png'];

        // do something with cat and mouse image
      });
    }


    //     var baseSprite = sprite(image);
    //     var configuredSprite = baseSprite(entity.sprite.width, entity.sprite.height);

    //     var position = 10;
    //     context.font = "28px Helvetica";
    //     context.textAlign = "center";

    //     for (var animation in entity.sprite.animations) {
    //       drawAnimationAtPosition(animation, position);
    //       position = position + 10 + entity.width;
    //     }

    //     function drawAnimationAtPosition (animation, horizontalOffset) {
    //       context.fillText(animation, horizontalOffset + entity.width / 2, entity.height + 40);
    //       var positioned = configuredSprite(horizontalOffset, 10, entity.width, entity.height);
    //       blitFrameForever(positioned, entity.sprite.animations[animation], 0, horizontalOffset);
    //     }

    //     function blitFrameForever (blitFunction, animation, index, offset) {
    //       context.clearRect(offset, 10, entity.width, entity.height);
    //       var correctIndex = index % animation.length;
    //       var frame = animation[correctIndex];
    //       var col = frame[0], row = frame[1];
    //       blitFunction(col, row);
    //       var delay = frame[2] || 100;
    //       setTimeout(function () {
    //         blitFrameForever(blitFunction, animation, correctIndex + 1, offset);
    //       }, delay);
    //     }

    // function sprite (image) {
    //   return function (srcWidth, srcHeight) {
    //     return function (x, y, w, h) {
    //       return function (col, row) {
    //         context.drawImage(image,
    //           col * srcWidth, row * srcHeight, srcWidth, srcHeight,
    //           x, y, w, h);
    //       }
    //     }
    //   }
    // }

    function loadImageThenAction (imageFile, action) {
      var img = new Image();
      img.addEventListener('load', function() {
        action(img);
      }, false);
      img.src = imageFile;
    }

  }

}