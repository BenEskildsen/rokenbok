// @flow

const viewReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ZOOM':
      return {
        ...state,
        view: {
          ...state.view,
          width: state.view.width + (12 * action.out),
          height: state.view.height + (9 * action.out),
        },
      };
    case 'MOUSE_MOVE':
      if (!state.view.dragging) {
        return state;
      }
      return {
        ...state,
        view: {
          ...state.view,
          x: state.view.x + action.x - state.view.dragStartX,
          y: state.view.y + action.y - state.view.dragStartY,
          dragStartX: action.x,
          dragStartY: action.y,
        },
      }
    case 'MOUSE_DOWN':
      return {
        ...state,
        view: {
          ...state.view,
          dragging: true,
          dragStartX: action.x,
          dragStartY: action.y,
        }
      };
    case 'MOUSE_UP':
      return {
        ...state,
        view: {
          ...state.view,
          dragging: false,
        }
      };
  }
};

module.exports = {
  viewReducer,
};
