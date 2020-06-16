const Pryv = require('pryv');
require('../src/')(Pryv);

const apiEndpoint = 'https://ck60yn9yv00011hd3vu1ocpi7@jslibtest.pryv.me';


const monitor = new Pryv.Monitor(apiEndpoint, {limit: 20});
monitor.on(Pryv.Monitor.Changes.EVENT_DELETE, function (event) {
    console.log('Delete event', event);
  })
  .on(Pryv.Monitor.Changes.EVENT, function (event) {
    console.log('New event', event);
  })
  .on(Pryv.Monitor.Changes.STREAMS, function (streams) {
    console.log('New streams', streams);
  });
new Pryv.Monitor.UpdateMethod.Timer(monitor, 1000);
monitor.start();

