# Monitor add-on for Pryv lib-js

Extends Pryv's [lib-js](https://github.com/pryv/lib-js) with event driven notifications for changes on a Pryv.io account.

## Setup

This library extends the `Pryv.Connection` class with a `Pryv.Monitor` class.

### Node.js

`npm install pryv @pryv/monitor`

In you project files, load it **once only**. The Pryv javascript package will be patched with monitor capabilities.

```javascript
const Pryv = require('pryv');
require('@pryv/monitor')(Pryv);
```

### Browser

Note: `pryv-monitor.js` must be loaded **after** `pryv.js`


```html
<script src="https://api.pryv.com/lib-js/pryv.js"></script>
<script src="https://api.pryv.com/lib-js-monitor/pryv-monitor.js"></script>
```

## Usage

Once Monitor has been set up, `Pryv.Monitor` can be instanced.

- **Create a new Monitor**

  It takes two arguments

   1. an apiEndpointUrl see: [Basics - ApiEnpoint](https://api.pryv.com/reference/#api-endpoint)

      or a Pryv.Connection see: [js-lib Connection](https://github.com/pryv/lib-js#obtaining-a-pryvconnection)

  2. an eventsGetScope as per: [events.get parameters](https://api.pryv.com/reference/#get-events)

  `new Pryv.Monitor({apiEndpoint | connection}, eventsGetScope)`

- **Register event listeners for changes on the eventsGetScope**

  `Monitor` extends [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

  they are registered using `monitor.on({event}, {callback})`

  **The monitor emits following events:**

  - `event`: on every **new** Pryv event and **change** on a Pryv event. 

    callback argument: the Pryv event

  - `eventDeleted`: on Pryv event deletion

    callback argument: `{id: "...."}` the id of the deleted Pryv event. 

  - `streams`: on change (new, deletion, update) in the Pryv stream structure.

    callback argument: `{streams: ...}` as per [API: streams.get](https://api.pryv.com/reference/#get-streams) 

  - `error`: on error
    callback argument: The error or an error message.

  - `ready`: Emitted when the monitor is ready. (For internal and UpdateMethod usage)

  - `stop`: When the monitor stops.

- **Start monitoring:** `await monitor.start()` 

  When starting, the monitor will fetch entire dataset covered by the `eventsGetScope` and trigger the changes event accordingly.

- **Trigger events update:** `await monitor.updateEvents()`

  This will push a request to update Pryv events into task stack. It will be activated as soon as the monitor has finalized eventual pending tasks.

- **Trigger streams update: **`await monitor.updateStreams()`

  This will push a request to update Pryv streams into task stack. It will be activated as soon as the monitor has finalized eventual pending tasks.

- **Add an autoupdate method:** `monitor.addUpdateMethod({UpdateMethod})`

  Update methods can be triggered automatically with:

  - **EventsTimer** `new Pryv.Monitor.UpdateMethod.EventsTimer({ms})`

    This will call `monitor.updateEvents()` regularly at a rate `{ms}` in milliseconds.
    (It has no real value but for demonstrative purposes)
  
  - **Socket** `new Pryv.Monitor.UpdateMethod.Socket()` 
  
    Based on websokets, it uses [lib-js-socket.io](https://github.com/pryv/lib-js-socket.io) to relay notification from Pryv.io to the monitor.
  
  - **Custom** 
    You can design your own UpdateMethod by extending [UpdateMethod](https://github.com/pryv/lib-js-monitor/blob/master/src/UpdateMethod/UpdateMethod.js) class.
  
- **Stop monitoring:** `monitor.stop()`

  The monitor will stop auto updaters and will throw errors if `updateEvents` or `updateStreams` is called.

  A monitor can be restarted.

## Example


```javascript
const apiEndpoint = 'https://ck6bwmcar00041ep87c8ujf90@drtom.pryv.me';

// reduce the eventsGetScope of the monitor to the stream: diary
const eventsGetScope = {'streamIds': [diary]};

// refresh the monitor using the 'timer' method with a refreshrate of 5 seconds

const monitor = new Pryv.Monitor(apiEndpoint || connection, eventsGetScope)
	.on('event', (event) => {}) // per event - new or change
	.on('streams', (streams) => {}) // all streams structure
	.on('eventDelete', (event) => {}) // an event needs to be deleted
	.addUpdateMethod(new Pryv.Monitor.UpdateMethod.EventsTimer(1000)); // add refresh timer

(async () => {
  await monitor.start(); // start the monitor
}())
```

Chain (async) `.start()`

```javascript
(async () => { 
	const monitor = await (new Pryv.Monitor(apiEndpoint || connection, eventsGetScope)
		.on('event', (event) => {})))
		.start();
})();
```

### Auto-update with web sockets

#### Node.js

```javascript
const Pryv = require('pryv');
require('@pryv/socket.io')(Pryv);
require('../src/')(Pryv);

const apiEndpoint = 'https://ck60yn9yv00011hd3vu1ocpi7@jslibtest.pryv.me';
(async () => { 
	const monitor = await (new Pryv.Monitor(apiEndpoint || connection, eventsGetScope)
		.on('event', (event) => {}))
		.addUpdateMethod(new Pryv.Monitor.UpdateMethod.Socket())
	).start();
})();
```

#### Browser

```html
<script src="https://api.pryv.com/lib-js/pryv.js"></script>
<script src="https://api.pryv.com/lib-js-socket.io/pryv-socket.io.js"></script>
<script src="https://api.pryv.com/lib-js-monitor/pryv-monitor.js"></script>

<script>
const apiEndpoint = 'https://ck60yn9yv00011hd3vu1ocpi7@jslibtest.pryv.me';
(async () => { 
	const monitor = await (new Pryv.Monitor(apiEndpoint || connection, eventsGetScope)
		.on('event', (event) => {}))
		.addUpdateMethod(new Pryv.Monitor.UpdateMethod.Socket())
	).start();
})();
</script>
```

#### Others distributions for browsers:

- ES6: `https://api.pryv.com/lib-js-monitor/pryv-monitor-es6.js` 
- Socket.io + Monitor + Lib-js: `https://api.pryv.com/lib-js/pryv-socket.io-monitor.js`. 

### Example web app

![Screenshot](https://raw.githubusercontent.com/pryv/lib-js-monitor/master/examples/screenshot.png)

The `./examples/index.html` file is a simple demo app that allows loging in a Pryv.io platform, register to events changes and create notes. 

It can be tested on [http://pryv.github.io/lib-js-monitor](http://pryv.github.io/lib-js-monitor) 

## Contribute

*Prerequisites*: Node 12

- Setup: `npm run setup`
- Build pryv.js library for browsers: `npm run build`, the result is published in `./dist`
- Node Tests: `npm run test`

## Know limitations

- If an event's update makes it "out of eventsGetScope". For example an (in eventsGetScope) event streamIds[] property is "moved" to a streamId not convered by the eventsGetScope. Current Pryv.io API does not provide the necessary snchronization mechanism to detect such change.
