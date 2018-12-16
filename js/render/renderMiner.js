const {renderCircle} = require('./shapes');
const {renderBok} = require('./renderBok');
const {
  MINER_RADIUS, MINER_COLOR,
  BACKGROUND_COLOR, SELECT_COLOR,
} = require('../settings');

const renderMiner = (ctx, entity) => {
  const {x, y, theta, prevX, prevY, carrying} = entity;
  if (entity.selected) {
    renderCircle(ctx, prevX, prevY, MINER_RADIUS + 3, BACKGROUND_COLOR);
    renderCircle(ctx, x, y, MINER_RADIUS + 2, SELECT_COLOR);
  }
  if (!entity.selected) {
    renderCircle(ctx, prevX, prevY, MINER_RADIUS + 3, BACKGROUND_COLOR);
  }
  renderCircle(ctx, x, y, MINER_RADIUS, MINER_COLOR);
  
  carrying.forEach(carryingEntity => {
    if (carryingEntity.type == 'bok') {
      renderBok(ctx, {
        ...carryingEntity,
        x,
        y,
      });
    }
  });

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

module.exports = {renderMiner};
