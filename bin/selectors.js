'use strict';

var getSelectedEntities = function getSelectedEntities(state) {
  return state.entities.filter(function (entity) {
    return entity.selected;
  });
};

// convert given x, y in canvas coordinates to world coordinates based on the
// view position


var getWorldCoord = function getWorldCoord(state, x, y) {
  // TODO
};

module.exports = {
  getSelectedEntities: getSelectedEntities,
  getWorldCoord: getWorldCoord
};