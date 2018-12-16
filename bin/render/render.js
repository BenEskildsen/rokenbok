'use strict';

var _require = require('../settings'),
    VIEW_WIDTH = _require.VIEW_WIDTH,
    VIEW_HEIGHT = _require.VIEW_HEIGHT,
    BACKGROUND_COLOR = _require.BACKGROUND_COLOR,
    SELECT_COLOR = _require.SELECT_COLOR,
    BOK_SIZE = _require.BOK_SIZE,
    BOK_COLOR = _require.BOK_COLOR,
    BASE_RADIUS = _require.BASE_RADIUS,
    BASE_COLOR = _require.BASE_COLOR;

var _require2 = require('./shapes'),
    renderCircle = _require2.renderCircle,
    renderRect = _require2.renderRect;

var _require3 = require('./renderMiner'),
    renderMiner = _require3.renderMiner;

var _require4 = require('./renderTruck'),
    renderTruck = _require4.renderTruck;

var _require5 = require('./renderFactory'),
    renderFactory = _require5.renderFactory;

var _require6 = require('./renderBok'),
    renderBok = _require6.renderBok;

var initCanvas = function initCanvas() {
  var canvas = document.getElementById('canvas');
  if (canvas == null) {
    return;
  }
  canvas.width = VIEW_WIDTH;
  canvas.height = VIEW_HEIGHT;
};

var renderToCanvas = function renderToCanvas(state) {
  var view = state.view;

  var canvas = document.getElementById('canvas');
  if (canvas == null) {
    return;
  }
  var ctx = canvas.getContext('2d');

  if (view.shouldRender) {
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);
  }

  ctx.save();
  ctx.scale(VIEW_WIDTH / view.width, VIEW_HEIGHT / view.height);
  ctx.translate(view.x + view.width / 2, view.y + view.height / 2);
  if (view.image) {
    ctx.drawImage(view.image, -view.imgX - view.imgWidth / 2, -view.imgY - view.imgHeight / 2, view.imgWidth, view.imgHeight);
    ctx.restore();
    // see comment below
    view.shouldRender = false;
    return;
  }
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = state.entities[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entity = _step.value;

      switch (entity.type) {
        case 'bok':
          if (view.shouldRender) {
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
        case 'base':
          renderBase(ctx, entity);
          break;
      }
    }
    // shhh this is a side-effect on the state so that I can change the state without
    // causing yet-another-re-render. This flag only exists to try to not render more
    // than needed
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

  view.shouldRender = false;
  ctx.restore();
};

var renderBase = function renderBase(ctx, entity) {
  var x = entity.x,
      y = entity.y,
      theta = entity.theta;

  renderCircle(ctx, x, y, BASE_RADIUS, BASE_COLOR);
};

module.exports = { renderToCanvas: renderToCanvas, initCanvas: initCanvas };