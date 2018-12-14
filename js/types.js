// @flow

export type Entity = {
  type: 'bok' | 'truck' | 'miner' | 'factory';
  carrying: Array<Entity>;
  x: number,
  y: number,
  speed: number,
  accel: number,
  theta: number,
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
  },
};
