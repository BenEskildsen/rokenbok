
const recordReducer = (state, action) => {
  const selEntity = state.entities.filter(e => e.selected)[0];
  switch (action.type) {
    case 'RECORD':
      selEntity.recording.tick = 0;
      selEntity.recording.actions = {};
      selEntity.recording.recording = true;
      break;
    case 'STOP':
      selEntity.recording.recording = false;
      selEntity.recording.playing = false;
      selEntity.recording.endTick = selEntity.recording.tick;
      selEntity.recording.tick = 0;
      break;
    case 'PLAY':
      selEntity.recording.recording = false;
      selEntity.recording.playing = true;
      selEntity.recording.tick = 0;
      break;
  }
  return state;
};

module.exports = {recordReducer};
