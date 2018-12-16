const make = (type, x, y) => {
  return {
    x, y,
    speed: 0, accel: 0,
    carrying: [],
    selected: false,
    theta: Math.PI,
    prevTheta: Math.PI,
    thetaSpeed: 0,
    type,
    prevX: x,
    prevY: y,
  };
}

module.exports = {
  make,
};
