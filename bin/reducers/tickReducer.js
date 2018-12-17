'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../settings'),
    TRUCK_SPEED = _require.TRUCK_SPEED,
    TRUCK_WIDTH = _require.TRUCK_WIDTH,
    TRUCK_HEIGHT = _require.TRUCK_HEIGHT,
    TRUCK_CAPACITY = _require.TRUCK_CAPACITY,
    MINER_SPEED = _require.MINER_SPEED,
    MINER_RADIUS = _require.MINER_RADIUS,
    BOK_SIZE = _require.BOK_SIZE,
    FACTORY_SIZE = _require.FACTORY_SIZE,
    BASE_RADIUS = _require.BASE_RADIUS;

var _require2 = require('../utils'),
    distance = _require2.distance;

var _require3 = require('../selectors'),
    thetaToNearestBase = _require3.thetaToNearestBase;

var tickReducer = function tickReducer(state, action) {
  var imgCount = state.view.imgCount;
  var image = state.view.image;
  var shouldRender = state.view.shouldRender;
  if (imgCount == 1) {
    image = null;
    shouldRender = true;
  }
  return _extends({}, state, {
    entities: computePhysics(state),
    view: _extends({}, state.view, {
      image: image,
      shouldRender: shouldRender,
      imgCount: state.view.imgCount - 1
    })
  });
};

var computePhysics = function computePhysics(state) {
  var entities = state.entities;
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
        // miners pick up boks they hit and turn around
        if (entity.type == 'miner') {
          bok.shouldDestroy = true;
          entity.carrying = [bok];
          entity.theta = thetaToNearestBase(state, entity);
        }
      }
    }
  }

  // Handle trucks dropping at factory
  var truckEntities = entities.filter(function (entity) {
    return entity.type == 'truck';
  });
  var factoryEntities = entities.filter(function (entity) {
    return entity.type == 'factory';
  });
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = truckEntities[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var truckEntity = _step2.value;
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = factoryEntities[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var factoryEntity = _step4.value;

          if (collided(truckEntity, factoryEntity)) {
            factoryEntity.collected += truckEntity.carrying.length;
            truckEntity.carrying = [];
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }

    // Handle miner collisions
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

  var minerEntities = entities.filter(function (entity) {
    return entity.type == 'miner';
  });
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = minerEntities[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var minerEntity = _step3.value;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = nonBokEntities[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _entity2 = _step5.value;

          // Give boks to base/factory/truck
          if (_entity2.type == 'truck' && collided(minerEntity, _entity2) && _entity2.carrying.length < TRUCK_CAPACITY) {
            _entity2.carrying = _entity2.carrying.concat(minerEntity.carrying);
            minerEntity.carrying = [];
            turnMinerAround(minerEntity);
          }
          if (_entity2.type == 'factory' && collided(minerEntity, _entity2)) {
            _entity2.collected += minerEntity.carrying.length;
            minerEntity.carrying = [];
            turnMinerAround(minerEntity);
          }
          if (_entity2.type == 'base' && collided(minerEntity, _entity2)) {
            minerEntity.speed = 0; // chill at the base until a truck comes
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
              for (var _iterator6 = truckEntities[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var _truckEntity = _step6.value;

                if (collided(_entity2, _truckEntity) && _truckEntity.carrying.length < TRUCK_CAPACITY) {
                  _truckEntity.carrying = _truckEntity.carrying.concat(minerEntity.carrying);
                  minerEntity.carrying = [];
                  turnMinerAround(minerEntity);
                }
              }
            } catch (err) {
              _didIteratorError6 = true;
              _iteratorError6 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion6 && _iterator6.return) {
                  _iterator6.return();
                }
              } finally {
                if (_didIteratorError6) {
                  throw _iteratorError6;
                }
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
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

  return entities.filter(function (entity) {
    return !entity.shouldDestroy;
  });
};

var turnMinerAround = function turnMinerAround(minerEntity) {
  minerEntity.theta += Math.PI;
  minerEntity.speed = MINER_SPEED;
  // can't quite turn around since we're still overlapping the base,
  // push us out a bit
  minerEntity.x += -1 * Math.sin(minerEntity.theta) * minerEntity.speed;
  minerEntity.y += Math.cos(minerEntity.theta) * minerEntity.speed;
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
      radiusA = BASE_RADIUS;
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
      radiusB = BASE_RADIUS;
      break;
  }

  return distance(entityA, entityB) <= radiusA + radiusB;
};

module.exports = {
  tickReducer: tickReducer
};