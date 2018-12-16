'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../settings'),
    TRUCK_SPEED = _require.TRUCK_SPEED,
    TRUCK_WIDTH = _require.TRUCK_WIDTH,
    TRUCK_HEIGHT = _require.TRUCK_HEIGHT,
    MINER_SPEED = _require.MINER_SPEED,
    MINER_RADIUS = _require.MINER_RADIUS,
    BOK_SIZE = _require.BOK_SIZE,
    FACTORY_SIZE = _require.FACTORY_SIZE,
    BASE_RADIUS = _require.BASE_RADIUS;

var _require2 = require('../utils'),
    distance = _require2.distance;

var tickReducer = function tickReducer(state, action) {
  var imgCount = state.view.imgCount;
  var image = state.view.image;
  var shouldRender = state.view.shouldRender;
  if (imgCount == 1) {
    image = null;
    shouldRender = true;
  }
  return _extends({}, state, {
    entities: computePhysics(state.entities),
    view: _extends({}, state.view, {
      image: image,
      shouldRender: shouldRender,
      imgCount: state.view.imgCount - 1
    })
  });
};

var computePhysics = function computePhysics(entities, fieldWidth, fieldHeight) {
  // Update speeds and positions
  var nonBokEntities = entities.filter(function (entity) {
    return entity.type != 'bok';
  });
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = nonBokEntities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _entity = _step.value;

      _entity.speed += _entity.accel;
      _entity.prevTheta = _entity.theta;
      _entity.theta += _entity.thetaSpeed;
      if (_entity.type == 'truck') {
        _entity.speed = _entity.speed > TRUCK_SPEED ? TRUCK_SPEED : _entity.speed;
      } else if (_entity.type == 'miner') {
        _entity.speed = _entity.speed > MINER_SPEED ? MINER_SPEED : _entity.speed;
      }
      _entity.speed = _entity.speed < 0 ? 0 : _entity.speed; // NOTE: can't reverse
      _entity.prevX = _entity.x;
      _entity.prevY = _entity.y;
      _entity.x += -1 * Math.sin(_entity.theta) * _entity.speed;
      _entity.y += Math.cos(_entity.theta) * _entity.speed;
    }

    // Handle bok collisions
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

  var bokEntities = entities.filter(function (entity) {
    return entity.type == 'bok';
  });
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
  }

  // Handle miner collisions
  var minerEntities = entities.filter(function (entity) {
    return entity.type == 'miner';
  });
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = minerEntities[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var minerEntity = _step2.value;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = entities[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _entity2 = _step3.value;

          // Give boks to base/factory/truck
          if (_entity2.type.match(/^(base|factory|truck)$/) && collided(minerEntity, _entity2)) {
            _entity2.carrying = _entity2.carrying.concat(minerEntity.carrying);
            minerEntity.carrying = [];
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
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
    case 'base':
      radiusA = BASE_RADIUS / 2;
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
    case 'base':
      radiusB = BASE_RADIUS / 2;
      break;
  }

  return distance(entityA, entityB) <= radiusA + radiusB;
};

module.exports = {
  tickReducer: tickReducer
};