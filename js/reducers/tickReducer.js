// @flow

const {
  TRUCK_SPEED,
  TRUCK_WIDTH,
  TRUCK_HEIGHT,
  MINER_SPEED,
  MINER_RADIUS,
  BOK_SIze,
} = require('../settings');

const tickReducer = (state: State, action: Action): State => {
  return {
    ...state,
    entities: computePhysics(state.entities),
  };
}

const computePhysics = (entities, fieldWidth, fieldHeight): Array<Entity> => {
  // Update speeds and positions
  for (const entity of entities) {
    entity.speed += entity.accel;
    if (entity.type == 'truck') {
      entity.speed = entity.speed > TRUCK_SPEED ? TRUCK_SPEED : entity.speed;
    } else if (entity.type == 'miner') {
      entity.speed = entity.speed > MINER_SPEED ? MINER_SPEED : entity.speed;
    }
    entity.speed = entity.speed < 0 ? 0 : entity.speed; // NOTE: can't reverse
    entity.x += -1 * Math.sin(entity.theta) * entity.speed;
    entity.y += Math.cos(entity.theta) * entity.speed;
  }

  // Handle collisions with each other
  for (let i = 0; i < entities.length; i++) {
    for (let j = i + 1; j < entities.length; j++) {
      const entityA = entities[i];
      const entityB = entities[j];
      if (collided(entityA, entityB)) {
        // TODO
      }
    }
  }

  return entities;
}

const collided = (entityA: Entity, entityB: Entity): boolean => {
  if (entityA == entityB) {
    return false;
  }
  return false;
  // naive -- circles only
  // const radiusA = entityA.type == 'ball' ? entityA.radius : entityA.width / 2;
  // const radiusB = entityB.type == 'ball' ? entityB.radius : entityB.width / 2;
  // return distance(entityA, entityB) <= radiusA + radiusB;
};

const distance = (entityA, entityB) => {
  const xDist = entityA.x - entityB.x;
  const yDist = entityA.y - entityB.y;
  return Math.sqrt(xDist * xDist + yDist * yDist);
};

module.exports = {
  tickReducer
};
