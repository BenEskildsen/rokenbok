'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../settings'),
    TRUCK_SPEED = _require.TRUCK_SPEED,
    TRUCK_WIDTH = _require.TRUCK_WIDTH,
    TRUCK_HEIGHT = _require.TRUCK_HEIGHT,
    MINER_SPEED = _require.MINER_SPEED,
    MINER_RADIUS = _require.MINER_RADIUS,
    BOK_SIZE = _require.BOK_SIZE,
    FACTORY_SIZE = _require.FACTORY_SIZE;

var _require2 = require('../utils'),
    distance = _require2.distance;

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
      var _entity = _step.value;

      _entity.speed += _entity.accel;
      _entity.theta += _entity.thetaSpeed;
      if (_entity.type == 'truck') {
        _entity.speed = _entity.speed > TRUCK_SPEED ? TRUCK_SPEED : _entity.speed;
      } else if (_entity.type == 'miner') {
        _entity.speed = _entity.speed > MINER_SPEED ? MINER_SPEED : _entity.speed;
      }
      _entity.speed = _entity.speed < 0 ? 0 : _entity.speed; // NOTE: can't reverse
      _entity.x += -1 * Math.sin(_entity.theta) * _entity.speed;
      _entity.y += Math.cos(_entity.theta) * _entity.speed;
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

  var nonBokEntities = entities.filter(function (entity) {
    return entity.type != 'bok';
  });
  // const bokEntities = entities.filter(entity => entity.type == 'bok');
  var bokEntities = [];
  for (var i = 0; i < nonBokEntities.length; i++) {
    var entity = nonBokEntities[i];
    for (var j = 0; j < bokEntities.length; j++) {
      var bok = bokEntities[j];
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

  return entities.filter(function (entity) {
    return !entity.shouldDestroy;
  });
};

var collided = function collided(entityA, entityB) {
  if (entityA == entityB) {
    return false;
  }
  // naive -- circles only
  var radiusA = 0;
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
  var radiusB = 0;
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
  tickReducer: tickReducer
};