'use strict';

var _require = require('../settings'),
    VIEW_WIDTH = _require.VIEW_WIDTH,
    VIEW_HEIGHT = _require.VIEW_HEIGHT,
    BOK_SIZE = _require.BOK_SIZE;

var renderToCanvas = function renderToCanvas(state) {
  var view = state.view;

  var canvas = document.getElementById('canvas');
  if (canvas == null) {
    return;
  }
  canvas.width = VIEW_WIDTH;
  canvas.height = VIEW_HEIGHT;
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = '#DEB887';
  ctx.fillRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);

  ctx.save();
  // ctx.translate(view.x + VIEW_WIDTH / 2, view.y + VIEW_HEIGHT / 2);
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
          renderBok(ctx, entity);
        case 'truck':
        case 'miner':
        case 'factory':
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

  ctx.restore();
};

var renderBok = function renderBok(ctx, entity) {
  var x = entity.x,
      y = entity.y,
      theta = entity.theta;

  renderRect(ctx, x, y, theta, BOK_SIZE, BOK_SIZE, 'brown');
};

var renderRect = function renderRect(ctx, x, y, theta, width, height, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.translate(x, y);
  ctx.rotate(theta);
  ctx.fillRect(-width / 2, -height / 2, width, height);
  ctx.restore();
};

module.exports = { renderToCanvas: renderToCanvas };