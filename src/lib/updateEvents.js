const Changes = require('./Changes');

module.exports = async function _updateEvents(monitor) {
  function forEachEvent(event) {
    // update scope with "latest modified" information found 
    if (event.modified > monitor.scope.modifiedSince) {
      monitor.scope.modifiedSince = event.modified;
    }
    if (event.deleted) {
      // event.delete is actually the date it was deleted. 
      // use it as "modified" information 
      if (event.deleted > monitor.scope.modifiedSince) {
        monitor.scope.modifiedSince = event.deleted;
      }
      monitor.emit(Changes.EVENT_DELETE, event);
    } else {
      monitor.emit(Changes.EVENT, event);
    }
  }
  try {
    await monitor.connection.getEventsStreamed(monitor.scope, forEachEvent);
  } catch (e) {
    monitor.emit(Changes.ERROR, e);
  }
}