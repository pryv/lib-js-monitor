const Monitor = require('./Monitor')
/**
 * Load Monitor capabilities onto Pryv
 * @param {Pryv} Pryv - Pryv lib-js library @see https://github.com/pryv/lib-js
 */
module.exports = function(Pryv) {
  console.log('Pryv version', Pryv.version);
  // check version here
  if (Pryv.Monitor) {
    throw new Error('Monitor already loaded');
  }
  // sharing cross references
  Pryv.Monitor = Monitor;
  Monitor.Pryv = Pryv;
  return Monitor;
}