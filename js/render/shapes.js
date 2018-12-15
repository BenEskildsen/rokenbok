
const renderCircle = (ctx, x, y, radius, color) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
};

const renderRect = (ctx, x, y, theta, width, height, color) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.translate(x, y);
  ctx.rotate(theta);
  ctx.fillRect(-width / 2, -height / 2, width, height);
  ctx.restore();
};

module.exports = {
  renderRect,
  renderCircle,
}
