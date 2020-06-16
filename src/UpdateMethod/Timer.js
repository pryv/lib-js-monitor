const UpdateMethod = require('./UpdateMethod');

class Timer extends UpdateMethod {
  /**
   * 
   * @param {Pryv.Monitor} monitor 
   * @param {Number} updateRateMS - the refresh rate in milliseconds
   */
  constructor(monitor, updateRateMS) {
    super(monitor);
    if (!updateRateMS || isNaN(updateRateMS) || updateRateMS < 1) {
      throw new Error('Monitor timer refresh rate is not valid. It should be a number > 1');
    }
    this.updateRateMS = updateRateMS;
  }

  async ready () {
    setTimeout(() => { this.monitor.updateEvents() }, this.updateRateMS);
  }
}


module.exports = Timer;