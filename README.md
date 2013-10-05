map-tester
==================

Display background, tiles and foreground based on json config.

## Installation

Running npm install will generate an up-to-date bundle.js. I will include bundle.js in the repository so it should just work, but if you make any adjustments to map-tester.js you will need to run npm install again.

## Usage

Open `index.html` and add a map file to the url, e.g. `index.html?map=maps/level_1.json`. The map path should be relative to index.html.

Maps are defined in `json` documents.

*NOTE: I'm still working out the details of the format*

```json
{
  "name": "First Level!",
  "tiles" : {
    "grass": {
      "file": "images/tiles/grass.png",
      "width": 100,
      "height": 100
    },
    "dirt": {
      "file": "images/tiles/dirt.png",
      "width": 100,
      "height": 100
    }
  },

  "background": {
    "file": "images/Background.png",
    "top": 0,
    "left": 0
  },

  "midground": [
    ["grass", [0, 1000]],
    ["grass", [100, 1000]],
    ["dirt", [200, 1000]],
    ["dirt", [300, 1000]]
  ]

}
```
