const {renderRect} = require('./shapes');
const {
  TRUCK_WIDTH, TRUCK_HEIGHT, TRUCK_COLOR, CAB_COLOR,
  BACKGROUND_COLOR, SELECT_COLOR
} = require('../settings');

const renderTruck = (ctx, entity) => {
  const {x, y, theta, prevX, prevY, prevTheta} = entity;
  if (entity.selected) {
    renderRect(
      ctx, prevX, prevY, prevTheta, TRUCK_WIDTH + 3, TRUCK_HEIGHT + 3, BACKGROUND_COLOR,
    );
    renderRect(ctx, x, y, theta, TRUCK_WIDTH + 2, TRUCK_HEIGHT + 2, SELECT_COLOR);
  }
  if (!entity.selected) {
    renderRect(
      ctx, prevX, prevY, prevTheta, TRUCK_WIDTH + 3, TRUCK_HEIGHT + 3, BACKGROUND_COLOR,
    );
  }
  renderRect(ctx, x, y, theta, TRUCK_WIDTH, TRUCK_HEIGHT, TRUCK_COLOR);
  // render cab
  ctx.save();
  ctx.fillStyle = CAB_COLOR;
  ctx.translate(x, y);
  ctx.rotate(theta);
  ctx.fillRect(-TRUCK_WIDTH/2, TRUCK_HEIGHT/6, TRUCK_WIDTH, TRUCK_HEIGHT / 3);
  ctx.restore();
};

module.exports = {renderTruck};
