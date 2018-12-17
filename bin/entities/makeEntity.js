"use strict";

var make = function make(type, x, y) {
  return {
    x: x, y: y,
    speed: 0, accel: 0,
    carrying: [],
    collected: 0, // for the factory
    selected: false,
    theta: Math.PI,
    prevTheta: Math.PI,
    thetaSpeed: 0,
    type: type,
    prevX: x,
    prevY: y
  };
};

module.exports = {
  make: make
};