(()=>{var t={187:t=>{"use strict";var e,n="object"==typeof Reflect?Reflect:null,r=n&&"function"==typeof n.apply?n.apply:function(t,e,n){return Function.prototype.apply.call(t,e,n)};e=n&&"function"==typeof n.ownKeys?n.ownKeys:Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.getOwnPropertyNames(t)};var s=Number.isNaN||function(t){return t!=t};function i(){i.init.call(this)}t.exports=i,t.exports.once=function(t,e){return new Promise((function(n,r){function s(n){t.removeListener(e,i),r(n)}function i(){"function"==typeof t.removeListener&&t.removeListener("error",s),n([].slice.call(arguments))}l(t,e,i,{once:!0}),"error"!==e&&function(t,e,n){"function"==typeof t.on&&l(t,"error",e,{once:!0})}(t,s)}))},i.EventEmitter=i,i.prototype._events=void 0,i.prototype._eventsCount=0,i.prototype._maxListeners=void 0;var o=10;function a(t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t)}function u(t){return void 0===t._maxListeners?i.defaultMaxListeners:t._maxListeners}function c(t,e,n,r){var s,i,o,c;if(a(n),void 0===(i=t._events)?(i=t._events=Object.create(null),t._eventsCount=0):(void 0!==i.newListener&&(t.emit("newListener",e,n.listener?n.listener:n),i=t._events),o=i[e]),void 0===o)o=i[e]=n,++t._eventsCount;else if("function"==typeof o?o=i[e]=r?[n,o]:[o,n]:r?o.unshift(n):o.push(n),(s=u(t))>0&&o.length>s&&!o.warned){o.warned=!0;var h=new Error("Possible EventEmitter memory leak detected. "+o.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");h.name="MaxListenersExceededWarning",h.emitter=t,h.type=e,h.count=o.length,c=h,console&&console.warn&&console.warn(c)}return t}function h(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function p(t,e,n){var r={fired:!1,wrapFn:void 0,target:t,type:e,listener:n},s=h.bind(r);return s.listener=n,r.wrapFn=s,s}function f(t,e,n){var r=t._events;if(void 0===r)return[];var s=r[e];return void 0===s?[]:"function"==typeof s?n?[s.listener||s]:[s]:n?function(t){for(var e=new Array(t.length),n=0;n<e.length;++n)e[n]=t[n].listener||t[n];return e}(s):v(s,s.length)}function d(t){var e=this._events;if(void 0!==e){var n=e[t];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function v(t,e){for(var n=new Array(e),r=0;r<e;++r)n[r]=t[r];return n}function l(t,e,n,r){if("function"==typeof t.on)r.once?t.once(e,n):t.on(e,n);else{if("function"!=typeof t.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof t);t.addEventListener(e,(function s(i){r.once&&t.removeEventListener(e,s),n(i)}))}}Object.defineProperty(i,"defaultMaxListeners",{enumerable:!0,get:function(){return o},set:function(t){if("number"!=typeof t||t<0||s(t))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");o=t}}),i.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},i.prototype.setMaxListeners=function(t){if("number"!=typeof t||t<0||s(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this},i.prototype.getMaxListeners=function(){return u(this)},i.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e.push(arguments[n]);var s="error"===t,i=this._events;if(void 0!==i)s=s&&void 0===i.error;else if(!s)return!1;if(s){var o;if(e.length>0&&(o=e[0]),o instanceof Error)throw o;var a=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw a.context=o,a}var u=i[t];if(void 0===u)return!1;if("function"==typeof u)r(u,this,e);else{var c=u.length,h=v(u,c);for(n=0;n<c;++n)r(h[n],this,e)}return!0},i.prototype.addListener=function(t,e){return c(this,t,e,!1)},i.prototype.on=i.prototype.addListener,i.prototype.prependListener=function(t,e){return c(this,t,e,!0)},i.prototype.once=function(t,e){return a(e),this.on(t,p(this,t,e)),this},i.prototype.prependOnceListener=function(t,e){return a(e),this.prependListener(t,p(this,t,e)),this},i.prototype.removeListener=function(t,e){var n,r,s,i,o;if(a(e),void 0===(r=this._events))return this;if(void 0===(n=r[t]))return this;if(n===e||n.listener===e)0==--this._eventsCount?this._events=Object.create(null):(delete r[t],r.removeListener&&this.emit("removeListener",t,n.listener||e));else if("function"!=typeof n){for(s=-1,i=n.length-1;i>=0;i--)if(n[i]===e||n[i].listener===e){o=n[i].listener,s=i;break}if(s<0)return this;0===s?n.shift():function(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}(n,s),1===n.length&&(r[t]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",t,o||e)}return this},i.prototype.off=i.prototype.removeListener,i.prototype.removeAllListeners=function(t){var e,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[t]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[t]),this;if(0===arguments.length){var s,i=Object.keys(n);for(r=0;r<i.length;++r)"removeListener"!==(s=i[r])&&this.removeAllListeners(s);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(e=n[t]))this.removeListener(t,e);else if(void 0!==e)for(r=e.length-1;r>=0;r--)this.removeListener(t,e[r]);return this},i.prototype.listeners=function(t){return f(this,t,!0)},i.prototype.rawListeners=function(t){return f(this,t,!1)},i.listenerCount=function(t,e){return"function"==typeof t.listenerCount?t.listenerCount(e):d.call(t,e)},i.prototype.listenerCount=d,i.prototype.eventNames=function(){return this._eventsCount>0?e(this._events):[]}},926:(t,e,n)=>{const r=n(187),s=n(348),i=n(167),o=n(479),a=n(122);class u extends r{constructor(t,e={}){if(super(),!u.Pryv)throw new Error("package '@pryv/monitor' must loaded after package 'pryv'");this.eventsGetScope={fromTime:-Number.MAX_VALUE,toTime:Number.MAX_VALUE,modifiedSince:-Number.MAX_VALUE},Object.assign(this.eventsGetScope,e),t instanceof u.Pryv.Connection?this.connection=t:this.connection=new u.Pryv.Connection(t),this.states={started:!1,starting:!1,updatingEvents:!1,updatingStreams:!1}}async start(){return this.states.started||this.states.starting||(this.states.starting=!0,await o(this),await i(this),this.eventsGetScope.includeDeletions=!0,this.eventsGetScope.state="all",this.states.starting=!1,this.states.started=!0,this.ready()),this}async updateEvents(){if(!this.states.started)throw new Error("Start Monitor before calling update Events");if(this.states.updatingEvents)return this.states.updateEventRequired=!0,this;this.states.updatingEvents=!0;try{this.states.updateEventRequired=!1,await i(this)}catch(t){this.emit(a.ERROR,t)}return this.states.updatingEvents=!1,this.states.updateEventRequired?setTimeout(function(){this.updateEvents()}.bind(this),1):this.ready(),this}async updateStreams(){if(!this.states.started)throw new Error("Start Monitor before calling update Streams");if(this.states.updatingStreams)return this.states.updateStreamsRequired=!0,this;this.states.updatingStreams=!0;try{this.states.updateStreamsRequired=!1,await o(this)}catch(t){this.emit(a.ERROR,t)}return this.states.updatingStreams=!1,this.states.updateStreamsRequired?setTimeout(function(){this.updateStreams()}.bind(this),1):this.ready(),this}ready(){this.states.started&&this.emit(a.READY)}stop(){if(!this.states.started)return this;if(this.states.starting)throw new Error("Process is starting, wait for the end of initialization to stop it");return this.emit(a.STOP),this.states.started=!1,this}get started(){return this.states.started}addUpdateMethod(t){return t.setMonitor(this),this}}u.UpdateMethod=s,t.exports=u},939:(t,e,n)=>{const r=n(580);t.exports=class extends r{constructor(t){if(super(),this.timer=null,!t||isNaN(t)||t<1)throw new Error("Monitor timer refresh rate is not valid. It should be a number > 1");this.updateRateMS=t}async ready(){null!=this.timer&&clearTimeout(this.timer),this.timer=setTimeout((()=>{this.monitor.started&&this.monitor.updateEvents()}),this.updateRateMS)}}},624:(t,e,n)=>{const r=n(580),s=n(122);t.exports=class extends r{constructor(){super()}async ready(){if(!this.socket){if(!this.monitor.connection.socket)throw new Error("You should load package @pryv/socket.io to use monitor with websockets");this.socket=await this.monitor.connection.socket.open(),this.socket.on("eventsChanged",(()=>{this.monitor.updateEvents()})),this.socket.on("streamsChanged",(()=>{this.monitor.updateStreams()})),this.socket.on("error",(t=>{this.monitor.emit(s.ERROR.error)}))}}async stop(){if(this.socket){try{this.socket.close()}catch(t){}this.socket=null}}}},580:(t,e,n)=>{const r=n(122);t.exports=class{setMonitor(t){if(this.monitor)throw new Error("An update Method can be assigned to one monitor only");this.monitor=t,t.on(r.READY,this.ready.bind(this)),t.on(r.STOP,this.stop.bind(this)),t.started&&this.ready()}async ready(){}async stop(){}}},348:(t,e,n)=>{t.exports={Null:n(580),Socket:n(624),EventsTimer:n(939)}},138:(t,e,n)=>{const r=n(926),s=n(122);r.Changes=s,t.exports=function(t){if(console.log("Pryv version",t.version),t.Monitor)throw new Error("Monitor already loaded");return t.Monitor=r,r.Pryv=t,r}},122:t=>{t.exports={EVENT:"event",EVENT_DELETE:"eventDelete",STREAMS:"streams",ERROR:"error",READY:"ready",STOP:"stop"}},167:(t,e,n)=>{const r=n(122);t.exports=async function(t){try{await t.connection.getEventsStreamed(t.eventsGetScope,(function(e){e.modified>t.eventsGetScope.modifiedSince&&(t.eventsGetScope.modifiedSince=e.modified),e.deleted?(e.deleted>t.eventsGetScope.modifiedSince&&(t.eventsGetScope.modifiedSince=e.deleted),t.emit(r.EVENT_DELETE,e)):t.emit(r.EVENT,e)}))}catch(e){t.emit(r.ERROR,e)}}},479:(t,e,n)=>{const r=n(122);t.exports=async function(t){try{const e=await t.connection.get("streams");if(!e.streams)throw new Error("Invalid response "+JSON.streams(e));t.emit(r.STREAMS,e.streams)}catch(e){t.emit(r.ERROR,e)}}}},e={};function n(r){var s=e[r];if(void 0!==s)return s.exports;var i=e[r]={exports:{}};return t[r](i,i.exports,n),i.exports}(()=>{const t=n(138);!function(){if(null==Pryv)throw'"Pryv" is not accessible, add <script src="https://api.pryv.com/lib-js/pryv.js"><\/script> in your html file, before pryv-monitor.js';t(Pryv)}()})()})();
//# sourceMappingURL=pryv-monitor-es6.js.map