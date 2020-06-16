# Monitor add-on for Pryv lib-js

Extends Pryv's [lib-js](https://github.com/pryv/lib-js) with event driven notifications for changes on a Pryv.io account.


```javascript
const Pryv = require('pryv');
require('@pryv/monitor')(Pryv);

const apiEndpoint = 'https://ck6bwmcar00041ep87c8ujf90@drtom.pryv.me';

// reduce the scope of the monitor to the stream: diary
const scope = {'streamIds': [diary]};

// refresh the monitor using the 'timer' method with a refreshrate of 5 seconds

const monitor = new Pryv.Monitor(apiEndpoint || connection, scope);
monitor.on('event', (event) => {}) // new or change
	.on('streams', (streams) => {}) // all streams structure
	.on('eventDelete', (event) => {}); // an event need to be deleted

monitor.start(); // start the monitor
// add an autor refresh for events every 1000 ms
new Pryv.Monitor.UpdateMethod.Timer(monitor, 1000);

```



### Know limitations

- If an event's update makes it "out of scope". For example an (in scope) event streamIds[] property is "moved" to a streamId not convered by the scope. Current Pryv.io API does not provide the necessary snchronization mechanism to detect such change.