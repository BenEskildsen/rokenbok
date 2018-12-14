'use strict';

var setControls = function setControls(store, gameRunner) {
  var canvas = document.getElementById('canvas');
  var rect = canvas.getBoundingClientRect();
  canvas.onmousedown = function (ev) {
    if (ev.button == 0) {
      // left click, 2 for right click
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;
      store.dispatch({ type: 'MOUSE_DOWN', x: x, y: y });
    }
  };

  canvas.onmouseup = function (ev) {
    if (ev.button == 0) {
      // left click, 2 for right click
      store.dispatch({ type: 'MOUSE_UP' });
    }
  };

  canvas.onmousemove = function (ev) {
    if (store.getState().view.dragging) {
      var x = ev.clientX - rect.left;
      var y = ev.clientY - rect.top;
      store.dispatch({ type: 'MOUSE_MOVE', x: x, y: y });
    }
  };

  canvas.onwheel = function (ev) {
    store.dispatch({ type: 'ZOOM', out: ev.wheelDelta < 0 ? 1 : -1 });
  };

  document.onkeydown = function (ev) {
    switch (ev.keyCode) {
      case 32:
        // space
        store.dispatch({ type: 'TOGGLE' });
        if (store.getState().running) {
          gameRunner.interval = gameRunner.start(store);
        } else {
          gameRunner.pause(gameRunner.interval);
        }
        break;
      // case 38: // up
      //   store.dispatch({type: 'ACCELERATE', player: 0});
      //   break;
      // case 37: // left
      //   store.dispatch({type: 'TURN', dir: -1, player: 0});
      //   break;
      // case 39: // right
      //   store.dispatch({type: 'TURN', dir: 1, player: 0});
      //   break;
    }
  };

  document.onkeyup = function (ev) {
    switch (ev.keyCode) {}
  };
};

module.exports = { setControls: setControls };