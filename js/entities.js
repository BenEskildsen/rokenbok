// @flow

const {
  VIEW_WIDTH, VIEW_HEIGHT
} = require('./settings');

const getInitialState = (): State => {
  return {
    running: true,
    entities: [
      ...seedBoks(),
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
  return [
    make('bok', 0, 0),
    make('bok', 0, 5),
    make('bok', 5, 0),
    make('bok', 10, 10),
    make('bok', 100, 100),
    make('bok', 200, 150),
    make('bok', 800, 500),
  ];
};

const make = (type, x, y) => {
  return {
    x, y,
    speed: 0, accel: 0,
    carrying: [],
    theta: 0,
    type,
  };
}

module.exports = {
  getInitialState,
  make,
}
