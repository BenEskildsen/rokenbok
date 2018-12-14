'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('../entities'),
    getInitialState = _require.getInitialState;

var _require2 = require('./tickReducer'),
    tickReducer = _require2.tickReducer;

var _require3 = require('./viewReducer'),
    viewReducer = _require3.viewReducer;

var rootReducer = function rootReducer(state, action) {
  if (state === undefined) return getInitialState();

  switch (action.type) {
    case 'TOGGLE':
      return _extends({}, state, {
        running: !state.running
      });
    case 'TICK':
      return tickReducer(state, action);
    case 'ZOOM':
    case 'MOUSE_MOVE':
    case 'MOUSE_DOWN':
    case 'MOUSE_UP':
      return viewReducer(state, action);
  }
  return state;
};

module.exports = { rootReducer: rootReducer };