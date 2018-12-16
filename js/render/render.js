const {
  VIEW_WIDTH, VIEW_HEIGHT,
  BACKGROUND_COLOR, SELECT_COLOR,
  TRUCK_WIDTH, TRUCK_HEIGHT, TRUCK_COLOR,
  MINER_RADIUS, MINER_COLOR,
  FACTORY_SIZE, FACTORY_COLOR,
  BOK_SIZE, BOK_COLOR,
} = require('../settings');
const {renderCircle, renderRect} = require('./shapes');

const initCanvas = () => {
  const canvas = document.getElementById('canvas');
  if (canvas == null) {
    return;
  }
  canvas.width = VIEW_WIDTH;
  canvas.height = VIEW_HEIGHT;
};

const renderToCanvas = (state) => {
  const {view} = state;
  const canvas = document.getElementById('canvas');
  if (canvas == null) {
    return;
  }
  const ctx = canvas.getContext('2d');

  if (view.shouldRender) {
    ctx.fillStyle = BACKGROUND_COLOR;
    ctx.fillRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);
  }

  ctx.save();
  ctx.scale(VIEW_WIDTH / view.width, VIEW_HEIGHT / view.height);
  ctx.translate(view.x + view.width / 2, view.y + view.height / 2);
  for (const entity of state.entities) {
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
    }
  }
  // shhh this is a side-effect on the state so that I can change the state without
  // causing yet-another-re-render. This flag only exists to try to not render more
  // than needed
  view.shouldRender = false;
  ctx.restore();
};

const renderMiner = (ctx, entity) => {
  const {x, y, prevX, prevY} = entity;
  if (entity.selected) {
    renderCircle(ctx, prevX, prevY, MINER_RADIUS + 3, BACKGROUND_COLOR);
    renderCircle(ctx, x, y, MINER_RADIUS + 2, SELECT_COLOR);
  }
  if (!entity.selected) {
    renderCircle(ctx, prevX, prevY, MINER_RADIUS, BACKGROUND_COLOR);
  }
  renderCircle(ctx, x, y, MINER_RADIUS, MINER_COLOR);
};

const renderTruck = (ctx, entity) => {
  const {x, y, theta, prevX, prevY, prevTheta} = entity;
  if (entity.selected) {
    renderRect(ctx, prevX, prevY, prevTheta, TRUCK_WIDTH + 3, TRUCK_HEIGHT + 3, BACKGROUND_COLOR);
    renderRect(ctx, x, y, theta, TRUCK_WIDTH + 2, TRUCK_HEIGHT + 2, SELECT_COLOR);
  }
  if (!entity.selected) {
    renderRect(ctx, prevX, prevY, prevTheta, TRUCK_WIDTH, TRUCK_HEIGHT, BACKGROUND_COLOR);
  }
  renderRect(ctx, x, y, theta, TRUCK_WIDTH, TRUCK_HEIGHT, TRUCK_COLOR);
};

const renderBok = (ctx, entity) => {
  const {x, y, theta} = entity;
  renderRect(ctx, x, y, theta, BOK_SIZE, BOK_SIZE, BOK_COLOR);
};

const renderFactory = (ctx, entity) => {
  const {x, y, theta} = entity;
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

module.exports = {renderToCanvas, initCanvas};
