const EventEmitter = require('events');

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
    this.updateMethod = _checkOptions(this);
    if (typeof scope.fromTime === 'undefined') scope.fromTime = - Number.MAX_VALUE;
    if (typeof scope.toTime === 'undefined') scope.toTime = Number.MAX_VALUE;
    if (typeof scope.modifiedSince === 'undefined') scope.modifiedSince = - Number.MAX_VALUE;
    this.scope = scope;
    this.lastSync = - Number.MAX_VALUE;
    
    if (typeof apiEndpointOrConnection === 'Connection') {
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
    await _updateEvents(this, this.scope);
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
    if (this.states.updatingEvents) {
      this.states.updateEventRequired = true;
      return;
    }
    this.states.updatingEvents = true;


    const scope = {
      fromTime: - Number.MAX_VALUE,
      toTime: Number.MAX_VALUE,
      includeDeletions: true,
      state: 'all',
      modifiedSince: this.scope.modifiedSince
    }
    await _updateEvents(this, scope);
    this.scope.modifiedSince = scope.modifiedSince;

    this.states.updatingEvents = false;
    if (this.states.updateEventRequired) { // if another event update is required
      setTimeout(function () {
        this.updateEvents;
      }.bind(this), 1);
    } else {
      this.updateMethod.ready();
    }
  }

  /**
   * Stop monitoring (no event will be fired anymore)
   */
  stop() {

  }

}

async function _updateStreams(monitor) {
  try {
    const result = await monitor.connection.get('streams');
    if (! result.streams) { throw new Error('Invalid response ' + JSON.streams(result))}
    monitor.emit(Changes.STREAMS, result.streams);
  } catch (e) {
    monitor.emit(Changes.ERROR, e);
  }
}

async function _updateEvents(monitor, scope) {
  function forEachEvent(event) {
    if (event.modified > scope.modifiedSince) {
      scope.modifiedSince = event.modified;
    }
    if (event.deleted) {
      if (event.deleted > scope.modifiedSince) {
        scope.modifiedSince = event.deleted;
      }
      monitor.emit(Changes.EVENT_DELETE, event);
    } else {
      monitor.emit(Changes.EVENT, event);
    }
  }
  try {
    await monitor.connection.getEventsStreamed(scope, forEachEvent);
  } catch (e) {
    monitor.emit(Changes.ERROR, e);
  }
}

function _checkOptions(monitor) {
  const updateMethod = { 
    ready: async () => {},
    stop: async () => {},
  }
  switch (monitor.options.method) {
    case 'none':
      break;
    case 'timer':
      if (! monitor.options.ms || isNaN(monitor.options.ms) || monitor.options.ms < 1) {
        throw new Error('Monitor timer refresh rate is not valid. It should be a number > 1');
      }
      updateMethod.ready = async () => { 
        setTimeout(() => { monitor.updateEvents() } , monitor.options.ms);
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

/**
 * @typedef Pryv.Monitor.Changes
 * @property {string} EVENT "event" fired on new or changed event
 * @property {string} EVENT_DELETE "eventDelete"
 * @property {string} STREAMS "streams"
 * @property {string} ERROR "error"
 */

/** 
 * Enum trigger messages 
 * @readonly
 * @enum {Changes}
 */
const Changes = {
  EVENT: 'event',
  EVENT_DELETE: 'eventDelete',
  STREAMS: 'streams',
  ERROR: 'error'
};

/**
 * A scope corresponding to EventGetParameters @see https://l.rec.la:4443/reference#get-events
 * Property `limit` cannot be specified;
 * @typedef {Object} Pryv.Monitor.Scope
 * @property {timestamp} [fromTime=TIMERANGE_MIN] (in seconds)
 * @property {timestamp} [toTime=TIMERANGE_MAX] (in seconds)
 * @property {string[]} [streams] - array of streamIds
 * @property {string[]} [tags] - array of tags
 * @property {string[]} [types] - array of EventTypes
 * @property {boolean} [running] 
 * @property {boolean} [sortAscending] - If true, events will be sorted from oldest to newest. ! with monitors, this will only determine the way monitor will receive events on each update. The order they will be notified to listener cannot be guranted. 
 * @property {('default'|'trashed'|'all')} [state] 
 * @property {boolean} [includeDeletions]
 * @property {timestamp} modifiedSince - (in seconds) only events modified after this date
 */

function inScope(scope, event) {
  if (event.time < scope.fromTime) return false;
  if (event.time > scope.toTime) return false;
  // TODO Check if event goes outside of Stream Scope (based on stream stucture)
  // TODO Check if event changed type and is outside of Scope
  // TODO Check if event changed tag and is outside of Scope
  // TODO Check if event is trashed and is outside of Scope
  return true;
}

Monitor.Changes = Changes;

module.exports = Monitor;