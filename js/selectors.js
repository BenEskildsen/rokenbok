// @flow

import type {State} from 'types';

const getSelectedEntities = (state: State): Array<Entity> => {
  return state.entities.filter(entity => entity.selected);
};

// convert given x, y in canvas coordinates to world coordinates based on the
// view position
const getWorldCoord = (state: State, x: number, y: number): {x: number, y: number} => {
  // TODO
};

module.exports = {
  getSelectedEntities,
  getWorldCoord,
}
