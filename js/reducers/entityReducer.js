// @flow

const {getSelectedEntities, getWorldCoord} = require('../selectors');
const {
  TRUCK_WIDTH, TRUCK_HEIGHT,
  TRUCK_TURN_SPEED, TRUCK_SPEED, TRUCK_ACCEL,
  MINER_SPEED, MINER_RADIUS, MINER_TURN_SPEED,
} = require('../settings');
const {distance} = require('../utils');
const {max} = Math;

const entityReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'MAYBE_SELECT':
      deselectAll(state.entities);
      const selEntity = maybeSelect(
        state.entities,
        getWorldCoord(state, action.x, action.y),
      );
      if (selEntity != null && selEntity.type == 'miner') {
        selEntity.speed = 0;
      }
      return state;
    case 'ACCELERATE': {
      const selEntities = getSelectedEntities(state);
      if (selEntities.length == 0) {
        return state;
      }
      const entity = selEntities[0];
      if (entity.type == 'truck') {
        entity.accel = entity.speed < TRUCK_SPEED ? TRUCK_ACCEL : 0;
      }
      return state;
    }
    case 'DEACCELERATE': {
      const selEntities = getSelectedEntities(state);
      if (selEntities.length == 0) {
        return state;
      }
      const entity = selEntities[0];
      if (entity.type == 'truck') {
        entity.accel = entity.speed > 0 ? -1 * TRUCK_ACCEL : 0;
      }
      return state;
    }
    case 'TURN': {
      const selEntities = getSelectedEntities(state);
      if (selEntities.length == 0) {
        return state;
      }
      const entity = selEntities[0];
      if (entity.type == 'truck') {
        entity.thetaSpeed = action.dir * TRUCK_TURN_SPEED;
      } else if (entity.type == 'miner') {
        entity.thetaSpeed = action.dir * MINER_TURN_SPEED;
      }
      return state;
    }
  }
};

const deselectAll = (entities: Array<Entity>): void => {
  entities.forEach(entity => {
    if (entity.type == 'miner' && entity.selected) {
      entity.speed = MINER_SPEED;
    }
    entity.selected = false;
  });
}

const maybeSelect = (entities: Array<Entity>, worldCoord: {x: number, y: number}) => {
  let selEntity = null;
  entities.forEach(entity => {
    if (entity.type == 'truck') {
      const {x, y} = entity;
      if (distance({x, y}, worldCoord) < max(TRUCK_WIDTH, TRUCK_HEIGHT)) {
        entity.selected = true;
        selEntity = entity;
      }
    }

    if (entity.type == 'miner') {
      const {x, y} = entity;
      if (distance({x, y}, worldCoord) < MINER_RADIUS) {
        entity.selected = true;
        selEntity = entity;
      }
    }
  });
  return selEntity;
}

module.exports = {
  entityReducer,
};
