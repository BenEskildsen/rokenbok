'use strict';

var _require = require('../settings'),
    VIEW_WIDTH = _require.VIEW_WIDTH,
    VIEW_HEIGHT = _require.VIEW_HEIGHT,
    BACKGROUND_COLOR = _require.BACKGROUND_COLOR,
    SELECT_COLOR = _require.SELECT_COLOR,
    TRUCK_WIDTH = _require.TRUCK_WIDTH,
    TRUCK_HEIGHT = _require.TRUCK_HEIGHT,
    TRUCK_COLOR = _require.TRUCK_COLOR,
    MINER_RADIUS = _require.MINER_RADIUS,
    MINER_COLOR = _require.MINER_COLOR,
    FACTORY_SIZE = _require.FACTORY_SIZE,
    FACTORY_COLOR = _require.FACTORY_COLOR,
    BOK_SIZE = _require.BOK_SIZE,
    BOK_COLOR = _require.BOK_COLOR;

var _require2 = require('./shapes'),
    renderCircle = _require2.renderCircle,
    renderRect = _require2.renderRect;

var initCanvas = function initCanvas() {
  var canvas = document.getElementById('canvas');
  if (canvas == null) {
    return;
  }
  canvas.width = VIEW_WIDTH;
  canvas.height = VIEW_HEIGHT;
};

var renderedBok = false;
var renderToCanvas = function renderToCanvas(state) {
  var view = state.view;

  var canvas = document.getElementById('canvas');
  if (canvas == null) {
    return;
  }
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = BACKGROUND_COLOR;
  if (!renderedBok) {
    ctx.fillRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);
  }

  ctx.save();
  ctx.scale(VIEW_WIDTH / view.width, VIEW_HEIGHT / view.height);
  ctx.translate(view.x + view.width / 2, view.y + view.height / 2);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = state.entities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entity = _step.value;

      switch (entity.type) {
        case 'bok':
          if (!renderedBok) {
            renderBok(ctx, entity);
          }
          break;
        case 'truck':
          renderTruck(ctx, entity);
          break;
        case 'miner':
          renderMiner(ctx, entity);
          break;
        case 'factory':
          renderFactory(ctx, entity);
          break;
      }
    }
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

  renderedBok = true;
  ctx.restore();
};

var renderMiner = function renderMiner(ctx, entity) {
  var x = entity.x,
      y = entity.y;

  if (entity.selected) {
    renderCircle(ctx, x, y, MINER_RADIUS + 2, SELECT_COLOR);
  }
  renderCircle(ctx, x, y, MINER_RADIUS, MINER_COLOR);
};

var renderTruck = function renderTruck(ctx, entity) {
  var x = entity.x,
      y = entity.y,
      theta = entity.theta;

  if (entity.selected) {
    renderRect(ctx, x, y, theta, TRUCK_WIDTH + 2, TRUCK_HEIGHT + 2, SELECT_COLOR);
  }
  renderRect(ctx, x, y, theta, TRUCK_WIDTH, TRUCK_HEIGHT, TRUCK_COLOR);
};

var renderBok = function renderBok(ctx, entity) {
  var x = entity.x,
      y = entity.y,
      theta = entity.theta;

  renderRect(ctx, x, y, theta, BOK_SIZE, BOK_SIZE, BOK_COLOR);
};

var renderFactory = function renderFactory(ctx, entity) {
  var x = entity.x,
      y = entity.y,
      theta = entity.theta;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(theta + Math.PI);
  ctx.fillStyle = FACTORY_COLOR;
  ctx.beginPath();
  ctx.moveTo(-FACTORY_SIZE / 2, FACTORY_SIZE / 2);
  ctx.lineTo(-FACTORY_SIZE / 2, -FACTORY_SIZE / 2); // left wall
  ctx.lineTo(-FACTORY_SIZE / 4, -FACTORY_SIZE / 4); // first diagonal
  ctx.lineTo(-FACTORY_SIZE / 4, -FACTORY_SIZE / 2);
  ctx.lineTo(0, -FACTORY_SIZE / 4); // second diagonal
  ctx.lineTo(0, -FACTORY_SIZE / 2);
  ctx.lineTo(FACTORY_SIZE / 4, -FACTORY_SIZE / 4); // third diagonal
  ctx.lineTo(FACTORY_SIZE / 4, -FACTORY_SIZE / 2);
  ctx.lineTo(FACTORY_SIZE / 2, -FACTORY_SIZE / 4); // fourth diagonal
  ctx.lineTo(FACTORY_SIZE / 2, FACTORY_SIZE / 2); // right wall
  ctx.closePath(); // bottom
  ctx.fill();
  ctx.restore();
};

module.exports = { renderToCanvas: renderToCanvas, initCanvas: initCanvas };