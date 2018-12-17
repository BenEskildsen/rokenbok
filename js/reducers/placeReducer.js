// @flow

const {make} = require('../entities/makeEntity');
const {getWorldCoord} = require('../selectors');

const placeReducer = (state: State, action: Action): State => {
  const {entities, placing} = state;
  const {x, y} = getWorldCoord(state, action.x, action.y);
  
  if (placing === null) {
    return state;
  }

  entities.push(make(placing, x, y));
  
  return {
    ...state,
    entities,
    placing: null,
  }
};

module.exports = {
  placeReducer,
};
