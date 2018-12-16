// @flow

const {
  TRUCK_SPEED,
  TRUCK_WIDTH,
  TRUCK_HEIGHT,
  MINER_SPEED,
  MINER_RADIUS,
  BOK_SIZE,
  FACTORY_SIZE,
} = require('../settings');
const {distance} = require('../utils');

const tickReducer = (state: State, action: Action): State => {
  return {
    ...state,
    entities: computePhysics(state.entities),
  };
}

const computePhysics = (entities, fieldWidth, fieldHeight): Array<Entity> => {
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

  // Handle collisions with each other
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
        // miners pick up boks they hit
        if (entity.type == 'miner') {
          bok.shouldDestroy = true;
          entity.carrying = [bok];
          entity.speed *= -1 * entity.speed;
        }
      }
    }
    // miners should drop off at trucks/factories they hit
    // TODO

  }

  return entities.filter(entity => !entity.shouldDestroy);
}

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
  }

  return distance(entityA, entityB) <= radiusA + radiusB;
};

module.exports = {
  tickReducer
};
