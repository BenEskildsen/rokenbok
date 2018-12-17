// @flow

const {
  TRUCK_SPEED,
  TRUCK_WIDTH,
  TRUCK_HEIGHT,
  MINER_SPEED,
  MINER_RADIUS,
  BOK_SIZE,
  FACTORY_SIZE,
  BASE_RADIUS,
} = require('../settings');
const {distance} = require('../utils');
const {thetaToNearestBase} = require('../selectors');

const tickReducer = (state: State, action: Action): State => {
  const imgCount = state.view.imgCount;
  let image = state.view.image;
  let shouldRender = state.view.shouldRender;
  if (imgCount == 1) {
    image = null;
    shouldRender = true;
  }
  return {
    ...state,
    entities: computePhysics(state),
    view: {
      ...state.view,
      image,
      shouldRender,
      imgCount: state.view.imgCount - 1,
    }
  };
}

const computePhysics = (state): Array<Entity> => {
  const entities = state.entities;
  // Update speeds and positions
  const nonBokEntities = entities.filter(entity => entity.type != 'bok');
  for (const entity of nonBokEntities) {
    entity.speed += entity.accel;
    entity.prevTheta = entity.theta;
    entity.theta += entity.thetaSpeed;
    if (entity.type == 'truck') {
      entity.speed = entity.speed > TRUCK_SPEED ? TRUCK_SPEED : entity.speed;
    } else if (entity.type == 'miner') {
      entity.speed = entity.speed > MINER_SPEED ? MINER_SPEED : entity.speed;
    }
    entity.speed = entity.speed < 0 ? 0 : entity.speed; // NOTE: can't reverse
    entity.prevX = entity.x;
    entity.prevY = entity.y;
    entity.x += -1 * Math.sin(entity.theta) * entity.speed;
    entity.y += Math.cos(entity.theta) * entity.speed;
  }

  // Handle bok collisions
  const bokEntities = entities.filter(entity => entity.type == 'bok');
  for (let i = 0; i < nonBokEntities.length; i++) {
    const entity = nonBokEntities[i];
    for (let j = 0; j < bokEntities.length; j++) {
      const bok = bokEntities[j];
      if (collided(entity, bok)) {
        // trucks destroy boks they hit
        if (entity.type == 'truck') {
          entity.speed /= 2;
          bok.shouldDestroy = true;
        }
        // miners pick up boks they hit and turn around
        if (entity.type == 'miner') {
          bok.shouldDestroy = true;
          entity.carrying = [bok];
          entity.theta = thetaToNearestBase(state, entity);
        }
      }
    }
  }

  // Handle miner collisions
  const minerEntities = entities.filter(entity => entity.type == 'miner');
  const truckEntities = entities.filter(entity => entity.type == 'truck');
  for (const minerEntity of minerEntities) {
    for (const entity of nonBokEntities) {
      // Give boks to base/factory/truck
      if (entity.type == 'truck' && collided(minerEntity, entity)) {
        entity.carrying = entity.carrying.concat(minerEntity.carrying);
        minerEntity.carrying = [];
        turnMinerAround(minerEntity);
      }
      if (entity.type == 'factory' && collided(minerEntity, entity)) {
        entity.collected += minerEntity.carrying.length;
        minerEntity.carrying = [];
        turnMinerAround(minerEntity);
      }
      if (entity.type == 'base' && collided(minerEntity, entity)) {
        minerEntity.speed = 0; // chill at the base until a truck comes
        for (const truckEntity of truckEntities) {
          if (collided(entity, truckEntity)) {
            truckEntity.carrying = truckEntity.carrying.concat(minerEntity.carrying);
            minerEntity.carrying = [];
            turnMinerAround(minerEntity);
          }
        }
      }
    }
  }

  return entities.filter(entity => !entity.shouldDestroy);
}

const turnMinerAround = (minerEntity: Entity): void => {
  minerEntity.theta += Math.PI;
  minerEntity.speed = MINER_SPEED;
  // can't quite turn around since we're still overlapping the base,
  // push us out a bit
  minerEntity.x += -1 * Math.sin(minerEntity.theta) * minerEntity.speed;
  minerEntity.y += Math.cos(minerEntity.theta) * minerEntity.speed;
};

const collided = (entityA: Entity, entityB: Entity): boolean => {
  if (entityA == entityB) {
    return false;
  }
  // naive -- circles only
  let radiusA = 0;
  switch (entityA.type) {
    case 'truck':
      radiusA = TRUCK_WIDTH / 2;
      break;
    case 'miner':
      radiusA = MINER_RADIUS;
      break;
    case 'bok':
      radiusA = BOK_SIZE / 2;
      break;
    case 'factory':
      radiusA = FACTORY_SIZE / 2;
      break;
    case 'base':
      radiusA = BASE_RADIUS;
      break;
  }
  let radiusB = 0;
  switch (entityB.type) {
    case 'truck':
      radiusB = TRUCK_WIDTH / 2;
      break;
    case 'miner':
      radiusB = MINER_RADIUS;
      break;
    case 'bok':
      radiusB = BOK_SIZE / 2;
      break;
    case 'factory':
      radiusB = FACTORY_SIZE / 2;
      break;
    case 'base':
      radiusB = BASE_RADIUS;
      break;
  }

  return distance(entityA, entityB) <= radiusA + radiusB;
};

module.exports = {
  tickReducer
};
