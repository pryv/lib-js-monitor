const UpdateMethod = require('./UpdateMethod');
const Changes = require('../lib/Changes');

class Socket extends UpdateMethod {

  constructor(monitor) {
    super(monitor);
    if (!Pryv.Connection.SocketIO) {
      throw new Error('You should load package @pryv/socket.io to use monitor with websockets');
    }
  }

  async ready() {
    if (monitor.socket) return;
    this.socket = await monitor.connection.socket.open();
    this.socket.on('eventsUpdate', () => { monitor.updateEvents(); });
    this.socket.on('streamsUpdate', () => { monitor.updateStreams(); });
    this.socket.on('error', (error) => { monitor.emit(Changes.ERROR.error); });
  };

  async stop () {
    if (!this.socket) return;
    try { this.socket.close(); } catch (e) { }
    this.socket = null;
  }

}


module.exports = Socket;