'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var viewReducer = function viewReducer(state, action) {
  switch (action.type) {
    case 'ZOOM':
      return _extends({}, state, {
        view: _extends({}, state.view, {
          width: state.view.width + 12 * action.out,
          height: state.view.height + 9 * action.out,
          shouldRender: true
        })
      });
    case 'MOUSE_MOVE':
      if (!state.view.dragging) {
        return state;
      }
      return _extends({}, state, {
        view: _extends({}, state.view, {
          x: state.view.x + action.x - state.view.dragStartX,
          y: state.view.y + action.y - state.view.dragStartY,
          dragStartX: action.x,
          dragStartY: action.y,
          shouldRender: true
        })
      });
    case 'MOUSE_DOWN':
      return _extends({}, state, {
        view: _extends({}, state.view, {
          dragging: true,
          dragStartX: action.x,
          dragStartY: action.y
        })
      });
    case 'MOUSE_UP':
      return _extends({}, state, {
        view: _extends({}, state.view, {
          dragging: false
        })
      });
  }
};

module.exports = {
  viewReducer: viewReducer
};