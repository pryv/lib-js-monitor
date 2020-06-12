const EventEmitter = require('events');
const Checks = require('./lib/Checks');
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
   * @param {Object} [options={method:'none'}]
   * @param {('timer'|'socket.io'|'none')} options.method - method to auto update the monitor. To use socket.io '@pryv/socket.io' should have been loaded.
   * @param {number} [options.ms] - time to update in milliseconds, mandatory if method is `timer` not used for others.
   */
  constructor(apiEndpointOrConnection, scope = {}, options = { method: 'none' }) {
    super();
    if (! Monitor.Pryv) {
      throw new Error('package \'@pryv/monitor\' must loaded after package \'pryv\'');
    }
    this.options = options;
    this.updateMethod = Checks.options(this);
    
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
  }

  /**
   * Start the monitor
   */
  async start() {
    if (this.states.started || this.states.starting) return;
    this.states.starting = true;
    await _updateStreams(this);
    await _updateEvents(this);
    // once initialized we for the scope to request also deletions 
    this.scope.includeDeletions = true;
    this.scope.state = 'all';

    this.states.starting = false;
    this.states.started = true;  
    this.updateMethod.ready();
  }

  /**
   * request and update of events
   */
  async updateEvents() {
    if (! this.states.started) {
      throw new Error('Start Monitor before calling update Events');
    }
    if (this.states.updatingEvents) { // semaphore
      this.states.updateEventRequired = true;
      return;
    }

    this.states.updatingEvents = true;
    await _updateEvents(this);
    this.states.updatingEvents = false;

    if (this.states.updateEventRequired) { // if another event update is required
      setTimeout(function () {
        this.updateEvents;
      }.bind(this), 1);
    } else {
      this.updateMethod.ready(); // tell the update method that we are ready
    }
  }


  /**
   * Stop monitoring (no event will be fired anymore)
   */
  stop() {
    if (! this.states.started) return;
    if (this.states.starting) throw new Error('Process is starting, wait for the end of initialization to stop it');
    this.updateMethod.stop();
    this.states.started = false;
  }

}

module.exports = Monitor;