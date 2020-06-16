/**
 * Interface for UpdateMonitor
 * @memberof Pryv.Monitor
 * @constructor {Monitor~UpdateMethod} updateMethod.setMonitor - set once.
 * @param {Function} updateMethod.ready - 
 * @param {Function} updateMethod.close - c
 */
class UpdateMethod {
  /**
   * 
   * @param {Monitor} monitor 
   */
  constructor(monitor) { 
    this.monitor = monitor;
    monitor.setUpdateMethod(this);
  }
  /**
   * Called with no params, when all update tasks are done.
   */
  async ready() { }
  /**
   * Called with no params, when monitor is closed: updater should be closed too.
   */
  async stop() { }
}

module.exports = UpdateMethod;