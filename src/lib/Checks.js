function checkOptions(monitor) {
  const updateMethod = {
    ready: async () => { },
    stop: async () => { },
  }
  switch (monitor.options.method) {
    case 'none':
      break;
    case 'timer':
      if (!monitor.options.ms || isNaN(monitor.options.ms) || monitor.options.ms < 1) {
        throw new Error('Monitor timer refresh rate is not valid. It should be a number > 1');
      }
      updateMethod.ready = async () => {
        setTimeout(() => { monitor.updateEvents() }, monitor.options.ms);
      };
      break;
    case 'socket.io':
      if (!Pryv.socketio) {
        throw new Error('You should load package @pryv/socket.io to use monitor with websockets');
      }
      break;
    default:
      throw new Error('Invalid refresh method for monitors: ' + JSON.stringify(monitor.options));
      break;
  }
  return updateMethod;
}

module.exports = {
  options: checkOptions
}