'use strict';

var _require = require('./shapes'),
    renderRect = _require.renderRect;

var _require2 = require('../settings'),
    TRUCK_WIDTH = _require2.TRUCK_WIDTH,
    TRUCK_HEIGHT = _require2.TRUCK_HEIGHT,
    TRUCK_COLOR = _require2.TRUCK_COLOR,
    CAB_COLOR = _require2.CAB_COLOR,
    BACKGROUND_COLOR = _require2.BACKGROUND_COLOR,
    SELECT_COLOR = _require2.SELECT_COLOR;

var renderTruck = function renderTruck(ctx, entity) {
  var x = entity.x,
      y = entity.y,
      theta = entity.theta,
      prevX = entity.prevX,
      prevY = entity.prevY,
      prevTheta = entity.prevTheta;

  if (entity.selected) {
    renderRect(ctx, prevX, prevY, prevTheta, TRUCK_WIDTH + 3, TRUCK_HEIGHT + 3, BACKGROUND_COLOR);
    renderRect(ctx, x, y, theta, TRUCK_WIDTH + 2, TRUCK_HEIGHT + 2, SELECT_COLOR);
  }
  if (!entity.selected) {
    renderRect(ctx, prevX, prevY, prevTheta, TRUCK_WIDTH + 3, TRUCK_HEIGHT + 3, BACKGROUND_COLOR);
  }
  renderRect(ctx, x, y, theta, TRUCK_WIDTH, TRUCK_HEIGHT, TRUCK_COLOR);
  // render cab
  ctx.save();
  ctx.fillStyle = CAB_COLOR;
  ctx.translate(x, y);
  ctx.rotate(theta);
  ctx.fillRect(-TRUCK_WIDTH / 2, TRUCK_HEIGHT / 6, TRUCK_WIDTH, TRUCK_HEIGHT / 3);
  ctx.restore();
};

module.exports = { renderTruck: renderTruck };