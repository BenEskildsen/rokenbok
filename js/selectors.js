// @flow

const {
  VIEW_WIDTH, VIEW_HEIGHT
} = require('./settings');
import type {State} from 'types';

const getSelectedEntities = (state: State): Array<Entity> => {
  return state.entities.filter(entity => entity.selected);
};

// convert given x, y in canvas coordinates to world coordinates based on the
// view position
const getWorldCoord = (state: State, x: number, y: number): {x: number, y: number} => {
  const {view} = state;
  return {
    x: (x - VIEW_WIDTH / 2) * view.width / VIEW_WIDTH - view.x,
    y: (y - VIEW_HEIGHT / 2) * view.height / VIEW_HEIGHT - view.y
  }
};

module.exports = {
  getSelectedEntities,
  getWorldCoord
}
