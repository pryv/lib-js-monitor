const Changes = require('../lib/Changes');
/**
 * Interface for UpdateMonitor
 * @memberof Pryv.Monitor
 * @constructor {Monitor~UpdateMethod} updateMethod.setMonitor - set once. c
 */
class UpdateMethod {
  /**
   * 
   * @param {Monitor} monitor 
   */
  setMonitor(monitor) { 
    this.monitor = monitor;
    monitor.on(Changes.READY, this.ready.bind(this));
    monitor.on(Changes.STOP, this.stop.bind(this));
    if (monitor.started) {
      this.ready();
    }
  }

  /**
   * Should be overwritten by subclases
   * Called with no params, when all update tasks are done.
   * Also used at "start" call
   */
  async ready() { }
  /**
   * Should be overwritten by subclases
   * Called with no params, when monitor is stoped: updater should be stoped too.
   */
  async stop() { }
}

module.exports = UpdateMethod;