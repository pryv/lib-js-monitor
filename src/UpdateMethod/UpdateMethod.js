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
  constructor(monitor) { 
    this.monitor = monitor;
    monitor.setUpdateMethod(this);
  }
  /**
   * Called with no params, when all update tasks are done.
   * Also used at "start" call
   */
  async ready() { }
  /**
   * Called with no params, when monitor is stoped: updater should be stoped too.
   */
  async stop() { }
}

module.exports = UpdateMethod;