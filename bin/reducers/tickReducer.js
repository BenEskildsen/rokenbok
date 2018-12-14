'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../settings'),
    TRUCK_SPEED = _require.TRUCK_SPEED,
    TRUCK_WIDTH = _require.TRUCK_WIDTH,
    TRUCK_HEIGHT = _require.TRUCK_HEIGHT,
    MINER_SPEED = _require.MINER_SPEED,
    MINER_RADIUS = _require.MINER_RADIUS,
    BOK_SIze = _require.BOK_SIze;

var tickReducer = function tickReducer(state, action) {
  return _extends({}, state, {
    entities: computePhysics(state.entities)
  });
};

var computePhysics = function computePhysics(entities, fieldWidth, fieldHeight) {
  // Update speeds and positions
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = entities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entity = _step.value;

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
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  for (var i = 0; i < entities.length; i++) {
    for (var j = i + 1; j < entities.length; j++) {
      var entityA = entities[i];
      var entityB = entities[j];
      if (collided(entityA, entityB)) {
        // TODO
      }
    }
  }

  return entities;
};

var collided = function collided(entityA, entityB) {
  if (entityA == entityB) {
    return false;
  }
  return false;
  // naive -- circles only
  // const radiusA = entityA.type == 'ball' ? entityA.radius : entityA.width / 2;
  // const radiusB = entityB.type == 'ball' ? entityB.radius : entityB.width / 2;
  // return distance(entityA, entityB) <= radiusA + radiusB;
};

var distance = function distance(entityA, entityB) {
  var xDist = entityA.x - entityB.x;
  var yDist = entityA.y - entityB.y;
  return Math.sqrt(xDist * xDist + yDist * yDist);
};

module.exports = {
  tickReducer: tickReducer
};