'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../entities/makeEntity'),
    make = _require.make;

var _require2 = require('../selectors'),
    getWorldCoord = _require2.getWorldCoord;

var placeReducer = function placeReducer(state, action) {
  var entities = state.entities,
      placing = state.placing;

  var _getWorldCoord = getWorldCoord(state, action.x, action.y),
      x = _getWorldCoord.x,
      y = _getWorldCoord.y;

  if (placing === null) {
    return state;
  }

  entities.push(make(placing, x, y));

  return _extends({}, state, {
    entities: entities,
    placing: null
  });
};

module.exports = {
  placeReducer: placeReducer
};