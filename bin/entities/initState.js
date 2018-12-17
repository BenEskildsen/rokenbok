'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('../settings'),
    VIEW_WIDTH = _require.VIEW_WIDTH,
    VIEW_HEIGHT = _require.VIEW_HEIGHT,
    INIT_VIEW_X = _require.INIT_VIEW_X,
    INIT_VIEW_Y = _require.INIT_VIEW_Y;

var _require2 = require('./makeEntity'),
    make = _require2.make;

var FAC_POS_X = 400;
var FAC_POS_Y = 400;

var getInitialState = function getInitialState() {
  return {
    running: true,
    entities: [].concat(_toConsumableArray(seedBoks()), [make('base', 0, 0), make('truck', -50, -50), make('miner', 75, -50), make('factory', FAC_POS_X, FAC_POS_Y)]),
    automatedTrucks: false,
    placing: null,
    startTime: Date.now(),
    bokMilestones: [],
    nextBokMilestone: 10,
    view: {
      width: VIEW_WIDTH,
      height: VIEW_HEIGHT,
      x: INIT_VIEW_X,
      y: INIT_VIEW_Y,
      dragging: false,
      dragStartX: 0,
      dragStartY: 0,
      shouldRender: true,
      image: null,
      imgCount: 0
    }
  };
};

var seedBoks = function seedBoks() {
  var boks = [];
  for (var x = -1000; x < 1000; x += 5) {
    for (var y = -1000; y < 1000; y += 5) {
      if (Math.sqrt(x * x + y * y) >= 200 && Math.sqrt((x - FAC_POS_X) * (x - FAC_POS_X) + (y - FAC_POS_Y) * (y - FAC_POS_Y)) >= 600) {
        boks.push(make('bok', x, y));
      }
    }
  }
  return boks;
};

module.exports = {
  getInitialState: getInitialState
};