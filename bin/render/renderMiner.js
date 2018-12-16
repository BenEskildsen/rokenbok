'use strict';

var _require = require('./shapes'),
    renderCircle = _require.renderCircle;

var _require2 = require('../settings'),
    MINER_RADIUS = _require2.MINER_RADIUS,
    MINER_COLOR = _require2.MINER_COLOR,
    BACKGROUND_COLOR = _require2.BACKGROUND_COLOR,
    SELECT_COLOR = _require2.SELECT_COLOR;

var renderMiner = function renderMiner(ctx, entity) {
  var x = entity.x,
      y = entity.y,
      theta = entity.theta,
      prevX = entity.prevX,
      prevY = entity.prevY;

  if (entity.selected) {
    renderCircle(ctx, prevX, prevY, MINER_RADIUS + 3, BACKGROUND_COLOR);
    renderCircle(ctx, x, y, MINER_RADIUS + 2, SELECT_COLOR);
  }
  if (!entity.selected) {
    renderCircle(ctx, prevX, prevY, MINER_RADIUS + 3, BACKGROUND_COLOR);
  }
  renderCircle(ctx, x, y, MINER_RADIUS, MINER_COLOR);
  // render pointer
  ctx.save();
  ctx.strokeStyle = 'black';
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.sin(-theta) * MINER_RADIUS, Math.cos(theta) * MINER_RADIUS);
  ctx.stroke();
  ctx.restore();
};

module.exports = { renderMiner: renderMiner };