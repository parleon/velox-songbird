(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Velox"] = factory();
	else
		root["Velox"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/node/channel.node.ts":
/*!**********************************!*\
  !*** ./lib/node/channel.node.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Channel = void 0;
const interfaces_node_1 = __webpack_require__(/*! ./interfaces.node */ "./lib/node/interfaces.node.ts");
class Channel {
    constructor(SNMHandler, RCMHandler, CMUHandler, RTCConfig) {
        this._SCMQueue = [];
        this._active = false;
        this._SNMHandler = SNMHandler;
        this._RCMHandler = RCMHandler;
        this._CMUHandler = CMUHandler;
        if (RTCConfig) {
            this._peerConnection = new RTCPeerConnection(RTCConfig);
        }
        else {
            this._peerConnection = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: "stun:stun.1.google.com:19302"
                    }
                ]
            });
        }
    }
    SCMProcessor(msg) {
        const msgStr = JSON.stringify(msg);
        const bytes = new TextEncoder().encode(msgStr);
        const blob = new Blob([bytes], {
            type: "application/json;charset=utf-8"
        });
        blob.arrayBuffer().then((blobData) => {
            if (this._active) {
                this._dataChannel.send(blobData);
            }
            else {
                this._SCMQueue.push(msg);
            }
        });
    }
    executeSCMQueue() {
        while (this._SCMQueue.length > 0) {
            this.SCMProcessor(this._SCMQueue.pop());
        }
    }
    RNMProcessor(message) {
        if (message.Type == interfaces_node_1.RecievableNestMessageType.StartHandshake) {
            this._peerUUID = message.UUID;
            this._dataChannel = this._peerConnection.createDataChannel("m");
            this._dataChannel.binaryType = "arraybuffer";
            this._dataChannel.onmessage = (ev) => this._onmessageHandler(ev);
            this._dataChannel.onopen = (ev) => this._onOpenHandler(ev);
            this._dataChannel.onclose = (ev) => this._onCloseHandler(ev);
            this._peerConnection.createOffer().then((offer) => {
                this._peerConnection.setLocalDescription(offer);
                const msg = {
                    UUID: this._peerUUID,
                    SDPOffer: offer,
                    Type: interfaces_node_1.SendableNestMessageType.Offer
                };
                this._SNMHandler(msg);
            });
        }
        else if (message.Type == interfaces_node_1.RecievableNestMessageType.Offer) {
            this._peerUUID = message.UUID;
            this._peerConnection.ondatachannel = (ev) => {
                this._dataChannel = ev.channel;
                this._dataChannel.binaryType = "arraybuffer";
                this._dataChannel.onmessage = (ev) => this._onmessageHandler(ev);
                this._dataChannel.onopen = (ev) => this._onOpenHandler(ev);
                this._dataChannel.onclose = (ev) => this._onCloseHandler(ev);
            };
            this._peerConnection.setRemoteDescription(new RTCSessionDescription(message.SDPOffer));
            this._peerConnection.createAnswer().then((answer) => {
                this._peerConnection.setLocalDescription(answer);
                const msg = {
                    UUID: this._peerUUID,
                    SDPOffer: answer,
                    Type: interfaces_node_1.SendableNestMessageType.Answer
                };
                this._SNMHandler(msg);
                this._peerConnection.onicecandidate = ({ candidate }) => {
                    const msg = {
                        UUID: this._peerUUID,
                        Candidate: candidate,
                        Type: interfaces_node_1.SendableNestMessageType.ICE
                    };
                    this._SNMHandler(msg);
                };
            });
        }
        else if (message.Type == interfaces_node_1.RecievableNestMessageType.Answer) {
            this._peerConnection.setRemoteDescription(new RTCSessionDescription(message.SDPOffer));
            this._peerConnection.onicecandidate = ({ candidate }) => {
                const msg = {
                    UUID: this._peerUUID,
                    Candidate: candidate,
                    Type: interfaces_node_1.SendableNestMessageType.ICE
                };
                this._SNMHandler(msg);
            };
        }
        else if (message.Type == interfaces_node_1.RecievableNestMessageType.ICE) {
            this._peerConnection.addIceCandidate(message.Candidate);
        }
        else {
            console.log("default");
        }
    }
    _onOpenHandler(ev) {
        this._active = true;
        const meta_update = { Peer: this._peerUUID, Update: "Opened" };
        this._CMUHandler(meta_update);
        this.executeSCMQueue();
    }
    _onmessageHandler(ev) {
        const jsonString = new TextDecoder().decode(ev.data);
        const msg = JSON.parse(jsonString);
        this._RCMHandler(Object.assign(Object.assign({}, msg), { UUID: this._peerUUID }));
    }
    _onCloseHandler(ev) {
        const meta_update = { Peer: this._peerUUID, Update: "Closed" };
        this._CMUHandler(meta_update);
    }
}
exports.Channel = Channel;


/***/ }),

/***/ "./lib/node/interfaces.node.ts":
/*!*************************************!*\
  !*** ./lib/node/interfaces.node.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SendableNestMessageType = exports.RecievableNestMessageType = void 0;
var RecievableNestMessageType;
(function (RecievableNestMessageType) {
    RecievableNestMessageType["Initial"] = "IN";
    RecievableNestMessageType["StartHandshake"] = "SH";
    RecievableNestMessageType["Offer"] = "OF";
    RecievableNestMessageType["Answer"] = "AN";
    RecievableNestMessageType["ICE"] = "C";
})(RecievableNestMessageType = exports.RecievableNestMessageType || (exports.RecievableNestMessageType = {}));
var SendableNestMessageType;
(function (SendableNestMessageType) {
    SendableNestMessageType["Initial"] = "IN";
    SendableNestMessageType["Offer"] = "OF";
    SendableNestMessageType["Answer"] = "AN";
    SendableNestMessageType["ICE"] = "C";
})(SendableNestMessageType = exports.SendableNestMessageType || (exports.SendableNestMessageType = {}));


/***/ }),

/***/ "./lib/node/nest.node.ts":
/*!*******************************!*\
  !*** ./lib/node/nest.node.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Nest = void 0;
const ws_1 = __webpack_require__(/*! ws */ "./node_modules/ws/index.js");
class Nest {
    constructor(sockAddr, RNMHandler) {
        this._active = false;
        this._sockAddr = "ws:45.33.74.165:80/nest";
        if (sockAddr !== undefined) {
            this._sockAddr = sockAddr;
        }
        this._ws = new ws_1.WebSocket(this._sockAddr);
        this._ws.onopen = () => {
            this._active = true;
            console.log("opened connection to nest");
        };
        this._ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            RNMHandler(message);
        };
        this._ws.onclose = () => {
            console.log("connection with the nest has been closed");
            this._active = false;
        };
        this._ws.onerror = (event) => {
            console.log(event);
            this._ws.close;
        };
    }
    isActive() {
        return this._active;
    }
    SNMProcessor(SNM) {
        const dta = JSON.stringify(SNM);
        this._ws.send(dta);
    }
}
exports.Nest = Nest;


/***/ }),

/***/ "./node_modules/ws/index.js":
/*!**********************************!*\
  !*** ./node_modules/ws/index.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const WebSocket = __webpack_require__(/*! ./lib/websocket */ "./node_modules/ws/lib/websocket.js");

WebSocket.createWebSocketStream = __webpack_require__(/*! ./lib/stream */ "./node_modules/ws/lib/stream.js");
WebSocket.Server = __webpack_require__(/*! ./lib/websocket-server */ "./node_modules/ws/lib/websocket-server.js");
WebSocket.Receiver = __webpack_require__(/*! ./lib/receiver */ "./node_modules/ws/lib/receiver.js");
WebSocket.Sender = __webpack_require__(/*! ./lib/sender */ "./node_modules/ws/lib/sender.js");

WebSocket.WebSocket = WebSocket;
WebSocket.WebSocketServer = WebSocket.Server;

module.exports = WebSocket;


/***/ }),

/***/ "./node_modules/ws/lib/buffer-util.js":
/*!********************************************!*\
  !*** ./node_modules/ws/lib/buffer-util.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const { EMPTY_BUFFER } = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");

const FastBuffer = Buffer[Symbol.species];

/**
 * Merges an array of buffers into a new buffer.
 *
 * @param {Buffer[]} list The array of buffers to concat
 * @param {Number} totalLength The total length of buffers in the list
 * @return {Buffer} The resulting buffer
 * @public
 */
function concat(list, totalLength) {
  if (list.length === 0) return EMPTY_BUFFER;
  if (list.length === 1) return list[0];

  const target = Buffer.allocUnsafe(totalLength);
  let offset = 0;

  for (let i = 0; i < list.length; i++) {
    const buf = list[i];
    target.set(buf, offset);
    offset += buf.length;
  }

  if (offset < totalLength) {
    return new FastBuffer(target.buffer, target.byteOffset, offset);
  }

  return target;
}

/**
 * Masks a buffer using the given mask.
 *
 * @param {Buffer} source The buffer to mask
 * @param {Buffer} mask The mask to use
 * @param {Buffer} output The buffer where to store the result
 * @param {Number} offset The offset at which to start writing
 * @param {Number} length The number of bytes to mask.
 * @public
 */
function _mask(source, mask, output, offset, length) {
  for (let i = 0; i < length; i++) {
    output[offset + i] = source[i] ^ mask[i & 3];
  }
}

/**
 * Unmasks a buffer using the given mask.
 *
 * @param {Buffer} buffer The buffer to unmask
 * @param {Buffer} mask The mask to use
 * @public
 */
function _unmask(buffer, mask) {
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] ^= mask[i & 3];
  }
}

/**
 * Converts a buffer to an `ArrayBuffer`.
 *
 * @param {Buffer} buf The buffer to convert
 * @return {ArrayBuffer} Converted buffer
 * @public
 */
function toArrayBuffer(buf) {
  if (buf.length === buf.buffer.byteLength) {
    return buf.buffer;
  }

  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
}

/**
 * Converts `data` to a `Buffer`.
 *
 * @param {*} data The data to convert
 * @return {Buffer} The buffer
 * @throws {TypeError}
 * @public
 */
function toBuffer(data) {
  toBuffer.readOnly = true;

  if (Buffer.isBuffer(data)) return data;

  let buf;

  if (data instanceof ArrayBuffer) {
    buf = new FastBuffer(data);
  } else if (ArrayBuffer.isView(data)) {
    buf = new FastBuffer(data.buffer, data.byteOffset, data.byteLength);
  } else {
    buf = Buffer.from(data);
    toBuffer.readOnly = false;
  }

  return buf;
}

module.exports = {
  concat,
  mask: _mask,
  toArrayBuffer,
  toBuffer,
  unmask: _unmask
};

/* istanbul ignore else  */
if (!process.env.WS_NO_BUFFER_UTIL) {
  try {
    const bufferUtil = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'bufferutil'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

    module.exports.mask = function (source, mask, output, offset, length) {
      if (length < 48) _mask(source, mask, output, offset, length);
      else bufferUtil.mask(source, mask, output, offset, length);
    };

    module.exports.unmask = function (buffer, mask) {
      if (buffer.length < 32) _unmask(buffer, mask);
      else bufferUtil.unmask(buffer, mask);
    };
  } catch (e) {
    // Continue regardless of the error.
  }
}


/***/ }),

/***/ "./node_modules/ws/lib/constants.js":
/*!******************************************!*\
  !*** ./node_modules/ws/lib/constants.js ***!
  \******************************************/
/***/ ((module) => {



module.exports = {
  BINARY_TYPES: ['nodebuffer', 'arraybuffer', 'fragments'],
  EMPTY_BUFFER: Buffer.alloc(0),
  GUID: '258EAFA5-E914-47DA-95CA-C5AB0DC85B11',
  kForOnEventAttribute: Symbol('kIsForOnEventAttribute'),
  kListener: Symbol('kListener'),
  kStatusCode: Symbol('status-code'),
  kWebSocket: Symbol('websocket'),
  NOOP: () => {}
};


/***/ }),

/***/ "./node_modules/ws/lib/event-target.js":
/*!*********************************************!*\
  !*** ./node_modules/ws/lib/event-target.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const { kForOnEventAttribute, kListener } = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");

const kCode = Symbol('kCode');
const kData = Symbol('kData');
const kError = Symbol('kError');
const kMessage = Symbol('kMessage');
const kReason = Symbol('kReason');
const kTarget = Symbol('kTarget');
const kType = Symbol('kType');
const kWasClean = Symbol('kWasClean');

/**
 * Class representing an event.
 */
class Event {
  /**
   * Create a new `Event`.
   *
   * @param {String} type The name of the event
   * @throws {TypeError} If the `type` argument is not specified
   */
  constructor(type) {
    this[kTarget] = null;
    this[kType] = type;
  }

  /**
   * @type {*}
   */
  get target() {
    return this[kTarget];
  }

  /**
   * @type {String}
   */
  get type() {
    return this[kType];
  }
}

Object.defineProperty(Event.prototype, 'target', { enumerable: true });
Object.defineProperty(Event.prototype, 'type', { enumerable: true });

/**
 * Class representing a close event.
 *
 * @extends Event
 */
class CloseEvent extends Event {
  /**
   * Create a new `CloseEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {Number} [options.code=0] The status code explaining why the
   *     connection was closed
   * @param {String} [options.reason=''] A human-readable string explaining why
   *     the connection was closed
   * @param {Boolean} [options.wasClean=false] Indicates whether or not the
   *     connection was cleanly closed
   */
  constructor(type, options = {}) {
    super(type);

    this[kCode] = options.code === undefined ? 0 : options.code;
    this[kReason] = options.reason === undefined ? '' : options.reason;
    this[kWasClean] = options.wasClean === undefined ? false : options.wasClean;
  }

  /**
   * @type {Number}
   */
  get code() {
    return this[kCode];
  }

  /**
   * @type {String}
   */
  get reason() {
    return this[kReason];
  }

  /**
   * @type {Boolean}
   */
  get wasClean() {
    return this[kWasClean];
  }
}

Object.defineProperty(CloseEvent.prototype, 'code', { enumerable: true });
Object.defineProperty(CloseEvent.prototype, 'reason', { enumerable: true });
Object.defineProperty(CloseEvent.prototype, 'wasClean', { enumerable: true });

/**
 * Class representing an error event.
 *
 * @extends Event
 */
class ErrorEvent extends Event {
  /**
   * Create a new `ErrorEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.error=null] The error that generated this event
   * @param {String} [options.message=''] The error message
   */
  constructor(type, options = {}) {
    super(type);

    this[kError] = options.error === undefined ? null : options.error;
    this[kMessage] = options.message === undefined ? '' : options.message;
  }

  /**
   * @type {*}
   */
  get error() {
    return this[kError];
  }

  /**
   * @type {String}
   */
  get message() {
    return this[kMessage];
  }
}

Object.defineProperty(ErrorEvent.prototype, 'error', { enumerable: true });
Object.defineProperty(ErrorEvent.prototype, 'message', { enumerable: true });

/**
 * Class representing a message event.
 *
 * @extends Event
 */
class MessageEvent extends Event {
  /**
   * Create a new `MessageEvent`.
   *
   * @param {String} type The name of the event
   * @param {Object} [options] A dictionary object that allows for setting
   *     attributes via object members of the same name
   * @param {*} [options.data=null] The message content
   */
  constructor(type, options = {}) {
    super(type);

    this[kData] = options.data === undefined ? null : options.data;
  }

  /**
   * @type {*}
   */
  get data() {
    return this[kData];
  }
}

Object.defineProperty(MessageEvent.prototype, 'data', { enumerable: true });

/**
 * This provides methods for emulating the `EventTarget` interface. It's not
 * meant to be used directly.
 *
 * @mixin
 */
const EventTarget = {
  /**
   * Register an event listener.
   *
   * @param {String} type A string representing the event type to listen for
   * @param {(Function|Object)} handler The listener to add
   * @param {Object} [options] An options object specifies characteristics about
   *     the event listener
   * @param {Boolean} [options.once=false] A `Boolean` indicating that the
   *     listener should be invoked at most once after being added. If `true`,
   *     the listener would be automatically removed when invoked.
   * @public
   */
  addEventListener(type, handler, options = {}) {
    for (const listener of this.listeners(type)) {
      if (
        !options[kForOnEventAttribute] &&
        listener[kListener] === handler &&
        !listener[kForOnEventAttribute]
      ) {
        return;
      }
    }

    let wrapper;

    if (type === 'message') {
      wrapper = function onMessage(data, isBinary) {
        const event = new MessageEvent('message', {
          data: isBinary ? data : data.toString()
        });

        event[kTarget] = this;
        callListener(handler, this, event);
      };
    } else if (type === 'close') {
      wrapper = function onClose(code, message) {
        const event = new CloseEvent('close', {
          code,
          reason: message.toString(),
          wasClean: this._closeFrameReceived && this._closeFrameSent
        });

        event[kTarget] = this;
        callListener(handler, this, event);
      };
    } else if (type === 'error') {
      wrapper = function onError(error) {
        const event = new ErrorEvent('error', {
          error,
          message: error.message
        });

        event[kTarget] = this;
        callListener(handler, this, event);
      };
    } else if (type === 'open') {
      wrapper = function onOpen() {
        const event = new Event('open');

        event[kTarget] = this;
        callListener(handler, this, event);
      };
    } else {
      return;
    }

    wrapper[kForOnEventAttribute] = !!options[kForOnEventAttribute];
    wrapper[kListener] = handler;

    if (options.once) {
      this.once(type, wrapper);
    } else {
      this.on(type, wrapper);
    }
  },

  /**
   * Remove an event listener.
   *
   * @param {String} type A string representing the event type to remove
   * @param {(Function|Object)} handler The listener to remove
   * @public
   */
  removeEventListener(type, handler) {
    for (const listener of this.listeners(type)) {
      if (listener[kListener] === handler && !listener[kForOnEventAttribute]) {
        this.removeListener(type, listener);
        break;
      }
    }
  }
};

module.exports = {
  CloseEvent,
  ErrorEvent,
  Event,
  EventTarget,
  MessageEvent
};

/**
 * Call an event listener
 *
 * @param {(Function|Object)} listener The listener to call
 * @param {*} thisArg The value to use as `this`` when calling the listener
 * @param {Event} event The event to pass to the listener
 * @private
 */
function callListener(listener, thisArg, event) {
  if (typeof listener === 'object' && listener.handleEvent) {
    listener.handleEvent.call(listener, event);
  } else {
    listener.call(thisArg, event);
  }
}


/***/ }),

/***/ "./node_modules/ws/lib/extension.js":
/*!******************************************!*\
  !*** ./node_modules/ws/lib/extension.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const { tokenChars } = __webpack_require__(/*! ./validation */ "./node_modules/ws/lib/validation.js");

/**
 * Adds an offer to the map of extension offers or a parameter to the map of
 * parameters.
 *
 * @param {Object} dest The map of extension offers or parameters
 * @param {String} name The extension or parameter name
 * @param {(Object|Boolean|String)} elem The extension parameters or the
 *     parameter value
 * @private
 */
function push(dest, name, elem) {
  if (dest[name] === undefined) dest[name] = [elem];
  else dest[name].push(elem);
}

/**
 * Parses the `Sec-WebSocket-Extensions` header into an object.
 *
 * @param {String} header The field value of the header
 * @return {Object} The parsed object
 * @public
 */
function parse(header) {
  const offers = Object.create(null);
  let params = Object.create(null);
  let mustUnescape = false;
  let isEscaping = false;
  let inQuotes = false;
  let extensionName;
  let paramName;
  let start = -1;
  let code = -1;
  let end = -1;
  let i = 0;

  for (; i < header.length; i++) {
    code = header.charCodeAt(i);

    if (extensionName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (
        i !== 0 &&
        (code === 0x20 /* ' ' */ || code === 0x09) /* '\t' */
      ) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b /* ';' */ || code === 0x2c /* ',' */) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        const name = header.slice(start, end);
        if (code === 0x2c) {
          push(offers, name, params);
          params = Object.create(null);
        } else {
          extensionName = name;
        }

        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else if (paramName === undefined) {
      if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (code === 0x20 || code === 0x09) {
        if (end === -1 && start !== -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        push(params, header.slice(start, end), true);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        start = end = -1;
      } else if (code === 0x3d /* '=' */ && start !== -1 && end === -1) {
        paramName = header.slice(start, i);
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    } else {
      //
      // The value of a quoted-string after unescaping must conform to the
      // token ABNF, so only token characters are valid.
      // Ref: https://tools.ietf.org/html/rfc6455#section-9.1
      //
      if (isEscaping) {
        if (tokenChars[code] !== 1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
        if (start === -1) start = i;
        else if (!mustUnescape) mustUnescape = true;
        isEscaping = false;
      } else if (inQuotes) {
        if (tokenChars[code] === 1) {
          if (start === -1) start = i;
        } else if (code === 0x22 /* '"' */ && start !== -1) {
          inQuotes = false;
          end = i;
        } else if (code === 0x5c /* '\' */) {
          isEscaping = true;
        } else {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }
      } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
        inQuotes = true;
      } else if (end === -1 && tokenChars[code] === 1) {
        if (start === -1) start = i;
      } else if (start !== -1 && (code === 0x20 || code === 0x09)) {
        if (end === -1) end = i;
      } else if (code === 0x3b || code === 0x2c) {
        if (start === -1) {
          throw new SyntaxError(`Unexpected character at index ${i}`);
        }

        if (end === -1) end = i;
        let value = header.slice(start, end);
        if (mustUnescape) {
          value = value.replace(/\\/g, '');
          mustUnescape = false;
        }
        push(params, paramName, value);
        if (code === 0x2c) {
          push(offers, extensionName, params);
          params = Object.create(null);
          extensionName = undefined;
        }

        paramName = undefined;
        start = end = -1;
      } else {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }
    }
  }

  if (start === -1 || inQuotes || code === 0x20 || code === 0x09) {
    throw new SyntaxError('Unexpected end of input');
  }

  if (end === -1) end = i;
  const token = header.slice(start, end);
  if (extensionName === undefined) {
    push(offers, token, params);
  } else {
    if (paramName === undefined) {
      push(params, token, true);
    } else if (mustUnescape) {
      push(params, paramName, token.replace(/\\/g, ''));
    } else {
      push(params, paramName, token);
    }
    push(offers, extensionName, params);
  }

  return offers;
}

/**
 * Builds the `Sec-WebSocket-Extensions` header field value.
 *
 * @param {Object} extensions The map of extensions and parameters to format
 * @return {String} A string representing the given object
 * @public
 */
function format(extensions) {
  return Object.keys(extensions)
    .map((extension) => {
      let configurations = extensions[extension];
      if (!Array.isArray(configurations)) configurations = [configurations];
      return configurations
        .map((params) => {
          return [extension]
            .concat(
              Object.keys(params).map((k) => {
                let values = params[k];
                if (!Array.isArray(values)) values = [values];
                return values
                  .map((v) => (v === true ? k : `${k}=${v}`))
                  .join('; ');
              })
            )
            .join('; ');
        })
        .join(', ');
    })
    .join(', ');
}

module.exports = { format, parse };


/***/ }),

/***/ "./node_modules/ws/lib/limiter.js":
/*!****************************************!*\
  !*** ./node_modules/ws/lib/limiter.js ***!
  \****************************************/
/***/ ((module) => {



const kDone = Symbol('kDone');
const kRun = Symbol('kRun');

/**
 * A very simple job queue with adjustable concurrency. Adapted from
 * https://github.com/STRML/async-limiter
 */
class Limiter {
  /**
   * Creates a new `Limiter`.
   *
   * @param {Number} [concurrency=Infinity] The maximum number of jobs allowed
   *     to run concurrently
   */
  constructor(concurrency) {
    this[kDone] = () => {
      this.pending--;
      this[kRun]();
    };
    this.concurrency = concurrency || Infinity;
    this.jobs = [];
    this.pending = 0;
  }

  /**
   * Adds a job to the queue.
   *
   * @param {Function} job The job to run
   * @public
   */
  add(job) {
    this.jobs.push(job);
    this[kRun]();
  }

  /**
   * Removes a job from the queue and runs it if possible.
   *
   * @private
   */
  [kRun]() {
    if (this.pending === this.concurrency) return;

    if (this.jobs.length) {
      const job = this.jobs.shift();

      this.pending++;
      job(this[kDone]);
    }
  }
}

module.exports = Limiter;


/***/ }),

/***/ "./node_modules/ws/lib/permessage-deflate.js":
/*!***************************************************!*\
  !*** ./node_modules/ws/lib/permessage-deflate.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const zlib = __webpack_require__(/*! zlib */ "zlib");

const bufferUtil = __webpack_require__(/*! ./buffer-util */ "./node_modules/ws/lib/buffer-util.js");
const Limiter = __webpack_require__(/*! ./limiter */ "./node_modules/ws/lib/limiter.js");
const { kStatusCode } = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");

const FastBuffer = Buffer[Symbol.species];
const TRAILER = Buffer.from([0x00, 0x00, 0xff, 0xff]);
const kPerMessageDeflate = Symbol('permessage-deflate');
const kTotalLength = Symbol('total-length');
const kCallback = Symbol('callback');
const kBuffers = Symbol('buffers');
const kError = Symbol('error');

//
// We limit zlib concurrency, which prevents severe memory fragmentation
// as documented in https://github.com/nodejs/node/issues/8871#issuecomment-250915913
// and https://github.com/websockets/ws/issues/1202
//
// Intentionally global; it's the global thread pool that's an issue.
//
let zlibLimiter;

/**
 * permessage-deflate implementation.
 */
class PerMessageDeflate {
  /**
   * Creates a PerMessageDeflate instance.
   *
   * @param {Object} [options] Configuration options
   * @param {(Boolean|Number)} [options.clientMaxWindowBits] Advertise support
   *     for, or request, a custom client window size
   * @param {Boolean} [options.clientNoContextTakeover=false] Advertise/
   *     acknowledge disabling of client context takeover
   * @param {Number} [options.concurrencyLimit=10] The number of concurrent
   *     calls to zlib
   * @param {(Boolean|Number)} [options.serverMaxWindowBits] Request/confirm the
   *     use of a custom server window size
   * @param {Boolean} [options.serverNoContextTakeover=false] Request/accept
   *     disabling of server context takeover
   * @param {Number} [options.threshold=1024] Size (in bytes) below which
   *     messages should not be compressed if context takeover is disabled
   * @param {Object} [options.zlibDeflateOptions] Options to pass to zlib on
   *     deflate
   * @param {Object} [options.zlibInflateOptions] Options to pass to zlib on
   *     inflate
   * @param {Boolean} [isServer=false] Create the instance in either server or
   *     client mode
   * @param {Number} [maxPayload=0] The maximum allowed message length
   */
  constructor(options, isServer, maxPayload) {
    this._maxPayload = maxPayload | 0;
    this._options = options || {};
    this._threshold =
      this._options.threshold !== undefined ? this._options.threshold : 1024;
    this._isServer = !!isServer;
    this._deflate = null;
    this._inflate = null;

    this.params = null;

    if (!zlibLimiter) {
      const concurrency =
        this._options.concurrencyLimit !== undefined
          ? this._options.concurrencyLimit
          : 10;
      zlibLimiter = new Limiter(concurrency);
    }
  }

  /**
   * @type {String}
   */
  static get extensionName() {
    return 'permessage-deflate';
  }

  /**
   * Create an extension negotiation offer.
   *
   * @return {Object} Extension parameters
   * @public
   */
  offer() {
    const params = {};

    if (this._options.serverNoContextTakeover) {
      params.server_no_context_takeover = true;
    }
    if (this._options.clientNoContextTakeover) {
      params.client_no_context_takeover = true;
    }
    if (this._options.serverMaxWindowBits) {
      params.server_max_window_bits = this._options.serverMaxWindowBits;
    }
    if (this._options.clientMaxWindowBits) {
      params.client_max_window_bits = this._options.clientMaxWindowBits;
    } else if (this._options.clientMaxWindowBits == null) {
      params.client_max_window_bits = true;
    }

    return params;
  }

  /**
   * Accept an extension negotiation offer/response.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Object} Accepted configuration
   * @public
   */
  accept(configurations) {
    configurations = this.normalizeParams(configurations);

    this.params = this._isServer
      ? this.acceptAsServer(configurations)
      : this.acceptAsClient(configurations);

    return this.params;
  }

  /**
   * Releases all resources used by the extension.
   *
   * @public
   */
  cleanup() {
    if (this._inflate) {
      this._inflate.close();
      this._inflate = null;
    }

    if (this._deflate) {
      const callback = this._deflate[kCallback];

      this._deflate.close();
      this._deflate = null;

      if (callback) {
        callback(
          new Error(
            'The deflate stream was closed while data was being processed'
          )
        );
      }
    }
  }

  /**
   *  Accept an extension negotiation offer.
   *
   * @param {Array} offers The extension negotiation offers
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsServer(offers) {
    const opts = this._options;
    const accepted = offers.find((params) => {
      if (
        (opts.serverNoContextTakeover === false &&
          params.server_no_context_takeover) ||
        (params.server_max_window_bits &&
          (opts.serverMaxWindowBits === false ||
            (typeof opts.serverMaxWindowBits === 'number' &&
              opts.serverMaxWindowBits > params.server_max_window_bits))) ||
        (typeof opts.clientMaxWindowBits === 'number' &&
          !params.client_max_window_bits)
      ) {
        return false;
      }

      return true;
    });

    if (!accepted) {
      throw new Error('None of the extension offers can be accepted');
    }

    if (opts.serverNoContextTakeover) {
      accepted.server_no_context_takeover = true;
    }
    if (opts.clientNoContextTakeover) {
      accepted.client_no_context_takeover = true;
    }
    if (typeof opts.serverMaxWindowBits === 'number') {
      accepted.server_max_window_bits = opts.serverMaxWindowBits;
    }
    if (typeof opts.clientMaxWindowBits === 'number') {
      accepted.client_max_window_bits = opts.clientMaxWindowBits;
    } else if (
      accepted.client_max_window_bits === true ||
      opts.clientMaxWindowBits === false
    ) {
      delete accepted.client_max_window_bits;
    }

    return accepted;
  }

  /**
   * Accept the extension negotiation response.
   *
   * @param {Array} response The extension negotiation response
   * @return {Object} Accepted configuration
   * @private
   */
  acceptAsClient(response) {
    const params = response[0];

    if (
      this._options.clientNoContextTakeover === false &&
      params.client_no_context_takeover
    ) {
      throw new Error('Unexpected parameter "client_no_context_takeover"');
    }

    if (!params.client_max_window_bits) {
      if (typeof this._options.clientMaxWindowBits === 'number') {
        params.client_max_window_bits = this._options.clientMaxWindowBits;
      }
    } else if (
      this._options.clientMaxWindowBits === false ||
      (typeof this._options.clientMaxWindowBits === 'number' &&
        params.client_max_window_bits > this._options.clientMaxWindowBits)
    ) {
      throw new Error(
        'Unexpected or invalid parameter "client_max_window_bits"'
      );
    }

    return params;
  }

  /**
   * Normalize parameters.
   *
   * @param {Array} configurations The extension negotiation offers/reponse
   * @return {Array} The offers/response with normalized parameters
   * @private
   */
  normalizeParams(configurations) {
    configurations.forEach((params) => {
      Object.keys(params).forEach((key) => {
        let value = params[key];

        if (value.length > 1) {
          throw new Error(`Parameter "${key}" must have only a single value`);
        }

        value = value[0];

        if (key === 'client_max_window_bits') {
          if (value !== true) {
            const num = +value;
            if (!Number.isInteger(num) || num < 8 || num > 15) {
              throw new TypeError(
                `Invalid value for parameter "${key}": ${value}`
              );
            }
            value = num;
          } else if (!this._isServer) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
        } else if (key === 'server_max_window_bits') {
          const num = +value;
          if (!Number.isInteger(num) || num < 8 || num > 15) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
          value = num;
        } else if (
          key === 'client_no_context_takeover' ||
          key === 'server_no_context_takeover'
        ) {
          if (value !== true) {
            throw new TypeError(
              `Invalid value for parameter "${key}": ${value}`
            );
          }
        } else {
          throw new Error(`Unknown parameter "${key}"`);
        }

        params[key] = value;
      });
    });

    return configurations;
  }

  /**
   * Decompress data. Concurrency limited.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  decompress(data, fin, callback) {
    zlibLimiter.add((done) => {
      this._decompress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }

  /**
   * Compress data. Concurrency limited.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @public
   */
  compress(data, fin, callback) {
    zlibLimiter.add((done) => {
      this._compress(data, fin, (err, result) => {
        done();
        callback(err, result);
      });
    });
  }

  /**
   * Decompress data.
   *
   * @param {Buffer} data Compressed data
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _decompress(data, fin, callback) {
    const endpoint = this._isServer ? 'client' : 'server';

    if (!this._inflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits =
        typeof this.params[key] !== 'number'
          ? zlib.Z_DEFAULT_WINDOWBITS
          : this.params[key];

      this._inflate = zlib.createInflateRaw({
        ...this._options.zlibInflateOptions,
        windowBits
      });
      this._inflate[kPerMessageDeflate] = this;
      this._inflate[kTotalLength] = 0;
      this._inflate[kBuffers] = [];
      this._inflate.on('error', inflateOnError);
      this._inflate.on('data', inflateOnData);
    }

    this._inflate[kCallback] = callback;

    this._inflate.write(data);
    if (fin) this._inflate.write(TRAILER);

    this._inflate.flush(() => {
      const err = this._inflate[kError];

      if (err) {
        this._inflate.close();
        this._inflate = null;
        callback(err);
        return;
      }

      const data = bufferUtil.concat(
        this._inflate[kBuffers],
        this._inflate[kTotalLength]
      );

      if (this._inflate._readableState.endEmitted) {
        this._inflate.close();
        this._inflate = null;
      } else {
        this._inflate[kTotalLength] = 0;
        this._inflate[kBuffers] = [];

        if (fin && this.params[`${endpoint}_no_context_takeover`]) {
          this._inflate.reset();
        }
      }

      callback(null, data);
    });
  }

  /**
   * Compress data.
   *
   * @param {(Buffer|String)} data Data to compress
   * @param {Boolean} fin Specifies whether or not this is the last fragment
   * @param {Function} callback Callback
   * @private
   */
  _compress(data, fin, callback) {
    const endpoint = this._isServer ? 'server' : 'client';

    if (!this._deflate) {
      const key = `${endpoint}_max_window_bits`;
      const windowBits =
        typeof this.params[key] !== 'number'
          ? zlib.Z_DEFAULT_WINDOWBITS
          : this.params[key];

      this._deflate = zlib.createDeflateRaw({
        ...this._options.zlibDeflateOptions,
        windowBits
      });

      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      this._deflate.on('data', deflateOnData);
    }

    this._deflate[kCallback] = callback;

    this._deflate.write(data);
    this._deflate.flush(zlib.Z_SYNC_FLUSH, () => {
      if (!this._deflate) {
        //
        // The deflate stream was closed while data was being processed.
        //
        return;
      }

      let data = bufferUtil.concat(
        this._deflate[kBuffers],
        this._deflate[kTotalLength]
      );

      if (fin) {
        data = new FastBuffer(data.buffer, data.byteOffset, data.length - 4);
      }

      //
      // Ensure that the callback will not be called again in
      // `PerMessageDeflate#cleanup()`.
      //
      this._deflate[kCallback] = null;

      this._deflate[kTotalLength] = 0;
      this._deflate[kBuffers] = [];

      if (fin && this.params[`${endpoint}_no_context_takeover`]) {
        this._deflate.reset();
      }

      callback(null, data);
    });
  }
}

module.exports = PerMessageDeflate;

/**
 * The listener of the `zlib.DeflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function deflateOnData(chunk) {
  this[kBuffers].push(chunk);
  this[kTotalLength] += chunk.length;
}

/**
 * The listener of the `zlib.InflateRaw` stream `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function inflateOnData(chunk) {
  this[kTotalLength] += chunk.length;

  if (
    this[kPerMessageDeflate]._maxPayload < 1 ||
    this[kTotalLength] <= this[kPerMessageDeflate]._maxPayload
  ) {
    this[kBuffers].push(chunk);
    return;
  }

  this[kError] = new RangeError('Max payload size exceeded');
  this[kError].code = 'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH';
  this[kError][kStatusCode] = 1009;
  this.removeListener('data', inflateOnData);
  this.reset();
}

/**
 * The listener of the `zlib.InflateRaw` stream `'error'` event.
 *
 * @param {Error} err The emitted error
 * @private
 */
function inflateOnError(err) {
  //
  // There is no need to call `Zlib#close()` as the handle is automatically
  // closed when an error is emitted.
  //
  this[kPerMessageDeflate]._inflate = null;
  err[kStatusCode] = 1007;
  this[kCallback](err);
}


/***/ }),

/***/ "./node_modules/ws/lib/receiver.js":
/*!*****************************************!*\
  !*** ./node_modules/ws/lib/receiver.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const { Writable } = __webpack_require__(/*! stream */ "stream");

const PerMessageDeflate = __webpack_require__(/*! ./permessage-deflate */ "./node_modules/ws/lib/permessage-deflate.js");
const {
  BINARY_TYPES,
  EMPTY_BUFFER,
  kStatusCode,
  kWebSocket
} = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");
const { concat, toArrayBuffer, unmask } = __webpack_require__(/*! ./buffer-util */ "./node_modules/ws/lib/buffer-util.js");
const { isValidStatusCode, isValidUTF8 } = __webpack_require__(/*! ./validation */ "./node_modules/ws/lib/validation.js");

const FastBuffer = Buffer[Symbol.species];
const GET_INFO = 0;
const GET_PAYLOAD_LENGTH_16 = 1;
const GET_PAYLOAD_LENGTH_64 = 2;
const GET_MASK = 3;
const GET_DATA = 4;
const INFLATING = 5;

/**
 * HyBi Receiver implementation.
 *
 * @extends Writable
 */
class Receiver extends Writable {
  /**
   * Creates a Receiver instance.
   *
   * @param {Object} [options] Options object
   * @param {String} [options.binaryType=nodebuffer] The type for binary data
   * @param {Object} [options.extensions] An object containing the negotiated
   *     extensions
   * @param {Boolean} [options.isServer=false] Specifies whether to operate in
   *     client or server mode
   * @param {Number} [options.maxPayload=0] The maximum allowed message length
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   */
  constructor(options = {}) {
    super();

    this._binaryType = options.binaryType || BINARY_TYPES[0];
    this._extensions = options.extensions || {};
    this._isServer = !!options.isServer;
    this._maxPayload = options.maxPayload | 0;
    this._skipUTF8Validation = !!options.skipUTF8Validation;
    this[kWebSocket] = undefined;

    this._bufferedBytes = 0;
    this._buffers = [];

    this._compressed = false;
    this._payloadLength = 0;
    this._mask = undefined;
    this._fragmented = 0;
    this._masked = false;
    this._fin = false;
    this._opcode = 0;

    this._totalPayloadLength = 0;
    this._messageLength = 0;
    this._fragments = [];

    this._state = GET_INFO;
    this._loop = false;
  }

  /**
   * Implements `Writable.prototype._write()`.
   *
   * @param {Buffer} chunk The chunk of data to write
   * @param {String} encoding The character encoding of `chunk`
   * @param {Function} cb Callback
   * @private
   */
  _write(chunk, encoding, cb) {
    if (this._opcode === 0x08 && this._state == GET_INFO) return cb();

    this._bufferedBytes += chunk.length;
    this._buffers.push(chunk);
    this.startLoop(cb);
  }

  /**
   * Consumes `n` bytes from the buffered data.
   *
   * @param {Number} n The number of bytes to consume
   * @return {Buffer} The consumed bytes
   * @private
   */
  consume(n) {
    this._bufferedBytes -= n;

    if (n === this._buffers[0].length) return this._buffers.shift();

    if (n < this._buffers[0].length) {
      const buf = this._buffers[0];
      this._buffers[0] = new FastBuffer(
        buf.buffer,
        buf.byteOffset + n,
        buf.length - n
      );

      return new FastBuffer(buf.buffer, buf.byteOffset, n);
    }

    const dst = Buffer.allocUnsafe(n);

    do {
      const buf = this._buffers[0];
      const offset = dst.length - n;

      if (n >= buf.length) {
        dst.set(this._buffers.shift(), offset);
      } else {
        dst.set(new Uint8Array(buf.buffer, buf.byteOffset, n), offset);
        this._buffers[0] = new FastBuffer(
          buf.buffer,
          buf.byteOffset + n,
          buf.length - n
        );
      }

      n -= buf.length;
    } while (n > 0);

    return dst;
  }

  /**
   * Starts the parsing loop.
   *
   * @param {Function} cb Callback
   * @private
   */
  startLoop(cb) {
    let err;
    this._loop = true;

    do {
      switch (this._state) {
        case GET_INFO:
          err = this.getInfo();
          break;
        case GET_PAYLOAD_LENGTH_16:
          err = this.getPayloadLength16();
          break;
        case GET_PAYLOAD_LENGTH_64:
          err = this.getPayloadLength64();
          break;
        case GET_MASK:
          this.getMask();
          break;
        case GET_DATA:
          err = this.getData(cb);
          break;
        default:
          // `INFLATING`
          this._loop = false;
          return;
      }
    } while (this._loop);

    cb(err);
  }

  /**
   * Reads the first two bytes of a frame.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getInfo() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    const buf = this.consume(2);

    if ((buf[0] & 0x30) !== 0x00) {
      this._loop = false;
      return error(
        RangeError,
        'RSV2 and RSV3 must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_RSV_2_3'
      );
    }

    const compressed = (buf[0] & 0x40) === 0x40;

    if (compressed && !this._extensions[PerMessageDeflate.extensionName]) {
      this._loop = false;
      return error(
        RangeError,
        'RSV1 must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_RSV_1'
      );
    }

    this._fin = (buf[0] & 0x80) === 0x80;
    this._opcode = buf[0] & 0x0f;
    this._payloadLength = buf[1] & 0x7f;

    if (this._opcode === 0x00) {
      if (compressed) {
        this._loop = false;
        return error(
          RangeError,
          'RSV1 must be clear',
          true,
          1002,
          'WS_ERR_UNEXPECTED_RSV_1'
        );
      }

      if (!this._fragmented) {
        this._loop = false;
        return error(
          RangeError,
          'invalid opcode 0',
          true,
          1002,
          'WS_ERR_INVALID_OPCODE'
        );
      }

      this._opcode = this._fragmented;
    } else if (this._opcode === 0x01 || this._opcode === 0x02) {
      if (this._fragmented) {
        this._loop = false;
        return error(
          RangeError,
          `invalid opcode ${this._opcode}`,
          true,
          1002,
          'WS_ERR_INVALID_OPCODE'
        );
      }

      this._compressed = compressed;
    } else if (this._opcode > 0x07 && this._opcode < 0x0b) {
      if (!this._fin) {
        this._loop = false;
        return error(
          RangeError,
          'FIN must be set',
          true,
          1002,
          'WS_ERR_EXPECTED_FIN'
        );
      }

      if (compressed) {
        this._loop = false;
        return error(
          RangeError,
          'RSV1 must be clear',
          true,
          1002,
          'WS_ERR_UNEXPECTED_RSV_1'
        );
      }

      if (
        this._payloadLength > 0x7d ||
        (this._opcode === 0x08 && this._payloadLength === 1)
      ) {
        this._loop = false;
        return error(
          RangeError,
          `invalid payload length ${this._payloadLength}`,
          true,
          1002,
          'WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH'
        );
      }
    } else {
      this._loop = false;
      return error(
        RangeError,
        `invalid opcode ${this._opcode}`,
        true,
        1002,
        'WS_ERR_INVALID_OPCODE'
      );
    }

    if (!this._fin && !this._fragmented) this._fragmented = this._opcode;
    this._masked = (buf[1] & 0x80) === 0x80;

    if (this._isServer) {
      if (!this._masked) {
        this._loop = false;
        return error(
          RangeError,
          'MASK must be set',
          true,
          1002,
          'WS_ERR_EXPECTED_MASK'
        );
      }
    } else if (this._masked) {
      this._loop = false;
      return error(
        RangeError,
        'MASK must be clear',
        true,
        1002,
        'WS_ERR_UNEXPECTED_MASK'
      );
    }

    if (this._payloadLength === 126) this._state = GET_PAYLOAD_LENGTH_16;
    else if (this._payloadLength === 127) this._state = GET_PAYLOAD_LENGTH_64;
    else return this.haveLength();
  }

  /**
   * Gets extended payload length (7+16).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength16() {
    if (this._bufferedBytes < 2) {
      this._loop = false;
      return;
    }

    this._payloadLength = this.consume(2).readUInt16BE(0);
    return this.haveLength();
  }

  /**
   * Gets extended payload length (7+64).
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  getPayloadLength64() {
    if (this._bufferedBytes < 8) {
      this._loop = false;
      return;
    }

    const buf = this.consume(8);
    const num = buf.readUInt32BE(0);

    //
    // The maximum safe integer in JavaScript is 2^53 - 1. An error is returned
    // if payload length is greater than this number.
    //
    if (num > Math.pow(2, 53 - 32) - 1) {
      this._loop = false;
      return error(
        RangeError,
        'Unsupported WebSocket frame: payload length > 2^53 - 1',
        false,
        1009,
        'WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH'
      );
    }

    this._payloadLength = num * Math.pow(2, 32) + buf.readUInt32BE(4);
    return this.haveLength();
  }

  /**
   * Payload length has been read.
   *
   * @return {(RangeError|undefined)} A possible error
   * @private
   */
  haveLength() {
    if (this._payloadLength && this._opcode < 0x08) {
      this._totalPayloadLength += this._payloadLength;
      if (this._totalPayloadLength > this._maxPayload && this._maxPayload > 0) {
        this._loop = false;
        return error(
          RangeError,
          'Max payload size exceeded',
          false,
          1009,
          'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
        );
      }
    }

    if (this._masked) this._state = GET_MASK;
    else this._state = GET_DATA;
  }

  /**
   * Reads mask bytes.
   *
   * @private
   */
  getMask() {
    if (this._bufferedBytes < 4) {
      this._loop = false;
      return;
    }

    this._mask = this.consume(4);
    this._state = GET_DATA;
  }

  /**
   * Reads data bytes.
   *
   * @param {Function} cb Callback
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  getData(cb) {
    let data = EMPTY_BUFFER;

    if (this._payloadLength) {
      if (this._bufferedBytes < this._payloadLength) {
        this._loop = false;
        return;
      }

      data = this.consume(this._payloadLength);

      if (
        this._masked &&
        (this._mask[0] | this._mask[1] | this._mask[2] | this._mask[3]) !== 0
      ) {
        unmask(data, this._mask);
      }
    }

    if (this._opcode > 0x07) return this.controlMessage(data);

    if (this._compressed) {
      this._state = INFLATING;
      this.decompress(data, cb);
      return;
    }

    if (data.length) {
      //
      // This message is not compressed so its length is the sum of the payload
      // length of all fragments.
      //
      this._messageLength = this._totalPayloadLength;
      this._fragments.push(data);
    }

    return this.dataMessage();
  }

  /**
   * Decompresses data.
   *
   * @param {Buffer} data Compressed data
   * @param {Function} cb Callback
   * @private
   */
  decompress(data, cb) {
    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

    perMessageDeflate.decompress(data, this._fin, (err, buf) => {
      if (err) return cb(err);

      if (buf.length) {
        this._messageLength += buf.length;
        if (this._messageLength > this._maxPayload && this._maxPayload > 0) {
          return cb(
            error(
              RangeError,
              'Max payload size exceeded',
              false,
              1009,
              'WS_ERR_UNSUPPORTED_MESSAGE_LENGTH'
            )
          );
        }

        this._fragments.push(buf);
      }

      const er = this.dataMessage();
      if (er) return cb(er);

      this.startLoop(cb);
    });
  }

  /**
   * Handles a data message.
   *
   * @return {(Error|undefined)} A possible error
   * @private
   */
  dataMessage() {
    if (this._fin) {
      const messageLength = this._messageLength;
      const fragments = this._fragments;

      this._totalPayloadLength = 0;
      this._messageLength = 0;
      this._fragmented = 0;
      this._fragments = [];

      if (this._opcode === 2) {
        let data;

        if (this._binaryType === 'nodebuffer') {
          data = concat(fragments, messageLength);
        } else if (this._binaryType === 'arraybuffer') {
          data = toArrayBuffer(concat(fragments, messageLength));
        } else {
          data = fragments;
        }

        this.emit('message', data, true);
      } else {
        const buf = concat(fragments, messageLength);

        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
          this._loop = false;
          return error(
            Error,
            'invalid UTF-8 sequence',
            true,
            1007,
            'WS_ERR_INVALID_UTF8'
          );
        }

        this.emit('message', buf, false);
      }
    }

    this._state = GET_INFO;
  }

  /**
   * Handles a control message.
   *
   * @param {Buffer} data Data to handle
   * @return {(Error|RangeError|undefined)} A possible error
   * @private
   */
  controlMessage(data) {
    if (this._opcode === 0x08) {
      this._loop = false;

      if (data.length === 0) {
        this.emit('conclude', 1005, EMPTY_BUFFER);
        this.end();
      } else {
        const code = data.readUInt16BE(0);

        if (!isValidStatusCode(code)) {
          return error(
            RangeError,
            `invalid status code ${code}`,
            true,
            1002,
            'WS_ERR_INVALID_CLOSE_CODE'
          );
        }

        const buf = new FastBuffer(
          data.buffer,
          data.byteOffset + 2,
          data.length - 2
        );

        if (!this._skipUTF8Validation && !isValidUTF8(buf)) {
          return error(
            Error,
            'invalid UTF-8 sequence',
            true,
            1007,
            'WS_ERR_INVALID_UTF8'
          );
        }

        this.emit('conclude', code, buf);
        this.end();
      }
    } else if (this._opcode === 0x09) {
      this.emit('ping', data);
    } else {
      this.emit('pong', data);
    }

    this._state = GET_INFO;
  }
}

module.exports = Receiver;

/**
 * Builds an error object.
 *
 * @param {function(new:Error|RangeError)} ErrorCtor The error constructor
 * @param {String} message The error message
 * @param {Boolean} prefix Specifies whether or not to add a default prefix to
 *     `message`
 * @param {Number} statusCode The status code
 * @param {String} errorCode The exposed error code
 * @return {(Error|RangeError)} The error
 * @private
 */
function error(ErrorCtor, message, prefix, statusCode, errorCode) {
  const err = new ErrorCtor(
    prefix ? `Invalid WebSocket frame: ${message}` : message
  );

  Error.captureStackTrace(err, error);
  err.code = errorCode;
  err[kStatusCode] = statusCode;
  return err;
}


/***/ }),

/***/ "./node_modules/ws/lib/sender.js":
/*!***************************************!*\
  !*** ./node_modules/ws/lib/sender.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^net|tls$" }] */



const net = __webpack_require__(/*! net */ "net");
const tls = __webpack_require__(/*! tls */ "tls");
const { randomFillSync } = __webpack_require__(/*! crypto */ "crypto");

const PerMessageDeflate = __webpack_require__(/*! ./permessage-deflate */ "./node_modules/ws/lib/permessage-deflate.js");
const { EMPTY_BUFFER } = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");
const { isValidStatusCode } = __webpack_require__(/*! ./validation */ "./node_modules/ws/lib/validation.js");
const { mask: applyMask, toBuffer } = __webpack_require__(/*! ./buffer-util */ "./node_modules/ws/lib/buffer-util.js");

const kByteLength = Symbol('kByteLength');
const maskBuffer = Buffer.alloc(4);

/**
 * HyBi Sender implementation.
 */
class Sender {
  /**
   * Creates a Sender instance.
   *
   * @param {(net.Socket|tls.Socket)} socket The connection socket
   * @param {Object} [extensions] An object containing the negotiated extensions
   * @param {Function} [generateMask] The function used to generate the masking
   *     key
   */
  constructor(socket, extensions, generateMask) {
    this._extensions = extensions || {};

    if (generateMask) {
      this._generateMask = generateMask;
      this._maskBuffer = Buffer.alloc(4);
    }

    this._socket = socket;

    this._firstFragment = true;
    this._compress = false;

    this._bufferedBytes = 0;
    this._deflating = false;
    this._queue = [];
  }

  /**
   * Frames a piece of data according to the HyBi WebSocket protocol.
   *
   * @param {(Buffer|String)} data The data to frame
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @return {(Buffer|String)[]} The framed data
   * @public
   */
  static frame(data, options) {
    let mask;
    let merge = false;
    let offset = 2;
    let skipMasking = false;

    if (options.mask) {
      mask = options.maskBuffer || maskBuffer;

      if (options.generateMask) {
        options.generateMask(mask);
      } else {
        randomFillSync(mask, 0, 4);
      }

      skipMasking = (mask[0] | mask[1] | mask[2] | mask[3]) === 0;
      offset = 6;
    }

    let dataLength;

    if (typeof data === 'string') {
      if (
        (!options.mask || skipMasking) &&
        options[kByteLength] !== undefined
      ) {
        dataLength = options[kByteLength];
      } else {
        data = Buffer.from(data);
        dataLength = data.length;
      }
    } else {
      dataLength = data.length;
      merge = options.mask && options.readOnly && !skipMasking;
    }

    let payloadLength = dataLength;

    if (dataLength >= 65536) {
      offset += 8;
      payloadLength = 127;
    } else if (dataLength > 125) {
      offset += 2;
      payloadLength = 126;
    }

    const target = Buffer.allocUnsafe(merge ? dataLength + offset : offset);

    target[0] = options.fin ? options.opcode | 0x80 : options.opcode;
    if (options.rsv1) target[0] |= 0x40;

    target[1] = payloadLength;

    if (payloadLength === 126) {
      target.writeUInt16BE(dataLength, 2);
    } else if (payloadLength === 127) {
      target[2] = target[3] = 0;
      target.writeUIntBE(dataLength, 4, 6);
    }

    if (!options.mask) return [target, data];

    target[1] |= 0x80;
    target[offset - 4] = mask[0];
    target[offset - 3] = mask[1];
    target[offset - 2] = mask[2];
    target[offset - 1] = mask[3];

    if (skipMasking) return [target, data];

    if (merge) {
      applyMask(data, mask, target, offset, dataLength);
      return [target];
    }

    applyMask(data, mask, data, 0, dataLength);
    return [target, data];
  }

  /**
   * Sends a close message to the other peer.
   *
   * @param {Number} [code] The status code component of the body
   * @param {(String|Buffer)} [data] The message component of the body
   * @param {Boolean} [mask=false] Specifies whether or not to mask the message
   * @param {Function} [cb] Callback
   * @public
   */
  close(code, data, mask, cb) {
    let buf;

    if (code === undefined) {
      buf = EMPTY_BUFFER;
    } else if (typeof code !== 'number' || !isValidStatusCode(code)) {
      throw new TypeError('First argument must be a valid error code number');
    } else if (data === undefined || !data.length) {
      buf = Buffer.allocUnsafe(2);
      buf.writeUInt16BE(code, 0);
    } else {
      const length = Buffer.byteLength(data);

      if (length > 123) {
        throw new RangeError('The message must not be greater than 123 bytes');
      }

      buf = Buffer.allocUnsafe(2 + length);
      buf.writeUInt16BE(code, 0);

      if (typeof data === 'string') {
        buf.write(data, 2);
      } else {
        buf.set(data, 2);
      }
    }

    const options = {
      [kByteLength]: buf.length,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x08,
      readOnly: false,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, buf, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(buf, options), cb);
    }
  }

  /**
   * Sends a ping message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  ping(data, mask, cb) {
    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer(data);
      byteLength = data.length;
      readOnly = toBuffer.readOnly;
    }

    if (byteLength > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    const options = {
      [kByteLength]: byteLength,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x09,
      readOnly,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, data, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(data, options), cb);
    }
  }

  /**
   * Sends a pong message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Boolean} [mask=false] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback
   * @public
   */
  pong(data, mask, cb) {
    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer(data);
      byteLength = data.length;
      readOnly = toBuffer.readOnly;
    }

    if (byteLength > 125) {
      throw new RangeError('The data size must not be greater than 125 bytes');
    }

    const options = {
      [kByteLength]: byteLength,
      fin: true,
      generateMask: this._generateMask,
      mask,
      maskBuffer: this._maskBuffer,
      opcode: 0x0a,
      readOnly,
      rsv1: false
    };

    if (this._deflating) {
      this.enqueue([this.dispatch, data, false, options, cb]);
    } else {
      this.sendFrame(Sender.frame(data, options), cb);
    }
  }

  /**
   * Sends a data message to the other peer.
   *
   * @param {*} data The message to send
   * @param {Object} options Options object
   * @param {Boolean} [options.binary=false] Specifies whether `data` is binary
   *     or text
   * @param {Boolean} [options.compress=false] Specifies whether or not to
   *     compress `data`
   * @param {Boolean} [options.fin=false] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Function} [cb] Callback
   * @public
   */
  send(data, options, cb) {
    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];
    let opcode = options.binary ? 2 : 1;
    let rsv1 = options.compress;

    let byteLength;
    let readOnly;

    if (typeof data === 'string') {
      byteLength = Buffer.byteLength(data);
      readOnly = false;
    } else {
      data = toBuffer(data);
      byteLength = data.length;
      readOnly = toBuffer.readOnly;
    }

    if (this._firstFragment) {
      this._firstFragment = false;
      if (
        rsv1 &&
        perMessageDeflate &&
        perMessageDeflate.params[
          perMessageDeflate._isServer
            ? 'server_no_context_takeover'
            : 'client_no_context_takeover'
        ]
      ) {
        rsv1 = byteLength >= perMessageDeflate._threshold;
      }
      this._compress = rsv1;
    } else {
      rsv1 = false;
      opcode = 0;
    }

    if (options.fin) this._firstFragment = true;

    if (perMessageDeflate) {
      const opts = {
        [kByteLength]: byteLength,
        fin: options.fin,
        generateMask: this._generateMask,
        mask: options.mask,
        maskBuffer: this._maskBuffer,
        opcode,
        readOnly,
        rsv1
      };

      if (this._deflating) {
        this.enqueue([this.dispatch, data, this._compress, opts, cb]);
      } else {
        this.dispatch(data, this._compress, opts, cb);
      }
    } else {
      this.sendFrame(
        Sender.frame(data, {
          [kByteLength]: byteLength,
          fin: options.fin,
          generateMask: this._generateMask,
          mask: options.mask,
          maskBuffer: this._maskBuffer,
          opcode,
          readOnly,
          rsv1: false
        }),
        cb
      );
    }
  }

  /**
   * Dispatches a message.
   *
   * @param {(Buffer|String)} data The message to send
   * @param {Boolean} [compress=false] Specifies whether or not to compress
   *     `data`
   * @param {Object} options Options object
   * @param {Boolean} [options.fin=false] Specifies whether or not to set the
   *     FIN bit
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Boolean} [options.mask=false] Specifies whether or not to mask
   *     `data`
   * @param {Buffer} [options.maskBuffer] The buffer used to store the masking
   *     key
   * @param {Number} options.opcode The opcode
   * @param {Boolean} [options.readOnly=false] Specifies whether `data` can be
   *     modified
   * @param {Boolean} [options.rsv1=false] Specifies whether or not to set the
   *     RSV1 bit
   * @param {Function} [cb] Callback
   * @private
   */
  dispatch(data, compress, options, cb) {
    if (!compress) {
      this.sendFrame(Sender.frame(data, options), cb);
      return;
    }

    const perMessageDeflate = this._extensions[PerMessageDeflate.extensionName];

    this._bufferedBytes += options[kByteLength];
    this._deflating = true;
    perMessageDeflate.compress(data, options.fin, (_, buf) => {
      if (this._socket.destroyed) {
        const err = new Error(
          'The socket was closed while data was being compressed'
        );

        if (typeof cb === 'function') cb(err);

        for (let i = 0; i < this._queue.length; i++) {
          const params = this._queue[i];
          const callback = params[params.length - 1];

          if (typeof callback === 'function') callback(err);
        }

        return;
      }

      this._bufferedBytes -= options[kByteLength];
      this._deflating = false;
      options.readOnly = false;
      this.sendFrame(Sender.frame(buf, options), cb);
      this.dequeue();
    });
  }

  /**
   * Executes queued send operations.
   *
   * @private
   */
  dequeue() {
    while (!this._deflating && this._queue.length) {
      const params = this._queue.shift();

      this._bufferedBytes -= params[3][kByteLength];
      Reflect.apply(params[0], this, params.slice(1));
    }
  }

  /**
   * Enqueues a send operation.
   *
   * @param {Array} params Send operation parameters.
   * @private
   */
  enqueue(params) {
    this._bufferedBytes += params[3][kByteLength];
    this._queue.push(params);
  }

  /**
   * Sends a frame.
   *
   * @param {Buffer[]} list The frame to send
   * @param {Function} [cb] Callback
   * @private
   */
  sendFrame(list, cb) {
    if (list.length === 2) {
      this._socket.cork();
      this._socket.write(list[0]);
      this._socket.write(list[1], cb);
      this._socket.uncork();
    } else {
      this._socket.write(list[0], cb);
    }
  }
}

module.exports = Sender;


/***/ }),

/***/ "./node_modules/ws/lib/stream.js":
/*!***************************************!*\
  !*** ./node_modules/ws/lib/stream.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const { Duplex } = __webpack_require__(/*! stream */ "stream");

/**
 * Emits the `'close'` event on a stream.
 *
 * @param {Duplex} stream The stream.
 * @private
 */
function emitClose(stream) {
  stream.emit('close');
}

/**
 * The listener of the `'end'` event.
 *
 * @private
 */
function duplexOnEnd() {
  if (!this.destroyed && this._writableState.finished) {
    this.destroy();
  }
}

/**
 * The listener of the `'error'` event.
 *
 * @param {Error} err The error
 * @private
 */
function duplexOnError(err) {
  this.removeListener('error', duplexOnError);
  this.destroy();
  if (this.listenerCount('error') === 0) {
    // Do not suppress the throwing behavior.
    this.emit('error', err);
  }
}

/**
 * Wraps a `WebSocket` in a duplex stream.
 *
 * @param {WebSocket} ws The `WebSocket` to wrap
 * @param {Object} [options] The options for the `Duplex` constructor
 * @return {Duplex} The duplex stream
 * @public
 */
function createWebSocketStream(ws, options) {
  let terminateOnDestroy = true;

  const duplex = new Duplex({
    ...options,
    autoDestroy: false,
    emitClose: false,
    objectMode: false,
    writableObjectMode: false
  });

  ws.on('message', function message(msg, isBinary) {
    const data =
      !isBinary && duplex._readableState.objectMode ? msg.toString() : msg;

    if (!duplex.push(data)) ws.pause();
  });

  ws.once('error', function error(err) {
    if (duplex.destroyed) return;

    // Prevent `ws.terminate()` from being called by `duplex._destroy()`.
    //
    // - If the `'error'` event is emitted before the `'open'` event, then
    //   `ws.terminate()` is a noop as no socket is assigned.
    // - Otherwise, the error is re-emitted by the listener of the `'error'`
    //   event of the `Receiver` object. The listener already closes the
    //   connection by calling `ws.close()`. This allows a close frame to be
    //   sent to the other peer. If `ws.terminate()` is called right after this,
    //   then the close frame might not be sent.
    terminateOnDestroy = false;
    duplex.destroy(err);
  });

  ws.once('close', function close() {
    if (duplex.destroyed) return;

    duplex.push(null);
  });

  duplex._destroy = function (err, callback) {
    if (ws.readyState === ws.CLOSED) {
      callback(err);
      process.nextTick(emitClose, duplex);
      return;
    }

    let called = false;

    ws.once('error', function error(err) {
      called = true;
      callback(err);
    });

    ws.once('close', function close() {
      if (!called) callback(err);
      process.nextTick(emitClose, duplex);
    });

    if (terminateOnDestroy) ws.terminate();
  };

  duplex._final = function (callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._final(callback);
      });
      return;
    }

    // If the value of the `_socket` property is `null` it means that `ws` is a
    // client websocket and the handshake failed. In fact, when this happens, a
    // socket is never assigned to the websocket. Wait for the `'error'` event
    // that will be emitted by the websocket.
    if (ws._socket === null) return;

    if (ws._socket._writableState.finished) {
      callback();
      if (duplex._readableState.endEmitted) duplex.destroy();
    } else {
      ws._socket.once('finish', function finish() {
        // `duplex` is not destroyed here because the `'end'` event will be
        // emitted on `duplex` after this `'finish'` event. The EOF signaling
        // `null` chunk is, in fact, pushed when the websocket emits `'close'`.
        callback();
      });
      ws.close();
    }
  };

  duplex._read = function () {
    if (ws.isPaused) ws.resume();
  };

  duplex._write = function (chunk, encoding, callback) {
    if (ws.readyState === ws.CONNECTING) {
      ws.once('open', function open() {
        duplex._write(chunk, encoding, callback);
      });
      return;
    }

    ws.send(chunk, callback);
  };

  duplex.on('end', duplexOnEnd);
  duplex.on('error', duplexOnError);
  return duplex;
}

module.exports = createWebSocketStream;


/***/ }),

/***/ "./node_modules/ws/lib/subprotocol.js":
/*!********************************************!*\
  !*** ./node_modules/ws/lib/subprotocol.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const { tokenChars } = __webpack_require__(/*! ./validation */ "./node_modules/ws/lib/validation.js");

/**
 * Parses the `Sec-WebSocket-Protocol` header into a set of subprotocol names.
 *
 * @param {String} header The field value of the header
 * @return {Set} The subprotocol names
 * @public
 */
function parse(header) {
  const protocols = new Set();
  let start = -1;
  let end = -1;
  let i = 0;

  for (i; i < header.length; i++) {
    const code = header.charCodeAt(i);

    if (end === -1 && tokenChars[code] === 1) {
      if (start === -1) start = i;
    } else if (
      i !== 0 &&
      (code === 0x20 /* ' ' */ || code === 0x09) /* '\t' */
    ) {
      if (end === -1 && start !== -1) end = i;
    } else if (code === 0x2c /* ',' */) {
      if (start === -1) {
        throw new SyntaxError(`Unexpected character at index ${i}`);
      }

      if (end === -1) end = i;

      const protocol = header.slice(start, end);

      if (protocols.has(protocol)) {
        throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
      }

      protocols.add(protocol);
      start = end = -1;
    } else {
      throw new SyntaxError(`Unexpected character at index ${i}`);
    }
  }

  if (start === -1 || end !== -1) {
    throw new SyntaxError('Unexpected end of input');
  }

  const protocol = header.slice(start, i);

  if (protocols.has(protocol)) {
    throw new SyntaxError(`The "${protocol}" subprotocol is duplicated`);
  }

  protocols.add(protocol);
  return protocols;
}

module.exports = { parse };


/***/ }),

/***/ "./node_modules/ws/lib/validation.js":
/*!*******************************************!*\
  !*** ./node_modules/ws/lib/validation.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const { isUtf8 } = __webpack_require__(/*! buffer */ "buffer");

//
// Allowed token characters:
//
// '!', '#', '$', '%', '&', ''', '*', '+', '-',
// '.', 0-9, A-Z, '^', '_', '`', a-z, '|', '~'
//
// tokenChars[32] === 0 // ' '
// tokenChars[33] === 1 // '!'
// tokenChars[34] === 0 // '"'
// ...
//
// prettier-ignore
const tokenChars = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 0 - 15
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
  0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, // 32 - 47
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, // 48 - 63
  0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, // 80 - 95
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0 // 112 - 127
];

/**
 * Checks if a status code is allowed in a close frame.
 *
 * @param {Number} code The status code
 * @return {Boolean} `true` if the status code is valid, else `false`
 * @public
 */
function isValidStatusCode(code) {
  return (
    (code >= 1000 &&
      code <= 1014 &&
      code !== 1004 &&
      code !== 1005 &&
      code !== 1006) ||
    (code >= 3000 && code <= 4999)
  );
}

/**
 * Checks if a given buffer contains only correct UTF-8.
 * Ported from https://www.cl.cam.ac.uk/%7Emgk25/ucs/utf8_check.c by
 * Markus Kuhn.
 *
 * @param {Buffer} buf The buffer to check
 * @return {Boolean} `true` if `buf` contains only correct UTF-8, else `false`
 * @public
 */
function _isValidUTF8(buf) {
  const len = buf.length;
  let i = 0;

  while (i < len) {
    if ((buf[i] & 0x80) === 0) {
      // 0xxxxxxx
      i++;
    } else if ((buf[i] & 0xe0) === 0xc0) {
      // 110xxxxx 10xxxxxx
      if (
        i + 1 === len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i] & 0xfe) === 0xc0 // Overlong
      ) {
        return false;
      }

      i += 2;
    } else if ((buf[i] & 0xf0) === 0xe0) {
      // 1110xxxx 10xxxxxx 10xxxxxx
      if (
        i + 2 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        (buf[i] === 0xe0 && (buf[i + 1] & 0xe0) === 0x80) || // Overlong
        (buf[i] === 0xed && (buf[i + 1] & 0xe0) === 0xa0) // Surrogate (U+D800 - U+DFFF)
      ) {
        return false;
      }

      i += 3;
    } else if ((buf[i] & 0xf8) === 0xf0) {
      // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
      if (
        i + 3 >= len ||
        (buf[i + 1] & 0xc0) !== 0x80 ||
        (buf[i + 2] & 0xc0) !== 0x80 ||
        (buf[i + 3] & 0xc0) !== 0x80 ||
        (buf[i] === 0xf0 && (buf[i + 1] & 0xf0) === 0x80) || // Overlong
        (buf[i] === 0xf4 && buf[i + 1] > 0x8f) ||
        buf[i] > 0xf4 // > U+10FFFF
      ) {
        return false;
      }

      i += 4;
    } else {
      return false;
    }
  }

  return true;
}

module.exports = {
  isValidStatusCode,
  isValidUTF8: _isValidUTF8,
  tokenChars
};

if (isUtf8) {
  module.exports.isValidUTF8 = function (buf) {
    return buf.length < 24 ? _isValidUTF8(buf) : isUtf8(buf);
  };
} /* istanbul ignore else  */ else if (!process.env.WS_NO_UTF_8_VALIDATE) {
  try {
    const isValidUTF8 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'utf-8-validate'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

    module.exports.isValidUTF8 = function (buf) {
      return buf.length < 32 ? _isValidUTF8(buf) : isValidUTF8(buf);
    };
  } catch (e) {
    // Continue regardless of the error.
  }
}


/***/ }),

/***/ "./node_modules/ws/lib/websocket-server.js":
/*!*************************************************!*\
  !*** ./node_modules/ws/lib/websocket-server.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^net|tls|https$" }] */



const EventEmitter = __webpack_require__(/*! events */ "events");
const http = __webpack_require__(/*! http */ "http");
const https = __webpack_require__(/*! https */ "https");
const net = __webpack_require__(/*! net */ "net");
const tls = __webpack_require__(/*! tls */ "tls");
const { createHash } = __webpack_require__(/*! crypto */ "crypto");

const extension = __webpack_require__(/*! ./extension */ "./node_modules/ws/lib/extension.js");
const PerMessageDeflate = __webpack_require__(/*! ./permessage-deflate */ "./node_modules/ws/lib/permessage-deflate.js");
const subprotocol = __webpack_require__(/*! ./subprotocol */ "./node_modules/ws/lib/subprotocol.js");
const WebSocket = __webpack_require__(/*! ./websocket */ "./node_modules/ws/lib/websocket.js");
const { GUID, kWebSocket } = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");

const keyRegex = /^[+/0-9A-Za-z]{22}==$/;

const RUNNING = 0;
const CLOSING = 1;
const CLOSED = 2;

/**
 * Class representing a WebSocket server.
 *
 * @extends EventEmitter
 */
class WebSocketServer extends EventEmitter {
  /**
   * Create a `WebSocketServer` instance.
   *
   * @param {Object} options Configuration options
   * @param {Number} [options.backlog=511] The maximum length of the queue of
   *     pending connections
   * @param {Boolean} [options.clientTracking=true] Specifies whether or not to
   *     track clients
   * @param {Function} [options.handleProtocols] A hook to handle protocols
   * @param {String} [options.host] The hostname where to bind the server
   * @param {Number} [options.maxPayload=104857600] The maximum allowed message
   *     size
   * @param {Boolean} [options.noServer=false] Enable no server mode
   * @param {String} [options.path] Accept only connections matching this path
   * @param {(Boolean|Object)} [options.perMessageDeflate=false] Enable/disable
   *     permessage-deflate
   * @param {Number} [options.port] The port where to bind the server
   * @param {(http.Server|https.Server)} [options.server] A pre-created HTTP/S
   *     server to use
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @param {Function} [options.verifyClient] A hook to reject connections
   * @param {Function} [options.WebSocket=WebSocket] Specifies the `WebSocket`
   *     class to use. It must be the `WebSocket` class or class that extends it
   * @param {Function} [callback] A listener for the `listening` event
   */
  constructor(options, callback) {
    super();

    options = {
      maxPayload: 100 * 1024 * 1024,
      skipUTF8Validation: false,
      perMessageDeflate: false,
      handleProtocols: null,
      clientTracking: true,
      verifyClient: null,
      noServer: false,
      backlog: null, // use default (511 as implemented in net.js)
      server: null,
      host: null,
      path: null,
      port: null,
      WebSocket,
      ...options
    };

    if (
      (options.port == null && !options.server && !options.noServer) ||
      (options.port != null && (options.server || options.noServer)) ||
      (options.server && options.noServer)
    ) {
      throw new TypeError(
        'One and only one of the "port", "server", or "noServer" options ' +
          'must be specified'
      );
    }

    if (options.port != null) {
      this._server = http.createServer((req, res) => {
        const body = http.STATUS_CODES[426];

        res.writeHead(426, {
          'Content-Length': body.length,
          'Content-Type': 'text/plain'
        });
        res.end(body);
      });
      this._server.listen(
        options.port,
        options.host,
        options.backlog,
        callback
      );
    } else if (options.server) {
      this._server = options.server;
    }

    if (this._server) {
      const emitConnection = this.emit.bind(this, 'connection');

      this._removeListeners = addListeners(this._server, {
        listening: this.emit.bind(this, 'listening'),
        error: this.emit.bind(this, 'error'),
        upgrade: (req, socket, head) => {
          this.handleUpgrade(req, socket, head, emitConnection);
        }
      });
    }

    if (options.perMessageDeflate === true) options.perMessageDeflate = {};
    if (options.clientTracking) {
      this.clients = new Set();
      this._shouldEmitClose = false;
    }

    this.options = options;
    this._state = RUNNING;
  }

  /**
   * Returns the bound address, the address family name, and port of the server
   * as reported by the operating system if listening on an IP socket.
   * If the server is listening on a pipe or UNIX domain socket, the name is
   * returned as a string.
   *
   * @return {(Object|String|null)} The address of the server
   * @public
   */
  address() {
    if (this.options.noServer) {
      throw new Error('The server is operating in "noServer" mode');
    }

    if (!this._server) return null;
    return this._server.address();
  }

  /**
   * Stop the server from accepting new connections and emit the `'close'` event
   * when all existing connections are closed.
   *
   * @param {Function} [cb] A one-time listener for the `'close'` event
   * @public
   */
  close(cb) {
    if (this._state === CLOSED) {
      if (cb) {
        this.once('close', () => {
          cb(new Error('The server is not running'));
        });
      }

      process.nextTick(emitClose, this);
      return;
    }

    if (cb) this.once('close', cb);

    if (this._state === CLOSING) return;
    this._state = CLOSING;

    if (this.options.noServer || this.options.server) {
      if (this._server) {
        this._removeListeners();
        this._removeListeners = this._server = null;
      }

      if (this.clients) {
        if (!this.clients.size) {
          process.nextTick(emitClose, this);
        } else {
          this._shouldEmitClose = true;
        }
      } else {
        process.nextTick(emitClose, this);
      }
    } else {
      const server = this._server;

      this._removeListeners();
      this._removeListeners = this._server = null;

      //
      // The HTTP/S server was created internally. Close it, and rely on its
      // `'close'` event.
      //
      server.close(() => {
        emitClose(this);
      });
    }
  }

  /**
   * See if a given request should be handled by this server instance.
   *
   * @param {http.IncomingMessage} req Request object to inspect
   * @return {Boolean} `true` if the request is valid, else `false`
   * @public
   */
  shouldHandle(req) {
    if (this.options.path) {
      const index = req.url.indexOf('?');
      const pathname = index !== -1 ? req.url.slice(0, index) : req.url;

      if (pathname !== this.options.path) return false;
    }

    return true;
  }

  /**
   * Handle a HTTP Upgrade request.
   *
   * @param {http.IncomingMessage} req The request object
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @public
   */
  handleUpgrade(req, socket, head, cb) {
    socket.on('error', socketOnError);

    const key = req.headers['sec-websocket-key'];
    const version = +req.headers['sec-websocket-version'];

    if (req.method !== 'GET') {
      const message = 'Invalid HTTP method';
      abortHandshakeOrEmitwsClientError(this, req, socket, 405, message);
      return;
    }

    if (req.headers.upgrade.toLowerCase() !== 'websocket') {
      const message = 'Invalid Upgrade header';
      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
      return;
    }

    if (!key || !keyRegex.test(key)) {
      const message = 'Missing or invalid Sec-WebSocket-Key header';
      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
      return;
    }

    if (version !== 8 && version !== 13) {
      const message = 'Missing or invalid Sec-WebSocket-Version header';
      abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
      return;
    }

    if (!this.shouldHandle(req)) {
      abortHandshake(socket, 400);
      return;
    }

    const secWebSocketProtocol = req.headers['sec-websocket-protocol'];
    let protocols = new Set();

    if (secWebSocketProtocol !== undefined) {
      try {
        protocols = subprotocol.parse(secWebSocketProtocol);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Protocol header';
        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
        return;
      }
    }

    const secWebSocketExtensions = req.headers['sec-websocket-extensions'];
    const extensions = {};

    if (
      this.options.perMessageDeflate &&
      secWebSocketExtensions !== undefined
    ) {
      const perMessageDeflate = new PerMessageDeflate(
        this.options.perMessageDeflate,
        true,
        this.options.maxPayload
      );

      try {
        const offers = extension.parse(secWebSocketExtensions);

        if (offers[PerMessageDeflate.extensionName]) {
          perMessageDeflate.accept(offers[PerMessageDeflate.extensionName]);
          extensions[PerMessageDeflate.extensionName] = perMessageDeflate;
        }
      } catch (err) {
        const message =
          'Invalid or unacceptable Sec-WebSocket-Extensions header';
        abortHandshakeOrEmitwsClientError(this, req, socket, 400, message);
        return;
      }
    }

    //
    // Optionally call external client verification handler.
    //
    if (this.options.verifyClient) {
      const info = {
        origin:
          req.headers[`${version === 8 ? 'sec-websocket-origin' : 'origin'}`],
        secure: !!(req.socket.authorized || req.socket.encrypted),
        req
      };

      if (this.options.verifyClient.length === 2) {
        this.options.verifyClient(info, (verified, code, message, headers) => {
          if (!verified) {
            return abortHandshake(socket, code || 401, message, headers);
          }

          this.completeUpgrade(
            extensions,
            key,
            protocols,
            req,
            socket,
            head,
            cb
          );
        });
        return;
      }

      if (!this.options.verifyClient(info)) return abortHandshake(socket, 401);
    }

    this.completeUpgrade(extensions, key, protocols, req, socket, head, cb);
  }

  /**
   * Upgrade the connection to WebSocket.
   *
   * @param {Object} extensions The accepted extensions
   * @param {String} key The value of the `Sec-WebSocket-Key` header
   * @param {Set} protocols The subprotocols
   * @param {http.IncomingMessage} req The request object
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Function} cb Callback
   * @throws {Error} If called more than once with the same socket
   * @private
   */
  completeUpgrade(extensions, key, protocols, req, socket, head, cb) {
    //
    // Destroy the socket if the client has already sent a FIN packet.
    //
    if (!socket.readable || !socket.writable) return socket.destroy();

    if (socket[kWebSocket]) {
      throw new Error(
        'server.handleUpgrade() was called more than once with the same ' +
          'socket, possibly due to a misconfiguration'
      );
    }

    if (this._state > RUNNING) return abortHandshake(socket, 503);

    const digest = createHash('sha1')
      .update(key + GUID)
      .digest('base64');

    const headers = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      `Sec-WebSocket-Accept: ${digest}`
    ];

    const ws = new this.options.WebSocket(null);

    if (protocols.size) {
      //
      // Optionally call external protocol selection handler.
      //
      const protocol = this.options.handleProtocols
        ? this.options.handleProtocols(protocols, req)
        : protocols.values().next().value;

      if (protocol) {
        headers.push(`Sec-WebSocket-Protocol: ${protocol}`);
        ws._protocol = protocol;
      }
    }

    if (extensions[PerMessageDeflate.extensionName]) {
      const params = extensions[PerMessageDeflate.extensionName].params;
      const value = extension.format({
        [PerMessageDeflate.extensionName]: [params]
      });
      headers.push(`Sec-WebSocket-Extensions: ${value}`);
      ws._extensions = extensions;
    }

    //
    // Allow external modification/inspection of handshake headers.
    //
    this.emit('headers', headers, req);

    socket.write(headers.concat('\r\n').join('\r\n'));
    socket.removeListener('error', socketOnError);

    ws.setSocket(socket, head, {
      maxPayload: this.options.maxPayload,
      skipUTF8Validation: this.options.skipUTF8Validation
    });

    if (this.clients) {
      this.clients.add(ws);
      ws.on('close', () => {
        this.clients.delete(ws);

        if (this._shouldEmitClose && !this.clients.size) {
          process.nextTick(emitClose, this);
        }
      });
    }

    cb(ws, req);
  }
}

module.exports = WebSocketServer;

/**
 * Add event listeners on an `EventEmitter` using a map of <event, listener>
 * pairs.
 *
 * @param {EventEmitter} server The event emitter
 * @param {Object.<String, Function>} map The listeners to add
 * @return {Function} A function that will remove the added listeners when
 *     called
 * @private
 */
function addListeners(server, map) {
  for (const event of Object.keys(map)) server.on(event, map[event]);

  return function removeListeners() {
    for (const event of Object.keys(map)) {
      server.removeListener(event, map[event]);
    }
  };
}

/**
 * Emit a `'close'` event on an `EventEmitter`.
 *
 * @param {EventEmitter} server The event emitter
 * @private
 */
function emitClose(server) {
  server._state = CLOSED;
  server.emit('close');
}

/**
 * Handle socket errors.
 *
 * @private
 */
function socketOnError() {
  this.destroy();
}

/**
 * Close the connection when preconditions are not fulfilled.
 *
 * @param {(net.Socket|tls.Socket)} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} [message] The HTTP response body
 * @param {Object} [headers] Additional HTTP response headers
 * @private
 */
function abortHandshake(socket, code, message, headers) {
  //
  // The socket is writable unless the user destroyed or ended it before calling
  // `server.handleUpgrade()` or in the `verifyClient` function, which is a user
  // error. Handling this does not make much sense as the worst that can happen
  // is that some of the data written by the user might be discarded due to the
  // call to `socket.end()` below, which triggers an `'error'` event that in
  // turn causes the socket to be destroyed.
  //
  message = message || http.STATUS_CODES[code];
  headers = {
    Connection: 'close',
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(message),
    ...headers
  };

  socket.once('finish', socket.destroy);

  socket.end(
    `HTTP/1.1 ${code} ${http.STATUS_CODES[code]}\r\n` +
      Object.keys(headers)
        .map((h) => `${h}: ${headers[h]}`)
        .join('\r\n') +
      '\r\n\r\n' +
      message
  );
}

/**
 * Emit a `'wsClientError'` event on a `WebSocketServer` if there is at least
 * one listener for it, otherwise call `abortHandshake()`.
 *
 * @param {WebSocketServer} server The WebSocket server
 * @param {http.IncomingMessage} req The request object
 * @param {(net.Socket|tls.Socket)} socket The socket of the upgrade request
 * @param {Number} code The HTTP response status code
 * @param {String} message The HTTP response body
 * @private
 */
function abortHandshakeOrEmitwsClientError(server, req, socket, code, message) {
  if (server.listenerCount('wsClientError')) {
    const err = new Error(message);
    Error.captureStackTrace(err, abortHandshakeOrEmitwsClientError);

    server.emit('wsClientError', err, socket, req);
  } else {
    abortHandshake(socket, code, message);
  }
}


/***/ }),

/***/ "./node_modules/ws/lib/websocket.js":
/*!******************************************!*\
  !*** ./node_modules/ws/lib/websocket.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "^Readable$" }] */



const EventEmitter = __webpack_require__(/*! events */ "events");
const https = __webpack_require__(/*! https */ "https");
const http = __webpack_require__(/*! http */ "http");
const net = __webpack_require__(/*! net */ "net");
const tls = __webpack_require__(/*! tls */ "tls");
const { randomBytes, createHash } = __webpack_require__(/*! crypto */ "crypto");
const { Readable } = __webpack_require__(/*! stream */ "stream");
const { URL } = __webpack_require__(/*! url */ "url");

const PerMessageDeflate = __webpack_require__(/*! ./permessage-deflate */ "./node_modules/ws/lib/permessage-deflate.js");
const Receiver = __webpack_require__(/*! ./receiver */ "./node_modules/ws/lib/receiver.js");
const Sender = __webpack_require__(/*! ./sender */ "./node_modules/ws/lib/sender.js");
const {
  BINARY_TYPES,
  EMPTY_BUFFER,
  GUID,
  kForOnEventAttribute,
  kListener,
  kStatusCode,
  kWebSocket,
  NOOP
} = __webpack_require__(/*! ./constants */ "./node_modules/ws/lib/constants.js");
const {
  EventTarget: { addEventListener, removeEventListener }
} = __webpack_require__(/*! ./event-target */ "./node_modules/ws/lib/event-target.js");
const { format, parse } = __webpack_require__(/*! ./extension */ "./node_modules/ws/lib/extension.js");
const { toBuffer } = __webpack_require__(/*! ./buffer-util */ "./node_modules/ws/lib/buffer-util.js");

const closeTimeout = 30 * 1000;
const kAborted = Symbol('kAborted');
const protocolVersions = [8, 13];
const readyStates = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
const subprotocolRegex = /^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/;

/**
 * Class representing a WebSocket.
 *
 * @extends EventEmitter
 */
class WebSocket extends EventEmitter {
  /**
   * Create a new `WebSocket`.
   *
   * @param {(String|URL)} address The URL to which to connect
   * @param {(String|String[])} [protocols] The subprotocols
   * @param {Object} [options] Connection options
   */
  constructor(address, protocols, options) {
    super();

    this._binaryType = BINARY_TYPES[0];
    this._closeCode = 1006;
    this._closeFrameReceived = false;
    this._closeFrameSent = false;
    this._closeMessage = EMPTY_BUFFER;
    this._closeTimer = null;
    this._extensions = {};
    this._paused = false;
    this._protocol = '';
    this._readyState = WebSocket.CONNECTING;
    this._receiver = null;
    this._sender = null;
    this._socket = null;

    if (address !== null) {
      this._bufferedAmount = 0;
      this._isServer = false;
      this._redirects = 0;

      if (protocols === undefined) {
        protocols = [];
      } else if (!Array.isArray(protocols)) {
        if (typeof protocols === 'object' && protocols !== null) {
          options = protocols;
          protocols = [];
        } else {
          protocols = [protocols];
        }
      }

      initAsClient(this, address, protocols, options);
    } else {
      this._isServer = true;
    }
  }

  /**
   * This deviates from the WHATWG interface since ws doesn't support the
   * required default "blob" type (instead we define a custom "nodebuffer"
   * type).
   *
   * @type {String}
   */
  get binaryType() {
    return this._binaryType;
  }

  set binaryType(type) {
    if (!BINARY_TYPES.includes(type)) return;

    this._binaryType = type;

    //
    // Allow to change `binaryType` on the fly.
    //
    if (this._receiver) this._receiver._binaryType = type;
  }

  /**
   * @type {Number}
   */
  get bufferedAmount() {
    if (!this._socket) return this._bufferedAmount;

    return this._socket._writableState.length + this._sender._bufferedBytes;
  }

  /**
   * @type {String}
   */
  get extensions() {
    return Object.keys(this._extensions).join();
  }

  /**
   * @type {Boolean}
   */
  get isPaused() {
    return this._paused;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onclose() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onerror() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onopen() {
    return null;
  }

  /**
   * @type {Function}
   */
  /* istanbul ignore next */
  get onmessage() {
    return null;
  }

  /**
   * @type {String}
   */
  get protocol() {
    return this._protocol;
  }

  /**
   * @type {Number}
   */
  get readyState() {
    return this._readyState;
  }

  /**
   * @type {String}
   */
  get url() {
    return this._url;
  }

  /**
   * Set up the socket and the internal resources.
   *
   * @param {(net.Socket|tls.Socket)} socket The network socket between the
   *     server and client
   * @param {Buffer} head The first packet of the upgraded stream
   * @param {Object} options Options object
   * @param {Function} [options.generateMask] The function used to generate the
   *     masking key
   * @param {Number} [options.maxPayload=0] The maximum allowed message size
   * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
   *     not to skip UTF-8 validation for text and close messages
   * @private
   */
  setSocket(socket, head, options) {
    const receiver = new Receiver({
      binaryType: this.binaryType,
      extensions: this._extensions,
      isServer: this._isServer,
      maxPayload: options.maxPayload,
      skipUTF8Validation: options.skipUTF8Validation
    });

    this._sender = new Sender(socket, this._extensions, options.generateMask);
    this._receiver = receiver;
    this._socket = socket;

    receiver[kWebSocket] = this;
    socket[kWebSocket] = this;

    receiver.on('conclude', receiverOnConclude);
    receiver.on('drain', receiverOnDrain);
    receiver.on('error', receiverOnError);
    receiver.on('message', receiverOnMessage);
    receiver.on('ping', receiverOnPing);
    receiver.on('pong', receiverOnPong);

    socket.setTimeout(0);
    socket.setNoDelay();

    if (head.length > 0) socket.unshift(head);

    socket.on('close', socketOnClose);
    socket.on('data', socketOnData);
    socket.on('end', socketOnEnd);
    socket.on('error', socketOnError);

    this._readyState = WebSocket.OPEN;
    this.emit('open');
  }

  /**
   * Emit the `'close'` event.
   *
   * @private
   */
  emitClose() {
    if (!this._socket) {
      this._readyState = WebSocket.CLOSED;
      this.emit('close', this._closeCode, this._closeMessage);
      return;
    }

    if (this._extensions[PerMessageDeflate.extensionName]) {
      this._extensions[PerMessageDeflate.extensionName].cleanup();
    }

    this._receiver.removeAllListeners();
    this._readyState = WebSocket.CLOSED;
    this.emit('close', this._closeCode, this._closeMessage);
  }

  /**
   * Start a closing handshake.
   *
   *          +----------+   +-----------+   +----------+
   *     - - -|ws.close()|-->|close frame|-->|ws.close()|- - -
   *    |     +----------+   +-----------+   +----------+     |
   *          +----------+   +-----------+         |
   * CLOSING  |ws.close()|<--|close frame|<--+-----+       CLOSING
   *          +----------+   +-----------+   |
   *    |           |                        |   +---+        |
   *                +------------------------+-->|fin| - - - -
   *    |         +---+                      |   +---+
   *     - - - - -|fin|<---------------------+
   *              +---+
   *
   * @param {Number} [code] Status code explaining why the connection is closing
   * @param {(String|Buffer)} [data] The reason why the connection is
   *     closing
   * @public
   */
  close(code, data) {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      abortHandshake(this, this._req, msg);
      return;
    }

    if (this.readyState === WebSocket.CLOSING) {
      if (
        this._closeFrameSent &&
        (this._closeFrameReceived || this._receiver._writableState.errorEmitted)
      ) {
        this._socket.end();
      }

      return;
    }

    this._readyState = WebSocket.CLOSING;
    this._sender.close(code, data, !this._isServer, (err) => {
      //
      // This error is handled by the `'error'` listener on the socket. We only
      // want to know if the close frame has been sent here.
      //
      if (err) return;

      this._closeFrameSent = true;

      if (
        this._closeFrameReceived ||
        this._receiver._writableState.errorEmitted
      ) {
        this._socket.end();
      }
    });

    //
    // Specify a timeout for the closing handshake to complete.
    //
    this._closeTimer = setTimeout(
      this._socket.destroy.bind(this._socket),
      closeTimeout
    );
  }

  /**
   * Pause the socket.
   *
   * @public
   */
  pause() {
    if (
      this.readyState === WebSocket.CONNECTING ||
      this.readyState === WebSocket.CLOSED
    ) {
      return;
    }

    this._paused = true;
    this._socket.pause();
  }

  /**
   * Send a ping.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the ping is sent
   * @public
   */
  ping(data, mask, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;
    this._sender.ping(data || EMPTY_BUFFER, mask, cb);
  }

  /**
   * Send a pong.
   *
   * @param {*} [data] The data to send
   * @param {Boolean} [mask] Indicates whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when the pong is sent
   * @public
   */
  pong(data, mask, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof data === 'function') {
      cb = data;
      data = mask = undefined;
    } else if (typeof mask === 'function') {
      cb = mask;
      mask = undefined;
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    if (mask === undefined) mask = !this._isServer;
    this._sender.pong(data || EMPTY_BUFFER, mask, cb);
  }

  /**
   * Resume the socket.
   *
   * @public
   */
  resume() {
    if (
      this.readyState === WebSocket.CONNECTING ||
      this.readyState === WebSocket.CLOSED
    ) {
      return;
    }

    this._paused = false;
    if (!this._receiver._writableState.needDrain) this._socket.resume();
  }

  /**
   * Send a data message.
   *
   * @param {*} data The message to send
   * @param {Object} [options] Options object
   * @param {Boolean} [options.binary] Specifies whether `data` is binary or
   *     text
   * @param {Boolean} [options.compress] Specifies whether or not to compress
   *     `data`
   * @param {Boolean} [options.fin=true] Specifies whether the fragment is the
   *     last one
   * @param {Boolean} [options.mask] Specifies whether or not to mask `data`
   * @param {Function} [cb] Callback which is executed when data is written out
   * @public
   */
  send(data, options, cb) {
    if (this.readyState === WebSocket.CONNECTING) {
      throw new Error('WebSocket is not open: readyState 0 (CONNECTING)');
    }

    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    if (typeof data === 'number') data = data.toString();

    if (this.readyState !== WebSocket.OPEN) {
      sendAfterClose(this, data, cb);
      return;
    }

    const opts = {
      binary: typeof data !== 'string',
      mask: !this._isServer,
      compress: true,
      fin: true,
      ...options
    };

    if (!this._extensions[PerMessageDeflate.extensionName]) {
      opts.compress = false;
    }

    this._sender.send(data || EMPTY_BUFFER, opts, cb);
  }

  /**
   * Forcibly close the connection.
   *
   * @public
   */
  terminate() {
    if (this.readyState === WebSocket.CLOSED) return;
    if (this.readyState === WebSocket.CONNECTING) {
      const msg = 'WebSocket was closed before the connection was established';
      abortHandshake(this, this._req, msg);
      return;
    }

    if (this._socket) {
      this._readyState = WebSocket.CLOSING;
      this._socket.destroy();
    }
  }
}

/**
 * @constant {Number} CONNECTING
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'CONNECTING', {
  enumerable: true,
  value: readyStates.indexOf('CONNECTING')
});

/**
 * @constant {Number} CONNECTING
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'CONNECTING', {
  enumerable: true,
  value: readyStates.indexOf('CONNECTING')
});

/**
 * @constant {Number} OPEN
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'OPEN', {
  enumerable: true,
  value: readyStates.indexOf('OPEN')
});

/**
 * @constant {Number} OPEN
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'OPEN', {
  enumerable: true,
  value: readyStates.indexOf('OPEN')
});

/**
 * @constant {Number} CLOSING
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'CLOSING', {
  enumerable: true,
  value: readyStates.indexOf('CLOSING')
});

/**
 * @constant {Number} CLOSING
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'CLOSING', {
  enumerable: true,
  value: readyStates.indexOf('CLOSING')
});

/**
 * @constant {Number} CLOSED
 * @memberof WebSocket
 */
Object.defineProperty(WebSocket, 'CLOSED', {
  enumerable: true,
  value: readyStates.indexOf('CLOSED')
});

/**
 * @constant {Number} CLOSED
 * @memberof WebSocket.prototype
 */
Object.defineProperty(WebSocket.prototype, 'CLOSED', {
  enumerable: true,
  value: readyStates.indexOf('CLOSED')
});

[
  'binaryType',
  'bufferedAmount',
  'extensions',
  'isPaused',
  'protocol',
  'readyState',
  'url'
].forEach((property) => {
  Object.defineProperty(WebSocket.prototype, property, { enumerable: true });
});

//
// Add the `onopen`, `onerror`, `onclose`, and `onmessage` attributes.
// See https://html.spec.whatwg.org/multipage/comms.html#the-websocket-interface
//
['open', 'error', 'close', 'message'].forEach((method) => {
  Object.defineProperty(WebSocket.prototype, `on${method}`, {
    enumerable: true,
    get() {
      for (const listener of this.listeners(method)) {
        if (listener[kForOnEventAttribute]) return listener[kListener];
      }

      return null;
    },
    set(handler) {
      for (const listener of this.listeners(method)) {
        if (listener[kForOnEventAttribute]) {
          this.removeListener(method, listener);
          break;
        }
      }

      if (typeof handler !== 'function') return;

      this.addEventListener(method, handler, {
        [kForOnEventAttribute]: true
      });
    }
  });
});

WebSocket.prototype.addEventListener = addEventListener;
WebSocket.prototype.removeEventListener = removeEventListener;

module.exports = WebSocket;

/**
 * Initialize a WebSocket client.
 *
 * @param {WebSocket} websocket The client to initialize
 * @param {(String|URL)} address The URL to which to connect
 * @param {Array} protocols The subprotocols
 * @param {Object} [options] Connection options
 * @param {Boolean} [options.followRedirects=false] Whether or not to follow
 *     redirects
 * @param {Function} [options.generateMask] The function used to generate the
 *     masking key
 * @param {Number} [options.handshakeTimeout] Timeout in milliseconds for the
 *     handshake request
 * @param {Number} [options.maxPayload=104857600] The maximum allowed message
 *     size
 * @param {Number} [options.maxRedirects=10] The maximum number of redirects
 *     allowed
 * @param {String} [options.origin] Value of the `Origin` or
 *     `Sec-WebSocket-Origin` header
 * @param {(Boolean|Object)} [options.perMessageDeflate=true] Enable/disable
 *     permessage-deflate
 * @param {Number} [options.protocolVersion=13] Value of the
 *     `Sec-WebSocket-Version` header
 * @param {Boolean} [options.skipUTF8Validation=false] Specifies whether or
 *     not to skip UTF-8 validation for text and close messages
 * @private
 */
function initAsClient(websocket, address, protocols, options) {
  const opts = {
    protocolVersion: protocolVersions[1],
    maxPayload: 100 * 1024 * 1024,
    skipUTF8Validation: false,
    perMessageDeflate: true,
    followRedirects: false,
    maxRedirects: 10,
    ...options,
    createConnection: undefined,
    socketPath: undefined,
    hostname: undefined,
    protocol: undefined,
    timeout: undefined,
    method: 'GET',
    host: undefined,
    path: undefined,
    port: undefined
  };

  if (!protocolVersions.includes(opts.protocolVersion)) {
    throw new RangeError(
      `Unsupported protocol version: ${opts.protocolVersion} ` +
        `(supported versions: ${protocolVersions.join(', ')})`
    );
  }

  let parsedUrl;

  if (address instanceof URL) {
    parsedUrl = address;
    websocket._url = address.href;
  } else {
    try {
      parsedUrl = new URL(address);
    } catch (e) {
      throw new SyntaxError(`Invalid URL: ${address}`);
    }

    websocket._url = address;
  }

  const isSecure = parsedUrl.protocol === 'wss:';
  const isIpcUrl = parsedUrl.protocol === 'ws+unix:';
  let invalidUrlMessage;

  if (parsedUrl.protocol !== 'ws:' && !isSecure && !isIpcUrl) {
    invalidUrlMessage =
      'The URL\'s protocol must be one of "ws:", "wss:", or "ws+unix:"';
  } else if (isIpcUrl && !parsedUrl.pathname) {
    invalidUrlMessage = "The URL's pathname is empty";
  } else if (parsedUrl.hash) {
    invalidUrlMessage = 'The URL contains a fragment identifier';
  }

  if (invalidUrlMessage) {
    const err = new SyntaxError(invalidUrlMessage);

    if (websocket._redirects === 0) {
      throw err;
    } else {
      emitErrorAndClose(websocket, err);
      return;
    }
  }

  const defaultPort = isSecure ? 443 : 80;
  const key = randomBytes(16).toString('base64');
  const request = isSecure ? https.request : http.request;
  const protocolSet = new Set();
  let perMessageDeflate;

  opts.createConnection = isSecure ? tlsConnect : netConnect;
  opts.defaultPort = opts.defaultPort || defaultPort;
  opts.port = parsedUrl.port || defaultPort;
  opts.host = parsedUrl.hostname.startsWith('[')
    ? parsedUrl.hostname.slice(1, -1)
    : parsedUrl.hostname;
  opts.headers = {
    ...opts.headers,
    'Sec-WebSocket-Version': opts.protocolVersion,
    'Sec-WebSocket-Key': key,
    Connection: 'Upgrade',
    Upgrade: 'websocket'
  };
  opts.path = parsedUrl.pathname + parsedUrl.search;
  opts.timeout = opts.handshakeTimeout;

  if (opts.perMessageDeflate) {
    perMessageDeflate = new PerMessageDeflate(
      opts.perMessageDeflate !== true ? opts.perMessageDeflate : {},
      false,
      opts.maxPayload
    );
    opts.headers['Sec-WebSocket-Extensions'] = format({
      [PerMessageDeflate.extensionName]: perMessageDeflate.offer()
    });
  }
  if (protocols.length) {
    for (const protocol of protocols) {
      if (
        typeof protocol !== 'string' ||
        !subprotocolRegex.test(protocol) ||
        protocolSet.has(protocol)
      ) {
        throw new SyntaxError(
          'An invalid or duplicated subprotocol was specified'
        );
      }

      protocolSet.add(protocol);
    }

    opts.headers['Sec-WebSocket-Protocol'] = protocols.join(',');
  }
  if (opts.origin) {
    if (opts.protocolVersion < 13) {
      opts.headers['Sec-WebSocket-Origin'] = opts.origin;
    } else {
      opts.headers.Origin = opts.origin;
    }
  }
  if (parsedUrl.username || parsedUrl.password) {
    opts.auth = `${parsedUrl.username}:${parsedUrl.password}`;
  }

  if (isIpcUrl) {
    const parts = opts.path.split(':');

    opts.socketPath = parts[0];
    opts.path = parts[1];
  }

  let req;

  if (opts.followRedirects) {
    if (websocket._redirects === 0) {
      websocket._originalIpc = isIpcUrl;
      websocket._originalSecure = isSecure;
      websocket._originalHostOrSocketPath = isIpcUrl
        ? opts.socketPath
        : parsedUrl.host;

      const headers = options && options.headers;

      //
      // Shallow copy the user provided options so that headers can be changed
      // without mutating the original object.
      //
      options = { ...options, headers: {} };

      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          options.headers[key.toLowerCase()] = value;
        }
      }
    } else if (websocket.listenerCount('redirect') === 0) {
      const isSameHost = isIpcUrl
        ? websocket._originalIpc
          ? opts.socketPath === websocket._originalHostOrSocketPath
          : false
        : websocket._originalIpc
        ? false
        : parsedUrl.host === websocket._originalHostOrSocketPath;

      if (!isSameHost || (websocket._originalSecure && !isSecure)) {
        //
        // Match curl 7.77.0 behavior and drop the following headers. These
        // headers are also dropped when following a redirect to a subdomain.
        //
        delete opts.headers.authorization;
        delete opts.headers.cookie;

        if (!isSameHost) delete opts.headers.host;

        opts.auth = undefined;
      }
    }

    //
    // Match curl 7.77.0 behavior and make the first `Authorization` header win.
    // If the `Authorization` header is set, then there is nothing to do as it
    // will take precedence.
    //
    if (opts.auth && !options.headers.authorization) {
      options.headers.authorization =
        'Basic ' + Buffer.from(opts.auth).toString('base64');
    }

    req = websocket._req = request(opts);

    if (websocket._redirects) {
      //
      // Unlike what is done for the `'upgrade'` event, no early exit is
      // triggered here if the user calls `websocket.close()` or
      // `websocket.terminate()` from a listener of the `'redirect'` event. This
      // is because the user can also call `request.destroy()` with an error
      // before calling `websocket.close()` or `websocket.terminate()` and this
      // would result in an error being emitted on the `request` object with no
      // `'error'` event listeners attached.
      //
      websocket.emit('redirect', websocket.url, req);
    }
  } else {
    req = websocket._req = request(opts);
  }

  if (opts.timeout) {
    req.on('timeout', () => {
      abortHandshake(websocket, req, 'Opening handshake has timed out');
    });
  }

  req.on('error', (err) => {
    if (req === null || req[kAborted]) return;

    req = websocket._req = null;
    emitErrorAndClose(websocket, err);
  });

  req.on('response', (res) => {
    const location = res.headers.location;
    const statusCode = res.statusCode;

    if (
      location &&
      opts.followRedirects &&
      statusCode >= 300 &&
      statusCode < 400
    ) {
      if (++websocket._redirects > opts.maxRedirects) {
        abortHandshake(websocket, req, 'Maximum redirects exceeded');
        return;
      }

      req.abort();

      let addr;

      try {
        addr = new URL(location, address);
      } catch (e) {
        const err = new SyntaxError(`Invalid URL: ${location}`);
        emitErrorAndClose(websocket, err);
        return;
      }

      initAsClient(websocket, addr, protocols, options);
    } else if (!websocket.emit('unexpected-response', req, res)) {
      abortHandshake(
        websocket,
        req,
        `Unexpected server response: ${res.statusCode}`
      );
    }
  });

  req.on('upgrade', (res, socket, head) => {
    websocket.emit('upgrade', res);

    //
    // The user may have closed the connection from a listener of the
    // `'upgrade'` event.
    //
    if (websocket.readyState !== WebSocket.CONNECTING) return;

    req = websocket._req = null;

    if (res.headers.upgrade.toLowerCase() !== 'websocket') {
      abortHandshake(websocket, socket, 'Invalid Upgrade header');
      return;
    }

    const digest = createHash('sha1')
      .update(key + GUID)
      .digest('base64');

    if (res.headers['sec-websocket-accept'] !== digest) {
      abortHandshake(websocket, socket, 'Invalid Sec-WebSocket-Accept header');
      return;
    }

    const serverProt = res.headers['sec-websocket-protocol'];
    let protError;

    if (serverProt !== undefined) {
      if (!protocolSet.size) {
        protError = 'Server sent a subprotocol but none was requested';
      } else if (!protocolSet.has(serverProt)) {
        protError = 'Server sent an invalid subprotocol';
      }
    } else if (protocolSet.size) {
      protError = 'Server sent no subprotocol';
    }

    if (protError) {
      abortHandshake(websocket, socket, protError);
      return;
    }

    if (serverProt) websocket._protocol = serverProt;

    const secWebSocketExtensions = res.headers['sec-websocket-extensions'];

    if (secWebSocketExtensions !== undefined) {
      if (!perMessageDeflate) {
        const message =
          'Server sent a Sec-WebSocket-Extensions header but no extension ' +
          'was requested';
        abortHandshake(websocket, socket, message);
        return;
      }

      let extensions;

      try {
        extensions = parse(secWebSocketExtensions);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Extensions header';
        abortHandshake(websocket, socket, message);
        return;
      }

      const extensionNames = Object.keys(extensions);

      if (
        extensionNames.length !== 1 ||
        extensionNames[0] !== PerMessageDeflate.extensionName
      ) {
        const message = 'Server indicated an extension that was not requested';
        abortHandshake(websocket, socket, message);
        return;
      }

      try {
        perMessageDeflate.accept(extensions[PerMessageDeflate.extensionName]);
      } catch (err) {
        const message = 'Invalid Sec-WebSocket-Extensions header';
        abortHandshake(websocket, socket, message);
        return;
      }

      websocket._extensions[PerMessageDeflate.extensionName] =
        perMessageDeflate;
    }

    websocket.setSocket(socket, head, {
      generateMask: opts.generateMask,
      maxPayload: opts.maxPayload,
      skipUTF8Validation: opts.skipUTF8Validation
    });
  });

  req.end();
}

/**
 * Emit the `'error'` and `'close'` events.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {Error} The error to emit
 * @private
 */
function emitErrorAndClose(websocket, err) {
  websocket._readyState = WebSocket.CLOSING;
  websocket.emit('error', err);
  websocket.emitClose();
}

/**
 * Create a `net.Socket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {net.Socket} The newly created socket used to start the connection
 * @private
 */
function netConnect(options) {
  options.path = options.socketPath;
  return net.connect(options);
}

/**
 * Create a `tls.TLSSocket` and initiate a connection.
 *
 * @param {Object} options Connection options
 * @return {tls.TLSSocket} The newly created socket used to start the connection
 * @private
 */
function tlsConnect(options) {
  options.path = undefined;

  if (!options.servername && options.servername !== '') {
    options.servername = net.isIP(options.host) ? '' : options.host;
  }

  return tls.connect(options);
}

/**
 * Abort the handshake and emit an error.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {(http.ClientRequest|net.Socket|tls.Socket)} stream The request to
 *     abort or the socket to destroy
 * @param {String} message The error message
 * @private
 */
function abortHandshake(websocket, stream, message) {
  websocket._readyState = WebSocket.CLOSING;

  const err = new Error(message);
  Error.captureStackTrace(err, abortHandshake);

  if (stream.setHeader) {
    stream[kAborted] = true;
    stream.abort();

    if (stream.socket && !stream.socket.destroyed) {
      //
      // On Node.js >= 14.3.0 `request.abort()` does not destroy the socket if
      // called after the request completed. See
      // https://github.com/websockets/ws/issues/1869.
      //
      stream.socket.destroy();
    }

    process.nextTick(emitErrorAndClose, websocket, err);
  } else {
    stream.destroy(err);
    stream.once('error', websocket.emit.bind(websocket, 'error'));
    stream.once('close', websocket.emitClose.bind(websocket));
  }
}

/**
 * Handle cases where the `ping()`, `pong()`, or `send()` methods are called
 * when the `readyState` attribute is `CLOSING` or `CLOSED`.
 *
 * @param {WebSocket} websocket The WebSocket instance
 * @param {*} [data] The data to send
 * @param {Function} [cb] Callback
 * @private
 */
function sendAfterClose(websocket, data, cb) {
  if (data) {
    const length = toBuffer(data).length;

    //
    // The `_bufferedAmount` property is used only when the peer is a client and
    // the opening handshake fails. Under these circumstances, in fact, the
    // `setSocket()` method is not called, so the `_socket` and `_sender`
    // properties are set to `null`.
    //
    if (websocket._socket) websocket._sender._bufferedBytes += length;
    else websocket._bufferedAmount += length;
  }

  if (cb) {
    const err = new Error(
      `WebSocket is not open: readyState ${websocket.readyState} ` +
        `(${readyStates[websocket.readyState]})`
    );
    process.nextTick(cb, err);
  }
}

/**
 * The listener of the `Receiver` `'conclude'` event.
 *
 * @param {Number} code The status code
 * @param {Buffer} reason The reason for closing
 * @private
 */
function receiverOnConclude(code, reason) {
  const websocket = this[kWebSocket];

  websocket._closeFrameReceived = true;
  websocket._closeMessage = reason;
  websocket._closeCode = code;

  if (websocket._socket[kWebSocket] === undefined) return;

  websocket._socket.removeListener('data', socketOnData);
  process.nextTick(resume, websocket._socket);

  if (code === 1005) websocket.close();
  else websocket.close(code, reason);
}

/**
 * The listener of the `Receiver` `'drain'` event.
 *
 * @private
 */
function receiverOnDrain() {
  const websocket = this[kWebSocket];

  if (!websocket.isPaused) websocket._socket.resume();
}

/**
 * The listener of the `Receiver` `'error'` event.
 *
 * @param {(RangeError|Error)} err The emitted error
 * @private
 */
function receiverOnError(err) {
  const websocket = this[kWebSocket];

  if (websocket._socket[kWebSocket] !== undefined) {
    websocket._socket.removeListener('data', socketOnData);

    //
    // On Node.js < 14.0.0 the `'error'` event is emitted synchronously. See
    // https://github.com/websockets/ws/issues/1940.
    //
    process.nextTick(resume, websocket._socket);

    websocket.close(err[kStatusCode]);
  }

  websocket.emit('error', err);
}

/**
 * The listener of the `Receiver` `'finish'` event.
 *
 * @private
 */
function receiverOnFinish() {
  this[kWebSocket].emitClose();
}

/**
 * The listener of the `Receiver` `'message'` event.
 *
 * @param {Buffer|ArrayBuffer|Buffer[])} data The message
 * @param {Boolean} isBinary Specifies whether the message is binary or not
 * @private
 */
function receiverOnMessage(data, isBinary) {
  this[kWebSocket].emit('message', data, isBinary);
}

/**
 * The listener of the `Receiver` `'ping'` event.
 *
 * @param {Buffer} data The data included in the ping frame
 * @private
 */
function receiverOnPing(data) {
  const websocket = this[kWebSocket];

  websocket.pong(data, !websocket._isServer, NOOP);
  websocket.emit('ping', data);
}

/**
 * The listener of the `Receiver` `'pong'` event.
 *
 * @param {Buffer} data The data included in the pong frame
 * @private
 */
function receiverOnPong(data) {
  this[kWebSocket].emit('pong', data);
}

/**
 * Resume a readable stream
 *
 * @param {Readable} stream The readable stream
 * @private
 */
function resume(stream) {
  stream.resume();
}

/**
 * The listener of the `net.Socket` `'close'` event.
 *
 * @private
 */
function socketOnClose() {
  const websocket = this[kWebSocket];

  this.removeListener('close', socketOnClose);
  this.removeListener('data', socketOnData);
  this.removeListener('end', socketOnEnd);

  websocket._readyState = WebSocket.CLOSING;

  let chunk;

  //
  // The close frame might not have been received or the `'end'` event emitted,
  // for example, if the socket was destroyed due to an error. Ensure that the
  // `receiver` stream is closed after writing any remaining buffered data to
  // it. If the readable side of the socket is in flowing mode then there is no
  // buffered data as everything has been already written and `readable.read()`
  // will return `null`. If instead, the socket is paused, any possible buffered
  // data will be read as a single chunk.
  //
  if (
    !this._readableState.endEmitted &&
    !websocket._closeFrameReceived &&
    !websocket._receiver._writableState.errorEmitted &&
    (chunk = websocket._socket.read()) !== null
  ) {
    websocket._receiver.write(chunk);
  }

  websocket._receiver.end();

  this[kWebSocket] = undefined;

  clearTimeout(websocket._closeTimer);

  if (
    websocket._receiver._writableState.finished ||
    websocket._receiver._writableState.errorEmitted
  ) {
    websocket.emitClose();
  } else {
    websocket._receiver.on('error', receiverOnFinish);
    websocket._receiver.on('finish', receiverOnFinish);
  }
}

/**
 * The listener of the `net.Socket` `'data'` event.
 *
 * @param {Buffer} chunk A chunk of data
 * @private
 */
function socketOnData(chunk) {
  if (!this[kWebSocket]._receiver.write(chunk)) {
    this.pause();
  }
}

/**
 * The listener of the `net.Socket` `'end'` event.
 *
 * @private
 */
function socketOnEnd() {
  const websocket = this[kWebSocket];

  websocket._readyState = WebSocket.CLOSING;
  websocket._receiver.end();
  this.end();
}

/**
 * The listener of the `net.Socket` `'error'` event.
 *
 * @private
 */
function socketOnError() {
  const websocket = this[kWebSocket];

  this.removeListener('error', socketOnError);
  this.on('error', NOOP);

  if (websocket) {
    websocket._readyState = WebSocket.CLOSING;
    this.destroy();
  }
}


/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("net");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************************!*\
  !*** ./lib/node/velox.node.ts ***!
  \********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Velox = void 0;
const channel_node_1 = __webpack_require__(/*! ./channel.node */ "./lib/node/channel.node.ts");
const nest_node_1 = __webpack_require__(/*! ./nest.node */ "./lib/node/nest.node.ts");
const interfaces_node_1 = __webpack_require__(/*! ./interfaces.node */ "./lib/node/interfaces.node.ts");
const events_1 = __webpack_require__(/*! events */ "events");
class Velox {
    constructor(socketAddr) {
        this._beacon = new events_1.EventEmitter();
        this._onChannelOpened = (UUID) => console.log(UUID + " Opened");
        this._onChannelClosed = (UUID) => console.log(UUID + " Closed");
        this._activeChannels = new Map();
        this._messageCallbackMap = new Map;
        this._defaultMessageCallback = (cm) => { console.log(cm); };
        const RCMHandler = (message) => {
            this._beacon.emit("RCM", { CM: message });
        };
        const SNMHandler = (message) => {
            this._beacon.emit("SNM", { SNM: message });
        };
        const RNMHandler = (message) => {
            this._beacon.emit("RNM", { RNM: message });
        };
        const CMUHandler = (message) => {
            this._beacon.emit("CMU", { CMU: message });
        };
        this._beacon.on("RNM", (event) => {
            const message = event.RNM;
            if (message.Type == interfaces_node_1.RecievableNestMessageType.Initial) {
                this._UUID = message.UUID;
            }
            else if (message.Type == interfaces_node_1.RecievableNestMessageType.StartHandshake || message.Type == interfaces_node_1.RecievableNestMessageType.Offer) {
                this._activeChannels.set(message.UUID, new channel_node_1.Channel(SNMHandler, RCMHandler, CMUHandler));
                this._beacon.on(message.UUID, (event) => {
                    this._activeChannels.get(message.UUID).RNMProcessor(event.RNM);
                });
                this._beacon.emit(message.UUID, { RNM: message });
            }
            else if (message.UUID != null) {
                this._beacon.emit(message.UUID, { RNM: message });
            }
        });
        this._beacon.on("SNM", (event) => {
            const message = event.SNM;
            if (message.UUID == null) {
                this._nest.SNMProcessor(Object.assign(Object.assign({}, message), { UUID: this._UUID }));
            }
            else {
                this._nest.SNMProcessor(message);
            }
        });
        this._beacon.on("RCM", (event) => {
            const message = event.CM;
            const f = this._messageCallbackMap.get(message.Type);
            if (f == undefined) {
                this._defaultMessageCallback(message);
            }
            else {
                f(message);
            }
        });
        this._beacon.on("CMU", (event) => {
            const message = event.CMU;
            if (message.Update == "Opened") {
                this._onChannelOpened(message.Peer);
            }
            else if (message.Update == "Closed") {
                this._onChannelClosed(message.Peer);
            }
        });
        this._nest = new nest_node_1.Nest(socketAddr, RNMHandler);
    }
    connect(networkID) {
        const message = { Type: interfaces_node_1.SendableNestMessageType.Initial, Other: networkID };
        const x = setInterval(() => {
            if (this._nest.isActive()) {
                this._beacon.emit("SNM", { SNM: message });
                clearInterval(x);
            }
        }, 10);
    }
    registerMessage(type, callback) {
        this._messageCallbackMap[type] = callback;
    }
    registerDefault(callback) {
        this._defaultMessageCallback = callback;
    }
    onchannelopen(callback) {
        this._onChannelOpened = callback;
    }
    onchannelclose(callback) {
        this._onChannelClosed = callback;
    }
    send(cm, users) {
        if (users == undefined || users.length == 0) {
            for (const [key, channel] of this._activeChannels.entries()) {
                channel.SCMProcessor(cm);
            }
        }
        else {
            for (const user of users) {
                const channel = this._activeChannels.get(user);
                channel.SCMProcessor(cm);
            }
        }
    }
}
exports.Velox = Velox;

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNyQixhQUFhLGtCQUFrQjtBQUMvQjtBQUNBLGFBQWEsU0FBUztBQUN0QjtBQUNBLGFBQWEsUUFBUTtBQUNyQjtBQUNBLGFBQWEsa0JBQWtCO0FBQy9CO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCLGNBQWMsUUFBUTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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OztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsd0JBQXdCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGFBQWE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxvQkFBb0I7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsYUFBYTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyx3QkFBd0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsd0JBQXdCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyx3QkFBd0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkIsY0FBYyw4QkFBOEI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxVQUFV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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsc0JBQXNCO0FBQ25DLGNBQWMsU0FBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsc0JBQXNCO0FBQ25DLGFBQWEseUJBQXlCO0FBQ3RDO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsa0RBQWtEO0FBQzNFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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QUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFFBQVE7QUFDckIsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEdBQUc7QUFDaEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxHQUFHO0FBQ2hCLGFBQWEsU0FBUztBQUN0QixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxHQUFHO0FBQ2hCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFNBQVM7QUFDdEI7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQSxhQUFhLFNBQVM7QUFDdEIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxrQkFBa0I7QUFDM0UsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELE9BQU87QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFdBQVc7QUFDdEIsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsT0FBTztBQUNsQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsV0FBVyxrQkFBa0I7QUFDN0I7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVDQUF1QyxzQkFBc0I7QUFDN0QsZ0NBQWdDLDRCQUE0QjtBQUM1RDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsTUFBTTtBQUNOLDRDQUE0QyxRQUFRO0FBQ3BEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUVBQW1FO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUIsR0FBRyxtQkFBbUI7QUFDNUQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FB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NENBQWE7QUFDekMsMEJBQTBCLG1CQUFPLENBQUMsd0RBQW1CO0FBQ3JELGlCQUFpQixtQkFBTyxDQUFDLHNCQUFRO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0EsdUNBQXVDLGFBQWE7QUFDcEQ7QUFDQTtBQUNBLHVDQUF1QyxjQUFjO0FBQ3JEO0FBQ0E7QUFDQSx1Q0FBdUMsY0FBYztBQUNyRDtBQUNBO0FBQ0EsdUNBQXVDLGNBQWM7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsa0RBQWtELGNBQWM7QUFDaEU7QUFDQTtBQUNBLGtEQUFrRCxjQUFjO0FBQ2hFO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRSxjQUFjLGtCQUFrQjtBQUN0RztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBLDJDQUEyQyxjQUFjO0FBQ3pEO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSIsInNvdXJjZXMiOlsid2VicGFjazovL1ZlbG94L3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9WZWxveC8uL2xpYi9ub2RlL2NoYW5uZWwubm9kZS50cyIsIndlYnBhY2s6Ly9WZWxveC8uL2xpYi9ub2RlL2ludGVyZmFjZXMubm9kZS50cyIsIndlYnBhY2s6Ly9WZWxveC8uL2xpYi9ub2RlL25lc3Qubm9kZS50cyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy93cy9pbmRleC5qcyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy93cy9saWIvYnVmZmVyLXV0aWwuanMiLCJ3ZWJwYWNrOi8vVmVsb3gvLi9ub2RlX21vZHVsZXMvd3MvbGliL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy93cy9saWIvZXZlbnQtdGFyZ2V0LmpzIiwid2VicGFjazovL1ZlbG94Ly4vbm9kZV9tb2R1bGVzL3dzL2xpYi9leHRlbnNpb24uanMiLCJ3ZWJwYWNrOi8vVmVsb3gvLi9ub2RlX21vZHVsZXMvd3MvbGliL2xpbWl0ZXIuanMiLCJ3ZWJwYWNrOi8vVmVsb3gvLi9ub2RlX21vZHVsZXMvd3MvbGliL3Blcm1lc3NhZ2UtZGVmbGF0ZS5qcyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy93cy9saWIvcmVjZWl2ZXIuanMiLCJ3ZWJwYWNrOi8vVmVsb3gvLi9ub2RlX21vZHVsZXMvd3MvbGliL3NlbmRlci5qcyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy93cy9saWIvc3RyZWFtLmpzIiwid2VicGFjazovL1ZlbG94Ly4vbm9kZV9tb2R1bGVzL3dzL2xpYi9zdWJwcm90b2NvbC5qcyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy93cy9saWIvdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy93cy9saWIvd2Vic29ja2V0LXNlcnZlci5qcyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy93cy9saWIvd2Vic29ja2V0LmpzIiwid2VicGFjazovL1ZlbG94L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJidWZmZXJcIiIsIndlYnBhY2s6Ly9WZWxveC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vVmVsb3gvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImV2ZW50c1wiIiwid2VicGFjazovL1ZlbG94L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vVmVsb3gvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vVmVsb3gvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcIm5ldFwiIiwid2VicGFjazovL1ZlbG94L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJzdHJlYW1cIiIsIndlYnBhY2s6Ly9WZWxveC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwidGxzXCIiLCJ3ZWJwYWNrOi8vVmVsb3gvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInVybFwiIiwid2VicGFjazovL1ZlbG94L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJ6bGliXCIiLCJ3ZWJwYWNrOi8vVmVsb3gvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vVmVsb3gvLi9saWIvbm9kZS92ZWxveC5ub2RlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlZlbG94XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlZlbG94XCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgKCkgPT4ge1xucmV0dXJuICIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQ2hhbm5lbCA9IHZvaWQgMDtcclxuY29uc3QgaW50ZXJmYWNlc19ub2RlXzEgPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzLm5vZGVcIik7XHJcbmNsYXNzIENoYW5uZWwge1xyXG4gICAgY29uc3RydWN0b3IoU05NSGFuZGxlciwgUkNNSGFuZGxlciwgQ01VSGFuZGxlciwgUlRDQ29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5fU0NNUXVldWUgPSBbXTtcclxuICAgICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9TTk1IYW5kbGVyID0gU05NSGFuZGxlcjtcclxuICAgICAgICB0aGlzLl9SQ01IYW5kbGVyID0gUkNNSGFuZGxlcjtcclxuICAgICAgICB0aGlzLl9DTVVIYW5kbGVyID0gQ01VSGFuZGxlcjtcclxuICAgICAgICBpZiAoUlRDQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlZXJDb25uZWN0aW9uID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKFJUQ0NvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9wZWVyQ29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbih7XHJcbiAgICAgICAgICAgICAgICBpY2VTZXJ2ZXJzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmxzOiBcInN0dW46c3R1bi4xLmdvb2dsZS5jb206MTkzMDJcIlxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgU0NNUHJvY2Vzc29yKG1zZykge1xyXG4gICAgICAgIGNvbnN0IG1zZ1N0ciA9IEpTT04uc3RyaW5naWZ5KG1zZyk7XHJcbiAgICAgICAgY29uc3QgYnl0ZXMgPSBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUobXNnU3RyKTtcclxuICAgICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2J5dGVzXSwge1xyXG4gICAgICAgICAgICB0eXBlOiBcImFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOFwiXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYmxvYi5hcnJheUJ1ZmZlcigpLnRoZW4oKGJsb2JEYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFDaGFubmVsLnNlbmQoYmxvYkRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fU0NNUXVldWUucHVzaChtc2cpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBleGVjdXRlU0NNUXVldWUoKSB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX1NDTVF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5TQ01Qcm9jZXNzb3IodGhpcy5fU0NNUXVldWUucG9wKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFJOTVByb2Nlc3NvcihtZXNzYWdlKSB7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2UuVHlwZSA9PSBpbnRlcmZhY2VzX25vZGVfMS5SZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlLlN0YXJ0SGFuZHNoYWtlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlZXJVVUlEID0gbWVzc2FnZS5VVUlEO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhQ2hhbm5lbCA9IHRoaXMuX3BlZXJDb25uZWN0aW9uLmNyZWF0ZURhdGFDaGFubmVsKFwibVwiKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YUNoYW5uZWwuYmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YUNoYW5uZWwub25tZXNzYWdlID0gKGV2KSA9PiB0aGlzLl9vbm1lc3NhZ2VIYW5kbGVyKGV2KTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YUNoYW5uZWwub25vcGVuID0gKGV2KSA9PiB0aGlzLl9vbk9wZW5IYW5kbGVyKGV2KTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YUNoYW5uZWwub25jbG9zZSA9IChldikgPT4gdGhpcy5fb25DbG9zZUhhbmRsZXIoZXYpO1xyXG4gICAgICAgICAgICB0aGlzLl9wZWVyQ29ubmVjdGlvbi5jcmVhdGVPZmZlcigpLnRoZW4oKG9mZmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKG9mZmVyKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBVVUlEOiB0aGlzLl9wZWVyVVVJRCxcclxuICAgICAgICAgICAgICAgICAgICBTRFBPZmZlcjogb2ZmZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgVHlwZTogaW50ZXJmYWNlc19ub2RlXzEuU2VuZGFibGVOZXN0TWVzc2FnZVR5cGUuT2ZmZXJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9TTk1IYW5kbGVyKG1zZyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChtZXNzYWdlLlR5cGUgPT0gaW50ZXJmYWNlc19ub2RlXzEuUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZS5PZmZlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9wZWVyVVVJRCA9IG1lc3NhZ2UuVVVJRDtcclxuICAgICAgICAgICAgdGhpcy5fcGVlckNvbm5lY3Rpb24ub25kYXRhY2hhbm5lbCA9IChldikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YUNoYW5uZWwgPSBldi5jaGFubmVsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YUNoYW5uZWwuYmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFDaGFubmVsLm9ubWVzc2FnZSA9IChldikgPT4gdGhpcy5fb25tZXNzYWdlSGFuZGxlcihldik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhQ2hhbm5lbC5vbm9wZW4gPSAoZXYpID0+IHRoaXMuX29uT3BlbkhhbmRsZXIoZXYpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YUNoYW5uZWwub25jbG9zZSA9IChldikgPT4gdGhpcy5fb25DbG9zZUhhbmRsZXIoZXYpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLl9wZWVyQ29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKG1lc3NhZ2UuU0RQT2ZmZXIpKTtcclxuICAgICAgICAgICAgdGhpcy5fcGVlckNvbm5lY3Rpb24uY3JlYXRlQW5zd2VyKCkudGhlbigoYW5zd2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKGFuc3dlcik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtc2cgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVVVJRDogdGhpcy5fcGVlclVVSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgU0RQT2ZmZXI6IGFuc3dlcixcclxuICAgICAgICAgICAgICAgICAgICBUeXBlOiBpbnRlcmZhY2VzX25vZGVfMS5TZW5kYWJsZU5lc3RNZXNzYWdlVHlwZS5BbnN3ZXJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9TTk1IYW5kbGVyKG1zZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wZWVyQ29ubmVjdGlvbi5vbmljZWNhbmRpZGF0ZSA9ICh7IGNhbmRpZGF0ZSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbXNnID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVVUlEOiB0aGlzLl9wZWVyVVVJRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ2FuZGlkYXRlOiBjYW5kaWRhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR5cGU6IGludGVyZmFjZXNfbm9kZV8xLlNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlLklDRVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fU05NSGFuZGxlcihtc2cpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKG1lc3NhZ2UuVHlwZSA9PSBpbnRlcmZhY2VzX25vZGVfMS5SZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlLkFuc3dlcikge1xyXG4gICAgICAgICAgICB0aGlzLl9wZWVyQ29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKG1lc3NhZ2UuU0RQT2ZmZXIpKTtcclxuICAgICAgICAgICAgdGhpcy5fcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSAoeyBjYW5kaWRhdGUgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbXNnID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFVVSUQ6IHRoaXMuX3BlZXJVVUlELFxyXG4gICAgICAgICAgICAgICAgICAgIENhbmRpZGF0ZTogY2FuZGlkYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIFR5cGU6IGludGVyZmFjZXNfbm9kZV8xLlNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlLklDRVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1NOTUhhbmRsZXIobXNnKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobWVzc2FnZS5UeXBlID09IGludGVyZmFjZXNfbm9kZV8xLlJlY2lldmFibGVOZXN0TWVzc2FnZVR5cGUuSUNFKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlZXJDb25uZWN0aW9uLmFkZEljZUNhbmRpZGF0ZShtZXNzYWdlLkNhbmRpZGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlZmF1bHRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX29uT3BlbkhhbmRsZXIoZXYpIHtcclxuICAgICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IG1ldGFfdXBkYXRlID0geyBQZWVyOiB0aGlzLl9wZWVyVVVJRCwgVXBkYXRlOiBcIk9wZW5lZFwiIH07XHJcbiAgICAgICAgdGhpcy5fQ01VSGFuZGxlcihtZXRhX3VwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5leGVjdXRlU0NNUXVldWUoKTtcclxuICAgIH1cclxuICAgIF9vbm1lc3NhZ2VIYW5kbGVyKGV2KSB7XHJcbiAgICAgICAgY29uc3QganNvblN0cmluZyA9IG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShldi5kYXRhKTtcclxuICAgICAgICBjb25zdCBtc2cgPSBKU09OLnBhcnNlKGpzb25TdHJpbmcpO1xyXG4gICAgICAgIHRoaXMuX1JDTUhhbmRsZXIoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtc2cpLCB7IFVVSUQ6IHRoaXMuX3BlZXJVVUlEIH0pKTtcclxuICAgIH1cclxuICAgIF9vbkNsb3NlSGFuZGxlcihldikge1xyXG4gICAgICAgIGNvbnN0IG1ldGFfdXBkYXRlID0geyBQZWVyOiB0aGlzLl9wZWVyVVVJRCwgVXBkYXRlOiBcIkNsb3NlZFwiIH07XHJcbiAgICAgICAgdGhpcy5fQ01VSGFuZGxlcihtZXRhX3VwZGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5DaGFubmVsID0gQ2hhbm5lbDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5TZW5kYWJsZU5lc3RNZXNzYWdlVHlwZSA9IGV4cG9ydHMuUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZSA9IHZvaWQgMDtcclxudmFyIFJlY2lldmFibGVOZXN0TWVzc2FnZVR5cGU7XHJcbihmdW5jdGlvbiAoUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZSkge1xyXG4gICAgUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZVtcIkluaXRpYWxcIl0gPSBcIklOXCI7XHJcbiAgICBSZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlW1wiU3RhcnRIYW5kc2hha2VcIl0gPSBcIlNIXCI7XHJcbiAgICBSZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlW1wiT2ZmZXJcIl0gPSBcIk9GXCI7XHJcbiAgICBSZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlW1wiQW5zd2VyXCJdID0gXCJBTlwiO1xyXG4gICAgUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZVtcIklDRVwiXSA9IFwiQ1wiO1xyXG59KShSZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlID0gZXhwb3J0cy5SZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlIHx8IChleHBvcnRzLlJlY2lldmFibGVOZXN0TWVzc2FnZVR5cGUgPSB7fSkpO1xyXG52YXIgU2VuZGFibGVOZXN0TWVzc2FnZVR5cGU7XHJcbihmdW5jdGlvbiAoU2VuZGFibGVOZXN0TWVzc2FnZVR5cGUpIHtcclxuICAgIFNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlW1wiSW5pdGlhbFwiXSA9IFwiSU5cIjtcclxuICAgIFNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlW1wiT2ZmZXJcIl0gPSBcIk9GXCI7XHJcbiAgICBTZW5kYWJsZU5lc3RNZXNzYWdlVHlwZVtcIkFuc3dlclwiXSA9IFwiQU5cIjtcclxuICAgIFNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlW1wiSUNFXCJdID0gXCJDXCI7XHJcbn0pKFNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlID0gZXhwb3J0cy5TZW5kYWJsZU5lc3RNZXNzYWdlVHlwZSB8fCAoZXhwb3J0cy5TZW5kYWJsZU5lc3RNZXNzYWdlVHlwZSA9IHt9KSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuTmVzdCA9IHZvaWQgMDtcclxuY29uc3Qgd3NfMSA9IHJlcXVpcmUoXCJ3c1wiKTtcclxuY2xhc3MgTmVzdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb2NrQWRkciwgUk5NSGFuZGxlcikge1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NvY2tBZGRyID0gXCJ3czo0NS4zMy43NC4xNjU6ODAvbmVzdFwiO1xyXG4gICAgICAgIGlmIChzb2NrQWRkciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NvY2tBZGRyID0gc29ja0FkZHI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3dzID0gbmV3IHdzXzEuV2ViU29ja2V0KHRoaXMuX3NvY2tBZGRyKTtcclxuICAgICAgICB0aGlzLl93cy5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3BlbmVkIGNvbm5lY3Rpb24gdG8gbmVzdFwiKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX3dzLm9ubWVzc2FnZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcclxuICAgICAgICAgICAgUk5NSGFuZGxlcihtZXNzYWdlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX3dzLm9uY2xvc2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29ubmVjdGlvbiB3aXRoIHRoZSBuZXN0IGhhcyBiZWVuIGNsb3NlZFwiKTtcclxuICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl93cy5vbmVycm9yID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5fd3MuY2xvc2U7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGlzQWN0aXZlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XHJcbiAgICB9XHJcbiAgICBTTk1Qcm9jZXNzb3IoU05NKSB7XHJcbiAgICAgICAgY29uc3QgZHRhID0gSlNPTi5zdHJpbmdpZnkoU05NKTtcclxuICAgICAgICB0aGlzLl93cy5zZW5kKGR0YSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5OZXN0ID0gTmVzdDtcclxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBXZWJTb2NrZXQgPSByZXF1aXJlKCcuL2xpYi93ZWJzb2NrZXQnKTtcblxuV2ViU29ja2V0LmNyZWF0ZVdlYlNvY2tldFN0cmVhbSA9IHJlcXVpcmUoJy4vbGliL3N0cmVhbScpO1xuV2ViU29ja2V0LlNlcnZlciA9IHJlcXVpcmUoJy4vbGliL3dlYnNvY2tldC1zZXJ2ZXInKTtcbldlYlNvY2tldC5SZWNlaXZlciA9IHJlcXVpcmUoJy4vbGliL3JlY2VpdmVyJyk7XG5XZWJTb2NrZXQuU2VuZGVyID0gcmVxdWlyZSgnLi9saWIvc2VuZGVyJyk7XG5cbldlYlNvY2tldC5XZWJTb2NrZXQgPSBXZWJTb2NrZXQ7XG5XZWJTb2NrZXQuV2ViU29ja2V0U2VydmVyID0gV2ViU29ja2V0LlNlcnZlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBXZWJTb2NrZXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgRU1QVFlfQlVGRkVSIH0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5jb25zdCBGYXN0QnVmZmVyID0gQnVmZmVyW1N5bWJvbC5zcGVjaWVzXTtcblxuLyoqXG4gKiBNZXJnZXMgYW4gYXJyYXkgb2YgYnVmZmVycyBpbnRvIGEgbmV3IGJ1ZmZlci5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcltdfSBsaXN0IFRoZSBhcnJheSBvZiBidWZmZXJzIHRvIGNvbmNhdFxuICogQHBhcmFtIHtOdW1iZXJ9IHRvdGFsTGVuZ3RoIFRoZSB0b3RhbCBsZW5ndGggb2YgYnVmZmVycyBpbiB0aGUgbGlzdFxuICogQHJldHVybiB7QnVmZmVyfSBUaGUgcmVzdWx0aW5nIGJ1ZmZlclxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBjb25jYXQobGlzdCwgdG90YWxMZW5ndGgpIHtcbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSByZXR1cm4gRU1QVFlfQlVGRkVSO1xuICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHJldHVybiBsaXN0WzBdO1xuXG4gIGNvbnN0IHRhcmdldCA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSh0b3RhbExlbmd0aCk7XG4gIGxldCBvZmZzZXQgPSAwO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGJ1ZiA9IGxpc3RbaV07XG4gICAgdGFyZ2V0LnNldChidWYsIG9mZnNldCk7XG4gICAgb2Zmc2V0ICs9IGJ1Zi5sZW5ndGg7XG4gIH1cblxuICBpZiAob2Zmc2V0IDwgdG90YWxMZW5ndGgpIHtcbiAgICByZXR1cm4gbmV3IEZhc3RCdWZmZXIodGFyZ2V0LmJ1ZmZlciwgdGFyZ2V0LmJ5dGVPZmZzZXQsIG9mZnNldCk7XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG4vKipcbiAqIE1hc2tzIGEgYnVmZmVyIHVzaW5nIHRoZSBnaXZlbiBtYXNrLlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBzb3VyY2UgVGhlIGJ1ZmZlciB0byBtYXNrXG4gKiBAcGFyYW0ge0J1ZmZlcn0gbWFzayBUaGUgbWFzayB0byB1c2VcbiAqIEBwYXJhbSB7QnVmZmVyfSBvdXRwdXQgVGhlIGJ1ZmZlciB3aGVyZSB0byBzdG9yZSB0aGUgcmVzdWx0XG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgYXQgd2hpY2ggdG8gc3RhcnQgd3JpdGluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgbnVtYmVyIG9mIGJ5dGVzIHRvIG1hc2suXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIF9tYXNrKHNvdXJjZSwgbWFzaywgb3V0cHV0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgb3V0cHV0W29mZnNldCArIGldID0gc291cmNlW2ldIF4gbWFza1tpICYgM107XG4gIH1cbn1cblxuLyoqXG4gKiBVbm1hc2tzIGEgYnVmZmVyIHVzaW5nIHRoZSBnaXZlbiBtYXNrLlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgVGhlIGJ1ZmZlciB0byB1bm1hc2tcbiAqIEBwYXJhbSB7QnVmZmVyfSBtYXNrIFRoZSBtYXNrIHRvIHVzZVxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBfdW5tYXNrKGJ1ZmZlciwgbWFzaykge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgIGJ1ZmZlcltpXSBePSBtYXNrW2kgJiAzXTtcbiAgfVxufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgYnVmZmVyIHRvIGFuIGBBcnJheUJ1ZmZlcmAuXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZiBUaGUgYnVmZmVyIHRvIGNvbnZlcnRcbiAqIEByZXR1cm4ge0FycmF5QnVmZmVyfSBDb252ZXJ0ZWQgYnVmZmVyXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXlCdWZmZXIoYnVmKSB7XG4gIGlmIChidWYubGVuZ3RoID09PSBidWYuYnVmZmVyLmJ5dGVMZW5ndGgpIHtcbiAgICByZXR1cm4gYnVmLmJ1ZmZlcjtcbiAgfVxuXG4gIHJldHVybiBidWYuYnVmZmVyLnNsaWNlKGJ1Zi5ieXRlT2Zmc2V0LCBidWYuYnl0ZU9mZnNldCArIGJ1Zi5sZW5ndGgpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBkYXRhYCB0byBhIGBCdWZmZXJgLlxuICpcbiAqIEBwYXJhbSB7Kn0gZGF0YSBUaGUgZGF0YSB0byBjb252ZXJ0XG4gKiBAcmV0dXJuIHtCdWZmZXJ9IFRoZSBidWZmZXJcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn1cbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gdG9CdWZmZXIoZGF0YSkge1xuICB0b0J1ZmZlci5yZWFkT25seSA9IHRydWU7XG5cbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihkYXRhKSkgcmV0dXJuIGRhdGE7XG5cbiAgbGV0IGJ1ZjtcblxuICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgYnVmID0gbmV3IEZhc3RCdWZmZXIoZGF0YSk7XG4gIH0gZWxzZSBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KGRhdGEpKSB7XG4gICAgYnVmID0gbmV3IEZhc3RCdWZmZXIoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKTtcbiAgfSBlbHNlIHtcbiAgICBidWYgPSBCdWZmZXIuZnJvbShkYXRhKTtcbiAgICB0b0J1ZmZlci5yZWFkT25seSA9IGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGJ1Zjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbmNhdCxcbiAgbWFzazogX21hc2ssXG4gIHRvQXJyYXlCdWZmZXIsXG4gIHRvQnVmZmVyLFxuICB1bm1hc2s6IF91bm1hc2tcbn07XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICAqL1xuaWYgKCFwcm9jZXNzLmVudi5XU19OT19CVUZGRVJfVVRJTCkge1xuICB0cnkge1xuICAgIGNvbnN0IGJ1ZmZlclV0aWwgPSByZXF1aXJlKCdidWZmZXJ1dGlsJyk7XG5cbiAgICBtb2R1bGUuZXhwb3J0cy5tYXNrID0gZnVuY3Rpb24gKHNvdXJjZSwgbWFzaywgb3V0cHV0LCBvZmZzZXQsIGxlbmd0aCkge1xuICAgICAgaWYgKGxlbmd0aCA8IDQ4KSBfbWFzayhzb3VyY2UsIG1hc2ssIG91dHB1dCwgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgZWxzZSBidWZmZXJVdGlsLm1hc2soc291cmNlLCBtYXNrLCBvdXRwdXQsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICB9O1xuXG4gICAgbW9kdWxlLmV4cG9ydHMudW5tYXNrID0gZnVuY3Rpb24gKGJ1ZmZlciwgbWFzaykge1xuICAgICAgaWYgKGJ1ZmZlci5sZW5ndGggPCAzMikgX3VubWFzayhidWZmZXIsIG1hc2spO1xuICAgICAgZWxzZSBidWZmZXJVdGlsLnVubWFzayhidWZmZXIsIG1hc2spO1xuICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBDb250aW51ZSByZWdhcmRsZXNzIG9mIHRoZSBlcnJvci5cbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgQklOQVJZX1RZUEVTOiBbJ25vZGVidWZmZXInLCAnYXJyYXlidWZmZXInLCAnZnJhZ21lbnRzJ10sXG4gIEVNUFRZX0JVRkZFUjogQnVmZmVyLmFsbG9jKDApLFxuICBHVUlEOiAnMjU4RUFGQTUtRTkxNC00N0RBLTk1Q0EtQzVBQjBEQzg1QjExJyxcbiAga0Zvck9uRXZlbnRBdHRyaWJ1dGU6IFN5bWJvbCgna0lzRm9yT25FdmVudEF0dHJpYnV0ZScpLFxuICBrTGlzdGVuZXI6IFN5bWJvbCgna0xpc3RlbmVyJyksXG4gIGtTdGF0dXNDb2RlOiBTeW1ib2woJ3N0YXR1cy1jb2RlJyksXG4gIGtXZWJTb2NrZXQ6IFN5bWJvbCgnd2Vic29ja2V0JyksXG4gIE5PT1A6ICgpID0+IHt9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB7IGtGb3JPbkV2ZW50QXR0cmlidXRlLCBrTGlzdGVuZXIgfSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbmNvbnN0IGtDb2RlID0gU3ltYm9sKCdrQ29kZScpO1xuY29uc3Qga0RhdGEgPSBTeW1ib2woJ2tEYXRhJyk7XG5jb25zdCBrRXJyb3IgPSBTeW1ib2woJ2tFcnJvcicpO1xuY29uc3Qga01lc3NhZ2UgPSBTeW1ib2woJ2tNZXNzYWdlJyk7XG5jb25zdCBrUmVhc29uID0gU3ltYm9sKCdrUmVhc29uJyk7XG5jb25zdCBrVGFyZ2V0ID0gU3ltYm9sKCdrVGFyZ2V0Jyk7XG5jb25zdCBrVHlwZSA9IFN5bWJvbCgna1R5cGUnKTtcbmNvbnN0IGtXYXNDbGVhbiA9IFN5bWJvbCgna1dhc0NsZWFuJyk7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGFuIGV2ZW50LlxuICovXG5jbGFzcyBFdmVudCB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgYEV2ZW50YC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gSWYgdGhlIGB0eXBlYCBhcmd1bWVudCBpcyBub3Qgc3BlY2lmaWVkXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgdGhpc1trVGFyZ2V0XSA9IG51bGw7XG4gICAgdGhpc1trVHlwZV0gPSB0eXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHsqfVxuICAgKi9cbiAgZ2V0IHRhcmdldCgpIHtcbiAgICByZXR1cm4gdGhpc1trVGFyZ2V0XTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IHR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXNba1R5cGVdO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudC5wcm90b3R5cGUsICd0YXJnZXQnLCB7IGVudW1lcmFibGU6IHRydWUgfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnQucHJvdG90eXBlLCAndHlwZScsIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBjbG9zZSBldmVudC5cbiAqXG4gKiBAZXh0ZW5kcyBFdmVudFxuICovXG5jbGFzcyBDbG9zZUV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGBDbG9zZUV2ZW50YC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gQSBkaWN0aW9uYXJ5IG9iamVjdCB0aGF0IGFsbG93cyBmb3Igc2V0dGluZ1xuICAgKiAgICAgYXR0cmlidXRlcyB2aWEgb2JqZWN0IG1lbWJlcnMgb2YgdGhlIHNhbWUgbmFtZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuY29kZT0wXSBUaGUgc3RhdHVzIGNvZGUgZXhwbGFpbmluZyB3aHkgdGhlXG4gICAqICAgICBjb25uZWN0aW9uIHdhcyBjbG9zZWRcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnJlYXNvbj0nJ10gQSBodW1hbi1yZWFkYWJsZSBzdHJpbmcgZXhwbGFpbmluZyB3aHlcbiAgICogICAgIHRoZSBjb25uZWN0aW9uIHdhcyBjbG9zZWRcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy53YXNDbGVhbj1mYWxzZV0gSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRoZVxuICAgKiAgICAgY29ubmVjdGlvbiB3YXMgY2xlYW5seSBjbG9zZWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKHR5cGUsIG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKHR5cGUpO1xuXG4gICAgdGhpc1trQ29kZV0gPSBvcHRpb25zLmNvZGUgPT09IHVuZGVmaW5lZCA/IDAgOiBvcHRpb25zLmNvZGU7XG4gICAgdGhpc1trUmVhc29uXSA9IG9wdGlvbnMucmVhc29uID09PSB1bmRlZmluZWQgPyAnJyA6IG9wdGlvbnMucmVhc29uO1xuICAgIHRoaXNba1dhc0NsZWFuXSA9IG9wdGlvbnMud2FzQ2xlYW4gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogb3B0aW9ucy53YXNDbGVhbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKi9cbiAgZ2V0IGNvZGUoKSB7XG4gICAgcmV0dXJuIHRoaXNba0NvZGVdO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgcmVhc29uKCkge1xuICAgIHJldHVybiB0aGlzW2tSZWFzb25dO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgZ2V0IHdhc0NsZWFuKCkge1xuICAgIHJldHVybiB0aGlzW2tXYXNDbGVhbl07XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENsb3NlRXZlbnQucHJvdG90eXBlLCAnY29kZScsIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbG9zZUV2ZW50LnByb3RvdHlwZSwgJ3JlYXNvbicsIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDbG9zZUV2ZW50LnByb3RvdHlwZSwgJ3dhc0NsZWFuJywgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhbiBlcnJvciBldmVudC5cbiAqXG4gKiBAZXh0ZW5kcyBFdmVudFxuICovXG5jbGFzcyBFcnJvckV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGBFcnJvckV2ZW50YC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gQSBkaWN0aW9uYXJ5IG9iamVjdCB0aGF0IGFsbG93cyBmb3Igc2V0dGluZ1xuICAgKiAgICAgYXR0cmlidXRlcyB2aWEgb2JqZWN0IG1lbWJlcnMgb2YgdGhlIHNhbWUgbmFtZVxuICAgKiBAcGFyYW0geyp9IFtvcHRpb25zLmVycm9yPW51bGxdIFRoZSBlcnJvciB0aGF0IGdlbmVyYXRlZCB0aGlzIGV2ZW50XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5tZXNzYWdlPScnXSBUaGUgZXJyb3IgbWVzc2FnZVxuICAgKi9cbiAgY29uc3RydWN0b3IodHlwZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIodHlwZSk7XG5cbiAgICB0aGlzW2tFcnJvcl0gPSBvcHRpb25zLmVycm9yID09PSB1bmRlZmluZWQgPyBudWxsIDogb3B0aW9ucy5lcnJvcjtcbiAgICB0aGlzW2tNZXNzYWdlXSA9IG9wdGlvbnMubWVzc2FnZSA9PT0gdW5kZWZpbmVkID8gJycgOiBvcHRpb25zLm1lc3NhZ2U7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUgeyp9XG4gICAqL1xuICBnZXQgZXJyb3IoKSB7XG4gICAgcmV0dXJuIHRoaXNba0Vycm9yXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IG1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXNba01lc3NhZ2VdO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFcnJvckV2ZW50LnByb3RvdHlwZSwgJ2Vycm9yJywgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KEVycm9yRXZlbnQucHJvdG90eXBlLCAnbWVzc2FnZScsIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBtZXNzYWdlIGV2ZW50LlxuICpcbiAqIEBleHRlbmRzIEV2ZW50XG4gKi9cbmNsYXNzIE1lc3NhZ2VFdmVudCBleHRlbmRzIEV2ZW50IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBgTWVzc2FnZUV2ZW50YC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVGhlIG5hbWUgb2YgdGhlIGV2ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gQSBkaWN0aW9uYXJ5IG9iamVjdCB0aGF0IGFsbG93cyBmb3Igc2V0dGluZ1xuICAgKiAgICAgYXR0cmlidXRlcyB2aWEgb2JqZWN0IG1lbWJlcnMgb2YgdGhlIHNhbWUgbmFtZVxuICAgKiBAcGFyYW0geyp9IFtvcHRpb25zLmRhdGE9bnVsbF0gVGhlIG1lc3NhZ2UgY29udGVudFxuICAgKi9cbiAgY29uc3RydWN0b3IodHlwZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIodHlwZSk7XG5cbiAgICB0aGlzW2tEYXRhXSA9IG9wdGlvbnMuZGF0YSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IG9wdGlvbnMuZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7Kn1cbiAgICovXG4gIGdldCBkYXRhKCkge1xuICAgIHJldHVybiB0aGlzW2tEYXRhXTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoTWVzc2FnZUV2ZW50LnByb3RvdHlwZSwgJ2RhdGEnLCB7IGVudW1lcmFibGU6IHRydWUgfSk7XG5cbi8qKlxuICogVGhpcyBwcm92aWRlcyBtZXRob2RzIGZvciBlbXVsYXRpbmcgdGhlIGBFdmVudFRhcmdldGAgaW50ZXJmYWNlLiBJdCdzIG5vdFxuICogbWVhbnQgdG8gYmUgdXNlZCBkaXJlY3RseS5cbiAqXG4gKiBAbWl4aW5cbiAqL1xuY29uc3QgRXZlbnRUYXJnZXQgPSB7XG4gIC8qKlxuICAgKiBSZWdpc3RlciBhbiBldmVudCBsaXN0ZW5lci5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBldmVudCB0eXBlIHRvIGxpc3RlbiBmb3JcbiAgICogQHBhcmFtIHsoRnVuY3Rpb258T2JqZWN0KX0gaGFuZGxlciBUaGUgbGlzdGVuZXIgdG8gYWRkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gQW4gb3B0aW9ucyBvYmplY3Qgc3BlY2lmaWVzIGNoYXJhY3RlcmlzdGljcyBhYm91dFxuICAgKiAgICAgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMub25jZT1mYWxzZV0gQSBgQm9vbGVhbmAgaW5kaWNhdGluZyB0aGF0IHRoZVxuICAgKiAgICAgbGlzdGVuZXIgc2hvdWxkIGJlIGludm9rZWQgYXQgbW9zdCBvbmNlIGFmdGVyIGJlaW5nIGFkZGVkLiBJZiBgdHJ1ZWAsXG4gICAqICAgICB0aGUgbGlzdGVuZXIgd291bGQgYmUgYXV0b21hdGljYWxseSByZW1vdmVkIHdoZW4gaW52b2tlZC5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBvcHRpb25zID0ge30pIHtcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIHRoaXMubGlzdGVuZXJzKHR5cGUpKSB7XG4gICAgICBpZiAoXG4gICAgICAgICFvcHRpb25zW2tGb3JPbkV2ZW50QXR0cmlidXRlXSAmJlxuICAgICAgICBsaXN0ZW5lcltrTGlzdGVuZXJdID09PSBoYW5kbGVyICYmXG4gICAgICAgICFsaXN0ZW5lcltrRm9yT25FdmVudEF0dHJpYnV0ZV1cbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHdyYXBwZXI7XG5cbiAgICBpZiAodHlwZSA9PT0gJ21lc3NhZ2UnKSB7XG4gICAgICB3cmFwcGVyID0gZnVuY3Rpb24gb25NZXNzYWdlKGRhdGEsIGlzQmluYXJ5KSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IE1lc3NhZ2VFdmVudCgnbWVzc2FnZScsIHtcbiAgICAgICAgICBkYXRhOiBpc0JpbmFyeSA/IGRhdGEgOiBkYXRhLnRvU3RyaW5nKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXZlbnRba1RhcmdldF0gPSB0aGlzO1xuICAgICAgICBjYWxsTGlzdGVuZXIoaGFuZGxlciwgdGhpcywgZXZlbnQpO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjbG9zZScpIHtcbiAgICAgIHdyYXBwZXIgPSBmdW5jdGlvbiBvbkNsb3NlKGNvZGUsIG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgQ2xvc2VFdmVudCgnY2xvc2UnLCB7XG4gICAgICAgICAgY29kZSxcbiAgICAgICAgICByZWFzb246IG1lc3NhZ2UudG9TdHJpbmcoKSxcbiAgICAgICAgICB3YXNDbGVhbjogdGhpcy5fY2xvc2VGcmFtZVJlY2VpdmVkICYmIHRoaXMuX2Nsb3NlRnJhbWVTZW50XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV2ZW50W2tUYXJnZXRdID0gdGhpcztcbiAgICAgICAgY2FsbExpc3RlbmVyKGhhbmRsZXIsIHRoaXMsIGV2ZW50KTtcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgICB3cmFwcGVyID0gZnVuY3Rpb24gb25FcnJvcihlcnJvcikge1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBFcnJvckV2ZW50KCdlcnJvcicsIHtcbiAgICAgICAgICBlcnJvcixcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV2ZW50W2tUYXJnZXRdID0gdGhpcztcbiAgICAgICAgY2FsbExpc3RlbmVyKGhhbmRsZXIsIHRoaXMsIGV2ZW50KTtcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb3BlbicpIHtcbiAgICAgIHdyYXBwZXIgPSBmdW5jdGlvbiBvbk9wZW4oKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KCdvcGVuJyk7XG5cbiAgICAgICAgZXZlbnRba1RhcmdldF0gPSB0aGlzO1xuICAgICAgICBjYWxsTGlzdGVuZXIoaGFuZGxlciwgdGhpcywgZXZlbnQpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHdyYXBwZXJba0Zvck9uRXZlbnRBdHRyaWJ1dGVdID0gISFvcHRpb25zW2tGb3JPbkV2ZW50QXR0cmlidXRlXTtcbiAgICB3cmFwcGVyW2tMaXN0ZW5lcl0gPSBoYW5kbGVyO1xuXG4gICAgaWYgKG9wdGlvbnMub25jZSkge1xuICAgICAgdGhpcy5vbmNlKHR5cGUsIHdyYXBwZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9uKHR5cGUsIHdyYXBwZXIpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gcmVtb3ZlXG4gICAqIEBwYXJhbSB7KEZ1bmN0aW9ufE9iamVjdCl9IGhhbmRsZXIgVGhlIGxpc3RlbmVyIHRvIHJlbW92ZVxuICAgKiBAcHVibGljXG4gICAqL1xuICByZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpIHtcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIHRoaXMubGlzdGVuZXJzKHR5cGUpKSB7XG4gICAgICBpZiAobGlzdGVuZXJba0xpc3RlbmVyXSA9PT0gaGFuZGxlciAmJiAhbGlzdGVuZXJba0Zvck9uRXZlbnRBdHRyaWJ1dGVdKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBDbG9zZUV2ZW50LFxuICBFcnJvckV2ZW50LFxuICBFdmVudCxcbiAgRXZlbnRUYXJnZXQsXG4gIE1lc3NhZ2VFdmVudFxufTtcblxuLyoqXG4gKiBDYWxsIGFuIGV2ZW50IGxpc3RlbmVyXG4gKlxuICogQHBhcmFtIHsoRnVuY3Rpb258T2JqZWN0KX0gbGlzdGVuZXIgVGhlIGxpc3RlbmVyIHRvIGNhbGxcbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgdmFsdWUgdG8gdXNlIGFzIGB0aGlzYGAgd2hlbiBjYWxsaW5nIHRoZSBsaXN0ZW5lclxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgVGhlIGV2ZW50IHRvIHBhc3MgdG8gdGhlIGxpc3RlbmVyXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjYWxsTGlzdGVuZXIobGlzdGVuZXIsIHRoaXNBcmcsIGV2ZW50KSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09ICdvYmplY3QnICYmIGxpc3RlbmVyLmhhbmRsZUV2ZW50KSB7XG4gICAgbGlzdGVuZXIuaGFuZGxlRXZlbnQuY2FsbChsaXN0ZW5lciwgZXZlbnQpO1xuICB9IGVsc2Uge1xuICAgIGxpc3RlbmVyLmNhbGwodGhpc0FyZywgZXZlbnQpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgdG9rZW5DaGFycyB9ID0gcmVxdWlyZSgnLi92YWxpZGF0aW9uJyk7XG5cbi8qKlxuICogQWRkcyBhbiBvZmZlciB0byB0aGUgbWFwIG9mIGV4dGVuc2lvbiBvZmZlcnMgb3IgYSBwYXJhbWV0ZXIgdG8gdGhlIG1hcCBvZlxuICogcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVzdCBUaGUgbWFwIG9mIGV4dGVuc2lvbiBvZmZlcnMgb3IgcGFyYW1ldGVyc1xuICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIGV4dGVuc2lvbiBvciBwYXJhbWV0ZXIgbmFtZVxuICogQHBhcmFtIHsoT2JqZWN0fEJvb2xlYW58U3RyaW5nKX0gZWxlbSBUaGUgZXh0ZW5zaW9uIHBhcmFtZXRlcnMgb3IgdGhlXG4gKiAgICAgcGFyYW1ldGVyIHZhbHVlXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwdXNoKGRlc3QsIG5hbWUsIGVsZW0pIHtcbiAgaWYgKGRlc3RbbmFtZV0gPT09IHVuZGVmaW5lZCkgZGVzdFtuYW1lXSA9IFtlbGVtXTtcbiAgZWxzZSBkZXN0W25hbWVdLnB1c2goZWxlbSk7XG59XG5cbi8qKlxuICogUGFyc2VzIHRoZSBgU2VjLVdlYlNvY2tldC1FeHRlbnNpb25zYCBoZWFkZXIgaW50byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlciBUaGUgZmllbGQgdmFsdWUgb2YgdGhlIGhlYWRlclxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcGFyc2VkIG9iamVjdFxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBwYXJzZShoZWFkZXIpIHtcbiAgY29uc3Qgb2ZmZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgbGV0IHBhcmFtcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIGxldCBtdXN0VW5lc2NhcGUgPSBmYWxzZTtcbiAgbGV0IGlzRXNjYXBpbmcgPSBmYWxzZTtcbiAgbGV0IGluUXVvdGVzID0gZmFsc2U7XG4gIGxldCBleHRlbnNpb25OYW1lO1xuICBsZXQgcGFyYW1OYW1lO1xuICBsZXQgc3RhcnQgPSAtMTtcbiAgbGV0IGNvZGUgPSAtMTtcbiAgbGV0IGVuZCA9IC0xO1xuICBsZXQgaSA9IDA7XG5cbiAgZm9yICg7IGkgPCBoZWFkZXIubGVuZ3RoOyBpKyspIHtcbiAgICBjb2RlID0gaGVhZGVyLmNoYXJDb2RlQXQoaSk7XG5cbiAgICBpZiAoZXh0ZW5zaW9uTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoZW5kID09PSAtMSAmJiB0b2tlbkNoYXJzW2NvZGVdID09PSAxKSB7XG4gICAgICAgIGlmIChzdGFydCA9PT0gLTEpIHN0YXJ0ID0gaTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGkgIT09IDAgJiZcbiAgICAgICAgKGNvZGUgPT09IDB4MjAgLyogJyAnICovIHx8IGNvZGUgPT09IDB4MDkpIC8qICdcXHQnICovXG4gICAgICApIHtcbiAgICAgICAgaWYgKGVuZCA9PT0gLTEgJiYgc3RhcnQgIT09IC0xKSBlbmQgPSBpO1xuICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDNiIC8qICc7JyAqLyB8fCBjb2RlID09PSAweDJjIC8qICcsJyAqLykge1xuICAgICAgICBpZiAoc3RhcnQgPT09IC0xKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5kID09PSAtMSkgZW5kID0gaTtcbiAgICAgICAgY29uc3QgbmFtZSA9IGhlYWRlci5zbGljZShzdGFydCwgZW5kKTtcbiAgICAgICAgaWYgKGNvZGUgPT09IDB4MmMpIHtcbiAgICAgICAgICBwdXNoKG9mZmVycywgbmFtZSwgcGFyYW1zKTtcbiAgICAgICAgICBwYXJhbXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4dGVuc2lvbk5hbWUgPSBuYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnQgPSBlbmQgPSAtMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVW5leHBlY3RlZCBjaGFyYWN0ZXIgYXQgaW5kZXggJHtpfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGFyYW1OYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChlbmQgPT09IC0xICYmIHRva2VuQ2hhcnNbY29kZV0gPT09IDEpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkgc3RhcnQgPSBpO1xuICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDIwIHx8IGNvZGUgPT09IDB4MDkpIHtcbiAgICAgICAgaWYgKGVuZCA9PT0gLTEgJiYgc3RhcnQgIT09IC0xKSBlbmQgPSBpO1xuICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDNiIHx8IGNvZGUgPT09IDB4MmMpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkge1xuICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVW5leHBlY3RlZCBjaGFyYWN0ZXIgYXQgaW5kZXggJHtpfWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVuZCA9PT0gLTEpIGVuZCA9IGk7XG4gICAgICAgIHB1c2gocGFyYW1zLCBoZWFkZXIuc2xpY2Uoc3RhcnQsIGVuZCksIHRydWUpO1xuICAgICAgICBpZiAoY29kZSA9PT0gMHgyYykge1xuICAgICAgICAgIHB1c2gob2ZmZXJzLCBleHRlbnNpb25OYW1lLCBwYXJhbXMpO1xuICAgICAgICAgIHBhcmFtcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZXh0ZW5zaW9uTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXJ0ID0gZW5kID0gLTE7XG4gICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4M2QgLyogJz0nICovICYmIHN0YXJ0ICE9PSAtMSAmJiBlbmQgPT09IC0xKSB7XG4gICAgICAgIHBhcmFtTmFtZSA9IGhlYWRlci5zbGljZShzdGFydCwgaSk7XG4gICAgICAgIHN0YXJ0ID0gZW5kID0gLTE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVuZXhwZWN0ZWQgY2hhcmFjdGVyIGF0IGluZGV4ICR7aX1gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy9cbiAgICAgIC8vIFRoZSB2YWx1ZSBvZiBhIHF1b3RlZC1zdHJpbmcgYWZ0ZXIgdW5lc2NhcGluZyBtdXN0IGNvbmZvcm0gdG8gdGhlXG4gICAgICAvLyB0b2tlbiBBQk5GLCBzbyBvbmx5IHRva2VuIGNoYXJhY3RlcnMgYXJlIHZhbGlkLlxuICAgICAgLy8gUmVmOiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjQ1NSNzZWN0aW9uLTkuMVxuICAgICAgLy9cbiAgICAgIGlmIChpc0VzY2FwaW5nKSB7XG4gICAgICAgIGlmICh0b2tlbkNoYXJzW2NvZGVdICE9PSAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkgc3RhcnQgPSBpO1xuICAgICAgICBlbHNlIGlmICghbXVzdFVuZXNjYXBlKSBtdXN0VW5lc2NhcGUgPSB0cnVlO1xuICAgICAgICBpc0VzY2FwaW5nID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKGluUXVvdGVzKSB7XG4gICAgICAgIGlmICh0b2tlbkNoYXJzW2NvZGVdID09PSAxKSB7XG4gICAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkgc3RhcnQgPSBpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4MjIgLyogJ1wiJyAqLyAmJiBzdGFydCAhPT0gLTEpIHtcbiAgICAgICAgICBpblF1b3RlcyA9IGZhbHNlO1xuICAgICAgICAgIGVuZCA9IGk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHg1YyAvKiAnXFwnICovKSB7XG4gICAgICAgICAgaXNFc2NhcGluZyA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHgyMiAmJiBoZWFkZXIuY2hhckNvZGVBdChpIC0gMSkgPT09IDB4M2QpIHtcbiAgICAgICAgaW5RdW90ZXMgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChlbmQgPT09IC0xICYmIHRva2VuQ2hhcnNbY29kZV0gPT09IDEpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkgc3RhcnQgPSBpO1xuICAgICAgfSBlbHNlIGlmIChzdGFydCAhPT0gLTEgJiYgKGNvZGUgPT09IDB4MjAgfHwgY29kZSA9PT0gMHgwOSkpIHtcbiAgICAgICAgaWYgKGVuZCA9PT0gLTEpIGVuZCA9IGk7XG4gICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4M2IgfHwgY29kZSA9PT0gMHgyYykge1xuICAgICAgICBpZiAoc3RhcnQgPT09IC0xKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5kID09PSAtMSkgZW5kID0gaTtcbiAgICAgICAgbGV0IHZhbHVlID0gaGVhZGVyLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgICAgICBpZiAobXVzdFVuZXNjYXBlKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXFxcL2csICcnKTtcbiAgICAgICAgICBtdXN0VW5lc2NhcGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBwdXNoKHBhcmFtcywgcGFyYW1OYW1lLCB2YWx1ZSk7XG4gICAgICAgIGlmIChjb2RlID09PSAweDJjKSB7XG4gICAgICAgICAgcHVzaChvZmZlcnMsIGV4dGVuc2lvbk5hbWUsIHBhcmFtcyk7XG4gICAgICAgICAgcGFyYW1zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBleHRlbnNpb25OYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyYW1OYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICBzdGFydCA9IGVuZCA9IC0xO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSAtMSB8fCBpblF1b3RlcyB8fCBjb2RlID09PSAweDIwIHx8IGNvZGUgPT09IDB4MDkpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1VuZXhwZWN0ZWQgZW5kIG9mIGlucHV0Jyk7XG4gIH1cblxuICBpZiAoZW5kID09PSAtMSkgZW5kID0gaTtcbiAgY29uc3QgdG9rZW4gPSBoZWFkZXIuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gIGlmIChleHRlbnNpb25OYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICBwdXNoKG9mZmVycywgdG9rZW4sIHBhcmFtcyk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHBhcmFtTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBwdXNoKHBhcmFtcywgdG9rZW4sIHRydWUpO1xuICAgIH0gZWxzZSBpZiAobXVzdFVuZXNjYXBlKSB7XG4gICAgICBwdXNoKHBhcmFtcywgcGFyYW1OYW1lLCB0b2tlbi5yZXBsYWNlKC9cXFxcL2csICcnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHB1c2gocGFyYW1zLCBwYXJhbU5hbWUsIHRva2VuKTtcbiAgICB9XG4gICAgcHVzaChvZmZlcnMsIGV4dGVuc2lvbk5hbWUsIHBhcmFtcyk7XG4gIH1cblxuICByZXR1cm4gb2ZmZXJzO1xufVxuXG4vKipcbiAqIEJ1aWxkcyB0aGUgYFNlYy1XZWJTb2NrZXQtRXh0ZW5zaW9uc2AgaGVhZGVyIGZpZWxkIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBleHRlbnNpb25zIFRoZSBtYXAgb2YgZXh0ZW5zaW9ucyBhbmQgcGFyYW1ldGVycyB0byBmb3JtYXRcbiAqIEByZXR1cm4ge1N0cmluZ30gQSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBnaXZlbiBvYmplY3RcbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gZm9ybWF0KGV4dGVuc2lvbnMpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKGV4dGVuc2lvbnMpXG4gICAgLm1hcCgoZXh0ZW5zaW9uKSA9PiB7XG4gICAgICBsZXQgY29uZmlndXJhdGlvbnMgPSBleHRlbnNpb25zW2V4dGVuc2lvbl07XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29uZmlndXJhdGlvbnMpKSBjb25maWd1cmF0aW9ucyA9IFtjb25maWd1cmF0aW9uc107XG4gICAgICByZXR1cm4gY29uZmlndXJhdGlvbnNcbiAgICAgICAgLm1hcCgocGFyYW1zKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIFtleHRlbnNpb25dXG4gICAgICAgICAgICAuY29uY2F0KFxuICAgICAgICAgICAgICBPYmplY3Qua2V5cyhwYXJhbXMpLm1hcCgoaykgPT4ge1xuICAgICAgICAgICAgICAgIGxldCB2YWx1ZXMgPSBwYXJhbXNba107XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlcykpIHZhbHVlcyA9IFt2YWx1ZXNdO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgIC5tYXAoKHYpID0+ICh2ID09PSB0cnVlID8gayA6IGAke2t9PSR7dn1gKSlcbiAgICAgICAgICAgICAgICAgIC5qb2luKCc7ICcpO1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmpvaW4oJzsgJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5qb2luKCcsICcpO1xuICAgIH0pXG4gICAgLmpvaW4oJywgJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBmb3JtYXQsIHBhcnNlIH07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGtEb25lID0gU3ltYm9sKCdrRG9uZScpO1xuY29uc3Qga1J1biA9IFN5bWJvbCgna1J1bicpO1xuXG4vKipcbiAqIEEgdmVyeSBzaW1wbGUgam9iIHF1ZXVlIHdpdGggYWRqdXN0YWJsZSBjb25jdXJyZW5jeS4gQWRhcHRlZCBmcm9tXG4gKiBodHRwczovL2dpdGh1Yi5jb20vU1RSTUwvYXN5bmMtbGltaXRlclxuICovXG5jbGFzcyBMaW1pdGVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgYExpbWl0ZXJgLlxuICAgKlxuICAgKiBAcGFyYW0ge051bWJlcn0gW2NvbmN1cnJlbmN5PUluZmluaXR5XSBUaGUgbWF4aW11bSBudW1iZXIgb2Ygam9icyBhbGxvd2VkXG4gICAqICAgICB0byBydW4gY29uY3VycmVudGx5XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihjb25jdXJyZW5jeSkge1xuICAgIHRoaXNba0RvbmVdID0gKCkgPT4ge1xuICAgICAgdGhpcy5wZW5kaW5nLS07XG4gICAgICB0aGlzW2tSdW5dKCk7XG4gICAgfTtcbiAgICB0aGlzLmNvbmN1cnJlbmN5ID0gY29uY3VycmVuY3kgfHwgSW5maW5pdHk7XG4gICAgdGhpcy5qb2JzID0gW107XG4gICAgdGhpcy5wZW5kaW5nID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgam9iIHRvIHRoZSBxdWV1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gam9iIFRoZSBqb2IgdG8gcnVuXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGFkZChqb2IpIHtcbiAgICB0aGlzLmpvYnMucHVzaChqb2IpO1xuICAgIHRoaXNba1J1bl0oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgam9iIGZyb20gdGhlIHF1ZXVlIGFuZCBydW5zIGl0IGlmIHBvc3NpYmxlLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgW2tSdW5dKCkge1xuICAgIGlmICh0aGlzLnBlbmRpbmcgPT09IHRoaXMuY29uY3VycmVuY3kpIHJldHVybjtcblxuICAgIGlmICh0aGlzLmpvYnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBqb2IgPSB0aGlzLmpvYnMuc2hpZnQoKTtcblxuICAgICAgdGhpcy5wZW5kaW5nKys7XG4gICAgICBqb2IodGhpc1trRG9uZV0pO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExpbWl0ZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHpsaWIgPSByZXF1aXJlKCd6bGliJyk7XG5cbmNvbnN0IGJ1ZmZlclV0aWwgPSByZXF1aXJlKCcuL2J1ZmZlci11dGlsJyk7XG5jb25zdCBMaW1pdGVyID0gcmVxdWlyZSgnLi9saW1pdGVyJyk7XG5jb25zdCB7IGtTdGF0dXNDb2RlIH0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5jb25zdCBGYXN0QnVmZmVyID0gQnVmZmVyW1N5bWJvbC5zcGVjaWVzXTtcbmNvbnN0IFRSQUlMRVIgPSBCdWZmZXIuZnJvbShbMHgwMCwgMHgwMCwgMHhmZiwgMHhmZl0pO1xuY29uc3Qga1Blck1lc3NhZ2VEZWZsYXRlID0gU3ltYm9sKCdwZXJtZXNzYWdlLWRlZmxhdGUnKTtcbmNvbnN0IGtUb3RhbExlbmd0aCA9IFN5bWJvbCgndG90YWwtbGVuZ3RoJyk7XG5jb25zdCBrQ2FsbGJhY2sgPSBTeW1ib2woJ2NhbGxiYWNrJyk7XG5jb25zdCBrQnVmZmVycyA9IFN5bWJvbCgnYnVmZmVycycpO1xuY29uc3Qga0Vycm9yID0gU3ltYm9sKCdlcnJvcicpO1xuXG4vL1xuLy8gV2UgbGltaXQgemxpYiBjb25jdXJyZW5jeSwgd2hpY2ggcHJldmVudHMgc2V2ZXJlIG1lbW9yeSBmcmFnbWVudGF0aW9uXG4vLyBhcyBkb2N1bWVudGVkIGluIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9pc3N1ZXMvODg3MSNpc3N1ZWNvbW1lbnQtMjUwOTE1OTEzXG4vLyBhbmQgaHR0cHM6Ly9naXRodWIuY29tL3dlYnNvY2tldHMvd3MvaXNzdWVzLzEyMDJcbi8vXG4vLyBJbnRlbnRpb25hbGx5IGdsb2JhbDsgaXQncyB0aGUgZ2xvYmFsIHRocmVhZCBwb29sIHRoYXQncyBhbiBpc3N1ZS5cbi8vXG5sZXQgemxpYkxpbWl0ZXI7XG5cbi8qKlxuICogcGVybWVzc2FnZS1kZWZsYXRlIGltcGxlbWVudGF0aW9uLlxuICovXG5jbGFzcyBQZXJNZXNzYWdlRGVmbGF0ZSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUGVyTWVzc2FnZURlZmxhdGUgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gQ29uZmlndXJhdGlvbiBvcHRpb25zXG4gICAqIEBwYXJhbSB7KEJvb2xlYW58TnVtYmVyKX0gW29wdGlvbnMuY2xpZW50TWF4V2luZG93Qml0c10gQWR2ZXJ0aXNlIHN1cHBvcnRcbiAgICogICAgIGZvciwgb3IgcmVxdWVzdCwgYSBjdXN0b20gY2xpZW50IHdpbmRvdyBzaXplXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2xpZW50Tm9Db250ZXh0VGFrZW92ZXI9ZmFsc2VdIEFkdmVydGlzZS9cbiAgICogICAgIGFja25vd2xlZGdlIGRpc2FibGluZyBvZiBjbGllbnQgY29udGV4dCB0YWtlb3ZlclxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuY29uY3VycmVuY3lMaW1pdD0xMF0gVGhlIG51bWJlciBvZiBjb25jdXJyZW50XG4gICAqICAgICBjYWxscyB0byB6bGliXG4gICAqIEBwYXJhbSB7KEJvb2xlYW58TnVtYmVyKX0gW29wdGlvbnMuc2VydmVyTWF4V2luZG93Qml0c10gUmVxdWVzdC9jb25maXJtIHRoZVxuICAgKiAgICAgdXNlIG9mIGEgY3VzdG9tIHNlcnZlciB3aW5kb3cgc2l6ZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnNlcnZlck5vQ29udGV4dFRha2VvdmVyPWZhbHNlXSBSZXF1ZXN0L2FjY2VwdFxuICAgKiAgICAgZGlzYWJsaW5nIG9mIHNlcnZlciBjb250ZXh0IHRha2VvdmVyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy50aHJlc2hvbGQ9MTAyNF0gU2l6ZSAoaW4gYnl0ZXMpIGJlbG93IHdoaWNoXG4gICAqICAgICBtZXNzYWdlcyBzaG91bGQgbm90IGJlIGNvbXByZXNzZWQgaWYgY29udGV4dCB0YWtlb3ZlciBpcyBkaXNhYmxlZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuemxpYkRlZmxhdGVPcHRpb25zXSBPcHRpb25zIHRvIHBhc3MgdG8gemxpYiBvblxuICAgKiAgICAgZGVmbGF0ZVxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMuemxpYkluZmxhdGVPcHRpb25zXSBPcHRpb25zIHRvIHBhc3MgdG8gemxpYiBvblxuICAgKiAgICAgaW5mbGF0ZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtpc1NlcnZlcj1mYWxzZV0gQ3JlYXRlIHRoZSBpbnN0YW5jZSBpbiBlaXRoZXIgc2VydmVyIG9yXG4gICAqICAgICBjbGllbnQgbW9kZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW21heFBheWxvYWQ9MF0gVGhlIG1heGltdW0gYWxsb3dlZCBtZXNzYWdlIGxlbmd0aFxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucywgaXNTZXJ2ZXIsIG1heFBheWxvYWQpIHtcbiAgICB0aGlzLl9tYXhQYXlsb2FkID0gbWF4UGF5bG9hZCB8IDA7XG4gICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgdGhpcy5fdGhyZXNob2xkID1cbiAgICAgIHRoaXMuX29wdGlvbnMudGhyZXNob2xkICE9PSB1bmRlZmluZWQgPyB0aGlzLl9vcHRpb25zLnRocmVzaG9sZCA6IDEwMjQ7XG4gICAgdGhpcy5faXNTZXJ2ZXIgPSAhIWlzU2VydmVyO1xuICAgIHRoaXMuX2RlZmxhdGUgPSBudWxsO1xuICAgIHRoaXMuX2luZmxhdGUgPSBudWxsO1xuXG4gICAgdGhpcy5wYXJhbXMgPSBudWxsO1xuXG4gICAgaWYgKCF6bGliTGltaXRlcikge1xuICAgICAgY29uc3QgY29uY3VycmVuY3kgPVxuICAgICAgICB0aGlzLl9vcHRpb25zLmNvbmN1cnJlbmN5TGltaXQgIT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gdGhpcy5fb3B0aW9ucy5jb25jdXJyZW5jeUxpbWl0XG4gICAgICAgICAgOiAxMDtcbiAgICAgIHpsaWJMaW1pdGVyID0gbmV3IExpbWl0ZXIoY29uY3VycmVuY3kpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIGdldCBleHRlbnNpb25OYW1lKCkge1xuICAgIHJldHVybiAncGVybWVzc2FnZS1kZWZsYXRlJztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gZXh0ZW5zaW9uIG5lZ290aWF0aW9uIG9mZmVyLlxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IEV4dGVuc2lvbiBwYXJhbWV0ZXJzXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIG9mZmVyKCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHt9O1xuXG4gICAgaWYgKHRoaXMuX29wdGlvbnMuc2VydmVyTm9Db250ZXh0VGFrZW92ZXIpIHtcbiAgICAgIHBhcmFtcy5zZXJ2ZXJfbm9fY29udGV4dF90YWtlb3ZlciA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLl9vcHRpb25zLmNsaWVudE5vQ29udGV4dFRha2VvdmVyKSB7XG4gICAgICBwYXJhbXMuY2xpZW50X25vX2NvbnRleHRfdGFrZW92ZXIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fb3B0aW9ucy5zZXJ2ZXJNYXhXaW5kb3dCaXRzKSB7XG4gICAgICBwYXJhbXMuc2VydmVyX21heF93aW5kb3dfYml0cyA9IHRoaXMuX29wdGlvbnMuc2VydmVyTWF4V2luZG93Qml0cztcbiAgICB9XG4gICAgaWYgKHRoaXMuX29wdGlvbnMuY2xpZW50TWF4V2luZG93Qml0cykge1xuICAgICAgcGFyYW1zLmNsaWVudF9tYXhfd2luZG93X2JpdHMgPSB0aGlzLl9vcHRpb25zLmNsaWVudE1heFdpbmRvd0JpdHM7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9vcHRpb25zLmNsaWVudE1heFdpbmRvd0JpdHMgPT0gbnVsbCkge1xuICAgICAgcGFyYW1zLmNsaWVudF9tYXhfd2luZG93X2JpdHMgPSB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0IGFuIGV4dGVuc2lvbiBuZWdvdGlhdGlvbiBvZmZlci9yZXNwb25zZS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gY29uZmlndXJhdGlvbnMgVGhlIGV4dGVuc2lvbiBuZWdvdGlhdGlvbiBvZmZlcnMvcmVwb25zZVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IEFjY2VwdGVkIGNvbmZpZ3VyYXRpb25cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYWNjZXB0KGNvbmZpZ3VyYXRpb25zKSB7XG4gICAgY29uZmlndXJhdGlvbnMgPSB0aGlzLm5vcm1hbGl6ZVBhcmFtcyhjb25maWd1cmF0aW9ucyk7XG5cbiAgICB0aGlzLnBhcmFtcyA9IHRoaXMuX2lzU2VydmVyXG4gICAgICA/IHRoaXMuYWNjZXB0QXNTZXJ2ZXIoY29uZmlndXJhdGlvbnMpXG4gICAgICA6IHRoaXMuYWNjZXB0QXNDbGllbnQoY29uZmlndXJhdGlvbnMpO1xuXG4gICAgcmV0dXJuIHRoaXMucGFyYW1zO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbGVhc2VzIGFsbCByZXNvdXJjZXMgdXNlZCBieSB0aGUgZXh0ZW5zaW9uLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICBjbGVhbnVwKCkge1xuICAgIGlmICh0aGlzLl9pbmZsYXRlKSB7XG4gICAgICB0aGlzLl9pbmZsYXRlLmNsb3NlKCk7XG4gICAgICB0aGlzLl9pbmZsYXRlID0gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZGVmbGF0ZSkge1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSB0aGlzLl9kZWZsYXRlW2tDYWxsYmFja107XG5cbiAgICAgIHRoaXMuX2RlZmxhdGUuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2RlZmxhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2soXG4gICAgICAgICAgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ1RoZSBkZWZsYXRlIHN0cmVhbSB3YXMgY2xvc2VkIHdoaWxlIGRhdGEgd2FzIGJlaW5nIHByb2Nlc3NlZCdcbiAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqICBBY2NlcHQgYW4gZXh0ZW5zaW9uIG5lZ290aWF0aW9uIG9mZmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBvZmZlcnMgVGhlIGV4dGVuc2lvbiBuZWdvdGlhdGlvbiBvZmZlcnNcbiAgICogQHJldHVybiB7T2JqZWN0fSBBY2NlcHRlZCBjb25maWd1cmF0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhY2NlcHRBc1NlcnZlcihvZmZlcnMpIHtcbiAgICBjb25zdCBvcHRzID0gdGhpcy5fb3B0aW9ucztcbiAgICBjb25zdCBhY2NlcHRlZCA9IG9mZmVycy5maW5kKChwYXJhbXMpID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgKG9wdHMuc2VydmVyTm9Db250ZXh0VGFrZW92ZXIgPT09IGZhbHNlICYmXG4gICAgICAgICAgcGFyYW1zLnNlcnZlcl9ub19jb250ZXh0X3Rha2VvdmVyKSB8fFxuICAgICAgICAocGFyYW1zLnNlcnZlcl9tYXhfd2luZG93X2JpdHMgJiZcbiAgICAgICAgICAob3B0cy5zZXJ2ZXJNYXhXaW5kb3dCaXRzID09PSBmYWxzZSB8fFxuICAgICAgICAgICAgKHR5cGVvZiBvcHRzLnNlcnZlck1heFdpbmRvd0JpdHMgPT09ICdudW1iZXInICYmXG4gICAgICAgICAgICAgIG9wdHMuc2VydmVyTWF4V2luZG93Qml0cyA+IHBhcmFtcy5zZXJ2ZXJfbWF4X3dpbmRvd19iaXRzKSkpIHx8XG4gICAgICAgICh0eXBlb2Ygb3B0cy5jbGllbnRNYXhXaW5kb3dCaXRzID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICFwYXJhbXMuY2xpZW50X21heF93aW5kb3dfYml0cylcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuXG4gICAgaWYgKCFhY2NlcHRlZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb25lIG9mIHRoZSBleHRlbnNpb24gb2ZmZXJzIGNhbiBiZSBhY2NlcHRlZCcpO1xuICAgIH1cblxuICAgIGlmIChvcHRzLnNlcnZlck5vQ29udGV4dFRha2VvdmVyKSB7XG4gICAgICBhY2NlcHRlZC5zZXJ2ZXJfbm9fY29udGV4dF90YWtlb3ZlciA9IHRydWU7XG4gICAgfVxuICAgIGlmIChvcHRzLmNsaWVudE5vQ29udGV4dFRha2VvdmVyKSB7XG4gICAgICBhY2NlcHRlZC5jbGllbnRfbm9fY29udGV4dF90YWtlb3ZlciA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygb3B0cy5zZXJ2ZXJNYXhXaW5kb3dCaXRzID09PSAnbnVtYmVyJykge1xuICAgICAgYWNjZXB0ZWQuc2VydmVyX21heF93aW5kb3dfYml0cyA9IG9wdHMuc2VydmVyTWF4V2luZG93Qml0cztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRzLmNsaWVudE1heFdpbmRvd0JpdHMgPT09ICdudW1iZXInKSB7XG4gICAgICBhY2NlcHRlZC5jbGllbnRfbWF4X3dpbmRvd19iaXRzID0gb3B0cy5jbGllbnRNYXhXaW5kb3dCaXRzO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBhY2NlcHRlZC5jbGllbnRfbWF4X3dpbmRvd19iaXRzID09PSB0cnVlIHx8XG4gICAgICBvcHRzLmNsaWVudE1heFdpbmRvd0JpdHMgPT09IGZhbHNlXG4gICAgKSB7XG4gICAgICBkZWxldGUgYWNjZXB0ZWQuY2xpZW50X21heF93aW5kb3dfYml0cztcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjZXB0ZWQ7XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0IHRoZSBleHRlbnNpb24gbmVnb3RpYXRpb24gcmVzcG9uc2UuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHJlc3BvbnNlIFRoZSBleHRlbnNpb24gbmVnb3RpYXRpb24gcmVzcG9uc2VcbiAgICogQHJldHVybiB7T2JqZWN0fSBBY2NlcHRlZCBjb25maWd1cmF0aW9uXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhY2NlcHRBc0NsaWVudChyZXNwb25zZSkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHJlc3BvbnNlWzBdO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5fb3B0aW9ucy5jbGllbnROb0NvbnRleHRUYWtlb3ZlciA9PT0gZmFsc2UgJiZcbiAgICAgIHBhcmFtcy5jbGllbnRfbm9fY29udGV4dF90YWtlb3ZlclxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmV4cGVjdGVkIHBhcmFtZXRlciBcImNsaWVudF9ub19jb250ZXh0X3Rha2VvdmVyXCInKTtcbiAgICB9XG5cbiAgICBpZiAoIXBhcmFtcy5jbGllbnRfbWF4X3dpbmRvd19iaXRzKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuX29wdGlvbnMuY2xpZW50TWF4V2luZG93Qml0cyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcGFyYW1zLmNsaWVudF9tYXhfd2luZG93X2JpdHMgPSB0aGlzLl9vcHRpb25zLmNsaWVudE1heFdpbmRvd0JpdHM7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHRoaXMuX29wdGlvbnMuY2xpZW50TWF4V2luZG93Qml0cyA9PT0gZmFsc2UgfHxcbiAgICAgICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5jbGllbnRNYXhXaW5kb3dCaXRzID09PSAnbnVtYmVyJyAmJlxuICAgICAgICBwYXJhbXMuY2xpZW50X21heF93aW5kb3dfYml0cyA+IHRoaXMuX29wdGlvbnMuY2xpZW50TWF4V2luZG93Qml0cylcbiAgICApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1VuZXhwZWN0ZWQgb3IgaW52YWxpZCBwYXJhbWV0ZXIgXCJjbGllbnRfbWF4X3dpbmRvd19iaXRzXCInXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogTm9ybWFsaXplIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IGNvbmZpZ3VyYXRpb25zIFRoZSBleHRlbnNpb24gbmVnb3RpYXRpb24gb2ZmZXJzL3JlcG9uc2VcbiAgICogQHJldHVybiB7QXJyYXl9IFRoZSBvZmZlcnMvcmVzcG9uc2Ugd2l0aCBub3JtYWxpemVkIHBhcmFtZXRlcnNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIG5vcm1hbGl6ZVBhcmFtcyhjb25maWd1cmF0aW9ucykge1xuICAgIGNvbmZpZ3VyYXRpb25zLmZvckVhY2goKHBhcmFtcykgPT4ge1xuICAgICAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgbGV0IHZhbHVlID0gcGFyYW1zW2tleV07XG5cbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciBcIiR7a2V5fVwiIG11c3QgaGF2ZSBvbmx5IGEgc2luZ2xlIHZhbHVlYCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZSA9IHZhbHVlWzBdO1xuXG4gICAgICAgIGlmIChrZXkgPT09ICdjbGllbnRfbWF4X3dpbmRvd19iaXRzJykge1xuICAgICAgICAgIGlmICh2YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgbnVtID0gK3ZhbHVlO1xuICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKG51bSkgfHwgbnVtIDwgOCB8fCBudW0gPiAxNSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICAgIGBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgXCIke2tleX1cIjogJHt2YWx1ZX1gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YWx1ZSA9IG51bTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc1NlcnZlcikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgICAgYEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciBcIiR7a2V5fVwiOiAke3ZhbHVlfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ3NlcnZlcl9tYXhfd2luZG93X2JpdHMnKSB7XG4gICAgICAgICAgY29uc3QgbnVtID0gK3ZhbHVlO1xuICAgICAgICAgIGlmICghTnVtYmVyLmlzSW50ZWdlcihudW0pIHx8IG51bSA8IDggfHwgbnVtID4gMTUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgIGBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgXCIke2tleX1cIjogJHt2YWx1ZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YWx1ZSA9IG51bTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBrZXkgPT09ICdjbGllbnRfbm9fY29udGV4dF90YWtlb3ZlcicgfHxcbiAgICAgICAgICBrZXkgPT09ICdzZXJ2ZXJfbm9fY29udGV4dF90YWtlb3ZlcidcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKHZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICBgSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyIFwiJHtrZXl9XCI6ICR7dmFsdWV9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHBhcmFtZXRlciBcIiR7a2V5fVwiYCk7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJhbXNba2V5XSA9IHZhbHVlO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29uZmlndXJhdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogRGVjb21wcmVzcyBkYXRhLiBDb25jdXJyZW5jeSBsaW1pdGVkLlxuICAgKlxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gZGF0YSBDb21wcmVzc2VkIGRhdGFcbiAgICogQHBhcmFtIHtCb29sZWFufSBmaW4gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRoaXMgaXMgdGhlIGxhc3QgZnJhZ21lbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2tcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZGVjb21wcmVzcyhkYXRhLCBmaW4sIGNhbGxiYWNrKSB7XG4gICAgemxpYkxpbWl0ZXIuYWRkKChkb25lKSA9PiB7XG4gICAgICB0aGlzLl9kZWNvbXByZXNzKGRhdGEsIGZpbiwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgICAgY2FsbGJhY2soZXJyLCByZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHJlc3MgZGF0YS4gQ29uY3VycmVuY3kgbGltaXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHsoQnVmZmVyfFN0cmluZyl9IGRhdGEgRGF0YSB0byBjb21wcmVzc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZpbiBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdGhpcyBpcyB0aGUgbGFzdCBmcmFnbWVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFja1xuICAgKiBAcHVibGljXG4gICAqL1xuICBjb21wcmVzcyhkYXRhLCBmaW4sIGNhbGxiYWNrKSB7XG4gICAgemxpYkxpbWl0ZXIuYWRkKChkb25lKSA9PiB7XG4gICAgICB0aGlzLl9jb21wcmVzcyhkYXRhLCBmaW4sIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICBkb25lKCk7XG4gICAgICAgIGNhbGxiYWNrKGVyciwgcmVzdWx0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlY29tcHJlc3MgZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgQ29tcHJlc3NlZCBkYXRhXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gZmluIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGlzIHRoZSBsYXN0IGZyYWdtZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZGVjb21wcmVzcyhkYXRhLCBmaW4sIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLl9pc1NlcnZlciA/ICdjbGllbnQnIDogJ3NlcnZlcic7XG5cbiAgICBpZiAoIXRoaXMuX2luZmxhdGUpIHtcbiAgICAgIGNvbnN0IGtleSA9IGAke2VuZHBvaW50fV9tYXhfd2luZG93X2JpdHNgO1xuICAgICAgY29uc3Qgd2luZG93Qml0cyA9XG4gICAgICAgIHR5cGVvZiB0aGlzLnBhcmFtc1trZXldICE9PSAnbnVtYmVyJ1xuICAgICAgICAgID8gemxpYi5aX0RFRkFVTFRfV0lORE9XQklUU1xuICAgICAgICAgIDogdGhpcy5wYXJhbXNba2V5XTtcblxuICAgICAgdGhpcy5faW5mbGF0ZSA9IHpsaWIuY3JlYXRlSW5mbGF0ZVJhdyh7XG4gICAgICAgIC4uLnRoaXMuX29wdGlvbnMuemxpYkluZmxhdGVPcHRpb25zLFxuICAgICAgICB3aW5kb3dCaXRzXG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2luZmxhdGVba1Blck1lc3NhZ2VEZWZsYXRlXSA9IHRoaXM7XG4gICAgICB0aGlzLl9pbmZsYXRlW2tUb3RhbExlbmd0aF0gPSAwO1xuICAgICAgdGhpcy5faW5mbGF0ZVtrQnVmZmVyc10gPSBbXTtcbiAgICAgIHRoaXMuX2luZmxhdGUub24oJ2Vycm9yJywgaW5mbGF0ZU9uRXJyb3IpO1xuICAgICAgdGhpcy5faW5mbGF0ZS5vbignZGF0YScsIGluZmxhdGVPbkRhdGEpO1xuICAgIH1cblxuICAgIHRoaXMuX2luZmxhdGVba0NhbGxiYWNrXSA9IGNhbGxiYWNrO1xuXG4gICAgdGhpcy5faW5mbGF0ZS53cml0ZShkYXRhKTtcbiAgICBpZiAoZmluKSB0aGlzLl9pbmZsYXRlLndyaXRlKFRSQUlMRVIpO1xuXG4gICAgdGhpcy5faW5mbGF0ZS5mbHVzaCgoKSA9PiB7XG4gICAgICBjb25zdCBlcnIgPSB0aGlzLl9pbmZsYXRlW2tFcnJvcl07XG5cbiAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgdGhpcy5faW5mbGF0ZS5jbG9zZSgpO1xuICAgICAgICB0aGlzLl9pbmZsYXRlID0gbnVsbDtcbiAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkYXRhID0gYnVmZmVyVXRpbC5jb25jYXQoXG4gICAgICAgIHRoaXMuX2luZmxhdGVba0J1ZmZlcnNdLFxuICAgICAgICB0aGlzLl9pbmZsYXRlW2tUb3RhbExlbmd0aF1cbiAgICAgICk7XG5cbiAgICAgIGlmICh0aGlzLl9pbmZsYXRlLl9yZWFkYWJsZVN0YXRlLmVuZEVtaXR0ZWQpIHtcbiAgICAgICAgdGhpcy5faW5mbGF0ZS5jbG9zZSgpO1xuICAgICAgICB0aGlzLl9pbmZsYXRlID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX2luZmxhdGVba1RvdGFsTGVuZ3RoXSA9IDA7XG4gICAgICAgIHRoaXMuX2luZmxhdGVba0J1ZmZlcnNdID0gW107XG5cbiAgICAgICAgaWYgKGZpbiAmJiB0aGlzLnBhcmFtc1tgJHtlbmRwb2ludH1fbm9fY29udGV4dF90YWtlb3ZlcmBdKSB7XG4gICAgICAgICAgdGhpcy5faW5mbGF0ZS5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrKG51bGwsIGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXByZXNzIGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7KEJ1ZmZlcnxTdHJpbmcpfSBkYXRhIERhdGEgdG8gY29tcHJlc3NcbiAgICogQHBhcmFtIHtCb29sZWFufSBmaW4gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRoaXMgaXMgdGhlIGxhc3QgZnJhZ21lbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2tcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9jb21wcmVzcyhkYXRhLCBmaW4sIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW5kcG9pbnQgPSB0aGlzLl9pc1NlcnZlciA/ICdzZXJ2ZXInIDogJ2NsaWVudCc7XG5cbiAgICBpZiAoIXRoaXMuX2RlZmxhdGUpIHtcbiAgICAgIGNvbnN0IGtleSA9IGAke2VuZHBvaW50fV9tYXhfd2luZG93X2JpdHNgO1xuICAgICAgY29uc3Qgd2luZG93Qml0cyA9XG4gICAgICAgIHR5cGVvZiB0aGlzLnBhcmFtc1trZXldICE9PSAnbnVtYmVyJ1xuICAgICAgICAgID8gemxpYi5aX0RFRkFVTFRfV0lORE9XQklUU1xuICAgICAgICAgIDogdGhpcy5wYXJhbXNba2V5XTtcblxuICAgICAgdGhpcy5fZGVmbGF0ZSA9IHpsaWIuY3JlYXRlRGVmbGF0ZVJhdyh7XG4gICAgICAgIC4uLnRoaXMuX29wdGlvbnMuemxpYkRlZmxhdGVPcHRpb25zLFxuICAgICAgICB3aW5kb3dCaXRzXG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fZGVmbGF0ZVtrVG90YWxMZW5ndGhdID0gMDtcbiAgICAgIHRoaXMuX2RlZmxhdGVba0J1ZmZlcnNdID0gW107XG5cbiAgICAgIHRoaXMuX2RlZmxhdGUub24oJ2RhdGEnLCBkZWZsYXRlT25EYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLl9kZWZsYXRlW2tDYWxsYmFja10gPSBjYWxsYmFjaztcblxuICAgIHRoaXMuX2RlZmxhdGUud3JpdGUoZGF0YSk7XG4gICAgdGhpcy5fZGVmbGF0ZS5mbHVzaCh6bGliLlpfU1lOQ19GTFVTSCwgKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLl9kZWZsYXRlKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRoZSBkZWZsYXRlIHN0cmVhbSB3YXMgY2xvc2VkIHdoaWxlIGRhdGEgd2FzIGJlaW5nIHByb2Nlc3NlZC5cbiAgICAgICAgLy9cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgZGF0YSA9IGJ1ZmZlclV0aWwuY29uY2F0KFxuICAgICAgICB0aGlzLl9kZWZsYXRlW2tCdWZmZXJzXSxcbiAgICAgICAgdGhpcy5fZGVmbGF0ZVtrVG90YWxMZW5ndGhdXG4gICAgICApO1xuXG4gICAgICBpZiAoZmluKSB7XG4gICAgICAgIGRhdGEgPSBuZXcgRmFzdEJ1ZmZlcihkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhLmxlbmd0aCAtIDQpO1xuICAgICAgfVxuXG4gICAgICAvL1xuICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlIGNhbGxiYWNrIHdpbGwgbm90IGJlIGNhbGxlZCBhZ2FpbiBpblxuICAgICAgLy8gYFBlck1lc3NhZ2VEZWZsYXRlI2NsZWFudXAoKWAuXG4gICAgICAvL1xuICAgICAgdGhpcy5fZGVmbGF0ZVtrQ2FsbGJhY2tdID0gbnVsbDtcblxuICAgICAgdGhpcy5fZGVmbGF0ZVtrVG90YWxMZW5ndGhdID0gMDtcbiAgICAgIHRoaXMuX2RlZmxhdGVba0J1ZmZlcnNdID0gW107XG5cbiAgICAgIGlmIChmaW4gJiYgdGhpcy5wYXJhbXNbYCR7ZW5kcG9pbnR9X25vX2NvbnRleHRfdGFrZW92ZXJgXSkge1xuICAgICAgICB0aGlzLl9kZWZsYXRlLnJlc2V0KCk7XG4gICAgICB9XG5cbiAgICAgIGNhbGxiYWNrKG51bGwsIGRhdGEpO1xuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUGVyTWVzc2FnZURlZmxhdGU7XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgemxpYi5EZWZsYXRlUmF3YCBzdHJlYW0gYCdkYXRhJ2AgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGNodW5rIEEgY2h1bmsgb2YgZGF0YVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZGVmbGF0ZU9uRGF0YShjaHVuaykge1xuICB0aGlzW2tCdWZmZXJzXS5wdXNoKGNodW5rKTtcbiAgdGhpc1trVG90YWxMZW5ndGhdICs9IGNodW5rLmxlbmd0aDtcbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGB6bGliLkluZmxhdGVSYXdgIHN0cmVhbSBgJ2RhdGEnYCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gY2h1bmsgQSBjaHVuayBvZiBkYXRhXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpbmZsYXRlT25EYXRhKGNodW5rKSB7XG4gIHRoaXNba1RvdGFsTGVuZ3RoXSArPSBjaHVuay5sZW5ndGg7XG5cbiAgaWYgKFxuICAgIHRoaXNba1Blck1lc3NhZ2VEZWZsYXRlXS5fbWF4UGF5bG9hZCA8IDEgfHxcbiAgICB0aGlzW2tUb3RhbExlbmd0aF0gPD0gdGhpc1trUGVyTWVzc2FnZURlZmxhdGVdLl9tYXhQYXlsb2FkXG4gICkge1xuICAgIHRoaXNba0J1ZmZlcnNdLnB1c2goY2h1bmspO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXNba0Vycm9yXSA9IG5ldyBSYW5nZUVycm9yKCdNYXggcGF5bG9hZCBzaXplIGV4Y2VlZGVkJyk7XG4gIHRoaXNba0Vycm9yXS5jb2RlID0gJ1dTX0VSUl9VTlNVUFBPUlRFRF9NRVNTQUdFX0xFTkdUSCc7XG4gIHRoaXNba0Vycm9yXVtrU3RhdHVzQ29kZV0gPSAxMDA5O1xuICB0aGlzLnJlbW92ZUxpc3RlbmVyKCdkYXRhJywgaW5mbGF0ZU9uRGF0YSk7XG4gIHRoaXMucmVzZXQoKTtcbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGB6bGliLkluZmxhdGVSYXdgIHN0cmVhbSBgJ2Vycm9yJ2AgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyIFRoZSBlbWl0dGVkIGVycm9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpbmZsYXRlT25FcnJvcihlcnIpIHtcbiAgLy9cbiAgLy8gVGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGBabGliI2Nsb3NlKClgIGFzIHRoZSBoYW5kbGUgaXMgYXV0b21hdGljYWxseVxuICAvLyBjbG9zZWQgd2hlbiBhbiBlcnJvciBpcyBlbWl0dGVkLlxuICAvL1xuICB0aGlzW2tQZXJNZXNzYWdlRGVmbGF0ZV0uX2luZmxhdGUgPSBudWxsO1xuICBlcnJba1N0YXR1c0NvZGVdID0gMTAwNztcbiAgdGhpc1trQ2FsbGJhY2tdKGVycik7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgV3JpdGFibGUgfSA9IHJlcXVpcmUoJ3N0cmVhbScpO1xuXG5jb25zdCBQZXJNZXNzYWdlRGVmbGF0ZSA9IHJlcXVpcmUoJy4vcGVybWVzc2FnZS1kZWZsYXRlJyk7XG5jb25zdCB7XG4gIEJJTkFSWV9UWVBFUyxcbiAgRU1QVFlfQlVGRkVSLFxuICBrU3RhdHVzQ29kZSxcbiAga1dlYlNvY2tldFxufSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5jb25zdCB7IGNvbmNhdCwgdG9BcnJheUJ1ZmZlciwgdW5tYXNrIH0gPSByZXF1aXJlKCcuL2J1ZmZlci11dGlsJyk7XG5jb25zdCB7IGlzVmFsaWRTdGF0dXNDb2RlLCBpc1ZhbGlkVVRGOCB9ID0gcmVxdWlyZSgnLi92YWxpZGF0aW9uJyk7XG5cbmNvbnN0IEZhc3RCdWZmZXIgPSBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdO1xuY29uc3QgR0VUX0lORk8gPSAwO1xuY29uc3QgR0VUX1BBWUxPQURfTEVOR1RIXzE2ID0gMTtcbmNvbnN0IEdFVF9QQVlMT0FEX0xFTkdUSF82NCA9IDI7XG5jb25zdCBHRVRfTUFTSyA9IDM7XG5jb25zdCBHRVRfREFUQSA9IDQ7XG5jb25zdCBJTkZMQVRJTkcgPSA1O1xuXG4vKipcbiAqIEh5QmkgUmVjZWl2ZXIgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQGV4dGVuZHMgV3JpdGFibGVcbiAqL1xuY2xhc3MgUmVjZWl2ZXIgZXh0ZW5kcyBXcml0YWJsZSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgUmVjZWl2ZXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gT3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmJpbmFyeVR5cGU9bm9kZWJ1ZmZlcl0gVGhlIHR5cGUgZm9yIGJpbmFyeSBkYXRhXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5leHRlbnNpb25zXSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgbmVnb3RpYXRlZFxuICAgKiAgICAgZXh0ZW5zaW9uc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmlzU2VydmVyPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciB0byBvcGVyYXRlIGluXG4gICAqICAgICBjbGllbnQgb3Igc2VydmVyIG1vZGVcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heFBheWxvYWQ9MF0gVGhlIG1heGltdW0gYWxsb3dlZCBtZXNzYWdlIGxlbmd0aFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnNraXBVVEY4VmFsaWRhdGlvbj1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgb3JcbiAgICogICAgIG5vdCB0byBza2lwIFVURi04IHZhbGlkYXRpb24gZm9yIHRleHQgYW5kIGNsb3NlIG1lc3NhZ2VzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fYmluYXJ5VHlwZSA9IG9wdGlvbnMuYmluYXJ5VHlwZSB8fCBCSU5BUllfVFlQRVNbMF07XG4gICAgdGhpcy5fZXh0ZW5zaW9ucyA9IG9wdGlvbnMuZXh0ZW5zaW9ucyB8fCB7fTtcbiAgICB0aGlzLl9pc1NlcnZlciA9ICEhb3B0aW9ucy5pc1NlcnZlcjtcbiAgICB0aGlzLl9tYXhQYXlsb2FkID0gb3B0aW9ucy5tYXhQYXlsb2FkIHwgMDtcbiAgICB0aGlzLl9za2lwVVRGOFZhbGlkYXRpb24gPSAhIW9wdGlvbnMuc2tpcFVURjhWYWxpZGF0aW9uO1xuICAgIHRoaXNba1dlYlNvY2tldF0gPSB1bmRlZmluZWQ7XG5cbiAgICB0aGlzLl9idWZmZXJlZEJ5dGVzID0gMDtcbiAgICB0aGlzLl9idWZmZXJzID0gW107XG5cbiAgICB0aGlzLl9jb21wcmVzc2VkID0gZmFsc2U7XG4gICAgdGhpcy5fcGF5bG9hZExlbmd0aCA9IDA7XG4gICAgdGhpcy5fbWFzayA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLl9mcmFnbWVudGVkID0gMDtcbiAgICB0aGlzLl9tYXNrZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9maW4gPSBmYWxzZTtcbiAgICB0aGlzLl9vcGNvZGUgPSAwO1xuXG4gICAgdGhpcy5fdG90YWxQYXlsb2FkTGVuZ3RoID0gMDtcbiAgICB0aGlzLl9tZXNzYWdlTGVuZ3RoID0gMDtcbiAgICB0aGlzLl9mcmFnbWVudHMgPSBbXTtcblxuICAgIHRoaXMuX3N0YXRlID0gR0VUX0lORk87XG4gICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudHMgYFdyaXRhYmxlLnByb3RvdHlwZS5fd3JpdGUoKWAuXG4gICAqXG4gICAqIEBwYXJhbSB7QnVmZmVyfSBjaHVuayBUaGUgY2h1bmsgb2YgZGF0YSB0byB3cml0ZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gZW5jb2RpbmcgVGhlIGNoYXJhY3RlciBlbmNvZGluZyBvZiBgY2h1bmtgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfd3JpdGUoY2h1bmssIGVuY29kaW5nLCBjYikge1xuICAgIGlmICh0aGlzLl9vcGNvZGUgPT09IDB4MDggJiYgdGhpcy5fc3RhdGUgPT0gR0VUX0lORk8pIHJldHVybiBjYigpO1xuXG4gICAgdGhpcy5fYnVmZmVyZWRCeXRlcyArPSBjaHVuay5sZW5ndGg7XG4gICAgdGhpcy5fYnVmZmVycy5wdXNoKGNodW5rKTtcbiAgICB0aGlzLnN0YXJ0TG9vcChjYik7XG4gIH1cblxuICAvKipcbiAgICogQ29uc3VtZXMgYG5gIGJ5dGVzIGZyb20gdGhlIGJ1ZmZlcmVkIGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgYnl0ZXMgdG8gY29uc3VtZVxuICAgKiBAcmV0dXJuIHtCdWZmZXJ9IFRoZSBjb25zdW1lZCBieXRlc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY29uc3VtZShuKSB7XG4gICAgdGhpcy5fYnVmZmVyZWRCeXRlcyAtPSBuO1xuXG4gICAgaWYgKG4gPT09IHRoaXMuX2J1ZmZlcnNbMF0ubGVuZ3RoKSByZXR1cm4gdGhpcy5fYnVmZmVycy5zaGlmdCgpO1xuXG4gICAgaWYgKG4gPCB0aGlzLl9idWZmZXJzWzBdLmxlbmd0aCkge1xuICAgICAgY29uc3QgYnVmID0gdGhpcy5fYnVmZmVyc1swXTtcbiAgICAgIHRoaXMuX2J1ZmZlcnNbMF0gPSBuZXcgRmFzdEJ1ZmZlcihcbiAgICAgICAgYnVmLmJ1ZmZlcixcbiAgICAgICAgYnVmLmJ5dGVPZmZzZXQgKyBuLFxuICAgICAgICBidWYubGVuZ3RoIC0gblxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIG5ldyBGYXN0QnVmZmVyKGJ1Zi5idWZmZXIsIGJ1Zi5ieXRlT2Zmc2V0LCBuKTtcbiAgICB9XG5cbiAgICBjb25zdCBkc3QgPSBCdWZmZXIuYWxsb2NVbnNhZmUobik7XG5cbiAgICBkbyB7XG4gICAgICBjb25zdCBidWYgPSB0aGlzLl9idWZmZXJzWzBdO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gZHN0Lmxlbmd0aCAtIG47XG5cbiAgICAgIGlmIChuID49IGJ1Zi5sZW5ndGgpIHtcbiAgICAgICAgZHN0LnNldCh0aGlzLl9idWZmZXJzLnNoaWZ0KCksIG9mZnNldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkc3Quc2V0KG5ldyBVaW50OEFycmF5KGJ1Zi5idWZmZXIsIGJ1Zi5ieXRlT2Zmc2V0LCBuKSwgb2Zmc2V0KTtcbiAgICAgICAgdGhpcy5fYnVmZmVyc1swXSA9IG5ldyBGYXN0QnVmZmVyKFxuICAgICAgICAgIGJ1Zi5idWZmZXIsXG4gICAgICAgICAgYnVmLmJ5dGVPZmZzZXQgKyBuLFxuICAgICAgICAgIGJ1Zi5sZW5ndGggLSBuXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIG4gLT0gYnVmLmxlbmd0aDtcbiAgICB9IHdoaWxlIChuID4gMCk7XG5cbiAgICByZXR1cm4gZHN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyB0aGUgcGFyc2luZyBsb29wLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3RhcnRMb29wKGNiKSB7XG4gICAgbGV0IGVycjtcbiAgICB0aGlzLl9sb29wID0gdHJ1ZTtcblxuICAgIGRvIHtcbiAgICAgIHN3aXRjaCAodGhpcy5fc3RhdGUpIHtcbiAgICAgICAgY2FzZSBHRVRfSU5GTzpcbiAgICAgICAgICBlcnIgPSB0aGlzLmdldEluZm8oKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBHRVRfUEFZTE9BRF9MRU5HVEhfMTY6XG4gICAgICAgICAgZXJyID0gdGhpcy5nZXRQYXlsb2FkTGVuZ3RoMTYoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBHRVRfUEFZTE9BRF9MRU5HVEhfNjQ6XG4gICAgICAgICAgZXJyID0gdGhpcy5nZXRQYXlsb2FkTGVuZ3RoNjQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBHRVRfTUFTSzpcbiAgICAgICAgICB0aGlzLmdldE1hc2soKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBHRVRfREFUQTpcbiAgICAgICAgICBlcnIgPSB0aGlzLmdldERhdGEoY2IpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIC8vIGBJTkZMQVRJTkdgXG4gICAgICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IHdoaWxlICh0aGlzLl9sb29wKTtcblxuICAgIGNiKGVycik7XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgdGhlIGZpcnN0IHR3byBieXRlcyBvZiBhIGZyYW1lLlxuICAgKlxuICAgKiBAcmV0dXJuIHsoUmFuZ2VFcnJvcnx1bmRlZmluZWQpfSBBIHBvc3NpYmxlIGVycm9yXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRJbmZvKCkge1xuICAgIGlmICh0aGlzLl9idWZmZXJlZEJ5dGVzIDwgMikge1xuICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1ZiA9IHRoaXMuY29uc3VtZSgyKTtcblxuICAgIGlmICgoYnVmWzBdICYgMHgzMCkgIT09IDB4MDApIHtcbiAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgIHJldHVybiBlcnJvcihcbiAgICAgICAgUmFuZ2VFcnJvcixcbiAgICAgICAgJ1JTVjIgYW5kIFJTVjMgbXVzdCBiZSBjbGVhcicsXG4gICAgICAgIHRydWUsXG4gICAgICAgIDEwMDIsXG4gICAgICAgICdXU19FUlJfVU5FWFBFQ1RFRF9SU1ZfMl8zJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb21wcmVzc2VkID0gKGJ1ZlswXSAmIDB4NDApID09PSAweDQwO1xuXG4gICAgaWYgKGNvbXByZXNzZWQgJiYgIXRoaXMuX2V4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0pIHtcbiAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgIHJldHVybiBlcnJvcihcbiAgICAgICAgUmFuZ2VFcnJvcixcbiAgICAgICAgJ1JTVjEgbXVzdCBiZSBjbGVhcicsXG4gICAgICAgIHRydWUsXG4gICAgICAgIDEwMDIsXG4gICAgICAgICdXU19FUlJfVU5FWFBFQ1RFRF9SU1ZfMSdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5fZmluID0gKGJ1ZlswXSAmIDB4ODApID09PSAweDgwO1xuICAgIHRoaXMuX29wY29kZSA9IGJ1ZlswXSAmIDB4MGY7XG4gICAgdGhpcy5fcGF5bG9hZExlbmd0aCA9IGJ1ZlsxXSAmIDB4N2Y7XG5cbiAgICBpZiAodGhpcy5fb3Bjb2RlID09PSAweDAwKSB7XG4gICAgICBpZiAoY29tcHJlc3NlZCkge1xuICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBlcnJvcihcbiAgICAgICAgICBSYW5nZUVycm9yLFxuICAgICAgICAgICdSU1YxIG11c3QgYmUgY2xlYXInLFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgMTAwMixcbiAgICAgICAgICAnV1NfRVJSX1VORVhQRUNURURfUlNWXzEnXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5fZnJhZ21lbnRlZCkge1xuICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBlcnJvcihcbiAgICAgICAgICBSYW5nZUVycm9yLFxuICAgICAgICAgICdpbnZhbGlkIG9wY29kZSAwJyxcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIDEwMDIsXG4gICAgICAgICAgJ1dTX0VSUl9JTlZBTElEX09QQ09ERSdcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fb3Bjb2RlID0gdGhpcy5fZnJhZ21lbnRlZDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX29wY29kZSA9PT0gMHgwMSB8fCB0aGlzLl9vcGNvZGUgPT09IDB4MDIpIHtcbiAgICAgIGlmICh0aGlzLl9mcmFnbWVudGVkKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGVycm9yKFxuICAgICAgICAgIFJhbmdlRXJyb3IsXG4gICAgICAgICAgYGludmFsaWQgb3Bjb2RlICR7dGhpcy5fb3Bjb2RlfWAsXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAxMDAyLFxuICAgICAgICAgICdXU19FUlJfSU5WQUxJRF9PUENPREUnXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2NvbXByZXNzZWQgPSBjb21wcmVzc2VkO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fb3Bjb2RlID4gMHgwNyAmJiB0aGlzLl9vcGNvZGUgPCAweDBiKSB7XG4gICAgICBpZiAoIXRoaXMuX2Zpbikge1xuICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBlcnJvcihcbiAgICAgICAgICBSYW5nZUVycm9yLFxuICAgICAgICAgICdGSU4gbXVzdCBiZSBzZXQnLFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgMTAwMixcbiAgICAgICAgICAnV1NfRVJSX0VYUEVDVEVEX0ZJTidcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXByZXNzZWQpIHtcbiAgICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZXJyb3IoXG4gICAgICAgICAgUmFuZ2VFcnJvcixcbiAgICAgICAgICAnUlNWMSBtdXN0IGJlIGNsZWFyJyxcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIDEwMDIsXG4gICAgICAgICAgJ1dTX0VSUl9VTkVYUEVDVEVEX1JTVl8xJ1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuX3BheWxvYWRMZW5ndGggPiAweDdkIHx8XG4gICAgICAgICh0aGlzLl9vcGNvZGUgPT09IDB4MDggJiYgdGhpcy5fcGF5bG9hZExlbmd0aCA9PT0gMSlcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBlcnJvcihcbiAgICAgICAgICBSYW5nZUVycm9yLFxuICAgICAgICAgIGBpbnZhbGlkIHBheWxvYWQgbGVuZ3RoICR7dGhpcy5fcGF5bG9hZExlbmd0aH1gLFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgMTAwMixcbiAgICAgICAgICAnV1NfRVJSX0lOVkFMSURfQ09OVFJPTF9QQVlMT0FEX0xFTkdUSCdcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGVycm9yKFxuICAgICAgICBSYW5nZUVycm9yLFxuICAgICAgICBgaW52YWxpZCBvcGNvZGUgJHt0aGlzLl9vcGNvZGV9YCxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICAgMTAwMixcbiAgICAgICAgJ1dTX0VSUl9JTlZBTElEX09QQ09ERSdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9maW4gJiYgIXRoaXMuX2ZyYWdtZW50ZWQpIHRoaXMuX2ZyYWdtZW50ZWQgPSB0aGlzLl9vcGNvZGU7XG4gICAgdGhpcy5fbWFza2VkID0gKGJ1ZlsxXSAmIDB4ODApID09PSAweDgwO1xuXG4gICAgaWYgKHRoaXMuX2lzU2VydmVyKSB7XG4gICAgICBpZiAoIXRoaXMuX21hc2tlZCkge1xuICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBlcnJvcihcbiAgICAgICAgICBSYW5nZUVycm9yLFxuICAgICAgICAgICdNQVNLIG11c3QgYmUgc2V0JyxcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIDEwMDIsXG4gICAgICAgICAgJ1dTX0VSUl9FWFBFQ1RFRF9NQVNLJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5fbWFza2VkKSB7XG4gICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICByZXR1cm4gZXJyb3IoXG4gICAgICAgIFJhbmdlRXJyb3IsXG4gICAgICAgICdNQVNLIG11c3QgYmUgY2xlYXInLFxuICAgICAgICB0cnVlLFxuICAgICAgICAxMDAyLFxuICAgICAgICAnV1NfRVJSX1VORVhQRUNURURfTUFTSydcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3BheWxvYWRMZW5ndGggPT09IDEyNikgdGhpcy5fc3RhdGUgPSBHRVRfUEFZTE9BRF9MRU5HVEhfMTY7XG4gICAgZWxzZSBpZiAodGhpcy5fcGF5bG9hZExlbmd0aCA9PT0gMTI3KSB0aGlzLl9zdGF0ZSA9IEdFVF9QQVlMT0FEX0xFTkdUSF82NDtcbiAgICBlbHNlIHJldHVybiB0aGlzLmhhdmVMZW5ndGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGV4dGVuZGVkIHBheWxvYWQgbGVuZ3RoICg3KzE2KS5cbiAgICpcbiAgICogQHJldHVybiB7KFJhbmdlRXJyb3J8dW5kZWZpbmVkKX0gQSBwb3NzaWJsZSBlcnJvclxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0UGF5bG9hZExlbmd0aDE2KCkge1xuICAgIGlmICh0aGlzLl9idWZmZXJlZEJ5dGVzIDwgMikge1xuICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3BheWxvYWRMZW5ndGggPSB0aGlzLmNvbnN1bWUoMikucmVhZFVJbnQxNkJFKDApO1xuICAgIHJldHVybiB0aGlzLmhhdmVMZW5ndGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGV4dGVuZGVkIHBheWxvYWQgbGVuZ3RoICg3KzY0KS5cbiAgICpcbiAgICogQHJldHVybiB7KFJhbmdlRXJyb3J8dW5kZWZpbmVkKX0gQSBwb3NzaWJsZSBlcnJvclxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0UGF5bG9hZExlbmd0aDY0KCkge1xuICAgIGlmICh0aGlzLl9idWZmZXJlZEJ5dGVzIDwgOCkge1xuICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1ZiA9IHRoaXMuY29uc3VtZSg4KTtcbiAgICBjb25zdCBudW0gPSBidWYucmVhZFVJbnQzMkJFKDApO1xuXG4gICAgLy9cbiAgICAvLyBUaGUgbWF4aW11bSBzYWZlIGludGVnZXIgaW4gSmF2YVNjcmlwdCBpcyAyXjUzIC0gMS4gQW4gZXJyb3IgaXMgcmV0dXJuZWRcbiAgICAvLyBpZiBwYXlsb2FkIGxlbmd0aCBpcyBncmVhdGVyIHRoYW4gdGhpcyBudW1iZXIuXG4gICAgLy9cbiAgICBpZiAobnVtID4gTWF0aC5wb3coMiwgNTMgLSAzMikgLSAxKSB7XG4gICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICByZXR1cm4gZXJyb3IoXG4gICAgICAgIFJhbmdlRXJyb3IsXG4gICAgICAgICdVbnN1cHBvcnRlZCBXZWJTb2NrZXQgZnJhbWU6IHBheWxvYWQgbGVuZ3RoID4gMl41MyAtIDEnLFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgMTAwOSxcbiAgICAgICAgJ1dTX0VSUl9VTlNVUFBPUlRFRF9EQVRBX1BBWUxPQURfTEVOR1RIJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wYXlsb2FkTGVuZ3RoID0gbnVtICogTWF0aC5wb3coMiwgMzIpICsgYnVmLnJlYWRVSW50MzJCRSg0KTtcbiAgICByZXR1cm4gdGhpcy5oYXZlTGVuZ3RoKCk7XG4gIH1cblxuICAvKipcbiAgICogUGF5bG9hZCBsZW5ndGggaGFzIGJlZW4gcmVhZC5cbiAgICpcbiAgICogQHJldHVybiB7KFJhbmdlRXJyb3J8dW5kZWZpbmVkKX0gQSBwb3NzaWJsZSBlcnJvclxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGF2ZUxlbmd0aCgpIHtcbiAgICBpZiAodGhpcy5fcGF5bG9hZExlbmd0aCAmJiB0aGlzLl9vcGNvZGUgPCAweDA4KSB7XG4gICAgICB0aGlzLl90b3RhbFBheWxvYWRMZW5ndGggKz0gdGhpcy5fcGF5bG9hZExlbmd0aDtcbiAgICAgIGlmICh0aGlzLl90b3RhbFBheWxvYWRMZW5ndGggPiB0aGlzLl9tYXhQYXlsb2FkICYmIHRoaXMuX21heFBheWxvYWQgPiAwKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGVycm9yKFxuICAgICAgICAgIFJhbmdlRXJyb3IsXG4gICAgICAgICAgJ01heCBwYXlsb2FkIHNpemUgZXhjZWVkZWQnLFxuICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgIDEwMDksXG4gICAgICAgICAgJ1dTX0VSUl9VTlNVUFBPUlRFRF9NRVNTQUdFX0xFTkdUSCdcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fbWFza2VkKSB0aGlzLl9zdGF0ZSA9IEdFVF9NQVNLO1xuICAgIGVsc2UgdGhpcy5fc3RhdGUgPSBHRVRfREFUQTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyBtYXNrIGJ5dGVzLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0TWFzaygpIHtcbiAgICBpZiAodGhpcy5fYnVmZmVyZWRCeXRlcyA8IDQpIHtcbiAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9tYXNrID0gdGhpcy5jb25zdW1lKDQpO1xuICAgIHRoaXMuX3N0YXRlID0gR0VUX0RBVEE7XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgZGF0YSBieXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgQ2FsbGJhY2tcbiAgICogQHJldHVybiB7KEVycm9yfFJhbmdlRXJyb3J8dW5kZWZpbmVkKX0gQSBwb3NzaWJsZSBlcnJvclxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZ2V0RGF0YShjYikge1xuICAgIGxldCBkYXRhID0gRU1QVFlfQlVGRkVSO1xuXG4gICAgaWYgKHRoaXMuX3BheWxvYWRMZW5ndGgpIHtcbiAgICAgIGlmICh0aGlzLl9idWZmZXJlZEJ5dGVzIDwgdGhpcy5fcGF5bG9hZExlbmd0aCkge1xuICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZGF0YSA9IHRoaXMuY29uc3VtZSh0aGlzLl9wYXlsb2FkTGVuZ3RoKTtcblxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLl9tYXNrZWQgJiZcbiAgICAgICAgKHRoaXMuX21hc2tbMF0gfCB0aGlzLl9tYXNrWzFdIHwgdGhpcy5fbWFza1syXSB8IHRoaXMuX21hc2tbM10pICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgdW5tYXNrKGRhdGEsIHRoaXMuX21hc2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9vcGNvZGUgPiAweDA3KSByZXR1cm4gdGhpcy5jb250cm9sTWVzc2FnZShkYXRhKTtcblxuICAgIGlmICh0aGlzLl9jb21wcmVzc2VkKSB7XG4gICAgICB0aGlzLl9zdGF0ZSA9IElORkxBVElORztcbiAgICAgIHRoaXMuZGVjb21wcmVzcyhkYXRhLCBjYik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGRhdGEubGVuZ3RoKSB7XG4gICAgICAvL1xuICAgICAgLy8gVGhpcyBtZXNzYWdlIGlzIG5vdCBjb21wcmVzc2VkIHNvIGl0cyBsZW5ndGggaXMgdGhlIHN1bSBvZiB0aGUgcGF5bG9hZFxuICAgICAgLy8gbGVuZ3RoIG9mIGFsbCBmcmFnbWVudHMuXG4gICAgICAvL1xuICAgICAgdGhpcy5fbWVzc2FnZUxlbmd0aCA9IHRoaXMuX3RvdGFsUGF5bG9hZExlbmd0aDtcbiAgICAgIHRoaXMuX2ZyYWdtZW50cy5wdXNoKGRhdGEpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmRhdGFNZXNzYWdlKCk7XG4gIH1cblxuICAvKipcbiAgICogRGVjb21wcmVzc2VzIGRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7QnVmZmVyfSBkYXRhIENvbXByZXNzZWQgZGF0YVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZGVjb21wcmVzcyhkYXRhLCBjYikge1xuICAgIGNvbnN0IHBlck1lc3NhZ2VEZWZsYXRlID0gdGhpcy5fZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXTtcblxuICAgIHBlck1lc3NhZ2VEZWZsYXRlLmRlY29tcHJlc3MoZGF0YSwgdGhpcy5fZmluLCAoZXJyLCBidWYpID0+IHtcbiAgICAgIGlmIChlcnIpIHJldHVybiBjYihlcnIpO1xuXG4gICAgICBpZiAoYnVmLmxlbmd0aCkge1xuICAgICAgICB0aGlzLl9tZXNzYWdlTGVuZ3RoICs9IGJ1Zi5sZW5ndGg7XG4gICAgICAgIGlmICh0aGlzLl9tZXNzYWdlTGVuZ3RoID4gdGhpcy5fbWF4UGF5bG9hZCAmJiB0aGlzLl9tYXhQYXlsb2FkID4gMCkge1xuICAgICAgICAgIHJldHVybiBjYihcbiAgICAgICAgICAgIGVycm9yKFxuICAgICAgICAgICAgICBSYW5nZUVycm9yLFxuICAgICAgICAgICAgICAnTWF4IHBheWxvYWQgc2l6ZSBleGNlZWRlZCcsXG4gICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgICAxMDA5LFxuICAgICAgICAgICAgICAnV1NfRVJSX1VOU1VQUE9SVEVEX01FU1NBR0VfTEVOR1RIJ1xuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9mcmFnbWVudHMucHVzaChidWYpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBlciA9IHRoaXMuZGF0YU1lc3NhZ2UoKTtcbiAgICAgIGlmIChlcikgcmV0dXJuIGNiKGVyKTtcblxuICAgICAgdGhpcy5zdGFydExvb3AoY2IpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYSBkYXRhIG1lc3NhZ2UuXG4gICAqXG4gICAqIEByZXR1cm4geyhFcnJvcnx1bmRlZmluZWQpfSBBIHBvc3NpYmxlIGVycm9yXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkYXRhTWVzc2FnZSgpIHtcbiAgICBpZiAodGhpcy5fZmluKSB7XG4gICAgICBjb25zdCBtZXNzYWdlTGVuZ3RoID0gdGhpcy5fbWVzc2FnZUxlbmd0aDtcbiAgICAgIGNvbnN0IGZyYWdtZW50cyA9IHRoaXMuX2ZyYWdtZW50cztcblxuICAgICAgdGhpcy5fdG90YWxQYXlsb2FkTGVuZ3RoID0gMDtcbiAgICAgIHRoaXMuX21lc3NhZ2VMZW5ndGggPSAwO1xuICAgICAgdGhpcy5fZnJhZ21lbnRlZCA9IDA7XG4gICAgICB0aGlzLl9mcmFnbWVudHMgPSBbXTtcblxuICAgICAgaWYgKHRoaXMuX29wY29kZSA9PT0gMikge1xuICAgICAgICBsZXQgZGF0YTtcblxuICAgICAgICBpZiAodGhpcy5fYmluYXJ5VHlwZSA9PT0gJ25vZGVidWZmZXInKSB7XG4gICAgICAgICAgZGF0YSA9IGNvbmNhdChmcmFnbWVudHMsIG1lc3NhZ2VMZW5ndGgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JpbmFyeVR5cGUgPT09ICdhcnJheWJ1ZmZlcicpIHtcbiAgICAgICAgICBkYXRhID0gdG9BcnJheUJ1ZmZlcihjb25jYXQoZnJhZ21lbnRzLCBtZXNzYWdlTGVuZ3RoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGF0YSA9IGZyYWdtZW50cztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW1pdCgnbWVzc2FnZScsIGRhdGEsIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgYnVmID0gY29uY2F0KGZyYWdtZW50cywgbWVzc2FnZUxlbmd0aCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9za2lwVVRGOFZhbGlkYXRpb24gJiYgIWlzVmFsaWRVVEY4KGJ1ZikpIHtcbiAgICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIGVycm9yKFxuICAgICAgICAgICAgRXJyb3IsXG4gICAgICAgICAgICAnaW52YWxpZCBVVEYtOCBzZXF1ZW5jZScsXG4gICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgMTAwNyxcbiAgICAgICAgICAgICdXU19FUlJfSU5WQUxJRF9VVEY4J1xuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBidWYsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9zdGF0ZSA9IEdFVF9JTkZPO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYSBjb250cm9sIG1lc3NhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7QnVmZmVyfSBkYXRhIERhdGEgdG8gaGFuZGxlXG4gICAqIEByZXR1cm4geyhFcnJvcnxSYW5nZUVycm9yfHVuZGVmaW5lZCl9IEEgcG9zc2libGUgZXJyb3JcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNvbnRyb2xNZXNzYWdlKGRhdGEpIHtcbiAgICBpZiAodGhpcy5fb3Bjb2RlID09PSAweDA4KSB7XG4gICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG5cbiAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2NvbmNsdWRlJywgMTAwNSwgRU1QVFlfQlVGRkVSKTtcbiAgICAgICAgdGhpcy5lbmQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGNvZGUgPSBkYXRhLnJlYWRVSW50MTZCRSgwKTtcblxuICAgICAgICBpZiAoIWlzVmFsaWRTdGF0dXNDb2RlKGNvZGUpKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yKFxuICAgICAgICAgICAgUmFuZ2VFcnJvcixcbiAgICAgICAgICAgIGBpbnZhbGlkIHN0YXR1cyBjb2RlICR7Y29kZX1gLFxuICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIDEwMDIsXG4gICAgICAgICAgICAnV1NfRVJSX0lOVkFMSURfQ0xPU0VfQ09ERSdcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYnVmID0gbmV3IEZhc3RCdWZmZXIoXG4gICAgICAgICAgZGF0YS5idWZmZXIsXG4gICAgICAgICAgZGF0YS5ieXRlT2Zmc2V0ICsgMixcbiAgICAgICAgICBkYXRhLmxlbmd0aCAtIDJcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3NraXBVVEY4VmFsaWRhdGlvbiAmJiAhaXNWYWxpZFVURjgoYnVmKSkge1xuICAgICAgICAgIHJldHVybiBlcnJvcihcbiAgICAgICAgICAgIEVycm9yLFxuICAgICAgICAgICAgJ2ludmFsaWQgVVRGLTggc2VxdWVuY2UnLFxuICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIDEwMDcsXG4gICAgICAgICAgICAnV1NfRVJSX0lOVkFMSURfVVRGOCdcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0KCdjb25jbHVkZScsIGNvZGUsIGJ1Zik7XG4gICAgICAgIHRoaXMuZW5kKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLl9vcGNvZGUgPT09IDB4MDkpIHtcbiAgICAgIHRoaXMuZW1pdCgncGluZycsIGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVtaXQoJ3BvbmcnLCBkYXRhKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zdGF0ZSA9IEdFVF9JTkZPO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVjZWl2ZXI7XG5cbi8qKlxuICogQnVpbGRzIGFuIGVycm9yIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKG5ldzpFcnJvcnxSYW5nZUVycm9yKX0gRXJyb3JDdG9yIFRoZSBlcnJvciBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2VcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gcHJlZml4IFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBhZGQgYSBkZWZhdWx0IHByZWZpeCB0b1xuICogICAgIGBtZXNzYWdlYFxuICogQHBhcmFtIHtOdW1iZXJ9IHN0YXR1c0NvZGUgVGhlIHN0YXR1cyBjb2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3JDb2RlIFRoZSBleHBvc2VkIGVycm9yIGNvZGVcbiAqIEByZXR1cm4geyhFcnJvcnxSYW5nZUVycm9yKX0gVGhlIGVycm9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlcnJvcihFcnJvckN0b3IsIG1lc3NhZ2UsIHByZWZpeCwgc3RhdHVzQ29kZSwgZXJyb3JDb2RlKSB7XG4gIGNvbnN0IGVyciA9IG5ldyBFcnJvckN0b3IoXG4gICAgcHJlZml4ID8gYEludmFsaWQgV2ViU29ja2V0IGZyYW1lOiAke21lc3NhZ2V9YCA6IG1lc3NhZ2VcbiAgKTtcblxuICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShlcnIsIGVycm9yKTtcbiAgZXJyLmNvZGUgPSBlcnJvckNvZGU7XG4gIGVycltrU3RhdHVzQ29kZV0gPSBzdGF0dXNDb2RlO1xuICByZXR1cm4gZXJyO1xufVxuIiwiLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbXCJlcnJvclwiLCB7IFwidmFyc0lnbm9yZVBhdHRlcm5cIjogXCJebmV0fHRscyRcIiB9XSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IG5ldCA9IHJlcXVpcmUoJ25ldCcpO1xuY29uc3QgdGxzID0gcmVxdWlyZSgndGxzJyk7XG5jb25zdCB7IHJhbmRvbUZpbGxTeW5jIH0gPSByZXF1aXJlKCdjcnlwdG8nKTtcblxuY29uc3QgUGVyTWVzc2FnZURlZmxhdGUgPSByZXF1aXJlKCcuL3Blcm1lc3NhZ2UtZGVmbGF0ZScpO1xuY29uc3QgeyBFTVBUWV9CVUZGRVIgfSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5jb25zdCB7IGlzVmFsaWRTdGF0dXNDb2RlIH0gPSByZXF1aXJlKCcuL3ZhbGlkYXRpb24nKTtcbmNvbnN0IHsgbWFzazogYXBwbHlNYXNrLCB0b0J1ZmZlciB9ID0gcmVxdWlyZSgnLi9idWZmZXItdXRpbCcpO1xuXG5jb25zdCBrQnl0ZUxlbmd0aCA9IFN5bWJvbCgna0J5dGVMZW5ndGgnKTtcbmNvbnN0IG1hc2tCdWZmZXIgPSBCdWZmZXIuYWxsb2MoNCk7XG5cbi8qKlxuICogSHlCaSBTZW5kZXIgaW1wbGVtZW50YXRpb24uXG4gKi9cbmNsYXNzIFNlbmRlciB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgU2VuZGVyIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0geyhuZXQuU29ja2V0fHRscy5Tb2NrZXQpfSBzb2NrZXQgVGhlIGNvbm5lY3Rpb24gc29ja2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbZXh0ZW5zaW9uc10gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG5lZ290aWF0ZWQgZXh0ZW5zaW9uc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZ2VuZXJhdGVNYXNrXSBUaGUgZnVuY3Rpb24gdXNlZCB0byBnZW5lcmF0ZSB0aGUgbWFza2luZ1xuICAgKiAgICAga2V5XG4gICAqL1xuICBjb25zdHJ1Y3Rvcihzb2NrZXQsIGV4dGVuc2lvbnMsIGdlbmVyYXRlTWFzaykge1xuICAgIHRoaXMuX2V4dGVuc2lvbnMgPSBleHRlbnNpb25zIHx8IHt9O1xuXG4gICAgaWYgKGdlbmVyYXRlTWFzaykge1xuICAgICAgdGhpcy5fZ2VuZXJhdGVNYXNrID0gZ2VuZXJhdGVNYXNrO1xuICAgICAgdGhpcy5fbWFza0J1ZmZlciA9IEJ1ZmZlci5hbGxvYyg0KTtcbiAgICB9XG5cbiAgICB0aGlzLl9zb2NrZXQgPSBzb2NrZXQ7XG5cbiAgICB0aGlzLl9maXJzdEZyYWdtZW50ID0gdHJ1ZTtcbiAgICB0aGlzLl9jb21wcmVzcyA9IGZhbHNlO1xuXG4gICAgdGhpcy5fYnVmZmVyZWRCeXRlcyA9IDA7XG4gICAgdGhpcy5fZGVmbGF0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5fcXVldWUgPSBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGcmFtZXMgYSBwaWVjZSBvZiBkYXRhIGFjY29yZGluZyB0byB0aGUgSHlCaSBXZWJTb2NrZXQgcHJvdG9jb2wuXG4gICAqXG4gICAqIEBwYXJhbSB7KEJ1ZmZlcnxTdHJpbmcpfSBkYXRhIFRoZSBkYXRhIHRvIGZyYW1lXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIE9wdGlvbnMgb2JqZWN0XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZmluPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gc2V0IHRoZVxuICAgKiAgICAgRklOIGJpdFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5nZW5lcmF0ZU1hc2tdIFRoZSBmdW5jdGlvbiB1c2VkIHRvIGdlbmVyYXRlIHRoZVxuICAgKiAgICAgbWFza2luZyBrZXlcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tYXNrPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gbWFza1xuICAgKiAgICAgYGRhdGFgXG4gICAqIEBwYXJhbSB7QnVmZmVyfSBbb3B0aW9ucy5tYXNrQnVmZmVyXSBUaGUgYnVmZmVyIHVzZWQgdG8gc3RvcmUgdGhlIG1hc2tpbmdcbiAgICogICAgIGtleVxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5vcGNvZGUgVGhlIG9wY29kZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnJlYWRPbmx5PWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBgZGF0YWAgY2FuIGJlXG4gICAqICAgICBtb2RpZmllZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnJzdjE9ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBzZXQgdGhlXG4gICAqICAgICBSU1YxIGJpdFxuICAgKiBAcmV0dXJuIHsoQnVmZmVyfFN0cmluZylbXX0gVGhlIGZyYW1lZCBkYXRhXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHN0YXRpYyBmcmFtZShkYXRhLCBvcHRpb25zKSB7XG4gICAgbGV0IG1hc2s7XG4gICAgbGV0IG1lcmdlID0gZmFsc2U7XG4gICAgbGV0IG9mZnNldCA9IDI7XG4gICAgbGV0IHNraXBNYXNraW5nID0gZmFsc2U7XG5cbiAgICBpZiAob3B0aW9ucy5tYXNrKSB7XG4gICAgICBtYXNrID0gb3B0aW9ucy5tYXNrQnVmZmVyIHx8IG1hc2tCdWZmZXI7XG5cbiAgICAgIGlmIChvcHRpb25zLmdlbmVyYXRlTWFzaykge1xuICAgICAgICBvcHRpb25zLmdlbmVyYXRlTWFzayhtYXNrKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhbmRvbUZpbGxTeW5jKG1hc2ssIDAsIDQpO1xuICAgICAgfVxuXG4gICAgICBza2lwTWFza2luZyA9IChtYXNrWzBdIHwgbWFza1sxXSB8IG1hc2tbMl0gfCBtYXNrWzNdKSA9PT0gMDtcbiAgICAgIG9mZnNldCA9IDY7XG4gICAgfVxuXG4gICAgbGV0IGRhdGFMZW5ndGg7XG5cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpZiAoXG4gICAgICAgICghb3B0aW9ucy5tYXNrIHx8IHNraXBNYXNraW5nKSAmJlxuICAgICAgICBvcHRpb25zW2tCeXRlTGVuZ3RoXSAhPT0gdW5kZWZpbmVkXG4gICAgICApIHtcbiAgICAgICAgZGF0YUxlbmd0aCA9IG9wdGlvbnNba0J5dGVMZW5ndGhdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YSA9IEJ1ZmZlci5mcm9tKGRhdGEpO1xuICAgICAgICBkYXRhTGVuZ3RoID0gZGF0YS5sZW5ndGg7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGFMZW5ndGggPSBkYXRhLmxlbmd0aDtcbiAgICAgIG1lcmdlID0gb3B0aW9ucy5tYXNrICYmIG9wdGlvbnMucmVhZE9ubHkgJiYgIXNraXBNYXNraW5nO1xuICAgIH1cblxuICAgIGxldCBwYXlsb2FkTGVuZ3RoID0gZGF0YUxlbmd0aDtcblxuICAgIGlmIChkYXRhTGVuZ3RoID49IDY1NTM2KSB7XG4gICAgICBvZmZzZXQgKz0gODtcbiAgICAgIHBheWxvYWRMZW5ndGggPSAxMjc7XG4gICAgfSBlbHNlIGlmIChkYXRhTGVuZ3RoID4gMTI1KSB7XG4gICAgICBvZmZzZXQgKz0gMjtcbiAgICAgIHBheWxvYWRMZW5ndGggPSAxMjY7XG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0ID0gQnVmZmVyLmFsbG9jVW5zYWZlKG1lcmdlID8gZGF0YUxlbmd0aCArIG9mZnNldCA6IG9mZnNldCk7XG5cbiAgICB0YXJnZXRbMF0gPSBvcHRpb25zLmZpbiA/IG9wdGlvbnMub3Bjb2RlIHwgMHg4MCA6IG9wdGlvbnMub3Bjb2RlO1xuICAgIGlmIChvcHRpb25zLnJzdjEpIHRhcmdldFswXSB8PSAweDQwO1xuXG4gICAgdGFyZ2V0WzFdID0gcGF5bG9hZExlbmd0aDtcblxuICAgIGlmIChwYXlsb2FkTGVuZ3RoID09PSAxMjYpIHtcbiAgICAgIHRhcmdldC53cml0ZVVJbnQxNkJFKGRhdGFMZW5ndGgsIDIpO1xuICAgIH0gZWxzZSBpZiAocGF5bG9hZExlbmd0aCA9PT0gMTI3KSB7XG4gICAgICB0YXJnZXRbMl0gPSB0YXJnZXRbM10gPSAwO1xuICAgICAgdGFyZ2V0LndyaXRlVUludEJFKGRhdGFMZW5ndGgsIDQsIDYpO1xuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy5tYXNrKSByZXR1cm4gW3RhcmdldCwgZGF0YV07XG5cbiAgICB0YXJnZXRbMV0gfD0gMHg4MDtcbiAgICB0YXJnZXRbb2Zmc2V0IC0gNF0gPSBtYXNrWzBdO1xuICAgIHRhcmdldFtvZmZzZXQgLSAzXSA9IG1hc2tbMV07XG4gICAgdGFyZ2V0W29mZnNldCAtIDJdID0gbWFza1syXTtcbiAgICB0YXJnZXRbb2Zmc2V0IC0gMV0gPSBtYXNrWzNdO1xuXG4gICAgaWYgKHNraXBNYXNraW5nKSByZXR1cm4gW3RhcmdldCwgZGF0YV07XG5cbiAgICBpZiAobWVyZ2UpIHtcbiAgICAgIGFwcGx5TWFzayhkYXRhLCBtYXNrLCB0YXJnZXQsIG9mZnNldCwgZGF0YUxlbmd0aCk7XG4gICAgICByZXR1cm4gW3RhcmdldF07XG4gICAgfVxuXG4gICAgYXBwbHlNYXNrKGRhdGEsIG1hc2ssIGRhdGEsIDAsIGRhdGFMZW5ndGgpO1xuICAgIHJldHVybiBbdGFyZ2V0LCBkYXRhXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIGNsb3NlIG1lc3NhZ2UgdG8gdGhlIG90aGVyIHBlZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29kZV0gVGhlIHN0YXR1cyBjb2RlIGNvbXBvbmVudCBvZiB0aGUgYm9keVxuICAgKiBAcGFyYW0geyhTdHJpbmd8QnVmZmVyKX0gW2RhdGFdIFRoZSBtZXNzYWdlIGNvbXBvbmVudCBvZiB0aGUgYm9keVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFttYXNrPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gbWFzayB0aGUgbWVzc2FnZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdIENhbGxiYWNrXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNsb3NlKGNvZGUsIGRhdGEsIG1hc2ssIGNiKSB7XG4gICAgbGV0IGJ1ZjtcblxuICAgIGlmIChjb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJ1ZiA9IEVNUFRZX0JVRkZFUjtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb2RlICE9PSAnbnVtYmVyJyB8fCAhaXNWYWxpZFN0YXR1c0NvZGUoY29kZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSB2YWxpZCBlcnJvciBjb2RlIG51bWJlcicpO1xuICAgIH0gZWxzZSBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkIHx8ICFkYXRhLmxlbmd0aCkge1xuICAgICAgYnVmID0gQnVmZmVyLmFsbG9jVW5zYWZlKDIpO1xuICAgICAgYnVmLndyaXRlVUludDE2QkUoY29kZSwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IEJ1ZmZlci5ieXRlTGVuZ3RoKGRhdGEpO1xuXG4gICAgICBpZiAobGVuZ3RoID4gMTIzKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgbWVzc2FnZSBtdXN0IG5vdCBiZSBncmVhdGVyIHRoYW4gMTIzIGJ5dGVzJyk7XG4gICAgICB9XG5cbiAgICAgIGJ1ZiA9IEJ1ZmZlci5hbGxvY1Vuc2FmZSgyICsgbGVuZ3RoKTtcbiAgICAgIGJ1Zi53cml0ZVVJbnQxNkJFKGNvZGUsIDApO1xuXG4gICAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGJ1Zi53cml0ZShkYXRhLCAyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1Zi5zZXQoZGF0YSwgMik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIFtrQnl0ZUxlbmd0aF06IGJ1Zi5sZW5ndGgsXG4gICAgICBmaW46IHRydWUsXG4gICAgICBnZW5lcmF0ZU1hc2s6IHRoaXMuX2dlbmVyYXRlTWFzayxcbiAgICAgIG1hc2ssXG4gICAgICBtYXNrQnVmZmVyOiB0aGlzLl9tYXNrQnVmZmVyLFxuICAgICAgb3Bjb2RlOiAweDA4LFxuICAgICAgcmVhZE9ubHk6IGZhbHNlLFxuICAgICAgcnN2MTogZmFsc2VcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuX2RlZmxhdGluZykge1xuICAgICAgdGhpcy5lbnF1ZXVlKFt0aGlzLmRpc3BhdGNoLCBidWYsIGZhbHNlLCBvcHRpb25zLCBjYl0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbmRGcmFtZShTZW5kZXIuZnJhbWUoYnVmLCBvcHRpb25zKSwgY2IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIHBpbmcgbWVzc2FnZSB0byB0aGUgb3RoZXIgcGVlci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBkYXRhIFRoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICogQHBhcmFtIHtCb29sZWFufSBbbWFzaz1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIG1hc2sgYGRhdGFgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl0gQ2FsbGJhY2tcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcGluZyhkYXRhLCBtYXNrLCBjYikge1xuICAgIGxldCBieXRlTGVuZ3RoO1xuICAgIGxldCByZWFkT25seTtcblxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGJ5dGVMZW5ndGggPSBCdWZmZXIuYnl0ZUxlbmd0aChkYXRhKTtcbiAgICAgIHJlYWRPbmx5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSB0b0J1ZmZlcihkYXRhKTtcbiAgICAgIGJ5dGVMZW5ndGggPSBkYXRhLmxlbmd0aDtcbiAgICAgIHJlYWRPbmx5ID0gdG9CdWZmZXIucmVhZE9ubHk7XG4gICAgfVxuXG4gICAgaWYgKGJ5dGVMZW5ndGggPiAxMjUpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgZGF0YSBzaXplIG11c3Qgbm90IGJlIGdyZWF0ZXIgdGhhbiAxMjUgYnl0ZXMnKTtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgW2tCeXRlTGVuZ3RoXTogYnl0ZUxlbmd0aCxcbiAgICAgIGZpbjogdHJ1ZSxcbiAgICAgIGdlbmVyYXRlTWFzazogdGhpcy5fZ2VuZXJhdGVNYXNrLFxuICAgICAgbWFzayxcbiAgICAgIG1hc2tCdWZmZXI6IHRoaXMuX21hc2tCdWZmZXIsXG4gICAgICBvcGNvZGU6IDB4MDksXG4gICAgICByZWFkT25seSxcbiAgICAgIHJzdjE6IGZhbHNlXG4gICAgfTtcblxuICAgIGlmICh0aGlzLl9kZWZsYXRpbmcpIHtcbiAgICAgIHRoaXMuZW5xdWV1ZShbdGhpcy5kaXNwYXRjaCwgZGF0YSwgZmFsc2UsIG9wdGlvbnMsIGNiXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VuZEZyYW1lKFNlbmRlci5mcmFtZShkYXRhLCBvcHRpb25zKSwgY2IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIHBvbmcgbWVzc2FnZSB0byB0aGUgb3RoZXIgcGVlci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBkYXRhIFRoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICogQHBhcmFtIHtCb29sZWFufSBbbWFzaz1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIG1hc2sgYGRhdGFgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl0gQ2FsbGJhY2tcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcG9uZyhkYXRhLCBtYXNrLCBjYikge1xuICAgIGxldCBieXRlTGVuZ3RoO1xuICAgIGxldCByZWFkT25seTtcblxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGJ5dGVMZW5ndGggPSBCdWZmZXIuYnl0ZUxlbmd0aChkYXRhKTtcbiAgICAgIHJlYWRPbmx5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSB0b0J1ZmZlcihkYXRhKTtcbiAgICAgIGJ5dGVMZW5ndGggPSBkYXRhLmxlbmd0aDtcbiAgICAgIHJlYWRPbmx5ID0gdG9CdWZmZXIucmVhZE9ubHk7XG4gICAgfVxuXG4gICAgaWYgKGJ5dGVMZW5ndGggPiAxMjUpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgZGF0YSBzaXplIG11c3Qgbm90IGJlIGdyZWF0ZXIgdGhhbiAxMjUgYnl0ZXMnKTtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgW2tCeXRlTGVuZ3RoXTogYnl0ZUxlbmd0aCxcbiAgICAgIGZpbjogdHJ1ZSxcbiAgICAgIGdlbmVyYXRlTWFzazogdGhpcy5fZ2VuZXJhdGVNYXNrLFxuICAgICAgbWFzayxcbiAgICAgIG1hc2tCdWZmZXI6IHRoaXMuX21hc2tCdWZmZXIsXG4gICAgICBvcGNvZGU6IDB4MGEsXG4gICAgICByZWFkT25seSxcbiAgICAgIHJzdjE6IGZhbHNlXG4gICAgfTtcblxuICAgIGlmICh0aGlzLl9kZWZsYXRpbmcpIHtcbiAgICAgIHRoaXMuZW5xdWV1ZShbdGhpcy5kaXNwYXRjaCwgZGF0YSwgZmFsc2UsIG9wdGlvbnMsIGNiXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VuZEZyYW1lKFNlbmRlci5mcmFtZShkYXRhLCBvcHRpb25zKSwgY2IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIGRhdGEgbWVzc2FnZSB0byB0aGUgb3RoZXIgcGVlci5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBkYXRhIFRoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgT3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5iaW5hcnk9ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIGBkYXRhYCBpcyBiaW5hcnlcbiAgICogICAgIG9yIHRleHRcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jb21wcmVzcz1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvXG4gICAqICAgICBjb21wcmVzcyBgZGF0YWBcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5maW49ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIHRoZSBmcmFnbWVudCBpcyB0aGVcbiAgICogICAgIGxhc3Qgb25lXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWFzaz1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIG1hc2tcbiAgICogICAgIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdIENhbGxiYWNrXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHNlbmQoZGF0YSwgb3B0aW9ucywgY2IpIHtcbiAgICBjb25zdCBwZXJNZXNzYWdlRGVmbGF0ZSA9IHRoaXMuX2V4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV07XG4gICAgbGV0IG9wY29kZSA9IG9wdGlvbnMuYmluYXJ5ID8gMiA6IDE7XG4gICAgbGV0IHJzdjEgPSBvcHRpb25zLmNvbXByZXNzO1xuXG4gICAgbGV0IGJ5dGVMZW5ndGg7XG4gICAgbGV0IHJlYWRPbmx5O1xuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgYnl0ZUxlbmd0aCA9IEJ1ZmZlci5ieXRlTGVuZ3RoKGRhdGEpO1xuICAgICAgcmVhZE9ubHkgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IHRvQnVmZmVyKGRhdGEpO1xuICAgICAgYnl0ZUxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgICAgcmVhZE9ubHkgPSB0b0J1ZmZlci5yZWFkT25seTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZmlyc3RGcmFnbWVudCkge1xuICAgICAgdGhpcy5fZmlyc3RGcmFnbWVudCA9IGZhbHNlO1xuICAgICAgaWYgKFxuICAgICAgICByc3YxICYmXG4gICAgICAgIHBlck1lc3NhZ2VEZWZsYXRlICYmXG4gICAgICAgIHBlck1lc3NhZ2VEZWZsYXRlLnBhcmFtc1tcbiAgICAgICAgICBwZXJNZXNzYWdlRGVmbGF0ZS5faXNTZXJ2ZXJcbiAgICAgICAgICAgID8gJ3NlcnZlcl9ub19jb250ZXh0X3Rha2VvdmVyJ1xuICAgICAgICAgICAgOiAnY2xpZW50X25vX2NvbnRleHRfdGFrZW92ZXInXG4gICAgICAgIF1cbiAgICAgICkge1xuICAgICAgICByc3YxID0gYnl0ZUxlbmd0aCA+PSBwZXJNZXNzYWdlRGVmbGF0ZS5fdGhyZXNob2xkO1xuICAgICAgfVxuICAgICAgdGhpcy5fY29tcHJlc3MgPSByc3YxO1xuICAgIH0gZWxzZSB7XG4gICAgICByc3YxID0gZmFsc2U7XG4gICAgICBvcGNvZGUgPSAwO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmZpbikgdGhpcy5fZmlyc3RGcmFnbWVudCA9IHRydWU7XG5cbiAgICBpZiAocGVyTWVzc2FnZURlZmxhdGUpIHtcbiAgICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICAgIFtrQnl0ZUxlbmd0aF06IGJ5dGVMZW5ndGgsXG4gICAgICAgIGZpbjogb3B0aW9ucy5maW4sXG4gICAgICAgIGdlbmVyYXRlTWFzazogdGhpcy5fZ2VuZXJhdGVNYXNrLFxuICAgICAgICBtYXNrOiBvcHRpb25zLm1hc2ssXG4gICAgICAgIG1hc2tCdWZmZXI6IHRoaXMuX21hc2tCdWZmZXIsXG4gICAgICAgIG9wY29kZSxcbiAgICAgICAgcmVhZE9ubHksXG4gICAgICAgIHJzdjFcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLl9kZWZsYXRpbmcpIHtcbiAgICAgICAgdGhpcy5lbnF1ZXVlKFt0aGlzLmRpc3BhdGNoLCBkYXRhLCB0aGlzLl9jb21wcmVzcywgb3B0cywgY2JdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2goZGF0YSwgdGhpcy5fY29tcHJlc3MsIG9wdHMsIGNiKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZW5kRnJhbWUoXG4gICAgICAgIFNlbmRlci5mcmFtZShkYXRhLCB7XG4gICAgICAgICAgW2tCeXRlTGVuZ3RoXTogYnl0ZUxlbmd0aCxcbiAgICAgICAgICBmaW46IG9wdGlvbnMuZmluLFxuICAgICAgICAgIGdlbmVyYXRlTWFzazogdGhpcy5fZ2VuZXJhdGVNYXNrLFxuICAgICAgICAgIG1hc2s6IG9wdGlvbnMubWFzayxcbiAgICAgICAgICBtYXNrQnVmZmVyOiB0aGlzLl9tYXNrQnVmZmVyLFxuICAgICAgICAgIG9wY29kZSxcbiAgICAgICAgICByZWFkT25seSxcbiAgICAgICAgICByc3YxOiBmYWxzZVxuICAgICAgICB9KSxcbiAgICAgICAgY2JcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYSBtZXNzYWdlLlxuICAgKlxuICAgKiBAcGFyYW0geyhCdWZmZXJ8U3RyaW5nKX0gZGF0YSBUaGUgbWVzc2FnZSB0byBzZW5kXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2NvbXByZXNzPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gY29tcHJlc3NcbiAgICogICAgIGBkYXRhYFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPcHRpb25zIG9iamVjdFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmZpbj1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIHNldCB0aGVcbiAgICogICAgIEZJTiBiaXRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuZ2VuZXJhdGVNYXNrXSBUaGUgZnVuY3Rpb24gdXNlZCB0byBnZW5lcmF0ZSB0aGVcbiAgICogICAgIG1hc2tpbmcga2V5XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWFzaz1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIG1hc2tcbiAgICogICAgIGBkYXRhYFxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gW29wdGlvbnMubWFza0J1ZmZlcl0gVGhlIGJ1ZmZlciB1c2VkIHRvIHN0b3JlIHRoZSBtYXNraW5nXG4gICAqICAgICBrZXlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMub3Bjb2RlIFRoZSBvcGNvZGVcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5yZWFkT25seT1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgYGRhdGFgIGNhbiBiZVxuICAgKiAgICAgbW9kaWZpZWRcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5yc3YxPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gc2V0IHRoZVxuICAgKiAgICAgUlNWMSBiaXRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXSBDYWxsYmFja1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZGlzcGF0Y2goZGF0YSwgY29tcHJlc3MsIG9wdGlvbnMsIGNiKSB7XG4gICAgaWYgKCFjb21wcmVzcykge1xuICAgICAgdGhpcy5zZW5kRnJhbWUoU2VuZGVyLmZyYW1lKGRhdGEsIG9wdGlvbnMpLCBjYik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGVyTWVzc2FnZURlZmxhdGUgPSB0aGlzLl9leHRlbnNpb25zW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdO1xuXG4gICAgdGhpcy5fYnVmZmVyZWRCeXRlcyArPSBvcHRpb25zW2tCeXRlTGVuZ3RoXTtcbiAgICB0aGlzLl9kZWZsYXRpbmcgPSB0cnVlO1xuICAgIHBlck1lc3NhZ2VEZWZsYXRlLmNvbXByZXNzKGRhdGEsIG9wdGlvbnMuZmluLCAoXywgYnVmKSA9PiB7XG4gICAgICBpZiAodGhpcy5fc29ja2V0LmRlc3Ryb3llZCkge1xuICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1RoZSBzb2NrZXQgd2FzIGNsb3NlZCB3aGlsZSBkYXRhIHdhcyBiZWluZyBjb21wcmVzc2VkJ1xuICAgICAgICApO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicpIGNiKGVycik7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9xdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuX3F1ZXVlW2ldO1xuICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gcGFyYW1zW3BhcmFtcy5sZW5ndGggLSAxXTtcblxuICAgICAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrKGVycik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2J1ZmZlcmVkQnl0ZXMgLT0gb3B0aW9uc1trQnl0ZUxlbmd0aF07XG4gICAgICB0aGlzLl9kZWZsYXRpbmcgPSBmYWxzZTtcbiAgICAgIG9wdGlvbnMucmVhZE9ubHkgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2VuZEZyYW1lKFNlbmRlci5mcmFtZShidWYsIG9wdGlvbnMpLCBjYik7XG4gICAgICB0aGlzLmRlcXVldWUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyBxdWV1ZWQgc2VuZCBvcGVyYXRpb25zLlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZGVxdWV1ZSgpIHtcbiAgICB3aGlsZSAoIXRoaXMuX2RlZmxhdGluZyAmJiB0aGlzLl9xdWV1ZS5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHRoaXMuX3F1ZXVlLnNoaWZ0KCk7XG5cbiAgICAgIHRoaXMuX2J1ZmZlcmVkQnl0ZXMgLT0gcGFyYW1zWzNdW2tCeXRlTGVuZ3RoXTtcbiAgICAgIFJlZmxlY3QuYXBwbHkocGFyYW1zWzBdLCB0aGlzLCBwYXJhbXMuc2xpY2UoMSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbnF1ZXVlcyBhIHNlbmQgb3BlcmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMgU2VuZCBvcGVyYXRpb24gcGFyYW1ldGVycy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGVucXVldWUocGFyYW1zKSB7XG4gICAgdGhpcy5fYnVmZmVyZWRCeXRlcyArPSBwYXJhbXNbM11ba0J5dGVMZW5ndGhdO1xuICAgIHRoaXMuX3F1ZXVlLnB1c2gocGFyYW1zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIGZyYW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge0J1ZmZlcltdfSBsaXN0IFRoZSBmcmFtZSB0byBzZW5kXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl0gQ2FsbGJhY2tcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNlbmRGcmFtZShsaXN0LCBjYikge1xuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMikge1xuICAgICAgdGhpcy5fc29ja2V0LmNvcmsoKTtcbiAgICAgIHRoaXMuX3NvY2tldC53cml0ZShsaXN0WzBdKTtcbiAgICAgIHRoaXMuX3NvY2tldC53cml0ZShsaXN0WzFdLCBjYik7XG4gICAgICB0aGlzLl9zb2NrZXQudW5jb3JrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NvY2tldC53cml0ZShsaXN0WzBdLCBjYik7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2VuZGVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB7IER1cGxleCB9ID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5cbi8qKlxuICogRW1pdHMgdGhlIGAnY2xvc2UnYCBldmVudCBvbiBhIHN0cmVhbS5cbiAqXG4gKiBAcGFyYW0ge0R1cGxleH0gc3RyZWFtIFRoZSBzdHJlYW0uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlbWl0Q2xvc2Uoc3RyZWFtKSB7XG4gIHN0cmVhbS5lbWl0KCdjbG9zZScpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYCdlbmQnYCBldmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkdXBsZXhPbkVuZCgpIHtcbiAgaWYgKCF0aGlzLmRlc3Ryb3llZCAmJiB0aGlzLl93cml0YWJsZVN0YXRlLmZpbmlzaGVkKSB7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGAnZXJyb3InYCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnIgVGhlIGVycm9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkdXBsZXhPbkVycm9yKGVycikge1xuICB0aGlzLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGR1cGxleE9uRXJyb3IpO1xuICB0aGlzLmRlc3Ryb3koKTtcbiAgaWYgKHRoaXMubGlzdGVuZXJDb3VudCgnZXJyb3InKSA9PT0gMCkge1xuICAgIC8vIERvIG5vdCBzdXBwcmVzcyB0aGUgdGhyb3dpbmcgYmVoYXZpb3IuXG4gICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIH1cbn1cblxuLyoqXG4gKiBXcmFwcyBhIGBXZWJTb2NrZXRgIGluIGEgZHVwbGV4IHN0cmVhbS5cbiAqXG4gKiBAcGFyYW0ge1dlYlNvY2tldH0gd3MgVGhlIGBXZWJTb2NrZXRgIHRvIHdyYXBcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgZm9yIHRoZSBgRHVwbGV4YCBjb25zdHJ1Y3RvclxuICogQHJldHVybiB7RHVwbGV4fSBUaGUgZHVwbGV4IHN0cmVhbVxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBjcmVhdGVXZWJTb2NrZXRTdHJlYW0od3MsIG9wdGlvbnMpIHtcbiAgbGV0IHRlcm1pbmF0ZU9uRGVzdHJveSA9IHRydWU7XG5cbiAgY29uc3QgZHVwbGV4ID0gbmV3IER1cGxleCh7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBhdXRvRGVzdHJveTogZmFsc2UsXG4gICAgZW1pdENsb3NlOiBmYWxzZSxcbiAgICBvYmplY3RNb2RlOiBmYWxzZSxcbiAgICB3cml0YWJsZU9iamVjdE1vZGU6IGZhbHNlXG4gIH0pO1xuXG4gIHdzLm9uKCdtZXNzYWdlJywgZnVuY3Rpb24gbWVzc2FnZShtc2csIGlzQmluYXJ5KSB7XG4gICAgY29uc3QgZGF0YSA9XG4gICAgICAhaXNCaW5hcnkgJiYgZHVwbGV4Ll9yZWFkYWJsZVN0YXRlLm9iamVjdE1vZGUgPyBtc2cudG9TdHJpbmcoKSA6IG1zZztcblxuICAgIGlmICghZHVwbGV4LnB1c2goZGF0YSkpIHdzLnBhdXNlKCk7XG4gIH0pO1xuXG4gIHdzLm9uY2UoJ2Vycm9yJywgZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgaWYgKGR1cGxleC5kZXN0cm95ZWQpIHJldHVybjtcblxuICAgIC8vIFByZXZlbnQgYHdzLnRlcm1pbmF0ZSgpYCBmcm9tIGJlaW5nIGNhbGxlZCBieSBgZHVwbGV4Ll9kZXN0cm95KClgLlxuICAgIC8vXG4gICAgLy8gLSBJZiB0aGUgYCdlcnJvcidgIGV2ZW50IGlzIGVtaXR0ZWQgYmVmb3JlIHRoZSBgJ29wZW4nYCBldmVudCwgdGhlblxuICAgIC8vICAgYHdzLnRlcm1pbmF0ZSgpYCBpcyBhIG5vb3AgYXMgbm8gc29ja2V0IGlzIGFzc2lnbmVkLlxuICAgIC8vIC0gT3RoZXJ3aXNlLCB0aGUgZXJyb3IgaXMgcmUtZW1pdHRlZCBieSB0aGUgbGlzdGVuZXIgb2YgdGhlIGAnZXJyb3InYFxuICAgIC8vICAgZXZlbnQgb2YgdGhlIGBSZWNlaXZlcmAgb2JqZWN0LiBUaGUgbGlzdGVuZXIgYWxyZWFkeSBjbG9zZXMgdGhlXG4gICAgLy8gICBjb25uZWN0aW9uIGJ5IGNhbGxpbmcgYHdzLmNsb3NlKClgLiBUaGlzIGFsbG93cyBhIGNsb3NlIGZyYW1lIHRvIGJlXG4gICAgLy8gICBzZW50IHRvIHRoZSBvdGhlciBwZWVyLiBJZiBgd3MudGVybWluYXRlKClgIGlzIGNhbGxlZCByaWdodCBhZnRlciB0aGlzLFxuICAgIC8vICAgdGhlbiB0aGUgY2xvc2UgZnJhbWUgbWlnaHQgbm90IGJlIHNlbnQuXG4gICAgdGVybWluYXRlT25EZXN0cm95ID0gZmFsc2U7XG4gICAgZHVwbGV4LmRlc3Ryb3koZXJyKTtcbiAgfSk7XG5cbiAgd3Mub25jZSgnY2xvc2UnLCBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICBpZiAoZHVwbGV4LmRlc3Ryb3llZCkgcmV0dXJuO1xuXG4gICAgZHVwbGV4LnB1c2gobnVsbCk7XG4gIH0pO1xuXG4gIGR1cGxleC5fZGVzdHJveSA9IGZ1bmN0aW9uIChlcnIsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHdzLnJlYWR5U3RhdGUgPT09IHdzLkNMT1NFRCkge1xuICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZW1pdENsb3NlLCBkdXBsZXgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBjYWxsZWQgPSBmYWxzZTtcblxuICAgIHdzLm9uY2UoJ2Vycm9yJywgZnVuY3Rpb24gZXJyb3IoZXJyKSB7XG4gICAgICBjYWxsZWQgPSB0cnVlO1xuICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICB9KTtcblxuICAgIHdzLm9uY2UoJ2Nsb3NlJywgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICBpZiAoIWNhbGxlZCkgY2FsbGJhY2soZXJyKTtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soZW1pdENsb3NlLCBkdXBsZXgpO1xuICAgIH0pO1xuXG4gICAgaWYgKHRlcm1pbmF0ZU9uRGVzdHJveSkgd3MudGVybWluYXRlKCk7XG4gIH07XG5cbiAgZHVwbGV4Ll9maW5hbCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIGlmICh3cy5yZWFkeVN0YXRlID09PSB3cy5DT05ORUNUSU5HKSB7XG4gICAgICB3cy5vbmNlKCdvcGVuJywgZnVuY3Rpb24gb3BlbigpIHtcbiAgICAgICAgZHVwbGV4Ll9maW5hbChjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgdmFsdWUgb2YgdGhlIGBfc29ja2V0YCBwcm9wZXJ0eSBpcyBgbnVsbGAgaXQgbWVhbnMgdGhhdCBgd3NgIGlzIGFcbiAgICAvLyBjbGllbnQgd2Vic29ja2V0IGFuZCB0aGUgaGFuZHNoYWtlIGZhaWxlZC4gSW4gZmFjdCwgd2hlbiB0aGlzIGhhcHBlbnMsIGFcbiAgICAvLyBzb2NrZXQgaXMgbmV2ZXIgYXNzaWduZWQgdG8gdGhlIHdlYnNvY2tldC4gV2FpdCBmb3IgdGhlIGAnZXJyb3InYCBldmVudFxuICAgIC8vIHRoYXQgd2lsbCBiZSBlbWl0dGVkIGJ5IHRoZSB3ZWJzb2NrZXQuXG4gICAgaWYgKHdzLl9zb2NrZXQgPT09IG51bGwpIHJldHVybjtcblxuICAgIGlmICh3cy5fc29ja2V0Ll93cml0YWJsZVN0YXRlLmZpbmlzaGVkKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgICAgaWYgKGR1cGxleC5fcmVhZGFibGVTdGF0ZS5lbmRFbWl0dGVkKSBkdXBsZXguZGVzdHJveSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3cy5fc29ja2V0Lm9uY2UoJ2ZpbmlzaCcsIGZ1bmN0aW9uIGZpbmlzaCgpIHtcbiAgICAgICAgLy8gYGR1cGxleGAgaXMgbm90IGRlc3Ryb3llZCBoZXJlIGJlY2F1c2UgdGhlIGAnZW5kJ2AgZXZlbnQgd2lsbCBiZVxuICAgICAgICAvLyBlbWl0dGVkIG9uIGBkdXBsZXhgIGFmdGVyIHRoaXMgYCdmaW5pc2gnYCBldmVudC4gVGhlIEVPRiBzaWduYWxpbmdcbiAgICAgICAgLy8gYG51bGxgIGNodW5rIGlzLCBpbiBmYWN0LCBwdXNoZWQgd2hlbiB0aGUgd2Vic29ja2V0IGVtaXRzIGAnY2xvc2UnYC5cbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgIH0pO1xuICAgICAgd3MuY2xvc2UoKTtcbiAgICB9XG4gIH07XG5cbiAgZHVwbGV4Ll9yZWFkID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh3cy5pc1BhdXNlZCkgd3MucmVzdW1lKCk7XG4gIH07XG5cbiAgZHVwbGV4Ll93cml0ZSA9IGZ1bmN0aW9uIChjaHVuaywgZW5jb2RpbmcsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHdzLnJlYWR5U3RhdGUgPT09IHdzLkNPTk5FQ1RJTkcpIHtcbiAgICAgIHdzLm9uY2UoJ29wZW4nLCBmdW5jdGlvbiBvcGVuKCkge1xuICAgICAgICBkdXBsZXguX3dyaXRlKGNodW5rLCBlbmNvZGluZywgY2FsbGJhY2spO1xuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd3Muc2VuZChjaHVuaywgY2FsbGJhY2spO1xuICB9O1xuXG4gIGR1cGxleC5vbignZW5kJywgZHVwbGV4T25FbmQpO1xuICBkdXBsZXgub24oJ2Vycm9yJywgZHVwbGV4T25FcnJvcik7XG4gIHJldHVybiBkdXBsZXg7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlV2ViU29ja2V0U3RyZWFtO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCB7IHRva2VuQ2hhcnMgfSA9IHJlcXVpcmUoJy4vdmFsaWRhdGlvbicpO1xuXG4vKipcbiAqIFBhcnNlcyB0aGUgYFNlYy1XZWJTb2NrZXQtUHJvdG9jb2xgIGhlYWRlciBpbnRvIGEgc2V0IG9mIHN1YnByb3RvY29sIG5hbWVzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXIgVGhlIGZpZWxkIHZhbHVlIG9mIHRoZSBoZWFkZXJcbiAqIEByZXR1cm4ge1NldH0gVGhlIHN1YnByb3RvY29sIG5hbWVzXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIHBhcnNlKGhlYWRlcikge1xuICBjb25zdCBwcm90b2NvbHMgPSBuZXcgU2V0KCk7XG4gIGxldCBzdGFydCA9IC0xO1xuICBsZXQgZW5kID0gLTE7XG4gIGxldCBpID0gMDtcblxuICBmb3IgKGk7IGkgPCBoZWFkZXIubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBjb2RlID0gaGVhZGVyLmNoYXJDb2RlQXQoaSk7XG5cbiAgICBpZiAoZW5kID09PSAtMSAmJiB0b2tlbkNoYXJzW2NvZGVdID09PSAxKSB7XG4gICAgICBpZiAoc3RhcnQgPT09IC0xKSBzdGFydCA9IGk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGkgIT09IDAgJiZcbiAgICAgIChjb2RlID09PSAweDIwIC8qICcgJyAqLyB8fCBjb2RlID09PSAweDA5KSAvKiAnXFx0JyAqL1xuICAgICkge1xuICAgICAgaWYgKGVuZCA9PT0gLTEgJiYgc3RhcnQgIT09IC0xKSBlbmQgPSBpO1xuICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHgyYyAvKiAnLCcgKi8pIHtcbiAgICAgIGlmIChzdGFydCA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbmQgPT09IC0xKSBlbmQgPSBpO1xuXG4gICAgICBjb25zdCBwcm90b2NvbCA9IGhlYWRlci5zbGljZShzdGFydCwgZW5kKTtcblxuICAgICAgaWYgKHByb3RvY29scy5oYXMocHJvdG9jb2wpKSB7XG4gICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVGhlIFwiJHtwcm90b2NvbH1cIiBzdWJwcm90b2NvbCBpcyBkdXBsaWNhdGVkYCk7XG4gICAgICB9XG5cbiAgICAgIHByb3RvY29scy5hZGQocHJvdG9jb2wpO1xuICAgICAgc3RhcnQgPSBlbmQgPSAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSAtMSB8fCBlbmQgIT09IC0xKSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdVbmV4cGVjdGVkIGVuZCBvZiBpbnB1dCcpO1xuICB9XG5cbiAgY29uc3QgcHJvdG9jb2wgPSBoZWFkZXIuc2xpY2Uoc3RhcnQsIGkpO1xuXG4gIGlmIChwcm90b2NvbHMuaGFzKHByb3RvY29sKSkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVGhlIFwiJHtwcm90b2NvbH1cIiBzdWJwcm90b2NvbCBpcyBkdXBsaWNhdGVkYCk7XG4gIH1cblxuICBwcm90b2NvbHMuYWRkKHByb3RvY29sKTtcbiAgcmV0dXJuIHByb3RvY29scztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IHBhcnNlIH07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgaXNVdGY4IH0gPSByZXF1aXJlKCdidWZmZXInKTtcblxuLy9cbi8vIEFsbG93ZWQgdG9rZW4gY2hhcmFjdGVyczpcbi8vXG4vLyAnIScsICcjJywgJyQnLCAnJScsICcmJywgJycnLCAnKicsICcrJywgJy0nLFxuLy8gJy4nLCAwLTksIEEtWiwgJ14nLCAnXycsICdgJywgYS16LCAnfCcsICd+J1xuLy9cbi8vIHRva2VuQ2hhcnNbMzJdID09PSAwIC8vICcgJ1xuLy8gdG9rZW5DaGFyc1szM10gPT09IDEgLy8gJyEnXG4vLyB0b2tlbkNoYXJzWzM0XSA9PT0gMCAvLyAnXCInXG4vLyAuLi5cbi8vXG4vLyBwcmV0dGllci1pZ25vcmVcbmNvbnN0IHRva2VuQ2hhcnMgPSBbXG4gIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIC8vIDAgLSAxNVxuICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAvLyAxNiAtIDMxXG4gIDAsIDEsIDAsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDEsIDEsIDAsIDEsIDEsIDAsIC8vIDMyIC0gNDdcbiAgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMCwgMCwgMCwgLy8gNDggLSA2M1xuICAwLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAvLyA2NCAtIDc5XG4gIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDAsIDAsIDAsIDEsIDEsIC8vIDgwIC0gOTVcbiAgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgLy8gOTYgLSAxMTFcbiAgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMSwgMCwgMSwgMCAvLyAxMTIgLSAxMjdcbl07XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgc3RhdHVzIGNvZGUgaXMgYWxsb3dlZCBpbiBhIGNsb3NlIGZyYW1lLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlIFRoZSBzdGF0dXMgY29kZVxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBzdGF0dXMgY29kZSBpcyB2YWxpZCwgZWxzZSBgZmFsc2VgXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIGlzVmFsaWRTdGF0dXNDb2RlKGNvZGUpIHtcbiAgcmV0dXJuIChcbiAgICAoY29kZSA+PSAxMDAwICYmXG4gICAgICBjb2RlIDw9IDEwMTQgJiZcbiAgICAgIGNvZGUgIT09IDEwMDQgJiZcbiAgICAgIGNvZGUgIT09IDEwMDUgJiZcbiAgICAgIGNvZGUgIT09IDEwMDYpIHx8XG4gICAgKGNvZGUgPj0gMzAwMCAmJiBjb2RlIDw9IDQ5OTkpXG4gICk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgZ2l2ZW4gYnVmZmVyIGNvbnRhaW5zIG9ubHkgY29ycmVjdCBVVEYtOC5cbiAqIFBvcnRlZCBmcm9tIGh0dHBzOi8vd3d3LmNsLmNhbS5hYy51ay8lN0VtZ2syNS91Y3MvdXRmOF9jaGVjay5jIGJ5XG4gKiBNYXJrdXMgS3Vobi5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmIFRoZSBidWZmZXIgdG8gY2hlY2tcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBgYnVmYCBjb250YWlucyBvbmx5IGNvcnJlY3QgVVRGLTgsIGVsc2UgYGZhbHNlYFxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBfaXNWYWxpZFVURjgoYnVmKSB7XG4gIGNvbnN0IGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGxldCBpID0gMDtcblxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIGlmICgoYnVmW2ldICYgMHg4MCkgPT09IDApIHtcbiAgICAgIC8vIDB4eHh4eHh4XG4gICAgICBpKys7XG4gICAgfSBlbHNlIGlmICgoYnVmW2ldICYgMHhlMCkgPT09IDB4YzApIHtcbiAgICAgIC8vIDExMHh4eHh4IDEweHh4eHh4XG4gICAgICBpZiAoXG4gICAgICAgIGkgKyAxID09PSBsZW4gfHxcbiAgICAgICAgKGJ1ZltpICsgMV0gJiAweGMwKSAhPT0gMHg4MCB8fFxuICAgICAgICAoYnVmW2ldICYgMHhmZSkgPT09IDB4YzAgLy8gT3ZlcmxvbmdcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGkgKz0gMjtcbiAgICB9IGVsc2UgaWYgKChidWZbaV0gJiAweGYwKSA9PT0gMHhlMCkge1xuICAgICAgLy8gMTExMHh4eHggMTB4eHh4eHggMTB4eHh4eHhcbiAgICAgIGlmIChcbiAgICAgICAgaSArIDIgPj0gbGVuIHx8XG4gICAgICAgIChidWZbaSArIDFdICYgMHhjMCkgIT09IDB4ODAgfHxcbiAgICAgICAgKGJ1ZltpICsgMl0gJiAweGMwKSAhPT0gMHg4MCB8fFxuICAgICAgICAoYnVmW2ldID09PSAweGUwICYmIChidWZbaSArIDFdICYgMHhlMCkgPT09IDB4ODApIHx8IC8vIE92ZXJsb25nXG4gICAgICAgIChidWZbaV0gPT09IDB4ZWQgJiYgKGJ1ZltpICsgMV0gJiAweGUwKSA9PT0gMHhhMCkgLy8gU3Vycm9nYXRlIChVK0Q4MDAgLSBVK0RGRkYpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpICs9IDM7XG4gICAgfSBlbHNlIGlmICgoYnVmW2ldICYgMHhmOCkgPT09IDB4ZjApIHtcbiAgICAgIC8vIDExMTEweHh4IDEweHh4eHh4IDEweHh4eHh4IDEweHh4eHh4XG4gICAgICBpZiAoXG4gICAgICAgIGkgKyAzID49IGxlbiB8fFxuICAgICAgICAoYnVmW2kgKyAxXSAmIDB4YzApICE9PSAweDgwIHx8XG4gICAgICAgIChidWZbaSArIDJdICYgMHhjMCkgIT09IDB4ODAgfHxcbiAgICAgICAgKGJ1ZltpICsgM10gJiAweGMwKSAhPT0gMHg4MCB8fFxuICAgICAgICAoYnVmW2ldID09PSAweGYwICYmIChidWZbaSArIDFdICYgMHhmMCkgPT09IDB4ODApIHx8IC8vIE92ZXJsb25nXG4gICAgICAgIChidWZbaV0gPT09IDB4ZjQgJiYgYnVmW2kgKyAxXSA+IDB4OGYpIHx8XG4gICAgICAgIGJ1ZltpXSA+IDB4ZjQgLy8gPiBVKzEwRkZGRlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaSArPSA0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc1ZhbGlkU3RhdHVzQ29kZSxcbiAgaXNWYWxpZFVURjg6IF9pc1ZhbGlkVVRGOCxcbiAgdG9rZW5DaGFyc1xufTtcblxuaWYgKGlzVXRmOCkge1xuICBtb2R1bGUuZXhwb3J0cy5pc1ZhbGlkVVRGOCA9IGZ1bmN0aW9uIChidWYpIHtcbiAgICByZXR1cm4gYnVmLmxlbmd0aCA8IDI0ID8gX2lzVmFsaWRVVEY4KGJ1ZikgOiBpc1V0ZjgoYnVmKTtcbiAgfTtcbn0gLyogaXN0YW5idWwgaWdub3JlIGVsc2UgICovIGVsc2UgaWYgKCFwcm9jZXNzLmVudi5XU19OT19VVEZfOF9WQUxJREFURSkge1xuICB0cnkge1xuICAgIGNvbnN0IGlzVmFsaWRVVEY4ID0gcmVxdWlyZSgndXRmLTgtdmFsaWRhdGUnKTtcblxuICAgIG1vZHVsZS5leHBvcnRzLmlzVmFsaWRVVEY4ID0gZnVuY3Rpb24gKGJ1Zikge1xuICAgICAgcmV0dXJuIGJ1Zi5sZW5ndGggPCAzMiA/IF9pc1ZhbGlkVVRGOChidWYpIDogaXNWYWxpZFVURjgoYnVmKTtcbiAgICB9O1xuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gQ29udGludWUgcmVnYXJkbGVzcyBvZiB0aGUgZXJyb3IuXG4gIH1cbn1cbiIsIi8qIGVzbGludCBuby11bnVzZWQtdmFyczogW1wiZXJyb3JcIiwgeyBcInZhcnNJZ25vcmVQYXR0ZXJuXCI6IFwiXm5ldHx0bHN8aHR0cHMkXCIgfV0gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKTtcbmNvbnN0IGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG5jb25zdCBodHRwcyA9IHJlcXVpcmUoJ2h0dHBzJyk7XG5jb25zdCBuZXQgPSByZXF1aXJlKCduZXQnKTtcbmNvbnN0IHRscyA9IHJlcXVpcmUoJ3RscycpO1xuY29uc3QgeyBjcmVhdGVIYXNoIH0gPSByZXF1aXJlKCdjcnlwdG8nKTtcblxuY29uc3QgZXh0ZW5zaW9uID0gcmVxdWlyZSgnLi9leHRlbnNpb24nKTtcbmNvbnN0IFBlck1lc3NhZ2VEZWZsYXRlID0gcmVxdWlyZSgnLi9wZXJtZXNzYWdlLWRlZmxhdGUnKTtcbmNvbnN0IHN1YnByb3RvY29sID0gcmVxdWlyZSgnLi9zdWJwcm90b2NvbCcpO1xuY29uc3QgV2ViU29ja2V0ID0gcmVxdWlyZSgnLi93ZWJzb2NrZXQnKTtcbmNvbnN0IHsgR1VJRCwga1dlYlNvY2tldCB9ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcblxuY29uc3Qga2V5UmVnZXggPSAvXlsrLzAtOUEtWmEtel17MjJ9PT0kLztcblxuY29uc3QgUlVOTklORyA9IDA7XG5jb25zdCBDTE9TSU5HID0gMTtcbmNvbnN0IENMT1NFRCA9IDI7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgV2ViU29ja2V0IHNlcnZlci5cbiAqXG4gKiBAZXh0ZW5kcyBFdmVudEVtaXR0ZXJcbiAqL1xuY2xhc3MgV2ViU29ja2V0U2VydmVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIGBXZWJTb2NrZXRTZXJ2ZXJgIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBDb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmJhY2tsb2c9NTExXSBUaGUgbWF4aW11bSBsZW5ndGggb2YgdGhlIHF1ZXVlIG9mXG4gICAqICAgICBwZW5kaW5nIGNvbm5lY3Rpb25zXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY2xpZW50VHJhY2tpbmc9dHJ1ZV0gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvXG4gICAqICAgICB0cmFjayBjbGllbnRzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmhhbmRsZVByb3RvY29sc10gQSBob29rIHRvIGhhbmRsZSBwcm90b2NvbHNcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLmhvc3RdIFRoZSBob3N0bmFtZSB3aGVyZSB0byBiaW5kIHRoZSBzZXJ2ZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heFBheWxvYWQ9MTA0ODU3NjAwXSBUaGUgbWF4aW11bSBhbGxvd2VkIG1lc3NhZ2VcbiAgICogICAgIHNpemVcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5ub1NlcnZlcj1mYWxzZV0gRW5hYmxlIG5vIHNlcnZlciBtb2RlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5wYXRoXSBBY2NlcHQgb25seSBjb25uZWN0aW9ucyBtYXRjaGluZyB0aGlzIHBhdGhcbiAgICogQHBhcmFtIHsoQm9vbGVhbnxPYmplY3QpfSBbb3B0aW9ucy5wZXJNZXNzYWdlRGVmbGF0ZT1mYWxzZV0gRW5hYmxlL2Rpc2FibGVcbiAgICogICAgIHBlcm1lc3NhZ2UtZGVmbGF0ZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucG9ydF0gVGhlIHBvcnQgd2hlcmUgdG8gYmluZCB0aGUgc2VydmVyXG4gICAqIEBwYXJhbSB7KGh0dHAuU2VydmVyfGh0dHBzLlNlcnZlcil9IFtvcHRpb25zLnNlcnZlcl0gQSBwcmUtY3JlYXRlZCBIVFRQL1NcbiAgICogICAgIHNlcnZlciB0byB1c2VcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5za2lwVVRGOFZhbGlkYXRpb249ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIG9yXG4gICAqICAgICBub3QgdG8gc2tpcCBVVEYtOCB2YWxpZGF0aW9uIGZvciB0ZXh0IGFuZCBjbG9zZSBtZXNzYWdlc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy52ZXJpZnlDbGllbnRdIEEgaG9vayB0byByZWplY3QgY29ubmVjdGlvbnNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuV2ViU29ja2V0PVdlYlNvY2tldF0gU3BlY2lmaWVzIHRoZSBgV2ViU29ja2V0YFxuICAgKiAgICAgY2xhc3MgdG8gdXNlLiBJdCBtdXN0IGJlIHRoZSBgV2ViU29ja2V0YCBjbGFzcyBvciBjbGFzcyB0aGF0IGV4dGVuZHMgaXRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSBBIGxpc3RlbmVyIGZvciB0aGUgYGxpc3RlbmluZ2AgZXZlbnRcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIG9wdGlvbnMgPSB7XG4gICAgICBtYXhQYXlsb2FkOiAxMDAgKiAxMDI0ICogMTAyNCxcbiAgICAgIHNraXBVVEY4VmFsaWRhdGlvbjogZmFsc2UsXG4gICAgICBwZXJNZXNzYWdlRGVmbGF0ZTogZmFsc2UsXG4gICAgICBoYW5kbGVQcm90b2NvbHM6IG51bGwsXG4gICAgICBjbGllbnRUcmFja2luZzogdHJ1ZSxcbiAgICAgIHZlcmlmeUNsaWVudDogbnVsbCxcbiAgICAgIG5vU2VydmVyOiBmYWxzZSxcbiAgICAgIGJhY2tsb2c6IG51bGwsIC8vIHVzZSBkZWZhdWx0ICg1MTEgYXMgaW1wbGVtZW50ZWQgaW4gbmV0LmpzKVxuICAgICAgc2VydmVyOiBudWxsLFxuICAgICAgaG9zdDogbnVsbCxcbiAgICAgIHBhdGg6IG51bGwsXG4gICAgICBwb3J0OiBudWxsLFxuICAgICAgV2ViU29ja2V0LFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG5cbiAgICBpZiAoXG4gICAgICAob3B0aW9ucy5wb3J0ID09IG51bGwgJiYgIW9wdGlvbnMuc2VydmVyICYmICFvcHRpb25zLm5vU2VydmVyKSB8fFxuICAgICAgKG9wdGlvbnMucG9ydCAhPSBudWxsICYmIChvcHRpb25zLnNlcnZlciB8fCBvcHRpb25zLm5vU2VydmVyKSkgfHxcbiAgICAgIChvcHRpb25zLnNlcnZlciAmJiBvcHRpb25zLm5vU2VydmVyKVxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgJ09uZSBhbmQgb25seSBvbmUgb2YgdGhlIFwicG9ydFwiLCBcInNlcnZlclwiLCBvciBcIm5vU2VydmVyXCIgb3B0aW9ucyAnICtcbiAgICAgICAgICAnbXVzdCBiZSBzcGVjaWZpZWQnXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnBvcnQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2VydmVyID0gaHR0cC5jcmVhdGVTZXJ2ZXIoKHJlcSwgcmVzKSA9PiB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBodHRwLlNUQVRVU19DT0RFU1s0MjZdO1xuXG4gICAgICAgIHJlcy53cml0ZUhlYWQoNDI2LCB7XG4gICAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogYm9keS5sZW5ndGgsXG4gICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L3BsYWluJ1xuICAgICAgICB9KTtcbiAgICAgICAgcmVzLmVuZChib2R5KTtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fc2VydmVyLmxpc3RlbihcbiAgICAgICAgb3B0aW9ucy5wb3J0LFxuICAgICAgICBvcHRpb25zLmhvc3QsXG4gICAgICAgIG9wdGlvbnMuYmFja2xvZyxcbiAgICAgICAgY2FsbGJhY2tcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLnNlcnZlcikge1xuICAgICAgdGhpcy5fc2VydmVyID0gb3B0aW9ucy5zZXJ2ZXI7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3NlcnZlcikge1xuICAgICAgY29uc3QgZW1pdENvbm5lY3Rpb24gPSB0aGlzLmVtaXQuYmluZCh0aGlzLCAnY29ubmVjdGlvbicpO1xuXG4gICAgICB0aGlzLl9yZW1vdmVMaXN0ZW5lcnMgPSBhZGRMaXN0ZW5lcnModGhpcy5fc2VydmVyLCB7XG4gICAgICAgIGxpc3RlbmluZzogdGhpcy5lbWl0LmJpbmQodGhpcywgJ2xpc3RlbmluZycpLFxuICAgICAgICBlcnJvcjogdGhpcy5lbWl0LmJpbmQodGhpcywgJ2Vycm9yJyksXG4gICAgICAgIHVwZ3JhZGU6IChyZXEsIHNvY2tldCwgaGVhZCkgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlVXBncmFkZShyZXEsIHNvY2tldCwgaGVhZCwgZW1pdENvbm5lY3Rpb24pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5wZXJNZXNzYWdlRGVmbGF0ZSA9PT0gdHJ1ZSkgb3B0aW9ucy5wZXJNZXNzYWdlRGVmbGF0ZSA9IHt9O1xuICAgIGlmIChvcHRpb25zLmNsaWVudFRyYWNraW5nKSB7XG4gICAgICB0aGlzLmNsaWVudHMgPSBuZXcgU2V0KCk7XG4gICAgICB0aGlzLl9zaG91bGRFbWl0Q2xvc2UgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuX3N0YXRlID0gUlVOTklORztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBib3VuZCBhZGRyZXNzLCB0aGUgYWRkcmVzcyBmYW1pbHkgbmFtZSwgYW5kIHBvcnQgb2YgdGhlIHNlcnZlclxuICAgKiBhcyByZXBvcnRlZCBieSB0aGUgb3BlcmF0aW5nIHN5c3RlbSBpZiBsaXN0ZW5pbmcgb24gYW4gSVAgc29ja2V0LlxuICAgKiBJZiB0aGUgc2VydmVyIGlzIGxpc3RlbmluZyBvbiBhIHBpcGUgb3IgVU5JWCBkb21haW4gc29ja2V0LCB0aGUgbmFtZSBpc1xuICAgKiByZXR1cm5lZCBhcyBhIHN0cmluZy5cbiAgICpcbiAgICogQHJldHVybiB7KE9iamVjdHxTdHJpbmd8bnVsbCl9IFRoZSBhZGRyZXNzIG9mIHRoZSBzZXJ2ZXJcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYWRkcmVzcygpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLm5vU2VydmVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBzZXJ2ZXIgaXMgb3BlcmF0aW5nIGluIFwibm9TZXJ2ZXJcIiBtb2RlJyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9zZXJ2ZXIpIHJldHVybiBudWxsO1xuICAgIHJldHVybiB0aGlzLl9zZXJ2ZXIuYWRkcmVzcygpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgdGhlIHNlcnZlciBmcm9tIGFjY2VwdGluZyBuZXcgY29ubmVjdGlvbnMgYW5kIGVtaXQgdGhlIGAnY2xvc2UnYCBldmVudFxuICAgKiB3aGVuIGFsbCBleGlzdGluZyBjb25uZWN0aW9ucyBhcmUgY2xvc2VkLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdIEEgb25lLXRpbWUgbGlzdGVuZXIgZm9yIHRoZSBgJ2Nsb3NlJ2AgZXZlbnRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY2xvc2UoY2IpIHtcbiAgICBpZiAodGhpcy5fc3RhdGUgPT09IENMT1NFRCkge1xuICAgICAgaWYgKGNiKSB7XG4gICAgICAgIHRoaXMub25jZSgnY2xvc2UnLCAoKSA9PiB7XG4gICAgICAgICAgY2IobmV3IEVycm9yKCdUaGUgc2VydmVyIGlzIG5vdCBydW5uaW5nJykpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcHJvY2Vzcy5uZXh0VGljayhlbWl0Q2xvc2UsIHRoaXMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChjYikgdGhpcy5vbmNlKCdjbG9zZScsIGNiKTtcblxuICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gQ0xPU0lORykgcmV0dXJuO1xuICAgIHRoaXMuX3N0YXRlID0gQ0xPU0lORztcblxuICAgIGlmICh0aGlzLm9wdGlvbnMubm9TZXJ2ZXIgfHwgdGhpcy5vcHRpb25zLnNlcnZlcikge1xuICAgICAgaWYgKHRoaXMuX3NlcnZlcikge1xuICAgICAgICB0aGlzLl9yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgICAgICAgdGhpcy5fcmVtb3ZlTGlzdGVuZXJzID0gdGhpcy5fc2VydmVyID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY2xpZW50cykge1xuICAgICAgICBpZiAoIXRoaXMuY2xpZW50cy5zaXplKSB7XG4gICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhlbWl0Q2xvc2UsIHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3Nob3VsZEVtaXRDbG9zZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3MubmV4dFRpY2soZW1pdENsb3NlLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2VydmVyID0gdGhpcy5fc2VydmVyO1xuXG4gICAgICB0aGlzLl9yZW1vdmVMaXN0ZW5lcnMoKTtcbiAgICAgIHRoaXMuX3JlbW92ZUxpc3RlbmVycyA9IHRoaXMuX3NlcnZlciA9IG51bGw7XG5cbiAgICAgIC8vXG4gICAgICAvLyBUaGUgSFRUUC9TIHNlcnZlciB3YXMgY3JlYXRlZCBpbnRlcm5hbGx5LiBDbG9zZSBpdCwgYW5kIHJlbHkgb24gaXRzXG4gICAgICAvLyBgJ2Nsb3NlJ2AgZXZlbnQuXG4gICAgICAvL1xuICAgICAgc2VydmVyLmNsb3NlKCgpID0+IHtcbiAgICAgICAgZW1pdENsb3NlKHRoaXMpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlZSBpZiBhIGdpdmVuIHJlcXVlc3Qgc2hvdWxkIGJlIGhhbmRsZWQgYnkgdGhpcyBzZXJ2ZXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7aHR0cC5JbmNvbWluZ01lc3NhZ2V9IHJlcSBSZXF1ZXN0IG9iamVjdCB0byBpbnNwZWN0XG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgcmVxdWVzdCBpcyB2YWxpZCwgZWxzZSBgZmFsc2VgXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHNob3VsZEhhbmRsZShyZXEpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLnBhdGgpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gcmVxLnVybC5pbmRleE9mKCc/Jyk7XG4gICAgICBjb25zdCBwYXRobmFtZSA9IGluZGV4ICE9PSAtMSA/IHJlcS51cmwuc2xpY2UoMCwgaW5kZXgpIDogcmVxLnVybDtcblxuICAgICAgaWYgKHBhdGhuYW1lICE9PSB0aGlzLm9wdGlvbnMucGF0aCkgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBhIEhUVFAgVXBncmFkZSByZXF1ZXN0LlxuICAgKlxuICAgKiBAcGFyYW0ge2h0dHAuSW5jb21pbmdNZXNzYWdlfSByZXEgVGhlIHJlcXVlc3Qgb2JqZWN0XG4gICAqIEBwYXJhbSB7KG5ldC5Tb2NrZXR8dGxzLlNvY2tldCl9IHNvY2tldCBUaGUgbmV0d29yayBzb2NrZXQgYmV0d2VlbiB0aGVcbiAgICogICAgIHNlcnZlciBhbmQgY2xpZW50XG4gICAqIEBwYXJhbSB7QnVmZmVyfSBoZWFkIFRoZSBmaXJzdCBwYWNrZXQgb2YgdGhlIHVwZ3JhZGVkIHN0cmVhbVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAcHVibGljXG4gICAqL1xuICBoYW5kbGVVcGdyYWRlKHJlcSwgc29ja2V0LCBoZWFkLCBjYikge1xuICAgIHNvY2tldC5vbignZXJyb3InLCBzb2NrZXRPbkVycm9yKTtcblxuICAgIGNvbnN0IGtleSA9IHJlcS5oZWFkZXJzWydzZWMtd2Vic29ja2V0LWtleSddO1xuICAgIGNvbnN0IHZlcnNpb24gPSArcmVxLmhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQtdmVyc2lvbiddO1xuXG4gICAgaWYgKHJlcS5tZXRob2QgIT09ICdHRVQnKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gJ0ludmFsaWQgSFRUUCBtZXRob2QnO1xuICAgICAgYWJvcnRIYW5kc2hha2VPckVtaXR3c0NsaWVudEVycm9yKHRoaXMsIHJlcSwgc29ja2V0LCA0MDUsIG1lc3NhZ2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChyZXEuaGVhZGVycy51cGdyYWRlLnRvTG93ZXJDYXNlKCkgIT09ICd3ZWJzb2NrZXQnKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gJ0ludmFsaWQgVXBncmFkZSBoZWFkZXInO1xuICAgICAgYWJvcnRIYW5kc2hha2VPckVtaXR3c0NsaWVudEVycm9yKHRoaXMsIHJlcSwgc29ja2V0LCA0MDAsIG1lc3NhZ2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICgha2V5IHx8ICFrZXlSZWdleC50ZXN0KGtleSkpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSAnTWlzc2luZyBvciBpbnZhbGlkIFNlYy1XZWJTb2NrZXQtS2V5IGhlYWRlcic7XG4gICAgICBhYm9ydEhhbmRzaGFrZU9yRW1pdHdzQ2xpZW50RXJyb3IodGhpcywgcmVxLCBzb2NrZXQsIDQwMCwgbWVzc2FnZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHZlcnNpb24gIT09IDggJiYgdmVyc2lvbiAhPT0gMTMpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSAnTWlzc2luZyBvciBpbnZhbGlkIFNlYy1XZWJTb2NrZXQtVmVyc2lvbiBoZWFkZXInO1xuICAgICAgYWJvcnRIYW5kc2hha2VPckVtaXR3c0NsaWVudEVycm9yKHRoaXMsIHJlcSwgc29ja2V0LCA0MDAsIG1lc3NhZ2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5zaG91bGRIYW5kbGUocmVxKSkge1xuICAgICAgYWJvcnRIYW5kc2hha2Uoc29ja2V0LCA0MDApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNlY1dlYlNvY2tldFByb3RvY29sID0gcmVxLmhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQtcHJvdG9jb2wnXTtcbiAgICBsZXQgcHJvdG9jb2xzID0gbmV3IFNldCgpO1xuXG4gICAgaWYgKHNlY1dlYlNvY2tldFByb3RvY29sICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHByb3RvY29scyA9IHN1YnByb3RvY29sLnBhcnNlKHNlY1dlYlNvY2tldFByb3RvY29sKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gJ0ludmFsaWQgU2VjLVdlYlNvY2tldC1Qcm90b2NvbCBoZWFkZXInO1xuICAgICAgICBhYm9ydEhhbmRzaGFrZU9yRW1pdHdzQ2xpZW50RXJyb3IodGhpcywgcmVxLCBzb2NrZXQsIDQwMCwgbWVzc2FnZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBzZWNXZWJTb2NrZXRFeHRlbnNpb25zID0gcmVxLmhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQtZXh0ZW5zaW9ucyddO1xuICAgIGNvbnN0IGV4dGVuc2lvbnMgPSB7fTtcblxuICAgIGlmIChcbiAgICAgIHRoaXMub3B0aW9ucy5wZXJNZXNzYWdlRGVmbGF0ZSAmJlxuICAgICAgc2VjV2ViU29ja2V0RXh0ZW5zaW9ucyAhPT0gdW5kZWZpbmVkXG4gICAgKSB7XG4gICAgICBjb25zdCBwZXJNZXNzYWdlRGVmbGF0ZSA9IG5ldyBQZXJNZXNzYWdlRGVmbGF0ZShcbiAgICAgICAgdGhpcy5vcHRpb25zLnBlck1lc3NhZ2VEZWZsYXRlLFxuICAgICAgICB0cnVlLFxuICAgICAgICB0aGlzLm9wdGlvbnMubWF4UGF5bG9hZFxuICAgICAgKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3Qgb2ZmZXJzID0gZXh0ZW5zaW9uLnBhcnNlKHNlY1dlYlNvY2tldEV4dGVuc2lvbnMpO1xuXG4gICAgICAgIGlmIChvZmZlcnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0pIHtcbiAgICAgICAgICBwZXJNZXNzYWdlRGVmbGF0ZS5hY2NlcHQob2ZmZXJzW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdKTtcbiAgICAgICAgICBleHRlbnNpb25zW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdID0gcGVyTWVzc2FnZURlZmxhdGU7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICAgICAnSW52YWxpZCBvciB1bmFjY2VwdGFibGUgU2VjLVdlYlNvY2tldC1FeHRlbnNpb25zIGhlYWRlcic7XG4gICAgICAgIGFib3J0SGFuZHNoYWtlT3JFbWl0d3NDbGllbnRFcnJvcih0aGlzLCByZXEsIHNvY2tldCwgNDAwLCBtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gT3B0aW9uYWxseSBjYWxsIGV4dGVybmFsIGNsaWVudCB2ZXJpZmljYXRpb24gaGFuZGxlci5cbiAgICAvL1xuICAgIGlmICh0aGlzLm9wdGlvbnMudmVyaWZ5Q2xpZW50KSB7XG4gICAgICBjb25zdCBpbmZvID0ge1xuICAgICAgICBvcmlnaW46XG4gICAgICAgICAgcmVxLmhlYWRlcnNbYCR7dmVyc2lvbiA9PT0gOCA/ICdzZWMtd2Vic29ja2V0LW9yaWdpbicgOiAnb3JpZ2luJ31gXSxcbiAgICAgICAgc2VjdXJlOiAhIShyZXEuc29ja2V0LmF1dGhvcml6ZWQgfHwgcmVxLnNvY2tldC5lbmNyeXB0ZWQpLFxuICAgICAgICByZXFcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMudmVyaWZ5Q2xpZW50Lmxlbmd0aCA9PT0gMikge1xuICAgICAgICB0aGlzLm9wdGlvbnMudmVyaWZ5Q2xpZW50KGluZm8sICh2ZXJpZmllZCwgY29kZSwgbWVzc2FnZSwgaGVhZGVycykgPT4ge1xuICAgICAgICAgIGlmICghdmVyaWZpZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBhYm9ydEhhbmRzaGFrZShzb2NrZXQsIGNvZGUgfHwgNDAxLCBtZXNzYWdlLCBoZWFkZXJzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmNvbXBsZXRlVXBncmFkZShcbiAgICAgICAgICAgIGV4dGVuc2lvbnMsXG4gICAgICAgICAgICBrZXksXG4gICAgICAgICAgICBwcm90b2NvbHMsXG4gICAgICAgICAgICByZXEsXG4gICAgICAgICAgICBzb2NrZXQsXG4gICAgICAgICAgICBoZWFkLFxuICAgICAgICAgICAgY2JcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMub3B0aW9ucy52ZXJpZnlDbGllbnQoaW5mbykpIHJldHVybiBhYm9ydEhhbmRzaGFrZShzb2NrZXQsIDQwMSk7XG4gICAgfVxuXG4gICAgdGhpcy5jb21wbGV0ZVVwZ3JhZGUoZXh0ZW5zaW9ucywga2V5LCBwcm90b2NvbHMsIHJlcSwgc29ja2V0LCBoZWFkLCBjYik7XG4gIH1cblxuICAvKipcbiAgICogVXBncmFkZSB0aGUgY29ubmVjdGlvbiB0byBXZWJTb2NrZXQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBleHRlbnNpb25zIFRoZSBhY2NlcHRlZCBleHRlbnNpb25zXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgVGhlIHZhbHVlIG9mIHRoZSBgU2VjLVdlYlNvY2tldC1LZXlgIGhlYWRlclxuICAgKiBAcGFyYW0ge1NldH0gcHJvdG9jb2xzIFRoZSBzdWJwcm90b2NvbHNcbiAgICogQHBhcmFtIHtodHRwLkluY29taW5nTWVzc2FnZX0gcmVxIFRoZSByZXF1ZXN0IG9iamVjdFxuICAgKiBAcGFyYW0geyhuZXQuU29ja2V0fHRscy5Tb2NrZXQpfSBzb2NrZXQgVGhlIG5ldHdvcmsgc29ja2V0IGJldHdlZW4gdGhlXG4gICAqICAgICBzZXJ2ZXIgYW5kIGNsaWVudFxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gaGVhZCBUaGUgZmlyc3QgcGFja2V0IG9mIHRoZSB1cGdyYWRlZCBzdHJlYW1cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgQ2FsbGJhY2tcbiAgICogQHRocm93cyB7RXJyb3J9IElmIGNhbGxlZCBtb3JlIHRoYW4gb25jZSB3aXRoIHRoZSBzYW1lIHNvY2tldFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY29tcGxldGVVcGdyYWRlKGV4dGVuc2lvbnMsIGtleSwgcHJvdG9jb2xzLCByZXEsIHNvY2tldCwgaGVhZCwgY2IpIHtcbiAgICAvL1xuICAgIC8vIERlc3Ryb3kgdGhlIHNvY2tldCBpZiB0aGUgY2xpZW50IGhhcyBhbHJlYWR5IHNlbnQgYSBGSU4gcGFja2V0LlxuICAgIC8vXG4gICAgaWYgKCFzb2NrZXQucmVhZGFibGUgfHwgIXNvY2tldC53cml0YWJsZSkgcmV0dXJuIHNvY2tldC5kZXN0cm95KCk7XG5cbiAgICBpZiAoc29ja2V0W2tXZWJTb2NrZXRdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdzZXJ2ZXIuaGFuZGxlVXBncmFkZSgpIHdhcyBjYWxsZWQgbW9yZSB0aGFuIG9uY2Ugd2l0aCB0aGUgc2FtZSAnICtcbiAgICAgICAgICAnc29ja2V0LCBwb3NzaWJseSBkdWUgdG8gYSBtaXNjb25maWd1cmF0aW9uJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc3RhdGUgPiBSVU5OSU5HKSByZXR1cm4gYWJvcnRIYW5kc2hha2Uoc29ja2V0LCA1MDMpO1xuXG4gICAgY29uc3QgZGlnZXN0ID0gY3JlYXRlSGFzaCgnc2hhMScpXG4gICAgICAudXBkYXRlKGtleSArIEdVSUQpXG4gICAgICAuZGlnZXN0KCdiYXNlNjQnKTtcblxuICAgIGNvbnN0IGhlYWRlcnMgPSBbXG4gICAgICAnSFRUUC8xLjEgMTAxIFN3aXRjaGluZyBQcm90b2NvbHMnLFxuICAgICAgJ1VwZ3JhZGU6IHdlYnNvY2tldCcsXG4gICAgICAnQ29ubmVjdGlvbjogVXBncmFkZScsXG4gICAgICBgU2VjLVdlYlNvY2tldC1BY2NlcHQ6ICR7ZGlnZXN0fWBcbiAgICBdO1xuXG4gICAgY29uc3Qgd3MgPSBuZXcgdGhpcy5vcHRpb25zLldlYlNvY2tldChudWxsKTtcblxuICAgIGlmIChwcm90b2NvbHMuc2l6ZSkge1xuICAgICAgLy9cbiAgICAgIC8vIE9wdGlvbmFsbHkgY2FsbCBleHRlcm5hbCBwcm90b2NvbCBzZWxlY3Rpb24gaGFuZGxlci5cbiAgICAgIC8vXG4gICAgICBjb25zdCBwcm90b2NvbCA9IHRoaXMub3B0aW9ucy5oYW5kbGVQcm90b2NvbHNcbiAgICAgICAgPyB0aGlzLm9wdGlvbnMuaGFuZGxlUHJvdG9jb2xzKHByb3RvY29scywgcmVxKVxuICAgICAgICA6IHByb3RvY29scy52YWx1ZXMoKS5uZXh0KCkudmFsdWU7XG5cbiAgICAgIGlmIChwcm90b2NvbCkge1xuICAgICAgICBoZWFkZXJzLnB1c2goYFNlYy1XZWJTb2NrZXQtUHJvdG9jb2w6ICR7cHJvdG9jb2x9YCk7XG4gICAgICAgIHdzLl9wcm90b2NvbCA9IHByb3RvY29sO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChleHRlbnNpb25zW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdKSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSBleHRlbnNpb25zW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdLnBhcmFtcztcbiAgICAgIGNvbnN0IHZhbHVlID0gZXh0ZW5zaW9uLmZvcm1hdCh7XG4gICAgICAgIFtQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXTogW3BhcmFtc11cbiAgICAgIH0pO1xuICAgICAgaGVhZGVycy5wdXNoKGBTZWMtV2ViU29ja2V0LUV4dGVuc2lvbnM6ICR7dmFsdWV9YCk7XG4gICAgICB3cy5fZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnM7XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBBbGxvdyBleHRlcm5hbCBtb2RpZmljYXRpb24vaW5zcGVjdGlvbiBvZiBoYW5kc2hha2UgaGVhZGVycy5cbiAgICAvL1xuICAgIHRoaXMuZW1pdCgnaGVhZGVycycsIGhlYWRlcnMsIHJlcSk7XG5cbiAgICBzb2NrZXQud3JpdGUoaGVhZGVycy5jb25jYXQoJ1xcclxcbicpLmpvaW4oJ1xcclxcbicpKTtcbiAgICBzb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgc29ja2V0T25FcnJvcik7XG5cbiAgICB3cy5zZXRTb2NrZXQoc29ja2V0LCBoZWFkLCB7XG4gICAgICBtYXhQYXlsb2FkOiB0aGlzLm9wdGlvbnMubWF4UGF5bG9hZCxcbiAgICAgIHNraXBVVEY4VmFsaWRhdGlvbjogdGhpcy5vcHRpb25zLnNraXBVVEY4VmFsaWRhdGlvblxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuY2xpZW50cykge1xuICAgICAgdGhpcy5jbGllbnRzLmFkZCh3cyk7XG4gICAgICB3cy5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuY2xpZW50cy5kZWxldGUod3MpO1xuXG4gICAgICAgIGlmICh0aGlzLl9zaG91bGRFbWl0Q2xvc2UgJiYgIXRoaXMuY2xpZW50cy5zaXplKSB7XG4gICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhlbWl0Q2xvc2UsIHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjYih3cywgcmVxKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYlNvY2tldFNlcnZlcjtcblxuLyoqXG4gKiBBZGQgZXZlbnQgbGlzdGVuZXJzIG9uIGFuIGBFdmVudEVtaXR0ZXJgIHVzaW5nIGEgbWFwIG9mIDxldmVudCwgbGlzdGVuZXI+XG4gKiBwYWlycy5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gc2VydmVyIFRoZSBldmVudCBlbWl0dGVyXG4gKiBAcGFyYW0ge09iamVjdC48U3RyaW5nLCBGdW5jdGlvbj59IG1hcCBUaGUgbGlzdGVuZXJzIHRvIGFkZFxuICogQHJldHVybiB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdGhhdCB3aWxsIHJlbW92ZSB0aGUgYWRkZWQgbGlzdGVuZXJzIHdoZW5cbiAqICAgICBjYWxsZWRcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGFkZExpc3RlbmVycyhzZXJ2ZXIsIG1hcCkge1xuICBmb3IgKGNvbnN0IGV2ZW50IG9mIE9iamVjdC5rZXlzKG1hcCkpIHNlcnZlci5vbihldmVudCwgbWFwW2V2ZW50XSk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVycygpIHtcbiAgICBmb3IgKGNvbnN0IGV2ZW50IG9mIE9iamVjdC5rZXlzKG1hcCkpIHtcbiAgICAgIHNlcnZlci5yZW1vdmVMaXN0ZW5lcihldmVudCwgbWFwW2V2ZW50XSk7XG4gICAgfVxuICB9O1xufVxuXG4vKipcbiAqIEVtaXQgYSBgJ2Nsb3NlJ2AgZXZlbnQgb24gYW4gYEV2ZW50RW1pdHRlcmAuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IHNlcnZlciBUaGUgZXZlbnQgZW1pdHRlclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZW1pdENsb3NlKHNlcnZlcikge1xuICBzZXJ2ZXIuX3N0YXRlID0gQ0xPU0VEO1xuICBzZXJ2ZXIuZW1pdCgnY2xvc2UnKTtcbn1cblxuLyoqXG4gKiBIYW5kbGUgc29ja2V0IGVycm9ycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzb2NrZXRPbkVycm9yKCkge1xuICB0aGlzLmRlc3Ryb3koKTtcbn1cblxuLyoqXG4gKiBDbG9zZSB0aGUgY29ubmVjdGlvbiB3aGVuIHByZWNvbmRpdGlvbnMgYXJlIG5vdCBmdWxmaWxsZWQuXG4gKlxuICogQHBhcmFtIHsobmV0LlNvY2tldHx0bHMuU29ja2V0KX0gc29ja2V0IFRoZSBzb2NrZXQgb2YgdGhlIHVwZ3JhZGUgcmVxdWVzdFxuICogQHBhcmFtIHtOdW1iZXJ9IGNvZGUgVGhlIEhUVFAgcmVzcG9uc2Ugc3RhdHVzIGNvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBbbWVzc2FnZV0gVGhlIEhUVFAgcmVzcG9uc2UgYm9keVxuICogQHBhcmFtIHtPYmplY3R9IFtoZWFkZXJzXSBBZGRpdGlvbmFsIEhUVFAgcmVzcG9uc2UgaGVhZGVyc1xuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWJvcnRIYW5kc2hha2Uoc29ja2V0LCBjb2RlLCBtZXNzYWdlLCBoZWFkZXJzKSB7XG4gIC8vXG4gIC8vIFRoZSBzb2NrZXQgaXMgd3JpdGFibGUgdW5sZXNzIHRoZSB1c2VyIGRlc3Ryb3llZCBvciBlbmRlZCBpdCBiZWZvcmUgY2FsbGluZ1xuICAvLyBgc2VydmVyLmhhbmRsZVVwZ3JhZGUoKWAgb3IgaW4gdGhlIGB2ZXJpZnlDbGllbnRgIGZ1bmN0aW9uLCB3aGljaCBpcyBhIHVzZXJcbiAgLy8gZXJyb3IuIEhhbmRsaW5nIHRoaXMgZG9lcyBub3QgbWFrZSBtdWNoIHNlbnNlIGFzIHRoZSB3b3JzdCB0aGF0IGNhbiBoYXBwZW5cbiAgLy8gaXMgdGhhdCBzb21lIG9mIHRoZSBkYXRhIHdyaXR0ZW4gYnkgdGhlIHVzZXIgbWlnaHQgYmUgZGlzY2FyZGVkIGR1ZSB0byB0aGVcbiAgLy8gY2FsbCB0byBgc29ja2V0LmVuZCgpYCBiZWxvdywgd2hpY2ggdHJpZ2dlcnMgYW4gYCdlcnJvcidgIGV2ZW50IHRoYXQgaW5cbiAgLy8gdHVybiBjYXVzZXMgdGhlIHNvY2tldCB0byBiZSBkZXN0cm95ZWQuXG4gIC8vXG4gIG1lc3NhZ2UgPSBtZXNzYWdlIHx8IGh0dHAuU1RBVFVTX0NPREVTW2NvZGVdO1xuICBoZWFkZXJzID0ge1xuICAgIENvbm5lY3Rpb246ICdjbG9zZScsXG4gICAgJ0NvbnRlbnQtVHlwZSc6ICd0ZXh0L2h0bWwnLFxuICAgICdDb250ZW50LUxlbmd0aCc6IEJ1ZmZlci5ieXRlTGVuZ3RoKG1lc3NhZ2UpLFxuICAgIC4uLmhlYWRlcnNcbiAgfTtcblxuICBzb2NrZXQub25jZSgnZmluaXNoJywgc29ja2V0LmRlc3Ryb3kpO1xuXG4gIHNvY2tldC5lbmQoXG4gICAgYEhUVFAvMS4xICR7Y29kZX0gJHtodHRwLlNUQVRVU19DT0RFU1tjb2RlXX1cXHJcXG5gICtcbiAgICAgIE9iamVjdC5rZXlzKGhlYWRlcnMpXG4gICAgICAgIC5tYXAoKGgpID0+IGAke2h9OiAke2hlYWRlcnNbaF19YClcbiAgICAgICAgLmpvaW4oJ1xcclxcbicpICtcbiAgICAgICdcXHJcXG5cXHJcXG4nICtcbiAgICAgIG1lc3NhZ2VcbiAgKTtcbn1cblxuLyoqXG4gKiBFbWl0IGEgYCd3c0NsaWVudEVycm9yJ2AgZXZlbnQgb24gYSBgV2ViU29ja2V0U2VydmVyYCBpZiB0aGVyZSBpcyBhdCBsZWFzdFxuICogb25lIGxpc3RlbmVyIGZvciBpdCwgb3RoZXJ3aXNlIGNhbGwgYGFib3J0SGFuZHNoYWtlKClgLlxuICpcbiAqIEBwYXJhbSB7V2ViU29ja2V0U2VydmVyfSBzZXJ2ZXIgVGhlIFdlYlNvY2tldCBzZXJ2ZXJcbiAqIEBwYXJhbSB7aHR0cC5JbmNvbWluZ01lc3NhZ2V9IHJlcSBUaGUgcmVxdWVzdCBvYmplY3RcbiAqIEBwYXJhbSB7KG5ldC5Tb2NrZXR8dGxzLlNvY2tldCl9IHNvY2tldCBUaGUgc29ja2V0IG9mIHRoZSB1cGdyYWRlIHJlcXVlc3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb2RlIFRoZSBIVFRQIHJlc3BvbnNlIHN0YXR1cyBjb2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgSFRUUCByZXNwb25zZSBib2R5XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhYm9ydEhhbmRzaGFrZU9yRW1pdHdzQ2xpZW50RXJyb3Ioc2VydmVyLCByZXEsIHNvY2tldCwgY29kZSwgbWVzc2FnZSkge1xuICBpZiAoc2VydmVyLmxpc3RlbmVyQ291bnQoJ3dzQ2xpZW50RXJyb3InKSkge1xuICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShlcnIsIGFib3J0SGFuZHNoYWtlT3JFbWl0d3NDbGllbnRFcnJvcik7XG5cbiAgICBzZXJ2ZXIuZW1pdCgnd3NDbGllbnRFcnJvcicsIGVyciwgc29ja2V0LCByZXEpO1xuICB9IGVsc2Uge1xuICAgIGFib3J0SGFuZHNoYWtlKHNvY2tldCwgY29kZSwgbWVzc2FnZSk7XG4gIH1cbn1cbiIsIi8qIGVzbGludCBuby11bnVzZWQtdmFyczogW1wiZXJyb3JcIiwgeyBcInZhcnNJZ25vcmVQYXR0ZXJuXCI6IFwiXlJlYWRhYmxlJFwiIH1dICovXG5cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5jb25zdCBodHRwcyA9IHJlcXVpcmUoJ2h0dHBzJyk7XG5jb25zdCBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xuY29uc3QgbmV0ID0gcmVxdWlyZSgnbmV0Jyk7XG5jb25zdCB0bHMgPSByZXF1aXJlKCd0bHMnKTtcbmNvbnN0IHsgcmFuZG9tQnl0ZXMsIGNyZWF0ZUhhc2ggfSA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuY29uc3QgeyBSZWFkYWJsZSB9ID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5jb25zdCB7IFVSTCB9ID0gcmVxdWlyZSgndXJsJyk7XG5cbmNvbnN0IFBlck1lc3NhZ2VEZWZsYXRlID0gcmVxdWlyZSgnLi9wZXJtZXNzYWdlLWRlZmxhdGUnKTtcbmNvbnN0IFJlY2VpdmVyID0gcmVxdWlyZSgnLi9yZWNlaXZlcicpO1xuY29uc3QgU2VuZGVyID0gcmVxdWlyZSgnLi9zZW5kZXInKTtcbmNvbnN0IHtcbiAgQklOQVJZX1RZUEVTLFxuICBFTVBUWV9CVUZGRVIsXG4gIEdVSUQsXG4gIGtGb3JPbkV2ZW50QXR0cmlidXRlLFxuICBrTGlzdGVuZXIsXG4gIGtTdGF0dXNDb2RlLFxuICBrV2ViU29ja2V0LFxuICBOT09QXG59ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbmNvbnN0IHtcbiAgRXZlbnRUYXJnZXQ6IHsgYWRkRXZlbnRMaXN0ZW5lciwgcmVtb3ZlRXZlbnRMaXN0ZW5lciB9XG59ID0gcmVxdWlyZSgnLi9ldmVudC10YXJnZXQnKTtcbmNvbnN0IHsgZm9ybWF0LCBwYXJzZSB9ID0gcmVxdWlyZSgnLi9leHRlbnNpb24nKTtcbmNvbnN0IHsgdG9CdWZmZXIgfSA9IHJlcXVpcmUoJy4vYnVmZmVyLXV0aWwnKTtcblxuY29uc3QgY2xvc2VUaW1lb3V0ID0gMzAgKiAxMDAwO1xuY29uc3Qga0Fib3J0ZWQgPSBTeW1ib2woJ2tBYm9ydGVkJyk7XG5jb25zdCBwcm90b2NvbFZlcnNpb25zID0gWzgsIDEzXTtcbmNvbnN0IHJlYWR5U3RhdGVzID0gWydDT05ORUNUSU5HJywgJ09QRU4nLCAnQ0xPU0lORycsICdDTE9TRUQnXTtcbmNvbnN0IHN1YnByb3RvY29sUmVnZXggPSAvXlshIyQlJicqK1xcLS4wLTlBLVpeX2B8YS16fl0rJC87XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgV2ViU29ja2V0LlxuICpcbiAqIEBleHRlbmRzIEV2ZW50RW1pdHRlclxuICovXG5jbGFzcyBXZWJTb2NrZXQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGBXZWJTb2NrZXRgLlxuICAgKlxuICAgKiBAcGFyYW0geyhTdHJpbmd8VVJMKX0gYWRkcmVzcyBUaGUgVVJMIHRvIHdoaWNoIHRvIGNvbm5lY3RcbiAgICogQHBhcmFtIHsoU3RyaW5nfFN0cmluZ1tdKX0gW3Byb3RvY29sc10gVGhlIHN1YnByb3RvY29sc1xuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIENvbm5lY3Rpb24gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IoYWRkcmVzcywgcHJvdG9jb2xzLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuX2JpbmFyeVR5cGUgPSBCSU5BUllfVFlQRVNbMF07XG4gICAgdGhpcy5fY2xvc2VDb2RlID0gMTAwNjtcbiAgICB0aGlzLl9jbG9zZUZyYW1lUmVjZWl2ZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9jbG9zZUZyYW1lU2VudCA9IGZhbHNlO1xuICAgIHRoaXMuX2Nsb3NlTWVzc2FnZSA9IEVNUFRZX0JVRkZFUjtcbiAgICB0aGlzLl9jbG9zZVRpbWVyID0gbnVsbDtcbiAgICB0aGlzLl9leHRlbnNpb25zID0ge307XG4gICAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5fcHJvdG9jb2wgPSAnJztcbiAgICB0aGlzLl9yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNPTk5FQ1RJTkc7XG4gICAgdGhpcy5fcmVjZWl2ZXIgPSBudWxsO1xuICAgIHRoaXMuX3NlbmRlciA9IG51bGw7XG4gICAgdGhpcy5fc29ja2V0ID0gbnVsbDtcblxuICAgIGlmIChhZGRyZXNzICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9idWZmZXJlZEFtb3VudCA9IDA7XG4gICAgICB0aGlzLl9pc1NlcnZlciA9IGZhbHNlO1xuICAgICAgdGhpcy5fcmVkaXJlY3RzID0gMDtcblxuICAgICAgaWYgKHByb3RvY29scyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByb3RvY29scyA9IFtdO1xuICAgICAgfSBlbHNlIGlmICghQXJyYXkuaXNBcnJheShwcm90b2NvbHMpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcHJvdG9jb2xzID09PSAnb2JqZWN0JyAmJiBwcm90b2NvbHMgIT09IG51bGwpIHtcbiAgICAgICAgICBvcHRpb25zID0gcHJvdG9jb2xzO1xuICAgICAgICAgIHByb3RvY29scyA9IFtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3RvY29scyA9IFtwcm90b2NvbHNdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGluaXRBc0NsaWVudCh0aGlzLCBhZGRyZXNzLCBwcm90b2NvbHMsIG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9pc1NlcnZlciA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZGV2aWF0ZXMgZnJvbSB0aGUgV0hBVFdHIGludGVyZmFjZSBzaW5jZSB3cyBkb2Vzbid0IHN1cHBvcnQgdGhlXG4gICAqIHJlcXVpcmVkIGRlZmF1bHQgXCJibG9iXCIgdHlwZSAoaW5zdGVhZCB3ZSBkZWZpbmUgYSBjdXN0b20gXCJub2RlYnVmZmVyXCJcbiAgICogdHlwZSkuXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgYmluYXJ5VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYmluYXJ5VHlwZTtcbiAgfVxuXG4gIHNldCBiaW5hcnlUeXBlKHR5cGUpIHtcbiAgICBpZiAoIUJJTkFSWV9UWVBFUy5pbmNsdWRlcyh0eXBlKSkgcmV0dXJuO1xuXG4gICAgdGhpcy5fYmluYXJ5VHlwZSA9IHR5cGU7XG5cbiAgICAvL1xuICAgIC8vIEFsbG93IHRvIGNoYW5nZSBgYmluYXJ5VHlwZWAgb24gdGhlIGZseS5cbiAgICAvL1xuICAgIGlmICh0aGlzLl9yZWNlaXZlcikgdGhpcy5fcmVjZWl2ZXIuX2JpbmFyeVR5cGUgPSB0eXBlO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBnZXQgYnVmZmVyZWRBbW91bnQoKSB7XG4gICAgaWYgKCF0aGlzLl9zb2NrZXQpIHJldHVybiB0aGlzLl9idWZmZXJlZEFtb3VudDtcblxuICAgIHJldHVybiB0aGlzLl9zb2NrZXQuX3dyaXRhYmxlU3RhdGUubGVuZ3RoICsgdGhpcy5fc2VuZGVyLl9idWZmZXJlZEJ5dGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgZXh0ZW5zaW9ucygpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5fZXh0ZW5zaW9ucykuam9pbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtCb29sZWFufVxuICAgKi9cbiAgZ2V0IGlzUGF1c2VkKCkge1xuICAgIHJldHVybiB0aGlzLl9wYXVzZWQ7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgZ2V0IG9uY2xvc2UoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgZ2V0IG9uZXJyb3IoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge0Z1bmN0aW9ufVxuICAgKi9cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgZ2V0IG9ub3BlbigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBnZXQgb25tZXNzYWdlKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgcHJvdG9jb2woKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Byb3RvY29sO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBnZXQgcmVhZHlTdGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVhZHlTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0IHVybCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB1cCB0aGUgc29ja2V0IGFuZCB0aGUgaW50ZXJuYWwgcmVzb3VyY2VzLlxuICAgKlxuICAgKiBAcGFyYW0geyhuZXQuU29ja2V0fHRscy5Tb2NrZXQpfSBzb2NrZXQgVGhlIG5ldHdvcmsgc29ja2V0IGJldHdlZW4gdGhlXG4gICAqICAgICBzZXJ2ZXIgYW5kIGNsaWVudFxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gaGVhZCBUaGUgZmlyc3QgcGFja2V0IG9mIHRoZSB1cGdyYWRlZCBzdHJlYW1cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgT3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuZ2VuZXJhdGVNYXNrXSBUaGUgZnVuY3Rpb24gdXNlZCB0byBnZW5lcmF0ZSB0aGVcbiAgICogICAgIG1hc2tpbmcga2V5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXhQYXlsb2FkPTBdIFRoZSBtYXhpbXVtIGFsbG93ZWQgbWVzc2FnZSBzaXplXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuc2tpcFVURjhWYWxpZGF0aW9uPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvclxuICAgKiAgICAgbm90IHRvIHNraXAgVVRGLTggdmFsaWRhdGlvbiBmb3IgdGV4dCBhbmQgY2xvc2UgbWVzc2FnZXNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHNldFNvY2tldChzb2NrZXQsIGhlYWQsIG9wdGlvbnMpIHtcbiAgICBjb25zdCByZWNlaXZlciA9IG5ldyBSZWNlaXZlcih7XG4gICAgICBiaW5hcnlUeXBlOiB0aGlzLmJpbmFyeVR5cGUsXG4gICAgICBleHRlbnNpb25zOiB0aGlzLl9leHRlbnNpb25zLFxuICAgICAgaXNTZXJ2ZXI6IHRoaXMuX2lzU2VydmVyLFxuICAgICAgbWF4UGF5bG9hZDogb3B0aW9ucy5tYXhQYXlsb2FkLFxuICAgICAgc2tpcFVURjhWYWxpZGF0aW9uOiBvcHRpb25zLnNraXBVVEY4VmFsaWRhdGlvblxuICAgIH0pO1xuXG4gICAgdGhpcy5fc2VuZGVyID0gbmV3IFNlbmRlcihzb2NrZXQsIHRoaXMuX2V4dGVuc2lvbnMsIG9wdGlvbnMuZ2VuZXJhdGVNYXNrKTtcbiAgICB0aGlzLl9yZWNlaXZlciA9IHJlY2VpdmVyO1xuICAgIHRoaXMuX3NvY2tldCA9IHNvY2tldDtcblxuICAgIHJlY2VpdmVyW2tXZWJTb2NrZXRdID0gdGhpcztcbiAgICBzb2NrZXRba1dlYlNvY2tldF0gPSB0aGlzO1xuXG4gICAgcmVjZWl2ZXIub24oJ2NvbmNsdWRlJywgcmVjZWl2ZXJPbkNvbmNsdWRlKTtcbiAgICByZWNlaXZlci5vbignZHJhaW4nLCByZWNlaXZlck9uRHJhaW4pO1xuICAgIHJlY2VpdmVyLm9uKCdlcnJvcicsIHJlY2VpdmVyT25FcnJvcik7XG4gICAgcmVjZWl2ZXIub24oJ21lc3NhZ2UnLCByZWNlaXZlck9uTWVzc2FnZSk7XG4gICAgcmVjZWl2ZXIub24oJ3BpbmcnLCByZWNlaXZlck9uUGluZyk7XG4gICAgcmVjZWl2ZXIub24oJ3BvbmcnLCByZWNlaXZlck9uUG9uZyk7XG5cbiAgICBzb2NrZXQuc2V0VGltZW91dCgwKTtcbiAgICBzb2NrZXQuc2V0Tm9EZWxheSgpO1xuXG4gICAgaWYgKGhlYWQubGVuZ3RoID4gMCkgc29ja2V0LnVuc2hpZnQoaGVhZCk7XG5cbiAgICBzb2NrZXQub24oJ2Nsb3NlJywgc29ja2V0T25DbG9zZSk7XG4gICAgc29ja2V0Lm9uKCdkYXRhJywgc29ja2V0T25EYXRhKTtcbiAgICBzb2NrZXQub24oJ2VuZCcsIHNvY2tldE9uRW5kKTtcbiAgICBzb2NrZXQub24oJ2Vycm9yJywgc29ja2V0T25FcnJvcik7XG5cbiAgICB0aGlzLl9yZWFkeVN0YXRlID0gV2ViU29ja2V0Lk9QRU47XG4gICAgdGhpcy5lbWl0KCdvcGVuJyk7XG4gIH1cblxuICAvKipcbiAgICogRW1pdCB0aGUgYCdjbG9zZSdgIGV2ZW50LlxuICAgKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZW1pdENsb3NlKCkge1xuICAgIGlmICghdGhpcy5fc29ja2V0KSB7XG4gICAgICB0aGlzLl9yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NFRDtcbiAgICAgIHRoaXMuZW1pdCgnY2xvc2UnLCB0aGlzLl9jbG9zZUNvZGUsIHRoaXMuX2Nsb3NlTWVzc2FnZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0pIHtcbiAgICAgIHRoaXMuX2V4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0uY2xlYW51cCgpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlY2VpdmVyLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0VEO1xuICAgIHRoaXMuZW1pdCgnY2xvc2UnLCB0aGlzLl9jbG9zZUNvZGUsIHRoaXMuX2Nsb3NlTWVzc2FnZSk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgYSBjbG9zaW5nIGhhbmRzaGFrZS5cbiAgICpcbiAgICogICAgICAgICAgKy0tLS0tLS0tLS0rICAgKy0tLS0tLS0tLS0tKyAgICstLS0tLS0tLS0tK1xuICAgKiAgICAgLSAtIC18d3MuY2xvc2UoKXwtLT58Y2xvc2UgZnJhbWV8LS0+fHdzLmNsb3NlKCl8LSAtIC1cbiAgICogICAgfCAgICAgKy0tLS0tLS0tLS0rICAgKy0tLS0tLS0tLS0tKyAgICstLS0tLS0tLS0tKyAgICAgfFxuICAgKiAgICAgICAgICArLS0tLS0tLS0tLSsgICArLS0tLS0tLS0tLS0rICAgICAgICAgfFxuICAgKiBDTE9TSU5HICB8d3MuY2xvc2UoKXw8LS18Y2xvc2UgZnJhbWV8PC0tKy0tLS0tKyAgICAgICBDTE9TSU5HXG4gICAqICAgICAgICAgICstLS0tLS0tLS0tKyAgICstLS0tLS0tLS0tLSsgICB8XG4gICAqICAgIHwgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICB8ICAgKy0tLSsgICAgICAgIHxcbiAgICogICAgICAgICAgICAgICAgKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSstLT58ZmlufCAtIC0gLSAtXG4gICAqICAgIHwgICAgICAgICArLS0tKyAgICAgICAgICAgICAgICAgICAgICB8ICAgKy0tLStcbiAgICogICAgIC0gLSAtIC0gLXxmaW58PC0tLS0tLS0tLS0tLS0tLS0tLS0tLStcbiAgICogICAgICAgICAgICAgICstLS0rXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29kZV0gU3RhdHVzIGNvZGUgZXhwbGFpbmluZyB3aHkgdGhlIGNvbm5lY3Rpb24gaXMgY2xvc2luZ1xuICAgKiBAcGFyYW0geyhTdHJpbmd8QnVmZmVyKX0gW2RhdGFdIFRoZSByZWFzb24gd2h5IHRoZSBjb25uZWN0aW9uIGlzXG4gICAqICAgICBjbG9zaW5nXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNsb3NlKGNvZGUsIGRhdGEpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ0xPU0VEKSByZXR1cm47XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNPTk5FQ1RJTkcpIHtcbiAgICAgIGNvbnN0IG1zZyA9ICdXZWJTb2NrZXQgd2FzIGNsb3NlZCBiZWZvcmUgdGhlIGNvbm5lY3Rpb24gd2FzIGVzdGFibGlzaGVkJztcbiAgICAgIGFib3J0SGFuZHNoYWtlKHRoaXMsIHRoaXMuX3JlcSwgbXNnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ0xPU0lORykge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLl9jbG9zZUZyYW1lU2VudCAmJlxuICAgICAgICAodGhpcy5fY2xvc2VGcmFtZVJlY2VpdmVkIHx8IHRoaXMuX3JlY2VpdmVyLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZClcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9zb2NrZXQuZW5kKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NJTkc7XG4gICAgdGhpcy5fc2VuZGVyLmNsb3NlKGNvZGUsIGRhdGEsICF0aGlzLl9pc1NlcnZlciwgKGVycikgPT4ge1xuICAgICAgLy9cbiAgICAgIC8vIFRoaXMgZXJyb3IgaXMgaGFuZGxlZCBieSB0aGUgYCdlcnJvcidgIGxpc3RlbmVyIG9uIHRoZSBzb2NrZXQuIFdlIG9ubHlcbiAgICAgIC8vIHdhbnQgdG8ga25vdyBpZiB0aGUgY2xvc2UgZnJhbWUgaGFzIGJlZW4gc2VudCBoZXJlLlxuICAgICAgLy9cbiAgICAgIGlmIChlcnIpIHJldHVybjtcblxuICAgICAgdGhpcy5fY2xvc2VGcmFtZVNlbnQgPSB0cnVlO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuX2Nsb3NlRnJhbWVSZWNlaXZlZCB8fFxuICAgICAgICB0aGlzLl9yZWNlaXZlci5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWRcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9zb2NrZXQuZW5kKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvL1xuICAgIC8vIFNwZWNpZnkgYSB0aW1lb3V0IGZvciB0aGUgY2xvc2luZyBoYW5kc2hha2UgdG8gY29tcGxldGUuXG4gICAgLy9cbiAgICB0aGlzLl9jbG9zZVRpbWVyID0gc2V0VGltZW91dChcbiAgICAgIHRoaXMuX3NvY2tldC5kZXN0cm95LmJpbmQodGhpcy5fc29ja2V0KSxcbiAgICAgIGNsb3NlVGltZW91dFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUGF1c2UgdGhlIHNvY2tldC5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcGF1c2UoKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ09OTkVDVElORyB8fFxuICAgICAgdGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ0xPU0VEXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTtcbiAgICB0aGlzLl9zb2NrZXQucGF1c2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgcGluZy5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBbZGF0YV0gVGhlIGRhdGEgdG8gc2VuZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFttYXNrXSBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdG8gbWFzayBgZGF0YWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXSBDYWxsYmFjayB3aGljaCBpcyBleGVjdXRlZCB3aGVuIHRoZSBwaW5nIGlzIHNlbnRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcGluZyhkYXRhLCBtYXNrLCBjYikge1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DT05ORUNUSU5HKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYlNvY2tldCBpcyBub3Qgb3BlbjogcmVhZHlTdGF0ZSAwIChDT05ORUNUSU5HKScpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IgPSBkYXRhO1xuICAgICAgZGF0YSA9IG1hc2sgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbWFzayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IgPSBtYXNrO1xuICAgICAgbWFzayA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdudW1iZXInKSBkYXRhID0gZGF0YS50b1N0cmluZygpO1xuXG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPT0gV2ViU29ja2V0Lk9QRU4pIHtcbiAgICAgIHNlbmRBZnRlckNsb3NlKHRoaXMsIGRhdGEsIGNiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobWFzayA9PT0gdW5kZWZpbmVkKSBtYXNrID0gIXRoaXMuX2lzU2VydmVyO1xuICAgIHRoaXMuX3NlbmRlci5waW5nKGRhdGEgfHwgRU1QVFlfQlVGRkVSLCBtYXNrLCBjYik7XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBhIHBvbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gW2RhdGFdIFRoZSBkYXRhIHRvIHNlbmRcbiAgICogQHBhcmFtIHtCb29sZWFufSBbbWFza10gSW5kaWNhdGVzIHdoZXRoZXIgb3Igbm90IHRvIG1hc2sgYGRhdGFgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl0gQ2FsbGJhY2sgd2hpY2ggaXMgZXhlY3V0ZWQgd2hlbiB0aGUgcG9uZyBpcyBzZW50XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHBvbmcoZGF0YSwgbWFzaywgY2IpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ09OTkVDVElORykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJTb2NrZXQgaXMgbm90IG9wZW46IHJlYWR5U3RhdGUgMCAoQ09OTkVDVElORyknKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNiID0gZGF0YTtcbiAgICAgIGRhdGEgPSBtYXNrID0gdW5kZWZpbmVkO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG1hc2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNiID0gbWFzaztcbiAgICAgIG1hc2sgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnbnVtYmVyJykgZGF0YSA9IGRhdGEudG9TdHJpbmcoKTtcblxuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgIT09IFdlYlNvY2tldC5PUEVOKSB7XG4gICAgICBzZW5kQWZ0ZXJDbG9zZSh0aGlzLCBkYXRhLCBjYik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG1hc2sgPT09IHVuZGVmaW5lZCkgbWFzayA9ICF0aGlzLl9pc1NlcnZlcjtcbiAgICB0aGlzLl9zZW5kZXIucG9uZyhkYXRhIHx8IEVNUFRZX0JVRkZFUiwgbWFzaywgY2IpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc3VtZSB0aGUgc29ja2V0LlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICByZXN1bWUoKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ09OTkVDVElORyB8fFxuICAgICAgdGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ0xPU0VEXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XG4gICAgaWYgKCF0aGlzLl9yZWNlaXZlci5fd3JpdGFibGVTdGF0ZS5uZWVkRHJhaW4pIHRoaXMuX3NvY2tldC5yZXN1bWUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgZGF0YSBtZXNzYWdlLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGRhdGEgVGhlIG1lc3NhZ2UgdG8gc2VuZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIE9wdGlvbnMgb2JqZWN0XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYmluYXJ5XSBTcGVjaWZpZXMgd2hldGhlciBgZGF0YWAgaXMgYmluYXJ5IG9yXG4gICAqICAgICB0ZXh0XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuY29tcHJlc3NdIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBjb21wcmVzc1xuICAgKiAgICAgYGRhdGFgXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZmluPXRydWVdIFNwZWNpZmllcyB3aGV0aGVyIHRoZSBmcmFnbWVudCBpcyB0aGVcbiAgICogICAgIGxhc3Qgb25lXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMubWFza10gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIG1hc2sgYGRhdGFgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl0gQ2FsbGJhY2sgd2hpY2ggaXMgZXhlY3V0ZWQgd2hlbiBkYXRhIGlzIHdyaXR0ZW4gb3V0XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHNlbmQoZGF0YSwgb3B0aW9ucywgY2IpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ09OTkVDVElORykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJTb2NrZXQgaXMgbm90IG9wZW46IHJlYWR5U3RhdGUgMCAoQ09OTkVDVElORyknKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNiID0gb3B0aW9ucztcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdudW1iZXInKSBkYXRhID0gZGF0YS50b1N0cmluZygpO1xuXG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPT0gV2ViU29ja2V0Lk9QRU4pIHtcbiAgICAgIHNlbmRBZnRlckNsb3NlKHRoaXMsIGRhdGEsIGNiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvcHRzID0ge1xuICAgICAgYmluYXJ5OiB0eXBlb2YgZGF0YSAhPT0gJ3N0cmluZycsXG4gICAgICBtYXNrOiAhdGhpcy5faXNTZXJ2ZXIsXG4gICAgICBjb21wcmVzczogdHJ1ZSxcbiAgICAgIGZpbjogdHJ1ZSxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuXG4gICAgaWYgKCF0aGlzLl9leHRlbnNpb25zW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdKSB7XG4gICAgICBvcHRzLmNvbXByZXNzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5fc2VuZGVyLnNlbmQoZGF0YSB8fCBFTVBUWV9CVUZGRVIsIG9wdHMsIGNiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3JjaWJseSBjbG9zZSB0aGUgY29ubmVjdGlvbi5cbiAgICpcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgdGVybWluYXRlKCkge1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DTE9TRUQpIHJldHVybjtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ09OTkVDVElORykge1xuICAgICAgY29uc3QgbXNnID0gJ1dlYlNvY2tldCB3YXMgY2xvc2VkIGJlZm9yZSB0aGUgY29ubmVjdGlvbiB3YXMgZXN0YWJsaXNoZWQnO1xuICAgICAgYWJvcnRIYW5kc2hha2UodGhpcywgdGhpcy5fcmVxLCBtc2cpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9zb2NrZXQpIHtcbiAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0lORztcbiAgICAgIHRoaXMuX3NvY2tldC5kZXN0cm95KCk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQGNvbnN0YW50IHtOdW1iZXJ9IENPTk5FQ1RJTkdcbiAqIEBtZW1iZXJvZiBXZWJTb2NrZXRcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFdlYlNvY2tldCwgJ0NPTk5FQ1RJTkcnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIHZhbHVlOiByZWFkeVN0YXRlcy5pbmRleE9mKCdDT05ORUNUSU5HJylcbn0pO1xuXG4vKipcbiAqIEBjb25zdGFudCB7TnVtYmVyfSBDT05ORUNUSU5HXG4gKiBAbWVtYmVyb2YgV2ViU29ja2V0LnByb3RvdHlwZVxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoV2ViU29ja2V0LnByb3RvdHlwZSwgJ0NPTk5FQ1RJTkcnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIHZhbHVlOiByZWFkeVN0YXRlcy5pbmRleE9mKCdDT05ORUNUSU5HJylcbn0pO1xuXG4vKipcbiAqIEBjb25zdGFudCB7TnVtYmVyfSBPUEVOXG4gKiBAbWVtYmVyb2YgV2ViU29ja2V0XG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShXZWJTb2NrZXQsICdPUEVOJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICB2YWx1ZTogcmVhZHlTdGF0ZXMuaW5kZXhPZignT1BFTicpXG59KTtcblxuLyoqXG4gKiBAY29uc3RhbnQge051bWJlcn0gT1BFTlxuICogQG1lbWJlcm9mIFdlYlNvY2tldC5wcm90b3R5cGVcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFdlYlNvY2tldC5wcm90b3R5cGUsICdPUEVOJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICB2YWx1ZTogcmVhZHlTdGF0ZXMuaW5kZXhPZignT1BFTicpXG59KTtcblxuLyoqXG4gKiBAY29uc3RhbnQge051bWJlcn0gQ0xPU0lOR1xuICogQG1lbWJlcm9mIFdlYlNvY2tldFxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoV2ViU29ja2V0LCAnQ0xPU0lORycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgdmFsdWU6IHJlYWR5U3RhdGVzLmluZGV4T2YoJ0NMT1NJTkcnKVxufSk7XG5cbi8qKlxuICogQGNvbnN0YW50IHtOdW1iZXJ9IENMT1NJTkdcbiAqIEBtZW1iZXJvZiBXZWJTb2NrZXQucHJvdG90eXBlXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShXZWJTb2NrZXQucHJvdG90eXBlLCAnQ0xPU0lORycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgdmFsdWU6IHJlYWR5U3RhdGVzLmluZGV4T2YoJ0NMT1NJTkcnKVxufSk7XG5cbi8qKlxuICogQGNvbnN0YW50IHtOdW1iZXJ9IENMT1NFRFxuICogQG1lbWJlcm9mIFdlYlNvY2tldFxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoV2ViU29ja2V0LCAnQ0xPU0VEJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICB2YWx1ZTogcmVhZHlTdGF0ZXMuaW5kZXhPZignQ0xPU0VEJylcbn0pO1xuXG4vKipcbiAqIEBjb25zdGFudCB7TnVtYmVyfSBDTE9TRURcbiAqIEBtZW1iZXJvZiBXZWJTb2NrZXQucHJvdG90eXBlXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShXZWJTb2NrZXQucHJvdG90eXBlLCAnQ0xPU0VEJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICB2YWx1ZTogcmVhZHlTdGF0ZXMuaW5kZXhPZignQ0xPU0VEJylcbn0pO1xuXG5bXG4gICdiaW5hcnlUeXBlJyxcbiAgJ2J1ZmZlcmVkQW1vdW50JyxcbiAgJ2V4dGVuc2lvbnMnLFxuICAnaXNQYXVzZWQnLFxuICAncHJvdG9jb2wnLFxuICAncmVhZHlTdGF0ZScsXG4gICd1cmwnXG5dLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXZWJTb2NrZXQucHJvdG90eXBlLCBwcm9wZXJ0eSwgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xufSk7XG5cbi8vXG4vLyBBZGQgdGhlIGBvbm9wZW5gLCBgb25lcnJvcmAsIGBvbmNsb3NlYCwgYW5kIGBvbm1lc3NhZ2VgIGF0dHJpYnV0ZXMuXG4vLyBTZWUgaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvY29tbXMuaHRtbCN0aGUtd2Vic29ja2V0LWludGVyZmFjZVxuLy9cblsnb3BlbicsICdlcnJvcicsICdjbG9zZScsICdtZXNzYWdlJ10uZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXZWJTb2NrZXQucHJvdG90eXBlLCBgb24ke21ldGhvZH1gLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQoKSB7XG4gICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIHRoaXMubGlzdGVuZXJzKG1ldGhvZCkpIHtcbiAgICAgICAgaWYgKGxpc3RlbmVyW2tGb3JPbkV2ZW50QXR0cmlidXRlXSkgcmV0dXJuIGxpc3RlbmVyW2tMaXN0ZW5lcl07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgc2V0KGhhbmRsZXIpIHtcbiAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgdGhpcy5saXN0ZW5lcnMobWV0aG9kKSkge1xuICAgICAgICBpZiAobGlzdGVuZXJba0Zvck9uRXZlbnRBdHRyaWJ1dGVdKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihtZXRob2QsIGxpc3RlbmVyKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHJldHVybjtcblxuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKG1ldGhvZCwgaGFuZGxlciwge1xuICAgICAgICBba0Zvck9uRXZlbnRBdHRyaWJ1dGVdOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbldlYlNvY2tldC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGFkZEV2ZW50TGlzdGVuZXI7XG5XZWJTb2NrZXQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZW1vdmVFdmVudExpc3RlbmVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYlNvY2tldDtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgV2ViU29ja2V0IGNsaWVudC5cbiAqXG4gKiBAcGFyYW0ge1dlYlNvY2tldH0gd2Vic29ja2V0IFRoZSBjbGllbnQgdG8gaW5pdGlhbGl6ZVxuICogQHBhcmFtIHsoU3RyaW5nfFVSTCl9IGFkZHJlc3MgVGhlIFVSTCB0byB3aGljaCB0byBjb25uZWN0XG4gKiBAcGFyYW0ge0FycmF5fSBwcm90b2NvbHMgVGhlIHN1YnByb3RvY29sc1xuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBDb25uZWN0aW9uIG9wdGlvbnNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZm9sbG93UmVkaXJlY3RzPWZhbHNlXSBXaGV0aGVyIG9yIG5vdCB0byBmb2xsb3dcbiAqICAgICByZWRpcmVjdHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmdlbmVyYXRlTWFza10gVGhlIGZ1bmN0aW9uIHVzZWQgdG8gZ2VuZXJhdGUgdGhlXG4gKiAgICAgbWFza2luZyBrZXlcbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5oYW5kc2hha2VUaW1lb3V0XSBUaW1lb3V0IGluIG1pbGxpc2Vjb25kcyBmb3IgdGhlXG4gKiAgICAgaGFuZHNoYWtlIHJlcXVlc3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5tYXhQYXlsb2FkPTEwNDg1NzYwMF0gVGhlIG1heGltdW0gYWxsb3dlZCBtZXNzYWdlXG4gKiAgICAgc2l6ZVxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heFJlZGlyZWN0cz0xMF0gVGhlIG1heGltdW0gbnVtYmVyIG9mIHJlZGlyZWN0c1xuICogICAgIGFsbG93ZWRcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5vcmlnaW5dIFZhbHVlIG9mIHRoZSBgT3JpZ2luYCBvclxuICogICAgIGBTZWMtV2ViU29ja2V0LU9yaWdpbmAgaGVhZGVyXG4gKiBAcGFyYW0geyhCb29sZWFufE9iamVjdCl9IFtvcHRpb25zLnBlck1lc3NhZ2VEZWZsYXRlPXRydWVdIEVuYWJsZS9kaXNhYmxlXG4gKiAgICAgcGVybWVzc2FnZS1kZWZsYXRlXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMucHJvdG9jb2xWZXJzaW9uPTEzXSBWYWx1ZSBvZiB0aGVcbiAqICAgICBgU2VjLVdlYlNvY2tldC1WZXJzaW9uYCBoZWFkZXJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuc2tpcFVURjhWYWxpZGF0aW9uPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvclxuICogICAgIG5vdCB0byBza2lwIFVURi04IHZhbGlkYXRpb24gZm9yIHRleHQgYW5kIGNsb3NlIG1lc3NhZ2VzXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpbml0QXNDbGllbnQod2Vic29ja2V0LCBhZGRyZXNzLCBwcm90b2NvbHMsIG9wdGlvbnMpIHtcbiAgY29uc3Qgb3B0cyA9IHtcbiAgICBwcm90b2NvbFZlcnNpb246IHByb3RvY29sVmVyc2lvbnNbMV0sXG4gICAgbWF4UGF5bG9hZDogMTAwICogMTAyNCAqIDEwMjQsXG4gICAgc2tpcFVURjhWYWxpZGF0aW9uOiBmYWxzZSxcbiAgICBwZXJNZXNzYWdlRGVmbGF0ZTogdHJ1ZSxcbiAgICBmb2xsb3dSZWRpcmVjdHM6IGZhbHNlLFxuICAgIG1heFJlZGlyZWN0czogMTAsXG4gICAgLi4ub3B0aW9ucyxcbiAgICBjcmVhdGVDb25uZWN0aW9uOiB1bmRlZmluZWQsXG4gICAgc29ja2V0UGF0aDogdW5kZWZpbmVkLFxuICAgIGhvc3RuYW1lOiB1bmRlZmluZWQsXG4gICAgcHJvdG9jb2w6IHVuZGVmaW5lZCxcbiAgICB0aW1lb3V0OiB1bmRlZmluZWQsXG4gICAgbWV0aG9kOiAnR0VUJyxcbiAgICBob3N0OiB1bmRlZmluZWQsXG4gICAgcGF0aDogdW5kZWZpbmVkLFxuICAgIHBvcnQ6IHVuZGVmaW5lZFxuICB9O1xuXG4gIGlmICghcHJvdG9jb2xWZXJzaW9ucy5pbmNsdWRlcyhvcHRzLnByb3RvY29sVmVyc2lvbikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcbiAgICAgIGBVbnN1cHBvcnRlZCBwcm90b2NvbCB2ZXJzaW9uOiAke29wdHMucHJvdG9jb2xWZXJzaW9ufSBgICtcbiAgICAgICAgYChzdXBwb3J0ZWQgdmVyc2lvbnM6ICR7cHJvdG9jb2xWZXJzaW9ucy5qb2luKCcsICcpfSlgXG4gICAgKTtcbiAgfVxuXG4gIGxldCBwYXJzZWRVcmw7XG5cbiAgaWYgKGFkZHJlc3MgaW5zdGFuY2VvZiBVUkwpIHtcbiAgICBwYXJzZWRVcmwgPSBhZGRyZXNzO1xuICAgIHdlYnNvY2tldC5fdXJsID0gYWRkcmVzcy5ocmVmO1xuICB9IGVsc2Uge1xuICAgIHRyeSB7XG4gICAgICBwYXJzZWRVcmwgPSBuZXcgVVJMKGFkZHJlc3MpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgSW52YWxpZCBVUkw6ICR7YWRkcmVzc31gKTtcbiAgICB9XG5cbiAgICB3ZWJzb2NrZXQuX3VybCA9IGFkZHJlc3M7XG4gIH1cblxuICBjb25zdCBpc1NlY3VyZSA9IHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ3dzczonO1xuICBjb25zdCBpc0lwY1VybCA9IHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ3dzK3VuaXg6JztcbiAgbGV0IGludmFsaWRVcmxNZXNzYWdlO1xuXG4gIGlmIChwYXJzZWRVcmwucHJvdG9jb2wgIT09ICd3czonICYmICFpc1NlY3VyZSAmJiAhaXNJcGNVcmwpIHtcbiAgICBpbnZhbGlkVXJsTWVzc2FnZSA9XG4gICAgICAnVGhlIFVSTFxcJ3MgcHJvdG9jb2wgbXVzdCBiZSBvbmUgb2YgXCJ3czpcIiwgXCJ3c3M6XCIsIG9yIFwid3MrdW5peDpcIic7XG4gIH0gZWxzZSBpZiAoaXNJcGNVcmwgJiYgIXBhcnNlZFVybC5wYXRobmFtZSkge1xuICAgIGludmFsaWRVcmxNZXNzYWdlID0gXCJUaGUgVVJMJ3MgcGF0aG5hbWUgaXMgZW1wdHlcIjtcbiAgfSBlbHNlIGlmIChwYXJzZWRVcmwuaGFzaCkge1xuICAgIGludmFsaWRVcmxNZXNzYWdlID0gJ1RoZSBVUkwgY29udGFpbnMgYSBmcmFnbWVudCBpZGVudGlmaWVyJztcbiAgfVxuXG4gIGlmIChpbnZhbGlkVXJsTWVzc2FnZSkge1xuICAgIGNvbnN0IGVyciA9IG5ldyBTeW50YXhFcnJvcihpbnZhbGlkVXJsTWVzc2FnZSk7XG5cbiAgICBpZiAod2Vic29ja2V0Ll9yZWRpcmVjdHMgPT09IDApIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9IGVsc2Uge1xuICAgICAgZW1pdEVycm9yQW5kQ2xvc2Uod2Vic29ja2V0LCBlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGRlZmF1bHRQb3J0ID0gaXNTZWN1cmUgPyA0NDMgOiA4MDtcbiAgY29uc3Qga2V5ID0gcmFuZG9tQnl0ZXMoMTYpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgY29uc3QgcmVxdWVzdCA9IGlzU2VjdXJlID8gaHR0cHMucmVxdWVzdCA6IGh0dHAucmVxdWVzdDtcbiAgY29uc3QgcHJvdG9jb2xTZXQgPSBuZXcgU2V0KCk7XG4gIGxldCBwZXJNZXNzYWdlRGVmbGF0ZTtcblxuICBvcHRzLmNyZWF0ZUNvbm5lY3Rpb24gPSBpc1NlY3VyZSA/IHRsc0Nvbm5lY3QgOiBuZXRDb25uZWN0O1xuICBvcHRzLmRlZmF1bHRQb3J0ID0gb3B0cy5kZWZhdWx0UG9ydCB8fCBkZWZhdWx0UG9ydDtcbiAgb3B0cy5wb3J0ID0gcGFyc2VkVXJsLnBvcnQgfHwgZGVmYXVsdFBvcnQ7XG4gIG9wdHMuaG9zdCA9IHBhcnNlZFVybC5ob3N0bmFtZS5zdGFydHNXaXRoKCdbJylcbiAgICA/IHBhcnNlZFVybC5ob3N0bmFtZS5zbGljZSgxLCAtMSlcbiAgICA6IHBhcnNlZFVybC5ob3N0bmFtZTtcbiAgb3B0cy5oZWFkZXJzID0ge1xuICAgIC4uLm9wdHMuaGVhZGVycyxcbiAgICAnU2VjLVdlYlNvY2tldC1WZXJzaW9uJzogb3B0cy5wcm90b2NvbFZlcnNpb24sXG4gICAgJ1NlYy1XZWJTb2NrZXQtS2V5Jzoga2V5LFxuICAgIENvbm5lY3Rpb246ICdVcGdyYWRlJyxcbiAgICBVcGdyYWRlOiAnd2Vic29ja2V0J1xuICB9O1xuICBvcHRzLnBhdGggPSBwYXJzZWRVcmwucGF0aG5hbWUgKyBwYXJzZWRVcmwuc2VhcmNoO1xuICBvcHRzLnRpbWVvdXQgPSBvcHRzLmhhbmRzaGFrZVRpbWVvdXQ7XG5cbiAgaWYgKG9wdHMucGVyTWVzc2FnZURlZmxhdGUpIHtcbiAgICBwZXJNZXNzYWdlRGVmbGF0ZSA9IG5ldyBQZXJNZXNzYWdlRGVmbGF0ZShcbiAgICAgIG9wdHMucGVyTWVzc2FnZURlZmxhdGUgIT09IHRydWUgPyBvcHRzLnBlck1lc3NhZ2VEZWZsYXRlIDoge30sXG4gICAgICBmYWxzZSxcbiAgICAgIG9wdHMubWF4UGF5bG9hZFxuICAgICk7XG4gICAgb3B0cy5oZWFkZXJzWydTZWMtV2ViU29ja2V0LUV4dGVuc2lvbnMnXSA9IGZvcm1hdCh7XG4gICAgICBbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV06IHBlck1lc3NhZ2VEZWZsYXRlLm9mZmVyKClcbiAgICB9KTtcbiAgfVxuICBpZiAocHJvdG9jb2xzLmxlbmd0aCkge1xuICAgIGZvciAoY29uc3QgcHJvdG9jb2wgb2YgcHJvdG9jb2xzKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBwcm90b2NvbCAhPT0gJ3N0cmluZycgfHxcbiAgICAgICAgIXN1YnByb3RvY29sUmVnZXgudGVzdChwcm90b2NvbCkgfHxcbiAgICAgICAgcHJvdG9jb2xTZXQuaGFzKHByb3RvY29sKVxuICAgICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcbiAgICAgICAgICAnQW4gaW52YWxpZCBvciBkdXBsaWNhdGVkIHN1YnByb3RvY29sIHdhcyBzcGVjaWZpZWQnXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHByb3RvY29sU2V0LmFkZChwcm90b2NvbCk7XG4gICAgfVxuXG4gICAgb3B0cy5oZWFkZXJzWydTZWMtV2ViU29ja2V0LVByb3RvY29sJ10gPSBwcm90b2NvbHMuam9pbignLCcpO1xuICB9XG4gIGlmIChvcHRzLm9yaWdpbikge1xuICAgIGlmIChvcHRzLnByb3RvY29sVmVyc2lvbiA8IDEzKSB7XG4gICAgICBvcHRzLmhlYWRlcnNbJ1NlYy1XZWJTb2NrZXQtT3JpZ2luJ10gPSBvcHRzLm9yaWdpbjtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0cy5oZWFkZXJzLk9yaWdpbiA9IG9wdHMub3JpZ2luO1xuICAgIH1cbiAgfVxuICBpZiAocGFyc2VkVXJsLnVzZXJuYW1lIHx8IHBhcnNlZFVybC5wYXNzd29yZCkge1xuICAgIG9wdHMuYXV0aCA9IGAke3BhcnNlZFVybC51c2VybmFtZX06JHtwYXJzZWRVcmwucGFzc3dvcmR9YDtcbiAgfVxuXG4gIGlmIChpc0lwY1VybCkge1xuICAgIGNvbnN0IHBhcnRzID0gb3B0cy5wYXRoLnNwbGl0KCc6Jyk7XG5cbiAgICBvcHRzLnNvY2tldFBhdGggPSBwYXJ0c1swXTtcbiAgICBvcHRzLnBhdGggPSBwYXJ0c1sxXTtcbiAgfVxuXG4gIGxldCByZXE7XG5cbiAgaWYgKG9wdHMuZm9sbG93UmVkaXJlY3RzKSB7XG4gICAgaWYgKHdlYnNvY2tldC5fcmVkaXJlY3RzID09PSAwKSB7XG4gICAgICB3ZWJzb2NrZXQuX29yaWdpbmFsSXBjID0gaXNJcGNVcmw7XG4gICAgICB3ZWJzb2NrZXQuX29yaWdpbmFsU2VjdXJlID0gaXNTZWN1cmU7XG4gICAgICB3ZWJzb2NrZXQuX29yaWdpbmFsSG9zdE9yU29ja2V0UGF0aCA9IGlzSXBjVXJsXG4gICAgICAgID8gb3B0cy5zb2NrZXRQYXRoXG4gICAgICAgIDogcGFyc2VkVXJsLmhvc3Q7XG5cbiAgICAgIGNvbnN0IGhlYWRlcnMgPSBvcHRpb25zICYmIG9wdGlvbnMuaGVhZGVycztcblxuICAgICAgLy9cbiAgICAgIC8vIFNoYWxsb3cgY29weSB0aGUgdXNlciBwcm92aWRlZCBvcHRpb25zIHNvIHRoYXQgaGVhZGVycyBjYW4gYmUgY2hhbmdlZFxuICAgICAgLy8gd2l0aG91dCBtdXRhdGluZyB0aGUgb3JpZ2luYWwgb2JqZWN0LlxuICAgICAgLy9cbiAgICAgIG9wdGlvbnMgPSB7IC4uLm9wdGlvbnMsIGhlYWRlcnM6IHt9IH07XG5cbiAgICAgIGlmIChoZWFkZXJzKSB7XG4gICAgICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGhlYWRlcnMpKSB7XG4gICAgICAgICAgb3B0aW9ucy5oZWFkZXJzW2tleS50b0xvd2VyQ2FzZSgpXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh3ZWJzb2NrZXQubGlzdGVuZXJDb3VudCgncmVkaXJlY3QnKSA9PT0gMCkge1xuICAgICAgY29uc3QgaXNTYW1lSG9zdCA9IGlzSXBjVXJsXG4gICAgICAgID8gd2Vic29ja2V0Ll9vcmlnaW5hbElwY1xuICAgICAgICAgID8gb3B0cy5zb2NrZXRQYXRoID09PSB3ZWJzb2NrZXQuX29yaWdpbmFsSG9zdE9yU29ja2V0UGF0aFxuICAgICAgICAgIDogZmFsc2VcbiAgICAgICAgOiB3ZWJzb2NrZXQuX29yaWdpbmFsSXBjXG4gICAgICAgID8gZmFsc2VcbiAgICAgICAgOiBwYXJzZWRVcmwuaG9zdCA9PT0gd2Vic29ja2V0Ll9vcmlnaW5hbEhvc3RPclNvY2tldFBhdGg7XG5cbiAgICAgIGlmICghaXNTYW1lSG9zdCB8fCAod2Vic29ja2V0Ll9vcmlnaW5hbFNlY3VyZSAmJiAhaXNTZWN1cmUpKSB7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIE1hdGNoIGN1cmwgNy43Ny4wIGJlaGF2aW9yIGFuZCBkcm9wIHRoZSBmb2xsb3dpbmcgaGVhZGVycy4gVGhlc2VcbiAgICAgICAgLy8gaGVhZGVycyBhcmUgYWxzbyBkcm9wcGVkIHdoZW4gZm9sbG93aW5nIGEgcmVkaXJlY3QgdG8gYSBzdWJkb21haW4uXG4gICAgICAgIC8vXG4gICAgICAgIGRlbGV0ZSBvcHRzLmhlYWRlcnMuYXV0aG9yaXphdGlvbjtcbiAgICAgICAgZGVsZXRlIG9wdHMuaGVhZGVycy5jb29raWU7XG5cbiAgICAgICAgaWYgKCFpc1NhbWVIb3N0KSBkZWxldGUgb3B0cy5oZWFkZXJzLmhvc3Q7XG5cbiAgICAgICAgb3B0cy5hdXRoID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vXG4gICAgLy8gTWF0Y2ggY3VybCA3Ljc3LjAgYmVoYXZpb3IgYW5kIG1ha2UgdGhlIGZpcnN0IGBBdXRob3JpemF0aW9uYCBoZWFkZXIgd2luLlxuICAgIC8vIElmIHRoZSBgQXV0aG9yaXphdGlvbmAgaGVhZGVyIGlzIHNldCwgdGhlbiB0aGVyZSBpcyBub3RoaW5nIHRvIGRvIGFzIGl0XG4gICAgLy8gd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gICAgLy9cbiAgICBpZiAob3B0cy5hdXRoICYmICFvcHRpb25zLmhlYWRlcnMuYXV0aG9yaXphdGlvbikge1xuICAgICAgb3B0aW9ucy5oZWFkZXJzLmF1dGhvcml6YXRpb24gPVxuICAgICAgICAnQmFzaWMgJyArIEJ1ZmZlci5mcm9tKG9wdHMuYXV0aCkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICAgIH1cblxuICAgIHJlcSA9IHdlYnNvY2tldC5fcmVxID0gcmVxdWVzdChvcHRzKTtcblxuICAgIGlmICh3ZWJzb2NrZXQuX3JlZGlyZWN0cykge1xuICAgICAgLy9cbiAgICAgIC8vIFVubGlrZSB3aGF0IGlzIGRvbmUgZm9yIHRoZSBgJ3VwZ3JhZGUnYCBldmVudCwgbm8gZWFybHkgZXhpdCBpc1xuICAgICAgLy8gdHJpZ2dlcmVkIGhlcmUgaWYgdGhlIHVzZXIgY2FsbHMgYHdlYnNvY2tldC5jbG9zZSgpYCBvclxuICAgICAgLy8gYHdlYnNvY2tldC50ZXJtaW5hdGUoKWAgZnJvbSBhIGxpc3RlbmVyIG9mIHRoZSBgJ3JlZGlyZWN0J2AgZXZlbnQuIFRoaXNcbiAgICAgIC8vIGlzIGJlY2F1c2UgdGhlIHVzZXIgY2FuIGFsc28gY2FsbCBgcmVxdWVzdC5kZXN0cm95KClgIHdpdGggYW4gZXJyb3JcbiAgICAgIC8vIGJlZm9yZSBjYWxsaW5nIGB3ZWJzb2NrZXQuY2xvc2UoKWAgb3IgYHdlYnNvY2tldC50ZXJtaW5hdGUoKWAgYW5kIHRoaXNcbiAgICAgIC8vIHdvdWxkIHJlc3VsdCBpbiBhbiBlcnJvciBiZWluZyBlbWl0dGVkIG9uIHRoZSBgcmVxdWVzdGAgb2JqZWN0IHdpdGggbm9cbiAgICAgIC8vIGAnZXJyb3InYCBldmVudCBsaXN0ZW5lcnMgYXR0YWNoZWQuXG4gICAgICAvL1xuICAgICAgd2Vic29ja2V0LmVtaXQoJ3JlZGlyZWN0Jywgd2Vic29ja2V0LnVybCwgcmVxKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVxID0gd2Vic29ja2V0Ll9yZXEgPSByZXF1ZXN0KG9wdHMpO1xuICB9XG5cbiAgaWYgKG9wdHMudGltZW91dCkge1xuICAgIHJlcS5vbigndGltZW91dCcsICgpID0+IHtcbiAgICAgIGFib3J0SGFuZHNoYWtlKHdlYnNvY2tldCwgcmVxLCAnT3BlbmluZyBoYW5kc2hha2UgaGFzIHRpbWVkIG91dCcpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVxLm9uKCdlcnJvcicsIChlcnIpID0+IHtcbiAgICBpZiAocmVxID09PSBudWxsIHx8IHJlcVtrQWJvcnRlZF0pIHJldHVybjtcblxuICAgIHJlcSA9IHdlYnNvY2tldC5fcmVxID0gbnVsbDtcbiAgICBlbWl0RXJyb3JBbmRDbG9zZSh3ZWJzb2NrZXQsIGVycik7XG4gIH0pO1xuXG4gIHJlcS5vbigncmVzcG9uc2UnLCAocmVzKSA9PiB7XG4gICAgY29uc3QgbG9jYXRpb24gPSByZXMuaGVhZGVycy5sb2NhdGlvbjtcbiAgICBjb25zdCBzdGF0dXNDb2RlID0gcmVzLnN0YXR1c0NvZGU7XG5cbiAgICBpZiAoXG4gICAgICBsb2NhdGlvbiAmJlxuICAgICAgb3B0cy5mb2xsb3dSZWRpcmVjdHMgJiZcbiAgICAgIHN0YXR1c0NvZGUgPj0gMzAwICYmXG4gICAgICBzdGF0dXNDb2RlIDwgNDAwXG4gICAgKSB7XG4gICAgICBpZiAoKyt3ZWJzb2NrZXQuX3JlZGlyZWN0cyA+IG9wdHMubWF4UmVkaXJlY3RzKSB7XG4gICAgICAgIGFib3J0SGFuZHNoYWtlKHdlYnNvY2tldCwgcmVxLCAnTWF4aW11bSByZWRpcmVjdHMgZXhjZWVkZWQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZXEuYWJvcnQoKTtcblxuICAgICAgbGV0IGFkZHI7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGFkZHIgPSBuZXcgVVJMKGxvY2F0aW9uLCBhZGRyZXNzKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc3QgZXJyID0gbmV3IFN5bnRheEVycm9yKGBJbnZhbGlkIFVSTDogJHtsb2NhdGlvbn1gKTtcbiAgICAgICAgZW1pdEVycm9yQW5kQ2xvc2Uod2Vic29ja2V0LCBlcnIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGluaXRBc0NsaWVudCh3ZWJzb2NrZXQsIGFkZHIsIHByb3RvY29scywgb3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmICghd2Vic29ja2V0LmVtaXQoJ3VuZXhwZWN0ZWQtcmVzcG9uc2UnLCByZXEsIHJlcykpIHtcbiAgICAgIGFib3J0SGFuZHNoYWtlKFxuICAgICAgICB3ZWJzb2NrZXQsXG4gICAgICAgIHJlcSxcbiAgICAgICAgYFVuZXhwZWN0ZWQgc2VydmVyIHJlc3BvbnNlOiAke3Jlcy5zdGF0dXNDb2RlfWBcbiAgICAgICk7XG4gICAgfVxuICB9KTtcblxuICByZXEub24oJ3VwZ3JhZGUnLCAocmVzLCBzb2NrZXQsIGhlYWQpID0+IHtcbiAgICB3ZWJzb2NrZXQuZW1pdCgndXBncmFkZScsIHJlcyk7XG5cbiAgICAvL1xuICAgIC8vIFRoZSB1c2VyIG1heSBoYXZlIGNsb3NlZCB0aGUgY29ubmVjdGlvbiBmcm9tIGEgbGlzdGVuZXIgb2YgdGhlXG4gICAgLy8gYCd1cGdyYWRlJ2AgZXZlbnQuXG4gICAgLy9cbiAgICBpZiAod2Vic29ja2V0LnJlYWR5U3RhdGUgIT09IFdlYlNvY2tldC5DT05ORUNUSU5HKSByZXR1cm47XG5cbiAgICByZXEgPSB3ZWJzb2NrZXQuX3JlcSA9IG51bGw7XG5cbiAgICBpZiAocmVzLmhlYWRlcnMudXBncmFkZS50b0xvd2VyQ2FzZSgpICE9PSAnd2Vic29ja2V0Jykge1xuICAgICAgYWJvcnRIYW5kc2hha2Uod2Vic29ja2V0LCBzb2NrZXQsICdJbnZhbGlkIFVwZ3JhZGUgaGVhZGVyJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZGlnZXN0ID0gY3JlYXRlSGFzaCgnc2hhMScpXG4gICAgICAudXBkYXRlKGtleSArIEdVSUQpXG4gICAgICAuZGlnZXN0KCdiYXNlNjQnKTtcblxuICAgIGlmIChyZXMuaGVhZGVyc1snc2VjLXdlYnNvY2tldC1hY2NlcHQnXSAhPT0gZGlnZXN0KSB7XG4gICAgICBhYm9ydEhhbmRzaGFrZSh3ZWJzb2NrZXQsIHNvY2tldCwgJ0ludmFsaWQgU2VjLVdlYlNvY2tldC1BY2NlcHQgaGVhZGVyJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2VydmVyUHJvdCA9IHJlcy5oZWFkZXJzWydzZWMtd2Vic29ja2V0LXByb3RvY29sJ107XG4gICAgbGV0IHByb3RFcnJvcjtcblxuICAgIGlmIChzZXJ2ZXJQcm90ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICghcHJvdG9jb2xTZXQuc2l6ZSkge1xuICAgICAgICBwcm90RXJyb3IgPSAnU2VydmVyIHNlbnQgYSBzdWJwcm90b2NvbCBidXQgbm9uZSB3YXMgcmVxdWVzdGVkJztcbiAgICAgIH0gZWxzZSBpZiAoIXByb3RvY29sU2V0LmhhcyhzZXJ2ZXJQcm90KSkge1xuICAgICAgICBwcm90RXJyb3IgPSAnU2VydmVyIHNlbnQgYW4gaW52YWxpZCBzdWJwcm90b2NvbCc7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwcm90b2NvbFNldC5zaXplKSB7XG4gICAgICBwcm90RXJyb3IgPSAnU2VydmVyIHNlbnQgbm8gc3VicHJvdG9jb2wnO1xuICAgIH1cblxuICAgIGlmIChwcm90RXJyb3IpIHtcbiAgICAgIGFib3J0SGFuZHNoYWtlKHdlYnNvY2tldCwgc29ja2V0LCBwcm90RXJyb3IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChzZXJ2ZXJQcm90KSB3ZWJzb2NrZXQuX3Byb3RvY29sID0gc2VydmVyUHJvdDtcblxuICAgIGNvbnN0IHNlY1dlYlNvY2tldEV4dGVuc2lvbnMgPSByZXMuaGVhZGVyc1snc2VjLXdlYnNvY2tldC1leHRlbnNpb25zJ107XG5cbiAgICBpZiAoc2VjV2ViU29ja2V0RXh0ZW5zaW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoIXBlck1lc3NhZ2VEZWZsYXRlKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICAgICdTZXJ2ZXIgc2VudCBhIFNlYy1XZWJTb2NrZXQtRXh0ZW5zaW9ucyBoZWFkZXIgYnV0IG5vIGV4dGVuc2lvbiAnICtcbiAgICAgICAgICAnd2FzIHJlcXVlc3RlZCc7XG4gICAgICAgIGFib3J0SGFuZHNoYWtlKHdlYnNvY2tldCwgc29ja2V0LCBtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgZXh0ZW5zaW9ucztcblxuICAgICAgdHJ5IHtcbiAgICAgICAgZXh0ZW5zaW9ucyA9IHBhcnNlKHNlY1dlYlNvY2tldEV4dGVuc2lvbnMpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAnSW52YWxpZCBTZWMtV2ViU29ja2V0LUV4dGVuc2lvbnMgaGVhZGVyJztcbiAgICAgICAgYWJvcnRIYW5kc2hha2Uod2Vic29ja2V0LCBzb2NrZXQsIG1lc3NhZ2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV4dGVuc2lvbk5hbWVzID0gT2JqZWN0LmtleXMoZXh0ZW5zaW9ucyk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgZXh0ZW5zaW9uTmFtZXMubGVuZ3RoICE9PSAxIHx8XG4gICAgICAgIGV4dGVuc2lvbk5hbWVzWzBdICE9PSBQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9ICdTZXJ2ZXIgaW5kaWNhdGVkIGFuIGV4dGVuc2lvbiB0aGF0IHdhcyBub3QgcmVxdWVzdGVkJztcbiAgICAgICAgYWJvcnRIYW5kc2hha2Uod2Vic29ja2V0LCBzb2NrZXQsIG1lc3NhZ2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHBlck1lc3NhZ2VEZWZsYXRlLmFjY2VwdChleHRlbnNpb25zW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gJ0ludmFsaWQgU2VjLVdlYlNvY2tldC1FeHRlbnNpb25zIGhlYWRlcic7XG4gICAgICAgIGFib3J0SGFuZHNoYWtlKHdlYnNvY2tldCwgc29ja2V0LCBtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB3ZWJzb2NrZXQuX2V4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0gPVxuICAgICAgICBwZXJNZXNzYWdlRGVmbGF0ZTtcbiAgICB9XG5cbiAgICB3ZWJzb2NrZXQuc2V0U29ja2V0KHNvY2tldCwgaGVhZCwge1xuICAgICAgZ2VuZXJhdGVNYXNrOiBvcHRzLmdlbmVyYXRlTWFzayxcbiAgICAgIG1heFBheWxvYWQ6IG9wdHMubWF4UGF5bG9hZCxcbiAgICAgIHNraXBVVEY4VmFsaWRhdGlvbjogb3B0cy5za2lwVVRGOFZhbGlkYXRpb25cbiAgICB9KTtcbiAgfSk7XG5cbiAgcmVxLmVuZCgpO1xufVxuXG4vKipcbiAqIEVtaXQgdGhlIGAnZXJyb3InYCBhbmQgYCdjbG9zZSdgIGV2ZW50cy5cbiAqXG4gKiBAcGFyYW0ge1dlYlNvY2tldH0gd2Vic29ja2V0IFRoZSBXZWJTb2NrZXQgaW5zdGFuY2VcbiAqIEBwYXJhbSB7RXJyb3J9IFRoZSBlcnJvciB0byBlbWl0XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlbWl0RXJyb3JBbmRDbG9zZSh3ZWJzb2NrZXQsIGVycikge1xuICB3ZWJzb2NrZXQuX3JlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0lORztcbiAgd2Vic29ja2V0LmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgd2Vic29ja2V0LmVtaXRDbG9zZSgpO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGBuZXQuU29ja2V0YCBhbmQgaW5pdGlhdGUgYSBjb25uZWN0aW9uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIENvbm5lY3Rpb24gb3B0aW9uc1xuICogQHJldHVybiB7bmV0LlNvY2tldH0gVGhlIG5ld2x5IGNyZWF0ZWQgc29ja2V0IHVzZWQgdG8gc3RhcnQgdGhlIGNvbm5lY3Rpb25cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG5ldENvbm5lY3Qob3B0aW9ucykge1xuICBvcHRpb25zLnBhdGggPSBvcHRpb25zLnNvY2tldFBhdGg7XG4gIHJldHVybiBuZXQuY29ubmVjdChvcHRpb25zKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBgdGxzLlRMU1NvY2tldGAgYW5kIGluaXRpYXRlIGEgY29ubmVjdGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBDb25uZWN0aW9uIG9wdGlvbnNcbiAqIEByZXR1cm4ge3Rscy5UTFNTb2NrZXR9IFRoZSBuZXdseSBjcmVhdGVkIHNvY2tldCB1c2VkIHRvIHN0YXJ0IHRoZSBjb25uZWN0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiB0bHNDb25uZWN0KG9wdGlvbnMpIHtcbiAgb3B0aW9ucy5wYXRoID0gdW5kZWZpbmVkO1xuXG4gIGlmICghb3B0aW9ucy5zZXJ2ZXJuYW1lICYmIG9wdGlvbnMuc2VydmVybmFtZSAhPT0gJycpIHtcbiAgICBvcHRpb25zLnNlcnZlcm5hbWUgPSBuZXQuaXNJUChvcHRpb25zLmhvc3QpID8gJycgOiBvcHRpb25zLmhvc3Q7XG4gIH1cblxuICByZXR1cm4gdGxzLmNvbm5lY3Qob3B0aW9ucyk7XG59XG5cbi8qKlxuICogQWJvcnQgdGhlIGhhbmRzaGFrZSBhbmQgZW1pdCBhbiBlcnJvci5cbiAqXG4gKiBAcGFyYW0ge1dlYlNvY2tldH0gd2Vic29ja2V0IFRoZSBXZWJTb2NrZXQgaW5zdGFuY2VcbiAqIEBwYXJhbSB7KGh0dHAuQ2xpZW50UmVxdWVzdHxuZXQuU29ja2V0fHRscy5Tb2NrZXQpfSBzdHJlYW0gVGhlIHJlcXVlc3QgdG9cbiAqICAgICBhYm9ydCBvciB0aGUgc29ja2V0IHRvIGRlc3Ryb3lcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhYm9ydEhhbmRzaGFrZSh3ZWJzb2NrZXQsIHN0cmVhbSwgbWVzc2FnZSkge1xuICB3ZWJzb2NrZXQuX3JlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0lORztcblxuICBjb25zdCBlcnIgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGVyciwgYWJvcnRIYW5kc2hha2UpO1xuXG4gIGlmIChzdHJlYW0uc2V0SGVhZGVyKSB7XG4gICAgc3RyZWFtW2tBYm9ydGVkXSA9IHRydWU7XG4gICAgc3RyZWFtLmFib3J0KCk7XG5cbiAgICBpZiAoc3RyZWFtLnNvY2tldCAmJiAhc3RyZWFtLnNvY2tldC5kZXN0cm95ZWQpIHtcbiAgICAgIC8vXG4gICAgICAvLyBPbiBOb2RlLmpzID49IDE0LjMuMCBgcmVxdWVzdC5hYm9ydCgpYCBkb2VzIG5vdCBkZXN0cm95IHRoZSBzb2NrZXQgaWZcbiAgICAgIC8vIGNhbGxlZCBhZnRlciB0aGUgcmVxdWVzdCBjb21wbGV0ZWQuIFNlZVxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYnNvY2tldHMvd3MvaXNzdWVzLzE4NjkuXG4gICAgICAvL1xuICAgICAgc3RyZWFtLnNvY2tldC5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgcHJvY2Vzcy5uZXh0VGljayhlbWl0RXJyb3JBbmRDbG9zZSwgd2Vic29ja2V0LCBlcnIpO1xuICB9IGVsc2Uge1xuICAgIHN0cmVhbS5kZXN0cm95KGVycik7XG4gICAgc3RyZWFtLm9uY2UoJ2Vycm9yJywgd2Vic29ja2V0LmVtaXQuYmluZCh3ZWJzb2NrZXQsICdlcnJvcicpKTtcbiAgICBzdHJlYW0ub25jZSgnY2xvc2UnLCB3ZWJzb2NrZXQuZW1pdENsb3NlLmJpbmQod2Vic29ja2V0KSk7XG4gIH1cbn1cblxuLyoqXG4gKiBIYW5kbGUgY2FzZXMgd2hlcmUgdGhlIGBwaW5nKClgLCBgcG9uZygpYCwgb3IgYHNlbmQoKWAgbWV0aG9kcyBhcmUgY2FsbGVkXG4gKiB3aGVuIHRoZSBgcmVhZHlTdGF0ZWAgYXR0cmlidXRlIGlzIGBDTE9TSU5HYCBvciBgQ0xPU0VEYC5cbiAqXG4gKiBAcGFyYW0ge1dlYlNvY2tldH0gd2Vic29ja2V0IFRoZSBXZWJTb2NrZXQgaW5zdGFuY2VcbiAqIEBwYXJhbSB7Kn0gW2RhdGFdIFRoZSBkYXRhIHRvIHNlbmRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl0gQ2FsbGJhY2tcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNlbmRBZnRlckNsb3NlKHdlYnNvY2tldCwgZGF0YSwgY2IpIHtcbiAgaWYgKGRhdGEpIHtcbiAgICBjb25zdCBsZW5ndGggPSB0b0J1ZmZlcihkYXRhKS5sZW5ndGg7XG5cbiAgICAvL1xuICAgIC8vIFRoZSBgX2J1ZmZlcmVkQW1vdW50YCBwcm9wZXJ0eSBpcyB1c2VkIG9ubHkgd2hlbiB0aGUgcGVlciBpcyBhIGNsaWVudCBhbmRcbiAgICAvLyB0aGUgb3BlbmluZyBoYW5kc2hha2UgZmFpbHMuIFVuZGVyIHRoZXNlIGNpcmN1bXN0YW5jZXMsIGluIGZhY3QsIHRoZVxuICAgIC8vIGBzZXRTb2NrZXQoKWAgbWV0aG9kIGlzIG5vdCBjYWxsZWQsIHNvIHRoZSBgX3NvY2tldGAgYW5kIGBfc2VuZGVyYFxuICAgIC8vIHByb3BlcnRpZXMgYXJlIHNldCB0byBgbnVsbGAuXG4gICAgLy9cbiAgICBpZiAod2Vic29ja2V0Ll9zb2NrZXQpIHdlYnNvY2tldC5fc2VuZGVyLl9idWZmZXJlZEJ5dGVzICs9IGxlbmd0aDtcbiAgICBlbHNlIHdlYnNvY2tldC5fYnVmZmVyZWRBbW91bnQgKz0gbGVuZ3RoO1xuICB9XG5cbiAgaWYgKGNiKSB7XG4gICAgY29uc3QgZXJyID0gbmV3IEVycm9yKFxuICAgICAgYFdlYlNvY2tldCBpcyBub3Qgb3BlbjogcmVhZHlTdGF0ZSAke3dlYnNvY2tldC5yZWFkeVN0YXRlfSBgICtcbiAgICAgICAgYCgke3JlYWR5U3RhdGVzW3dlYnNvY2tldC5yZWFkeVN0YXRlXX0pYFxuICAgICk7XG4gICAgcHJvY2Vzcy5uZXh0VGljayhjYiwgZXJyKTtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYFJlY2VpdmVyYCBgJ2NvbmNsdWRlJ2AgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGNvZGUgVGhlIHN0YXR1cyBjb2RlXG4gKiBAcGFyYW0ge0J1ZmZlcn0gcmVhc29uIFRoZSByZWFzb24gZm9yIGNsb3NpbmdcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlY2VpdmVyT25Db25jbHVkZShjb2RlLCByZWFzb24pIHtcbiAgY29uc3Qgd2Vic29ja2V0ID0gdGhpc1trV2ViU29ja2V0XTtcblxuICB3ZWJzb2NrZXQuX2Nsb3NlRnJhbWVSZWNlaXZlZCA9IHRydWU7XG4gIHdlYnNvY2tldC5fY2xvc2VNZXNzYWdlID0gcmVhc29uO1xuICB3ZWJzb2NrZXQuX2Nsb3NlQ29kZSA9IGNvZGU7XG5cbiAgaWYgKHdlYnNvY2tldC5fc29ja2V0W2tXZWJTb2NrZXRdID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuICB3ZWJzb2NrZXQuX3NvY2tldC5yZW1vdmVMaXN0ZW5lcignZGF0YScsIHNvY2tldE9uRGF0YSk7XG4gIHByb2Nlc3MubmV4dFRpY2socmVzdW1lLCB3ZWJzb2NrZXQuX3NvY2tldCk7XG5cbiAgaWYgKGNvZGUgPT09IDEwMDUpIHdlYnNvY2tldC5jbG9zZSgpO1xuICBlbHNlIHdlYnNvY2tldC5jbG9zZShjb2RlLCByZWFzb24pO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYFJlY2VpdmVyYCBgJ2RyYWluJ2AgZXZlbnQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVjZWl2ZXJPbkRyYWluKCkge1xuICBjb25zdCB3ZWJzb2NrZXQgPSB0aGlzW2tXZWJTb2NrZXRdO1xuXG4gIGlmICghd2Vic29ja2V0LmlzUGF1c2VkKSB3ZWJzb2NrZXQuX3NvY2tldC5yZXN1bWUoKTtcbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGBSZWNlaXZlcmAgYCdlcnJvcidgIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFJhbmdlRXJyb3J8RXJyb3IpfSBlcnIgVGhlIGVtaXR0ZWQgZXJyb3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlY2VpdmVyT25FcnJvcihlcnIpIHtcbiAgY29uc3Qgd2Vic29ja2V0ID0gdGhpc1trV2ViU29ja2V0XTtcblxuICBpZiAod2Vic29ja2V0Ll9zb2NrZXRba1dlYlNvY2tldF0gIT09IHVuZGVmaW5lZCkge1xuICAgIHdlYnNvY2tldC5fc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdkYXRhJywgc29ja2V0T25EYXRhKTtcblxuICAgIC8vXG4gICAgLy8gT24gTm9kZS5qcyA8IDE0LjAuMCB0aGUgYCdlcnJvcidgIGV2ZW50IGlzIGVtaXR0ZWQgc3luY2hyb25vdXNseS4gU2VlXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3dlYnNvY2tldHMvd3MvaXNzdWVzLzE5NDAuXG4gICAgLy9cbiAgICBwcm9jZXNzLm5leHRUaWNrKHJlc3VtZSwgd2Vic29ja2V0Ll9zb2NrZXQpO1xuXG4gICAgd2Vic29ja2V0LmNsb3NlKGVycltrU3RhdHVzQ29kZV0pO1xuICB9XG5cbiAgd2Vic29ja2V0LmVtaXQoJ2Vycm9yJywgZXJyKTtcbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGBSZWNlaXZlcmAgYCdmaW5pc2gnYCBldmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZWNlaXZlck9uRmluaXNoKCkge1xuICB0aGlzW2tXZWJTb2NrZXRdLmVtaXRDbG9zZSgpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYFJlY2VpdmVyYCBgJ21lc3NhZ2UnYCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcnxBcnJheUJ1ZmZlcnxCdWZmZXJbXSl9IGRhdGEgVGhlIG1lc3NhZ2VcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNCaW5hcnkgU3BlY2lmaWVzIHdoZXRoZXIgdGhlIG1lc3NhZ2UgaXMgYmluYXJ5IG9yIG5vdFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVjZWl2ZXJPbk1lc3NhZ2UoZGF0YSwgaXNCaW5hcnkpIHtcbiAgdGhpc1trV2ViU29ja2V0XS5lbWl0KCdtZXNzYWdlJywgZGF0YSwgaXNCaW5hcnkpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYFJlY2VpdmVyYCBgJ3BpbmcnYCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gZGF0YSBUaGUgZGF0YSBpbmNsdWRlZCBpbiB0aGUgcGluZyBmcmFtZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVjZWl2ZXJPblBpbmcoZGF0YSkge1xuICBjb25zdCB3ZWJzb2NrZXQgPSB0aGlzW2tXZWJTb2NrZXRdO1xuXG4gIHdlYnNvY2tldC5wb25nKGRhdGEsICF3ZWJzb2NrZXQuX2lzU2VydmVyLCBOT09QKTtcbiAgd2Vic29ja2V0LmVtaXQoJ3BpbmcnLCBkYXRhKTtcbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGBSZWNlaXZlcmAgYCdwb25nJ2AgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgVGhlIGRhdGEgaW5jbHVkZWQgaW4gdGhlIHBvbmcgZnJhbWVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlY2VpdmVyT25Qb25nKGRhdGEpIHtcbiAgdGhpc1trV2ViU29ja2V0XS5lbWl0KCdwb25nJywgZGF0YSk7XG59XG5cbi8qKlxuICogUmVzdW1lIGEgcmVhZGFibGUgc3RyZWFtXG4gKlxuICogQHBhcmFtIHtSZWFkYWJsZX0gc3RyZWFtIFRoZSByZWFkYWJsZSBzdHJlYW1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlc3VtZShzdHJlYW0pIHtcbiAgc3RyZWFtLnJlc3VtZSgpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYG5ldC5Tb2NrZXRgIGAnY2xvc2UnYCBldmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzb2NrZXRPbkNsb3NlKCkge1xuICBjb25zdCB3ZWJzb2NrZXQgPSB0aGlzW2tXZWJTb2NrZXRdO1xuXG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgc29ja2V0T25DbG9zZSk7XG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2RhdGEnLCBzb2NrZXRPbkRhdGEpO1xuICB0aGlzLnJlbW92ZUxpc3RlbmVyKCdlbmQnLCBzb2NrZXRPbkVuZCk7XG5cbiAgd2Vic29ja2V0Ll9yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NJTkc7XG5cbiAgbGV0IGNodW5rO1xuXG4gIC8vXG4gIC8vIFRoZSBjbG9zZSBmcmFtZSBtaWdodCBub3QgaGF2ZSBiZWVuIHJlY2VpdmVkIG9yIHRoZSBgJ2VuZCdgIGV2ZW50IGVtaXR0ZWQsXG4gIC8vIGZvciBleGFtcGxlLCBpZiB0aGUgc29ja2V0IHdhcyBkZXN0cm95ZWQgZHVlIHRvIGFuIGVycm9yLiBFbnN1cmUgdGhhdCB0aGVcbiAgLy8gYHJlY2VpdmVyYCBzdHJlYW0gaXMgY2xvc2VkIGFmdGVyIHdyaXRpbmcgYW55IHJlbWFpbmluZyBidWZmZXJlZCBkYXRhIHRvXG4gIC8vIGl0LiBJZiB0aGUgcmVhZGFibGUgc2lkZSBvZiB0aGUgc29ja2V0IGlzIGluIGZsb3dpbmcgbW9kZSB0aGVuIHRoZXJlIGlzIG5vXG4gIC8vIGJ1ZmZlcmVkIGRhdGEgYXMgZXZlcnl0aGluZyBoYXMgYmVlbiBhbHJlYWR5IHdyaXR0ZW4gYW5kIGByZWFkYWJsZS5yZWFkKClgXG4gIC8vIHdpbGwgcmV0dXJuIGBudWxsYC4gSWYgaW5zdGVhZCwgdGhlIHNvY2tldCBpcyBwYXVzZWQsIGFueSBwb3NzaWJsZSBidWZmZXJlZFxuICAvLyBkYXRhIHdpbGwgYmUgcmVhZCBhcyBhIHNpbmdsZSBjaHVuay5cbiAgLy9cbiAgaWYgKFxuICAgICF0aGlzLl9yZWFkYWJsZVN0YXRlLmVuZEVtaXR0ZWQgJiZcbiAgICAhd2Vic29ja2V0Ll9jbG9zZUZyYW1lUmVjZWl2ZWQgJiZcbiAgICAhd2Vic29ja2V0Ll9yZWNlaXZlci5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWQgJiZcbiAgICAoY2h1bmsgPSB3ZWJzb2NrZXQuX3NvY2tldC5yZWFkKCkpICE9PSBudWxsXG4gICkge1xuICAgIHdlYnNvY2tldC5fcmVjZWl2ZXIud3JpdGUoY2h1bmspO1xuICB9XG5cbiAgd2Vic29ja2V0Ll9yZWNlaXZlci5lbmQoKTtcblxuICB0aGlzW2tXZWJTb2NrZXRdID0gdW5kZWZpbmVkO1xuXG4gIGNsZWFyVGltZW91dCh3ZWJzb2NrZXQuX2Nsb3NlVGltZXIpO1xuXG4gIGlmIChcbiAgICB3ZWJzb2NrZXQuX3JlY2VpdmVyLl93cml0YWJsZVN0YXRlLmZpbmlzaGVkIHx8XG4gICAgd2Vic29ja2V0Ll9yZWNlaXZlci5fd3JpdGFibGVTdGF0ZS5lcnJvckVtaXR0ZWRcbiAgKSB7XG4gICAgd2Vic29ja2V0LmVtaXRDbG9zZSgpO1xuICB9IGVsc2Uge1xuICAgIHdlYnNvY2tldC5fcmVjZWl2ZXIub24oJ2Vycm9yJywgcmVjZWl2ZXJPbkZpbmlzaCk7XG4gICAgd2Vic29ja2V0Ll9yZWNlaXZlci5vbignZmluaXNoJywgcmVjZWl2ZXJPbkZpbmlzaCk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGBuZXQuU29ja2V0YCBgJ2RhdGEnYCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gY2h1bmsgQSBjaHVuayBvZiBkYXRhXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzb2NrZXRPbkRhdGEoY2h1bmspIHtcbiAgaWYgKCF0aGlzW2tXZWJTb2NrZXRdLl9yZWNlaXZlci53cml0ZShjaHVuaykpIHtcbiAgICB0aGlzLnBhdXNlKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGBuZXQuU29ja2V0YCBgJ2VuZCdgIGV2ZW50LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNvY2tldE9uRW5kKCkge1xuICBjb25zdCB3ZWJzb2NrZXQgPSB0aGlzW2tXZWJTb2NrZXRdO1xuXG4gIHdlYnNvY2tldC5fcmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuICB3ZWJzb2NrZXQuX3JlY2VpdmVyLmVuZCgpO1xuICB0aGlzLmVuZCgpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYG5ldC5Tb2NrZXRgIGAnZXJyb3InYCBldmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzb2NrZXRPbkVycm9yKCkge1xuICBjb25zdCB3ZWJzb2NrZXQgPSB0aGlzW2tXZWJTb2NrZXRdO1xuXG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgc29ja2V0T25FcnJvcik7XG4gIHRoaXMub24oJ2Vycm9yJywgTk9PUCk7XG5cbiAgaWYgKHdlYnNvY2tldCkge1xuICAgIHdlYnNvY2tldC5fcmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJidWZmZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV2ZW50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5ldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHJlYW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidGxzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVybFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ6bGliXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlZlbG94ID0gdm9pZCAwO1xyXG5jb25zdCBjaGFubmVsX25vZGVfMSA9IHJlcXVpcmUoXCIuL2NoYW5uZWwubm9kZVwiKTtcclxuY29uc3QgbmVzdF9ub2RlXzEgPSByZXF1aXJlKFwiLi9uZXN0Lm5vZGVcIik7XHJcbmNvbnN0IGludGVyZmFjZXNfbm9kZV8xID0gcmVxdWlyZShcIi4vaW50ZXJmYWNlcy5ub2RlXCIpO1xyXG5jb25zdCBldmVudHNfMSA9IHJlcXVpcmUoXCJldmVudHNcIik7XHJcbmNsYXNzIFZlbG94IHtcclxuICAgIGNvbnN0cnVjdG9yKHNvY2tldEFkZHIpIHtcclxuICAgICAgICB0aGlzLl9iZWFjb24gPSBuZXcgZXZlbnRzXzEuRXZlbnRFbWl0dGVyKCk7XHJcbiAgICAgICAgdGhpcy5fb25DaGFubmVsT3BlbmVkID0gKFVVSUQpID0+IGNvbnNvbGUubG9nKFVVSUQgKyBcIiBPcGVuZWRcIik7XHJcbiAgICAgICAgdGhpcy5fb25DaGFubmVsQ2xvc2VkID0gKFVVSUQpID0+IGNvbnNvbGUubG9nKFVVSUQgKyBcIiBDbG9zZWRcIik7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlQ2hhbm5lbHMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgdGhpcy5fbWVzc2FnZUNhbGxiYWNrTWFwID0gbmV3IE1hcDtcclxuICAgICAgICB0aGlzLl9kZWZhdWx0TWVzc2FnZUNhbGxiYWNrID0gKGNtKSA9PiB7IGNvbnNvbGUubG9nKGNtKTsgfTtcclxuICAgICAgICBjb25zdCBSQ01IYW5kbGVyID0gKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fYmVhY29uLmVtaXQoXCJSQ01cIiwgeyBDTTogbWVzc2FnZSB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IFNOTUhhbmRsZXIgPSAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9iZWFjb24uZW1pdChcIlNOTVwiLCB7IFNOTTogbWVzc2FnZSB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IFJOTUhhbmRsZXIgPSAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9iZWFjb24uZW1pdChcIlJOTVwiLCB7IFJOTTogbWVzc2FnZSB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IENNVUhhbmRsZXIgPSAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9iZWFjb24uZW1pdChcIkNNVVwiLCB7IENNVTogbWVzc2FnZSB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX2JlYWNvbi5vbihcIlJOTVwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGV2ZW50LlJOTTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuVHlwZSA9PSBpbnRlcmZhY2VzX25vZGVfMS5SZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlLkluaXRpYWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1VVSUQgPSBtZXNzYWdlLlVVSUQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobWVzc2FnZS5UeXBlID09IGludGVyZmFjZXNfbm9kZV8xLlJlY2lldmFibGVOZXN0TWVzc2FnZVR5cGUuU3RhcnRIYW5kc2hha2UgfHwgbWVzc2FnZS5UeXBlID09IGludGVyZmFjZXNfbm9kZV8xLlJlY2lldmFibGVOZXN0TWVzc2FnZVR5cGUuT2ZmZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUNoYW5uZWxzLnNldChtZXNzYWdlLlVVSUQsIG5ldyBjaGFubmVsX25vZGVfMS5DaGFubmVsKFNOTUhhbmRsZXIsIFJDTUhhbmRsZXIsIENNVUhhbmRsZXIpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JlYWNvbi5vbihtZXNzYWdlLlVVSUQsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUNoYW5uZWxzLmdldChtZXNzYWdlLlVVSUQpLlJOTVByb2Nlc3NvcihldmVudC5STk0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iZWFjb24uZW1pdChtZXNzYWdlLlVVSUQsIHsgUk5NOiBtZXNzYWdlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1lc3NhZ2UuVVVJRCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iZWFjb24uZW1pdChtZXNzYWdlLlVVSUQsIHsgUk5NOiBtZXNzYWdlIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fYmVhY29uLm9uKFwiU05NXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXZlbnQuU05NO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5VVUlEID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25lc3QuU05NUHJvY2Vzc29yKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbWVzc2FnZSksIHsgVVVJRDogdGhpcy5fVVVJRCB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXN0LlNOTVByb2Nlc3NvcihtZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX2JlYWNvbi5vbihcIlJDTVwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGV2ZW50LkNNO1xyXG4gICAgICAgICAgICBjb25zdCBmID0gdGhpcy5fbWVzc2FnZUNhbGxiYWNrTWFwLmdldChtZXNzYWdlLlR5cGUpO1xyXG4gICAgICAgICAgICBpZiAoZiA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRNZXNzYWdlQ2FsbGJhY2sobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fYmVhY29uLm9uKFwiQ01VXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXZlbnQuQ01VO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5VcGRhdGUgPT0gXCJPcGVuZWRcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb25DaGFubmVsT3BlbmVkKG1lc3NhZ2UuUGVlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobWVzc2FnZS5VcGRhdGUgPT0gXCJDbG9zZWRcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb25DaGFubmVsQ2xvc2VkKG1lc3NhZ2UuUGVlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9uZXN0ID0gbmV3IG5lc3Rfbm9kZV8xLk5lc3Qoc29ja2V0QWRkciwgUk5NSGFuZGxlcik7XHJcbiAgICB9XHJcbiAgICBjb25uZWN0KG5ldHdvcmtJRCkge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7IFR5cGU6IGludGVyZmFjZXNfbm9kZV8xLlNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlLkluaXRpYWwsIE90aGVyOiBuZXR3b3JrSUQgfTtcclxuICAgICAgICBjb25zdCB4ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbmVzdC5pc0FjdGl2ZSgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iZWFjb24uZW1pdChcIlNOTVwiLCB7IFNOTTogbWVzc2FnZSB9KTtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMCk7XHJcbiAgICB9XHJcbiAgICByZWdpc3Rlck1lc3NhZ2UodHlwZSwgY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLl9tZXNzYWdlQ2FsbGJhY2tNYXBbdHlwZV0gPSBjYWxsYmFjaztcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyRGVmYXVsdChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuX2RlZmF1bHRNZXNzYWdlQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIH1cclxuICAgIG9uY2hhbm5lbG9wZW4oY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLl9vbkNoYW5uZWxPcGVuZWQgPSBjYWxsYmFjaztcclxuICAgIH1cclxuICAgIG9uY2hhbm5lbGNsb3NlKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5fb25DaGFubmVsQ2xvc2VkID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcbiAgICBzZW5kKGNtLCB1c2Vycykge1xyXG4gICAgICAgIGlmICh1c2VycyA9PSB1bmRlZmluZWQgfHwgdXNlcnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBba2V5LCBjaGFubmVsXSBvZiB0aGlzLl9hY3RpdmVDaGFubmVscy5lbnRyaWVzKCkpIHtcclxuICAgICAgICAgICAgICAgIGNoYW5uZWwuU0NNUHJvY2Vzc29yKGNtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCB1c2VyIG9mIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFubmVsID0gdGhpcy5fYWN0aXZlQ2hhbm5lbHMuZ2V0KHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgY2hhbm5lbC5TQ01Qcm9jZXNzb3IoY20pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVmVsb3ggPSBWZWxveDtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9