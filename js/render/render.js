const {
  VIEW_WIDTH, VIEW_HEIGHT,
  BOK_SIZE,
} = require('../settings');


const renderToCanvas = (state) => {
  const {view} = state;
  const canvas = document.getElementById('canvas');
  if (canvas == null) {
    return;
  }
  canvas.width = VIEW_WIDTH;
  canvas.height = VIEW_HEIGHT;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#DEB887';
  ctx.fillRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);

  ctx.save();
  ctx.scale(VIEW_WIDTH / view.width, VIEW_HEIGHT / view.height);
  ctx.translate(view.x + view.width / 2, view.y + view.height / 2);
  for (const entity of state.entities) {
    switch (entity.type) {
      case 'bok':
        renderBok(ctx, entity);
      case 'truck':
      case 'miner':
      case 'factory':
    }
  }
  ctx.restore();
};

const renderBok = (ctx, entity) => {
  const {x, y, theta} = entity;
  renderRect(ctx, x, y, theta, BOK_SIZE, BOK_SIZE, 'brown');
}

const renderRect = (ctx, x, y, theta, width, height, color) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.translate(x, y);
  ctx.rotate(theta);
  ctx.fillRect(-width / 2, -height / 2, width, height);
  ctx.restore();
};

module.exports = {renderToCanvas};
