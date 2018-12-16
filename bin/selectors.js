'use strict';

var _require = require('./settings'),
    VIEW_WIDTH = _require.VIEW_WIDTH,
    VIEW_HEIGHT = _require.VIEW_HEIGHT;

var getSelectedEntities = function getSelectedEntities(state) {
  return state.entities.filter(function (entity) {
    return entity.selected;
  });
};

// convert given x, y in canvas coordinates to world coordinates based on the
// view position
var getWorldCoord = function getWorldCoord(state, x, y) {
  var view = state.view;

  return {
    x: (x - VIEW_WIDTH / 2) * view.width / VIEW_WIDTH - view.x,
    y: (y - VIEW_HEIGHT / 2) * view.height / VIEW_HEIGHT - view.y
  };
};

module.exports = {
  getSelectedEntities: getSelectedEntities,
  getWorldCoord: getWorldCoord
};