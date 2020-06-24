# Monitor add-on for Pryv lib-js

Extends Pryv's [lib-js](https://github.com/pryv/lib-js) with event driven notifications for changes on a Pryv.io account.

## Setup

This library extends the `Pryv.Connection` class with a `Pryv.Monitor` class.

### Node.js

`npm install pryv @pryv/monitor

In you project files, load it **one time only**. The Pryv javascript package will be patched with monitor capabilities.

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

Once Monitor has been setup, `Pryv.Monitor` can be instanced.

- Create a new Monitor

  It takes two arguments

   1. an apiEndpointUrl see: [Basics - ApiEnpoint](https://api.pryv.com/reference/#api-endpoint)

      or a Pryv.Connection see: [js-lib Connection](https://github.com/pryv/lib-js#obtaining-a-pryvconnection)

  	2. a scope as per: [events.get parameters](https://api.pryv.com/reference/#get-events)

  `new Pryv.Monitor({apiEndpoint | connection}, scope)`

  ​	

## Example


```javascript
const apiEndpoint = 'https://ck6bwmcar00041ep87c8ujf90@drtom.pryv.me';

// reduce the scope of the monitor to the stream: diary
const scope = {'streamIds': [diary]};

// refresh the monitor using the 'timer' method with a refreshrate of 5 seconds

const monitor = new Pryv.Monitor(apiEndpoint || connection, scope)
	.on('event', (event) => {}) // new or change
	.on('streams', (streams) => {}) // all streams structure
	.on('eventDelete', (event) => {}) // an event need to be deleted
	.addUpdateMethod(new Pryv.Monitor.UpdateMethod.Timer(1000)); // add refresh timer

(async () => {
  await monitor.start(); // start the monitor
}())
```

Chain (async) `.start()`

```javascript
(async () => { 
	const monitor = await (new Pryv.Monitor(apiEndpoint || connection, scope)
		.on('event', (event) => {})))
		.start();
})();
```



### Example web app

The `./examples/index.html` file is a simple demo app that allows to log in a Pryv.io platform, register to events changes and create notes. 

It can be tested on [http://pryv.github.io/lib-js-monitor](http://pryv.github.io/lib-js-monitor) 

## Contribute

*Prerequisites*: Node 12

- Setup: `npm run setup`
- Build pryv.js library for browsers: `npm run build`, the result is published in `./dist`
- Node Tests: `npm run test`

### Know limitations

- If an event's update makes it "out of scope". For example an (in scope) event streamIds[] property is "moved" to a streamId not convered by the scope. Current Pryv.io API does not provide the necessary snchronization mechanism to detect such change.