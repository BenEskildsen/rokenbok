// @flow

const {
  VIEW_WIDTH, VIEW_HEIGHT
} = require('../settings');
const {make} = require('./makeEntity');

const FAC_POS_X = 400;
const FAC_POS_Y = 400;

const getInitialState = (): State => {
  const truck = make('truck', -50, -50);
  truck.carrying = [make('bok',0,0), make('bok',0,0), make('bok',0,0), make('bok',0,0), make('bok',0,0),make('bok',0,0), make('bok',0,0), make('bok',0,0), make('bok',0,0), make('bok',0,0),make('bok',0,0), make('bok',0,0), make('bok',0,0), make('bok',0,0), make('bok',0,0)];
  return {
    running: true,
    entities: [
      ...seedBoks(),
      make('base', 0, 0),
      truck,
      make('miner', 75, 75),
      make('factory', FAC_POS_X, FAC_POS_Y),
    ],
    view: {
      width: VIEW_WIDTH,
      height: VIEW_HEIGHT,
      x: 0,
      y: 0,
      dragging: false,
      dragStartX: 0,
      dragStartY: 0,
      shouldRender: true,
      image: null,
      imgCount: 0,
    }
  };
};

const seedBoks = () => {
  const boks = [];
  for (let x = -1000; x < 1000; x+=5) {
    for (let y = -1000; y < 1000; y+=5) {
      if (
        Math.sqrt(x * x + y * y) >= 400 &&
        Math.sqrt((x-FAC_POS_X) * (x-FAC_POS_X) + (y-FAC_POS_Y) * (y-FAC_POS_Y)) >= 400
      ) {
        boks.push(make('bok', x, y));
      }
    }
  }
  return boks;
};

module.exports = {
  getInitialState,
}
