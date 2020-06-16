const EventEmitter = require('events');
const UpdateMethod = require('./UpdateMethod/');
const _updateEvents = require('./lib/updateEvents');
const _updateStreams = require('./lib/updateStreams');

/**
 * @memberof Pryv
 */
class Monitor extends EventEmitter {
  /**
   * 
   * @param {(Pryv.PryvApiEndpoint|Pryv.Connection)} apiEndpointOrConnection ApiEnpoint or connection to use. 
   * @param {Pryv.Monitor.Scope} [scope={}] The Scope to monitor
   */
  constructor(apiEndpointOrConnection, scope = {}) {
    super();
    if (!Monitor.Pryv) {
      throw new Error('package \'@pryv/monitor\' must loaded after package \'pryv\'');
    }

    this.scope = { // default scope values
      fromTime: - Number.MAX_VALUE,
      toTime: Number.MAX_VALUE,
      modifiedSince: - Number.MAX_VALUE
    }
    Object.assign(this.scope, scope);

    if (apiEndpointOrConnection instanceof Monitor.Pryv.Connection) {
      this.connection = apiEndpointOrConnection;
    } else {
      this.connection = new Monitor.Pryv.Connection(apiEndpointOrConnection);
    }
    this.states = {
      started: false,
      starting: false, // in phase of initializing
      updatingEvents: false, // semaphore to prevent updating events in parallel
      updatingStreams: false, // semaphore to prevent updating streams in parallel
    };
    //new UpdateMethod.Null(this);
    this.setUpdateMethod(null);
  }

  /**
   * Start the monitor
   * @returns {Monitor} this
   */
  async start() {
    if (this.states.started || this.states.starting) return this;
    this.states.starting = true;
    await _updateStreams(this);
    await _updateEvents(this);
    // once initialized we for the scope to request also deletions 
    this.scope.includeDeletions = true;
    this.scope.state = 'all';

    this.states.starting = false;
    this.states.started = true;
    if (this.updateMethod)
      this.updateMethod.ready();
    return this;
  }

  /**
   * request and update of events
   * @returns {Monitor} this
   */
  async updateEvents() {
    if (!this.states.started) {
      throw new Error('Start Monitor before calling update Events');
    }
    if (this.states.updatingEvents) { // semaphore
      this.states.updateEventRequired = true;
      return this;
    }

    this.states.updatingEvents = true;
    await _updateEvents(this);
    this.states.updatingEvents = false;

    if (this.states.updateEventRequired) { // if another event update is required
      setTimeout(function () {
        this.updateEvents;
      }.bind(this), 1);
    } else {
      if (this.states.started && this.updateMethod) // it might be stoped 
        this.updateMethod.ready(); // tell the update method that we are ready
    }
    return this;
  }


  /**
   * Stop monitoring (no event will be fired anymore)
   * @returns {Monitor} this
   */
  stop() {
    if (!this.states.started) return this;
    if (this.states.starting) throw new Error('Process is starting, wait for the end of initialization to stop it');
    if (this.updateMethod)
      this.updateMethod.stop();
    this.states.started = false;
    return this;
  }

  /**
   * Initialize the updateMethod with this Monitor
   * @callback Monitor~UpdateMethod
   * @param {Monitor} setMonitor 
   */

  /**
   * @private
   * Called my UpdateMethod to share cross references
   * Set a custom update method
   * @param {Monitor~UpdateMethod} updateMethod - the auto-update method
   */
  setUpdateMethod(updateMethod) {
    if (this.updateMethod) {
      try { this.updateMethod.stop(); } catch (e) { };
      this.updateMethod = null;
    }
    this.updateMethod = updateMethod;
    if (updateMethod === null) return;
    if (this.states.started) this.ready();
  }

}

Monitor.UpdateMethod = UpdateMethod;
module.exports = Monitor;