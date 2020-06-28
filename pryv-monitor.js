!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e){t.exports={EVENT:"event",EVENT_DELETE:"eventDelete",STREAMS:"streams",ERROR:"error",READY:"ready",STOP:"stop"}},function(t,e,n){function r(t,e,n,r,o,i,s){try{var u=t[i](s),a=u.value}catch(t){return void n(t)}u.done?e(a):Promise.resolve(a).then(r,o)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(o,i){var s=t.apply(e,n);function u(t){r(s,o,i,u,a,"next",t)}function a(t){r(s,o,i,u,a,"throw",t)}u(void 0)}))}}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var s=n(0),u=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,n,r,u,a;return e=t,(n=[{key:"setMonitor",value:function(t){if(this.monitor)throw new Error("An update Method can be assigned to one monitor only");this.monitor=t,t.on(s.READY,this.ready.bind(this)),t.on(s.STOP,this.stop.bind(this)),t.started&&this.ready()}},{key:"ready",value:(a=o(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)}))),function(){return a.apply(this,arguments)})},{key:"stop",value:(u=o(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)}))),function(){return u.apply(this,arguments)})}])&&i(e.prototype,n),r&&i(e,r),t}();t.exports=u},function(t,e,n){var r=n(3);!function(){if(null==Pryv)throw'"Pryv" is not accessible, add <script src="https://api.pryv.com/lib-js/pryv.js"><\/script> in your html file, before pryv-monitor.js';r(Pryv)}()},function(t,e,n){var r=n(4),o=n(0);r.Changes=o,t.exports=function(t){if(console.log("Pryv version",t.version),t.Monitor)throw new Error("Monitor already loaded");return t.Monitor=r,r.Pryv=t,r}},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e,n,r,o,i,s){try{var u=t[i](s),a=u.value}catch(t){return void n(t)}u.done?e(a):Promise.resolve(a).then(r,o)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(r,i){var s=t.apply(e,n);function u(t){o(s,r,i,u,a,"next",t)}function a(t){o(s,r,i,u,a,"throw",t)}u(void 0)}))}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function a(t,e){return(a=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function c(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=p(t);if(e){var o=p(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return f(this,n)}}function f(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var l=n(5),h=n(6),v=n(9),y=n(10),d=n(0),m=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&a(t,e)}(h,t);var e,n,r,o,f,p,l=c(h);function h(t){var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(s(this,h),e=l.call(this),!h.Pryv)throw new Error("package '@pryv/monitor' must loaded after package 'pryv'");return e.eventsGetScope={fromTime:-Number.MAX_VALUE,toTime:Number.MAX_VALUE,modifiedSince:-Number.MAX_VALUE},Object.assign(e.eventsGetScope,n),t instanceof h.Pryv.Connection?e.connection=t:e.connection=new h.Pryv.Connection(t),e.states={started:!1,starting:!1,updatingEvents:!1,updatingStreams:!1},e}return e=h,(n=[{key:"start",value:(p=i(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.states.started&&!this.states.starting){t.next=2;break}return t.abrupt("return",this);case 2:return this.states.starting=!0,t.next=5,y(this);case 5:return t.next=7,v(this);case 7:return this.eventsGetScope.includeDeletions=!0,this.eventsGetScope.state="all",this.states.starting=!1,this.states.started=!0,this.ready(),t.abrupt("return",this);case 13:case"end":return t.stop()}}),t,this)}))),function(){return p.apply(this,arguments)})},{key:"updateEvents",value:(f=i(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.states.started){t.next=2;break}throw new Error("Start Monitor before calling update Events");case 2:if(!this.states.updatingEvents){t.next=5;break}return this.states.updateEventRequired=!0,t.abrupt("return",this);case 5:return this.states.updatingEvents=!0,t.prev=6,this.states.updateEventRequired=!1,t.next=10,v(this);case 10:t.next=15;break;case 12:t.prev=12,t.t0=t.catch(6),this.emit(d.ERROR,t.t0);case 15:return this.states.updatingEvents=!1,this.states.updateEventRequired?setTimeout(function(){this.updateEvents()}.bind(this),1):this.ready(),t.abrupt("return",this);case 18:case"end":return t.stop()}}),t,this,[[6,12]])}))),function(){return f.apply(this,arguments)})},{key:"updateStreams",value:(o=i(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.states.started){t.next=2;break}throw new Error("Start Monitor before calling update Streams");case 2:if(!this.states.updatingStreams){t.next=5;break}return this.states.updateStreamsRequired=!0,t.abrupt("return",this);case 5:return this.states.updatingStreams=!0,t.prev=6,this.states.updateStreamsRequired=!1,t.next=10,y(this);case 10:t.next=15;break;case 12:t.prev=12,t.t0=t.catch(6),this.emit(d.ERROR,t.t0);case 15:return this.states.updatingStreams=!1,this.states.updateStreamsRequired?setTimeout(function(){this.updateStreams()}.bind(this),1):this.ready(),t.abrupt("return",this);case 18:case"end":return t.stop()}}),t,this,[[6,12]])}))),function(){return o.apply(this,arguments)})},{key:"ready",value:function(){this.states.started&&this.emit(d.READY)}},{key:"stop",value:function(){if(!this.states.started)return this;if(this.states.starting)throw new Error("Process is starting, wait for the end of initialization to stop it");return this.emit(d.STOP),this.states.started=!1,this}},{key:"addUpdateMethod",value:function(t){return t.setMonitor(this),this}},{key:"started",get:function(){return this.states.started}}])&&u(e.prototype,n),r&&u(e,r),h}(l);m.UpdateMethod=h,t.exports=m},function(t,e,n){"use strict";var r,o="object"==typeof Reflect?Reflect:null,i=o&&"function"==typeof o.apply?o.apply:function(t,e,n){return Function.prototype.apply.call(t,e,n)};r=o&&"function"==typeof o.ownKeys?o.ownKeys:Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.getOwnPropertyNames(t)};var s=Number.isNaN||function(t){return t!=t};function u(){u.init.call(this)}t.exports=u,u.EventEmitter=u,u.prototype._events=void 0,u.prototype._eventsCount=0,u.prototype._maxListeners=void 0;var a=10;function c(t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t)}function f(t){return void 0===t._maxListeners?u.defaultMaxListeners:t._maxListeners}function p(t,e,n,r){var o,i,s,u;if(c(n),void 0===(i=t._events)?(i=t._events=Object.create(null),t._eventsCount=0):(void 0!==i.newListener&&(t.emit("newListener",e,n.listener?n.listener:n),i=t._events),s=i[e]),void 0===s)s=i[e]=n,++t._eventsCount;else if("function"==typeof s?s=i[e]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),(o=f(t))>0&&s.length>o&&!s.warned){s.warned=!0;var a=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");a.name="MaxListenersExceededWarning",a.emitter=t,a.type=e,a.count=s.length,u=a,console&&console.warn&&console.warn(u)}return t}function l(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function h(t,e,n){var r={fired:!1,wrapFn:void 0,target:t,type:e,listener:n},o=l.bind(r);return o.listener=n,r.wrapFn=o,o}function v(t,e,n){var r=t._events;if(void 0===r)return[];var o=r[e];return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?function(t){for(var e=new Array(t.length),n=0;n<e.length;++n)e[n]=t[n].listener||t[n];return e}(o):d(o,o.length)}function y(t){var e=this._events;if(void 0!==e){var n=e[t];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function d(t,e){for(var n=new Array(e),r=0;r<e;++r)n[r]=t[r];return n}Object.defineProperty(u,"defaultMaxListeners",{enumerable:!0,get:function(){return a},set:function(t){if("number"!=typeof t||t<0||s(t))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");a=t}}),u.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},u.prototype.setMaxListeners=function(t){if("number"!=typeof t||t<0||s(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this},u.prototype.getMaxListeners=function(){return f(this)},u.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e.push(arguments[n]);var r="error"===t,o=this._events;if(void 0!==o)r=r&&void 0===o.error;else if(!r)return!1;if(r){var s;if(e.length>0&&(s=e[0]),s instanceof Error)throw s;var u=new Error("Unhandled error."+(s?" ("+s.message+")":""));throw u.context=s,u}var a=o[t];if(void 0===a)return!1;if("function"==typeof a)i(a,this,e);else{var c=a.length,f=d(a,c);for(n=0;n<c;++n)i(f[n],this,e)}return!0},u.prototype.addListener=function(t,e){return p(this,t,e,!1)},u.prototype.on=u.prototype.addListener,u.prototype.prependListener=function(t,e){return p(this,t,e,!0)},u.prototype.once=function(t,e){return c(e),this.on(t,h(this,t,e)),this},u.prototype.prependOnceListener=function(t,e){return c(e),this.prependListener(t,h(this,t,e)),this},u.prototype.removeListener=function(t,e){var n,r,o,i,s;if(c(e),void 0===(r=this._events))return this;if(void 0===(n=r[t]))return this;if(n===e||n.listener===e)0==--this._eventsCount?this._events=Object.create(null):(delete r[t],r.removeListener&&this.emit("removeListener",t,n.listener||e));else if("function"!=typeof n){for(o=-1,i=n.length-1;i>=0;i--)if(n[i]===e||n[i].listener===e){s=n[i].listener,o=i;break}if(o<0)return this;0===o?n.shift():function(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}(n,o),1===n.length&&(r[t]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",t,s||e)}return this},u.prototype.off=u.prototype.removeListener,u.prototype.removeAllListeners=function(t){var e,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[t]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[t]),this;if(0===arguments.length){var o,i=Object.keys(n);for(r=0;r<i.length;++r)"removeListener"!==(o=i[r])&&this.removeAllListeners(o);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(e=n[t]))this.removeListener(t,e);else if(void 0!==e)for(r=e.length-1;r>=0;r--)this.removeListener(t,e[r]);return this},u.prototype.listeners=function(t){return v(this,t,!0)},u.prototype.rawListeners=function(t){return v(this,t,!1)},u.listenerCount=function(t,e){return"function"==typeof t.listenerCount?t.listenerCount(e):y.call(t,e)},u.prototype.listenerCount=y,u.prototype.eventNames=function(){return this._eventsCount>0?r(this._events):[]}},function(t,e,n){t.exports={Null:n(1),Socket:n(7),EventsTimer:n(8)}},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e,n,r,o,i,s){try{var u=t[i](s),a=u.value}catch(t){return void n(t)}u.done?e(a):Promise.resolve(a).then(r,o)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(r,i){var s=t.apply(e,n);function u(t){o(s,r,i,u,a,"next",t)}function a(t){o(s,r,i,u,a,"throw",t)}u(void 0)}))}}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=f(t);if(e){var o=f(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}function c(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function f(t){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var p=n(1),l=n(0),h=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}(p,t);var e,n,r,o,c,f=a(p);function p(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,p),f.call(this)}return e=p,(n=[{key:"ready",value:(c=i(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.socket){t.next=2;break}return t.abrupt("return");case 2:if(this.monitor.connection.socket){t.next=4;break}throw new Error("You should load package @pryv/socket.io to use monitor with websockets");case 4:return t.next=6,this.monitor.connection.socket.open();case 6:this.socket=t.sent,this.socket.on("eventsChanged",(function(){e.monitor.updateEvents()})),this.socket.on("streamsChanged",(function(){e.monitor.updateStreams()})),this.socket.on("error",(function(t){e.monitor.emit(l.ERROR.error)}));case 10:case"end":return t.stop()}}),t,this)}))),function(){return c.apply(this,arguments)})},{key:"stop",value:(o=i(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.socket){t.next=2;break}return t.abrupt("return");case 2:try{this.socket.close()}catch(t){}this.socket=null;case 4:case"end":return t.stop()}}),t,this)}))),function(){return o.apply(this,arguments)})}])&&s(e.prototype,n),r&&s(e,r),p}(p);t.exports=h},function(t,e,n){function r(t){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t,e,n,r,o,i,s){try{var u=t[i](s),a=u.value}catch(t){return void n(t)}u.done?e(a):Promise.resolve(a).then(r,o)}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function s(t,e){return(s=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function u(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=c(t);if(e){var o=c(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return a(this,n)}}function a(t,e){return!e||"object"!==r(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var f=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&s(t,e)}(p,t);var e,n,r,a,c,f=u(p);function p(t){var e;if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,p),(e=f.call(this)).timer=null,!t||isNaN(t)||t<1)throw new Error("Monitor timer refresh rate is not valid. It should be a number > 1");return e.updateRateMS=t,e}return e=p,(n=[{key:"ready",value:(a=regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:null!=this.timer&&clearTimeout(this.timer),this.timer=setTimeout((function(){e.monitor.started&&e.monitor.updateEvents()}),this.updateRateMS);case 2:case"end":return t.stop()}}),t,this)})),c=function(){var t=this,e=arguments;return new Promise((function(n,r){var i=a.apply(t,e);function s(t){o(i,n,r,s,u,"next",t)}function u(t){o(i,n,r,s,u,"throw",t)}s(void 0)}))},function(){return c.apply(this,arguments)})}])&&i(e.prototype,n),r&&i(e,r),p}(n(1));t.exports=f},function(t,e,n){function r(t,e,n,r,o,i,s){try{var u=t[i](s),a=u.value}catch(t){return void n(t)}u.done?e(a):Promise.resolve(a).then(r,o)}var o=n(0);t.exports=function(){var t,e=(t=regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=function(t){t.modified>e.eventsGetScope.modifiedSince&&(e.eventsGetScope.modifiedSince=t.modified),t.deleted?(t.deleted>e.eventsGetScope.modifiedSince&&(e.eventsGetScope.modifiedSince=t.deleted),e.emit(o.EVENT_DELETE,t)):e.emit(o.EVENT,t)},t.prev=1,t.next=4,e.connection.getEventsStreamed(e.eventsGetScope,n);case 4:t.next=9;break;case 6:t.prev=6,t.t0=t.catch(1),e.emit(o.ERROR,t.t0);case 9:case"end":return t.stop()}}),t,null,[[1,6]])})),function(){var e=this,n=arguments;return new Promise((function(o,i){var s=t.apply(e,n);function u(t){r(s,o,i,u,a,"next",t)}function a(t){r(s,o,i,u,a,"throw",t)}u(void 0)}))});return function(t){return e.apply(this,arguments)}}()},function(t,e,n){function r(t,e,n,r,o,i,s){try{var u=t[i](s),a=u.value}catch(t){return void n(t)}u.done?e(a):Promise.resolve(a).then(r,o)}var o=n(0);t.exports=function(){var t,e=(t=regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.connection.get("streams");case 3:if((n=t.sent).streams){t.next=6;break}throw new Error("Invalid response "+JSON.streams(n));case 6:e.emit(o.STREAMS,n.streams),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),e.emit(o.ERROR,t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})),function(){var e=this,n=arguments;return new Promise((function(o,i){var s=t.apply(e,n);function u(t){r(s,o,i,u,a,"next",t)}function a(t){r(s,o,i,u,a,"throw",t)}u(void 0)}))});return function(t){return e.apply(this,arguments)}}()}]);
//# sourceMappingURL=pryv-monitor.js.map