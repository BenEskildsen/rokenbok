// @flow

const {
  VIEW_WIDTH, VIEW_HEIGHT
} = require('../settings');
const {make} = require('./makeEntity');

const getInitialState = (): State => {
  return {
    running: true,
    entities: [
      ...seedBoks(),
      make('truck', 50, 50),
      make('miner', 75, 75),
      make('factory', 400, 400),
    ],
    view: {
      width: VIEW_WIDTH,
      height: VIEW_HEIGHT,
      x: 0,
      y: 0,
      dragging: false,
      dragStartX: 0,
      dragStartY: 0,
    }
  };
};

const seedBoks = () => {
  const boks = [];
  for (let x = -1000; x < 1000; x+=5) {
    for (let y = -1000; y < 1000; y+=5) {
      if (Math.sqrt(x * x + y * y) >= 200) {
        boks.push(make('bok', x, y));
      }
    }
  }
  return boks;
};

module.exports = {
  getInitialState,
}
