// @flow

export type Entity = {
  type: 'bok' | 'truck' | 'miner' | 'factory';
  carrying: Array<Entity>;
  selected: boolean,
  x: number,
  y: number,
  speed: number,
  accel: number,
  thetaSpeed: number,
  theta: number, // radians
  prevTheta: number,
  prevX: number,
  prevY: number,
};

export type State = {
  running: boolean,
  entities: Array<Entity>,
  view: {
    width: number,
    height: number,
    x: number,
    y: number,
    dragging: boolean,
    dragStartX: number,
    dragStartY: number,
    shouldRender: boolean,
    image: Image,
  },
};
