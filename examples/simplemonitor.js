const Pryv = require('pryv');
const Monitor = require('../src/Monitor');
Monitor.Pryv = Pryv;

const apiEndpoint = 'https://ck60yn9yv00011hd3vu1ocpi7@jslibtest.pryv.me';


const monitor = new Monitor(apiEndpoint, {limit: 20}, {method: 'timer', ms: 1000})
  .on(Monitor.Changes.EVENT_DELETE, function (event) {
    console.log('Delete event', event);
  })
  .on(Monitor.Changes.EVENT, function (event) {
    console.log('New event', event);
  })
  .on(Monitor.Changes.STREAMS, function (streams) {
    console.log('New streams', streams);
  });

monitor.start();
