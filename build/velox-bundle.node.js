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
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/domexception/lib/DOMException-impl.js":
/*!************************************************************!*\
  !*** ./node_modules/domexception/lib/DOMException-impl.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

const legacyErrorCodes = __webpack_require__(/*! ./legacy-error-codes.json */ "./node_modules/domexception/lib/legacy-error-codes.json");
const idlUtils = __webpack_require__(/*! ./utils.js */ "./node_modules/domexception/lib/utils.js");

exports.implementation = class DOMExceptionImpl {
  constructor([message, name]) {
    this.name = name;
    this.message = message;
  }

  get code() {
    return legacyErrorCodes[this.name] || 0;
  }
};

// A proprietary V8 extension that causes the stack property to appear.
exports.init = impl => {
  if (Error.captureStackTrace) {
    const wrapper = idlUtils.wrapperForImpl(impl);
    Error.captureStackTrace(wrapper, wrapper.constructor);
  }
};


/***/ }),

/***/ "./node_modules/domexception/lib/DOMException.js":
/*!*******************************************************!*\
  !*** ./node_modules/domexception/lib/DOMException.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const conversions = __webpack_require__(/*! webidl-conversions */ "./node_modules/webidl-conversions/lib/index.js");
const utils = __webpack_require__(/*! ./utils.js */ "./node_modules/domexception/lib/utils.js");

const impl = utils.implSymbol;

function DOMException() {
  const args = [];
  for (let i = 0; i < arguments.length && i < 2; ++i) {
    args[i] = arguments[i];
  }

  if (args[0] !== undefined) {
    args[0] = conversions["DOMString"](args[0], { context: "Failed to construct 'DOMException': parameter 1" });
  } else {
    args[0] = "";
  }

  if (args[1] !== undefined) {
    args[1] = conversions["DOMString"](args[1], { context: "Failed to construct 'DOMException': parameter 2" });
  } else {
    args[1] = "Error";
  }

  iface.setup(this, args);
}

Object.defineProperty(DOMException, "prototype", {
  value: DOMException.prototype,
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(DOMException.prototype, "name", {
  get() {
    return this[impl]["name"];
  },

  enumerable: true,
  configurable: true
});

Object.defineProperty(DOMException.prototype, "message", {
  get() {
    return this[impl]["message"];
  },

  enumerable: true,
  configurable: true
});

Object.defineProperty(DOMException.prototype, "code", {
  get() {
    return this[impl]["code"];
  },

  enumerable: true,
  configurable: true
});

Object.defineProperty(DOMException, "INDEX_SIZE_ERR", {
  value: 1,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "INDEX_SIZE_ERR", {
  value: 1,
  enumerable: true
});

Object.defineProperty(DOMException, "DOMSTRING_SIZE_ERR", {
  value: 2,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "DOMSTRING_SIZE_ERR", {
  value: 2,
  enumerable: true
});

Object.defineProperty(DOMException, "HIERARCHY_REQUEST_ERR", {
  value: 3,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "HIERARCHY_REQUEST_ERR", {
  value: 3,
  enumerable: true
});

Object.defineProperty(DOMException, "WRONG_DOCUMENT_ERR", {
  value: 4,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "WRONG_DOCUMENT_ERR", {
  value: 4,
  enumerable: true
});

Object.defineProperty(DOMException, "INVALID_CHARACTER_ERR", {
  value: 5,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "INVALID_CHARACTER_ERR", {
  value: 5,
  enumerable: true
});

Object.defineProperty(DOMException, "NO_DATA_ALLOWED_ERR", {
  value: 6,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "NO_DATA_ALLOWED_ERR", {
  value: 6,
  enumerable: true
});

Object.defineProperty(DOMException, "NO_MODIFICATION_ALLOWED_ERR", {
  value: 7,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "NO_MODIFICATION_ALLOWED_ERR", {
  value: 7,
  enumerable: true
});

Object.defineProperty(DOMException, "NOT_FOUND_ERR", {
  value: 8,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "NOT_FOUND_ERR", {
  value: 8,
  enumerable: true
});

Object.defineProperty(DOMException, "NOT_SUPPORTED_ERR", {
  value: 9,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "NOT_SUPPORTED_ERR", {
  value: 9,
  enumerable: true
});

Object.defineProperty(DOMException, "INUSE_ATTRIBUTE_ERR", {
  value: 10,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "INUSE_ATTRIBUTE_ERR", {
  value: 10,
  enumerable: true
});

Object.defineProperty(DOMException, "INVALID_STATE_ERR", {
  value: 11,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "INVALID_STATE_ERR", {
  value: 11,
  enumerable: true
});

Object.defineProperty(DOMException, "SYNTAX_ERR", {
  value: 12,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "SYNTAX_ERR", {
  value: 12,
  enumerable: true
});

Object.defineProperty(DOMException, "INVALID_MODIFICATION_ERR", {
  value: 13,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "INVALID_MODIFICATION_ERR", {
  value: 13,
  enumerable: true
});

Object.defineProperty(DOMException, "NAMESPACE_ERR", {
  value: 14,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "NAMESPACE_ERR", {
  value: 14,
  enumerable: true
});

Object.defineProperty(DOMException, "INVALID_ACCESS_ERR", {
  value: 15,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "INVALID_ACCESS_ERR", {
  value: 15,
  enumerable: true
});

Object.defineProperty(DOMException, "VALIDATION_ERR", {
  value: 16,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "VALIDATION_ERR", {
  value: 16,
  enumerable: true
});

Object.defineProperty(DOMException, "TYPE_MISMATCH_ERR", {
  value: 17,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "TYPE_MISMATCH_ERR", {
  value: 17,
  enumerable: true
});

Object.defineProperty(DOMException, "SECURITY_ERR", {
  value: 18,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "SECURITY_ERR", {
  value: 18,
  enumerable: true
});

Object.defineProperty(DOMException, "NETWORK_ERR", {
  value: 19,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "NETWORK_ERR", {
  value: 19,
  enumerable: true
});

Object.defineProperty(DOMException, "ABORT_ERR", {
  value: 20,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "ABORT_ERR", {
  value: 20,
  enumerable: true
});

Object.defineProperty(DOMException, "URL_MISMATCH_ERR", {
  value: 21,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "URL_MISMATCH_ERR", {
  value: 21,
  enumerable: true
});

Object.defineProperty(DOMException, "QUOTA_EXCEEDED_ERR", {
  value: 22,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "QUOTA_EXCEEDED_ERR", {
  value: 22,
  enumerable: true
});

Object.defineProperty(DOMException, "TIMEOUT_ERR", {
  value: 23,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "TIMEOUT_ERR", {
  value: 23,
  enumerable: true
});

Object.defineProperty(DOMException, "INVALID_NODE_TYPE_ERR", {
  value: 24,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "INVALID_NODE_TYPE_ERR", {
  value: 24,
  enumerable: true
});

Object.defineProperty(DOMException, "DATA_CLONE_ERR", {
  value: 25,
  enumerable: true
});
Object.defineProperty(DOMException.prototype, "DATA_CLONE_ERR", {
  value: 25,
  enumerable: true
});

Object.defineProperty(DOMException.prototype, Symbol.toStringTag, {
  value: "DOMException",
  writable: false,
  enumerable: false,
  configurable: true
});

const iface = {
  mixedInto: [],
  is(obj) {
    if (obj) {
      if (obj[impl] instanceof Impl.implementation) {
        return true;
      }
      for (let i = 0; i < module.exports.mixedInto.length; ++i) {
        if (obj instanceof module.exports.mixedInto[i]) {
          return true;
        }
      }
    }
    return false;
  },
  isImpl(obj) {
    if (obj) {
      if (obj instanceof Impl.implementation) {
        return true;
      }

      const wrapper = utils.wrapperForImpl(obj);
      for (let i = 0; i < module.exports.mixedInto.length; ++i) {
        if (wrapper instanceof module.exports.mixedInto[i]) {
          return true;
        }
      }
    }
    return false;
  },
  convert(obj, { context = "The provided value" } = {}) {
    if (module.exports.is(obj)) {
      return utils.implForWrapper(obj);
    }
    throw new TypeError(`${context} is not of type 'DOMException'.`);
  },

  create(constructorArgs, privateData) {
    let obj = Object.create(DOMException.prototype);
    this.setup(obj, constructorArgs, privateData);
    return obj;
  },
  createImpl(constructorArgs, privateData) {
    let obj = Object.create(DOMException.prototype);
    this.setup(obj, constructorArgs, privateData);
    return utils.implForWrapper(obj);
  },
  _internalSetup(obj) {},
  setup(obj, constructorArgs, privateData) {
    if (!privateData) privateData = {};

    privateData.wrapper = obj;

    this._internalSetup(obj);
    Object.defineProperty(obj, impl, {
      value: new Impl.implementation(constructorArgs, privateData),
      writable: false,
      enumerable: false,
      configurable: true
    });
    obj[impl][utils.wrapperSymbol] = obj;
    if (Impl.init) {
      Impl.init(obj[impl], privateData);
    }
  },
  interface: DOMException,
  expose: {
    Window: { DOMException },
    Worker: { DOMException }
  }
}; // iface
module.exports = iface;

const Impl = __webpack_require__(/*! .//DOMException-impl.js */ "./node_modules/domexception/lib/DOMException-impl.js");


/***/ }),

/***/ "./node_modules/domexception/lib/public-api.js":
/*!*****************************************************!*\
  !*** ./node_modules/domexception/lib/public-api.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(/*! ./DOMException */ "./node_modules/domexception/lib/DOMException.js")["interface"];

Object.setPrototypeOf(module.exports.prototype, Error.prototype);


/***/ }),

/***/ "./node_modules/domexception/lib/utils.js":
/*!************************************************!*\
  !*** ./node_modules/domexception/lib/utils.js ***!
  \************************************************/
/***/ ((module, exports) => {

"use strict";


// Returns "Type(value) is Object" in ES terminology.
function isObject(value) {
  return typeof value === "object" && value !== null || typeof value === "function";
}

function getReferenceToBytes(bufferSource) {
  // Node.js' Buffer does not allow subclassing for now, so we can get away with a prototype object check for perf.
  if (Object.getPrototypeOf(bufferSource) === Buffer.prototype) {
    return bufferSource;
  }
  if (bufferSource instanceof ArrayBuffer) {
    return Buffer.from(bufferSource);
  }
  return Buffer.from(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength);
}

function getCopyToBytes(bufferSource) {
  return Buffer.from(getReferenceToBytes(bufferSource));
}

function mixin(target, source) {
  const keys = Object.getOwnPropertyNames(source);
  for (let i = 0; i < keys.length; ++i) {
    if (keys[i] in target) {
      continue;
    }

    Object.defineProperty(target, keys[i], Object.getOwnPropertyDescriptor(source, keys[i]));
  }
}

const wrapperSymbol = Symbol("wrapper");
const implSymbol = Symbol("impl");
const sameObjectCaches = Symbol("SameObject caches");

function getSameObject(wrapper, prop, creator) {
  if (!wrapper[sameObjectCaches]) {
    wrapper[sameObjectCaches] = Object.create(null);
  }

  if (prop in wrapper[sameObjectCaches]) {
    return wrapper[sameObjectCaches][prop];
  }

  wrapper[sameObjectCaches][prop] = creator();
  return wrapper[sameObjectCaches][prop];
}

function wrapperForImpl(impl) {
  return impl ? impl[wrapperSymbol] : null;
}

function implForWrapper(wrapper) {
  return wrapper ? wrapper[implSymbol] : null;
}

function tryWrapperForImpl(impl) {
  const wrapper = wrapperForImpl(impl);
  return wrapper ? wrapper : impl;
}

function tryImplForWrapper(wrapper) {
  const impl = implForWrapper(wrapper);
  return impl ? impl : wrapper;
}

const iterInternalSymbol = Symbol("internal");
const IteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));

module.exports = exports = {
  isObject,
  getReferenceToBytes,
  getCopyToBytes,
  mixin,
  wrapperSymbol,
  implSymbol,
  getSameObject,
  wrapperForImpl,
  implForWrapper,
  tryWrapperForImpl,
  tryImplForWrapper,
  iterInternalSymbol,
  IteratorPrototype
};


/***/ }),

/***/ "./node_modules/wrtc/build/Release/wrtc.node":
/*!***************************************************!*\
  !*** ./node_modules/wrtc/build/Release/wrtc.node ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* module decorator */ module = __webpack_require__.nmd(module);

try {
  process.dlopen(module, __dirname + (__webpack_require__(/*! path */ "path").sep) + __webpack_require__.p + "66507f7514e8d9c5947c34b72d9ece20.node");
} catch (error) {
  throw new Error('node-loader:\n' + error);
}


/***/ }),

/***/ "./lib/node/channel.node.ts":
/*!**********************************!*\
  !*** ./lib/node/channel.node.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Channel = void 0;
const interfaces_node_1 = __webpack_require__(/*! ./interfaces.node */ "./lib/node/interfaces.node.ts");
const wrtc_1 = __webpack_require__(/*! wrtc */ "./node_modules/wrtc/lib/index.js");
class Channel {
    constructor(SNMHandler, RCMHandler, CMUHandler, RTCConfig) {
        this._SCMQueue = [];
        this._active = false;
        this._SNMHandler = SNMHandler;
        this._RCMHandler = RCMHandler;
        this._CMUHandler = CMUHandler;
        if (RTCConfig) {
            this._peerConnection = new wrtc_1.RTCPeerConnection(RTCConfig);
        }
        else {
            this._peerConnection = new wrtc_1.RTCPeerConnection({
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
            this._peerConnection.setRemoteDescription(new wrtc_1.RTCSessionDescription(message.SDPOffer));
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
            this._peerConnection.setRemoteDescription(new wrtc_1.RTCSessionDescription(message.SDPOffer));
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

"use strict";

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

"use strict";

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

/***/ "./node_modules/webidl-conversions/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/webidl-conversions/lib/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


function _(message, opts) {
    return `${opts && opts.context ? opts.context : "Value"} ${message}.`;
}

function type(V) {
    if (V === null) {
        return "Null";
    }
    switch (typeof V) {
        case "undefined":
            return "Undefined";
        case "boolean":
            return "Boolean";
        case "number":
            return "Number";
        case "string":
            return "String";
        case "symbol":
            return "Symbol";
        case "object":
            // Falls through
        case "function":
            // Falls through
        default:
            // Per ES spec, typeof returns an implemention-defined value that is not any of the existing ones for
            // uncallable non-standard exotic objects. Yet Type() which the Web IDL spec depends on returns Object for
            // such cases. So treat the default case as an object.
            return "Object";
    }
}

// Round x to the nearest integer, choosing the even integer if it lies halfway between two.
function evenRound(x) {
    // There are four cases for numbers with fractional part being .5:
    //
    // case |     x     | floor(x) | round(x) | expected | x <> 0 | x % 1 | x & 1 |   example
    //   1  |  2n + 0.5 |  2n      |  2n + 1  |  2n      |   >    |  0.5  |   0   |  0.5 ->  0
    //   2  |  2n + 1.5 |  2n + 1  |  2n + 2  |  2n + 2  |   >    |  0.5  |   1   |  1.5 ->  2
    //   3  | -2n - 0.5 | -2n - 1  | -2n      | -2n      |   <    | -0.5  |   0   | -0.5 ->  0
    //   4  | -2n - 1.5 | -2n - 2  | -2n - 1  | -2n - 2  |   <    | -0.5  |   1   | -1.5 -> -2
    // (where n is a non-negative integer)
    //
    // Branch here for cases 1 and 4
    if ((x > 0 && (x % 1) === +0.5 && (x & 1) === 0) ||
        (x < 0 && (x % 1) === -0.5 && (x & 1) === 1)) {
        return censorNegativeZero(Math.floor(x));
    }

    return censorNegativeZero(Math.round(x));
}

function integerPart(n) {
    return censorNegativeZero(Math.trunc(n));
}

function sign(x) {
    return x < 0 ? -1 : 1;
}

function modulo(x, y) {
    // https://tc39.github.io/ecma262/#eqn-modulo
    // Note that http://stackoverflow.com/a/4467559/3191 does NOT work for large modulos
    const signMightNotMatch = x % y;
    if (sign(y) !== sign(signMightNotMatch)) {
        return signMightNotMatch + y;
    }
    return signMightNotMatch;
}

function censorNegativeZero(x) {
    return x === 0 ? 0 : x;
}

function createIntegerConversion(bitLength, typeOpts) {
    const isSigned = !typeOpts.unsigned;

    let lowerBound;
    let upperBound;
    if (bitLength === 64) {
        upperBound = Math.pow(2, 53) - 1;
        lowerBound = !isSigned ? 0 : -Math.pow(2, 53) + 1;
    } else if (!isSigned) {
        lowerBound = 0;
        upperBound = Math.pow(2, bitLength) - 1;
    } else {
        lowerBound = -Math.pow(2, bitLength - 1);
        upperBound = Math.pow(2, bitLength - 1) - 1;
    }

    const twoToTheBitLength = Math.pow(2, bitLength);
    const twoToOneLessThanTheBitLength = Math.pow(2, bitLength - 1);

    return (V, opts) => {
        if (opts === undefined) {
            opts = {};
        }

        let x = +V;
        x = censorNegativeZero(x); // Spec discussion ongoing: https://github.com/heycam/webidl/issues/306

        if (opts.enforceRange) {
            if (!Number.isFinite(x)) {
                throw new TypeError(_("is not a finite number", opts));
            }

            x = integerPart(x);

            if (x < lowerBound || x > upperBound) {
                throw new TypeError(_(
                    `is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`, opts));
            }

            return x;
        }

        if (!Number.isNaN(x) && opts.clamp) {
            x = Math.min(Math.max(x, lowerBound), upperBound);
            x = evenRound(x);
            return x;
        }

        if (!Number.isFinite(x) || x === 0) {
            return 0;
        }
        x = integerPart(x);

        // Math.pow(2, 64) is not accurately representable in JavaScript, so try to avoid these per-spec operations if
        // possible. Hopefully it's an optimization for the non-64-bitLength cases too.
        if (x >= lowerBound && x <= upperBound) {
            return x;
        }

        // These will not work great for bitLength of 64, but oh well. See the README for more details.
        x = modulo(x, twoToTheBitLength);
        if (isSigned && x >= twoToOneLessThanTheBitLength) {
            return x - twoToTheBitLength;
        }
        return x;
    };
}

exports.any = V => {
    return V;
};

exports["void"] = function () {
    return undefined;
};

exports.boolean = function (val) {
    return !!val;
};

exports.byte = createIntegerConversion(8, { unsigned: false });
exports.octet = createIntegerConversion(8, { unsigned: true });

exports.short = createIntegerConversion(16, { unsigned: false });
exports["unsigned short"] = createIntegerConversion(16, { unsigned: true });

exports.long = createIntegerConversion(32, { unsigned: false });
exports["unsigned long"] = createIntegerConversion(32, { unsigned: true });

exports["long long"] = createIntegerConversion(64, { unsigned: false });
exports["unsigned long long"] = createIntegerConversion(64, { unsigned: true });

exports.double = (V, opts) => {
    const x = +V;

    if (!Number.isFinite(x)) {
        throw new TypeError(_("is not a finite floating-point value", opts));
    }

    return x;
};

exports["unrestricted double"] = V => {
    const x = +V;

    return x;
};

exports.float = (V, opts) => {
    const x = +V;

    if (!Number.isFinite(x)) {
        throw new TypeError(_("is not a finite floating-point value", opts));
    }

    if (Object.is(x, -0)) {
        return x;
    }

    const y = Math.fround(x);

    if (!Number.isFinite(y)) {
        throw new TypeError(_("is outside the range of a single-precision floating-point value", opts));
    }

    return y;
};

exports["unrestricted float"] = V => {
    const x = +V;

    if (isNaN(x)) {
        return x;
    }

    if (Object.is(x, -0)) {
        return x;
    }

    return Math.fround(x);
};

exports.DOMString = function (V, opts) {
    if (opts === undefined) {
        opts = {};
    }

    if (opts.treatNullAsEmptyString && V === null) {
        return "";
    }

    if (typeof V === "symbol") {
        throw new TypeError(_("is a symbol, which cannot be converted to a string", opts));
    }

    return String(V);
};

exports.ByteString = (V, opts) => {
    const x = exports.DOMString(V, opts);
    let c;
    for (let i = 0; (c = x.codePointAt(i)) !== undefined; ++i) {
        if (c > 255) {
            throw new TypeError(_("is not a valid ByteString", opts));
        }
    }

    return x;
};

exports.USVString = (V, opts) => {
    const S = exports.DOMString(V, opts);
    const n = S.length;
    const U = [];
    for (let i = 0; i < n; ++i) {
        const c = S.charCodeAt(i);
        if (c < 0xD800 || c > 0xDFFF) {
            U.push(String.fromCodePoint(c));
        } else if (0xDC00 <= c && c <= 0xDFFF) {
            U.push(String.fromCodePoint(0xFFFD));
        } else if (i === n - 1) {
            U.push(String.fromCodePoint(0xFFFD));
        } else {
            const d = S.charCodeAt(i + 1);
            if (0xDC00 <= d && d <= 0xDFFF) {
                const a = c & 0x3FF;
                const b = d & 0x3FF;
                U.push(String.fromCodePoint((2 << 15) + ((2 << 9) * a) + b));
                ++i;
            } else {
                U.push(String.fromCodePoint(0xFFFD));
            }
        }
    }

    return U.join("");
};

exports.object = (V, opts) => {
    if (type(V) !== "Object") {
        throw new TypeError(_("is not an object", opts));
    }

    return V;
};

// Not exported, but used in Function and VoidFunction.

// Neither Function nor VoidFunction is defined with [TreatNonObjectAsNull], so
// handling for that is omitted.
function convertCallbackFunction(V, opts) {
    if (typeof V !== "function") {
        throw new TypeError(_("is not a function", opts));
    }
    return V;
}

[
    Error,
    ArrayBuffer, // The IsDetachedBuffer abstract operation is not exposed in JS
    DataView, Int8Array, Int16Array, Int32Array, Uint8Array,
    Uint16Array, Uint32Array, Uint8ClampedArray, Float32Array, Float64Array
].forEach(func => {
    const name = func.name;
    const article = /^[AEIOU]/.test(name) ? "an" : "a";
    exports[name] = (V, opts) => {
        if (!(V instanceof func)) {
            throw new TypeError(_(`is not ${article} ${name} object`, opts));
        }

        return V;
    };
});

// Common definitions

exports.ArrayBufferView = (V, opts) => {
    if (!ArrayBuffer.isView(V)) {
        throw new TypeError(_("is not a view on an ArrayBuffer object", opts));
    }

    return V;
};

exports.BufferSource = (V, opts) => {
    if (!(ArrayBuffer.isView(V) || V instanceof ArrayBuffer)) {
        throw new TypeError(_("is not an ArrayBuffer object or a view on one", opts));
    }

    return V;
};

exports.DOMTimeStamp = exports["unsigned long long"];

exports.Function = convertCallbackFunction;

exports.VoidFunction = convertCallbackFunction;


/***/ }),

/***/ "./node_modules/wrtc/lib/binding.js":
/*!******************************************!*\
  !*** ./node_modules/wrtc/lib/binding.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


try {
  module.exports = Object(function webpackMissingModule() { var e = new Error("Cannot find module '../build/Debug/wrtc.node'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
} catch (error) {
  module.exports = __webpack_require__(/*! ../build/Release/wrtc.node */ "./node_modules/wrtc/build/Release/wrtc.node");
}


/***/ }),

/***/ "./node_modules/wrtc/lib/datachannelevent.js":
/*!***************************************************!*\
  !*** ./node_modules/wrtc/lib/datachannelevent.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


function RTCDataChannelEvent(type, eventInitDict) {
  Object.defineProperties(this, {
    bubbles: {
      value: false
    },
    cancelable: {
      value: false
    },
    type: {
      value: type,
      enumerable: true
    },
    channel: {
      value: eventInitDict.channel,
      enumerable: true
    }
  });
}

module.exports = RTCDataChannelEvent;


/***/ }),

/***/ "./node_modules/wrtc/lib/eventtarget.js":
/*!**********************************************!*\
  !*** ./node_modules/wrtc/lib/eventtarget.js ***!
  \**********************************************/
/***/ ((module) => {

"use strict";


/**
 * @author mrdoob / http://mrdoob.com/
 * @author Jesús Leganés Combarro "Piranna" <piranna@gmail.com>
 */

function EventTarget() {
  this._listeners = {};
}

EventTarget.prototype.addEventListener = function addEventListener(type, listener) {
  const listeners = this._listeners = this._listeners || {};

  if (!listeners[type]) {
    listeners[type] = new Set();
  }

  listeners[type].add(listener);
};

EventTarget.prototype.dispatchEvent = function dispatchEvent(event) {
  let listeners = this._listeners = this._listeners || {};

  process.nextTick(() => {
    listeners = new Set(listeners[event.type] || []);

    const dummyListener = this['on' + event.type];
    if (typeof dummyListener === 'function') {
      listeners.add(dummyListener);
    }

    listeners.forEach(listener => {
      if (typeof listener === 'object' && typeof listener.handleEvent === 'function') {
        listener.handleEvent(event);
      } else {
        listener.call(this, event);
      }
    });
  });
};

EventTarget.prototype.removeEventListener = function removeEventListener(type, listener) {
  const listeners = this._listeners = this._listeners || {};
  if (listeners[type]) {
    listeners[type].delete(listener);
  }
};

module.exports = EventTarget;


/***/ }),

/***/ "./node_modules/wrtc/lib/icecandidate.js":
/*!***********************************************!*\
  !*** ./node_modules/wrtc/lib/icecandidate.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


function RTCIceCandidate(candidateInitDict) {
  [
    'candidate',
    'sdpMid',
    'sdpMLineIndex',
    'foundation',
    'component',
    'priority',
    'address',
    'protocol',
    'port',
    'type',
    'tcpType',
    'relatedAddress',
    'relatedPort',
    'usernameFragment'
  ].forEach(property => {
    if (candidateInitDict && property in candidateInitDict) {
      this[property] = candidateInitDict[property];
    } else {
      this[property] = null;
    }
  });
}

module.exports = RTCIceCandidate;


/***/ }),

/***/ "./node_modules/wrtc/lib/index.js":
/*!****************************************!*\
  !*** ./node_modules/wrtc/lib/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const { inherits } = __webpack_require__(/*! util */ "util");

const {
  MediaStream,
  MediaStreamTrack,
  RTCAudioSink,
  RTCAudioSource,
  RTCDataChannel,
  RTCDtlsTransport,
  RTCIceTransport,
  RTCRtpReceiver,
  RTCRtpSender,
  RTCRtpTransceiver,
  RTCSctpTransport,
  RTCVideoSink,
  RTCVideoSource,
  getUserMedia,
  i420ToRgba,
  rgbaToI420,
  setDOMException
} = __webpack_require__(/*! ./binding */ "./node_modules/wrtc/lib/binding.js");

const EventTarget = __webpack_require__(/*! ./eventtarget */ "./node_modules/wrtc/lib/eventtarget.js");
const MediaDevices = __webpack_require__(/*! ./mediadevices */ "./node_modules/wrtc/lib/mediadevices.js");

inherits(MediaStream, EventTarget);
inherits(MediaStreamTrack, EventTarget);
inherits(RTCAudioSink, EventTarget);
inherits(RTCDataChannel, EventTarget);
inherits(RTCDtlsTransport, EventTarget);
inherits(RTCIceTransport, EventTarget);
inherits(RTCSctpTransport, EventTarget);
inherits(RTCVideoSink, EventTarget);

try {
  setDOMException(__webpack_require__(/*! domexception */ "./node_modules/domexception/lib/public-api.js"));
} catch (error) {
  // Do nothing
}

// NOTE(mroberts): Here's a hack to support jsdom's Blob implementation.
RTCDataChannel.prototype.send = function send(data) {
  const implSymbol = Object.getOwnPropertySymbols(data).find(symbol => symbol.toString() === 'Symbol(impl)');
  if (data[implSymbol] && data[implSymbol]._buffer) {
    data = data[implSymbol]._buffer;
  }
  this._send(data);
};

const mediaDevices = new MediaDevices();

const nonstandard = {
  i420ToRgba,
  RTCAudioSink,
  RTCAudioSource,
  RTCVideoSink,
  RTCVideoSource,
  rgbaToI420
};

module.exports = {
  MediaStream,
  MediaStreamTrack,
  RTCDataChannel,
  RTCDataChannelEvent: __webpack_require__(/*! ./datachannelevent */ "./node_modules/wrtc/lib/datachannelevent.js"),
  RTCDtlsTransport,
  RTCIceCandidate: __webpack_require__(/*! ./icecandidate */ "./node_modules/wrtc/lib/icecandidate.js"),
  RTCIceTransport,
  RTCPeerConnection: __webpack_require__(/*! ./peerconnection */ "./node_modules/wrtc/lib/peerconnection.js"),
  RTCPeerConnectionIceEvent: __webpack_require__(/*! ./rtcpeerconnectioniceevent */ "./node_modules/wrtc/lib/rtcpeerconnectioniceevent.js"),
  RTCRtpReceiver,
  RTCRtpSender,
  RTCRtpTransceiver,
  RTCSctpTransport,
  RTCSessionDescription: __webpack_require__(/*! ./sessiondescription */ "./node_modules/wrtc/lib/sessiondescription.js"),
  getUserMedia,
  mediaDevices,
  nonstandard,
};


/***/ }),

/***/ "./node_modules/wrtc/lib/mediadevices.js":
/*!***********************************************!*\
  !*** ./node_modules/wrtc/lib/mediadevices.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = (__webpack_require__(/*! util */ "util").inherits);

const { getDisplayMedia, getUserMedia } = __webpack_require__(/*! ./binding */ "./node_modules/wrtc/lib/binding.js");

var EventTarget = __webpack_require__(/*! ./eventtarget */ "./node_modules/wrtc/lib/eventtarget.js");

function MediaDevices() {}

inherits(MediaDevices, EventTarget);

MediaDevices.prototype.enumerateDevices = function enumerateDevices() {
  throw new Error('Not yet implemented; file a feature request against node-webrtc');
};

MediaDevices.prototype.getSupportedConstraints = function getSupportedConstraints() {
  throw new Error('Not yet implemented; file a feature request against node-webrtc');
};

MediaDevices.prototype.getDisplayMedia = getDisplayMedia;
MediaDevices.prototype.getUserMedia = getUserMedia;

module.exports = MediaDevices;


/***/ }),

/***/ "./node_modules/wrtc/lib/peerconnection.js":
/*!*************************************************!*\
  !*** ./node_modules/wrtc/lib/peerconnection.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var inherits = (__webpack_require__(/*! util */ "util").inherits);

var _webrtc = __webpack_require__(/*! ./binding */ "./node_modules/wrtc/lib/binding.js");

var EventTarget = __webpack_require__(/*! ./eventtarget */ "./node_modules/wrtc/lib/eventtarget.js");

var RTCDataChannelEvent = __webpack_require__(/*! ./datachannelevent */ "./node_modules/wrtc/lib/datachannelevent.js");
var RTCIceCandidate = __webpack_require__(/*! ./icecandidate */ "./node_modules/wrtc/lib/icecandidate.js");
var RTCPeerConnectionIceEvent = __webpack_require__(/*! ./rtcpeerconnectioniceevent */ "./node_modules/wrtc/lib/rtcpeerconnectioniceevent.js");
var RTCPeerConnectionIceErrorEvent = __webpack_require__(/*! ./rtcpeerconnectioniceerrorevent */ "./node_modules/wrtc/lib/rtcpeerconnectioniceerrorevent.js");
var RTCSessionDescription = __webpack_require__(/*! ./sessiondescription */ "./node_modules/wrtc/lib/sessiondescription.js");

function RTCPeerConnection() {
  var self = this;
  var pc = new _webrtc.RTCPeerConnection(arguments[0] || {});

  EventTarget.call(this);

  //
  // Attach events to the native PeerConnection object
  //
  pc.ontrack = function ontrack(receiver, streams, transceiver) {
    self.dispatchEvent({
      type: 'track',
      track: receiver.track,
      receiver: receiver,
      streams: streams,
      transceiver: transceiver
    });
  };

  pc.onconnectionstatechange = function onconnectionstatechange() {
    self.dispatchEvent({ type: 'connectionstatechange' });
  };

  pc.onicecandidate = function onicecandidate(candidate) {
    var icecandidate = new RTCIceCandidate(candidate);
    self.dispatchEvent(new RTCPeerConnectionIceEvent('icecandidate', { candidate: icecandidate, target: self }));
  };

  pc.onicecandidateerror = function onicecandidateerror(eventInitDict) {
    var pair = eventInitDict.hostCandidate.split(':');
    eventInitDict.address = pair[0];
    eventInitDict.port = pair[1];
    var icecandidateerror = new RTCPeerConnectionIceErrorEvent('icecandidateerror', eventInitDict);
    self.dispatchEvent(icecandidateerror);
  };

  pc.onsignalingstatechange = function onsignalingstatechange() {
    self.dispatchEvent({ type: 'signalingstatechange', target: self });
  };

  pc.oniceconnectionstatechange = function oniceconnectionstatechange() {
    self.dispatchEvent({ type: 'iceconnectionstatechange', target: self });
  };

  pc.onicegatheringstatechange = function onicegatheringstatechange() {
    self.dispatchEvent({ type: 'icegatheringstatechange', target: self });

    // if we have completed gathering candidates, trigger a null candidate event
    if (self.iceGatheringState === 'complete' && self.connectionState !== 'closed') {
      self.dispatchEvent(new RTCPeerConnectionIceEvent('icecandidate', { candidate: null, target: self }));
    }
  };

  pc.onnegotiationneeded = function onnegotiationneeded() {
    self.dispatchEvent({ type: 'negotiationneeded', target: self });
  };

  // [ToDo] onnegotiationneeded

  pc.ondatachannel = function ondatachannel(channel) {
    self.dispatchEvent(new RTCDataChannelEvent('datachannel', { channel }));
  };

  //
  // PeerConnection properties & attributes
  //

  Object.defineProperties(this, {
    _pc: {
      value: pc
    },
    canTrickleIceCandidates: {
      get: function getCanTrickleIceCandidates() {
        return pc.canTrickleIceCandidates;
      },
      enumerable: true
    },
    connectionState: {
      get: function getConnectionState() {
        return pc.connectionState;
      },
      enumerable: true
    },
    currentLocalDescription: {
      get: function getCurrentLocalDescription() {
        return pc.currentLocalDescription
          ? new RTCSessionDescription(pc.currentLocalDescription)
          : null;
      },
      enumerable: true
    },
    localDescription: {
      get: function getLocalDescription() {
        return pc.localDescription
          ? new RTCSessionDescription(pc.localDescription)
          : null;
      },
      enumerable: true
    },
    pendingLocalDescription: {
      get: function getPendingLocalDescription() {
        return pc.pendingLocalDescription
          ? new RTCSessionDescription(pc.pendingLocalDescription)
          : null;
      },
      enumerable: true
    },
    currentRemoteDescription: {
      get: function getCurrentRemoteDescription() {
        return pc.currentRemoteDescription
          ? new RTCSessionDescription(pc.currentRemoteDescription)
          : null;
      },
      enumerable: true
    },
    remoteDescription: {
      get: function getRemoteDescription() {
        return pc.remoteDescription
          ? new RTCSessionDescription(pc.remoteDescription)
          : null;
      },
      enumerable: true
    },
    pendingRemoteDescription: {
      get: function getPendingRemoteDescription() {
        return pc.pendingRemoteDescription
          ? new RTCSessionDescription(pc.pendingRemoteDescription)
          : null;
      },
      enumerable: true
    },
    signalingState: {
      get: function getSignalingState() {
        return pc.signalingState;
      },
      enumerable: true
    },
    readyState: {
      get: function getReadyState() {
        return pc.getReadyState();
      }
    },
    sctp: {
      get: function() {
        return pc.sctp;
      },
      enumerable: true
    },
    iceGatheringState: {
      get: function getIceGatheringState() {
        return pc.iceGatheringState;
      },
      enumerable: true
    },
    iceConnectionState: {
      get: function getIceConnectionState() {
        return pc.iceConnectionState;
      },
      enumerable: true
    },
    onconnectionstatechange: {
      value: null,
      writable: true,
      enumerable: true
    },
    ondatachannel: {
      value: null,
      writable: true,
      enumerable: true
    },
    oniceconnectionstatechange: {
      value: null,
      writable: true,
      enumerable: true
    },
    onicegatheringstatechange: {
      value: null,
      writable: true,
      enumerable: true
    },
    onnegotiationneeded: {
      value: null,
      writable: true,
      enumerable: true
    },
    onsignalingstatechange: {
      value: null,
      writable: true,
      enumerable: true
    }
  });
}

inherits(RTCPeerConnection, EventTarget);

// NOTE(mroberts): This is a bit of a hack.
RTCPeerConnection.prototype.ontrack = null;

RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate(candidate) {
  var promise = this._pc.addIceCandidate(candidate);
  if (arguments.length === 3) {
    promise.then(arguments[1], arguments[2]);
  }
  return promise;
};

RTCPeerConnection.prototype.addTransceiver = function addTransceiver() {
  return this._pc.addTransceiver.apply(this._pc, arguments);
};

RTCPeerConnection.prototype.addTrack = function addTrack(track, ...streams) {
  return this._pc.addTrack(track, streams);
};

RTCPeerConnection.prototype.close = function close() {
  this._pc.close();
};

RTCPeerConnection.prototype.createDataChannel = function createDataChannel() {
  return this._pc.createDataChannel.apply(this._pc, arguments);
};

RTCPeerConnection.prototype.createOffer = function createOffer() {
  var options = arguments.length === 3
    ? arguments[2]
    : arguments[0];
  var promise = this._pc.createOffer(options || {});
  if (arguments.length >= 2) {
    promise.then(arguments[0], arguments[1]);
  }
  return promise;
};

RTCPeerConnection.prototype.createAnswer = function createAnswer() {
  var options = arguments.length === 3
    ? arguments[2]
    : arguments[0];
  var promise = this._pc.createAnswer(options || {});
  if (arguments.length >= 2) {
    promise.then(arguments[0], arguments[1]);
  }
  return promise;
};

RTCPeerConnection.prototype.getConfiguration = function getConfiguration() {
  return this._pc.getConfiguration();
};

RTCPeerConnection.prototype.getReceivers = function getReceivers() {
  return this._pc.getReceivers();
};

RTCPeerConnection.prototype.getSenders = function getSenders() {
  return this._pc.getSenders();
};

RTCPeerConnection.prototype.getTransceivers = function getTransceivers() {
  return this._pc.getTransceivers();
};

RTCPeerConnection.prototype.getStats = function getStats() {
  if (typeof arguments[0] === 'function') {
    this._pc.legacyGetStats().then(arguments[0], arguments[1]);
    return;
  }
  return this._pc.getStats();
};

RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
  this._pc.removeTrack(sender);
};

RTCPeerConnection.prototype.setConfiguration = function setConfiguration(configuration) {
  return this._pc.setConfiguration(configuration);
};

RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription(description) {
  var promise = this._pc.setLocalDescription(description);
  if (arguments.length === 3) {
    promise.then(arguments[1], arguments[2]);
  }
  return promise;
};

RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription(description) {
  var promise = this._pc.setRemoteDescription(description);
  if (arguments.length === 3) {
    promise.then(arguments[1], arguments[2]);
  }
  return promise;
};

RTCPeerConnection.prototype.restartIce = function restartIce() {
  return this._pc.restartIce();
};

module.exports = RTCPeerConnection;


/***/ }),

/***/ "./node_modules/wrtc/lib/rtcpeerconnectioniceerrorevent.js":
/*!*****************************************************************!*\
  !*** ./node_modules/wrtc/lib/rtcpeerconnectioniceerrorevent.js ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";


function RTCPeerConnectionIceErrorEvent(type, eventInitDict) {
  Object.defineProperties(this, {
    type: {
      value: type,
      enumerable: true
    },
    address: {
      value: eventInitDict.address,
      enumerable: true
    },
    port: {
      value: eventInitDict.port,
      enumerable: true
    },
    url: {
      value: eventInitDict.url,
      enumerable: true
    },
    errorCode: {
      value: eventInitDict.errorCode,
      enumerable: true
    },
    errorText: {
      value: eventInitDict.errorText,
      enumerable: true
    }
  });
}

module.exports = RTCPeerConnectionIceErrorEvent;


/***/ }),

/***/ "./node_modules/wrtc/lib/rtcpeerconnectioniceevent.js":
/*!************************************************************!*\
  !*** ./node_modules/wrtc/lib/rtcpeerconnectioniceevent.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


function RTCPeerConnectionIceEvent(type, eventInitDict) {
  Object.defineProperties(this, {
    type: {
      value: type,
      enumerable: true
    },
    candidate: {
      value: eventInitDict.candidate,
      enumerable: true
    },
    target: {
      value: eventInitDict.target,
      enumerable: true
    }
  });
}

module.exports = RTCPeerConnectionIceEvent;


/***/ }),

/***/ "./node_modules/wrtc/lib/sessiondescription.js":
/*!*****************************************************!*\
  !*** ./node_modules/wrtc/lib/sessiondescription.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


function RTCSessionDescription(descriptionInitDict) {
  if (descriptionInitDict) {
    this.type = descriptionInitDict.type;
    this.sdp = descriptionInitDict.sdp;
  }
}

module.exports = RTCSessionDescription;


/***/ }),

/***/ "./node_modules/ws/index.js":
/*!**********************************!*\
  !*** ./node_modules/ws/index.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";
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

"use strict";


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

"use strict";


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

"use strict";


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

"use strict";
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

"use strict";
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

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ "./node_modules/domexception/lib/legacy-error-codes.json":
/*!***************************************************************!*\
  !*** ./node_modules/domexception/lib/legacy-error-codes.json ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"IndexSizeError":1,"DOMStringSizeError":2,"HierarchyRequestError":3,"WrongDocumentError":4,"InvalidCharacterError":5,"NoDataAllowedError":6,"NoModificationAllowedError":7,"NotFoundError":8,"NotSupportedError":9,"InUseAttributeError":10,"InvalidStateError":11,"SyntaxError":12,"InvalidModificationError":13,"NamespaceError":14,"InvalidAccessError":15,"ValidationError":16,"TypeMismatchError":17,"SecurityError":18,"NetworkError":19,"AbortError":20,"URLMismatchError":21,"QuotaExceededError":22,"TimeoutError":23,"InvalidNodeTypeError":24,"DataCloneError":25}');

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVsb3gtYnVuZGxlLm5vZGUuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7QUNWYTtBQUNiLHlCQUF5QixtQkFBTyxDQUFDLDBGQUEyQjtBQUM1RCxpQkFBaUIsbUJBQU8sQ0FBQyw0REFBWTs7QUFFckMsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JCYTs7QUFFYixvQkFBb0IsbUJBQU8sQ0FBQywwRUFBb0I7QUFDaEQsY0FBYyxtQkFBTyxDQUFDLDREQUFZOztBQUVsQzs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLCtCQUErQjtBQUNqRDtBQUNBOztBQUVBO0FBQ0Esa0RBQWtELDREQUE0RDtBQUM5RyxJQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRCw0REFBNEQ7QUFDOUcsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtB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dEI7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixhQUFhLFFBQVE7QUFDckIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixjQUFjLFFBQVE7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07O0FBRU47QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHdCQUF3QjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixhQUFhO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0Msb0JBQW9CO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGFBQWE7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsd0JBQXdCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHdCQUF3QjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsd0JBQXdCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCLGNBQWMsOEJBQThCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG1CQUFtQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQSxRQUFRO0FBQ1I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGNBQWMsOEJBQThCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxLQUFLO0FBQ3hDO0FBQ0E7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O0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEdBQUc7QUFDaEIsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxHQUFHO0FBQ2hCLGFBQWEsUUFBUTtBQUNyQixhQUFhLFNBQVM7QUFDdEI7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQSxhQUFhLFNBQVM7QUFDdEI7QUFDQSxhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxHQUFHO0FBQ2hCLGFBQWEsU0FBUztBQUN0QixhQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsR0FBRztBQUNoQixhQUFhLFNBQVM7QUFDdEIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsR0FBRztBQUNoQixhQUFhLFFBQVE7QUFDckIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsYUFBYSxTQUFTO0FBQ3RCLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7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OztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1Isb0RBQW9ELFNBQVM7QUFDN0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxlQUFlO0FBQ3REO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQSwyQ0FBMkMsY0FBYztBQUN6RDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9WZWxveC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vVmVsb3gvLi9ub2RlX21vZHVsZXMvZG9tZXhjZXB0aW9uL2xpYi9ET01FeGNlcHRpb24taW1wbC5qcyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy9kb21leGNlcHRpb24vbGliL0RPTUV4Y2VwdGlvbi5qcyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy9kb21leGNlcHRpb24vbGliL3B1YmxpYy1hcGkuanMiLCJ3ZWJwYWNrOi8vVmVsb3gvLi9ub2RlX21vZHVsZXMvZG9tZXhjZXB0aW9uL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy93cnRjL2J1aWxkL1JlbGVhc2Uvd3J0Yy5ub2RlIiwid2VicGFjazovL1ZlbG94Ly4vbGliL25vZGUvY2hhbm5lbC5ub2RlLnRzIiwid2VicGFjazovL1ZlbG94Ly4vbGliL25vZGUvaW50ZXJmYWNlcy5ub2RlLnRzIiwid2VicGFjazovL1ZlbG94Ly4vbGliL25vZGUvbmVzdC5ub2RlLnRzIiwid2VicGFjazovL1ZlbG94Ly4vbm9kZV9tb2R1bGVzL3dlYmlkbC1jb252ZXJzaW9ucy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vVmVsb3gvLi9ub2RlX21vZHVsZXMvd3J0Yy9saWIvYmluZGluZy5qcyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy93cnRjL2xpYi9kYXRhY2hhbm5lbGV2ZW50LmpzIiwid2VicGFjazovL1ZlbG94Ly4vbm9kZV9tb2R1bGVzL3dydGMvbGliL2V2ZW50dGFyZ2V0LmpzIiwid2VicGFjazovL1ZlbG94Ly4vbm9kZV9tb2R1bGVzL3dydGMvbGliL2ljZWNhbmRpZGF0ZS5qcyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy93cnRjL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy93cnRjL2xpYi9tZWRpYWRldmljZXMuanMiLCJ3ZWJwYWNrOi8vVmVsb3gvLi9ub2RlX21vZHVsZXMvd3J0Yy9saWIvcGVlcmNvbm5lY3Rpb24uanMiLCJ3ZWJwYWNrOi8vVmVsb3gvLi9ub2RlX21vZHVsZXMvd3J0Yy9saWIvcnRjcGVlcmNvbm5lY3Rpb25pY2VlcnJvcmV2ZW50LmpzIiwid2VicGFjazovL1ZlbG94Ly4vbm9kZV9tb2R1bGVzL3dydGMvbGliL3J0Y3BlZXJjb25uZWN0aW9uaWNlZXZlbnQuanMiLCJ3ZWJwYWNrOi8vVmVsb3gvLi9ub2RlX21vZHVsZXMvd3J0Yy9saWIvc2Vzc2lvbmRlc2NyaXB0aW9uLmpzIiwid2VicGFjazovL1ZlbG94Ly4vbm9kZV9tb2R1bGVzL3dzL2luZGV4LmpzIiwid2VicGFjazovL1ZlbG94Ly4vbm9kZV9tb2R1bGVzL3dzL2xpYi9idWZmZXItdXRpbC5qcyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy93cy9saWIvY29uc3RhbnRzLmpzIiwid2VicGFjazovL1ZlbG94Ly4vbm9kZV9tb2R1bGVzL3dzL2xpYi9ldmVudC10YXJnZXQuanMiLCJ3ZWJwYWNrOi8vVmVsb3gvLi9ub2RlX21vZHVsZXMvd3MvbGliL2V4dGVuc2lvbi5qcyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy93cy9saWIvbGltaXRlci5qcyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy93cy9saWIvcGVybWVzc2FnZS1kZWZsYXRlLmpzIiwid2VicGFjazovL1ZlbG94Ly4vbm9kZV9tb2R1bGVzL3dzL2xpYi9yZWNlaXZlci5qcyIsIndlYnBhY2s6Ly9WZWxveC8uL25vZGVfbW9kdWxlcy93cy9saWIvc2VuZGVyLmpzIiwid2VicGFjazovL1ZlbG94Ly4vbm9kZV9tb2R1bGVzL3dzL2xpYi9zdHJlYW0uanMiLCJ3ZWJwYWNrOi8vVmVsb3gvLi9ub2RlX21vZHVsZXMvd3MvbGliL3N1YnByb3RvY29sLmpzIiwid2VicGFjazovL1ZlbG94Ly4vbm9kZV9tb2R1bGVzL3dzL2xpYi92YWxpZGF0aW9uLmpzIiwid2VicGFjazovL1ZlbG94Ly4vbm9kZV9tb2R1bGVzL3dzL2xpYi93ZWJzb2NrZXQtc2VydmVyLmpzIiwid2VicGFjazovL1ZlbG94Ly4vbm9kZV9tb2R1bGVzL3dzL2xpYi93ZWJzb2NrZXQuanMiLCJ3ZWJwYWNrOi8vVmVsb3gvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImJ1ZmZlclwiIiwid2VicGFjazovL1ZlbG94L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJjcnlwdG9cIiIsIndlYnBhY2s6Ly9WZWxveC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZXZlbnRzXCIiLCJ3ZWJwYWNrOi8vVmVsb3gvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcImh0dHBcIiIsIndlYnBhY2s6Ly9WZWxveC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly9WZWxveC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwibmV0XCIiLCJ3ZWJwYWNrOi8vVmVsb3gvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInBhdGhcIiIsIndlYnBhY2s6Ly9WZWxveC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwic3RyZWFtXCIiLCJ3ZWJwYWNrOi8vVmVsb3gvZXh0ZXJuYWwgbm9kZS1jb21tb25qcyBcInRsc1wiIiwid2VicGFjazovL1ZlbG94L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJ1cmxcIiIsIndlYnBhY2s6Ly9WZWxveC9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwidXRpbFwiIiwid2VicGFjazovL1ZlbG94L2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJ6bGliXCIiLCJ3ZWJwYWNrOi8vVmVsb3gvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vVmVsb3gvd2VicGFjay9ydW50aW1lL25vZGUgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9WZWxveC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9WZWxveC8uL2xpYi9ub2RlL3ZlbG94Lm5vZGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiVmVsb3hcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiVmVsb3hcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCAoKSA9PiB7XG5yZXR1cm4gIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jb25zdCBsZWdhY3lFcnJvckNvZGVzID0gcmVxdWlyZShcIi4vbGVnYWN5LWVycm9yLWNvZGVzLmpzb25cIik7XG5jb25zdCBpZGxVdGlscyA9IHJlcXVpcmUoXCIuL3V0aWxzLmpzXCIpO1xuXG5leHBvcnRzLmltcGxlbWVudGF0aW9uID0gY2xhc3MgRE9NRXhjZXB0aW9uSW1wbCB7XG4gIGNvbnN0cnVjdG9yKFttZXNzYWdlLCBuYW1lXSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgfVxuXG4gIGdldCBjb2RlKCkge1xuICAgIHJldHVybiBsZWdhY3lFcnJvckNvZGVzW3RoaXMubmFtZV0gfHwgMDtcbiAgfVxufTtcblxuLy8gQSBwcm9wcmlldGFyeSBWOCBleHRlbnNpb24gdGhhdCBjYXVzZXMgdGhlIHN0YWNrIHByb3BlcnR5IHRvIGFwcGVhci5cbmV4cG9ydHMuaW5pdCA9IGltcGwgPT4ge1xuICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICBjb25zdCB3cmFwcGVyID0gaWRsVXRpbHMud3JhcHBlckZvckltcGwoaW1wbCk7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2Uod3JhcHBlciwgd3JhcHBlci5jb25zdHJ1Y3Rvcik7XG4gIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgY29udmVyc2lvbnMgPSByZXF1aXJlKFwid2ViaWRsLWNvbnZlcnNpb25zXCIpO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKFwiLi91dGlscy5qc1wiKTtcblxuY29uc3QgaW1wbCA9IHV0aWxzLmltcGxTeW1ib2w7XG5cbmZ1bmN0aW9uIERPTUV4Y2VwdGlvbigpIHtcbiAgY29uc3QgYXJncyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGggJiYgaSA8IDI7ICsraSkge1xuICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gIH1cblxuICBpZiAoYXJnc1swXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgYXJnc1swXSA9IGNvbnZlcnNpb25zW1wiRE9NU3RyaW5nXCJdKGFyZ3NbMF0sIHsgY29udGV4dDogXCJGYWlsZWQgdG8gY29uc3RydWN0ICdET01FeGNlcHRpb24nOiBwYXJhbWV0ZXIgMVwiIH0pO1xuICB9IGVsc2Uge1xuICAgIGFyZ3NbMF0gPSBcIlwiO1xuICB9XG5cbiAgaWYgKGFyZ3NbMV0gIT09IHVuZGVmaW5lZCkge1xuICAgIGFyZ3NbMV0gPSBjb252ZXJzaW9uc1tcIkRPTVN0cmluZ1wiXShhcmdzWzFdLCB7IGNvbnRleHQ6IFwiRmFpbGVkIHRvIGNvbnN0cnVjdCAnRE9NRXhjZXB0aW9uJzogcGFyYW1ldGVyIDJcIiB9KTtcbiAgfSBlbHNlIHtcbiAgICBhcmdzWzFdID0gXCJFcnJvclwiO1xuICB9XG5cbiAgaWZhY2Uuc2V0dXAodGhpcywgYXJncyk7XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24sIFwicHJvdG90eXBlXCIsIHtcbiAgdmFsdWU6IERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsXG4gIHdyaXRhYmxlOiBmYWxzZSxcbiAgZW51bWVyYWJsZTogZmFsc2UsXG4gIGNvbmZpZ3VyYWJsZTogZmFsc2Vcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJuYW1lXCIsIHtcbiAgZ2V0KCkge1xuICAgIHJldHVybiB0aGlzW2ltcGxdW1wibmFtZVwiXTtcbiAgfSxcblxuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJtZXNzYWdlXCIsIHtcbiAgZ2V0KCkge1xuICAgIHJldHVybiB0aGlzW2ltcGxdW1wibWVzc2FnZVwiXTtcbiAgfSxcblxuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJjb2RlXCIsIHtcbiAgZ2V0KCkge1xuICAgIHJldHVybiB0aGlzW2ltcGxdW1wiY29kZVwiXTtcbiAgfSxcblxuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBjb25maWd1cmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLCBcIklOREVYX1NJWkVfRVJSXCIsIHtcbiAgdmFsdWU6IDEsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiSU5ERVhfU0laRV9FUlJcIiwge1xuICB2YWx1ZTogMSxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24sIFwiRE9NU1RSSU5HX1NJWkVfRVJSXCIsIHtcbiAgdmFsdWU6IDIsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiRE9NU1RSSU5HX1NJWkVfRVJSXCIsIHtcbiAgdmFsdWU6IDIsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLCBcIkhJRVJBUkNIWV9SRVFVRVNUX0VSUlwiLCB7XG4gIHZhbHVlOiAzLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIkhJRVJBUkNIWV9SRVFVRVNUX0VSUlwiLCB7XG4gIHZhbHVlOiAzLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJXUk9OR19ET0NVTUVOVF9FUlJcIiwge1xuICB2YWx1ZTogNCxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJXUk9OR19ET0NVTUVOVF9FUlJcIiwge1xuICB2YWx1ZTogNCxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24sIFwiSU5WQUxJRF9DSEFSQUNURVJfRVJSXCIsIHtcbiAgdmFsdWU6IDUsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiSU5WQUxJRF9DSEFSQUNURVJfRVJSXCIsIHtcbiAgdmFsdWU6IDUsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLCBcIk5PX0RBVEFfQUxMT1dFRF9FUlJcIiwge1xuICB2YWx1ZTogNixcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJOT19EQVRBX0FMTE9XRURfRVJSXCIsIHtcbiAgdmFsdWU6IDYsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLCBcIk5PX01PRElGSUNBVElPTl9BTExPV0VEX0VSUlwiLCB7XG4gIHZhbHVlOiA3LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIk5PX01PRElGSUNBVElPTl9BTExPV0VEX0VSUlwiLCB7XG4gIHZhbHVlOiA3LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJOT1RfRk9VTkRfRVJSXCIsIHtcbiAgdmFsdWU6IDgsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiTk9UX0ZPVU5EX0VSUlwiLCB7XG4gIHZhbHVlOiA4LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJOT1RfU1VQUE9SVEVEX0VSUlwiLCB7XG4gIHZhbHVlOiA5LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIk5PVF9TVVBQT1JURURfRVJSXCIsIHtcbiAgdmFsdWU6IDksXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLCBcIklOVVNFX0FUVFJJQlVURV9FUlJcIiwge1xuICB2YWx1ZTogMTAsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiSU5VU0VfQVRUUklCVVRFX0VSUlwiLCB7XG4gIHZhbHVlOiAxMCxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24sIFwiSU5WQUxJRF9TVEFURV9FUlJcIiwge1xuICB2YWx1ZTogMTEsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiSU5WQUxJRF9TVEFURV9FUlJcIiwge1xuICB2YWx1ZTogMTEsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLCBcIlNZTlRBWF9FUlJcIiwge1xuICB2YWx1ZTogMTIsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiU1lOVEFYX0VSUlwiLCB7XG4gIHZhbHVlOiAxMixcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24sIFwiSU5WQUxJRF9NT0RJRklDQVRJT05fRVJSXCIsIHtcbiAgdmFsdWU6IDEzLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIklOVkFMSURfTU9ESUZJQ0FUSU9OX0VSUlwiLCB7XG4gIHZhbHVlOiAxMyxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24sIFwiTkFNRVNQQUNFX0VSUlwiLCB7XG4gIHZhbHVlOiAxNCxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJOQU1FU1BBQ0VfRVJSXCIsIHtcbiAgdmFsdWU6IDE0LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJJTlZBTElEX0FDQ0VTU19FUlJcIiwge1xuICB2YWx1ZTogMTUsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiSU5WQUxJRF9BQ0NFU1NfRVJSXCIsIHtcbiAgdmFsdWU6IDE1LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJWQUxJREFUSU9OX0VSUlwiLCB7XG4gIHZhbHVlOiAxNixcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJWQUxJREFUSU9OX0VSUlwiLCB7XG4gIHZhbHVlOiAxNixcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24sIFwiVFlQRV9NSVNNQVRDSF9FUlJcIiwge1xuICB2YWx1ZTogMTcsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiVFlQRV9NSVNNQVRDSF9FUlJcIiwge1xuICB2YWx1ZTogMTcsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLCBcIlNFQ1VSSVRZX0VSUlwiLCB7XG4gIHZhbHVlOiAxOCxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJTRUNVUklUWV9FUlJcIiwge1xuICB2YWx1ZTogMTgsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLCBcIk5FVFdPUktfRVJSXCIsIHtcbiAgdmFsdWU6IDE5LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIk5FVFdPUktfRVJSXCIsIHtcbiAgdmFsdWU6IDE5LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJBQk9SVF9FUlJcIiwge1xuICB2YWx1ZTogMjAsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiQUJPUlRfRVJSXCIsIHtcbiAgdmFsdWU6IDIwLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJVUkxfTUlTTUFUQ0hfRVJSXCIsIHtcbiAgdmFsdWU6IDIxLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIlVSTF9NSVNNQVRDSF9FUlJcIiwge1xuICB2YWx1ZTogMjEsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLCBcIlFVT1RBX0VYQ0VFREVEX0VSUlwiLCB7XG4gIHZhbHVlOiAyMixcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJRVU9UQV9FWENFRURFRF9FUlJcIiwge1xuICB2YWx1ZTogMjIsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLCBcIlRJTUVPVVRfRVJSXCIsIHtcbiAgdmFsdWU6IDIzLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBcIlRJTUVPVVRfRVJSXCIsIHtcbiAgdmFsdWU6IDIzLFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJJTlZBTElEX05PREVfVFlQRV9FUlJcIiwge1xuICB2YWx1ZTogMjQsXG4gIGVudW1lcmFibGU6IHRydWVcbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbi5wcm90b3R5cGUsIFwiSU5WQUxJRF9OT0RFX1RZUEVfRVJSXCIsIHtcbiAgdmFsdWU6IDI0LFxuICBlbnVtZXJhYmxlOiB0cnVlXG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERPTUV4Y2VwdGlvbiwgXCJEQVRBX0NMT05FX0VSUlwiLCB7XG4gIHZhbHVlOiAyNSxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSwgXCJEQVRBX0NMT05FX0VSUlwiLCB7XG4gIHZhbHVlOiAyNSxcbiAgZW51bWVyYWJsZTogdHJ1ZVxufSk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShET01FeGNlcHRpb24ucHJvdG90eXBlLCBTeW1ib2wudG9TdHJpbmdUYWcsIHtcbiAgdmFsdWU6IFwiRE9NRXhjZXB0aW9uXCIsXG4gIHdyaXRhYmxlOiBmYWxzZSxcbiAgZW51bWVyYWJsZTogZmFsc2UsXG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG5cbmNvbnN0IGlmYWNlID0ge1xuICBtaXhlZEludG86IFtdLFxuICBpcyhvYmopIHtcbiAgICBpZiAob2JqKSB7XG4gICAgICBpZiAob2JqW2ltcGxdIGluc3RhbmNlb2YgSW1wbC5pbXBsZW1lbnRhdGlvbikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW9kdWxlLmV4cG9ydHMubWl4ZWRJbnRvLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChvYmogaW5zdGFuY2VvZiBtb2R1bGUuZXhwb3J0cy5taXhlZEludG9baV0pIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG4gIGlzSW1wbChvYmopIHtcbiAgICBpZiAob2JqKSB7XG4gICAgICBpZiAob2JqIGluc3RhbmNlb2YgSW1wbC5pbXBsZW1lbnRhdGlvbikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgd3JhcHBlciA9IHV0aWxzLndyYXBwZXJGb3JJbXBsKG9iaik7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1vZHVsZS5leHBvcnRzLm1peGVkSW50by5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAod3JhcHBlciBpbnN0YW5jZW9mIG1vZHVsZS5leHBvcnRzLm1peGVkSW50b1tpXSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcbiAgY29udmVydChvYmosIHsgY29udGV4dCA9IFwiVGhlIHByb3ZpZGVkIHZhbHVlXCIgfSA9IHt9KSB7XG4gICAgaWYgKG1vZHVsZS5leHBvcnRzLmlzKG9iaikpIHtcbiAgICAgIHJldHVybiB1dGlscy5pbXBsRm9yV3JhcHBlcihvYmopO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAke2NvbnRleHR9IGlzIG5vdCBvZiB0eXBlICdET01FeGNlcHRpb24nLmApO1xuICB9LFxuXG4gIGNyZWF0ZShjb25zdHJ1Y3RvckFyZ3MsIHByaXZhdGVEYXRhKSB7XG4gICAgbGV0IG9iaiA9IE9iamVjdC5jcmVhdGUoRE9NRXhjZXB0aW9uLnByb3RvdHlwZSk7XG4gICAgdGhpcy5zZXR1cChvYmosIGNvbnN0cnVjdG9yQXJncywgcHJpdmF0ZURhdGEpO1xuICAgIHJldHVybiBvYmo7XG4gIH0sXG4gIGNyZWF0ZUltcGwoY29uc3RydWN0b3JBcmdzLCBwcml2YXRlRGF0YSkge1xuICAgIGxldCBvYmogPSBPYmplY3QuY3JlYXRlKERPTUV4Y2VwdGlvbi5wcm90b3R5cGUpO1xuICAgIHRoaXMuc2V0dXAob2JqLCBjb25zdHJ1Y3RvckFyZ3MsIHByaXZhdGVEYXRhKTtcbiAgICByZXR1cm4gdXRpbHMuaW1wbEZvcldyYXBwZXIob2JqKTtcbiAgfSxcbiAgX2ludGVybmFsU2V0dXAob2JqKSB7fSxcbiAgc2V0dXAob2JqLCBjb25zdHJ1Y3RvckFyZ3MsIHByaXZhdGVEYXRhKSB7XG4gICAgaWYgKCFwcml2YXRlRGF0YSkgcHJpdmF0ZURhdGEgPSB7fTtcblxuICAgIHByaXZhdGVEYXRhLndyYXBwZXIgPSBvYmo7XG5cbiAgICB0aGlzLl9pbnRlcm5hbFNldHVwKG9iaik7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgaW1wbCwge1xuICAgICAgdmFsdWU6IG5ldyBJbXBsLmltcGxlbWVudGF0aW9uKGNvbnN0cnVjdG9yQXJncywgcHJpdmF0ZURhdGEpLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBvYmpbaW1wbF1bdXRpbHMud3JhcHBlclN5bWJvbF0gPSBvYmo7XG4gICAgaWYgKEltcGwuaW5pdCkge1xuICAgICAgSW1wbC5pbml0KG9ialtpbXBsXSwgcHJpdmF0ZURhdGEpO1xuICAgIH1cbiAgfSxcbiAgaW50ZXJmYWNlOiBET01FeGNlcHRpb24sXG4gIGV4cG9zZToge1xuICAgIFdpbmRvdzogeyBET01FeGNlcHRpb24gfSxcbiAgICBXb3JrZXI6IHsgRE9NRXhjZXB0aW9uIH1cbiAgfVxufTsgLy8gaWZhY2Vcbm1vZHVsZS5leHBvcnRzID0gaWZhY2U7XG5cbmNvbnN0IEltcGwgPSByZXF1aXJlKFwiLi8vRE9NRXhjZXB0aW9uLWltcGwuanNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9ET01FeGNlcHRpb25cIikuaW50ZXJmYWNlO1xuXG5PYmplY3Quc2V0UHJvdG90eXBlT2YobW9kdWxlLmV4cG9ydHMucHJvdG90eXBlLCBFcnJvci5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIFJldHVybnMgXCJUeXBlKHZhbHVlKSBpcyBPYmplY3RcIiBpbiBFUyB0ZXJtaW5vbG9neS5cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiYgdmFsdWUgIT09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCI7XG59XG5cbmZ1bmN0aW9uIGdldFJlZmVyZW5jZVRvQnl0ZXMoYnVmZmVyU291cmNlKSB7XG4gIC8vIE5vZGUuanMnIEJ1ZmZlciBkb2VzIG5vdCBhbGxvdyBzdWJjbGFzc2luZyBmb3Igbm93LCBzbyB3ZSBjYW4gZ2V0IGF3YXkgd2l0aCBhIHByb3RvdHlwZSBvYmplY3QgY2hlY2sgZm9yIHBlcmYuXG4gIGlmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YoYnVmZmVyU291cmNlKSA9PT0gQnVmZmVyLnByb3RvdHlwZSkge1xuICAgIHJldHVybiBidWZmZXJTb3VyY2U7XG4gIH1cbiAgaWYgKGJ1ZmZlclNvdXJjZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKGJ1ZmZlclNvdXJjZSk7XG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKGJ1ZmZlclNvdXJjZS5idWZmZXIsIGJ1ZmZlclNvdXJjZS5ieXRlT2Zmc2V0LCBidWZmZXJTb3VyY2UuYnl0ZUxlbmd0aCk7XG59XG5cbmZ1bmN0aW9uIGdldENvcHlUb0J5dGVzKGJ1ZmZlclNvdXJjZSkge1xuICByZXR1cm4gQnVmZmVyLmZyb20oZ2V0UmVmZXJlbmNlVG9CeXRlcyhidWZmZXJTb3VyY2UpKTtcbn1cblxuZnVuY3Rpb24gbWl4aW4odGFyZ2V0LCBzb3VyY2UpIHtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgIGlmIChrZXlzW2ldIGluIHRhcmdldCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5c1tpXSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIGtleXNbaV0pKTtcbiAgfVxufVxuXG5jb25zdCB3cmFwcGVyU3ltYm9sID0gU3ltYm9sKFwid3JhcHBlclwiKTtcbmNvbnN0IGltcGxTeW1ib2wgPSBTeW1ib2woXCJpbXBsXCIpO1xuY29uc3Qgc2FtZU9iamVjdENhY2hlcyA9IFN5bWJvbChcIlNhbWVPYmplY3QgY2FjaGVzXCIpO1xuXG5mdW5jdGlvbiBnZXRTYW1lT2JqZWN0KHdyYXBwZXIsIHByb3AsIGNyZWF0b3IpIHtcbiAgaWYgKCF3cmFwcGVyW3NhbWVPYmplY3RDYWNoZXNdKSB7XG4gICAgd3JhcHBlcltzYW1lT2JqZWN0Q2FjaGVzXSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cblxuICBpZiAocHJvcCBpbiB3cmFwcGVyW3NhbWVPYmplY3RDYWNoZXNdKSB7XG4gICAgcmV0dXJuIHdyYXBwZXJbc2FtZU9iamVjdENhY2hlc11bcHJvcF07XG4gIH1cblxuICB3cmFwcGVyW3NhbWVPYmplY3RDYWNoZXNdW3Byb3BdID0gY3JlYXRvcigpO1xuICByZXR1cm4gd3JhcHBlcltzYW1lT2JqZWN0Q2FjaGVzXVtwcm9wXTtcbn1cblxuZnVuY3Rpb24gd3JhcHBlckZvckltcGwoaW1wbCkge1xuICByZXR1cm4gaW1wbCA/IGltcGxbd3JhcHBlclN5bWJvbF0gOiBudWxsO1xufVxuXG5mdW5jdGlvbiBpbXBsRm9yV3JhcHBlcih3cmFwcGVyKSB7XG4gIHJldHVybiB3cmFwcGVyID8gd3JhcHBlcltpbXBsU3ltYm9sXSA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIHRyeVdyYXBwZXJGb3JJbXBsKGltcGwpIHtcbiAgY29uc3Qgd3JhcHBlciA9IHdyYXBwZXJGb3JJbXBsKGltcGwpO1xuICByZXR1cm4gd3JhcHBlciA/IHdyYXBwZXIgOiBpbXBsO1xufVxuXG5mdW5jdGlvbiB0cnlJbXBsRm9yV3JhcHBlcih3cmFwcGVyKSB7XG4gIGNvbnN0IGltcGwgPSBpbXBsRm9yV3JhcHBlcih3cmFwcGVyKTtcbiAgcmV0dXJuIGltcGwgPyBpbXBsIDogd3JhcHBlcjtcbn1cblxuY29uc3QgaXRlckludGVybmFsU3ltYm9sID0gU3ltYm9sKFwiaW50ZXJuYWxcIik7XG5jb25zdCBJdGVyYXRvclByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihPYmplY3QuZ2V0UHJvdG90eXBlT2YoW11bU3ltYm9sLml0ZXJhdG9yXSgpKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IHtcbiAgaXNPYmplY3QsXG4gIGdldFJlZmVyZW5jZVRvQnl0ZXMsXG4gIGdldENvcHlUb0J5dGVzLFxuICBtaXhpbixcbiAgd3JhcHBlclN5bWJvbCxcbiAgaW1wbFN5bWJvbCxcbiAgZ2V0U2FtZU9iamVjdCxcbiAgd3JhcHBlckZvckltcGwsXG4gIGltcGxGb3JXcmFwcGVyLFxuICB0cnlXcmFwcGVyRm9ySW1wbCxcbiAgdHJ5SW1wbEZvcldyYXBwZXIsXG4gIGl0ZXJJbnRlcm5hbFN5bWJvbCxcbiAgSXRlcmF0b3JQcm90b3R5cGVcbn07XG4iLCJcbnRyeSB7XG4gIHByb2Nlc3MuZGxvcGVuKG1vZHVsZSwgX19kaXJuYW1lICsgcmVxdWlyZShcInBhdGhcIikuc2VwICsgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcIjY2NTA3Zjc1MTRlOGQ5YzU5NDdjMzRiNzJkOWVjZTIwLm5vZGVcIik7XG59IGNhdGNoIChlcnJvcikge1xuICB0aHJvdyBuZXcgRXJyb3IoJ25vZGUtbG9hZGVyOlxcbicgKyBlcnJvcik7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkNoYW5uZWwgPSB2b2lkIDA7XHJcbmNvbnN0IGludGVyZmFjZXNfbm9kZV8xID0gcmVxdWlyZShcIi4vaW50ZXJmYWNlcy5ub2RlXCIpO1xyXG5jb25zdCB3cnRjXzEgPSByZXF1aXJlKFwid3J0Y1wiKTtcclxuY2xhc3MgQ2hhbm5lbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihTTk1IYW5kbGVyLCBSQ01IYW5kbGVyLCBDTVVIYW5kbGVyLCBSVENDb25maWcpIHtcclxuICAgICAgICB0aGlzLl9TQ01RdWV1ZSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1NOTUhhbmRsZXIgPSBTTk1IYW5kbGVyO1xyXG4gICAgICAgIHRoaXMuX1JDTUhhbmRsZXIgPSBSQ01IYW5kbGVyO1xyXG4gICAgICAgIHRoaXMuX0NNVUhhbmRsZXIgPSBDTVVIYW5kbGVyO1xyXG4gICAgICAgIGlmIChSVENDb25maWcpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGVlckNvbm5lY3Rpb24gPSBuZXcgd3J0Y18xLlJUQ1BlZXJDb25uZWN0aW9uKFJUQ0NvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9wZWVyQ29ubmVjdGlvbiA9IG5ldyB3cnRjXzEuUlRDUGVlckNvbm5lY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgaWNlU2VydmVyczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsczogXCJzdHVuOnN0dW4uMS5nb29nbGUuY29tOjE5MzAyXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFNDTVByb2Nlc3Nvcihtc2cpIHtcclxuICAgICAgICBjb25zdCBtc2dTdHIgPSBKU09OLnN0cmluZ2lmeShtc2cpO1xyXG4gICAgICAgIGNvbnN0IGJ5dGVzID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKG1zZ1N0cik7XHJcbiAgICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtieXRlc10sIHtcclxuICAgICAgICAgICAgdHlwZTogXCJhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLThcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGJsb2IuYXJyYXlCdWZmZXIoKS50aGVuKChibG9iRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhQ2hhbm5lbC5zZW5kKGJsb2JEYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1NDTVF1ZXVlLnB1c2gobXNnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZXhlY3V0ZVNDTVF1ZXVlKCkge1xyXG4gICAgICAgIHdoaWxlICh0aGlzLl9TQ01RdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuU0NNUHJvY2Vzc29yKHRoaXMuX1NDTVF1ZXVlLnBvcCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBSTk1Qcm9jZXNzb3IobWVzc2FnZSkge1xyXG4gICAgICAgIGlmIChtZXNzYWdlLlR5cGUgPT0gaW50ZXJmYWNlc19ub2RlXzEuUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZS5TdGFydEhhbmRzaGFrZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wZWVyVVVJRCA9IG1lc3NhZ2UuVVVJRDtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YUNoYW5uZWwgPSB0aGlzLl9wZWVyQ29ubmVjdGlvbi5jcmVhdGVEYXRhQ2hhbm5lbChcIm1cIik7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFDaGFubmVsLmJpbmFyeVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFDaGFubmVsLm9ubWVzc2FnZSA9IChldikgPT4gdGhpcy5fb25tZXNzYWdlSGFuZGxlcihldik7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFDaGFubmVsLm9ub3BlbiA9IChldikgPT4gdGhpcy5fb25PcGVuSGFuZGxlcihldik7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGFDaGFubmVsLm9uY2xvc2UgPSAoZXYpID0+IHRoaXMuX29uQ2xvc2VIYW5kbGVyKGV2KTtcclxuICAgICAgICAgICAgdGhpcy5fcGVlckNvbm5lY3Rpb24uY3JlYXRlT2ZmZXIoKS50aGVuKChvZmZlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGVlckNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihvZmZlcik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtc2cgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVVVJRDogdGhpcy5fcGVlclVVSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgU0RQT2ZmZXI6IG9mZmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIFR5cGU6IGludGVyZmFjZXNfbm9kZV8xLlNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlLk9mZmVyXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fU05NSGFuZGxlcihtc2cpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobWVzc2FnZS5UeXBlID09IGludGVyZmFjZXNfbm9kZV8xLlJlY2lldmFibGVOZXN0TWVzc2FnZVR5cGUuT2ZmZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGVlclVVSUQgPSBtZXNzYWdlLlVVSUQ7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlZXJDb25uZWN0aW9uLm9uZGF0YWNoYW5uZWwgPSAoZXYpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFDaGFubmVsID0gZXYuY2hhbm5lbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFDaGFubmVsLmJpbmFyeVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhQ2hhbm5lbC5vbm1lc3NhZ2UgPSAoZXYpID0+IHRoaXMuX29ubWVzc2FnZUhhbmRsZXIoZXYpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YUNoYW5uZWwub25vcGVuID0gKGV2KSA9PiB0aGlzLl9vbk9wZW5IYW5kbGVyKGV2KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFDaGFubmVsLm9uY2xvc2UgPSAoZXYpID0+IHRoaXMuX29uQ2xvc2VIYW5kbGVyKGV2KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5fcGVlckNvbm5lY3Rpb24uc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IHdydGNfMS5SVENTZXNzaW9uRGVzY3JpcHRpb24obWVzc2FnZS5TRFBPZmZlcikpO1xyXG4gICAgICAgICAgICB0aGlzLl9wZWVyQ29ubmVjdGlvbi5jcmVhdGVBbnN3ZXIoKS50aGVuKChhbnN3ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oYW5zd2VyKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBVVUlEOiB0aGlzLl9wZWVyVVVJRCxcclxuICAgICAgICAgICAgICAgICAgICBTRFBPZmZlcjogYW5zd2VyLFxyXG4gICAgICAgICAgICAgICAgICAgIFR5cGU6IGludGVyZmFjZXNfbm9kZV8xLlNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlLkFuc3dlclxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1NOTUhhbmRsZXIobXNnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BlZXJDb25uZWN0aW9uLm9uaWNlY2FuZGlkYXRlID0gKHsgY2FuZGlkYXRlIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtc2cgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFVVSUQ6IHRoaXMuX3BlZXJVVUlELFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBDYW5kaWRhdGU6IGNhbmRpZGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgVHlwZTogaW50ZXJmYWNlc19ub2RlXzEuU2VuZGFibGVOZXN0TWVzc2FnZVR5cGUuSUNFXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9TTk1IYW5kbGVyKG1zZyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobWVzc2FnZS5UeXBlID09IGludGVyZmFjZXNfbm9kZV8xLlJlY2lldmFibGVOZXN0TWVzc2FnZVR5cGUuQW5zd2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlZXJDb25uZWN0aW9uLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyB3cnRjXzEuUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKG1lc3NhZ2UuU0RQT2ZmZXIpKTtcclxuICAgICAgICAgICAgdGhpcy5fcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSAoeyBjYW5kaWRhdGUgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbXNnID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIFVVSUQ6IHRoaXMuX3BlZXJVVUlELFxyXG4gICAgICAgICAgICAgICAgICAgIENhbmRpZGF0ZTogY2FuZGlkYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgIFR5cGU6IGludGVyZmFjZXNfbm9kZV8xLlNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlLklDRVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1NOTUhhbmRsZXIobXNnKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobWVzc2FnZS5UeXBlID09IGludGVyZmFjZXNfbm9kZV8xLlJlY2lldmFibGVOZXN0TWVzc2FnZVR5cGUuSUNFKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlZXJDb25uZWN0aW9uLmFkZEljZUNhbmRpZGF0ZShtZXNzYWdlLkNhbmRpZGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlZmF1bHRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgX29uT3BlbkhhbmRsZXIoZXYpIHtcclxuICAgICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IG1ldGFfdXBkYXRlID0geyBQZWVyOiB0aGlzLl9wZWVyVVVJRCwgVXBkYXRlOiBcIk9wZW5lZFwiIH07XHJcbiAgICAgICAgdGhpcy5fQ01VSGFuZGxlcihtZXRhX3VwZGF0ZSk7XHJcbiAgICAgICAgdGhpcy5leGVjdXRlU0NNUXVldWUoKTtcclxuICAgIH1cclxuICAgIF9vbm1lc3NhZ2VIYW5kbGVyKGV2KSB7XHJcbiAgICAgICAgY29uc3QganNvblN0cmluZyA9IG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShldi5kYXRhKTtcclxuICAgICAgICBjb25zdCBtc2cgPSBKU09OLnBhcnNlKGpzb25TdHJpbmcpO1xyXG4gICAgICAgIHRoaXMuX1JDTUhhbmRsZXIoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtc2cpLCB7IFVVSUQ6IHRoaXMuX3BlZXJVVUlEIH0pKTtcclxuICAgIH1cclxuICAgIF9vbkNsb3NlSGFuZGxlcihldikge1xyXG4gICAgICAgIGNvbnN0IG1ldGFfdXBkYXRlID0geyBQZWVyOiB0aGlzLl9wZWVyVVVJRCwgVXBkYXRlOiBcIkNsb3NlZFwiIH07XHJcbiAgICAgICAgdGhpcy5fQ01VSGFuZGxlcihtZXRhX3VwZGF0ZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5DaGFubmVsID0gQ2hhbm5lbDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5TZW5kYWJsZU5lc3RNZXNzYWdlVHlwZSA9IGV4cG9ydHMuUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZSA9IHZvaWQgMDtcclxudmFyIFJlY2lldmFibGVOZXN0TWVzc2FnZVR5cGU7XHJcbihmdW5jdGlvbiAoUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZSkge1xyXG4gICAgUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZVtcIkluaXRpYWxcIl0gPSBcIklOXCI7XHJcbiAgICBSZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlW1wiU3RhcnRIYW5kc2hha2VcIl0gPSBcIlNIXCI7XHJcbiAgICBSZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlW1wiT2ZmZXJcIl0gPSBcIk9GXCI7XHJcbiAgICBSZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlW1wiQW5zd2VyXCJdID0gXCJBTlwiO1xyXG4gICAgUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZVtcIklDRVwiXSA9IFwiQ1wiO1xyXG59KShSZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlID0gZXhwb3J0cy5SZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlIHx8IChleHBvcnRzLlJlY2lldmFibGVOZXN0TWVzc2FnZVR5cGUgPSB7fSkpO1xyXG52YXIgU2VuZGFibGVOZXN0TWVzc2FnZVR5cGU7XHJcbihmdW5jdGlvbiAoU2VuZGFibGVOZXN0TWVzc2FnZVR5cGUpIHtcclxuICAgIFNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlW1wiSW5pdGlhbFwiXSA9IFwiSU5cIjtcclxuICAgIFNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlW1wiT2ZmZXJcIl0gPSBcIk9GXCI7XHJcbiAgICBTZW5kYWJsZU5lc3RNZXNzYWdlVHlwZVtcIkFuc3dlclwiXSA9IFwiQU5cIjtcclxuICAgIFNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlW1wiSUNFXCJdID0gXCJDXCI7XHJcbn0pKFNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlID0gZXhwb3J0cy5TZW5kYWJsZU5lc3RNZXNzYWdlVHlwZSB8fCAoZXhwb3J0cy5TZW5kYWJsZU5lc3RNZXNzYWdlVHlwZSA9IHt9KSk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuTmVzdCA9IHZvaWQgMDtcclxuY29uc3Qgd3NfMSA9IHJlcXVpcmUoXCJ3c1wiKTtcclxuY2xhc3MgTmVzdCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihzb2NrQWRkciwgUk5NSGFuZGxlcikge1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3NvY2tBZGRyID0gXCJ3czo0NS4zMy43NC4xNjU6ODAvbmVzdFwiO1xyXG4gICAgICAgIGlmIChzb2NrQWRkciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NvY2tBZGRyID0gc29ja0FkZHI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3dzID0gbmV3IHdzXzEuV2ViU29ja2V0KHRoaXMuX3NvY2tBZGRyKTtcclxuICAgICAgICB0aGlzLl93cy5vbm9wZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwib3BlbmVkIGNvbm5lY3Rpb24gdG8gbmVzdFwiKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX3dzLm9ubWVzc2FnZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcclxuICAgICAgICAgICAgUk5NSGFuZGxlcihtZXNzYWdlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX3dzLm9uY2xvc2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY29ubmVjdGlvbiB3aXRoIHRoZSBuZXN0IGhhcyBiZWVuIGNsb3NlZFwiKTtcclxuICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLl93cy5vbmVycm9yID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcclxuICAgICAgICAgICAgdGhpcy5fd3MuY2xvc2U7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGlzQWN0aXZlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmU7XHJcbiAgICB9XHJcbiAgICBTTk1Qcm9jZXNzb3IoU05NKSB7XHJcbiAgICAgICAgY29uc3QgZHRhID0gSlNPTi5zdHJpbmdpZnkoU05NKTtcclxuICAgICAgICB0aGlzLl93cy5zZW5kKGR0YSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5OZXN0ID0gTmVzdDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF8obWVzc2FnZSwgb3B0cykge1xuICAgIHJldHVybiBgJHtvcHRzICYmIG9wdHMuY29udGV4dCA/IG9wdHMuY29udGV4dCA6IFwiVmFsdWVcIn0gJHttZXNzYWdlfS5gO1xufVxuXG5mdW5jdGlvbiB0eXBlKFYpIHtcbiAgICBpZiAoViA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gXCJOdWxsXCI7XG4gICAgfVxuICAgIHN3aXRjaCAodHlwZW9mIFYpIHtcbiAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICAgICAgcmV0dXJuIFwiVW5kZWZpbmVkXCI7XG4gICAgICAgIGNhc2UgXCJib29sZWFuXCI6XG4gICAgICAgICAgICByZXR1cm4gXCJCb29sZWFuXCI7XG4gICAgICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgICAgICAgIHJldHVybiBcIk51bWJlclwiO1xuICAgICAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICAgICAgICByZXR1cm4gXCJTdHJpbmdcIjtcbiAgICAgICAgY2FzZSBcInN5bWJvbFwiOlxuICAgICAgICAgICAgcmV0dXJuIFwiU3ltYm9sXCI7XG4gICAgICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgICAgICAgIC8vIEZhbGxzIHRocm91Z2hcbiAgICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgICAgICAgICAvLyBGYWxscyB0aHJvdWdoXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAvLyBQZXIgRVMgc3BlYywgdHlwZW9mIHJldHVybnMgYW4gaW1wbGVtZW50aW9uLWRlZmluZWQgdmFsdWUgdGhhdCBpcyBub3QgYW55IG9mIHRoZSBleGlzdGluZyBvbmVzIGZvclxuICAgICAgICAgICAgLy8gdW5jYWxsYWJsZSBub24tc3RhbmRhcmQgZXhvdGljIG9iamVjdHMuIFlldCBUeXBlKCkgd2hpY2ggdGhlIFdlYiBJREwgc3BlYyBkZXBlbmRzIG9uIHJldHVybnMgT2JqZWN0IGZvclxuICAgICAgICAgICAgLy8gc3VjaCBjYXNlcy4gU28gdHJlYXQgdGhlIGRlZmF1bHQgY2FzZSBhcyBhbiBvYmplY3QuXG4gICAgICAgICAgICByZXR1cm4gXCJPYmplY3RcIjtcbiAgICB9XG59XG5cbi8vIFJvdW5kIHggdG8gdGhlIG5lYXJlc3QgaW50ZWdlciwgY2hvb3NpbmcgdGhlIGV2ZW4gaW50ZWdlciBpZiBpdCBsaWVzIGhhbGZ3YXkgYmV0d2VlbiB0d28uXG5mdW5jdGlvbiBldmVuUm91bmQoeCkge1xuICAgIC8vIFRoZXJlIGFyZSBmb3VyIGNhc2VzIGZvciBudW1iZXJzIHdpdGggZnJhY3Rpb25hbCBwYXJ0IGJlaW5nIC41OlxuICAgIC8vXG4gICAgLy8gY2FzZSB8ICAgICB4ICAgICB8IGZsb29yKHgpIHwgcm91bmQoeCkgfCBleHBlY3RlZCB8IHggPD4gMCB8IHggJSAxIHwgeCAmIDEgfCAgIGV4YW1wbGVcbiAgICAvLyAgIDEgIHwgIDJuICsgMC41IHwgIDJuICAgICAgfCAgMm4gKyAxICB8ICAybiAgICAgIHwgICA+ICAgIHwgIDAuNSAgfCAgIDAgICB8ICAwLjUgLT4gIDBcbiAgICAvLyAgIDIgIHwgIDJuICsgMS41IHwgIDJuICsgMSAgfCAgMm4gKyAyICB8ICAybiArIDIgIHwgICA+ICAgIHwgIDAuNSAgfCAgIDEgICB8ICAxLjUgLT4gIDJcbiAgICAvLyAgIDMgIHwgLTJuIC0gMC41IHwgLTJuIC0gMSAgfCAtMm4gICAgICB8IC0ybiAgICAgIHwgICA8ICAgIHwgLTAuNSAgfCAgIDAgICB8IC0wLjUgLT4gIDBcbiAgICAvLyAgIDQgIHwgLTJuIC0gMS41IHwgLTJuIC0gMiAgfCAtMm4gLSAxICB8IC0ybiAtIDIgIHwgICA8ICAgIHwgLTAuNSAgfCAgIDEgICB8IC0xLjUgLT4gLTJcbiAgICAvLyAod2hlcmUgbiBpcyBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyKVxuICAgIC8vXG4gICAgLy8gQnJhbmNoIGhlcmUgZm9yIGNhc2VzIDEgYW5kIDRcbiAgICBpZiAoKHggPiAwICYmICh4ICUgMSkgPT09ICswLjUgJiYgKHggJiAxKSA9PT0gMCkgfHxcbiAgICAgICAgKHggPCAwICYmICh4ICUgMSkgPT09IC0wLjUgJiYgKHggJiAxKSA9PT0gMSkpIHtcbiAgICAgICAgcmV0dXJuIGNlbnNvck5lZ2F0aXZlWmVybyhNYXRoLmZsb29yKHgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2Vuc29yTmVnYXRpdmVaZXJvKE1hdGgucm91bmQoeCkpO1xufVxuXG5mdW5jdGlvbiBpbnRlZ2VyUGFydChuKSB7XG4gICAgcmV0dXJuIGNlbnNvck5lZ2F0aXZlWmVybyhNYXRoLnRydW5jKG4pKTtcbn1cblxuZnVuY3Rpb24gc2lnbih4KSB7XG4gICAgcmV0dXJuIHggPCAwID8gLTEgOiAxO1xufVxuXG5mdW5jdGlvbiBtb2R1bG8oeCwgeSkge1xuICAgIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jZXFuLW1vZHVsb1xuICAgIC8vIE5vdGUgdGhhdCBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80NDY3NTU5LzMxOTEgZG9lcyBOT1Qgd29yayBmb3IgbGFyZ2UgbW9kdWxvc1xuICAgIGNvbnN0IHNpZ25NaWdodE5vdE1hdGNoID0geCAlIHk7XG4gICAgaWYgKHNpZ24oeSkgIT09IHNpZ24oc2lnbk1pZ2h0Tm90TWF0Y2gpKSB7XG4gICAgICAgIHJldHVybiBzaWduTWlnaHROb3RNYXRjaCArIHk7XG4gICAgfVxuICAgIHJldHVybiBzaWduTWlnaHROb3RNYXRjaDtcbn1cblxuZnVuY3Rpb24gY2Vuc29yTmVnYXRpdmVaZXJvKHgpIHtcbiAgICByZXR1cm4geCA9PT0gMCA/IDAgOiB4O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJbnRlZ2VyQ29udmVyc2lvbihiaXRMZW5ndGgsIHR5cGVPcHRzKSB7XG4gICAgY29uc3QgaXNTaWduZWQgPSAhdHlwZU9wdHMudW5zaWduZWQ7XG5cbiAgICBsZXQgbG93ZXJCb3VuZDtcbiAgICBsZXQgdXBwZXJCb3VuZDtcbiAgICBpZiAoYml0TGVuZ3RoID09PSA2NCkge1xuICAgICAgICB1cHBlckJvdW5kID0gTWF0aC5wb3coMiwgNTMpIC0gMTtcbiAgICAgICAgbG93ZXJCb3VuZCA9ICFpc1NpZ25lZCA/IDAgOiAtTWF0aC5wb3coMiwgNTMpICsgMTtcbiAgICB9IGVsc2UgaWYgKCFpc1NpZ25lZCkge1xuICAgICAgICBsb3dlckJvdW5kID0gMDtcbiAgICAgICAgdXBwZXJCb3VuZCA9IE1hdGgucG93KDIsIGJpdExlbmd0aCkgLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxvd2VyQm91bmQgPSAtTWF0aC5wb3coMiwgYml0TGVuZ3RoIC0gMSk7XG4gICAgICAgIHVwcGVyQm91bmQgPSBNYXRoLnBvdygyLCBiaXRMZW5ndGggLSAxKSAtIDE7XG4gICAgfVxuXG4gICAgY29uc3QgdHdvVG9UaGVCaXRMZW5ndGggPSBNYXRoLnBvdygyLCBiaXRMZW5ndGgpO1xuICAgIGNvbnN0IHR3b1RvT25lTGVzc1RoYW5UaGVCaXRMZW5ndGggPSBNYXRoLnBvdygyLCBiaXRMZW5ndGggLSAxKTtcblxuICAgIHJldHVybiAoViwgb3B0cykgPT4ge1xuICAgICAgICBpZiAob3B0cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBvcHRzID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeCA9ICtWO1xuICAgICAgICB4ID0gY2Vuc29yTmVnYXRpdmVaZXJvKHgpOyAvLyBTcGVjIGRpc2N1c3Npb24gb25nb2luZzogaHR0cHM6Ly9naXRodWIuY29tL2hleWNhbS93ZWJpZGwvaXNzdWVzLzMwNlxuXG4gICAgICAgIGlmIChvcHRzLmVuZm9yY2VSYW5nZSkge1xuICAgICAgICAgICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoeCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKF8oXCJpcyBub3QgYSBmaW5pdGUgbnVtYmVyXCIsIG9wdHMpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgeCA9IGludGVnZXJQYXJ0KHgpO1xuXG4gICAgICAgICAgICBpZiAoeCA8IGxvd2VyQm91bmQgfHwgeCA+IHVwcGVyQm91bmQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKF8oXG4gICAgICAgICAgICAgICAgICAgIGBpcyBvdXRzaWRlIHRoZSBhY2NlcHRlZCByYW5nZSBvZiAke2xvd2VyQm91bmR9IHRvICR7dXBwZXJCb3VuZH0sIGluY2x1c2l2ZWAsIG9wdHMpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIU51bWJlci5pc05hTih4KSAmJiBvcHRzLmNsYW1wKSB7XG4gICAgICAgICAgICB4ID0gTWF0aC5taW4oTWF0aC5tYXgoeCwgbG93ZXJCb3VuZCksIHVwcGVyQm91bmQpO1xuICAgICAgICAgICAgeCA9IGV2ZW5Sb3VuZCh4KTtcbiAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoeCkgfHwgeCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgeCA9IGludGVnZXJQYXJ0KHgpO1xuXG4gICAgICAgIC8vIE1hdGgucG93KDIsIDY0KSBpcyBub3QgYWNjdXJhdGVseSByZXByZXNlbnRhYmxlIGluIEphdmFTY3JpcHQsIHNvIHRyeSB0byBhdm9pZCB0aGVzZSBwZXItc3BlYyBvcGVyYXRpb25zIGlmXG4gICAgICAgIC8vIHBvc3NpYmxlLiBIb3BlZnVsbHkgaXQncyBhbiBvcHRpbWl6YXRpb24gZm9yIHRoZSBub24tNjQtYml0TGVuZ3RoIGNhc2VzIHRvby5cbiAgICAgICAgaWYgKHggPj0gbG93ZXJCb3VuZCAmJiB4IDw9IHVwcGVyQm91bmQpIHtcbiAgICAgICAgICAgIHJldHVybiB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVGhlc2Ugd2lsbCBub3Qgd29yayBncmVhdCBmb3IgYml0TGVuZ3RoIG9mIDY0LCBidXQgb2ggd2VsbC4gU2VlIHRoZSBSRUFETUUgZm9yIG1vcmUgZGV0YWlscy5cbiAgICAgICAgeCA9IG1vZHVsbyh4LCB0d29Ub1RoZUJpdExlbmd0aCk7XG4gICAgICAgIGlmIChpc1NpZ25lZCAmJiB4ID49IHR3b1RvT25lTGVzc1RoYW5UaGVCaXRMZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiB4IC0gdHdvVG9UaGVCaXRMZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfTtcbn1cblxuZXhwb3J0cy5hbnkgPSBWID0+IHtcbiAgICByZXR1cm4gVjtcbn07XG5cbmV4cG9ydHMudm9pZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0cy5ib29sZWFuID0gZnVuY3Rpb24gKHZhbCkge1xuICAgIHJldHVybiAhIXZhbDtcbn07XG5cbmV4cG9ydHMuYnl0ZSA9IGNyZWF0ZUludGVnZXJDb252ZXJzaW9uKDgsIHsgdW5zaWduZWQ6IGZhbHNlIH0pO1xuZXhwb3J0cy5vY3RldCA9IGNyZWF0ZUludGVnZXJDb252ZXJzaW9uKDgsIHsgdW5zaWduZWQ6IHRydWUgfSk7XG5cbmV4cG9ydHMuc2hvcnQgPSBjcmVhdGVJbnRlZ2VyQ29udmVyc2lvbigxNiwgeyB1bnNpZ25lZDogZmFsc2UgfSk7XG5leHBvcnRzW1widW5zaWduZWQgc2hvcnRcIl0gPSBjcmVhdGVJbnRlZ2VyQ29udmVyc2lvbigxNiwgeyB1bnNpZ25lZDogdHJ1ZSB9KTtcblxuZXhwb3J0cy5sb25nID0gY3JlYXRlSW50ZWdlckNvbnZlcnNpb24oMzIsIHsgdW5zaWduZWQ6IGZhbHNlIH0pO1xuZXhwb3J0c1tcInVuc2lnbmVkIGxvbmdcIl0gPSBjcmVhdGVJbnRlZ2VyQ29udmVyc2lvbigzMiwgeyB1bnNpZ25lZDogdHJ1ZSB9KTtcblxuZXhwb3J0c1tcImxvbmcgbG9uZ1wiXSA9IGNyZWF0ZUludGVnZXJDb252ZXJzaW9uKDY0LCB7IHVuc2lnbmVkOiBmYWxzZSB9KTtcbmV4cG9ydHNbXCJ1bnNpZ25lZCBsb25nIGxvbmdcIl0gPSBjcmVhdGVJbnRlZ2VyQ29udmVyc2lvbig2NCwgeyB1bnNpZ25lZDogdHJ1ZSB9KTtcblxuZXhwb3J0cy5kb3VibGUgPSAoViwgb3B0cykgPT4ge1xuICAgIGNvbnN0IHggPSArVjtcblxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHgpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXyhcImlzIG5vdCBhIGZpbml0ZSBmbG9hdGluZy1wb2ludCB2YWx1ZVwiLCBvcHRzKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHg7XG59O1xuXG5leHBvcnRzW1widW5yZXN0cmljdGVkIGRvdWJsZVwiXSA9IFYgPT4ge1xuICAgIGNvbnN0IHggPSArVjtcblxuICAgIHJldHVybiB4O1xufTtcblxuZXhwb3J0cy5mbG9hdCA9IChWLCBvcHRzKSA9PiB7XG4gICAgY29uc3QgeCA9ICtWO1xuXG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUoeCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihfKFwiaXMgbm90IGEgZmluaXRlIGZsb2F0aW5nLXBvaW50IHZhbHVlXCIsIG9wdHMpKTtcbiAgICB9XG5cbiAgICBpZiAoT2JqZWN0LmlzKHgsIC0wKSkge1xuICAgICAgICByZXR1cm4geDtcbiAgICB9XG5cbiAgICBjb25zdCB5ID0gTWF0aC5mcm91bmQoeCk7XG5cbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZSh5KSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKF8oXCJpcyBvdXRzaWRlIHRoZSByYW5nZSBvZiBhIHNpbmdsZS1wcmVjaXNpb24gZmxvYXRpbmctcG9pbnQgdmFsdWVcIiwgb3B0cykpO1xuICAgIH1cblxuICAgIHJldHVybiB5O1xufTtcblxuZXhwb3J0c1tcInVucmVzdHJpY3RlZCBmbG9hdFwiXSA9IFYgPT4ge1xuICAgIGNvbnN0IHggPSArVjtcblxuICAgIGlmIChpc05hTih4KSkge1xuICAgICAgICByZXR1cm4geDtcbiAgICB9XG5cbiAgICBpZiAoT2JqZWN0LmlzKHgsIC0wKSkge1xuICAgICAgICByZXR1cm4geDtcbiAgICB9XG5cbiAgICByZXR1cm4gTWF0aC5mcm91bmQoeCk7XG59O1xuXG5leHBvcnRzLkRPTVN0cmluZyA9IGZ1bmN0aW9uIChWLCBvcHRzKSB7XG4gICAgaWYgKG9wdHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBvcHRzID0ge307XG4gICAgfVxuXG4gICAgaWYgKG9wdHMudHJlYXROdWxsQXNFbXB0eVN0cmluZyAmJiBWID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgViA9PT0gXCJzeW1ib2xcIikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKF8oXCJpcyBhIHN5bWJvbCwgd2hpY2ggY2Fubm90IGJlIGNvbnZlcnRlZCB0byBhIHN0cmluZ1wiLCBvcHRzKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFN0cmluZyhWKTtcbn07XG5cbmV4cG9ydHMuQnl0ZVN0cmluZyA9IChWLCBvcHRzKSA9PiB7XG4gICAgY29uc3QgeCA9IGV4cG9ydHMuRE9NU3RyaW5nKFYsIG9wdHMpO1xuICAgIGxldCBjO1xuICAgIGZvciAobGV0IGkgPSAwOyAoYyA9IHguY29kZVBvaW50QXQoaSkpICE9PSB1bmRlZmluZWQ7ICsraSkge1xuICAgICAgICBpZiAoYyA+IDI1NSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihfKFwiaXMgbm90IGEgdmFsaWQgQnl0ZVN0cmluZ1wiLCBvcHRzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4geDtcbn07XG5cbmV4cG9ydHMuVVNWU3RyaW5nID0gKFYsIG9wdHMpID0+IHtcbiAgICBjb25zdCBTID0gZXhwb3J0cy5ET01TdHJpbmcoViwgb3B0cyk7XG4gICAgY29uc3QgbiA9IFMubGVuZ3RoO1xuICAgIGNvbnN0IFUgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgICBjb25zdCBjID0gUy5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoYyA8IDB4RDgwMCB8fCBjID4gMHhERkZGKSB7XG4gICAgICAgICAgICBVLnB1c2goU3RyaW5nLmZyb21Db2RlUG9pbnQoYykpO1xuICAgICAgICB9IGVsc2UgaWYgKDB4REMwMCA8PSBjICYmIGMgPD0gMHhERkZGKSB7XG4gICAgICAgICAgICBVLnB1c2goU3RyaW5nLmZyb21Db2RlUG9pbnQoMHhGRkZEKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gbiAtIDEpIHtcbiAgICAgICAgICAgIFUucHVzaChTdHJpbmcuZnJvbUNvZGVQb2ludCgweEZGRkQpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGQgPSBTLmNoYXJDb2RlQXQoaSArIDEpO1xuICAgICAgICAgICAgaWYgKDB4REMwMCA8PSBkICYmIGQgPD0gMHhERkZGKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYSA9IGMgJiAweDNGRjtcbiAgICAgICAgICAgICAgICBjb25zdCBiID0gZCAmIDB4M0ZGO1xuICAgICAgICAgICAgICAgIFUucHVzaChTdHJpbmcuZnJvbUNvZGVQb2ludCgoMiA8PCAxNSkgKyAoKDIgPDwgOSkgKiBhKSArIGIpKTtcbiAgICAgICAgICAgICAgICArK2k7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFUucHVzaChTdHJpbmcuZnJvbUNvZGVQb2ludCgweEZGRkQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBVLmpvaW4oXCJcIik7XG59O1xuXG5leHBvcnRzLm9iamVjdCA9IChWLCBvcHRzKSA9PiB7XG4gICAgaWYgKHR5cGUoVikgIT09IFwiT2JqZWN0XCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihfKFwiaXMgbm90IGFuIG9iamVjdFwiLCBvcHRzKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFY7XG59O1xuXG4vLyBOb3QgZXhwb3J0ZWQsIGJ1dCB1c2VkIGluIEZ1bmN0aW9uIGFuZCBWb2lkRnVuY3Rpb24uXG5cbi8vIE5laXRoZXIgRnVuY3Rpb24gbm9yIFZvaWRGdW5jdGlvbiBpcyBkZWZpbmVkIHdpdGggW1RyZWF0Tm9uT2JqZWN0QXNOdWxsXSwgc29cbi8vIGhhbmRsaW5nIGZvciB0aGF0IGlzIG9taXR0ZWQuXG5mdW5jdGlvbiBjb252ZXJ0Q2FsbGJhY2tGdW5jdGlvbihWLCBvcHRzKSB7XG4gICAgaWYgKHR5cGVvZiBWICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihfKFwiaXMgbm90IGEgZnVuY3Rpb25cIiwgb3B0cykpO1xuICAgIH1cbiAgICByZXR1cm4gVjtcbn1cblxuW1xuICAgIEVycm9yLFxuICAgIEFycmF5QnVmZmVyLCAvLyBUaGUgSXNEZXRhY2hlZEJ1ZmZlciBhYnN0cmFjdCBvcGVyYXRpb24gaXMgbm90IGV4cG9zZWQgaW4gSlNcbiAgICBEYXRhVmlldywgSW50OEFycmF5LCBJbnQxNkFycmF5LCBJbnQzMkFycmF5LCBVaW50OEFycmF5LFxuICAgIFVpbnQxNkFycmF5LCBVaW50MzJBcnJheSwgVWludDhDbGFtcGVkQXJyYXksIEZsb2F0MzJBcnJheSwgRmxvYXQ2NEFycmF5XG5dLmZvckVhY2goZnVuYyA9PiB7XG4gICAgY29uc3QgbmFtZSA9IGZ1bmMubmFtZTtcbiAgICBjb25zdCBhcnRpY2xlID0gL15bQUVJT1VdLy50ZXN0KG5hbWUpID8gXCJhblwiIDogXCJhXCI7XG4gICAgZXhwb3J0c1tuYW1lXSA9IChWLCBvcHRzKSA9PiB7XG4gICAgICAgIGlmICghKFYgaW5zdGFuY2VvZiBmdW5jKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihfKGBpcyBub3QgJHthcnRpY2xlfSAke25hbWV9IG9iamVjdGAsIG9wdHMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBWO1xuICAgIH07XG59KTtcblxuLy8gQ29tbW9uIGRlZmluaXRpb25zXG5cbmV4cG9ydHMuQXJyYXlCdWZmZXJWaWV3ID0gKFYsIG9wdHMpID0+IHtcbiAgICBpZiAoIUFycmF5QnVmZmVyLmlzVmlldyhWKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKF8oXCJpcyBub3QgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyIG9iamVjdFwiLCBvcHRzKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFY7XG59O1xuXG5leHBvcnRzLkJ1ZmZlclNvdXJjZSA9IChWLCBvcHRzKSA9PiB7XG4gICAgaWYgKCEoQXJyYXlCdWZmZXIuaXNWaWV3KFYpIHx8IFYgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihfKFwiaXMgbm90IGFuIEFycmF5QnVmZmVyIG9iamVjdCBvciBhIHZpZXcgb24gb25lXCIsIG9wdHMpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gVjtcbn07XG5cbmV4cG9ydHMuRE9NVGltZVN0YW1wID0gZXhwb3J0c1tcInVuc2lnbmVkIGxvbmcgbG9uZ1wiXTtcblxuZXhwb3J0cy5GdW5jdGlvbiA9IGNvbnZlcnRDYWxsYmFja0Z1bmN0aW9uO1xuXG5leHBvcnRzLlZvaWRGdW5jdGlvbiA9IGNvbnZlcnRDYWxsYmFja0Z1bmN0aW9uO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG50cnkge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL2J1aWxkL0RlYnVnL3dydGMubm9kZScpO1xufSBjYXRjaCAoZXJyb3IpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9idWlsZC9SZWxlYXNlL3dydGMubm9kZScpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBSVENEYXRhQ2hhbm5lbEV2ZW50KHR5cGUsIGV2ZW50SW5pdERpY3QpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgIGJ1YmJsZXM6IHtcbiAgICAgIHZhbHVlOiBmYWxzZVxuICAgIH0sXG4gICAgY2FuY2VsYWJsZToge1xuICAgICAgdmFsdWU6IGZhbHNlXG4gICAgfSxcbiAgICB0eXBlOiB7XG4gICAgICB2YWx1ZTogdHlwZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIGNoYW5uZWw6IHtcbiAgICAgIHZhbHVlOiBldmVudEluaXREaWN0LmNoYW5uZWwsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSVENEYXRhQ2hhbm5lbEV2ZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXG4gKiBAYXV0aG9yIEplc8O6cyBMZWdhbsOpcyBDb21iYXJybyBcIlBpcmFubmFcIiA8cGlyYW5uYUBnbWFpbC5jb20+XG4gKi9cblxuZnVuY3Rpb24gRXZlbnRUYXJnZXQoKSB7XG4gIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xufVxuXG5FdmVudFRhcmdldC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzIHx8IHt9O1xuXG4gIGlmICghbGlzdGVuZXJzW3R5cGVdKSB7XG4gICAgbGlzdGVuZXJzW3R5cGVdID0gbmV3IFNldCgpO1xuICB9XG5cbiAgbGlzdGVuZXJzW3R5cGVdLmFkZChsaXN0ZW5lcik7XG59O1xuXG5FdmVudFRhcmdldC5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uIGRpc3BhdGNoRXZlbnQoZXZlbnQpIHtcbiAgbGV0IGxpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycyA9IHRoaXMuX2xpc3RlbmVycyB8fCB7fTtcblxuICBwcm9jZXNzLm5leHRUaWNrKCgpID0+IHtcbiAgICBsaXN0ZW5lcnMgPSBuZXcgU2V0KGxpc3RlbmVyc1tldmVudC50eXBlXSB8fCBbXSk7XG5cbiAgICBjb25zdCBkdW1teUxpc3RlbmVyID0gdGhpc1snb24nICsgZXZlbnQudHlwZV07XG4gICAgaWYgKHR5cGVvZiBkdW1teUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBsaXN0ZW5lcnMuYWRkKGR1bW15TGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mb3JFYWNoKGxpc3RlbmVyID0+IHtcbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09ICdvYmplY3QnICYmIHR5cGVvZiBsaXN0ZW5lci5oYW5kbGVFdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBsaXN0ZW5lci5oYW5kbGVFdmVudChldmVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5FdmVudFRhcmdldC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzIHx8IHt9O1xuICBpZiAobGlzdGVuZXJzW3R5cGVdKSB7XG4gICAgbGlzdGVuZXJzW3R5cGVdLmRlbGV0ZShsaXN0ZW5lcik7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRUYXJnZXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIFJUQ0ljZUNhbmRpZGF0ZShjYW5kaWRhdGVJbml0RGljdCkge1xuICBbXG4gICAgJ2NhbmRpZGF0ZScsXG4gICAgJ3NkcE1pZCcsXG4gICAgJ3NkcE1MaW5lSW5kZXgnLFxuICAgICdmb3VuZGF0aW9uJyxcbiAgICAnY29tcG9uZW50JyxcbiAgICAncHJpb3JpdHknLFxuICAgICdhZGRyZXNzJyxcbiAgICAncHJvdG9jb2wnLFxuICAgICdwb3J0JyxcbiAgICAndHlwZScsXG4gICAgJ3RjcFR5cGUnLFxuICAgICdyZWxhdGVkQWRkcmVzcycsXG4gICAgJ3JlbGF0ZWRQb3J0JyxcbiAgICAndXNlcm5hbWVGcmFnbWVudCdcbiAgXS5mb3JFYWNoKHByb3BlcnR5ID0+IHtcbiAgICBpZiAoY2FuZGlkYXRlSW5pdERpY3QgJiYgcHJvcGVydHkgaW4gY2FuZGlkYXRlSW5pdERpY3QpIHtcbiAgICAgIHRoaXNbcHJvcGVydHldID0gY2FuZGlkYXRlSW5pdERpY3RbcHJvcGVydHldO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzW3Byb3BlcnR5XSA9IG51bGw7XG4gICAgfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSVENJY2VDYW5kaWRhdGU7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgaW5oZXJpdHMgfSA9IHJlcXVpcmUoJ3V0aWwnKTtcblxuY29uc3Qge1xuICBNZWRpYVN0cmVhbSxcbiAgTWVkaWFTdHJlYW1UcmFjayxcbiAgUlRDQXVkaW9TaW5rLFxuICBSVENBdWRpb1NvdXJjZSxcbiAgUlRDRGF0YUNoYW5uZWwsXG4gIFJUQ0R0bHNUcmFuc3BvcnQsXG4gIFJUQ0ljZVRyYW5zcG9ydCxcbiAgUlRDUnRwUmVjZWl2ZXIsXG4gIFJUQ1J0cFNlbmRlcixcbiAgUlRDUnRwVHJhbnNjZWl2ZXIsXG4gIFJUQ1NjdHBUcmFuc3BvcnQsXG4gIFJUQ1ZpZGVvU2luayxcbiAgUlRDVmlkZW9Tb3VyY2UsXG4gIGdldFVzZXJNZWRpYSxcbiAgaTQyMFRvUmdiYSxcbiAgcmdiYVRvSTQyMCxcbiAgc2V0RE9NRXhjZXB0aW9uXG59ID0gcmVxdWlyZSgnLi9iaW5kaW5nJyk7XG5cbmNvbnN0IEV2ZW50VGFyZ2V0ID0gcmVxdWlyZSgnLi9ldmVudHRhcmdldCcpO1xuY29uc3QgTWVkaWFEZXZpY2VzID0gcmVxdWlyZSgnLi9tZWRpYWRldmljZXMnKTtcblxuaW5oZXJpdHMoTWVkaWFTdHJlYW0sIEV2ZW50VGFyZ2V0KTtcbmluaGVyaXRzKE1lZGlhU3RyZWFtVHJhY2ssIEV2ZW50VGFyZ2V0KTtcbmluaGVyaXRzKFJUQ0F1ZGlvU2luaywgRXZlbnRUYXJnZXQpO1xuaW5oZXJpdHMoUlRDRGF0YUNoYW5uZWwsIEV2ZW50VGFyZ2V0KTtcbmluaGVyaXRzKFJUQ0R0bHNUcmFuc3BvcnQsIEV2ZW50VGFyZ2V0KTtcbmluaGVyaXRzKFJUQ0ljZVRyYW5zcG9ydCwgRXZlbnRUYXJnZXQpO1xuaW5oZXJpdHMoUlRDU2N0cFRyYW5zcG9ydCwgRXZlbnRUYXJnZXQpO1xuaW5oZXJpdHMoUlRDVmlkZW9TaW5rLCBFdmVudFRhcmdldCk7XG5cbnRyeSB7XG4gIHNldERPTUV4Y2VwdGlvbihyZXF1aXJlKCdkb21leGNlcHRpb24nKSk7XG59IGNhdGNoIChlcnJvcikge1xuICAvLyBEbyBub3RoaW5nXG59XG5cbi8vIE5PVEUobXJvYmVydHMpOiBIZXJlJ3MgYSBoYWNrIHRvIHN1cHBvcnQganNkb20ncyBCbG9iIGltcGxlbWVudGF0aW9uLlxuUlRDRGF0YUNoYW5uZWwucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiBzZW5kKGRhdGEpIHtcbiAgY29uc3QgaW1wbFN5bWJvbCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZGF0YSkuZmluZChzeW1ib2wgPT4gc3ltYm9sLnRvU3RyaW5nKCkgPT09ICdTeW1ib2woaW1wbCknKTtcbiAgaWYgKGRhdGFbaW1wbFN5bWJvbF0gJiYgZGF0YVtpbXBsU3ltYm9sXS5fYnVmZmVyKSB7XG4gICAgZGF0YSA9IGRhdGFbaW1wbFN5bWJvbF0uX2J1ZmZlcjtcbiAgfVxuICB0aGlzLl9zZW5kKGRhdGEpO1xufTtcblxuY29uc3QgbWVkaWFEZXZpY2VzID0gbmV3IE1lZGlhRGV2aWNlcygpO1xuXG5jb25zdCBub25zdGFuZGFyZCA9IHtcbiAgaTQyMFRvUmdiYSxcbiAgUlRDQXVkaW9TaW5rLFxuICBSVENBdWRpb1NvdXJjZSxcbiAgUlRDVmlkZW9TaW5rLFxuICBSVENWaWRlb1NvdXJjZSxcbiAgcmdiYVRvSTQyMFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIE1lZGlhU3RyZWFtLFxuICBNZWRpYVN0cmVhbVRyYWNrLFxuICBSVENEYXRhQ2hhbm5lbCxcbiAgUlRDRGF0YUNoYW5uZWxFdmVudDogcmVxdWlyZSgnLi9kYXRhY2hhbm5lbGV2ZW50JyksXG4gIFJUQ0R0bHNUcmFuc3BvcnQsXG4gIFJUQ0ljZUNhbmRpZGF0ZTogcmVxdWlyZSgnLi9pY2VjYW5kaWRhdGUnKSxcbiAgUlRDSWNlVHJhbnNwb3J0LFxuICBSVENQZWVyQ29ubmVjdGlvbjogcmVxdWlyZSgnLi9wZWVyY29ubmVjdGlvbicpLFxuICBSVENQZWVyQ29ubmVjdGlvbkljZUV2ZW50OiByZXF1aXJlKCcuL3J0Y3BlZXJjb25uZWN0aW9uaWNlZXZlbnQnKSxcbiAgUlRDUnRwUmVjZWl2ZXIsXG4gIFJUQ1J0cFNlbmRlcixcbiAgUlRDUnRwVHJhbnNjZWl2ZXIsXG4gIFJUQ1NjdHBUcmFuc3BvcnQsXG4gIFJUQ1Nlc3Npb25EZXNjcmlwdGlvbjogcmVxdWlyZSgnLi9zZXNzaW9uZGVzY3JpcHRpb24nKSxcbiAgZ2V0VXNlck1lZGlhLFxuICBtZWRpYURldmljZXMsXG4gIG5vbnN0YW5kYXJkLFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGluaGVyaXRzID0gcmVxdWlyZSgndXRpbCcpLmluaGVyaXRzO1xuXG5jb25zdCB7IGdldERpc3BsYXlNZWRpYSwgZ2V0VXNlck1lZGlhIH0gPSByZXF1aXJlKCcuL2JpbmRpbmcnKTtcblxudmFyIEV2ZW50VGFyZ2V0ID0gcmVxdWlyZSgnLi9ldmVudHRhcmdldCcpO1xuXG5mdW5jdGlvbiBNZWRpYURldmljZXMoKSB7fVxuXG5pbmhlcml0cyhNZWRpYURldmljZXMsIEV2ZW50VGFyZ2V0KTtcblxuTWVkaWFEZXZpY2VzLnByb3RvdHlwZS5lbnVtZXJhdGVEZXZpY2VzID0gZnVuY3Rpb24gZW51bWVyYXRlRGV2aWNlcygpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdOb3QgeWV0IGltcGxlbWVudGVkOyBmaWxlIGEgZmVhdHVyZSByZXF1ZXN0IGFnYWluc3Qgbm9kZS13ZWJydGMnKTtcbn07XG5cbk1lZGlhRGV2aWNlcy5wcm90b3R5cGUuZ2V0U3VwcG9ydGVkQ29uc3RyYWludHMgPSBmdW5jdGlvbiBnZXRTdXBwb3J0ZWRDb25zdHJhaW50cygpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdOb3QgeWV0IGltcGxlbWVudGVkOyBmaWxlIGEgZmVhdHVyZSByZXF1ZXN0IGFnYWluc3Qgbm9kZS13ZWJydGMnKTtcbn07XG5cbk1lZGlhRGV2aWNlcy5wcm90b3R5cGUuZ2V0RGlzcGxheU1lZGlhID0gZ2V0RGlzcGxheU1lZGlhO1xuTWVkaWFEZXZpY2VzLnByb3RvdHlwZS5nZXRVc2VyTWVkaWEgPSBnZXRVc2VyTWVkaWE7XG5cbm1vZHVsZS5leHBvcnRzID0gTWVkaWFEZXZpY2VzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5oZXJpdHMgPSByZXF1aXJlKCd1dGlsJykuaW5oZXJpdHM7XG5cbnZhciBfd2VicnRjID0gcmVxdWlyZSgnLi9iaW5kaW5nJyk7XG5cbnZhciBFdmVudFRhcmdldCA9IHJlcXVpcmUoJy4vZXZlbnR0YXJnZXQnKTtcblxudmFyIFJUQ0RhdGFDaGFubmVsRXZlbnQgPSByZXF1aXJlKCcuL2RhdGFjaGFubmVsZXZlbnQnKTtcbnZhciBSVENJY2VDYW5kaWRhdGUgPSByZXF1aXJlKCcuL2ljZWNhbmRpZGF0ZScpO1xudmFyIFJUQ1BlZXJDb25uZWN0aW9uSWNlRXZlbnQgPSByZXF1aXJlKCcuL3J0Y3BlZXJjb25uZWN0aW9uaWNlZXZlbnQnKTtcbnZhciBSVENQZWVyQ29ubmVjdGlvbkljZUVycm9yRXZlbnQgPSByZXF1aXJlKCcuL3J0Y3BlZXJjb25uZWN0aW9uaWNlZXJyb3JldmVudCcpO1xudmFyIFJUQ1Nlc3Npb25EZXNjcmlwdGlvbiA9IHJlcXVpcmUoJy4vc2Vzc2lvbmRlc2NyaXB0aW9uJyk7XG5cbmZ1bmN0aW9uIFJUQ1BlZXJDb25uZWN0aW9uKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBwYyA9IG5ldyBfd2VicnRjLlJUQ1BlZXJDb25uZWN0aW9uKGFyZ3VtZW50c1swXSB8fCB7fSk7XG5cbiAgRXZlbnRUYXJnZXQuY2FsbCh0aGlzKTtcblxuICAvL1xuICAvLyBBdHRhY2ggZXZlbnRzIHRvIHRoZSBuYXRpdmUgUGVlckNvbm5lY3Rpb24gb2JqZWN0XG4gIC8vXG4gIHBjLm9udHJhY2sgPSBmdW5jdGlvbiBvbnRyYWNrKHJlY2VpdmVyLCBzdHJlYW1zLCB0cmFuc2NlaXZlcikge1xuICAgIHNlbGYuZGlzcGF0Y2hFdmVudCh7XG4gICAgICB0eXBlOiAndHJhY2snLFxuICAgICAgdHJhY2s6IHJlY2VpdmVyLnRyYWNrLFxuICAgICAgcmVjZWl2ZXI6IHJlY2VpdmVyLFxuICAgICAgc3RyZWFtczogc3RyZWFtcyxcbiAgICAgIHRyYW5zY2VpdmVyOiB0cmFuc2NlaXZlclxuICAgIH0pO1xuICB9O1xuXG4gIHBjLm9uY29ubmVjdGlvbnN0YXRlY2hhbmdlID0gZnVuY3Rpb24gb25jb25uZWN0aW9uc3RhdGVjaGFuZ2UoKSB7XG4gICAgc2VsZi5kaXNwYXRjaEV2ZW50KHsgdHlwZTogJ2Nvbm5lY3Rpb25zdGF0ZWNoYW5nZScgfSk7XG4gIH07XG5cbiAgcGMub25pY2VjYW5kaWRhdGUgPSBmdW5jdGlvbiBvbmljZWNhbmRpZGF0ZShjYW5kaWRhdGUpIHtcbiAgICB2YXIgaWNlY2FuZGlkYXRlID0gbmV3IFJUQ0ljZUNhbmRpZGF0ZShjYW5kaWRhdGUpO1xuICAgIHNlbGYuZGlzcGF0Y2hFdmVudChuZXcgUlRDUGVlckNvbm5lY3Rpb25JY2VFdmVudCgnaWNlY2FuZGlkYXRlJywgeyBjYW5kaWRhdGU6IGljZWNhbmRpZGF0ZSwgdGFyZ2V0OiBzZWxmIH0pKTtcbiAgfTtcblxuICBwYy5vbmljZWNhbmRpZGF0ZWVycm9yID0gZnVuY3Rpb24gb25pY2VjYW5kaWRhdGVlcnJvcihldmVudEluaXREaWN0KSB7XG4gICAgdmFyIHBhaXIgPSBldmVudEluaXREaWN0Lmhvc3RDYW5kaWRhdGUuc3BsaXQoJzonKTtcbiAgICBldmVudEluaXREaWN0LmFkZHJlc3MgPSBwYWlyWzBdO1xuICAgIGV2ZW50SW5pdERpY3QucG9ydCA9IHBhaXJbMV07XG4gICAgdmFyIGljZWNhbmRpZGF0ZWVycm9yID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uSWNlRXJyb3JFdmVudCgnaWNlY2FuZGlkYXRlZXJyb3InLCBldmVudEluaXREaWN0KTtcbiAgICBzZWxmLmRpc3BhdGNoRXZlbnQoaWNlY2FuZGlkYXRlZXJyb3IpO1xuICB9O1xuXG4gIHBjLm9uc2lnbmFsaW5nc3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiBvbnNpZ25hbGluZ3N0YXRlY2hhbmdlKCkge1xuICAgIHNlbGYuZGlzcGF0Y2hFdmVudCh7IHR5cGU6ICdzaWduYWxpbmdzdGF0ZWNoYW5nZScsIHRhcmdldDogc2VsZiB9KTtcbiAgfTtcblxuICBwYy5vbmljZWNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIG9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlKCkge1xuICAgIHNlbGYuZGlzcGF0Y2hFdmVudCh7IHR5cGU6ICdpY2Vjb25uZWN0aW9uc3RhdGVjaGFuZ2UnLCB0YXJnZXQ6IHNlbGYgfSk7XG4gIH07XG5cbiAgcGMub25pY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uIG9uaWNlZ2F0aGVyaW5nc3RhdGVjaGFuZ2UoKSB7XG4gICAgc2VsZi5kaXNwYXRjaEV2ZW50KHsgdHlwZTogJ2ljZWdhdGhlcmluZ3N0YXRlY2hhbmdlJywgdGFyZ2V0OiBzZWxmIH0pO1xuXG4gICAgLy8gaWYgd2UgaGF2ZSBjb21wbGV0ZWQgZ2F0aGVyaW5nIGNhbmRpZGF0ZXMsIHRyaWdnZXIgYSBudWxsIGNhbmRpZGF0ZSBldmVudFxuICAgIGlmIChzZWxmLmljZUdhdGhlcmluZ1N0YXRlID09PSAnY29tcGxldGUnICYmIHNlbGYuY29ubmVjdGlvblN0YXRlICE9PSAnY2xvc2VkJykge1xuICAgICAgc2VsZi5kaXNwYXRjaEV2ZW50KG5ldyBSVENQZWVyQ29ubmVjdGlvbkljZUV2ZW50KCdpY2VjYW5kaWRhdGUnLCB7IGNhbmRpZGF0ZTogbnVsbCwgdGFyZ2V0OiBzZWxmIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgcGMub25uZWdvdGlhdGlvbm5lZWRlZCA9IGZ1bmN0aW9uIG9ubmVnb3RpYXRpb25uZWVkZWQoKSB7XG4gICAgc2VsZi5kaXNwYXRjaEV2ZW50KHsgdHlwZTogJ25lZ290aWF0aW9ubmVlZGVkJywgdGFyZ2V0OiBzZWxmIH0pO1xuICB9O1xuXG4gIC8vIFtUb0RvXSBvbm5lZ290aWF0aW9ubmVlZGVkXG5cbiAgcGMub25kYXRhY2hhbm5lbCA9IGZ1bmN0aW9uIG9uZGF0YWNoYW5uZWwoY2hhbm5lbCkge1xuICAgIHNlbGYuZGlzcGF0Y2hFdmVudChuZXcgUlRDRGF0YUNoYW5uZWxFdmVudCgnZGF0YWNoYW5uZWwnLCB7IGNoYW5uZWwgfSkpO1xuICB9O1xuXG4gIC8vXG4gIC8vIFBlZXJDb25uZWN0aW9uIHByb3BlcnRpZXMgJiBhdHRyaWJ1dGVzXG4gIC8vXG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgIF9wYzoge1xuICAgICAgdmFsdWU6IHBjXG4gICAgfSxcbiAgICBjYW5Ucmlja2xlSWNlQ2FuZGlkYXRlczoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXRDYW5Ucmlja2xlSWNlQ2FuZGlkYXRlcygpIHtcbiAgICAgICAgcmV0dXJuIHBjLmNhblRyaWNrbGVJY2VDYW5kaWRhdGVzO1xuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIGNvbm5lY3Rpb25TdGF0ZToge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXRDb25uZWN0aW9uU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiBwYy5jb25uZWN0aW9uU3RhdGU7XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgY3VycmVudExvY2FsRGVzY3JpcHRpb246IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0Q3VycmVudExvY2FsRGVzY3JpcHRpb24oKSB7XG4gICAgICAgIHJldHVybiBwYy5jdXJyZW50TG9jYWxEZXNjcmlwdGlvblxuICAgICAgICAgID8gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihwYy5jdXJyZW50TG9jYWxEZXNjcmlwdGlvbilcbiAgICAgICAgICA6IG51bGw7XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgbG9jYWxEZXNjcmlwdGlvbjoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXRMb2NhbERlc2NyaXB0aW9uKCkge1xuICAgICAgICByZXR1cm4gcGMubG9jYWxEZXNjcmlwdGlvblxuICAgICAgICAgID8gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihwYy5sb2NhbERlc2NyaXB0aW9uKVxuICAgICAgICAgIDogbnVsbDtcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBwZW5kaW5nTG9jYWxEZXNjcmlwdGlvbjoge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXRQZW5kaW5nTG9jYWxEZXNjcmlwdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHBjLnBlbmRpbmdMb2NhbERlc2NyaXB0aW9uXG4gICAgICAgICAgPyBuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHBjLnBlbmRpbmdMb2NhbERlc2NyaXB0aW9uKVxuICAgICAgICAgIDogbnVsbDtcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBjdXJyZW50UmVtb3RlRGVzY3JpcHRpb246IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0Q3VycmVudFJlbW90ZURlc2NyaXB0aW9uKCkge1xuICAgICAgICByZXR1cm4gcGMuY3VycmVudFJlbW90ZURlc2NyaXB0aW9uXG4gICAgICAgICAgPyBuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKHBjLmN1cnJlbnRSZW1vdGVEZXNjcmlwdGlvbilcbiAgICAgICAgICA6IG51bGw7XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgcmVtb3RlRGVzY3JpcHRpb246IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0UmVtb3RlRGVzY3JpcHRpb24oKSB7XG4gICAgICAgIHJldHVybiBwYy5yZW1vdGVEZXNjcmlwdGlvblxuICAgICAgICAgID8gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihwYy5yZW1vdGVEZXNjcmlwdGlvbilcbiAgICAgICAgICA6IG51bGw7XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgcGVuZGluZ1JlbW90ZURlc2NyaXB0aW9uOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldFBlbmRpbmdSZW1vdGVEZXNjcmlwdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHBjLnBlbmRpbmdSZW1vdGVEZXNjcmlwdGlvblxuICAgICAgICAgID8gbmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihwYy5wZW5kaW5nUmVtb3RlRGVzY3JpcHRpb24pXG4gICAgICAgICAgOiBudWxsO1xuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIHNpZ25hbGluZ1N0YXRlOiB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldFNpZ25hbGluZ1N0YXRlKCkge1xuICAgICAgICByZXR1cm4gcGMuc2lnbmFsaW5nU3RhdGU7XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgcmVhZHlTdGF0ZToge1xuICAgICAgZ2V0OiBmdW5jdGlvbiBnZXRSZWFkeVN0YXRlKCkge1xuICAgICAgICByZXR1cm4gcGMuZ2V0UmVhZHlTdGF0ZSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2N0cDoge1xuICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHBjLnNjdHA7XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgaWNlR2F0aGVyaW5nU3RhdGU6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0SWNlR2F0aGVyaW5nU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiBwYy5pY2VHYXRoZXJpbmdTdGF0ZTtcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBpY2VDb25uZWN0aW9uU3RhdGU6IHtcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0SWNlQ29ubmVjdGlvblN0YXRlKCkge1xuICAgICAgICByZXR1cm4gcGMuaWNlQ29ubmVjdGlvblN0YXRlO1xuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIG9uY29ubmVjdGlvbnN0YXRlY2hhbmdlOiB7XG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgb25kYXRhY2hhbm5lbDoge1xuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIG9uaWNlY29ubmVjdGlvbnN0YXRlY2hhbmdlOiB7XG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgb25pY2VnYXRoZXJpbmdzdGF0ZWNoYW5nZToge1xuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIG9ubmVnb3RpYXRpb25uZWVkZWQ6IHtcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBvbnNpZ25hbGluZ3N0YXRlY2hhbmdlOiB7XG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG59XG5cbmluaGVyaXRzKFJUQ1BlZXJDb25uZWN0aW9uLCBFdmVudFRhcmdldCk7XG5cbi8vIE5PVEUobXJvYmVydHMpOiBUaGlzIGlzIGEgYml0IG9mIGEgaGFjay5cblJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5vbnRyYWNrID0gbnVsbDtcblxuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZEljZUNhbmRpZGF0ZSA9IGZ1bmN0aW9uIGFkZEljZUNhbmRpZGF0ZShjYW5kaWRhdGUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzLl9wYy5hZGRJY2VDYW5kaWRhdGUoY2FuZGlkYXRlKTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICBwcm9taXNlLnRoZW4oYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICB9XG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLmFkZFRyYW5zY2VpdmVyID0gZnVuY3Rpb24gYWRkVHJhbnNjZWl2ZXIoKSB7XG4gIHJldHVybiB0aGlzLl9wYy5hZGRUcmFuc2NlaXZlci5hcHBseSh0aGlzLl9wYywgYXJndW1lbnRzKTtcbn07XG5cblJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5hZGRUcmFjayA9IGZ1bmN0aW9uIGFkZFRyYWNrKHRyYWNrLCAuLi5zdHJlYW1zKSB7XG4gIHJldHVybiB0aGlzLl9wYy5hZGRUcmFjayh0cmFjaywgc3RyZWFtcyk7XG59O1xuXG5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgdGhpcy5fcGMuY2xvc2UoKTtcbn07XG5cblJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5jcmVhdGVEYXRhQ2hhbm5lbCA9IGZ1bmN0aW9uIGNyZWF0ZURhdGFDaGFubmVsKCkge1xuICByZXR1cm4gdGhpcy5fcGMuY3JlYXRlRGF0YUNoYW5uZWwuYXBwbHkodGhpcy5fcGMsIGFyZ3VtZW50cyk7XG59O1xuXG5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlT2ZmZXIgPSBmdW5jdGlvbiBjcmVhdGVPZmZlcigpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID09PSAzXG4gICAgPyBhcmd1bWVudHNbMl1cbiAgICA6IGFyZ3VtZW50c1swXTtcbiAgdmFyIHByb21pc2UgPSB0aGlzLl9wYy5jcmVhdGVPZmZlcihvcHRpb25zIHx8IHt9KTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMikge1xuICAgIHByb21pc2UudGhlbihhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG4gIH1cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuY3JlYXRlQW5zd2VyID0gZnVuY3Rpb24gY3JlYXRlQW5zd2VyKCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDNcbiAgICA/IGFyZ3VtZW50c1syXVxuICAgIDogYXJndW1lbnRzWzBdO1xuICB2YXIgcHJvbWlzZSA9IHRoaXMuX3BjLmNyZWF0ZUFuc3dlcihvcHRpb25zIHx8IHt9KTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMikge1xuICAgIHByb21pc2UudGhlbihhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG4gIH1cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0Q29uZmlndXJhdGlvbiA9IGZ1bmN0aW9uIGdldENvbmZpZ3VyYXRpb24oKSB7XG4gIHJldHVybiB0aGlzLl9wYy5nZXRDb25maWd1cmF0aW9uKCk7XG59O1xuXG5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0UmVjZWl2ZXJzID0gZnVuY3Rpb24gZ2V0UmVjZWl2ZXJzKCkge1xuICByZXR1cm4gdGhpcy5fcGMuZ2V0UmVjZWl2ZXJzKCk7XG59O1xuXG5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U2VuZGVycyA9IGZ1bmN0aW9uIGdldFNlbmRlcnMoKSB7XG4gIHJldHVybiB0aGlzLl9wYy5nZXRTZW5kZXJzKCk7XG59O1xuXG5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0VHJhbnNjZWl2ZXJzID0gZnVuY3Rpb24gZ2V0VHJhbnNjZWl2ZXJzKCkge1xuICByZXR1cm4gdGhpcy5fcGMuZ2V0VHJhbnNjZWl2ZXJzKCk7XG59O1xuXG5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuZ2V0U3RhdHMgPSBmdW5jdGlvbiBnZXRTdGF0cygpIHtcbiAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLl9wYy5sZWdhY3lHZXRTdGF0cygpLnRoZW4oYXJndW1lbnRzWzBdLCBhcmd1bWVudHNbMV0pO1xuICAgIHJldHVybjtcbiAgfVxuICByZXR1cm4gdGhpcy5fcGMuZ2V0U3RhdHMoKTtcbn07XG5cblJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVUcmFjayA9IGZ1bmN0aW9uIHJlbW92ZVRyYWNrKHNlbmRlcikge1xuICB0aGlzLl9wYy5yZW1vdmVUcmFjayhzZW5kZXIpO1xufTtcblxuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldENvbmZpZ3VyYXRpb24gPSBmdW5jdGlvbiBzZXRDb25maWd1cmF0aW9uKGNvbmZpZ3VyYXRpb24pIHtcbiAgcmV0dXJuIHRoaXMuX3BjLnNldENvbmZpZ3VyYXRpb24oY29uZmlndXJhdGlvbik7XG59O1xuXG5SVENQZWVyQ29ubmVjdGlvbi5wcm90b3R5cGUuc2V0TG9jYWxEZXNjcmlwdGlvbiA9IGZ1bmN0aW9uIHNldExvY2FsRGVzY3JpcHRpb24oZGVzY3JpcHRpb24pIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzLl9wYy5zZXRMb2NhbERlc2NyaXB0aW9uKGRlc2NyaXB0aW9uKTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICBwcm9taXNlLnRoZW4oYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICB9XG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuUlRDUGVlckNvbm5lY3Rpb24ucHJvdG90eXBlLnNldFJlbW90ZURlc2NyaXB0aW9uID0gZnVuY3Rpb24gc2V0UmVtb3RlRGVzY3JpcHRpb24oZGVzY3JpcHRpb24pIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzLl9wYy5zZXRSZW1vdGVEZXNjcmlwdGlvbihkZXNjcmlwdGlvbik7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgcHJvbWlzZS50aGVuKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgfVxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cblJUQ1BlZXJDb25uZWN0aW9uLnByb3RvdHlwZS5yZXN0YXJ0SWNlID0gZnVuY3Rpb24gcmVzdGFydEljZSgpIHtcbiAgcmV0dXJuIHRoaXMuX3BjLnJlc3RhcnRJY2UoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUlRDUGVlckNvbm5lY3Rpb247XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIFJUQ1BlZXJDb25uZWN0aW9uSWNlRXJyb3JFdmVudCh0eXBlLCBldmVudEluaXREaWN0KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICB0eXBlOiB7XG4gICAgICB2YWx1ZTogdHlwZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIGFkZHJlc3M6IHtcbiAgICAgIHZhbHVlOiBldmVudEluaXREaWN0LmFkZHJlc3MsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBwb3J0OiB7XG4gICAgICB2YWx1ZTogZXZlbnRJbml0RGljdC5wb3J0LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgdXJsOiB7XG4gICAgICB2YWx1ZTogZXZlbnRJbml0RGljdC51cmwsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBlcnJvckNvZGU6IHtcbiAgICAgIHZhbHVlOiBldmVudEluaXREaWN0LmVycm9yQ29kZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIGVycm9yVGV4dDoge1xuICAgICAgdmFsdWU6IGV2ZW50SW5pdERpY3QuZXJyb3JUZXh0LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUlRDUGVlckNvbm5lY3Rpb25JY2VFcnJvckV2ZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBSVENQZWVyQ29ubmVjdGlvbkljZUV2ZW50KHR5cGUsIGV2ZW50SW5pdERpY3QpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgIHR5cGU6IHtcbiAgICAgIHZhbHVlOiB0eXBlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgY2FuZGlkYXRlOiB7XG4gICAgICB2YWx1ZTogZXZlbnRJbml0RGljdC5jYW5kaWRhdGUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICB0YXJnZXQ6IHtcbiAgICAgIHZhbHVlOiBldmVudEluaXREaWN0LnRhcmdldCxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJUQ1BlZXJDb25uZWN0aW9uSWNlRXZlbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihkZXNjcmlwdGlvbkluaXREaWN0KSB7XG4gIGlmIChkZXNjcmlwdGlvbkluaXREaWN0KSB7XG4gICAgdGhpcy50eXBlID0gZGVzY3JpcHRpb25Jbml0RGljdC50eXBlO1xuICAgIHRoaXMuc2RwID0gZGVzY3JpcHRpb25Jbml0RGljdC5zZHA7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSVENTZXNzaW9uRGVzY3JpcHRpb247XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFdlYlNvY2tldCA9IHJlcXVpcmUoJy4vbGliL3dlYnNvY2tldCcpO1xuXG5XZWJTb2NrZXQuY3JlYXRlV2ViU29ja2V0U3RyZWFtID0gcmVxdWlyZSgnLi9saWIvc3RyZWFtJyk7XG5XZWJTb2NrZXQuU2VydmVyID0gcmVxdWlyZSgnLi9saWIvd2Vic29ja2V0LXNlcnZlcicpO1xuV2ViU29ja2V0LlJlY2VpdmVyID0gcmVxdWlyZSgnLi9saWIvcmVjZWl2ZXInKTtcbldlYlNvY2tldC5TZW5kZXIgPSByZXF1aXJlKCcuL2xpYi9zZW5kZXInKTtcblxuV2ViU29ja2V0LldlYlNvY2tldCA9IFdlYlNvY2tldDtcbldlYlNvY2tldC5XZWJTb2NrZXRTZXJ2ZXIgPSBXZWJTb2NrZXQuU2VydmVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdlYlNvY2tldDtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgeyBFTVBUWV9CVUZGRVIgfSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbmNvbnN0IEZhc3RCdWZmZXIgPSBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdO1xuXG4vKipcbiAqIE1lcmdlcyBhbiBhcnJheSBvZiBidWZmZXJzIGludG8gYSBuZXcgYnVmZmVyLlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyW119IGxpc3QgVGhlIGFycmF5IG9mIGJ1ZmZlcnMgdG8gY29uY2F0XG4gKiBAcGFyYW0ge051bWJlcn0gdG90YWxMZW5ndGggVGhlIHRvdGFsIGxlbmd0aCBvZiBidWZmZXJzIGluIHRoZSBsaXN0XG4gKiBAcmV0dXJuIHtCdWZmZXJ9IFRoZSByZXN1bHRpbmcgYnVmZmVyXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIGNvbmNhdChsaXN0LCB0b3RhbExlbmd0aCkge1xuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHJldHVybiBFTVBUWV9CVUZGRVI7XG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkgcmV0dXJuIGxpc3RbMF07XG5cbiAgY29uc3QgdGFyZ2V0ID0gQnVmZmVyLmFsbG9jVW5zYWZlKHRvdGFsTGVuZ3RoKTtcbiAgbGV0IG9mZnNldCA9IDA7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYnVmID0gbGlzdFtpXTtcbiAgICB0YXJnZXQuc2V0KGJ1Ziwgb2Zmc2V0KTtcbiAgICBvZmZzZXQgKz0gYnVmLmxlbmd0aDtcbiAgfVxuXG4gIGlmIChvZmZzZXQgPCB0b3RhbExlbmd0aCkge1xuICAgIHJldHVybiBuZXcgRmFzdEJ1ZmZlcih0YXJnZXQuYnVmZmVyLCB0YXJnZXQuYnl0ZU9mZnNldCwgb2Zmc2V0KTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbi8qKlxuICogTWFza3MgYSBidWZmZXIgdXNpbmcgdGhlIGdpdmVuIG1hc2suXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IHNvdXJjZSBUaGUgYnVmZmVyIHRvIG1hc2tcbiAqIEBwYXJhbSB7QnVmZmVyfSBtYXNrIFRoZSBtYXNrIHRvIHVzZVxuICogQHBhcmFtIHtCdWZmZXJ9IG91dHB1dCBUaGUgYnVmZmVyIHdoZXJlIHRvIHN0b3JlIHRoZSByZXN1bHRcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQgVGhlIG9mZnNldCBhdCB3aGljaCB0byBzdGFydCB3cml0aW5nXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIFRoZSBudW1iZXIgb2YgYnl0ZXMgdG8gbWFzay5cbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gX21hc2soc291cmNlLCBtYXNrLCBvdXRwdXQsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBvdXRwdXRbb2Zmc2V0ICsgaV0gPSBzb3VyY2VbaV0gXiBtYXNrW2kgJiAzXTtcbiAgfVxufVxuXG4vKipcbiAqIFVubWFza3MgYSBidWZmZXIgdXNpbmcgdGhlIGdpdmVuIG1hc2suXG4gKlxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBUaGUgYnVmZmVyIHRvIHVubWFza1xuICogQHBhcmFtIHtCdWZmZXJ9IG1hc2sgVGhlIG1hc2sgdG8gdXNlXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIF91bm1hc2soYnVmZmVyLCBtYXNrKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgYnVmZmVyW2ldIF49IG1hc2tbaSAmIDNdO1xuICB9XG59XG5cbi8qKlxuICogQ29udmVydHMgYSBidWZmZXIgdG8gYW4gYEFycmF5QnVmZmVyYC5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmIFRoZSBidWZmZXIgdG8gY29udmVydFxuICogQHJldHVybiB7QXJyYXlCdWZmZXJ9IENvbnZlcnRlZCBidWZmZXJcbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gdG9BcnJheUJ1ZmZlcihidWYpIHtcbiAgaWYgKGJ1Zi5sZW5ndGggPT09IGJ1Zi5idWZmZXIuYnl0ZUxlbmd0aCkge1xuICAgIHJldHVybiBidWYuYnVmZmVyO1xuICB9XG5cbiAgcmV0dXJuIGJ1Zi5idWZmZXIuc2xpY2UoYnVmLmJ5dGVPZmZzZXQsIGJ1Zi5ieXRlT2Zmc2V0ICsgYnVmLmxlbmd0aCk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYGRhdGFgIHRvIGEgYEJ1ZmZlcmAuXG4gKlxuICogQHBhcmFtIHsqfSBkYXRhIFRoZSBkYXRhIHRvIGNvbnZlcnRcbiAqIEByZXR1cm4ge0J1ZmZlcn0gVGhlIGJ1ZmZlclxuICogQHRocm93cyB7VHlwZUVycm9yfVxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiB0b0J1ZmZlcihkYXRhKSB7XG4gIHRvQnVmZmVyLnJlYWRPbmx5ID0gdHJ1ZTtcblxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKGRhdGEpKSByZXR1cm4gZGF0YTtcblxuICBsZXQgYnVmO1xuXG4gIGlmIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICBidWYgPSBuZXcgRmFzdEJ1ZmZlcihkYXRhKTtcbiAgfSBlbHNlIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoZGF0YSkpIHtcbiAgICBidWYgPSBuZXcgRmFzdEJ1ZmZlcihkYXRhLmJ1ZmZlciwgZGF0YS5ieXRlT2Zmc2V0LCBkYXRhLmJ5dGVMZW5ndGgpO1xuICB9IGVsc2Uge1xuICAgIGJ1ZiA9IEJ1ZmZlci5mcm9tKGRhdGEpO1xuICAgIHRvQnVmZmVyLnJlYWRPbmx5ID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gYnVmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgY29uY2F0LFxuICBtYXNrOiBfbWFzayxcbiAgdG9BcnJheUJ1ZmZlcixcbiAgdG9CdWZmZXIsXG4gIHVubWFzazogX3VubWFza1xufTtcblxuLyogaXN0YW5idWwgaWdub3JlIGVsc2UgICovXG5pZiAoIXByb2Nlc3MuZW52LldTX05PX0JVRkZFUl9VVElMKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgYnVmZmVyVXRpbCA9IHJlcXVpcmUoJ2J1ZmZlcnV0aWwnKTtcblxuICAgIG1vZHVsZS5leHBvcnRzLm1hc2sgPSBmdW5jdGlvbiAoc291cmNlLCBtYXNrLCBvdXRwdXQsIG9mZnNldCwgbGVuZ3RoKSB7XG4gICAgICBpZiAobGVuZ3RoIDwgNDgpIF9tYXNrKHNvdXJjZSwgbWFzaywgb3V0cHV0LCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICBlbHNlIGJ1ZmZlclV0aWwubWFzayhzb3VyY2UsIG1hc2ssIG91dHB1dCwgb2Zmc2V0LCBsZW5ndGgpO1xuICAgIH07XG5cbiAgICBtb2R1bGUuZXhwb3J0cy51bm1hc2sgPSBmdW5jdGlvbiAoYnVmZmVyLCBtYXNrKSB7XG4gICAgICBpZiAoYnVmZmVyLmxlbmd0aCA8IDMyKSBfdW5tYXNrKGJ1ZmZlciwgbWFzayk7XG4gICAgICBlbHNlIGJ1ZmZlclV0aWwudW5tYXNrKGJ1ZmZlciwgbWFzayk7XG4gICAgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIENvbnRpbnVlIHJlZ2FyZGxlc3Mgb2YgdGhlIGVycm9yLlxuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBCSU5BUllfVFlQRVM6IFsnbm9kZWJ1ZmZlcicsICdhcnJheWJ1ZmZlcicsICdmcmFnbWVudHMnXSxcbiAgRU1QVFlfQlVGRkVSOiBCdWZmZXIuYWxsb2MoMCksXG4gIEdVSUQ6ICcyNThFQUZBNS1FOTE0LTQ3REEtOTVDQS1DNUFCMERDODVCMTEnLFxuICBrRm9yT25FdmVudEF0dHJpYnV0ZTogU3ltYm9sKCdrSXNGb3JPbkV2ZW50QXR0cmlidXRlJyksXG4gIGtMaXN0ZW5lcjogU3ltYm9sKCdrTGlzdGVuZXInKSxcbiAga1N0YXR1c0NvZGU6IFN5bWJvbCgnc3RhdHVzLWNvZGUnKSxcbiAga1dlYlNvY2tldDogU3ltYm9sKCd3ZWJzb2NrZXQnKSxcbiAgTk9PUDogKCkgPT4ge31cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsga0Zvck9uRXZlbnRBdHRyaWJ1dGUsIGtMaXN0ZW5lciB9ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcblxuY29uc3Qga0NvZGUgPSBTeW1ib2woJ2tDb2RlJyk7XG5jb25zdCBrRGF0YSA9IFN5bWJvbCgna0RhdGEnKTtcbmNvbnN0IGtFcnJvciA9IFN5bWJvbCgna0Vycm9yJyk7XG5jb25zdCBrTWVzc2FnZSA9IFN5bWJvbCgna01lc3NhZ2UnKTtcbmNvbnN0IGtSZWFzb24gPSBTeW1ib2woJ2tSZWFzb24nKTtcbmNvbnN0IGtUYXJnZXQgPSBTeW1ib2woJ2tUYXJnZXQnKTtcbmNvbnN0IGtUeXBlID0gU3ltYm9sKCdrVHlwZScpO1xuY29uc3Qga1dhc0NsZWFuID0gU3ltYm9sKCdrV2FzQ2xlYW4nKTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYW4gZXZlbnQuXG4gKi9cbmNsYXNzIEV2ZW50IHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBgRXZlbnRgLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICogQHRocm93cyB7VHlwZUVycm9yfSBJZiB0aGUgYHR5cGVgIGFyZ3VtZW50IGlzIG5vdCBzcGVjaWZpZWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICB0aGlzW2tUYXJnZXRdID0gbnVsbDtcbiAgICB0aGlzW2tUeXBlXSA9IHR5cGU7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUgeyp9XG4gICAqL1xuICBnZXQgdGFyZ2V0KCkge1xuICAgIHJldHVybiB0aGlzW2tUYXJnZXRdO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgdHlwZSgpIHtcbiAgICByZXR1cm4gdGhpc1trVHlwZV07XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50LnByb3RvdHlwZSwgJ3RhcmdldCcsIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudC5wcm90b3R5cGUsICd0eXBlJywgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIGNsb3NlIGV2ZW50LlxuICpcbiAqIEBleHRlbmRzIEV2ZW50XG4gKi9cbmNsYXNzIENsb3NlRXZlbnQgZXh0ZW5kcyBFdmVudCB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgYENsb3NlRXZlbnRgLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBBIGRpY3Rpb25hcnkgb2JqZWN0IHRoYXQgYWxsb3dzIGZvciBzZXR0aW5nXG4gICAqICAgICBhdHRyaWJ1dGVzIHZpYSBvYmplY3QgbWVtYmVycyBvZiB0aGUgc2FtZSBuYW1lXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5jb2RlPTBdIFRoZSBzdGF0dXMgY29kZSBleHBsYWluaW5nIHdoeSB0aGVcbiAgICogICAgIGNvbm5lY3Rpb24gd2FzIGNsb3NlZFxuICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucmVhc29uPScnXSBBIGh1bWFuLXJlYWRhYmxlIHN0cmluZyBleHBsYWluaW5nIHdoeVxuICAgKiAgICAgdGhlIGNvbm5lY3Rpb24gd2FzIGNsb3NlZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLndhc0NsZWFuPWZhbHNlXSBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdGhlXG4gICAqICAgICBjb25uZWN0aW9uIHdhcyBjbGVhbmx5IGNsb3NlZFxuICAgKi9cbiAgY29uc3RydWN0b3IodHlwZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgc3VwZXIodHlwZSk7XG5cbiAgICB0aGlzW2tDb2RlXSA9IG9wdGlvbnMuY29kZSA9PT0gdW5kZWZpbmVkID8gMCA6IG9wdGlvbnMuY29kZTtcbiAgICB0aGlzW2tSZWFzb25dID0gb3B0aW9ucy5yZWFzb24gPT09IHVuZGVmaW5lZCA/ICcnIDogb3B0aW9ucy5yZWFzb247XG4gICAgdGhpc1trV2FzQ2xlYW5dID0gb3B0aW9ucy53YXNDbGVhbiA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBvcHRpb25zLndhc0NsZWFuO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqL1xuICBnZXQgY29kZSgpIHtcbiAgICByZXR1cm4gdGhpc1trQ29kZV07XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGdldCByZWFzb24oKSB7XG4gICAgcmV0dXJuIHRoaXNba1JlYXNvbl07XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBnZXQgd2FzQ2xlYW4oKSB7XG4gICAgcmV0dXJuIHRoaXNba1dhc0NsZWFuXTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQ2xvc2VFdmVudC5wcm90b3R5cGUsICdjb2RlJywgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KENsb3NlRXZlbnQucHJvdG90eXBlLCAncmVhc29uJywgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KENsb3NlRXZlbnQucHJvdG90eXBlLCAnd2FzQ2xlYW4nLCB7IGVudW1lcmFibGU6IHRydWUgfSk7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGFuIGVycm9yIGV2ZW50LlxuICpcbiAqIEBleHRlbmRzIEV2ZW50XG4gKi9cbmNsYXNzIEVycm9yRXZlbnQgZXh0ZW5kcyBFdmVudCB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgYEVycm9yRXZlbnRgLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBBIGRpY3Rpb25hcnkgb2JqZWN0IHRoYXQgYWxsb3dzIGZvciBzZXR0aW5nXG4gICAqICAgICBhdHRyaWJ1dGVzIHZpYSBvYmplY3QgbWVtYmVycyBvZiB0aGUgc2FtZSBuYW1lXG4gICAqIEBwYXJhbSB7Kn0gW29wdGlvbnMuZXJyb3I9bnVsbF0gVGhlIGVycm9yIHRoYXQgZ2VuZXJhdGVkIHRoaXMgZXZlbnRcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLm1lc3NhZ2U9JyddIFRoZSBlcnJvciBtZXNzYWdlXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0eXBlLCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcih0eXBlKTtcblxuICAgIHRoaXNba0Vycm9yXSA9IG9wdGlvbnMuZXJyb3IgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBvcHRpb25zLmVycm9yO1xuICAgIHRoaXNba01lc3NhZ2VdID0gb3B0aW9ucy5tZXNzYWdlID09PSB1bmRlZmluZWQgPyAnJyA6IG9wdGlvbnMubWVzc2FnZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7Kn1cbiAgICovXG4gIGdldCBlcnJvcigpIHtcbiAgICByZXR1cm4gdGhpc1trRXJyb3JdO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgbWVzc2FnZSgpIHtcbiAgICByZXR1cm4gdGhpc1trTWVzc2FnZV07XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEVycm9yRXZlbnQucHJvdG90eXBlLCAnZXJyb3InLCB7IGVudW1lcmFibGU6IHRydWUgfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXJyb3JFdmVudC5wcm90b3R5cGUsICdtZXNzYWdlJywgeyBlbnVtZXJhYmxlOiB0cnVlIH0pO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIG1lc3NhZ2UgZXZlbnQuXG4gKlxuICogQGV4dGVuZHMgRXZlbnRcbiAqL1xuY2xhc3MgTWVzc2FnZUV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGBNZXNzYWdlRXZlbnRgLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBUaGUgbmFtZSBvZiB0aGUgZXZlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBBIGRpY3Rpb25hcnkgb2JqZWN0IHRoYXQgYWxsb3dzIGZvciBzZXR0aW5nXG4gICAqICAgICBhdHRyaWJ1dGVzIHZpYSBvYmplY3QgbWVtYmVycyBvZiB0aGUgc2FtZSBuYW1lXG4gICAqIEBwYXJhbSB7Kn0gW29wdGlvbnMuZGF0YT1udWxsXSBUaGUgbWVzc2FnZSBjb250ZW50XG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0eXBlLCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcih0eXBlKTtcblxuICAgIHRoaXNba0RhdGFdID0gb3B0aW9ucy5kYXRhID09PSB1bmRlZmluZWQgPyBudWxsIDogb3B0aW9ucy5kYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHsqfVxuICAgKi9cbiAgZ2V0IGRhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXNba0RhdGFdO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShNZXNzYWdlRXZlbnQucHJvdG90eXBlLCAnZGF0YScsIHsgZW51bWVyYWJsZTogdHJ1ZSB9KTtcblxuLyoqXG4gKiBUaGlzIHByb3ZpZGVzIG1ldGhvZHMgZm9yIGVtdWxhdGluZyB0aGUgYEV2ZW50VGFyZ2V0YCBpbnRlcmZhY2UuIEl0J3Mgbm90XG4gKiBtZWFudCB0byBiZSB1c2VkIGRpcmVjdGx5LlxuICpcbiAqIEBtaXhpblxuICovXG5jb25zdCBFdmVudFRhcmdldCA9IHtcbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGFuIGV2ZW50IGxpc3RlbmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGV2ZW50IHR5cGUgdG8gbGlzdGVuIGZvclxuICAgKiBAcGFyYW0geyhGdW5jdGlvbnxPYmplY3QpfSBoYW5kbGVyIFRoZSBsaXN0ZW5lciB0byBhZGRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBBbiBvcHRpb25zIG9iamVjdCBzcGVjaWZpZXMgY2hhcmFjdGVyaXN0aWNzIGFib3V0XG4gICAqICAgICB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5vbmNlPWZhbHNlXSBBIGBCb29sZWFuYCBpbmRpY2F0aW5nIHRoYXQgdGhlXG4gICAqICAgICBsaXN0ZW5lciBzaG91bGQgYmUgaW52b2tlZCBhdCBtb3N0IG9uY2UgYWZ0ZXIgYmVpbmcgYWRkZWQuIElmIGB0cnVlYCxcbiAgICogICAgIHRoZSBsaXN0ZW5lciB3b3VsZCBiZSBhdXRvbWF0aWNhbGx5IHJlbW92ZWQgd2hlbiBpbnZva2VkLlxuICAgKiBAcHVibGljXG4gICAqL1xuICBhZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMgPSB7fSkge1xuICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgdGhpcy5saXN0ZW5lcnModHlwZSkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgIW9wdGlvbnNba0Zvck9uRXZlbnRBdHRyaWJ1dGVdICYmXG4gICAgICAgIGxpc3RlbmVyW2tMaXN0ZW5lcl0gPT09IGhhbmRsZXIgJiZcbiAgICAgICAgIWxpc3RlbmVyW2tGb3JPbkV2ZW50QXR0cmlidXRlXVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgd3JhcHBlcjtcblxuICAgIGlmICh0eXBlID09PSAnbWVzc2FnZScpIHtcbiAgICAgIHdyYXBwZXIgPSBmdW5jdGlvbiBvbk1lc3NhZ2UoZGF0YSwgaXNCaW5hcnkpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgTWVzc2FnZUV2ZW50KCdtZXNzYWdlJywge1xuICAgICAgICAgIGRhdGE6IGlzQmluYXJ5ID8gZGF0YSA6IGRhdGEudG9TdHJpbmcoKVxuICAgICAgICB9KTtcblxuICAgICAgICBldmVudFtrVGFyZ2V0XSA9IHRoaXM7XG4gICAgICAgIGNhbGxMaXN0ZW5lcihoYW5kbGVyLCB0aGlzLCBldmVudCk7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2Nsb3NlJykge1xuICAgICAgd3JhcHBlciA9IGZ1bmN0aW9uIG9uQ2xvc2UoY29kZSwgbWVzc2FnZSkge1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDbG9zZUV2ZW50KCdjbG9zZScsIHtcbiAgICAgICAgICBjb2RlLFxuICAgICAgICAgIHJlYXNvbjogbWVzc2FnZS50b1N0cmluZygpLFxuICAgICAgICAgIHdhc0NsZWFuOiB0aGlzLl9jbG9zZUZyYW1lUmVjZWl2ZWQgJiYgdGhpcy5fY2xvc2VGcmFtZVNlbnRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXZlbnRba1RhcmdldF0gPSB0aGlzO1xuICAgICAgICBjYWxsTGlzdGVuZXIoaGFuZGxlciwgdGhpcywgZXZlbnQpO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICAgIHdyYXBwZXIgPSBmdW5jdGlvbiBvbkVycm9yKGVycm9yKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IEVycm9yRXZlbnQoJ2Vycm9yJywge1xuICAgICAgICAgIGVycm9yLFxuICAgICAgICAgIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXZlbnRba1RhcmdldF0gPSB0aGlzO1xuICAgICAgICBjYWxsTGlzdGVuZXIoaGFuZGxlciwgdGhpcywgZXZlbnQpO1xuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvcGVuJykge1xuICAgICAgd3JhcHBlciA9IGZ1bmN0aW9uIG9uT3BlbigpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgRXZlbnQoJ29wZW4nKTtcblxuICAgICAgICBldmVudFtrVGFyZ2V0XSA9IHRoaXM7XG4gICAgICAgIGNhbGxMaXN0ZW5lcihoYW5kbGVyLCB0aGlzLCBldmVudCk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd3JhcHBlcltrRm9yT25FdmVudEF0dHJpYnV0ZV0gPSAhIW9wdGlvbnNba0Zvck9uRXZlbnRBdHRyaWJ1dGVdO1xuICAgIHdyYXBwZXJba0xpc3RlbmVyXSA9IGhhbmRsZXI7XG5cbiAgICBpZiAob3B0aW9ucy5vbmNlKSB7XG4gICAgICB0aGlzLm9uY2UodHlwZSwgd3JhcHBlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub24odHlwZSwgd3JhcHBlcik7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIEEgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgZXZlbnQgdHlwZSB0byByZW1vdmVcbiAgICogQHBhcmFtIHsoRnVuY3Rpb258T2JqZWN0KX0gaGFuZGxlciBUaGUgbGlzdGVuZXIgdG8gcmVtb3ZlXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlcikge1xuICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgdGhpcy5saXN0ZW5lcnModHlwZSkpIHtcbiAgICAgIGlmIChsaXN0ZW5lcltrTGlzdGVuZXJdID09PSBoYW5kbGVyICYmICFsaXN0ZW5lcltrRm9yT25FdmVudEF0dHJpYnV0ZV0pIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIENsb3NlRXZlbnQsXG4gIEVycm9yRXZlbnQsXG4gIEV2ZW50LFxuICBFdmVudFRhcmdldCxcbiAgTWVzc2FnZUV2ZW50XG59O1xuXG4vKipcbiAqIENhbGwgYW4gZXZlbnQgbGlzdGVuZXJcbiAqXG4gKiBAcGFyYW0geyhGdW5jdGlvbnxPYmplY3QpfSBsaXN0ZW5lciBUaGUgbGlzdGVuZXIgdG8gY2FsbFxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSB2YWx1ZSB0byB1c2UgYXMgYHRoaXNgYCB3aGVuIGNhbGxpbmcgdGhlIGxpc3RlbmVyXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCBUaGUgZXZlbnQgdG8gcGFzcyB0byB0aGUgbGlzdGVuZXJcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNhbGxMaXN0ZW5lcihsaXN0ZW5lciwgdGhpc0FyZywgZXZlbnQpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gJ29iamVjdCcgJiYgbGlzdGVuZXIuaGFuZGxlRXZlbnQpIHtcbiAgICBsaXN0ZW5lci5oYW5kbGVFdmVudC5jYWxsKGxpc3RlbmVyLCBldmVudCk7XG4gIH0gZWxzZSB7XG4gICAgbGlzdGVuZXIuY2FsbCh0aGlzQXJnLCBldmVudCk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgeyB0b2tlbkNoYXJzIH0gPSByZXF1aXJlKCcuL3ZhbGlkYXRpb24nKTtcblxuLyoqXG4gKiBBZGRzIGFuIG9mZmVyIHRvIHRoZSBtYXAgb2YgZXh0ZW5zaW9uIG9mZmVycyBvciBhIHBhcmFtZXRlciB0byB0aGUgbWFwIG9mXG4gKiBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZXN0IFRoZSBtYXAgb2YgZXh0ZW5zaW9uIG9mZmVycyBvciBwYXJhbWV0ZXJzXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgZXh0ZW5zaW9uIG9yIHBhcmFtZXRlciBuYW1lXG4gKiBAcGFyYW0geyhPYmplY3R8Qm9vbGVhbnxTdHJpbmcpfSBlbGVtIFRoZSBleHRlbnNpb24gcGFyYW1ldGVycyBvciB0aGVcbiAqICAgICBwYXJhbWV0ZXIgdmFsdWVcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHB1c2goZGVzdCwgbmFtZSwgZWxlbSkge1xuICBpZiAoZGVzdFtuYW1lXSA9PT0gdW5kZWZpbmVkKSBkZXN0W25hbWVdID0gW2VsZW1dO1xuICBlbHNlIGRlc3RbbmFtZV0ucHVzaChlbGVtKTtcbn1cblxuLyoqXG4gKiBQYXJzZXMgdGhlIGBTZWMtV2ViU29ja2V0LUV4dGVuc2lvbnNgIGhlYWRlciBpbnRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVyIFRoZSBmaWVsZCB2YWx1ZSBvZiB0aGUgaGVhZGVyXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBwYXJzZWQgb2JqZWN0XG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIHBhcnNlKGhlYWRlcikge1xuICBjb25zdCBvZmZlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBsZXQgcGFyYW1zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgbGV0IG11c3RVbmVzY2FwZSA9IGZhbHNlO1xuICBsZXQgaXNFc2NhcGluZyA9IGZhbHNlO1xuICBsZXQgaW5RdW90ZXMgPSBmYWxzZTtcbiAgbGV0IGV4dGVuc2lvbk5hbWU7XG4gIGxldCBwYXJhbU5hbWU7XG4gIGxldCBzdGFydCA9IC0xO1xuICBsZXQgY29kZSA9IC0xO1xuICBsZXQgZW5kID0gLTE7XG4gIGxldCBpID0gMDtcblxuICBmb3IgKDsgaSA8IGhlYWRlci5sZW5ndGg7IGkrKykge1xuICAgIGNvZGUgPSBoZWFkZXIuY2hhckNvZGVBdChpKTtcblxuICAgIGlmIChleHRlbnNpb25OYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChlbmQgPT09IC0xICYmIHRva2VuQ2hhcnNbY29kZV0gPT09IDEpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID09PSAtMSkgc3RhcnQgPSBpO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgaSAhPT0gMCAmJlxuICAgICAgICAoY29kZSA9PT0gMHgyMCAvKiAnICcgKi8gfHwgY29kZSA9PT0gMHgwOSkgLyogJ1xcdCcgKi9cbiAgICAgICkge1xuICAgICAgICBpZiAoZW5kID09PSAtMSAmJiBzdGFydCAhPT0gLTEpIGVuZCA9IGk7XG4gICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4M2IgLyogJzsnICovIHx8IGNvZGUgPT09IDB4MmMgLyogJywnICovKSB7XG4gICAgICAgIGlmIChzdGFydCA9PT0gLTEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVuZXhwZWN0ZWQgY2hhcmFjdGVyIGF0IGluZGV4ICR7aX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmQgPT09IC0xKSBlbmQgPSBpO1xuICAgICAgICBjb25zdCBuYW1lID0gaGVhZGVyLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgICAgICBpZiAoY29kZSA9PT0gMHgyYykge1xuICAgICAgICAgIHB1c2gob2ZmZXJzLCBuYW1lLCBwYXJhbXMpO1xuICAgICAgICAgIHBhcmFtcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXh0ZW5zaW9uTmFtZSA9IG5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBzdGFydCA9IGVuZCA9IC0xO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwYXJhbU5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKGVuZCA9PT0gLTEgJiYgdG9rZW5DaGFyc1tjb2RlXSA9PT0gMSkge1xuICAgICAgICBpZiAoc3RhcnQgPT09IC0xKSBzdGFydCA9IGk7XG4gICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4MjAgfHwgY29kZSA9PT0gMHgwOSkge1xuICAgICAgICBpZiAoZW5kID09PSAtMSAmJiBzdGFydCAhPT0gLTEpIGVuZCA9IGk7XG4gICAgICB9IGVsc2UgaWYgKGNvZGUgPT09IDB4M2IgfHwgY29kZSA9PT0gMHgyYykge1xuICAgICAgICBpZiAoc3RhcnQgPT09IC0xKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBVbmV4cGVjdGVkIGNoYXJhY3RlciBhdCBpbmRleCAke2l9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5kID09PSAtMSkgZW5kID0gaTtcbiAgICAgICAgcHVzaChwYXJhbXMsIGhlYWRlci5zbGljZShzdGFydCwgZW5kKSwgdHJ1ZSk7XG4gICAgICAgIGlmIChjb2RlID09PSAweDJjKSB7XG4gICAgICAgICAgcHVzaChvZmZlcnMsIGV4dGVuc2lvbk5hbWUsIHBhcmFtcyk7XG4gICAgICAgICAgcGFyYW1zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBleHRlbnNpb25OYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhcnQgPSBlbmQgPSAtMTtcbiAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHgzZCAvKiAnPScgKi8gJiYgc3RhcnQgIT09IC0xICYmIGVuZCA9PT0gLTEpIHtcbiAgICAgICAgcGFyYW1OYW1lID0gaGVhZGVyLnNsaWNlKHN0YXJ0LCBpKTtcbiAgICAgICAgc3RhcnQgPSBlbmQgPSAtMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihgVW5leHBlY3RlZCBjaGFyYWN0ZXIgYXQgaW5kZXggJHtpfWApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvL1xuICAgICAgLy8gVGhlIHZhbHVlIG9mIGEgcXVvdGVkLXN0cmluZyBhZnRlciB1bmVzY2FwaW5nIG11c3QgY29uZm9ybSB0byB0aGVcbiAgICAgIC8vIHRva2VuIEFCTkYsIHNvIG9ubHkgdG9rZW4gY2hhcmFjdGVycyBhcmUgdmFsaWQuXG4gICAgICAvLyBSZWY6IGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NDU1I3NlY3Rpb24tOS4xXG4gICAgICAvL1xuICAgICAgaWYgKGlzRXNjYXBpbmcpIHtcbiAgICAgICAgaWYgKHRva2VuQ2hhcnNbY29kZV0gIT09IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVuZXhwZWN0ZWQgY2hhcmFjdGVyIGF0IGluZGV4ICR7aX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnQgPT09IC0xKSBzdGFydCA9IGk7XG4gICAgICAgIGVsc2UgaWYgKCFtdXN0VW5lc2NhcGUpIG11c3RVbmVzY2FwZSA9IHRydWU7XG4gICAgICAgIGlzRXNjYXBpbmcgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5RdW90ZXMpIHtcbiAgICAgICAgaWYgKHRva2VuQ2hhcnNbY29kZV0gPT09IDEpIHtcbiAgICAgICAgICBpZiAoc3RhcnQgPT09IC0xKSBzdGFydCA9IGk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHgyMiAvKiAnXCInICovICYmIHN0YXJ0ICE9PSAtMSkge1xuICAgICAgICAgIGluUXVvdGVzID0gZmFsc2U7XG4gICAgICAgICAgZW5kID0gaTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDVjIC8qICdcXCcgKi8pIHtcbiAgICAgICAgICBpc0VzY2FwaW5nID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVuZXhwZWN0ZWQgY2hhcmFjdGVyIGF0IGluZGV4ICR7aX1gKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjb2RlID09PSAweDIyICYmIGhlYWRlci5jaGFyQ29kZUF0KGkgLSAxKSA9PT0gMHgzZCkge1xuICAgICAgICBpblF1b3RlcyA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGVuZCA9PT0gLTEgJiYgdG9rZW5DaGFyc1tjb2RlXSA9PT0gMSkge1xuICAgICAgICBpZiAoc3RhcnQgPT09IC0xKSBzdGFydCA9IGk7XG4gICAgICB9IGVsc2UgaWYgKHN0YXJ0ICE9PSAtMSAmJiAoY29kZSA9PT0gMHgyMCB8fCBjb2RlID09PSAweDA5KSkge1xuICAgICAgICBpZiAoZW5kID09PSAtMSkgZW5kID0gaTtcbiAgICAgIH0gZWxzZSBpZiAoY29kZSA9PT0gMHgzYiB8fCBjb2RlID09PSAweDJjKSB7XG4gICAgICAgIGlmIChzdGFydCA9PT0gLTEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVuZXhwZWN0ZWQgY2hhcmFjdGVyIGF0IGluZGV4ICR7aX1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmQgPT09IC0xKSBlbmQgPSBpO1xuICAgICAgICBsZXQgdmFsdWUgPSBoZWFkZXIuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gICAgICAgIGlmIChtdXN0VW5lc2NhcGUpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcXFwvZywgJycpO1xuICAgICAgICAgIG11c3RVbmVzY2FwZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHB1c2gocGFyYW1zLCBwYXJhbU5hbWUsIHZhbHVlKTtcbiAgICAgICAgaWYgKGNvZGUgPT09IDB4MmMpIHtcbiAgICAgICAgICBwdXNoKG9mZmVycywgZXh0ZW5zaW9uTmFtZSwgcGFyYW1zKTtcbiAgICAgICAgICBwYXJhbXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGV4dGVuc2lvbk5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBwYXJhbU5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHN0YXJ0ID0gZW5kID0gLTE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVuZXhwZWN0ZWQgY2hhcmFjdGVyIGF0IGluZGV4ICR7aX1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoc3RhcnQgPT09IC0xIHx8IGluUXVvdGVzIHx8IGNvZGUgPT09IDB4MjAgfHwgY29kZSA9PT0gMHgwOSkge1xuICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignVW5leHBlY3RlZCBlbmQgb2YgaW5wdXQnKTtcbiAgfVxuXG4gIGlmIChlbmQgPT09IC0xKSBlbmQgPSBpO1xuICBjb25zdCB0b2tlbiA9IGhlYWRlci5zbGljZShzdGFydCwgZW5kKTtcbiAgaWYgKGV4dGVuc2lvbk5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHB1c2gob2ZmZXJzLCB0b2tlbiwgcGFyYW1zKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAocGFyYW1OYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHB1c2gocGFyYW1zLCB0b2tlbiwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmIChtdXN0VW5lc2NhcGUpIHtcbiAgICAgIHB1c2gocGFyYW1zLCBwYXJhbU5hbWUsIHRva2VuLnJlcGxhY2UoL1xcXFwvZywgJycpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcHVzaChwYXJhbXMsIHBhcmFtTmFtZSwgdG9rZW4pO1xuICAgIH1cbiAgICBwdXNoKG9mZmVycywgZXh0ZW5zaW9uTmFtZSwgcGFyYW1zKTtcbiAgfVxuXG4gIHJldHVybiBvZmZlcnM7XG59XG5cbi8qKlxuICogQnVpbGRzIHRoZSBgU2VjLVdlYlNvY2tldC1FeHRlbnNpb25zYCBoZWFkZXIgZmllbGQgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGV4dGVuc2lvbnMgVGhlIG1hcCBvZiBleHRlbnNpb25zIGFuZCBwYXJhbWV0ZXJzIHRvIGZvcm1hdFxuICogQHJldHVybiB7U3RyaW5nfSBBIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIGdpdmVuIG9iamVjdFxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBmb3JtYXQoZXh0ZW5zaW9ucykge1xuICByZXR1cm4gT2JqZWN0LmtleXMoZXh0ZW5zaW9ucylcbiAgICAubWFwKChleHRlbnNpb24pID0+IHtcbiAgICAgIGxldCBjb25maWd1cmF0aW9ucyA9IGV4dGVuc2lvbnNbZXh0ZW5zaW9uXTtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb25maWd1cmF0aW9ucykpIGNvbmZpZ3VyYXRpb25zID0gW2NvbmZpZ3VyYXRpb25zXTtcbiAgICAgIHJldHVybiBjb25maWd1cmF0aW9uc1xuICAgICAgICAubWFwKChwYXJhbXMpID0+IHtcbiAgICAgICAgICByZXR1cm4gW2V4dGVuc2lvbl1cbiAgICAgICAgICAgIC5jb25jYXQoXG4gICAgICAgICAgICAgIE9iamVjdC5rZXlzKHBhcmFtcykubWFwKChrKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlcyA9IHBhcmFtc1trXTtcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWVzKSkgdmFsdWVzID0gW3ZhbHVlc107XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgLm1hcCgodikgPT4gKHYgPT09IHRydWUgPyBrIDogYCR7a309JHt2fWApKVxuICAgICAgICAgICAgICAgICAgLmpvaW4oJzsgJyk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuam9pbignOyAnKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmpvaW4oJywgJyk7XG4gICAgfSlcbiAgICAuam9pbignLCAnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IGZvcm1hdCwgcGFyc2UgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qga0RvbmUgPSBTeW1ib2woJ2tEb25lJyk7XG5jb25zdCBrUnVuID0gU3ltYm9sKCdrUnVuJyk7XG5cbi8qKlxuICogQSB2ZXJ5IHNpbXBsZSBqb2IgcXVldWUgd2l0aCBhZGp1c3RhYmxlIGNvbmN1cnJlbmN5LiBBZGFwdGVkIGZyb21cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9TVFJNTC9hc3luYy1saW1pdGVyXG4gKi9cbmNsYXNzIExpbWl0ZXIge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBgTGltaXRlcmAuXG4gICAqXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbY29uY3VycmVuY3k9SW5maW5pdHldIFRoZSBtYXhpbXVtIG51bWJlciBvZiBqb2JzIGFsbG93ZWRcbiAgICogICAgIHRvIHJ1biBjb25jdXJyZW50bHlcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNvbmN1cnJlbmN5KSB7XG4gICAgdGhpc1trRG9uZV0gPSAoKSA9PiB7XG4gICAgICB0aGlzLnBlbmRpbmctLTtcbiAgICAgIHRoaXNba1J1bl0oKTtcbiAgICB9O1xuICAgIHRoaXMuY29uY3VycmVuY3kgPSBjb25jdXJyZW5jeSB8fCBJbmZpbml0eTtcbiAgICB0aGlzLmpvYnMgPSBbXTtcbiAgICB0aGlzLnBlbmRpbmcgPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBqb2IgdG8gdGhlIHF1ZXVlLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBqb2IgVGhlIGpvYiB0byBydW5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgYWRkKGpvYikge1xuICAgIHRoaXMuam9icy5wdXNoKGpvYik7XG4gICAgdGhpc1trUnVuXSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSBqb2IgZnJvbSB0aGUgcXVldWUgYW5kIHJ1bnMgaXQgaWYgcG9zc2libGUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBba1J1bl0oKSB7XG4gICAgaWYgKHRoaXMucGVuZGluZyA9PT0gdGhpcy5jb25jdXJyZW5jeSkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuam9icy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGpvYiA9IHRoaXMuam9icy5zaGlmdCgpO1xuXG4gICAgICB0aGlzLnBlbmRpbmcrKztcbiAgICAgIGpvYih0aGlzW2tEb25lXSk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gTGltaXRlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgemxpYiA9IHJlcXVpcmUoJ3psaWInKTtcblxuY29uc3QgYnVmZmVyVXRpbCA9IHJlcXVpcmUoJy4vYnVmZmVyLXV0aWwnKTtcbmNvbnN0IExpbWl0ZXIgPSByZXF1aXJlKCcuL2xpbWl0ZXInKTtcbmNvbnN0IHsga1N0YXR1c0NvZGUgfSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbmNvbnN0IEZhc3RCdWZmZXIgPSBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdO1xuY29uc3QgVFJBSUxFUiA9IEJ1ZmZlci5mcm9tKFsweDAwLCAweDAwLCAweGZmLCAweGZmXSk7XG5jb25zdCBrUGVyTWVzc2FnZURlZmxhdGUgPSBTeW1ib2woJ3Blcm1lc3NhZ2UtZGVmbGF0ZScpO1xuY29uc3Qga1RvdGFsTGVuZ3RoID0gU3ltYm9sKCd0b3RhbC1sZW5ndGgnKTtcbmNvbnN0IGtDYWxsYmFjayA9IFN5bWJvbCgnY2FsbGJhY2snKTtcbmNvbnN0IGtCdWZmZXJzID0gU3ltYm9sKCdidWZmZXJzJyk7XG5jb25zdCBrRXJyb3IgPSBTeW1ib2woJ2Vycm9yJyk7XG5cbi8vXG4vLyBXZSBsaW1pdCB6bGliIGNvbmN1cnJlbmN5LCB3aGljaCBwcmV2ZW50cyBzZXZlcmUgbWVtb3J5IGZyYWdtZW50YXRpb25cbi8vIGFzIGRvY3VtZW50ZWQgaW4gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2lzc3Vlcy84ODcxI2lzc3VlY29tbWVudC0yNTA5MTU5MTNcbi8vIGFuZCBodHRwczovL2dpdGh1Yi5jb20vd2Vic29ja2V0cy93cy9pc3N1ZXMvMTIwMlxuLy9cbi8vIEludGVudGlvbmFsbHkgZ2xvYmFsOyBpdCdzIHRoZSBnbG9iYWwgdGhyZWFkIHBvb2wgdGhhdCdzIGFuIGlzc3VlLlxuLy9cbmxldCB6bGliTGltaXRlcjtcblxuLyoqXG4gKiBwZXJtZXNzYWdlLWRlZmxhdGUgaW1wbGVtZW50YXRpb24uXG4gKi9cbmNsYXNzIFBlck1lc3NhZ2VEZWZsYXRlIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBQZXJNZXNzYWdlRGVmbGF0ZSBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBDb25maWd1cmF0aW9uIG9wdGlvbnNcbiAgICogQHBhcmFtIHsoQm9vbGVhbnxOdW1iZXIpfSBbb3B0aW9ucy5jbGllbnRNYXhXaW5kb3dCaXRzXSBBZHZlcnRpc2Ugc3VwcG9ydFxuICAgKiAgICAgZm9yLCBvciByZXF1ZXN0LCBhIGN1c3RvbSBjbGllbnQgd2luZG93IHNpemVcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jbGllbnROb0NvbnRleHRUYWtlb3Zlcj1mYWxzZV0gQWR2ZXJ0aXNlL1xuICAgKiAgICAgYWNrbm93bGVkZ2UgZGlzYWJsaW5nIG9mIGNsaWVudCBjb250ZXh0IHRha2VvdmVyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5jb25jdXJyZW5jeUxpbWl0PTEwXSBUaGUgbnVtYmVyIG9mIGNvbmN1cnJlbnRcbiAgICogICAgIGNhbGxzIHRvIHpsaWJcbiAgICogQHBhcmFtIHsoQm9vbGVhbnxOdW1iZXIpfSBbb3B0aW9ucy5zZXJ2ZXJNYXhXaW5kb3dCaXRzXSBSZXF1ZXN0L2NvbmZpcm0gdGhlXG4gICAqICAgICB1c2Ugb2YgYSBjdXN0b20gc2VydmVyIHdpbmRvdyBzaXplXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuc2VydmVyTm9Db250ZXh0VGFrZW92ZXI9ZmFsc2VdIFJlcXVlc3QvYWNjZXB0XG4gICAqICAgICBkaXNhYmxpbmcgb2Ygc2VydmVyIGNvbnRleHQgdGFrZW92ZXJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLnRocmVzaG9sZD0xMDI0XSBTaXplIChpbiBieXRlcykgYmVsb3cgd2hpY2hcbiAgICogICAgIG1lc3NhZ2VzIHNob3VsZCBub3QgYmUgY29tcHJlc3NlZCBpZiBjb250ZXh0IHRha2VvdmVyIGlzIGRpc2FibGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy56bGliRGVmbGF0ZU9wdGlvbnNdIE9wdGlvbnMgdG8gcGFzcyB0byB6bGliIG9uXG4gICAqICAgICBkZWZsYXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy56bGliSW5mbGF0ZU9wdGlvbnNdIE9wdGlvbnMgdG8gcGFzcyB0byB6bGliIG9uXG4gICAqICAgICBpbmZsYXRlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW2lzU2VydmVyPWZhbHNlXSBDcmVhdGUgdGhlIGluc3RhbmNlIGluIGVpdGhlciBzZXJ2ZXIgb3JcbiAgICogICAgIGNsaWVudCBtb2RlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbbWF4UGF5bG9hZD0wXSBUaGUgbWF4aW11bSBhbGxvd2VkIG1lc3NhZ2UgbGVuZ3RoXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zLCBpc1NlcnZlciwgbWF4UGF5bG9hZCkge1xuICAgIHRoaXMuX21heFBheWxvYWQgPSBtYXhQYXlsb2FkIHwgMDtcbiAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB0aGlzLl90aHJlc2hvbGQgPVxuICAgICAgdGhpcy5fb3B0aW9ucy50aHJlc2hvbGQgIT09IHVuZGVmaW5lZCA/IHRoaXMuX29wdGlvbnMudGhyZXNob2xkIDogMTAyNDtcbiAgICB0aGlzLl9pc1NlcnZlciA9ICEhaXNTZXJ2ZXI7XG4gICAgdGhpcy5fZGVmbGF0ZSA9IG51bGw7XG4gICAgdGhpcy5faW5mbGF0ZSA9IG51bGw7XG5cbiAgICB0aGlzLnBhcmFtcyA9IG51bGw7XG5cbiAgICBpZiAoIXpsaWJMaW1pdGVyKSB7XG4gICAgICBjb25zdCBjb25jdXJyZW5jeSA9XG4gICAgICAgIHRoaXMuX29wdGlvbnMuY29uY3VycmVuY3lMaW1pdCAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyB0aGlzLl9vcHRpb25zLmNvbmN1cnJlbmN5TGltaXRcbiAgICAgICAgICA6IDEwO1xuICAgICAgemxpYkxpbWl0ZXIgPSBuZXcgTGltaXRlcihjb25jdXJyZW5jeSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgZ2V0IGV4dGVuc2lvbk5hbWUoKSB7XG4gICAgcmV0dXJuICdwZXJtZXNzYWdlLWRlZmxhdGUnO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBleHRlbnNpb24gbmVnb3RpYXRpb24gb2ZmZXIuXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH0gRXh0ZW5zaW9uIHBhcmFtZXRlcnNcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgb2ZmZXIoKSB7XG4gICAgY29uc3QgcGFyYW1zID0ge307XG5cbiAgICBpZiAodGhpcy5fb3B0aW9ucy5zZXJ2ZXJOb0NvbnRleHRUYWtlb3Zlcikge1xuICAgICAgcGFyYW1zLnNlcnZlcl9ub19jb250ZXh0X3Rha2VvdmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX29wdGlvbnMuY2xpZW50Tm9Db250ZXh0VGFrZW92ZXIpIHtcbiAgICAgIHBhcmFtcy5jbGllbnRfbm9fY29udGV4dF90YWtlb3ZlciA9IHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLl9vcHRpb25zLnNlcnZlck1heFdpbmRvd0JpdHMpIHtcbiAgICAgIHBhcmFtcy5zZXJ2ZXJfbWF4X3dpbmRvd19iaXRzID0gdGhpcy5fb3B0aW9ucy5zZXJ2ZXJNYXhXaW5kb3dCaXRzO1xuICAgIH1cbiAgICBpZiAodGhpcy5fb3B0aW9ucy5jbGllbnRNYXhXaW5kb3dCaXRzKSB7XG4gICAgICBwYXJhbXMuY2xpZW50X21heF93aW5kb3dfYml0cyA9IHRoaXMuX29wdGlvbnMuY2xpZW50TWF4V2luZG93Qml0cztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX29wdGlvbnMuY2xpZW50TWF4V2luZG93Qml0cyA9PSBudWxsKSB7XG4gICAgICBwYXJhbXMuY2xpZW50X21heF93aW5kb3dfYml0cyA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHQgYW4gZXh0ZW5zaW9uIG5lZ290aWF0aW9uIG9mZmVyL3Jlc3BvbnNlLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBjb25maWd1cmF0aW9ucyBUaGUgZXh0ZW5zaW9uIG5lZ290aWF0aW9uIG9mZmVycy9yZXBvbnNlXG4gICAqIEByZXR1cm4ge09iamVjdH0gQWNjZXB0ZWQgY29uZmlndXJhdGlvblxuICAgKiBAcHVibGljXG4gICAqL1xuICBhY2NlcHQoY29uZmlndXJhdGlvbnMpIHtcbiAgICBjb25maWd1cmF0aW9ucyA9IHRoaXMubm9ybWFsaXplUGFyYW1zKGNvbmZpZ3VyYXRpb25zKTtcblxuICAgIHRoaXMucGFyYW1zID0gdGhpcy5faXNTZXJ2ZXJcbiAgICAgID8gdGhpcy5hY2NlcHRBc1NlcnZlcihjb25maWd1cmF0aW9ucylcbiAgICAgIDogdGhpcy5hY2NlcHRBc0NsaWVudChjb25maWd1cmF0aW9ucyk7XG5cbiAgICByZXR1cm4gdGhpcy5wYXJhbXM7XG4gIH1cblxuICAvKipcbiAgICogUmVsZWFzZXMgYWxsIHJlc291cmNlcyB1c2VkIGJ5IHRoZSBleHRlbnNpb24uXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNsZWFudXAoKSB7XG4gICAgaWYgKHRoaXMuX2luZmxhdGUpIHtcbiAgICAgIHRoaXMuX2luZmxhdGUuY2xvc2UoKTtcbiAgICAgIHRoaXMuX2luZmxhdGUgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9kZWZsYXRlKSB7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IHRoaXMuX2RlZmxhdGVba0NhbGxiYWNrXTtcblxuICAgICAgdGhpcy5fZGVmbGF0ZS5jbG9zZSgpO1xuICAgICAgdGhpcy5fZGVmbGF0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjayhcbiAgICAgICAgICBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnVGhlIGRlZmxhdGUgc3RyZWFtIHdhcyBjbG9zZWQgd2hpbGUgZGF0YSB3YXMgYmVpbmcgcHJvY2Vzc2VkJ1xuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogIEFjY2VwdCBhbiBleHRlbnNpb24gbmVnb3RpYXRpb24gb2ZmZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9mZmVycyBUaGUgZXh0ZW5zaW9uIG5lZ290aWF0aW9uIG9mZmVyc1xuICAgKiBAcmV0dXJuIHtPYmplY3R9IEFjY2VwdGVkIGNvbmZpZ3VyYXRpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjY2VwdEFzU2VydmVyKG9mZmVycykge1xuICAgIGNvbnN0IG9wdHMgPSB0aGlzLl9vcHRpb25zO1xuICAgIGNvbnN0IGFjY2VwdGVkID0gb2ZmZXJzLmZpbmQoKHBhcmFtcykgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICAob3B0cy5zZXJ2ZXJOb0NvbnRleHRUYWtlb3ZlciA9PT0gZmFsc2UgJiZcbiAgICAgICAgICBwYXJhbXMuc2VydmVyX25vX2NvbnRleHRfdGFrZW92ZXIpIHx8XG4gICAgICAgIChwYXJhbXMuc2VydmVyX21heF93aW5kb3dfYml0cyAmJlxuICAgICAgICAgIChvcHRzLnNlcnZlck1heFdpbmRvd0JpdHMgPT09IGZhbHNlIHx8XG4gICAgICAgICAgICAodHlwZW9mIG9wdHMuc2VydmVyTWF4V2luZG93Qml0cyA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgICAgb3B0cy5zZXJ2ZXJNYXhXaW5kb3dCaXRzID4gcGFyYW1zLnNlcnZlcl9tYXhfd2luZG93X2JpdHMpKSkgfHxcbiAgICAgICAgKHR5cGVvZiBvcHRzLmNsaWVudE1heFdpbmRvd0JpdHMgPT09ICdudW1iZXInICYmXG4gICAgICAgICAgIXBhcmFtcy5jbGllbnRfbWF4X3dpbmRvd19iaXRzKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbiAgICBpZiAoIWFjY2VwdGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vbmUgb2YgdGhlIGV4dGVuc2lvbiBvZmZlcnMgY2FuIGJlIGFjY2VwdGVkJyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuc2VydmVyTm9Db250ZXh0VGFrZW92ZXIpIHtcbiAgICAgIGFjY2VwdGVkLnNlcnZlcl9ub19jb250ZXh0X3Rha2VvdmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG9wdHMuY2xpZW50Tm9Db250ZXh0VGFrZW92ZXIpIHtcbiAgICAgIGFjY2VwdGVkLmNsaWVudF9ub19jb250ZXh0X3Rha2VvdmVyID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvcHRzLnNlcnZlck1heFdpbmRvd0JpdHMgPT09ICdudW1iZXInKSB7XG4gICAgICBhY2NlcHRlZC5zZXJ2ZXJfbWF4X3dpbmRvd19iaXRzID0gb3B0cy5zZXJ2ZXJNYXhXaW5kb3dCaXRzO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9wdHMuY2xpZW50TWF4V2luZG93Qml0cyA9PT0gJ251bWJlcicpIHtcbiAgICAgIGFjY2VwdGVkLmNsaWVudF9tYXhfd2luZG93X2JpdHMgPSBvcHRzLmNsaWVudE1heFdpbmRvd0JpdHM7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGFjY2VwdGVkLmNsaWVudF9tYXhfd2luZG93X2JpdHMgPT09IHRydWUgfHxcbiAgICAgIG9wdHMuY2xpZW50TWF4V2luZG93Qml0cyA9PT0gZmFsc2VcbiAgICApIHtcbiAgICAgIGRlbGV0ZSBhY2NlcHRlZC5jbGllbnRfbWF4X3dpbmRvd19iaXRzO1xuICAgIH1cblxuICAgIHJldHVybiBhY2NlcHRlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHQgdGhlIGV4dGVuc2lvbiBuZWdvdGlhdGlvbiByZXNwb25zZS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gcmVzcG9uc2UgVGhlIGV4dGVuc2lvbiBuZWdvdGlhdGlvbiByZXNwb25zZVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IEFjY2VwdGVkIGNvbmZpZ3VyYXRpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFjY2VwdEFzQ2xpZW50KHJlc3BvbnNlKSB7XG4gICAgY29uc3QgcGFyYW1zID0gcmVzcG9uc2VbMF07XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLl9vcHRpb25zLmNsaWVudE5vQ29udGV4dFRha2VvdmVyID09PSBmYWxzZSAmJlxuICAgICAgcGFyYW1zLmNsaWVudF9ub19jb250ZXh0X3Rha2VvdmVyXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgcGFyYW1ldGVyIFwiY2xpZW50X25vX2NvbnRleHRfdGFrZW92ZXJcIicpO1xuICAgIH1cblxuICAgIGlmICghcGFyYW1zLmNsaWVudF9tYXhfd2luZG93X2JpdHMpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fb3B0aW9ucy5jbGllbnRNYXhXaW5kb3dCaXRzID09PSAnbnVtYmVyJykge1xuICAgICAgICBwYXJhbXMuY2xpZW50X21heF93aW5kb3dfYml0cyA9IHRoaXMuX29wdGlvbnMuY2xpZW50TWF4V2luZG93Qml0cztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdGhpcy5fb3B0aW9ucy5jbGllbnRNYXhXaW5kb3dCaXRzID09PSBmYWxzZSB8fFxuICAgICAgKHR5cGVvZiB0aGlzLl9vcHRpb25zLmNsaWVudE1heFdpbmRvd0JpdHMgPT09ICdudW1iZXInICYmXG4gICAgICAgIHBhcmFtcy5jbGllbnRfbWF4X3dpbmRvd19iaXRzID4gdGhpcy5fb3B0aW9ucy5jbGllbnRNYXhXaW5kb3dCaXRzKVxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnVW5leHBlY3RlZCBvciBpbnZhbGlkIHBhcmFtZXRlciBcImNsaWVudF9tYXhfd2luZG93X2JpdHNcIidcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmFtcztcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3JtYWxpemUgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gY29uZmlndXJhdGlvbnMgVGhlIGV4dGVuc2lvbiBuZWdvdGlhdGlvbiBvZmZlcnMvcmVwb25zZVxuICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIG9mZmVycy9yZXNwb25zZSB3aXRoIG5vcm1hbGl6ZWQgcGFyYW1ldGVyc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbm9ybWFsaXplUGFyYW1zKGNvbmZpZ3VyYXRpb25zKSB7XG4gICAgY29uZmlndXJhdGlvbnMuZm9yRWFjaCgocGFyYW1zKSA9PiB7XG4gICAgICBPYmplY3Qua2V5cyhwYXJhbXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICBsZXQgdmFsdWUgPSBwYXJhbXNba2V5XTtcblxuICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyIFwiJHtrZXl9XCIgbXVzdCBoYXZlIG9ubHkgYSBzaW5nbGUgdmFsdWVgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhbHVlID0gdmFsdWVbMF07XG5cbiAgICAgICAgaWYgKGtleSA9PT0gJ2NsaWVudF9tYXhfd2luZG93X2JpdHMnKSB7XG4gICAgICAgICAgaWYgKHZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCBudW0gPSArdmFsdWU7XG4gICAgICAgICAgICBpZiAoIU51bWJlci5pc0ludGVnZXIobnVtKSB8fCBudW0gPCA4IHx8IG51bSA+IDE1KSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgICAgYEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciBcIiR7a2V5fVwiOiAke3ZhbHVlfWBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhbHVlID0gbnVtO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2lzU2VydmVyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgICAgICBgSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyIFwiJHtrZXl9XCI6ICR7dmFsdWV9YFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnc2VydmVyX21heF93aW5kb3dfYml0cycpIHtcbiAgICAgICAgICBjb25zdCBudW0gPSArdmFsdWU7XG4gICAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKG51bSkgfHwgbnVtIDwgOCB8fCBudW0gPiAxNSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICAgICAgYEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciBcIiR7a2V5fVwiOiAke3ZhbHVlfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbHVlID0gbnVtO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIGtleSA9PT0gJ2NsaWVudF9ub19jb250ZXh0X3Rha2VvdmVyJyB8fFxuICAgICAgICAgIGtleSA9PT0gJ3NlcnZlcl9ub19jb250ZXh0X3Rha2VvdmVyJ1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAodmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICAgIGBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgXCIke2tleX1cIjogJHt2YWx1ZX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gcGFyYW1ldGVyIFwiJHtrZXl9XCJgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhcmFtc1trZXldID0gdmFsdWU7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb25maWd1cmF0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNvbXByZXNzIGRhdGEuIENvbmN1cnJlbmN5IGxpbWl0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7QnVmZmVyfSBkYXRhIENvbXByZXNzZWQgZGF0YVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZpbiBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdGhpcyBpcyB0aGUgbGFzdCBmcmFnbWVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFja1xuICAgKiBAcHVibGljXG4gICAqL1xuICBkZWNvbXByZXNzKGRhdGEsIGZpbiwgY2FsbGJhY2spIHtcbiAgICB6bGliTGltaXRlci5hZGQoKGRvbmUpID0+IHtcbiAgICAgIHRoaXMuX2RlY29tcHJlc3MoZGF0YSwgZmluLCAoZXJyLCByZXN1bHQpID0+IHtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgICBjYWxsYmFjayhlcnIsIHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wcmVzcyBkYXRhLiBDb25jdXJyZW5jeSBsaW1pdGVkLlxuICAgKlxuICAgKiBAcGFyYW0geyhCdWZmZXJ8U3RyaW5nKX0gZGF0YSBEYXRhIHRvIGNvbXByZXNzXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gZmluIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGlzIHRoZSBsYXN0IGZyYWdtZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNvbXByZXNzKGRhdGEsIGZpbiwgY2FsbGJhY2spIHtcbiAgICB6bGliTGltaXRlci5hZGQoKGRvbmUpID0+IHtcbiAgICAgIHRoaXMuX2NvbXByZXNzKGRhdGEsIGZpbiwgKGVyciwgcmVzdWx0KSA9PiB7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgICAgY2FsbGJhY2soZXJyLCByZXN1bHQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVjb21wcmVzcyBkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0ge0J1ZmZlcn0gZGF0YSBDb21wcmVzc2VkIGRhdGFcbiAgICogQHBhcmFtIHtCb29sZWFufSBmaW4gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRoaXMgaXMgdGhlIGxhc3QgZnJhZ21lbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGJhY2tcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9kZWNvbXByZXNzKGRhdGEsIGZpbiwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuX2lzU2VydmVyID8gJ2NsaWVudCcgOiAnc2VydmVyJztcblxuICAgIGlmICghdGhpcy5faW5mbGF0ZSkge1xuICAgICAgY29uc3Qga2V5ID0gYCR7ZW5kcG9pbnR9X21heF93aW5kb3dfYml0c2A7XG4gICAgICBjb25zdCB3aW5kb3dCaXRzID1cbiAgICAgICAgdHlwZW9mIHRoaXMucGFyYW1zW2tleV0gIT09ICdudW1iZXInXG4gICAgICAgICAgPyB6bGliLlpfREVGQVVMVF9XSU5ET1dCSVRTXG4gICAgICAgICAgOiB0aGlzLnBhcmFtc1trZXldO1xuXG4gICAgICB0aGlzLl9pbmZsYXRlID0gemxpYi5jcmVhdGVJbmZsYXRlUmF3KHtcbiAgICAgICAgLi4udGhpcy5fb3B0aW9ucy56bGliSW5mbGF0ZU9wdGlvbnMsXG4gICAgICAgIHdpbmRvd0JpdHNcbiAgICAgIH0pO1xuICAgICAgdGhpcy5faW5mbGF0ZVtrUGVyTWVzc2FnZURlZmxhdGVdID0gdGhpcztcbiAgICAgIHRoaXMuX2luZmxhdGVba1RvdGFsTGVuZ3RoXSA9IDA7XG4gICAgICB0aGlzLl9pbmZsYXRlW2tCdWZmZXJzXSA9IFtdO1xuICAgICAgdGhpcy5faW5mbGF0ZS5vbignZXJyb3InLCBpbmZsYXRlT25FcnJvcik7XG4gICAgICB0aGlzLl9pbmZsYXRlLm9uKCdkYXRhJywgaW5mbGF0ZU9uRGF0YSk7XG4gICAgfVxuXG4gICAgdGhpcy5faW5mbGF0ZVtrQ2FsbGJhY2tdID0gY2FsbGJhY2s7XG5cbiAgICB0aGlzLl9pbmZsYXRlLndyaXRlKGRhdGEpO1xuICAgIGlmIChmaW4pIHRoaXMuX2luZmxhdGUud3JpdGUoVFJBSUxFUik7XG5cbiAgICB0aGlzLl9pbmZsYXRlLmZsdXNoKCgpID0+IHtcbiAgICAgIGNvbnN0IGVyciA9IHRoaXMuX2luZmxhdGVba0Vycm9yXTtcblxuICAgICAgaWYgKGVycikge1xuICAgICAgICB0aGlzLl9pbmZsYXRlLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuX2luZmxhdGUgPSBudWxsO1xuICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBidWZmZXJVdGlsLmNvbmNhdChcbiAgICAgICAgdGhpcy5faW5mbGF0ZVtrQnVmZmVyc10sXG4gICAgICAgIHRoaXMuX2luZmxhdGVba1RvdGFsTGVuZ3RoXVxuICAgICAgKTtcblxuICAgICAgaWYgKHRoaXMuX2luZmxhdGUuX3JlYWRhYmxlU3RhdGUuZW5kRW1pdHRlZCkge1xuICAgICAgICB0aGlzLl9pbmZsYXRlLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuX2luZmxhdGUgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5faW5mbGF0ZVtrVG90YWxMZW5ndGhdID0gMDtcbiAgICAgICAgdGhpcy5faW5mbGF0ZVtrQnVmZmVyc10gPSBbXTtcblxuICAgICAgICBpZiAoZmluICYmIHRoaXMucGFyYW1zW2Ake2VuZHBvaW50fV9ub19jb250ZXh0X3Rha2VvdmVyYF0pIHtcbiAgICAgICAgICB0aGlzLl9pbmZsYXRlLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHJlc3MgZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHsoQnVmZmVyfFN0cmluZyl9IGRhdGEgRGF0YSB0byBjb21wcmVzc1xuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGZpbiBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdGhpcyBpcyB0aGUgbGFzdCBmcmFnbWVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFja1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2NvbXByZXNzKGRhdGEsIGZpbiwgY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbmRwb2ludCA9IHRoaXMuX2lzU2VydmVyID8gJ3NlcnZlcicgOiAnY2xpZW50JztcblxuICAgIGlmICghdGhpcy5fZGVmbGF0ZSkge1xuICAgICAgY29uc3Qga2V5ID0gYCR7ZW5kcG9pbnR9X21heF93aW5kb3dfYml0c2A7XG4gICAgICBjb25zdCB3aW5kb3dCaXRzID1cbiAgICAgICAgdHlwZW9mIHRoaXMucGFyYW1zW2tleV0gIT09ICdudW1iZXInXG4gICAgICAgICAgPyB6bGliLlpfREVGQVVMVF9XSU5ET1dCSVRTXG4gICAgICAgICAgOiB0aGlzLnBhcmFtc1trZXldO1xuXG4gICAgICB0aGlzLl9kZWZsYXRlID0gemxpYi5jcmVhdGVEZWZsYXRlUmF3KHtcbiAgICAgICAgLi4udGhpcy5fb3B0aW9ucy56bGliRGVmbGF0ZU9wdGlvbnMsXG4gICAgICAgIHdpbmRvd0JpdHNcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9kZWZsYXRlW2tUb3RhbExlbmd0aF0gPSAwO1xuICAgICAgdGhpcy5fZGVmbGF0ZVtrQnVmZmVyc10gPSBbXTtcblxuICAgICAgdGhpcy5fZGVmbGF0ZS5vbignZGF0YScsIGRlZmxhdGVPbkRhdGEpO1xuICAgIH1cblxuICAgIHRoaXMuX2RlZmxhdGVba0NhbGxiYWNrXSA9IGNhbGxiYWNrO1xuXG4gICAgdGhpcy5fZGVmbGF0ZS53cml0ZShkYXRhKTtcbiAgICB0aGlzLl9kZWZsYXRlLmZsdXNoKHpsaWIuWl9TWU5DX0ZMVVNILCAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuX2RlZmxhdGUpIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gVGhlIGRlZmxhdGUgc3RyZWFtIHdhcyBjbG9zZWQgd2hpbGUgZGF0YSB3YXMgYmVpbmcgcHJvY2Vzc2VkLlxuICAgICAgICAvL1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBkYXRhID0gYnVmZmVyVXRpbC5jb25jYXQoXG4gICAgICAgIHRoaXMuX2RlZmxhdGVba0J1ZmZlcnNdLFxuICAgICAgICB0aGlzLl9kZWZsYXRlW2tUb3RhbExlbmd0aF1cbiAgICAgICk7XG5cbiAgICAgIGlmIChmaW4pIHtcbiAgICAgICAgZGF0YSA9IG5ldyBGYXN0QnVmZmVyKGRhdGEuYnVmZmVyLCBkYXRhLmJ5dGVPZmZzZXQsIGRhdGEubGVuZ3RoIC0gNCk7XG4gICAgICB9XG5cbiAgICAgIC8vXG4gICAgICAvLyBFbnN1cmUgdGhhdCB0aGUgY2FsbGJhY2sgd2lsbCBub3QgYmUgY2FsbGVkIGFnYWluIGluXG4gICAgICAvLyBgUGVyTWVzc2FnZURlZmxhdGUjY2xlYW51cCgpYC5cbiAgICAgIC8vXG4gICAgICB0aGlzLl9kZWZsYXRlW2tDYWxsYmFja10gPSBudWxsO1xuXG4gICAgICB0aGlzLl9kZWZsYXRlW2tUb3RhbExlbmd0aF0gPSAwO1xuICAgICAgdGhpcy5fZGVmbGF0ZVtrQnVmZmVyc10gPSBbXTtcblxuICAgICAgaWYgKGZpbiAmJiB0aGlzLnBhcmFtc1tgJHtlbmRwb2ludH1fbm9fY29udGV4dF90YWtlb3ZlcmBdKSB7XG4gICAgICAgIHRoaXMuX2RlZmxhdGUucmVzZXQoKTtcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2sobnVsbCwgZGF0YSk7XG4gICAgfSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQZXJNZXNzYWdlRGVmbGF0ZTtcblxuLyoqXG4gKiBUaGUgbGlzdGVuZXIgb2YgdGhlIGB6bGliLkRlZmxhdGVSYXdgIHN0cmVhbSBgJ2RhdGEnYCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gY2h1bmsgQSBjaHVuayBvZiBkYXRhXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBkZWZsYXRlT25EYXRhKGNodW5rKSB7XG4gIHRoaXNba0J1ZmZlcnNdLnB1c2goY2h1bmspO1xuICB0aGlzW2tUb3RhbExlbmd0aF0gKz0gY2h1bmsubGVuZ3RoO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYHpsaWIuSW5mbGF0ZVJhd2Agc3RyZWFtIGAnZGF0YSdgIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBjaHVuayBBIGNodW5rIG9mIGRhdGFcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGluZmxhdGVPbkRhdGEoY2h1bmspIHtcbiAgdGhpc1trVG90YWxMZW5ndGhdICs9IGNodW5rLmxlbmd0aDtcblxuICBpZiAoXG4gICAgdGhpc1trUGVyTWVzc2FnZURlZmxhdGVdLl9tYXhQYXlsb2FkIDwgMSB8fFxuICAgIHRoaXNba1RvdGFsTGVuZ3RoXSA8PSB0aGlzW2tQZXJNZXNzYWdlRGVmbGF0ZV0uX21heFBheWxvYWRcbiAgKSB7XG4gICAgdGhpc1trQnVmZmVyc10ucHVzaChjaHVuayk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpc1trRXJyb3JdID0gbmV3IFJhbmdlRXJyb3IoJ01heCBwYXlsb2FkIHNpemUgZXhjZWVkZWQnKTtcbiAgdGhpc1trRXJyb3JdLmNvZGUgPSAnV1NfRVJSX1VOU1VQUE9SVEVEX01FU1NBR0VfTEVOR1RIJztcbiAgdGhpc1trRXJyb3JdW2tTdGF0dXNDb2RlXSA9IDEwMDk7XG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2RhdGEnLCBpbmZsYXRlT25EYXRhKTtcbiAgdGhpcy5yZXNldCgpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYHpsaWIuSW5mbGF0ZVJhd2Agc3RyZWFtIGAnZXJyb3InYCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnIgVGhlIGVtaXR0ZWQgZXJyb3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGluZmxhdGVPbkVycm9yKGVycikge1xuICAvL1xuICAvLyBUaGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgYFpsaWIjY2xvc2UoKWAgYXMgdGhlIGhhbmRsZSBpcyBhdXRvbWF0aWNhbGx5XG4gIC8vIGNsb3NlZCB3aGVuIGFuIGVycm9yIGlzIGVtaXR0ZWQuXG4gIC8vXG4gIHRoaXNba1Blck1lc3NhZ2VEZWZsYXRlXS5faW5mbGF0ZSA9IG51bGw7XG4gIGVycltrU3RhdHVzQ29kZV0gPSAxMDA3O1xuICB0aGlzW2tDYWxsYmFja10oZXJyKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgeyBXcml0YWJsZSB9ID0gcmVxdWlyZSgnc3RyZWFtJyk7XG5cbmNvbnN0IFBlck1lc3NhZ2VEZWZsYXRlID0gcmVxdWlyZSgnLi9wZXJtZXNzYWdlLWRlZmxhdGUnKTtcbmNvbnN0IHtcbiAgQklOQVJZX1RZUEVTLFxuICBFTVBUWV9CVUZGRVIsXG4gIGtTdGF0dXNDb2RlLFxuICBrV2ViU29ja2V0XG59ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbmNvbnN0IHsgY29uY2F0LCB0b0FycmF5QnVmZmVyLCB1bm1hc2sgfSA9IHJlcXVpcmUoJy4vYnVmZmVyLXV0aWwnKTtcbmNvbnN0IHsgaXNWYWxpZFN0YXR1c0NvZGUsIGlzVmFsaWRVVEY4IH0gPSByZXF1aXJlKCcuL3ZhbGlkYXRpb24nKTtcblxuY29uc3QgRmFzdEJ1ZmZlciA9IEJ1ZmZlcltTeW1ib2wuc3BlY2llc107XG5jb25zdCBHRVRfSU5GTyA9IDA7XG5jb25zdCBHRVRfUEFZTE9BRF9MRU5HVEhfMTYgPSAxO1xuY29uc3QgR0VUX1BBWUxPQURfTEVOR1RIXzY0ID0gMjtcbmNvbnN0IEdFVF9NQVNLID0gMztcbmNvbnN0IEdFVF9EQVRBID0gNDtcbmNvbnN0IElORkxBVElORyA9IDU7XG5cbi8qKlxuICogSHlCaSBSZWNlaXZlciBpbXBsZW1lbnRhdGlvbi5cbiAqXG4gKiBAZXh0ZW5kcyBXcml0YWJsZVxuICovXG5jbGFzcyBSZWNlaXZlciBleHRlbmRzIFdyaXRhYmxlIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBSZWNlaXZlciBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBPcHRpb25zIG9iamVjdFxuICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuYmluYXJ5VHlwZT1ub2RlYnVmZmVyXSBUaGUgdHlwZSBmb3IgYmluYXJ5IGRhdGFcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLmV4dGVuc2lvbnNdIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBuZWdvdGlhdGVkXG4gICAqICAgICBleHRlbnNpb25zXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuaXNTZXJ2ZXI9ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIHRvIG9wZXJhdGUgaW5cbiAgICogICAgIGNsaWVudCBvciBzZXJ2ZXIgbW9kZVxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4UGF5bG9hZD0wXSBUaGUgbWF4aW11bSBhbGxvd2VkIG1lc3NhZ2UgbGVuZ3RoXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuc2tpcFVURjhWYWxpZGF0aW9uPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvclxuICAgKiAgICAgbm90IHRvIHNraXAgVVRGLTggdmFsaWRhdGlvbiBmb3IgdGV4dCBhbmQgY2xvc2UgbWVzc2FnZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLl9iaW5hcnlUeXBlID0gb3B0aW9ucy5iaW5hcnlUeXBlIHx8IEJJTkFSWV9UWVBFU1swXTtcbiAgICB0aGlzLl9leHRlbnNpb25zID0gb3B0aW9ucy5leHRlbnNpb25zIHx8IHt9O1xuICAgIHRoaXMuX2lzU2VydmVyID0gISFvcHRpb25zLmlzU2VydmVyO1xuICAgIHRoaXMuX21heFBheWxvYWQgPSBvcHRpb25zLm1heFBheWxvYWQgfCAwO1xuICAgIHRoaXMuX3NraXBVVEY4VmFsaWRhdGlvbiA9ICEhb3B0aW9ucy5za2lwVVRGOFZhbGlkYXRpb247XG4gICAgdGhpc1trV2ViU29ja2V0XSA9IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuX2J1ZmZlcmVkQnl0ZXMgPSAwO1xuICAgIHRoaXMuX2J1ZmZlcnMgPSBbXTtcblxuICAgIHRoaXMuX2NvbXByZXNzZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9wYXlsb2FkTGVuZ3RoID0gMDtcbiAgICB0aGlzLl9tYXNrID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuX2ZyYWdtZW50ZWQgPSAwO1xuICAgIHRoaXMuX21hc2tlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2ZpbiA9IGZhbHNlO1xuICAgIHRoaXMuX29wY29kZSA9IDA7XG5cbiAgICB0aGlzLl90b3RhbFBheWxvYWRMZW5ndGggPSAwO1xuICAgIHRoaXMuX21lc3NhZ2VMZW5ndGggPSAwO1xuICAgIHRoaXMuX2ZyYWdtZW50cyA9IFtdO1xuXG4gICAgdGhpcy5fc3RhdGUgPSBHRVRfSU5GTztcbiAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogSW1wbGVtZW50cyBgV3JpdGFibGUucHJvdG90eXBlLl93cml0ZSgpYC5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGNodW5rIFRoZSBjaHVuayBvZiBkYXRhIHRvIHdyaXRlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBlbmNvZGluZyBUaGUgY2hhcmFjdGVyIGVuY29kaW5nIG9mIGBjaHVua2BcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2IgQ2FsbGJhY2tcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF93cml0ZShjaHVuaywgZW5jb2RpbmcsIGNiKSB7XG4gICAgaWYgKHRoaXMuX29wY29kZSA9PT0gMHgwOCAmJiB0aGlzLl9zdGF0ZSA9PSBHRVRfSU5GTykgcmV0dXJuIGNiKCk7XG5cbiAgICB0aGlzLl9idWZmZXJlZEJ5dGVzICs9IGNodW5rLmxlbmd0aDtcbiAgICB0aGlzLl9idWZmZXJzLnB1c2goY2h1bmspO1xuICAgIHRoaXMuc3RhcnRMb29wKGNiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zdW1lcyBgbmAgYnl0ZXMgZnJvbSB0aGUgYnVmZmVyZWQgZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IG4gVGhlIG51bWJlciBvZiBieXRlcyB0byBjb25zdW1lXG4gICAqIEByZXR1cm4ge0J1ZmZlcn0gVGhlIGNvbnN1bWVkIGJ5dGVzXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjb25zdW1lKG4pIHtcbiAgICB0aGlzLl9idWZmZXJlZEJ5dGVzIC09IG47XG5cbiAgICBpZiAobiA9PT0gdGhpcy5fYnVmZmVyc1swXS5sZW5ndGgpIHJldHVybiB0aGlzLl9idWZmZXJzLnNoaWZ0KCk7XG5cbiAgICBpZiAobiA8IHRoaXMuX2J1ZmZlcnNbMF0ubGVuZ3RoKSB7XG4gICAgICBjb25zdCBidWYgPSB0aGlzLl9idWZmZXJzWzBdO1xuICAgICAgdGhpcy5fYnVmZmVyc1swXSA9IG5ldyBGYXN0QnVmZmVyKFxuICAgICAgICBidWYuYnVmZmVyLFxuICAgICAgICBidWYuYnl0ZU9mZnNldCArIG4sXG4gICAgICAgIGJ1Zi5sZW5ndGggLSBuXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gbmV3IEZhc3RCdWZmZXIoYnVmLmJ1ZmZlciwgYnVmLmJ5dGVPZmZzZXQsIG4pO1xuICAgIH1cblxuICAgIGNvbnN0IGRzdCA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShuKTtcblxuICAgIGRvIHtcbiAgICAgIGNvbnN0IGJ1ZiA9IHRoaXMuX2J1ZmZlcnNbMF07XG4gICAgICBjb25zdCBvZmZzZXQgPSBkc3QubGVuZ3RoIC0gbjtcblxuICAgICAgaWYgKG4gPj0gYnVmLmxlbmd0aCkge1xuICAgICAgICBkc3Quc2V0KHRoaXMuX2J1ZmZlcnMuc2hpZnQoKSwgb2Zmc2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRzdC5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmLmJ1ZmZlciwgYnVmLmJ5dGVPZmZzZXQsIG4pLCBvZmZzZXQpO1xuICAgICAgICB0aGlzLl9idWZmZXJzWzBdID0gbmV3IEZhc3RCdWZmZXIoXG4gICAgICAgICAgYnVmLmJ1ZmZlcixcbiAgICAgICAgICBidWYuYnl0ZU9mZnNldCArIG4sXG4gICAgICAgICAgYnVmLmxlbmd0aCAtIG5cbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgbiAtPSBidWYubGVuZ3RoO1xuICAgIH0gd2hpbGUgKG4gPiAwKTtcblxuICAgIHJldHVybiBkc3Q7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIHRoZSBwYXJzaW5nIGxvb3AuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdGFydExvb3AoY2IpIHtcbiAgICBsZXQgZXJyO1xuICAgIHRoaXMuX2xvb3AgPSB0cnVlO1xuXG4gICAgZG8ge1xuICAgICAgc3dpdGNoICh0aGlzLl9zdGF0ZSkge1xuICAgICAgICBjYXNlIEdFVF9JTkZPOlxuICAgICAgICAgIGVyciA9IHRoaXMuZ2V0SW5mbygpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEdFVF9QQVlMT0FEX0xFTkdUSF8xNjpcbiAgICAgICAgICBlcnIgPSB0aGlzLmdldFBheWxvYWRMZW5ndGgxNigpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEdFVF9QQVlMT0FEX0xFTkdUSF82NDpcbiAgICAgICAgICBlcnIgPSB0aGlzLmdldFBheWxvYWRMZW5ndGg2NCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEdFVF9NQVNLOlxuICAgICAgICAgIHRoaXMuZ2V0TWFzaygpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEdFVF9EQVRBOlxuICAgICAgICAgIGVyciA9IHRoaXMuZ2V0RGF0YShjYik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gYElORkxBVElOR2BcbiAgICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gd2hpbGUgKHRoaXMuX2xvb3ApO1xuXG4gICAgY2IoZXJyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgZmlyc3QgdHdvIGJ5dGVzIG9mIGEgZnJhbWUuXG4gICAqXG4gICAqIEByZXR1cm4geyhSYW5nZUVycm9yfHVuZGVmaW5lZCl9IEEgcG9zc2libGUgZXJyb3JcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldEluZm8oKSB7XG4gICAgaWYgKHRoaXMuX2J1ZmZlcmVkQnl0ZXMgPCAyKSB7XG4gICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYnVmID0gdGhpcy5jb25zdW1lKDIpO1xuXG4gICAgaWYgKChidWZbMF0gJiAweDMwKSAhPT0gMHgwMCkge1xuICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGVycm9yKFxuICAgICAgICBSYW5nZUVycm9yLFxuICAgICAgICAnUlNWMiBhbmQgUlNWMyBtdXN0IGJlIGNsZWFyJyxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICAgMTAwMixcbiAgICAgICAgJ1dTX0VSUl9VTkVYUEVDVEVEX1JTVl8yXzMnXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXByZXNzZWQgPSAoYnVmWzBdICYgMHg0MCkgPT09IDB4NDA7XG5cbiAgICBpZiAoY29tcHJlc3NlZCAmJiAhdGhpcy5fZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXSkge1xuICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgcmV0dXJuIGVycm9yKFxuICAgICAgICBSYW5nZUVycm9yLFxuICAgICAgICAnUlNWMSBtdXN0IGJlIGNsZWFyJyxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICAgMTAwMixcbiAgICAgICAgJ1dTX0VSUl9VTkVYUEVDVEVEX1JTVl8xJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLl9maW4gPSAoYnVmWzBdICYgMHg4MCkgPT09IDB4ODA7XG4gICAgdGhpcy5fb3Bjb2RlID0gYnVmWzBdICYgMHgwZjtcbiAgICB0aGlzLl9wYXlsb2FkTGVuZ3RoID0gYnVmWzFdICYgMHg3ZjtcblxuICAgIGlmICh0aGlzLl9vcGNvZGUgPT09IDB4MDApIHtcbiAgICAgIGlmIChjb21wcmVzc2VkKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGVycm9yKFxuICAgICAgICAgIFJhbmdlRXJyb3IsXG4gICAgICAgICAgJ1JTVjEgbXVzdCBiZSBjbGVhcicsXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAxMDAyLFxuICAgICAgICAgICdXU19FUlJfVU5FWFBFQ1RFRF9SU1ZfMSdcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLl9mcmFnbWVudGVkKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGVycm9yKFxuICAgICAgICAgIFJhbmdlRXJyb3IsXG4gICAgICAgICAgJ2ludmFsaWQgb3Bjb2RlIDAnLFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgMTAwMixcbiAgICAgICAgICAnV1NfRVJSX0lOVkFMSURfT1BDT0RFJ1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9vcGNvZGUgPSB0aGlzLl9mcmFnbWVudGVkO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fb3Bjb2RlID09PSAweDAxIHx8IHRoaXMuX29wY29kZSA9PT0gMHgwMikge1xuICAgICAgaWYgKHRoaXMuX2ZyYWdtZW50ZWQpIHtcbiAgICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZXJyb3IoXG4gICAgICAgICAgUmFuZ2VFcnJvcixcbiAgICAgICAgICBgaW52YWxpZCBvcGNvZGUgJHt0aGlzLl9vcGNvZGV9YCxcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIDEwMDIsXG4gICAgICAgICAgJ1dTX0VSUl9JTlZBTElEX09QQ09ERSdcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fY29tcHJlc3NlZCA9IGNvbXByZXNzZWQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9vcGNvZGUgPiAweDA3ICYmIHRoaXMuX29wY29kZSA8IDB4MGIpIHtcbiAgICAgIGlmICghdGhpcy5fZmluKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGVycm9yKFxuICAgICAgICAgIFJhbmdlRXJyb3IsXG4gICAgICAgICAgJ0ZJTiBtdXN0IGJlIHNldCcsXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAxMDAyLFxuICAgICAgICAgICdXU19FUlJfRVhQRUNURURfRklOJ1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcHJlc3NlZCkge1xuICAgICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBlcnJvcihcbiAgICAgICAgICBSYW5nZUVycm9yLFxuICAgICAgICAgICdSU1YxIG11c3QgYmUgY2xlYXInLFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgMTAwMixcbiAgICAgICAgICAnV1NfRVJSX1VORVhQRUNURURfUlNWXzEnXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5fcGF5bG9hZExlbmd0aCA+IDB4N2QgfHxcbiAgICAgICAgKHRoaXMuX29wY29kZSA9PT0gMHgwOCAmJiB0aGlzLl9wYXlsb2FkTGVuZ3RoID09PSAxKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGVycm9yKFxuICAgICAgICAgIFJhbmdlRXJyb3IsXG4gICAgICAgICAgYGludmFsaWQgcGF5bG9hZCBsZW5ndGggJHt0aGlzLl9wYXlsb2FkTGVuZ3RofWAsXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAxMDAyLFxuICAgICAgICAgICdXU19FUlJfSU5WQUxJRF9DT05UUk9MX1BBWUxPQURfTEVOR1RIJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICByZXR1cm4gZXJyb3IoXG4gICAgICAgIFJhbmdlRXJyb3IsXG4gICAgICAgIGBpbnZhbGlkIG9wY29kZSAke3RoaXMuX29wY29kZX1gLFxuICAgICAgICB0cnVlLFxuICAgICAgICAxMDAyLFxuICAgICAgICAnV1NfRVJSX0lOVkFMSURfT1BDT0RFJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX2ZpbiAmJiAhdGhpcy5fZnJhZ21lbnRlZCkgdGhpcy5fZnJhZ21lbnRlZCA9IHRoaXMuX29wY29kZTtcbiAgICB0aGlzLl9tYXNrZWQgPSAoYnVmWzFdICYgMHg4MCkgPT09IDB4ODA7XG5cbiAgICBpZiAodGhpcy5faXNTZXJ2ZXIpIHtcbiAgICAgIGlmICghdGhpcy5fbWFza2VkKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGVycm9yKFxuICAgICAgICAgIFJhbmdlRXJyb3IsXG4gICAgICAgICAgJ01BU0sgbXVzdCBiZSBzZXQnLFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgMTAwMixcbiAgICAgICAgICAnV1NfRVJSX0VYUEVDVEVEX01BU0snXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLl9tYXNrZWQpIHtcbiAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgIHJldHVybiBlcnJvcihcbiAgICAgICAgUmFuZ2VFcnJvcixcbiAgICAgICAgJ01BU0sgbXVzdCBiZSBjbGVhcicsXG4gICAgICAgIHRydWUsXG4gICAgICAgIDEwMDIsXG4gICAgICAgICdXU19FUlJfVU5FWFBFQ1RFRF9NQVNLJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcGF5bG9hZExlbmd0aCA9PT0gMTI2KSB0aGlzLl9zdGF0ZSA9IEdFVF9QQVlMT0FEX0xFTkdUSF8xNjtcbiAgICBlbHNlIGlmICh0aGlzLl9wYXlsb2FkTGVuZ3RoID09PSAxMjcpIHRoaXMuX3N0YXRlID0gR0VUX1BBWUxPQURfTEVOR1RIXzY0O1xuICAgIGVsc2UgcmV0dXJuIHRoaXMuaGF2ZUxlbmd0aCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgZXh0ZW5kZWQgcGF5bG9hZCBsZW5ndGggKDcrMTYpLlxuICAgKlxuICAgKiBAcmV0dXJuIHsoUmFuZ2VFcnJvcnx1bmRlZmluZWQpfSBBIHBvc3NpYmxlIGVycm9yXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRQYXlsb2FkTGVuZ3RoMTYoKSB7XG4gICAgaWYgKHRoaXMuX2J1ZmZlcmVkQnl0ZXMgPCAyKSB7XG4gICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcGF5bG9hZExlbmd0aCA9IHRoaXMuY29uc3VtZSgyKS5yZWFkVUludDE2QkUoMCk7XG4gICAgcmV0dXJuIHRoaXMuaGF2ZUxlbmd0aCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgZXh0ZW5kZWQgcGF5bG9hZCBsZW5ndGggKDcrNjQpLlxuICAgKlxuICAgKiBAcmV0dXJuIHsoUmFuZ2VFcnJvcnx1bmRlZmluZWQpfSBBIHBvc3NpYmxlIGVycm9yXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRQYXlsb2FkTGVuZ3RoNjQoKSB7XG4gICAgaWYgKHRoaXMuX2J1ZmZlcmVkQnl0ZXMgPCA4KSB7XG4gICAgICB0aGlzLl9sb29wID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYnVmID0gdGhpcy5jb25zdW1lKDgpO1xuICAgIGNvbnN0IG51bSA9IGJ1Zi5yZWFkVUludDMyQkUoMCk7XG5cbiAgICAvL1xuICAgIC8vIFRoZSBtYXhpbXVtIHNhZmUgaW50ZWdlciBpbiBKYXZhU2NyaXB0IGlzIDJeNTMgLSAxLiBBbiBlcnJvciBpcyByZXR1cm5lZFxuICAgIC8vIGlmIHBheWxvYWQgbGVuZ3RoIGlzIGdyZWF0ZXIgdGhhbiB0aGlzIG51bWJlci5cbiAgICAvL1xuICAgIGlmIChudW0gPiBNYXRoLnBvdygyLCA1MyAtIDMyKSAtIDEpIHtcbiAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgIHJldHVybiBlcnJvcihcbiAgICAgICAgUmFuZ2VFcnJvcixcbiAgICAgICAgJ1Vuc3VwcG9ydGVkIFdlYlNvY2tldCBmcmFtZTogcGF5bG9hZCBsZW5ndGggPiAyXjUzIC0gMScsXG4gICAgICAgIGZhbHNlLFxuICAgICAgICAxMDA5LFxuICAgICAgICAnV1NfRVJSX1VOU1VQUE9SVEVEX0RBVEFfUEFZTE9BRF9MRU5HVEgnXG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuX3BheWxvYWRMZW5ndGggPSBudW0gKiBNYXRoLnBvdygyLCAzMikgKyBidWYucmVhZFVJbnQzMkJFKDQpO1xuICAgIHJldHVybiB0aGlzLmhhdmVMZW5ndGgoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXlsb2FkIGxlbmd0aCBoYXMgYmVlbiByZWFkLlxuICAgKlxuICAgKiBAcmV0dXJuIHsoUmFuZ2VFcnJvcnx1bmRlZmluZWQpfSBBIHBvc3NpYmxlIGVycm9yXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYXZlTGVuZ3RoKCkge1xuICAgIGlmICh0aGlzLl9wYXlsb2FkTGVuZ3RoICYmIHRoaXMuX29wY29kZSA8IDB4MDgpIHtcbiAgICAgIHRoaXMuX3RvdGFsUGF5bG9hZExlbmd0aCArPSB0aGlzLl9wYXlsb2FkTGVuZ3RoO1xuICAgICAgaWYgKHRoaXMuX3RvdGFsUGF5bG9hZExlbmd0aCA+IHRoaXMuX21heFBheWxvYWQgJiYgdGhpcy5fbWF4UGF5bG9hZCA+IDApIHtcbiAgICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZXJyb3IoXG4gICAgICAgICAgUmFuZ2VFcnJvcixcbiAgICAgICAgICAnTWF4IHBheWxvYWQgc2l6ZSBleGNlZWRlZCcsXG4gICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgMTAwOSxcbiAgICAgICAgICAnV1NfRVJSX1VOU1VQUE9SVEVEX01FU1NBR0VfTEVOR1RIJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9tYXNrZWQpIHRoaXMuX3N0YXRlID0gR0VUX01BU0s7XG4gICAgZWxzZSB0aGlzLl9zdGF0ZSA9IEdFVF9EQVRBO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRzIG1hc2sgYnl0ZXMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXRNYXNrKCkge1xuICAgIGlmICh0aGlzLl9idWZmZXJlZEJ5dGVzIDwgNCkge1xuICAgICAgdGhpcy5fbG9vcCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX21hc2sgPSB0aGlzLmNvbnN1bWUoNCk7XG4gICAgdGhpcy5fc3RhdGUgPSBHRVRfREFUQTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyBkYXRhIGJ5dGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAcmV0dXJuIHsoRXJyb3J8UmFuZ2VFcnJvcnx1bmRlZmluZWQpfSBBIHBvc3NpYmxlIGVycm9yXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXREYXRhKGNiKSB7XG4gICAgbGV0IGRhdGEgPSBFTVBUWV9CVUZGRVI7XG5cbiAgICBpZiAodGhpcy5fcGF5bG9hZExlbmd0aCkge1xuICAgICAgaWYgKHRoaXMuX2J1ZmZlcmVkQnl0ZXMgPCB0aGlzLl9wYXlsb2FkTGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBkYXRhID0gdGhpcy5jb25zdW1lKHRoaXMuX3BheWxvYWRMZW5ndGgpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuX21hc2tlZCAmJlxuICAgICAgICAodGhpcy5fbWFza1swXSB8IHRoaXMuX21hc2tbMV0gfCB0aGlzLl9tYXNrWzJdIHwgdGhpcy5fbWFza1szXSkgIT09IDBcbiAgICAgICkge1xuICAgICAgICB1bm1hc2soZGF0YSwgdGhpcy5fbWFzayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX29wY29kZSA+IDB4MDcpIHJldHVybiB0aGlzLmNvbnRyb2xNZXNzYWdlKGRhdGEpO1xuXG4gICAgaWYgKHRoaXMuX2NvbXByZXNzZWQpIHtcbiAgICAgIHRoaXMuX3N0YXRlID0gSU5GTEFUSU5HO1xuICAgICAgdGhpcy5kZWNvbXByZXNzKGRhdGEsIGNiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5sZW5ndGgpIHtcbiAgICAgIC8vXG4gICAgICAvLyBUaGlzIG1lc3NhZ2UgaXMgbm90IGNvbXByZXNzZWQgc28gaXRzIGxlbmd0aCBpcyB0aGUgc3VtIG9mIHRoZSBwYXlsb2FkXG4gICAgICAvLyBsZW5ndGggb2YgYWxsIGZyYWdtZW50cy5cbiAgICAgIC8vXG4gICAgICB0aGlzLl9tZXNzYWdlTGVuZ3RoID0gdGhpcy5fdG90YWxQYXlsb2FkTGVuZ3RoO1xuICAgICAgdGhpcy5fZnJhZ21lbnRzLnB1c2goZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZGF0YU1lc3NhZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNvbXByZXNzZXMgZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgQ29tcHJlc3NlZCBkYXRhXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZWNvbXByZXNzKGRhdGEsIGNiKSB7XG4gICAgY29uc3QgcGVyTWVzc2FnZURlZmxhdGUgPSB0aGlzLl9leHRlbnNpb25zW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdO1xuXG4gICAgcGVyTWVzc2FnZURlZmxhdGUuZGVjb21wcmVzcyhkYXRhLCB0aGlzLl9maW4sIChlcnIsIGJ1ZikgPT4ge1xuICAgICAgaWYgKGVycikgcmV0dXJuIGNiKGVycik7XG5cbiAgICAgIGlmIChidWYubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VMZW5ndGggKz0gYnVmLmxlbmd0aDtcbiAgICAgICAgaWYgKHRoaXMuX21lc3NhZ2VMZW5ndGggPiB0aGlzLl9tYXhQYXlsb2FkICYmIHRoaXMuX21heFBheWxvYWQgPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIGNiKFxuICAgICAgICAgICAgZXJyb3IoXG4gICAgICAgICAgICAgIFJhbmdlRXJyb3IsXG4gICAgICAgICAgICAgICdNYXggcGF5bG9hZCBzaXplIGV4Y2VlZGVkJyxcbiAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgIDEwMDksXG4gICAgICAgICAgICAgICdXU19FUlJfVU5TVVBQT1JURURfTUVTU0FHRV9MRU5HVEgnXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2ZyYWdtZW50cy5wdXNoKGJ1Zik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGVyID0gdGhpcy5kYXRhTWVzc2FnZSgpO1xuICAgICAgaWYgKGVyKSByZXR1cm4gY2IoZXIpO1xuXG4gICAgICB0aGlzLnN0YXJ0TG9vcChjYik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIGRhdGEgbWVzc2FnZS5cbiAgICpcbiAgICogQHJldHVybiB7KEVycm9yfHVuZGVmaW5lZCl9IEEgcG9zc2libGUgZXJyb3JcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGRhdGFNZXNzYWdlKCkge1xuICAgIGlmICh0aGlzLl9maW4pIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VMZW5ndGggPSB0aGlzLl9tZXNzYWdlTGVuZ3RoO1xuICAgICAgY29uc3QgZnJhZ21lbnRzID0gdGhpcy5fZnJhZ21lbnRzO1xuXG4gICAgICB0aGlzLl90b3RhbFBheWxvYWRMZW5ndGggPSAwO1xuICAgICAgdGhpcy5fbWVzc2FnZUxlbmd0aCA9IDA7XG4gICAgICB0aGlzLl9mcmFnbWVudGVkID0gMDtcbiAgICAgIHRoaXMuX2ZyYWdtZW50cyA9IFtdO1xuXG4gICAgICBpZiAodGhpcy5fb3Bjb2RlID09PSAyKSB7XG4gICAgICAgIGxldCBkYXRhO1xuXG4gICAgICAgIGlmICh0aGlzLl9iaW5hcnlUeXBlID09PSAnbm9kZWJ1ZmZlcicpIHtcbiAgICAgICAgICBkYXRhID0gY29uY2F0KGZyYWdtZW50cywgbWVzc2FnZUxlbmd0aCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYmluYXJ5VHlwZSA9PT0gJ2FycmF5YnVmZmVyJykge1xuICAgICAgICAgIGRhdGEgPSB0b0FycmF5QnVmZmVyKGNvbmNhdChmcmFnbWVudHMsIG1lc3NhZ2VMZW5ndGgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkYXRhID0gZnJhZ21lbnRzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0KCdtZXNzYWdlJywgZGF0YSwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBidWYgPSBjb25jYXQoZnJhZ21lbnRzLCBtZXNzYWdlTGVuZ3RoKTtcblxuICAgICAgICBpZiAoIXRoaXMuX3NraXBVVEY4VmFsaWRhdGlvbiAmJiAhaXNWYWxpZFVURjgoYnVmKSkge1xuICAgICAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gZXJyb3IoXG4gICAgICAgICAgICBFcnJvcixcbiAgICAgICAgICAgICdpbnZhbGlkIFVURi04IHNlcXVlbmNlJyxcbiAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAxMDA3LFxuICAgICAgICAgICAgJ1dTX0VSUl9JTlZBTElEX1VURjgnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW1pdCgnbWVzc2FnZScsIGJ1ZiwgZmFsc2UpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3N0YXRlID0gR0VUX0lORk87XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlcyBhIGNvbnRyb2wgbWVzc2FnZS5cbiAgICpcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGRhdGEgRGF0YSB0byBoYW5kbGVcbiAgICogQHJldHVybiB7KEVycm9yfFJhbmdlRXJyb3J8dW5kZWZpbmVkKX0gQSBwb3NzaWJsZSBlcnJvclxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY29udHJvbE1lc3NhZ2UoZGF0YSkge1xuICAgIGlmICh0aGlzLl9vcGNvZGUgPT09IDB4MDgpIHtcbiAgICAgIHRoaXMuX2xvb3AgPSBmYWxzZTtcblxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnY29uY2x1ZGUnLCAxMDA1LCBFTVBUWV9CVUZGRVIpO1xuICAgICAgICB0aGlzLmVuZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY29kZSA9IGRhdGEucmVhZFVJbnQxNkJFKDApO1xuXG4gICAgICAgIGlmICghaXNWYWxpZFN0YXR1c0NvZGUoY29kZSkpIHtcbiAgICAgICAgICByZXR1cm4gZXJyb3IoXG4gICAgICAgICAgICBSYW5nZUVycm9yLFxuICAgICAgICAgICAgYGludmFsaWQgc3RhdHVzIGNvZGUgJHtjb2RlfWAsXG4gICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgMTAwMixcbiAgICAgICAgICAgICdXU19FUlJfSU5WQUxJRF9DTE9TRV9DT0RFJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBidWYgPSBuZXcgRmFzdEJ1ZmZlcihcbiAgICAgICAgICBkYXRhLmJ1ZmZlcixcbiAgICAgICAgICBkYXRhLmJ5dGVPZmZzZXQgKyAyLFxuICAgICAgICAgIGRhdGEubGVuZ3RoIC0gMlxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghdGhpcy5fc2tpcFVURjhWYWxpZGF0aW9uICYmICFpc1ZhbGlkVVRGOChidWYpKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yKFxuICAgICAgICAgICAgRXJyb3IsXG4gICAgICAgICAgICAnaW52YWxpZCBVVEYtOCBzZXF1ZW5jZScsXG4gICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgMTAwNyxcbiAgICAgICAgICAgICdXU19FUlJfSU5WQUxJRF9VVEY4J1xuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtaXQoJ2NvbmNsdWRlJywgY29kZSwgYnVmKTtcbiAgICAgICAgdGhpcy5lbmQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX29wY29kZSA9PT0gMHgwOSkge1xuICAgICAgdGhpcy5lbWl0KCdwaW5nJywgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW1pdCgncG9uZycsIGRhdGEpO1xuICAgIH1cblxuICAgIHRoaXMuX3N0YXRlID0gR0VUX0lORk87XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWNlaXZlcjtcblxuLyoqXG4gKiBCdWlsZHMgYW4gZXJyb3Igb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb24obmV3OkVycm9yfFJhbmdlRXJyb3IpfSBFcnJvckN0b3IgVGhlIGVycm9yIGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZVxuICogQHBhcmFtIHtCb29sZWFufSBwcmVmaXggU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIGFkZCBhIGRlZmF1bHQgcHJlZml4IHRvXG4gKiAgICAgYG1lc3NhZ2VgXG4gKiBAcGFyYW0ge051bWJlcn0gc3RhdHVzQ29kZSBUaGUgc3RhdHVzIGNvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBlcnJvckNvZGUgVGhlIGV4cG9zZWQgZXJyb3IgY29kZVxuICogQHJldHVybiB7KEVycm9yfFJhbmdlRXJyb3IpfSBUaGUgZXJyb3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGVycm9yKEVycm9yQ3RvciwgbWVzc2FnZSwgcHJlZml4LCBzdGF0dXNDb2RlLCBlcnJvckNvZGUpIHtcbiAgY29uc3QgZXJyID0gbmV3IEVycm9yQ3RvcihcbiAgICBwcmVmaXggPyBgSW52YWxpZCBXZWJTb2NrZXQgZnJhbWU6ICR7bWVzc2FnZX1gIDogbWVzc2FnZVxuICApO1xuXG4gIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGVyciwgZXJyb3IpO1xuICBlcnIuY29kZSA9IGVycm9yQ29kZTtcbiAgZXJyW2tTdGF0dXNDb2RlXSA9IHN0YXR1c0NvZGU7XG4gIHJldHVybiBlcnI7XG59XG4iLCIvKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFtcImVycm9yXCIsIHsgXCJ2YXJzSWdub3JlUGF0dGVyblwiOiBcIl5uZXR8dGxzJFwiIH1dICovXG5cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgbmV0ID0gcmVxdWlyZSgnbmV0Jyk7XG5jb25zdCB0bHMgPSByZXF1aXJlKCd0bHMnKTtcbmNvbnN0IHsgcmFuZG9tRmlsbFN5bmMgfSA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuXG5jb25zdCBQZXJNZXNzYWdlRGVmbGF0ZSA9IHJlcXVpcmUoJy4vcGVybWVzc2FnZS1kZWZsYXRlJyk7XG5jb25zdCB7IEVNUFRZX0JVRkZFUiB9ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbmNvbnN0IHsgaXNWYWxpZFN0YXR1c0NvZGUgfSA9IHJlcXVpcmUoJy4vdmFsaWRhdGlvbicpO1xuY29uc3QgeyBtYXNrOiBhcHBseU1hc2ssIHRvQnVmZmVyIH0gPSByZXF1aXJlKCcuL2J1ZmZlci11dGlsJyk7XG5cbmNvbnN0IGtCeXRlTGVuZ3RoID0gU3ltYm9sKCdrQnl0ZUxlbmd0aCcpO1xuY29uc3QgbWFza0J1ZmZlciA9IEJ1ZmZlci5hbGxvYyg0KTtcblxuLyoqXG4gKiBIeUJpIFNlbmRlciBpbXBsZW1lbnRhdGlvbi5cbiAqL1xuY2xhc3MgU2VuZGVyIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBTZW5kZXIgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7KG5ldC5Tb2NrZXR8dGxzLlNvY2tldCl9IHNvY2tldCBUaGUgY29ubmVjdGlvbiBzb2NrZXRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtleHRlbnNpb25zXSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgbmVnb3RpYXRlZCBleHRlbnNpb25zXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtnZW5lcmF0ZU1hc2tdIFRoZSBmdW5jdGlvbiB1c2VkIHRvIGdlbmVyYXRlIHRoZSBtYXNraW5nXG4gICAqICAgICBrZXlcbiAgICovXG4gIGNvbnN0cnVjdG9yKHNvY2tldCwgZXh0ZW5zaW9ucywgZ2VuZXJhdGVNYXNrKSB7XG4gICAgdGhpcy5fZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnMgfHwge307XG5cbiAgICBpZiAoZ2VuZXJhdGVNYXNrKSB7XG4gICAgICB0aGlzLl9nZW5lcmF0ZU1hc2sgPSBnZW5lcmF0ZU1hc2s7XG4gICAgICB0aGlzLl9tYXNrQnVmZmVyID0gQnVmZmVyLmFsbG9jKDQpO1xuICAgIH1cblxuICAgIHRoaXMuX3NvY2tldCA9IHNvY2tldDtcblxuICAgIHRoaXMuX2ZpcnN0RnJhZ21lbnQgPSB0cnVlO1xuICAgIHRoaXMuX2NvbXByZXNzID0gZmFsc2U7XG5cbiAgICB0aGlzLl9idWZmZXJlZEJ5dGVzID0gMDtcbiAgICB0aGlzLl9kZWZsYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLl9xdWV1ZSA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIEZyYW1lcyBhIHBpZWNlIG9mIGRhdGEgYWNjb3JkaW5nIHRvIHRoZSBIeUJpIFdlYlNvY2tldCBwcm90b2NvbC5cbiAgICpcbiAgICogQHBhcmFtIHsoQnVmZmVyfFN0cmluZyl9IGRhdGEgVGhlIGRhdGEgdG8gZnJhbWVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgT3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5maW49ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBzZXQgdGhlXG4gICAqICAgICBGSU4gYml0XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLmdlbmVyYXRlTWFza10gVGhlIGZ1bmN0aW9uIHVzZWQgdG8gZ2VuZXJhdGUgdGhlXG4gICAqICAgICBtYXNraW5nIGtleVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm1hc2s9ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBtYXNrXG4gICAqICAgICBgZGF0YWBcbiAgICogQHBhcmFtIHtCdWZmZXJ9IFtvcHRpb25zLm1hc2tCdWZmZXJdIFRoZSBidWZmZXIgdXNlZCB0byBzdG9yZSB0aGUgbWFza2luZ1xuICAgKiAgICAga2V5XG4gICAqIEBwYXJhbSB7TnVtYmVyfSBvcHRpb25zLm9wY29kZSBUaGUgb3Bjb2RlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMucmVhZE9ubHk9ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIGBkYXRhYCBjYW4gYmVcbiAgICogICAgIG1vZGlmaWVkXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMucnN2MT1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIHNldCB0aGVcbiAgICogICAgIFJTVjEgYml0XG4gICAqIEByZXR1cm4geyhCdWZmZXJ8U3RyaW5nKVtdfSBUaGUgZnJhbWVkIGRhdGFcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc3RhdGljIGZyYW1lKGRhdGEsIG9wdGlvbnMpIHtcbiAgICBsZXQgbWFzaztcbiAgICBsZXQgbWVyZ2UgPSBmYWxzZTtcbiAgICBsZXQgb2Zmc2V0ID0gMjtcbiAgICBsZXQgc2tpcE1hc2tpbmcgPSBmYWxzZTtcblxuICAgIGlmIChvcHRpb25zLm1hc2spIHtcbiAgICAgIG1hc2sgPSBvcHRpb25zLm1hc2tCdWZmZXIgfHwgbWFza0J1ZmZlcjtcblxuICAgICAgaWYgKG9wdGlvbnMuZ2VuZXJhdGVNYXNrKSB7XG4gICAgICAgIG9wdGlvbnMuZ2VuZXJhdGVNYXNrKG1hc2spO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmFuZG9tRmlsbFN5bmMobWFzaywgMCwgNCk7XG4gICAgICB9XG5cbiAgICAgIHNraXBNYXNraW5nID0gKG1hc2tbMF0gfCBtYXNrWzFdIHwgbWFza1syXSB8IG1hc2tbM10pID09PSAwO1xuICAgICAgb2Zmc2V0ID0gNjtcbiAgICB9XG5cbiAgICBsZXQgZGF0YUxlbmd0aDtcblxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChcbiAgICAgICAgKCFvcHRpb25zLm1hc2sgfHwgc2tpcE1hc2tpbmcpICYmXG4gICAgICAgIG9wdGlvbnNba0J5dGVMZW5ndGhdICE9PSB1bmRlZmluZWRcbiAgICAgICkge1xuICAgICAgICBkYXRhTGVuZ3RoID0gb3B0aW9uc1trQnl0ZUxlbmd0aF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhID0gQnVmZmVyLmZyb20oZGF0YSk7XG4gICAgICAgIGRhdGFMZW5ndGggPSBkYXRhLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YUxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgICAgbWVyZ2UgPSBvcHRpb25zLm1hc2sgJiYgb3B0aW9ucy5yZWFkT25seSAmJiAhc2tpcE1hc2tpbmc7XG4gICAgfVxuXG4gICAgbGV0IHBheWxvYWRMZW5ndGggPSBkYXRhTGVuZ3RoO1xuXG4gICAgaWYgKGRhdGFMZW5ndGggPj0gNjU1MzYpIHtcbiAgICAgIG9mZnNldCArPSA4O1xuICAgICAgcGF5bG9hZExlbmd0aCA9IDEyNztcbiAgICB9IGVsc2UgaWYgKGRhdGFMZW5ndGggPiAxMjUpIHtcbiAgICAgIG9mZnNldCArPSAyO1xuICAgICAgcGF5bG9hZExlbmd0aCA9IDEyNjtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXQgPSBCdWZmZXIuYWxsb2NVbnNhZmUobWVyZ2UgPyBkYXRhTGVuZ3RoICsgb2Zmc2V0IDogb2Zmc2V0KTtcblxuICAgIHRhcmdldFswXSA9IG9wdGlvbnMuZmluID8gb3B0aW9ucy5vcGNvZGUgfCAweDgwIDogb3B0aW9ucy5vcGNvZGU7XG4gICAgaWYgKG9wdGlvbnMucnN2MSkgdGFyZ2V0WzBdIHw9IDB4NDA7XG5cbiAgICB0YXJnZXRbMV0gPSBwYXlsb2FkTGVuZ3RoO1xuXG4gICAgaWYgKHBheWxvYWRMZW5ndGggPT09IDEyNikge1xuICAgICAgdGFyZ2V0LndyaXRlVUludDE2QkUoZGF0YUxlbmd0aCwgMik7XG4gICAgfSBlbHNlIGlmIChwYXlsb2FkTGVuZ3RoID09PSAxMjcpIHtcbiAgICAgIHRhcmdldFsyXSA9IHRhcmdldFszXSA9IDA7XG4gICAgICB0YXJnZXQud3JpdGVVSW50QkUoZGF0YUxlbmd0aCwgNCwgNik7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLm1hc2spIHJldHVybiBbdGFyZ2V0LCBkYXRhXTtcblxuICAgIHRhcmdldFsxXSB8PSAweDgwO1xuICAgIHRhcmdldFtvZmZzZXQgLSA0XSA9IG1hc2tbMF07XG4gICAgdGFyZ2V0W29mZnNldCAtIDNdID0gbWFza1sxXTtcbiAgICB0YXJnZXRbb2Zmc2V0IC0gMl0gPSBtYXNrWzJdO1xuICAgIHRhcmdldFtvZmZzZXQgLSAxXSA9IG1hc2tbM107XG5cbiAgICBpZiAoc2tpcE1hc2tpbmcpIHJldHVybiBbdGFyZ2V0LCBkYXRhXTtcblxuICAgIGlmIChtZXJnZSkge1xuICAgICAgYXBwbHlNYXNrKGRhdGEsIG1hc2ssIHRhcmdldCwgb2Zmc2V0LCBkYXRhTGVuZ3RoKTtcbiAgICAgIHJldHVybiBbdGFyZ2V0XTtcbiAgICB9XG5cbiAgICBhcHBseU1hc2soZGF0YSwgbWFzaywgZGF0YSwgMCwgZGF0YUxlbmd0aCk7XG4gICAgcmV0dXJuIFt0YXJnZXQsIGRhdGFdO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgY2xvc2UgbWVzc2FnZSB0byB0aGUgb3RoZXIgcGVlci5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb2RlXSBUaGUgc3RhdHVzIGNvZGUgY29tcG9uZW50IG9mIHRoZSBib2R5XG4gICAqIEBwYXJhbSB7KFN0cmluZ3xCdWZmZXIpfSBbZGF0YV0gVGhlIG1lc3NhZ2UgY29tcG9uZW50IG9mIHRoZSBib2R5XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW21hc2s9ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBtYXNrIHRoZSBtZXNzYWdlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl0gQ2FsbGJhY2tcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY2xvc2UoY29kZSwgZGF0YSwgbWFzaywgY2IpIHtcbiAgICBsZXQgYnVmO1xuXG4gICAgaWYgKGNvZGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgYnVmID0gRU1QVFlfQlVGRkVSO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvZGUgIT09ICdudW1iZXInIHx8ICFpc1ZhbGlkU3RhdHVzQ29kZShjb2RlKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHZhbGlkIGVycm9yIGNvZGUgbnVtYmVyJyk7XG4gICAgfSBlbHNlIGlmIChkYXRhID09PSB1bmRlZmluZWQgfHwgIWRhdGEubGVuZ3RoKSB7XG4gICAgICBidWYgPSBCdWZmZXIuYWxsb2NVbnNhZmUoMik7XG4gICAgICBidWYud3JpdGVVSW50MTZCRShjb2RlLCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGgoZGF0YSk7XG5cbiAgICAgIGlmIChsZW5ndGggPiAxMjMpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSBtZXNzYWdlIG11c3Qgbm90IGJlIGdyZWF0ZXIgdGhhbiAxMjMgYnl0ZXMnKTtcbiAgICAgIH1cblxuICAgICAgYnVmID0gQnVmZmVyLmFsbG9jVW5zYWZlKDIgKyBsZW5ndGgpO1xuICAgICAgYnVmLndyaXRlVUludDE2QkUoY29kZSwgMCk7XG5cbiAgICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgYnVmLndyaXRlKGRhdGEsIDIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmLnNldChkYXRhLCAyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgW2tCeXRlTGVuZ3RoXTogYnVmLmxlbmd0aCxcbiAgICAgIGZpbjogdHJ1ZSxcbiAgICAgIGdlbmVyYXRlTWFzazogdGhpcy5fZ2VuZXJhdGVNYXNrLFxuICAgICAgbWFzayxcbiAgICAgIG1hc2tCdWZmZXI6IHRoaXMuX21hc2tCdWZmZXIsXG4gICAgICBvcGNvZGU6IDB4MDgsXG4gICAgICByZWFkT25seTogZmFsc2UsXG4gICAgICByc3YxOiBmYWxzZVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5fZGVmbGF0aW5nKSB7XG4gICAgICB0aGlzLmVucXVldWUoW3RoaXMuZGlzcGF0Y2gsIGJ1ZiwgZmFsc2UsIG9wdGlvbnMsIGNiXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VuZEZyYW1lKFNlbmRlci5mcmFtZShidWYsIG9wdGlvbnMpLCBjYik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgcGluZyBtZXNzYWdlIHRvIHRoZSBvdGhlciBwZWVyLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGRhdGEgVGhlIG1lc3NhZ2UgdG8gc2VuZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFttYXNrPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gbWFzayBgZGF0YWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXSBDYWxsYmFja1xuICAgKiBAcHVibGljXG4gICAqL1xuICBwaW5nKGRhdGEsIG1hc2ssIGNiKSB7XG4gICAgbGV0IGJ5dGVMZW5ndGg7XG4gICAgbGV0IHJlYWRPbmx5O1xuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgYnl0ZUxlbmd0aCA9IEJ1ZmZlci5ieXRlTGVuZ3RoKGRhdGEpO1xuICAgICAgcmVhZE9ubHkgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IHRvQnVmZmVyKGRhdGEpO1xuICAgICAgYnl0ZUxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgICAgcmVhZE9ubHkgPSB0b0J1ZmZlci5yZWFkT25seTtcbiAgICB9XG5cbiAgICBpZiAoYnl0ZUxlbmd0aCA+IDEyNSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSBkYXRhIHNpemUgbXVzdCBub3QgYmUgZ3JlYXRlciB0aGFuIDEyNSBieXRlcycpO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBba0J5dGVMZW5ndGhdOiBieXRlTGVuZ3RoLFxuICAgICAgZmluOiB0cnVlLFxuICAgICAgZ2VuZXJhdGVNYXNrOiB0aGlzLl9nZW5lcmF0ZU1hc2ssXG4gICAgICBtYXNrLFxuICAgICAgbWFza0J1ZmZlcjogdGhpcy5fbWFza0J1ZmZlcixcbiAgICAgIG9wY29kZTogMHgwOSxcbiAgICAgIHJlYWRPbmx5LFxuICAgICAgcnN2MTogZmFsc2VcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuX2RlZmxhdGluZykge1xuICAgICAgdGhpcy5lbnF1ZXVlKFt0aGlzLmRpc3BhdGNoLCBkYXRhLCBmYWxzZSwgb3B0aW9ucywgY2JdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZW5kRnJhbWUoU2VuZGVyLmZyYW1lKGRhdGEsIG9wdGlvbnMpLCBjYik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgcG9uZyBtZXNzYWdlIHRvIHRoZSBvdGhlciBwZWVyLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGRhdGEgVGhlIG1lc3NhZ2UgdG8gc2VuZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFttYXNrPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gbWFzayBgZGF0YWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXSBDYWxsYmFja1xuICAgKiBAcHVibGljXG4gICAqL1xuICBwb25nKGRhdGEsIG1hc2ssIGNiKSB7XG4gICAgbGV0IGJ5dGVMZW5ndGg7XG4gICAgbGV0IHJlYWRPbmx5O1xuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgYnl0ZUxlbmd0aCA9IEJ1ZmZlci5ieXRlTGVuZ3RoKGRhdGEpO1xuICAgICAgcmVhZE9ubHkgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IHRvQnVmZmVyKGRhdGEpO1xuICAgICAgYnl0ZUxlbmd0aCA9IGRhdGEubGVuZ3RoO1xuICAgICAgcmVhZE9ubHkgPSB0b0J1ZmZlci5yZWFkT25seTtcbiAgICB9XG5cbiAgICBpZiAoYnl0ZUxlbmd0aCA+IDEyNSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSBkYXRhIHNpemUgbXVzdCBub3QgYmUgZ3JlYXRlciB0aGFuIDEyNSBieXRlcycpO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBba0J5dGVMZW5ndGhdOiBieXRlTGVuZ3RoLFxuICAgICAgZmluOiB0cnVlLFxuICAgICAgZ2VuZXJhdGVNYXNrOiB0aGlzLl9nZW5lcmF0ZU1hc2ssXG4gICAgICBtYXNrLFxuICAgICAgbWFza0J1ZmZlcjogdGhpcy5fbWFza0J1ZmZlcixcbiAgICAgIG9wY29kZTogMHgwYSxcbiAgICAgIHJlYWRPbmx5LFxuICAgICAgcnN2MTogZmFsc2VcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuX2RlZmxhdGluZykge1xuICAgICAgdGhpcy5lbnF1ZXVlKFt0aGlzLmRpc3BhdGNoLCBkYXRhLCBmYWxzZSwgb3B0aW9ucywgY2JdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZW5kRnJhbWUoU2VuZGVyLmZyYW1lKGRhdGEsIG9wdGlvbnMpLCBjYik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgZGF0YSBtZXNzYWdlIHRvIHRoZSBvdGhlciBwZWVyLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IGRhdGEgVGhlIG1lc3NhZ2UgdG8gc2VuZFxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPcHRpb25zIG9iamVjdFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmJpbmFyeT1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgYGRhdGFgIGlzIGJpbmFyeVxuICAgKiAgICAgb3IgdGV4dFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmNvbXByZXNzPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG9cbiAgICogICAgIGNvbXByZXNzIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmZpbj1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgdGhlIGZyYWdtZW50IGlzIHRoZVxuICAgKiAgICAgbGFzdCBvbmVcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tYXNrPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gbWFza1xuICAgKiAgICAgYGRhdGFgXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl0gQ2FsbGJhY2tcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2VuZChkYXRhLCBvcHRpb25zLCBjYikge1xuICAgIGNvbnN0IHBlck1lc3NhZ2VEZWZsYXRlID0gdGhpcy5fZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXTtcbiAgICBsZXQgb3Bjb2RlID0gb3B0aW9ucy5iaW5hcnkgPyAyIDogMTtcbiAgICBsZXQgcnN2MSA9IG9wdGlvbnMuY29tcHJlc3M7XG5cbiAgICBsZXQgYnl0ZUxlbmd0aDtcbiAgICBsZXQgcmVhZE9ubHk7XG5cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICBieXRlTGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGgoZGF0YSk7XG4gICAgICByZWFkT25seSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhID0gdG9CdWZmZXIoZGF0YSk7XG4gICAgICBieXRlTGVuZ3RoID0gZGF0YS5sZW5ndGg7XG4gICAgICByZWFkT25seSA9IHRvQnVmZmVyLnJlYWRPbmx5O1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9maXJzdEZyYWdtZW50KSB7XG4gICAgICB0aGlzLl9maXJzdEZyYWdtZW50ID0gZmFsc2U7XG4gICAgICBpZiAoXG4gICAgICAgIHJzdjEgJiZcbiAgICAgICAgcGVyTWVzc2FnZURlZmxhdGUgJiZcbiAgICAgICAgcGVyTWVzc2FnZURlZmxhdGUucGFyYW1zW1xuICAgICAgICAgIHBlck1lc3NhZ2VEZWZsYXRlLl9pc1NlcnZlclxuICAgICAgICAgICAgPyAnc2VydmVyX25vX2NvbnRleHRfdGFrZW92ZXInXG4gICAgICAgICAgICA6ICdjbGllbnRfbm9fY29udGV4dF90YWtlb3ZlcidcbiAgICAgICAgXVxuICAgICAgKSB7XG4gICAgICAgIHJzdjEgPSBieXRlTGVuZ3RoID49IHBlck1lc3NhZ2VEZWZsYXRlLl90aHJlc2hvbGQ7XG4gICAgICB9XG4gICAgICB0aGlzLl9jb21wcmVzcyA9IHJzdjE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJzdjEgPSBmYWxzZTtcbiAgICAgIG9wY29kZSA9IDA7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuZmluKSB0aGlzLl9maXJzdEZyYWdtZW50ID0gdHJ1ZTtcblxuICAgIGlmIChwZXJNZXNzYWdlRGVmbGF0ZSkge1xuICAgICAgY29uc3Qgb3B0cyA9IHtcbiAgICAgICAgW2tCeXRlTGVuZ3RoXTogYnl0ZUxlbmd0aCxcbiAgICAgICAgZmluOiBvcHRpb25zLmZpbixcbiAgICAgICAgZ2VuZXJhdGVNYXNrOiB0aGlzLl9nZW5lcmF0ZU1hc2ssXG4gICAgICAgIG1hc2s6IG9wdGlvbnMubWFzayxcbiAgICAgICAgbWFza0J1ZmZlcjogdGhpcy5fbWFza0J1ZmZlcixcbiAgICAgICAgb3Bjb2RlLFxuICAgICAgICByZWFkT25seSxcbiAgICAgICAgcnN2MVxuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMuX2RlZmxhdGluZykge1xuICAgICAgICB0aGlzLmVucXVldWUoW3RoaXMuZGlzcGF0Y2gsIGRhdGEsIHRoaXMuX2NvbXByZXNzLCBvcHRzLCBjYl0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaChkYXRhLCB0aGlzLl9jb21wcmVzcywgb3B0cywgY2IpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbmRGcmFtZShcbiAgICAgICAgU2VuZGVyLmZyYW1lKGRhdGEsIHtcbiAgICAgICAgICBba0J5dGVMZW5ndGhdOiBieXRlTGVuZ3RoLFxuICAgICAgICAgIGZpbjogb3B0aW9ucy5maW4sXG4gICAgICAgICAgZ2VuZXJhdGVNYXNrOiB0aGlzLl9nZW5lcmF0ZU1hc2ssXG4gICAgICAgICAgbWFzazogb3B0aW9ucy5tYXNrLFxuICAgICAgICAgIG1hc2tCdWZmZXI6IHRoaXMuX21hc2tCdWZmZXIsXG4gICAgICAgICAgb3Bjb2RlLFxuICAgICAgICAgIHJlYWRPbmx5LFxuICAgICAgICAgIHJzdjE6IGZhbHNlXG4gICAgICAgIH0pLFxuICAgICAgICBjYlxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2hlcyBhIG1lc3NhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7KEJ1ZmZlcnxTdHJpbmcpfSBkYXRhIFRoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICogQHBhcmFtIHtCb29sZWFufSBbY29tcHJlc3M9ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBjb21wcmVzc1xuICAgKiAgICAgYGRhdGFgXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIE9wdGlvbnMgb2JqZWN0XG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuZmluPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gc2V0IHRoZVxuICAgKiAgICAgRklOIGJpdFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5nZW5lcmF0ZU1hc2tdIFRoZSBmdW5jdGlvbiB1c2VkIHRvIGdlbmVyYXRlIHRoZVxuICAgKiAgICAgbWFza2luZyBrZXlcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tYXNrPWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gbWFza1xuICAgKiAgICAgYGRhdGFgXG4gICAqIEBwYXJhbSB7QnVmZmVyfSBbb3B0aW9ucy5tYXNrQnVmZmVyXSBUaGUgYnVmZmVyIHVzZWQgdG8gc3RvcmUgdGhlIG1hc2tpbmdcbiAgICogICAgIGtleVxuICAgKiBAcGFyYW0ge051bWJlcn0gb3B0aW9ucy5vcGNvZGUgVGhlIG9wY29kZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnJlYWRPbmx5PWZhbHNlXSBTcGVjaWZpZXMgd2hldGhlciBgZGF0YWAgY2FuIGJlXG4gICAqICAgICBtb2RpZmllZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnJzdjE9ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIG9yIG5vdCB0byBzZXQgdGhlXG4gICAqICAgICBSU1YxIGJpdFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdIENhbGxiYWNrXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkaXNwYXRjaChkYXRhLCBjb21wcmVzcywgb3B0aW9ucywgY2IpIHtcbiAgICBpZiAoIWNvbXByZXNzKSB7XG4gICAgICB0aGlzLnNlbmRGcmFtZShTZW5kZXIuZnJhbWUoZGF0YSwgb3B0aW9ucyksIGNiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwZXJNZXNzYWdlRGVmbGF0ZSA9IHRoaXMuX2V4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV07XG5cbiAgICB0aGlzLl9idWZmZXJlZEJ5dGVzICs9IG9wdGlvbnNba0J5dGVMZW5ndGhdO1xuICAgIHRoaXMuX2RlZmxhdGluZyA9IHRydWU7XG4gICAgcGVyTWVzc2FnZURlZmxhdGUuY29tcHJlc3MoZGF0YSwgb3B0aW9ucy5maW4sIChfLCBidWYpID0+IHtcbiAgICAgIGlmICh0aGlzLl9zb2NrZXQuZGVzdHJveWVkKSB7XG4gICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAnVGhlIHNvY2tldCB3YXMgY2xvc2VkIHdoaWxlIGRhdGEgd2FzIGJlaW5nIGNvbXByZXNzZWQnXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJykgY2IoZXJyKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3F1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5fcXVldWVbaV07XG4gICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBwYXJhbXNbcGFyYW1zLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fYnVmZmVyZWRCeXRlcyAtPSBvcHRpb25zW2tCeXRlTGVuZ3RoXTtcbiAgICAgIHRoaXMuX2RlZmxhdGluZyA9IGZhbHNlO1xuICAgICAgb3B0aW9ucy5yZWFkT25seSA9IGZhbHNlO1xuICAgICAgdGhpcy5zZW5kRnJhbWUoU2VuZGVyLmZyYW1lKGJ1Ziwgb3B0aW9ucyksIGNiKTtcbiAgICAgIHRoaXMuZGVxdWV1ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIHF1ZXVlZCBzZW5kIG9wZXJhdGlvbnMuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBkZXF1ZXVlKCkge1xuICAgIHdoaWxlICghdGhpcy5fZGVmbGF0aW5nICYmIHRoaXMuX3F1ZXVlLmxlbmd0aCkge1xuICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5fcXVldWUuc2hpZnQoKTtcblxuICAgICAgdGhpcy5fYnVmZmVyZWRCeXRlcyAtPSBwYXJhbXNbM11ba0J5dGVMZW5ndGhdO1xuICAgICAgUmVmbGVjdC5hcHBseShwYXJhbXNbMF0sIHRoaXMsIHBhcmFtcy5zbGljZSgxKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVucXVldWVzIGEgc2VuZCBvcGVyYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcyBTZW5kIG9wZXJhdGlvbiBwYXJhbWV0ZXJzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZW5xdWV1ZShwYXJhbXMpIHtcbiAgICB0aGlzLl9idWZmZXJlZEJ5dGVzICs9IHBhcmFtc1szXVtrQnl0ZUxlbmd0aF07XG4gICAgdGhpcy5fcXVldWUucHVzaChwYXJhbXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgZnJhbWUuXG4gICAqXG4gICAqIEBwYXJhbSB7QnVmZmVyW119IGxpc3QgVGhlIGZyYW1lIHRvIHNlbmRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXSBDYWxsYmFja1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2VuZEZyYW1lKGxpc3QsIGNiKSB7XG4gICAgaWYgKGxpc3QubGVuZ3RoID09PSAyKSB7XG4gICAgICB0aGlzLl9zb2NrZXQuY29yaygpO1xuICAgICAgdGhpcy5fc29ja2V0LndyaXRlKGxpc3RbMF0pO1xuICAgICAgdGhpcy5fc29ja2V0LndyaXRlKGxpc3RbMV0sIGNiKTtcbiAgICAgIHRoaXMuX3NvY2tldC51bmNvcmsoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc29ja2V0LndyaXRlKGxpc3RbMF0sIGNiKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZW5kZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgRHVwbGV4IH0gPSByZXF1aXJlKCdzdHJlYW0nKTtcblxuLyoqXG4gKiBFbWl0cyB0aGUgYCdjbG9zZSdgIGV2ZW50IG9uIGEgc3RyZWFtLlxuICpcbiAqIEBwYXJhbSB7RHVwbGV4fSBzdHJlYW0gVGhlIHN0cmVhbS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGVtaXRDbG9zZShzdHJlYW0pIHtcbiAgc3RyZWFtLmVtaXQoJ2Nsb3NlJyk7XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgJ2VuZCdgIGV2ZW50LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGR1cGxleE9uRW5kKCkge1xuICBpZiAoIXRoaXMuZGVzdHJveWVkICYmIHRoaXMuX3dyaXRhYmxlU3RhdGUuZmluaXNoZWQpIHtcbiAgICB0aGlzLmRlc3Ryb3koKTtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYCdlcnJvcidgIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyciBUaGUgZXJyb3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGR1cGxleE9uRXJyb3IoZXJyKSB7XG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZHVwbGV4T25FcnJvcik7XG4gIHRoaXMuZGVzdHJveSgpO1xuICBpZiAodGhpcy5saXN0ZW5lckNvdW50KCdlcnJvcicpID09PSAwKSB7XG4gICAgLy8gRG8gbm90IHN1cHByZXNzIHRoZSB0aHJvd2luZyBiZWhhdmlvci5cbiAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfVxufVxuXG4vKipcbiAqIFdyYXBzIGEgYFdlYlNvY2tldGAgaW4gYSBkdXBsZXggc3RyZWFtLlxuICpcbiAqIEBwYXJhbSB7V2ViU29ja2V0fSB3cyBUaGUgYFdlYlNvY2tldGAgdG8gd3JhcFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyBmb3IgdGhlIGBEdXBsZXhgIGNvbnN0cnVjdG9yXG4gKiBAcmV0dXJuIHtEdXBsZXh9IFRoZSBkdXBsZXggc3RyZWFtXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVdlYlNvY2tldFN0cmVhbSh3cywgb3B0aW9ucykge1xuICBsZXQgdGVybWluYXRlT25EZXN0cm95ID0gdHJ1ZTtcblxuICBjb25zdCBkdXBsZXggPSBuZXcgRHVwbGV4KHtcbiAgICAuLi5vcHRpb25zLFxuICAgIGF1dG9EZXN0cm95OiBmYWxzZSxcbiAgICBlbWl0Q2xvc2U6IGZhbHNlLFxuICAgIG9iamVjdE1vZGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlT2JqZWN0TW9kZTogZmFsc2VcbiAgfSk7XG5cbiAgd3Mub24oJ21lc3NhZ2UnLCBmdW5jdGlvbiBtZXNzYWdlKG1zZywgaXNCaW5hcnkpIHtcbiAgICBjb25zdCBkYXRhID1cbiAgICAgICFpc0JpbmFyeSAmJiBkdXBsZXguX3JlYWRhYmxlU3RhdGUub2JqZWN0TW9kZSA/IG1zZy50b1N0cmluZygpIDogbXNnO1xuXG4gICAgaWYgKCFkdXBsZXgucHVzaChkYXRhKSkgd3MucGF1c2UoKTtcbiAgfSk7XG5cbiAgd3Mub25jZSgnZXJyb3InLCBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICBpZiAoZHVwbGV4LmRlc3Ryb3llZCkgcmV0dXJuO1xuXG4gICAgLy8gUHJldmVudCBgd3MudGVybWluYXRlKClgIGZyb20gYmVpbmcgY2FsbGVkIGJ5IGBkdXBsZXguX2Rlc3Ryb3koKWAuXG4gICAgLy9cbiAgICAvLyAtIElmIHRoZSBgJ2Vycm9yJ2AgZXZlbnQgaXMgZW1pdHRlZCBiZWZvcmUgdGhlIGAnb3BlbidgIGV2ZW50LCB0aGVuXG4gICAgLy8gICBgd3MudGVybWluYXRlKClgIGlzIGEgbm9vcCBhcyBubyBzb2NrZXQgaXMgYXNzaWduZWQuXG4gICAgLy8gLSBPdGhlcndpc2UsIHRoZSBlcnJvciBpcyByZS1lbWl0dGVkIGJ5IHRoZSBsaXN0ZW5lciBvZiB0aGUgYCdlcnJvcidgXG4gICAgLy8gICBldmVudCBvZiB0aGUgYFJlY2VpdmVyYCBvYmplY3QuIFRoZSBsaXN0ZW5lciBhbHJlYWR5IGNsb3NlcyB0aGVcbiAgICAvLyAgIGNvbm5lY3Rpb24gYnkgY2FsbGluZyBgd3MuY2xvc2UoKWAuIFRoaXMgYWxsb3dzIGEgY2xvc2UgZnJhbWUgdG8gYmVcbiAgICAvLyAgIHNlbnQgdG8gdGhlIG90aGVyIHBlZXIuIElmIGB3cy50ZXJtaW5hdGUoKWAgaXMgY2FsbGVkIHJpZ2h0IGFmdGVyIHRoaXMsXG4gICAgLy8gICB0aGVuIHRoZSBjbG9zZSBmcmFtZSBtaWdodCBub3QgYmUgc2VudC5cbiAgICB0ZXJtaW5hdGVPbkRlc3Ryb3kgPSBmYWxzZTtcbiAgICBkdXBsZXguZGVzdHJveShlcnIpO1xuICB9KTtcblxuICB3cy5vbmNlKCdjbG9zZScsIGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgIGlmIChkdXBsZXguZGVzdHJveWVkKSByZXR1cm47XG5cbiAgICBkdXBsZXgucHVzaChudWxsKTtcbiAgfSk7XG5cbiAgZHVwbGV4Ll9kZXN0cm95ID0gZnVuY3Rpb24gKGVyciwgY2FsbGJhY2spIHtcbiAgICBpZiAod3MucmVhZHlTdGF0ZSA9PT0gd3MuQ0xPU0VEKSB7XG4gICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhlbWl0Q2xvc2UsIGR1cGxleCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGNhbGxlZCA9IGZhbHNlO1xuXG4gICAgd3Mub25jZSgnZXJyb3InLCBmdW5jdGlvbiBlcnJvcihlcnIpIHtcbiAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICBjYWxsYmFjayhlcnIpO1xuICAgIH0pO1xuXG4gICAgd3Mub25jZSgnY2xvc2UnLCBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgIGlmICghY2FsbGVkKSBjYWxsYmFjayhlcnIpO1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhlbWl0Q2xvc2UsIGR1cGxleCk7XG4gICAgfSk7XG5cbiAgICBpZiAodGVybWluYXRlT25EZXN0cm95KSB3cy50ZXJtaW5hdGUoKTtcbiAgfTtcblxuICBkdXBsZXguX2ZpbmFsID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgaWYgKHdzLnJlYWR5U3RhdGUgPT09IHdzLkNPTk5FQ1RJTkcpIHtcbiAgICAgIHdzLm9uY2UoJ29wZW4nLCBmdW5jdGlvbiBvcGVuKCkge1xuICAgICAgICBkdXBsZXguX2ZpbmFsKGNhbGxiYWNrKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSB2YWx1ZSBvZiB0aGUgYF9zb2NrZXRgIHByb3BlcnR5IGlzIGBudWxsYCBpdCBtZWFucyB0aGF0IGB3c2AgaXMgYVxuICAgIC8vIGNsaWVudCB3ZWJzb2NrZXQgYW5kIHRoZSBoYW5kc2hha2UgZmFpbGVkLiBJbiBmYWN0LCB3aGVuIHRoaXMgaGFwcGVucywgYVxuICAgIC8vIHNvY2tldCBpcyBuZXZlciBhc3NpZ25lZCB0byB0aGUgd2Vic29ja2V0LiBXYWl0IGZvciB0aGUgYCdlcnJvcidgIGV2ZW50XG4gICAgLy8gdGhhdCB3aWxsIGJlIGVtaXR0ZWQgYnkgdGhlIHdlYnNvY2tldC5cbiAgICBpZiAod3MuX3NvY2tldCA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgaWYgKHdzLl9zb2NrZXQuX3dyaXRhYmxlU3RhdGUuZmluaXNoZWQpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgICBpZiAoZHVwbGV4Ll9yZWFkYWJsZVN0YXRlLmVuZEVtaXR0ZWQpIGR1cGxleC5kZXN0cm95KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdzLl9zb2NrZXQub25jZSgnZmluaXNoJywgZnVuY3Rpb24gZmluaXNoKCkge1xuICAgICAgICAvLyBgZHVwbGV4YCBpcyBub3QgZGVzdHJveWVkIGhlcmUgYmVjYXVzZSB0aGUgYCdlbmQnYCBldmVudCB3aWxsIGJlXG4gICAgICAgIC8vIGVtaXR0ZWQgb24gYGR1cGxleGAgYWZ0ZXIgdGhpcyBgJ2ZpbmlzaCdgIGV2ZW50LiBUaGUgRU9GIHNpZ25hbGluZ1xuICAgICAgICAvLyBgbnVsbGAgY2h1bmsgaXMsIGluIGZhY3QsIHB1c2hlZCB3aGVuIHRoZSB3ZWJzb2NrZXQgZW1pdHMgYCdjbG9zZSdgLlxuICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgICB3cy5jbG9zZSgpO1xuICAgIH1cbiAgfTtcblxuICBkdXBsZXguX3JlYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHdzLmlzUGF1c2VkKSB3cy5yZXN1bWUoKTtcbiAgfTtcblxuICBkdXBsZXguX3dyaXRlID0gZnVuY3Rpb24gKGNodW5rLCBlbmNvZGluZywgY2FsbGJhY2spIHtcbiAgICBpZiAod3MucmVhZHlTdGF0ZSA9PT0gd3MuQ09OTkVDVElORykge1xuICAgICAgd3Mub25jZSgnb3BlbicsIGZ1bmN0aW9uIG9wZW4oKSB7XG4gICAgICAgIGR1cGxleC5fd3JpdGUoY2h1bmssIGVuY29kaW5nLCBjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB3cy5zZW5kKGNodW5rLCBjYWxsYmFjayk7XG4gIH07XG5cbiAgZHVwbGV4Lm9uKCdlbmQnLCBkdXBsZXhPbkVuZCk7XG4gIGR1cGxleC5vbignZXJyb3InLCBkdXBsZXhPbkVycm9yKTtcbiAgcmV0dXJuIGR1cGxleDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVXZWJTb2NrZXRTdHJlYW07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IHsgdG9rZW5DaGFycyB9ID0gcmVxdWlyZSgnLi92YWxpZGF0aW9uJyk7XG5cbi8qKlxuICogUGFyc2VzIHRoZSBgU2VjLVdlYlNvY2tldC1Qcm90b2NvbGAgaGVhZGVyIGludG8gYSBzZXQgb2Ygc3VicHJvdG9jb2wgbmFtZXMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlciBUaGUgZmllbGQgdmFsdWUgb2YgdGhlIGhlYWRlclxuICogQHJldHVybiB7U2V0fSBUaGUgc3VicHJvdG9jb2wgbmFtZXNcbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gcGFyc2UoaGVhZGVyKSB7XG4gIGNvbnN0IHByb3RvY29scyA9IG5ldyBTZXQoKTtcbiAgbGV0IHN0YXJ0ID0gLTE7XG4gIGxldCBlbmQgPSAtMTtcbiAgbGV0IGkgPSAwO1xuXG4gIGZvciAoaTsgaSA8IGhlYWRlci5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNvZGUgPSBoZWFkZXIuY2hhckNvZGVBdChpKTtcblxuICAgIGlmIChlbmQgPT09IC0xICYmIHRva2VuQ2hhcnNbY29kZV0gPT09IDEpIHtcbiAgICAgIGlmIChzdGFydCA9PT0gLTEpIHN0YXJ0ID0gaTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgaSAhPT0gMCAmJlxuICAgICAgKGNvZGUgPT09IDB4MjAgLyogJyAnICovIHx8IGNvZGUgPT09IDB4MDkpIC8qICdcXHQnICovXG4gICAgKSB7XG4gICAgICBpZiAoZW5kID09PSAtMSAmJiBzdGFydCAhPT0gLTEpIGVuZCA9IGk7XG4gICAgfSBlbHNlIGlmIChjb2RlID09PSAweDJjIC8qICcsJyAqLykge1xuICAgICAgaWYgKHN0YXJ0ID09PSAtMSkge1xuICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVuZXhwZWN0ZWQgY2hhcmFjdGVyIGF0IGluZGV4ICR7aX1gKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVuZCA9PT0gLTEpIGVuZCA9IGk7XG5cbiAgICAgIGNvbnN0IHByb3RvY29sID0gaGVhZGVyLnNsaWNlKHN0YXJ0LCBlbmQpO1xuXG4gICAgICBpZiAocHJvdG9jb2xzLmhhcyhwcm90b2NvbCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBUaGUgXCIke3Byb3RvY29sfVwiIHN1YnByb3RvY29sIGlzIGR1cGxpY2F0ZWRgKTtcbiAgICAgIH1cblxuICAgICAgcHJvdG9jb2xzLmFkZChwcm90b2NvbCk7XG4gICAgICBzdGFydCA9IGVuZCA9IC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoYFVuZXhwZWN0ZWQgY2hhcmFjdGVyIGF0IGluZGV4ICR7aX1gKTtcbiAgICB9XG4gIH1cblxuICBpZiAoc3RhcnQgPT09IC0xIHx8IGVuZCAhPT0gLTEpIHtcbiAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1VuZXhwZWN0ZWQgZW5kIG9mIGlucHV0Jyk7XG4gIH1cblxuICBjb25zdCBwcm90b2NvbCA9IGhlYWRlci5zbGljZShzdGFydCwgaSk7XG5cbiAgaWYgKHByb3RvY29scy5oYXMocHJvdG9jb2wpKSB7XG4gICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBUaGUgXCIke3Byb3RvY29sfVwiIHN1YnByb3RvY29sIGlzIGR1cGxpY2F0ZWRgKTtcbiAgfVxuXG4gIHByb3RvY29scy5hZGQocHJvdG9jb2wpO1xuICByZXR1cm4gcHJvdG9jb2xzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHsgcGFyc2UgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgeyBpc1V0ZjggfSA9IHJlcXVpcmUoJ2J1ZmZlcicpO1xuXG4vL1xuLy8gQWxsb3dlZCB0b2tlbiBjaGFyYWN0ZXJzOlxuLy9cbi8vICchJywgJyMnLCAnJCcsICclJywgJyYnLCAnJycsICcqJywgJysnLCAnLScsXG4vLyAnLicsIDAtOSwgQS1aLCAnXicsICdfJywgJ2AnLCBhLXosICd8JywgJ34nXG4vL1xuLy8gdG9rZW5DaGFyc1szMl0gPT09IDAgLy8gJyAnXG4vLyB0b2tlbkNoYXJzWzMzXSA9PT0gMSAvLyAnISdcbi8vIHRva2VuQ2hhcnNbMzRdID09PSAwIC8vICdcIidcbi8vIC4uLlxuLy9cbi8vIHByZXR0aWVyLWlnbm9yZVxuY29uc3QgdG9rZW5DaGFycyA9IFtcbiAgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgLy8gMCAtIDE1XG4gIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIDAsIC8vIDE2IC0gMzFcbiAgMCwgMSwgMCwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMSwgMSwgMCwgMSwgMSwgMCwgLy8gMzIgLSA0N1xuICAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAwLCAwLCAwLCAwLCAwLCAvLyA0OCAtIDYzXG4gIDAsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIDEsIC8vIDY0IC0gNzlcbiAgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMSwgMCwgMCwgMCwgMSwgMSwgLy8gODAgLSA5NVxuICAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAvLyA5NiAtIDExMVxuICAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAxLCAwLCAxLCAwLCAxLCAwIC8vIDExMiAtIDEyN1xuXTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdGF0dXMgY29kZSBpcyBhbGxvd2VkIGluIGEgY2xvc2UgZnJhbWUuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGNvZGUgVGhlIHN0YXR1cyBjb2RlXG4gKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIHN0YXR1cyBjb2RlIGlzIHZhbGlkLCBlbHNlIGBmYWxzZWBcbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gaXNWYWxpZFN0YXR1c0NvZGUoY29kZSkge1xuICByZXR1cm4gKFxuICAgIChjb2RlID49IDEwMDAgJiZcbiAgICAgIGNvZGUgPD0gMTAxNCAmJlxuICAgICAgY29kZSAhPT0gMTAwNCAmJlxuICAgICAgY29kZSAhPT0gMTAwNSAmJlxuICAgICAgY29kZSAhPT0gMTAwNikgfHxcbiAgICAoY29kZSA+PSAzMDAwICYmIGNvZGUgPD0gNDk5OSlcbiAgKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBnaXZlbiBidWZmZXIgY29udGFpbnMgb25seSBjb3JyZWN0IFVURi04LlxuICogUG9ydGVkIGZyb20gaHR0cHM6Ly93d3cuY2wuY2FtLmFjLnVrLyU3RW1nazI1L3Vjcy91dGY4X2NoZWNrLmMgYnlcbiAqIE1hcmt1cyBLdWhuLlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWYgVGhlIGJ1ZmZlciB0byBjaGVja1xuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIGBidWZgIGNvbnRhaW5zIG9ubHkgY29ycmVjdCBVVEYtOCwgZWxzZSBgZmFsc2VgXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIF9pc1ZhbGlkVVRGOChidWYpIHtcbiAgY29uc3QgbGVuID0gYnVmLmxlbmd0aDtcbiAgbGV0IGkgPSAwO1xuXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgaWYgKChidWZbaV0gJiAweDgwKSA9PT0gMCkge1xuICAgICAgLy8gMHh4eHh4eHhcbiAgICAgIGkrKztcbiAgICB9IGVsc2UgaWYgKChidWZbaV0gJiAweGUwKSA9PT0gMHhjMCkge1xuICAgICAgLy8gMTEweHh4eHggMTB4eHh4eHhcbiAgICAgIGlmIChcbiAgICAgICAgaSArIDEgPT09IGxlbiB8fFxuICAgICAgICAoYnVmW2kgKyAxXSAmIDB4YzApICE9PSAweDgwIHx8XG4gICAgICAgIChidWZbaV0gJiAweGZlKSA9PT0gMHhjMCAvLyBPdmVybG9uZ1xuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaSArPSAyO1xuICAgIH0gZWxzZSBpZiAoKGJ1ZltpXSAmIDB4ZjApID09PSAweGUwKSB7XG4gICAgICAvLyAxMTEweHh4eCAxMHh4eHh4eCAxMHh4eHh4eFxuICAgICAgaWYgKFxuICAgICAgICBpICsgMiA+PSBsZW4gfHxcbiAgICAgICAgKGJ1ZltpICsgMV0gJiAweGMwKSAhPT0gMHg4MCB8fFxuICAgICAgICAoYnVmW2kgKyAyXSAmIDB4YzApICE9PSAweDgwIHx8XG4gICAgICAgIChidWZbaV0gPT09IDB4ZTAgJiYgKGJ1ZltpICsgMV0gJiAweGUwKSA9PT0gMHg4MCkgfHwgLy8gT3ZlcmxvbmdcbiAgICAgICAgKGJ1ZltpXSA9PT0gMHhlZCAmJiAoYnVmW2kgKyAxXSAmIDB4ZTApID09PSAweGEwKSAvLyBTdXJyb2dhdGUgKFUrRDgwMCAtIFUrREZGRilcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGkgKz0gMztcbiAgICB9IGVsc2UgaWYgKChidWZbaV0gJiAweGY4KSA9PT0gMHhmMCkge1xuICAgICAgLy8gMTExMTB4eHggMTB4eHh4eHggMTB4eHh4eHggMTB4eHh4eHhcbiAgICAgIGlmIChcbiAgICAgICAgaSArIDMgPj0gbGVuIHx8XG4gICAgICAgIChidWZbaSArIDFdICYgMHhjMCkgIT09IDB4ODAgfHxcbiAgICAgICAgKGJ1ZltpICsgMl0gJiAweGMwKSAhPT0gMHg4MCB8fFxuICAgICAgICAoYnVmW2kgKyAzXSAmIDB4YzApICE9PSAweDgwIHx8XG4gICAgICAgIChidWZbaV0gPT09IDB4ZjAgJiYgKGJ1ZltpICsgMV0gJiAweGYwKSA9PT0gMHg4MCkgfHwgLy8gT3ZlcmxvbmdcbiAgICAgICAgKGJ1ZltpXSA9PT0gMHhmNCAmJiBidWZbaSArIDFdID4gMHg4ZikgfHxcbiAgICAgICAgYnVmW2ldID4gMHhmNCAvLyA+IFUrMTBGRkZGXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpICs9IDQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzVmFsaWRTdGF0dXNDb2RlLFxuICBpc1ZhbGlkVVRGODogX2lzVmFsaWRVVEY4LFxuICB0b2tlbkNoYXJzXG59O1xuXG5pZiAoaXNVdGY4KSB7XG4gIG1vZHVsZS5leHBvcnRzLmlzVmFsaWRVVEY4ID0gZnVuY3Rpb24gKGJ1Zikge1xuICAgIHJldHVybiBidWYubGVuZ3RoIDwgMjQgPyBfaXNWYWxpZFVURjgoYnVmKSA6IGlzVXRmOChidWYpO1xuICB9O1xufSAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAgKi8gZWxzZSBpZiAoIXByb2Nlc3MuZW52LldTX05PX1VURl84X1ZBTElEQVRFKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgaXNWYWxpZFVURjggPSByZXF1aXJlKCd1dGYtOC12YWxpZGF0ZScpO1xuXG4gICAgbW9kdWxlLmV4cG9ydHMuaXNWYWxpZFVURjggPSBmdW5jdGlvbiAoYnVmKSB7XG4gICAgICByZXR1cm4gYnVmLmxlbmd0aCA8IDMyID8gX2lzVmFsaWRVVEY4KGJ1ZikgOiBpc1ZhbGlkVVRGOChidWYpO1xuICAgIH07XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBDb250aW51ZSByZWdhcmRsZXNzIG9mIHRoZSBlcnJvci5cbiAgfVxufVxuIiwiLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbXCJlcnJvclwiLCB7IFwidmFyc0lnbm9yZVBhdHRlcm5cIjogXCJebmV0fHRsc3xodHRwcyRcIiB9XSAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbmNvbnN0IGh0dHBzID0gcmVxdWlyZSgnaHR0cHMnKTtcbmNvbnN0IG5ldCA9IHJlcXVpcmUoJ25ldCcpO1xuY29uc3QgdGxzID0gcmVxdWlyZSgndGxzJyk7XG5jb25zdCB7IGNyZWF0ZUhhc2ggfSA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuXG5jb25zdCBleHRlbnNpb24gPSByZXF1aXJlKCcuL2V4dGVuc2lvbicpO1xuY29uc3QgUGVyTWVzc2FnZURlZmxhdGUgPSByZXF1aXJlKCcuL3Blcm1lc3NhZ2UtZGVmbGF0ZScpO1xuY29uc3Qgc3VicHJvdG9jb2wgPSByZXF1aXJlKCcuL3N1YnByb3RvY29sJyk7XG5jb25zdCBXZWJTb2NrZXQgPSByZXF1aXJlKCcuL3dlYnNvY2tldCcpO1xuY29uc3QgeyBHVUlELCBrV2ViU29ja2V0IH0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5jb25zdCBrZXlSZWdleCA9IC9eWysvMC05QS1aYS16XXsyMn09PSQvO1xuXG5jb25zdCBSVU5OSU5HID0gMDtcbmNvbnN0IENMT1NJTkcgPSAxO1xuY29uc3QgQ0xPU0VEID0gMjtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBXZWJTb2NrZXQgc2VydmVyLlxuICpcbiAqIEBleHRlbmRzIEV2ZW50RW1pdHRlclxuICovXG5jbGFzcyBXZWJTb2NrZXRTZXJ2ZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAvKipcbiAgICogQ3JlYXRlIGEgYFdlYlNvY2tldFNlcnZlcmAgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIENvbmZpZ3VyYXRpb24gb3B0aW9uc1xuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuYmFja2xvZz01MTFdIFRoZSBtYXhpbXVtIGxlbmd0aCBvZiB0aGUgcXVldWUgb2ZcbiAgICogICAgIHBlbmRpbmcgY29ubmVjdGlvbnNcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jbGllbnRUcmFja2luZz10cnVlXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG9cbiAgICogICAgIHRyYWNrIGNsaWVudHNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuaGFuZGxlUHJvdG9jb2xzXSBBIGhvb2sgdG8gaGFuZGxlIHByb3RvY29sc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMuaG9zdF0gVGhlIGhvc3RuYW1lIHdoZXJlIHRvIGJpbmQgdGhlIHNlcnZlclxuICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4UGF5bG9hZD0xMDQ4NTc2MDBdIFRoZSBtYXhpbXVtIGFsbG93ZWQgbWVzc2FnZVxuICAgKiAgICAgc2l6ZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLm5vU2VydmVyPWZhbHNlXSBFbmFibGUgbm8gc2VydmVyIG1vZGVcbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnBhdGhdIEFjY2VwdCBvbmx5IGNvbm5lY3Rpb25zIG1hdGNoaW5nIHRoaXMgcGF0aFxuICAgKiBAcGFyYW0geyhCb29sZWFufE9iamVjdCl9IFtvcHRpb25zLnBlck1lc3NhZ2VEZWZsYXRlPWZhbHNlXSBFbmFibGUvZGlzYWJsZVxuICAgKiAgICAgcGVybWVzc2FnZS1kZWZsYXRlXG4gICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5wb3J0XSBUaGUgcG9ydCB3aGVyZSB0byBiaW5kIHRoZSBzZXJ2ZXJcbiAgICogQHBhcmFtIHsoaHR0cC5TZXJ2ZXJ8aHR0cHMuU2VydmVyKX0gW29wdGlvbnMuc2VydmVyXSBBIHByZS1jcmVhdGVkIEhUVFAvU1xuICAgKiAgICAgc2VydmVyIHRvIHVzZVxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLnNraXBVVEY4VmFsaWRhdGlvbj1mYWxzZV0gU3BlY2lmaWVzIHdoZXRoZXIgb3JcbiAgICogICAgIG5vdCB0byBza2lwIFVURi04IHZhbGlkYXRpb24gZm9yIHRleHQgYW5kIGNsb3NlIG1lc3NhZ2VzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRpb25zLnZlcmlmeUNsaWVudF0gQSBob29rIHRvIHJlamVjdCBjb25uZWN0aW9uc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5XZWJTb2NrZXQ9V2ViU29ja2V0XSBTcGVjaWZpZXMgdGhlIGBXZWJTb2NrZXRgXG4gICAqICAgICBjbGFzcyB0byB1c2UuIEl0IG11c3QgYmUgdGhlIGBXZWJTb2NrZXRgIGNsYXNzIG9yIGNsYXNzIHRoYXQgZXh0ZW5kcyBpdFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIEEgbGlzdGVuZXIgZm9yIHRoZSBgbGlzdGVuaW5nYCBldmVudFxuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBzdXBlcigpO1xuXG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIG1heFBheWxvYWQ6IDEwMCAqIDEwMjQgKiAxMDI0LFxuICAgICAgc2tpcFVURjhWYWxpZGF0aW9uOiBmYWxzZSxcbiAgICAgIHBlck1lc3NhZ2VEZWZsYXRlOiBmYWxzZSxcbiAgICAgIGhhbmRsZVByb3RvY29sczogbnVsbCxcbiAgICAgIGNsaWVudFRyYWNraW5nOiB0cnVlLFxuICAgICAgdmVyaWZ5Q2xpZW50OiBudWxsLFxuICAgICAgbm9TZXJ2ZXI6IGZhbHNlLFxuICAgICAgYmFja2xvZzogbnVsbCwgLy8gdXNlIGRlZmF1bHQgKDUxMSBhcyBpbXBsZW1lbnRlZCBpbiBuZXQuanMpXG4gICAgICBzZXJ2ZXI6IG51bGwsXG4gICAgICBob3N0OiBudWxsLFxuICAgICAgcGF0aDogbnVsbCxcbiAgICAgIHBvcnQ6IG51bGwsXG4gICAgICBXZWJTb2NrZXQsXG4gICAgICAuLi5vcHRpb25zXG4gICAgfTtcblxuICAgIGlmIChcbiAgICAgIChvcHRpb25zLnBvcnQgPT0gbnVsbCAmJiAhb3B0aW9ucy5zZXJ2ZXIgJiYgIW9wdGlvbnMubm9TZXJ2ZXIpIHx8XG4gICAgICAob3B0aW9ucy5wb3J0ICE9IG51bGwgJiYgKG9wdGlvbnMuc2VydmVyIHx8IG9wdGlvbnMubm9TZXJ2ZXIpKSB8fFxuICAgICAgKG9wdGlvbnMuc2VydmVyICYmIG9wdGlvbnMubm9TZXJ2ZXIpXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnT25lIGFuZCBvbmx5IG9uZSBvZiB0aGUgXCJwb3J0XCIsIFwic2VydmVyXCIsIG9yIFwibm9TZXJ2ZXJcIiBvcHRpb25zICcgK1xuICAgICAgICAgICdtdXN0IGJlIHNwZWNpZmllZCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMucG9ydCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9zZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcigocmVxLCByZXMpID0+IHtcbiAgICAgICAgY29uc3QgYm9keSA9IGh0dHAuU1RBVFVTX0NPREVTWzQyNl07XG5cbiAgICAgICAgcmVzLndyaXRlSGVhZCg0MjYsIHtcbiAgICAgICAgICAnQ29udGVudC1MZW5ndGgnOiBib2R5Lmxlbmd0aCxcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvcGxhaW4nXG4gICAgICAgIH0pO1xuICAgICAgICByZXMuZW5kKGJvZHkpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9zZXJ2ZXIubGlzdGVuKFxuICAgICAgICBvcHRpb25zLnBvcnQsXG4gICAgICAgIG9wdGlvbnMuaG9zdCxcbiAgICAgICAgb3B0aW9ucy5iYWNrbG9nLFxuICAgICAgICBjYWxsYmFja1xuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuc2VydmVyKSB7XG4gICAgICB0aGlzLl9zZXJ2ZXIgPSBvcHRpb25zLnNlcnZlcjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fc2VydmVyKSB7XG4gICAgICBjb25zdCBlbWl0Q29ubmVjdGlvbiA9IHRoaXMuZW1pdC5iaW5kKHRoaXMsICdjb25uZWN0aW9uJyk7XG5cbiAgICAgIHRoaXMuX3JlbW92ZUxpc3RlbmVycyA9IGFkZExpc3RlbmVycyh0aGlzLl9zZXJ2ZXIsIHtcbiAgICAgICAgbGlzdGVuaW5nOiB0aGlzLmVtaXQuYmluZCh0aGlzLCAnbGlzdGVuaW5nJyksXG4gICAgICAgIGVycm9yOiB0aGlzLmVtaXQuYmluZCh0aGlzLCAnZXJyb3InKSxcbiAgICAgICAgdXBncmFkZTogKHJlcSwgc29ja2V0LCBoZWFkKSA9PiB7XG4gICAgICAgICAgdGhpcy5oYW5kbGVVcGdyYWRlKHJlcSwgc29ja2V0LCBoZWFkLCBlbWl0Q29ubmVjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnBlck1lc3NhZ2VEZWZsYXRlID09PSB0cnVlKSBvcHRpb25zLnBlck1lc3NhZ2VEZWZsYXRlID0ge307XG4gICAgaWYgKG9wdGlvbnMuY2xpZW50VHJhY2tpbmcpIHtcbiAgICAgIHRoaXMuY2xpZW50cyA9IG5ldyBTZXQoKTtcbiAgICAgIHRoaXMuX3Nob3VsZEVtaXRDbG9zZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5fc3RhdGUgPSBSVU5OSU5HO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGJvdW5kIGFkZHJlc3MsIHRoZSBhZGRyZXNzIGZhbWlseSBuYW1lLCBhbmQgcG9ydCBvZiB0aGUgc2VydmVyXG4gICAqIGFzIHJlcG9ydGVkIGJ5IHRoZSBvcGVyYXRpbmcgc3lzdGVtIGlmIGxpc3RlbmluZyBvbiBhbiBJUCBzb2NrZXQuXG4gICAqIElmIHRoZSBzZXJ2ZXIgaXMgbGlzdGVuaW5nIG9uIGEgcGlwZSBvciBVTklYIGRvbWFpbiBzb2NrZXQsIHRoZSBuYW1lIGlzXG4gICAqIHJldHVybmVkIGFzIGEgc3RyaW5nLlxuICAgKlxuICAgKiBAcmV0dXJuIHsoT2JqZWN0fFN0cmluZ3xudWxsKX0gVGhlIGFkZHJlc3Mgb2YgdGhlIHNlcnZlclxuICAgKiBAcHVibGljXG4gICAqL1xuICBhZGRyZXNzKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMubm9TZXJ2ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhlIHNlcnZlciBpcyBvcGVyYXRpbmcgaW4gXCJub1NlcnZlclwiIG1vZGUnKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuX3NlcnZlcikgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHRoaXMuX3NlcnZlci5hZGRyZXNzKCk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcCB0aGUgc2VydmVyIGZyb20gYWNjZXB0aW5nIG5ldyBjb25uZWN0aW9ucyBhbmQgZW1pdCB0aGUgYCdjbG9zZSdgIGV2ZW50XG4gICAqIHdoZW4gYWxsIGV4aXN0aW5nIGNvbm5lY3Rpb25zIGFyZSBjbG9zZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl0gQSBvbmUtdGltZSBsaXN0ZW5lciBmb3IgdGhlIGAnY2xvc2UnYCBldmVudFxuICAgKiBAcHVibGljXG4gICAqL1xuICBjbG9zZShjYikge1xuICAgIGlmICh0aGlzLl9zdGF0ZSA9PT0gQ0xPU0VEKSB7XG4gICAgICBpZiAoY2IpIHtcbiAgICAgICAgdGhpcy5vbmNlKCdjbG9zZScsICgpID0+IHtcbiAgICAgICAgICBjYihuZXcgRXJyb3IoJ1RoZSBzZXJ2ZXIgaXMgbm90IHJ1bm5pbmcnKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBwcm9jZXNzLm5leHRUaWNrKGVtaXRDbG9zZSwgdGhpcyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNiKSB0aGlzLm9uY2UoJ2Nsb3NlJywgY2IpO1xuXG4gICAgaWYgKHRoaXMuX3N0YXRlID09PSBDTE9TSU5HKSByZXR1cm47XG4gICAgdGhpcy5fc3RhdGUgPSBDTE9TSU5HO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5ub1NlcnZlciB8fCB0aGlzLm9wdGlvbnMuc2VydmVyKSB7XG4gICAgICBpZiAodGhpcy5fc2VydmVyKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUxpc3RlbmVycygpO1xuICAgICAgICB0aGlzLl9yZW1vdmVMaXN0ZW5lcnMgPSB0aGlzLl9zZXJ2ZXIgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jbGllbnRzKSB7XG4gICAgICAgIGlmICghdGhpcy5jbGllbnRzLnNpemUpIHtcbiAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGVtaXRDbG9zZSwgdGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fc2hvdWxkRW1pdENsb3NlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhlbWl0Q2xvc2UsIHRoaXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzZXJ2ZXIgPSB0aGlzLl9zZXJ2ZXI7XG5cbiAgICAgIHRoaXMuX3JlbW92ZUxpc3RlbmVycygpO1xuICAgICAgdGhpcy5fcmVtb3ZlTGlzdGVuZXJzID0gdGhpcy5fc2VydmVyID0gbnVsbDtcblxuICAgICAgLy9cbiAgICAgIC8vIFRoZSBIVFRQL1Mgc2VydmVyIHdhcyBjcmVhdGVkIGludGVybmFsbHkuIENsb3NlIGl0LCBhbmQgcmVseSBvbiBpdHNcbiAgICAgIC8vIGAnY2xvc2UnYCBldmVudC5cbiAgICAgIC8vXG4gICAgICBzZXJ2ZXIuY2xvc2UoKCkgPT4ge1xuICAgICAgICBlbWl0Q2xvc2UodGhpcyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VlIGlmIGEgZ2l2ZW4gcmVxdWVzdCBzaG91bGQgYmUgaGFuZGxlZCBieSB0aGlzIHNlcnZlciBpbnN0YW5jZS5cbiAgICpcbiAgICogQHBhcmFtIHtodHRwLkluY29taW5nTWVzc2FnZX0gcmVxIFJlcXVlc3Qgb2JqZWN0IHRvIGluc3BlY3RcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSByZXF1ZXN0IGlzIHZhbGlkLCBlbHNlIGBmYWxzZWBcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2hvdWxkSGFuZGxlKHJlcSkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMucGF0aCkge1xuICAgICAgY29uc3QgaW5kZXggPSByZXEudXJsLmluZGV4T2YoJz8nKTtcbiAgICAgIGNvbnN0IHBhdGhuYW1lID0gaW5kZXggIT09IC0xID8gcmVxLnVybC5zbGljZSgwLCBpbmRleCkgOiByZXEudXJsO1xuXG4gICAgICBpZiAocGF0aG5hbWUgIT09IHRoaXMub3B0aW9ucy5wYXRoKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGEgSFRUUCBVcGdyYWRlIHJlcXVlc3QuXG4gICAqXG4gICAqIEBwYXJhbSB7aHR0cC5JbmNvbWluZ01lc3NhZ2V9IHJlcSBUaGUgcmVxdWVzdCBvYmplY3RcbiAgICogQHBhcmFtIHsobmV0LlNvY2tldHx0bHMuU29ja2V0KX0gc29ja2V0IFRoZSBuZXR3b3JrIHNvY2tldCBiZXR3ZWVuIHRoZVxuICAgKiAgICAgc2VydmVyIGFuZCBjbGllbnRcbiAgICogQHBhcmFtIHtCdWZmZXJ9IGhlYWQgVGhlIGZpcnN0IHBhY2tldCBvZiB0aGUgdXBncmFkZWQgc3RyZWFtXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNiIENhbGxiYWNrXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGhhbmRsZVVwZ3JhZGUocmVxLCBzb2NrZXQsIGhlYWQsIGNiKSB7XG4gICAgc29ja2V0Lm9uKCdlcnJvcicsIHNvY2tldE9uRXJyb3IpO1xuXG4gICAgY29uc3Qga2V5ID0gcmVxLmhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQta2V5J107XG4gICAgY29uc3QgdmVyc2lvbiA9ICtyZXEuaGVhZGVyc1snc2VjLXdlYnNvY2tldC12ZXJzaW9uJ107XG5cbiAgICBpZiAocmVxLm1ldGhvZCAhPT0gJ0dFVCcpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSAnSW52YWxpZCBIVFRQIG1ldGhvZCc7XG4gICAgICBhYm9ydEhhbmRzaGFrZU9yRW1pdHdzQ2xpZW50RXJyb3IodGhpcywgcmVxLCBzb2NrZXQsIDQwNSwgbWVzc2FnZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHJlcS5oZWFkZXJzLnVwZ3JhZGUudG9Mb3dlckNhc2UoKSAhPT0gJ3dlYnNvY2tldCcpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSAnSW52YWxpZCBVcGdyYWRlIGhlYWRlcic7XG4gICAgICBhYm9ydEhhbmRzaGFrZU9yRW1pdHdzQ2xpZW50RXJyb3IodGhpcywgcmVxLCBzb2NrZXQsIDQwMCwgbWVzc2FnZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFrZXkgfHwgIWtleVJlZ2V4LnRlc3Qoa2V5KSkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9ICdNaXNzaW5nIG9yIGludmFsaWQgU2VjLVdlYlNvY2tldC1LZXkgaGVhZGVyJztcbiAgICAgIGFib3J0SGFuZHNoYWtlT3JFbWl0d3NDbGllbnRFcnJvcih0aGlzLCByZXEsIHNvY2tldCwgNDAwLCBtZXNzYWdlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodmVyc2lvbiAhPT0gOCAmJiB2ZXJzaW9uICE9PSAxMykge1xuICAgICAgY29uc3QgbWVzc2FnZSA9ICdNaXNzaW5nIG9yIGludmFsaWQgU2VjLVdlYlNvY2tldC1WZXJzaW9uIGhlYWRlcic7XG4gICAgICBhYm9ydEhhbmRzaGFrZU9yRW1pdHdzQ2xpZW50RXJyb3IodGhpcywgcmVxLCBzb2NrZXQsIDQwMCwgbWVzc2FnZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnNob3VsZEhhbmRsZShyZXEpKSB7XG4gICAgICBhYm9ydEhhbmRzaGFrZShzb2NrZXQsIDQwMCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2VjV2ViU29ja2V0UHJvdG9jb2wgPSByZXEuaGVhZGVyc1snc2VjLXdlYnNvY2tldC1wcm90b2NvbCddO1xuICAgIGxldCBwcm90b2NvbHMgPSBuZXcgU2V0KCk7XG5cbiAgICBpZiAoc2VjV2ViU29ja2V0UHJvdG9jb2wgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcHJvdG9jb2xzID0gc3VicHJvdG9jb2wucGFyc2Uoc2VjV2ViU29ja2V0UHJvdG9jb2wpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAnSW52YWxpZCBTZWMtV2ViU29ja2V0LVByb3RvY29sIGhlYWRlcic7XG4gICAgICAgIGFib3J0SGFuZHNoYWtlT3JFbWl0d3NDbGllbnRFcnJvcih0aGlzLCByZXEsIHNvY2tldCwgNDAwLCBtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNlY1dlYlNvY2tldEV4dGVuc2lvbnMgPSByZXEuaGVhZGVyc1snc2VjLXdlYnNvY2tldC1leHRlbnNpb25zJ107XG4gICAgY29uc3QgZXh0ZW5zaW9ucyA9IHt9O1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy5vcHRpb25zLnBlck1lc3NhZ2VEZWZsYXRlICYmXG4gICAgICBzZWNXZWJTb2NrZXRFeHRlbnNpb25zICE9PSB1bmRlZmluZWRcbiAgICApIHtcbiAgICAgIGNvbnN0IHBlck1lc3NhZ2VEZWZsYXRlID0gbmV3IFBlck1lc3NhZ2VEZWZsYXRlKFxuICAgICAgICB0aGlzLm9wdGlvbnMucGVyTWVzc2FnZURlZmxhdGUsXG4gICAgICAgIHRydWUsXG4gICAgICAgIHRoaXMub3B0aW9ucy5tYXhQYXlsb2FkXG4gICAgICApO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBvZmZlcnMgPSBleHRlbnNpb24ucGFyc2Uoc2VjV2ViU29ja2V0RXh0ZW5zaW9ucyk7XG5cbiAgICAgICAgaWYgKG9mZmVyc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXSkge1xuICAgICAgICAgIHBlck1lc3NhZ2VEZWZsYXRlLmFjY2VwdChvZmZlcnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0pO1xuICAgICAgICAgIGV4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0gPSBwZXJNZXNzYWdlRGVmbGF0ZTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPVxuICAgICAgICAgICdJbnZhbGlkIG9yIHVuYWNjZXB0YWJsZSBTZWMtV2ViU29ja2V0LUV4dGVuc2lvbnMgaGVhZGVyJztcbiAgICAgICAgYWJvcnRIYW5kc2hha2VPckVtaXR3c0NsaWVudEVycm9yKHRoaXMsIHJlcSwgc29ja2V0LCA0MDAsIG1lc3NhZ2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBPcHRpb25hbGx5IGNhbGwgZXh0ZXJuYWwgY2xpZW50IHZlcmlmaWNhdGlvbiBoYW5kbGVyLlxuICAgIC8vXG4gICAgaWYgKHRoaXMub3B0aW9ucy52ZXJpZnlDbGllbnQpIHtcbiAgICAgIGNvbnN0IGluZm8gPSB7XG4gICAgICAgIG9yaWdpbjpcbiAgICAgICAgICByZXEuaGVhZGVyc1tgJHt2ZXJzaW9uID09PSA4ID8gJ3NlYy13ZWJzb2NrZXQtb3JpZ2luJyA6ICdvcmlnaW4nfWBdLFxuICAgICAgICBzZWN1cmU6ICEhKHJlcS5zb2NrZXQuYXV0aG9yaXplZCB8fCByZXEuc29ja2V0LmVuY3J5cHRlZCksXG4gICAgICAgIHJlcVxuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy52ZXJpZnlDbGllbnQubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy52ZXJpZnlDbGllbnQoaW5mbywgKHZlcmlmaWVkLCBjb2RlLCBtZXNzYWdlLCBoZWFkZXJzKSA9PiB7XG4gICAgICAgICAgaWYgKCF2ZXJpZmllZCkge1xuICAgICAgICAgICAgcmV0dXJuIGFib3J0SGFuZHNoYWtlKHNvY2tldCwgY29kZSB8fCA0MDEsIG1lc3NhZ2UsIGhlYWRlcnMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuY29tcGxldGVVcGdyYWRlKFxuICAgICAgICAgICAgZXh0ZW5zaW9ucyxcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIHByb3RvY29scyxcbiAgICAgICAgICAgIHJlcSxcbiAgICAgICAgICAgIHNvY2tldCxcbiAgICAgICAgICAgIGhlYWQsXG4gICAgICAgICAgICBjYlxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5vcHRpb25zLnZlcmlmeUNsaWVudChpbmZvKSkgcmV0dXJuIGFib3J0SGFuZHNoYWtlKHNvY2tldCwgNDAxKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbXBsZXRlVXBncmFkZShleHRlbnNpb25zLCBrZXksIHByb3RvY29scywgcmVxLCBzb2NrZXQsIGhlYWQsIGNiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGdyYWRlIHRoZSBjb25uZWN0aW9uIHRvIFdlYlNvY2tldC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGV4dGVuc2lvbnMgVGhlIGFjY2VwdGVkIGV4dGVuc2lvbnNcbiAgICogQHBhcmFtIHtTdHJpbmd9IGtleSBUaGUgdmFsdWUgb2YgdGhlIGBTZWMtV2ViU29ja2V0LUtleWAgaGVhZGVyXG4gICAqIEBwYXJhbSB7U2V0fSBwcm90b2NvbHMgVGhlIHN1YnByb3RvY29sc1xuICAgKiBAcGFyYW0ge2h0dHAuSW5jb21pbmdNZXNzYWdlfSByZXEgVGhlIHJlcXVlc3Qgb2JqZWN0XG4gICAqIEBwYXJhbSB7KG5ldC5Tb2NrZXR8dGxzLlNvY2tldCl9IHNvY2tldCBUaGUgbmV0d29yayBzb2NrZXQgYmV0d2VlbiB0aGVcbiAgICogICAgIHNlcnZlciBhbmQgY2xpZW50XG4gICAqIEBwYXJhbSB7QnVmZmVyfSBoZWFkIFRoZSBmaXJzdCBwYWNrZXQgb2YgdGhlIHVwZ3JhZGVkIHN0cmVhbVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYiBDYWxsYmFja1xuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgY2FsbGVkIG1vcmUgdGhhbiBvbmNlIHdpdGggdGhlIHNhbWUgc29ja2V0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjb21wbGV0ZVVwZ3JhZGUoZXh0ZW5zaW9ucywga2V5LCBwcm90b2NvbHMsIHJlcSwgc29ja2V0LCBoZWFkLCBjYikge1xuICAgIC8vXG4gICAgLy8gRGVzdHJveSB0aGUgc29ja2V0IGlmIHRoZSBjbGllbnQgaGFzIGFscmVhZHkgc2VudCBhIEZJTiBwYWNrZXQuXG4gICAgLy9cbiAgICBpZiAoIXNvY2tldC5yZWFkYWJsZSB8fCAhc29ja2V0LndyaXRhYmxlKSByZXR1cm4gc29ja2V0LmRlc3Ryb3koKTtcblxuICAgIGlmIChzb2NrZXRba1dlYlNvY2tldF0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ3NlcnZlci5oYW5kbGVVcGdyYWRlKCkgd2FzIGNhbGxlZCBtb3JlIHRoYW4gb25jZSB3aXRoIHRoZSBzYW1lICcgK1xuICAgICAgICAgICdzb2NrZXQsIHBvc3NpYmx5IGR1ZSB0byBhIG1pc2NvbmZpZ3VyYXRpb24nXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9zdGF0ZSA+IFJVTk5JTkcpIHJldHVybiBhYm9ydEhhbmRzaGFrZShzb2NrZXQsIDUwMyk7XG5cbiAgICBjb25zdCBkaWdlc3QgPSBjcmVhdGVIYXNoKCdzaGExJylcbiAgICAgIC51cGRhdGUoa2V5ICsgR1VJRClcbiAgICAgIC5kaWdlc3QoJ2Jhc2U2NCcpO1xuXG4gICAgY29uc3QgaGVhZGVycyA9IFtcbiAgICAgICdIVFRQLzEuMSAxMDEgU3dpdGNoaW5nIFByb3RvY29scycsXG4gICAgICAnVXBncmFkZTogd2Vic29ja2V0JyxcbiAgICAgICdDb25uZWN0aW9uOiBVcGdyYWRlJyxcbiAgICAgIGBTZWMtV2ViU29ja2V0LUFjY2VwdDogJHtkaWdlc3R9YFxuICAgIF07XG5cbiAgICBjb25zdCB3cyA9IG5ldyB0aGlzLm9wdGlvbnMuV2ViU29ja2V0KG51bGwpO1xuXG4gICAgaWYgKHByb3RvY29scy5zaXplKSB7XG4gICAgICAvL1xuICAgICAgLy8gT3B0aW9uYWxseSBjYWxsIGV4dGVybmFsIHByb3RvY29sIHNlbGVjdGlvbiBoYW5kbGVyLlxuICAgICAgLy9cbiAgICAgIGNvbnN0IHByb3RvY29sID0gdGhpcy5vcHRpb25zLmhhbmRsZVByb3RvY29sc1xuICAgICAgICA/IHRoaXMub3B0aW9ucy5oYW5kbGVQcm90b2NvbHMocHJvdG9jb2xzLCByZXEpXG4gICAgICAgIDogcHJvdG9jb2xzLnZhbHVlcygpLm5leHQoKS52YWx1ZTtcblxuICAgICAgaWYgKHByb3RvY29sKSB7XG4gICAgICAgIGhlYWRlcnMucHVzaChgU2VjLVdlYlNvY2tldC1Qcm90b2NvbDogJHtwcm90b2NvbH1gKTtcbiAgICAgICAgd3MuX3Byb3RvY29sID0gcHJvdG9jb2w7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGV4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0pIHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IGV4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0ucGFyYW1zO1xuICAgICAgY29uc3QgdmFsdWUgPSBleHRlbnNpb24uZm9ybWF0KHtcbiAgICAgICAgW1Blck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVdOiBbcGFyYW1zXVxuICAgICAgfSk7XG4gICAgICBoZWFkZXJzLnB1c2goYFNlYy1XZWJTb2NrZXQtRXh0ZW5zaW9uczogJHt2YWx1ZX1gKTtcbiAgICAgIHdzLl9leHRlbnNpb25zID0gZXh0ZW5zaW9ucztcbiAgICB9XG5cbiAgICAvL1xuICAgIC8vIEFsbG93IGV4dGVybmFsIG1vZGlmaWNhdGlvbi9pbnNwZWN0aW9uIG9mIGhhbmRzaGFrZSBoZWFkZXJzLlxuICAgIC8vXG4gICAgdGhpcy5lbWl0KCdoZWFkZXJzJywgaGVhZGVycywgcmVxKTtcblxuICAgIHNvY2tldC53cml0ZShoZWFkZXJzLmNvbmNhdCgnXFxyXFxuJykuam9pbignXFxyXFxuJykpO1xuICAgIHNvY2tldC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBzb2NrZXRPbkVycm9yKTtcblxuICAgIHdzLnNldFNvY2tldChzb2NrZXQsIGhlYWQsIHtcbiAgICAgIG1heFBheWxvYWQ6IHRoaXMub3B0aW9ucy5tYXhQYXlsb2FkLFxuICAgICAgc2tpcFVURjhWYWxpZGF0aW9uOiB0aGlzLm9wdGlvbnMuc2tpcFVURjhWYWxpZGF0aW9uXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5jbGllbnRzKSB7XG4gICAgICB0aGlzLmNsaWVudHMuYWRkKHdzKTtcbiAgICAgIHdzLm9uKCdjbG9zZScsICgpID0+IHtcbiAgICAgICAgdGhpcy5jbGllbnRzLmRlbGV0ZSh3cyk7XG5cbiAgICAgICAgaWYgKHRoaXMuX3Nob3VsZEVtaXRDbG9zZSAmJiAhdGhpcy5jbGllbnRzLnNpemUpIHtcbiAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGVtaXRDbG9zZSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNiKHdzLCByZXEpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gV2ViU29ja2V0U2VydmVyO1xuXG4vKipcbiAqIEFkZCBldmVudCBsaXN0ZW5lcnMgb24gYW4gYEV2ZW50RW1pdHRlcmAgdXNpbmcgYSBtYXAgb2YgPGV2ZW50LCBsaXN0ZW5lcj5cbiAqIHBhaXJzLlxuICpcbiAqIEBwYXJhbSB7RXZlbnRFbWl0dGVyfSBzZXJ2ZXIgVGhlIGV2ZW50IGVtaXR0ZXJcbiAqIEBwYXJhbSB7T2JqZWN0LjxTdHJpbmcsIEZ1bmN0aW9uPn0gbWFwIFRoZSBsaXN0ZW5lcnMgdG8gYWRkXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHdpbGwgcmVtb3ZlIHRoZSBhZGRlZCBsaXN0ZW5lcnMgd2hlblxuICogICAgIGNhbGxlZFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYWRkTGlzdGVuZXJzKHNlcnZlciwgbWFwKSB7XG4gIGZvciAoY29uc3QgZXZlbnQgb2YgT2JqZWN0LmtleXMobWFwKSkgc2VydmVyLm9uKGV2ZW50LCBtYXBbZXZlbnRdKTtcblxuICByZXR1cm4gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXJzKCkge1xuICAgIGZvciAoY29uc3QgZXZlbnQgb2YgT2JqZWN0LmtleXMobWFwKSkge1xuICAgICAgc2VydmVyLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBtYXBbZXZlbnRdKTtcbiAgICB9XG4gIH07XG59XG5cbi8qKlxuICogRW1pdCBhIGAnY2xvc2UnYCBldmVudCBvbiBhbiBgRXZlbnRFbWl0dGVyYC5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gc2VydmVyIFRoZSBldmVudCBlbWl0dGVyXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlbWl0Q2xvc2Uoc2VydmVyKSB7XG4gIHNlcnZlci5fc3RhdGUgPSBDTE9TRUQ7XG4gIHNlcnZlci5lbWl0KCdjbG9zZScpO1xufVxuXG4vKipcbiAqIEhhbmRsZSBzb2NrZXQgZXJyb3JzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNvY2tldE9uRXJyb3IoKSB7XG4gIHRoaXMuZGVzdHJveSgpO1xufVxuXG4vKipcbiAqIENsb3NlIHRoZSBjb25uZWN0aW9uIHdoZW4gcHJlY29uZGl0aW9ucyBhcmUgbm90IGZ1bGZpbGxlZC5cbiAqXG4gKiBAcGFyYW0geyhuZXQuU29ja2V0fHRscy5Tb2NrZXQpfSBzb2NrZXQgVGhlIHNvY2tldCBvZiB0aGUgdXBncmFkZSByZXF1ZXN0XG4gKiBAcGFyYW0ge051bWJlcn0gY29kZSBUaGUgSFRUUCByZXNwb25zZSBzdGF0dXMgY29kZVxuICogQHBhcmFtIHtTdHJpbmd9IFttZXNzYWdlXSBUaGUgSFRUUCByZXNwb25zZSBib2R5XG4gKiBAcGFyYW0ge09iamVjdH0gW2hlYWRlcnNdIEFkZGl0aW9uYWwgSFRUUCByZXNwb25zZSBoZWFkZXJzXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhYm9ydEhhbmRzaGFrZShzb2NrZXQsIGNvZGUsIG1lc3NhZ2UsIGhlYWRlcnMpIHtcbiAgLy9cbiAgLy8gVGhlIHNvY2tldCBpcyB3cml0YWJsZSB1bmxlc3MgdGhlIHVzZXIgZGVzdHJveWVkIG9yIGVuZGVkIGl0IGJlZm9yZSBjYWxsaW5nXG4gIC8vIGBzZXJ2ZXIuaGFuZGxlVXBncmFkZSgpYCBvciBpbiB0aGUgYHZlcmlmeUNsaWVudGAgZnVuY3Rpb24sIHdoaWNoIGlzIGEgdXNlclxuICAvLyBlcnJvci4gSGFuZGxpbmcgdGhpcyBkb2VzIG5vdCBtYWtlIG11Y2ggc2Vuc2UgYXMgdGhlIHdvcnN0IHRoYXQgY2FuIGhhcHBlblxuICAvLyBpcyB0aGF0IHNvbWUgb2YgdGhlIGRhdGEgd3JpdHRlbiBieSB0aGUgdXNlciBtaWdodCBiZSBkaXNjYXJkZWQgZHVlIHRvIHRoZVxuICAvLyBjYWxsIHRvIGBzb2NrZXQuZW5kKClgIGJlbG93LCB3aGljaCB0cmlnZ2VycyBhbiBgJ2Vycm9yJ2AgZXZlbnQgdGhhdCBpblxuICAvLyB0dXJuIGNhdXNlcyB0aGUgc29ja2V0IHRvIGJlIGRlc3Ryb3llZC5cbiAgLy9cbiAgbWVzc2FnZSA9IG1lc3NhZ2UgfHwgaHR0cC5TVEFUVVNfQ09ERVNbY29kZV07XG4gIGhlYWRlcnMgPSB7XG4gICAgQ29ubmVjdGlvbjogJ2Nsb3NlJyxcbiAgICAnQ29udGVudC1UeXBlJzogJ3RleHQvaHRtbCcsXG4gICAgJ0NvbnRlbnQtTGVuZ3RoJzogQnVmZmVyLmJ5dGVMZW5ndGgobWVzc2FnZSksXG4gICAgLi4uaGVhZGVyc1xuICB9O1xuXG4gIHNvY2tldC5vbmNlKCdmaW5pc2gnLCBzb2NrZXQuZGVzdHJveSk7XG5cbiAgc29ja2V0LmVuZChcbiAgICBgSFRUUC8xLjEgJHtjb2RlfSAke2h0dHAuU1RBVFVTX0NPREVTW2NvZGVdfVxcclxcbmAgK1xuICAgICAgT2JqZWN0LmtleXMoaGVhZGVycylcbiAgICAgICAgLm1hcCgoaCkgPT4gYCR7aH06ICR7aGVhZGVyc1toXX1gKVxuICAgICAgICAuam9pbignXFxyXFxuJykgK1xuICAgICAgJ1xcclxcblxcclxcbicgK1xuICAgICAgbWVzc2FnZVxuICApO1xufVxuXG4vKipcbiAqIEVtaXQgYSBgJ3dzQ2xpZW50RXJyb3InYCBldmVudCBvbiBhIGBXZWJTb2NrZXRTZXJ2ZXJgIGlmIHRoZXJlIGlzIGF0IGxlYXN0XG4gKiBvbmUgbGlzdGVuZXIgZm9yIGl0LCBvdGhlcndpc2UgY2FsbCBgYWJvcnRIYW5kc2hha2UoKWAuXG4gKlxuICogQHBhcmFtIHtXZWJTb2NrZXRTZXJ2ZXJ9IHNlcnZlciBUaGUgV2ViU29ja2V0IHNlcnZlclxuICogQHBhcmFtIHtodHRwLkluY29taW5nTWVzc2FnZX0gcmVxIFRoZSByZXF1ZXN0IG9iamVjdFxuICogQHBhcmFtIHsobmV0LlNvY2tldHx0bHMuU29ja2V0KX0gc29ja2V0IFRoZSBzb2NrZXQgb2YgdGhlIHVwZ3JhZGUgcmVxdWVzdFxuICogQHBhcmFtIHtOdW1iZXJ9IGNvZGUgVGhlIEhUVFAgcmVzcG9uc2Ugc3RhdHVzIGNvZGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlIFRoZSBIVFRQIHJlc3BvbnNlIGJvZHlcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGFib3J0SGFuZHNoYWtlT3JFbWl0d3NDbGllbnRFcnJvcihzZXJ2ZXIsIHJlcSwgc29ja2V0LCBjb2RlLCBtZXNzYWdlKSB7XG4gIGlmIChzZXJ2ZXIubGlzdGVuZXJDb3VudCgnd3NDbGllbnRFcnJvcicpKSB7XG4gICAgY29uc3QgZXJyID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGVyciwgYWJvcnRIYW5kc2hha2VPckVtaXR3c0NsaWVudEVycm9yKTtcblxuICAgIHNlcnZlci5lbWl0KCd3c0NsaWVudEVycm9yJywgZXJyLCBzb2NrZXQsIHJlcSk7XG4gIH0gZWxzZSB7XG4gICAgYWJvcnRIYW5kc2hha2Uoc29ja2V0LCBjb2RlLCBtZXNzYWdlKTtcbiAgfVxufVxuIiwiLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbXCJlcnJvclwiLCB7IFwidmFyc0lnbm9yZVBhdHRlcm5cIjogXCJeUmVhZGFibGUkXCIgfV0gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKTtcbmNvbnN0IGh0dHBzID0gcmVxdWlyZSgnaHR0cHMnKTtcbmNvbnN0IGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG5jb25zdCBuZXQgPSByZXF1aXJlKCduZXQnKTtcbmNvbnN0IHRscyA9IHJlcXVpcmUoJ3RscycpO1xuY29uc3QgeyByYW5kb21CeXRlcywgY3JlYXRlSGFzaCB9ID0gcmVxdWlyZSgnY3J5cHRvJyk7XG5jb25zdCB7IFJlYWRhYmxlIH0gPSByZXF1aXJlKCdzdHJlYW0nKTtcbmNvbnN0IHsgVVJMIH0gPSByZXF1aXJlKCd1cmwnKTtcblxuY29uc3QgUGVyTWVzc2FnZURlZmxhdGUgPSByZXF1aXJlKCcuL3Blcm1lc3NhZ2UtZGVmbGF0ZScpO1xuY29uc3QgUmVjZWl2ZXIgPSByZXF1aXJlKCcuL3JlY2VpdmVyJyk7XG5jb25zdCBTZW5kZXIgPSByZXF1aXJlKCcuL3NlbmRlcicpO1xuY29uc3Qge1xuICBCSU5BUllfVFlQRVMsXG4gIEVNUFRZX0JVRkZFUixcbiAgR1VJRCxcbiAga0Zvck9uRXZlbnRBdHRyaWJ1dGUsXG4gIGtMaXN0ZW5lcixcbiAga1N0YXR1c0NvZGUsXG4gIGtXZWJTb2NrZXQsXG4gIE5PT1Bcbn0gPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuY29uc3Qge1xuICBFdmVudFRhcmdldDogeyBhZGRFdmVudExpc3RlbmVyLCByZW1vdmVFdmVudExpc3RlbmVyIH1cbn0gPSByZXF1aXJlKCcuL2V2ZW50LXRhcmdldCcpO1xuY29uc3QgeyBmb3JtYXQsIHBhcnNlIH0gPSByZXF1aXJlKCcuL2V4dGVuc2lvbicpO1xuY29uc3QgeyB0b0J1ZmZlciB9ID0gcmVxdWlyZSgnLi9idWZmZXItdXRpbCcpO1xuXG5jb25zdCBjbG9zZVRpbWVvdXQgPSAzMCAqIDEwMDA7XG5jb25zdCBrQWJvcnRlZCA9IFN5bWJvbCgna0Fib3J0ZWQnKTtcbmNvbnN0IHByb3RvY29sVmVyc2lvbnMgPSBbOCwgMTNdO1xuY29uc3QgcmVhZHlTdGF0ZXMgPSBbJ0NPTk5FQ1RJTkcnLCAnT1BFTicsICdDTE9TSU5HJywgJ0NMT1NFRCddO1xuY29uc3Qgc3VicHJvdG9jb2xSZWdleCA9IC9eWyEjJCUmJyorXFwtLjAtOUEtWl5fYHxhLXp+XSskLztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBXZWJTb2NrZXQuXG4gKlxuICogQGV4dGVuZHMgRXZlbnRFbWl0dGVyXG4gKi9cbmNsYXNzIFdlYlNvY2tldCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgYFdlYlNvY2tldGAuXG4gICAqXG4gICAqIEBwYXJhbSB7KFN0cmluZ3xVUkwpfSBhZGRyZXNzIFRoZSBVUkwgdG8gd2hpY2ggdG8gY29ubmVjdFxuICAgKiBAcGFyYW0geyhTdHJpbmd8U3RyaW5nW10pfSBbcHJvdG9jb2xzXSBUaGUgc3VicHJvdG9jb2xzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gQ29ubmVjdGlvbiBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihhZGRyZXNzLCBwcm90b2NvbHMsIG9wdGlvbnMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5fYmluYXJ5VHlwZSA9IEJJTkFSWV9UWVBFU1swXTtcbiAgICB0aGlzLl9jbG9zZUNvZGUgPSAxMDA2O1xuICAgIHRoaXMuX2Nsb3NlRnJhbWVSZWNlaXZlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2Nsb3NlRnJhbWVTZW50ID0gZmFsc2U7XG4gICAgdGhpcy5fY2xvc2VNZXNzYWdlID0gRU1QVFlfQlVGRkVSO1xuICAgIHRoaXMuX2Nsb3NlVGltZXIgPSBudWxsO1xuICAgIHRoaXMuX2V4dGVuc2lvbnMgPSB7fTtcbiAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9wcm90b2NvbCA9ICcnO1xuICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ09OTkVDVElORztcbiAgICB0aGlzLl9yZWNlaXZlciA9IG51bGw7XG4gICAgdGhpcy5fc2VuZGVyID0gbnVsbDtcbiAgICB0aGlzLl9zb2NrZXQgPSBudWxsO1xuXG4gICAgaWYgKGFkZHJlc3MgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX2J1ZmZlcmVkQW1vdW50ID0gMDtcbiAgICAgIHRoaXMuX2lzU2VydmVyID0gZmFsc2U7XG4gICAgICB0aGlzLl9yZWRpcmVjdHMgPSAwO1xuXG4gICAgICBpZiAocHJvdG9jb2xzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvdG9jb2xzID0gW107XG4gICAgICB9IGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KHByb3RvY29scykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm90b2NvbHMgPT09ICdvYmplY3QnICYmIHByb3RvY29scyAhPT0gbnVsbCkge1xuICAgICAgICAgIG9wdGlvbnMgPSBwcm90b2NvbHM7XG4gICAgICAgICAgcHJvdG9jb2xzID0gW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvdG9jb2xzID0gW3Byb3RvY29sc107XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaW5pdEFzQ2xpZW50KHRoaXMsIGFkZHJlc3MsIHByb3RvY29scywgb3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2lzU2VydmVyID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBkZXZpYXRlcyBmcm9tIHRoZSBXSEFUV0cgaW50ZXJmYWNlIHNpbmNlIHdzIGRvZXNuJ3Qgc3VwcG9ydCB0aGVcbiAgICogcmVxdWlyZWQgZGVmYXVsdCBcImJsb2JcIiB0eXBlIChpbnN0ZWFkIHdlIGRlZmluZSBhIGN1c3RvbSBcIm5vZGVidWZmZXJcIlxuICAgKiB0eXBlKS5cbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGdldCBiaW5hcnlUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLl9iaW5hcnlUeXBlO1xuICB9XG5cbiAgc2V0IGJpbmFyeVR5cGUodHlwZSkge1xuICAgIGlmICghQklOQVJZX1RZUEVTLmluY2x1ZGVzKHR5cGUpKSByZXR1cm47XG5cbiAgICB0aGlzLl9iaW5hcnlUeXBlID0gdHlwZTtcblxuICAgIC8vXG4gICAgLy8gQWxsb3cgdG8gY2hhbmdlIGBiaW5hcnlUeXBlYCBvbiB0aGUgZmx5LlxuICAgIC8vXG4gICAgaWYgKHRoaXMuX3JlY2VpdmVyKSB0aGlzLl9yZWNlaXZlci5fYmluYXJ5VHlwZSA9IHR5cGU7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIGdldCBidWZmZXJlZEFtb3VudCgpIHtcbiAgICBpZiAoIXRoaXMuX3NvY2tldCkgcmV0dXJuIHRoaXMuX2J1ZmZlcmVkQW1vdW50O1xuXG4gICAgcmV0dXJuIHRoaXMuX3NvY2tldC5fd3JpdGFibGVTdGF0ZS5sZW5ndGggKyB0aGlzLl9zZW5kZXIuX2J1ZmZlcmVkQnl0ZXM7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGdldCBleHRlbnNpb25zKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9leHRlbnNpb25zKS5qb2luKCk7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge0Jvb2xlYW59XG4gICAqL1xuICBnZXQgaXNQYXVzZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhdXNlZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBnZXQgb25jbG9zZSgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBnZXQgb25lcnJvcigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAdHlwZSB7RnVuY3Rpb259XG4gICAqL1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBnZXQgb25vcGVuKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtGdW5jdGlvbn1cbiAgICovXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGdldCBvbm1lc3NhZ2UoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIGdldCBwcm90b2NvbCgpIHtcbiAgICByZXR1cm4gdGhpcy5fcHJvdG9jb2w7XG4gIH1cblxuICAvKipcbiAgICogQHR5cGUge051bWJlcn1cbiAgICovXG4gIGdldCByZWFkeVN0YXRlKCkge1xuICAgIHJldHVybiB0aGlzLl9yZWFkeVN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBnZXQgdXJsKCkge1xuICAgIHJldHVybiB0aGlzLl91cmw7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHVwIHRoZSBzb2NrZXQgYW5kIHRoZSBpbnRlcm5hbCByZXNvdXJjZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7KG5ldC5Tb2NrZXR8dGxzLlNvY2tldCl9IHNvY2tldCBUaGUgbmV0d29yayBzb2NrZXQgYmV0d2VlbiB0aGVcbiAgICogICAgIHNlcnZlciBhbmQgY2xpZW50XG4gICAqIEBwYXJhbSB7QnVmZmVyfSBoZWFkIFRoZSBmaXJzdCBwYWNrZXQgb2YgdGhlIHVwZ3JhZGVkIHN0cmVhbVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBPcHRpb25zIG9iamVjdFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5nZW5lcmF0ZU1hc2tdIFRoZSBmdW5jdGlvbiB1c2VkIHRvIGdlbmVyYXRlIHRoZVxuICAgKiAgICAgbWFza2luZyBrZXlcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heFBheWxvYWQ9MF0gVGhlIG1heGltdW0gYWxsb3dlZCBtZXNzYWdlIHNpemVcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5za2lwVVRGOFZhbGlkYXRpb249ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIG9yXG4gICAqICAgICBub3QgdG8gc2tpcCBVVEYtOCB2YWxpZGF0aW9uIGZvciB0ZXh0IGFuZCBjbG9zZSBtZXNzYWdlc1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc2V0U29ja2V0KHNvY2tldCwgaGVhZCwgb3B0aW9ucykge1xuICAgIGNvbnN0IHJlY2VpdmVyID0gbmV3IFJlY2VpdmVyKHtcbiAgICAgIGJpbmFyeVR5cGU6IHRoaXMuYmluYXJ5VHlwZSxcbiAgICAgIGV4dGVuc2lvbnM6IHRoaXMuX2V4dGVuc2lvbnMsXG4gICAgICBpc1NlcnZlcjogdGhpcy5faXNTZXJ2ZXIsXG4gICAgICBtYXhQYXlsb2FkOiBvcHRpb25zLm1heFBheWxvYWQsXG4gICAgICBza2lwVVRGOFZhbGlkYXRpb246IG9wdGlvbnMuc2tpcFVURjhWYWxpZGF0aW9uXG4gICAgfSk7XG5cbiAgICB0aGlzLl9zZW5kZXIgPSBuZXcgU2VuZGVyKHNvY2tldCwgdGhpcy5fZXh0ZW5zaW9ucywgb3B0aW9ucy5nZW5lcmF0ZU1hc2spO1xuICAgIHRoaXMuX3JlY2VpdmVyID0gcmVjZWl2ZXI7XG4gICAgdGhpcy5fc29ja2V0ID0gc29ja2V0O1xuXG4gICAgcmVjZWl2ZXJba1dlYlNvY2tldF0gPSB0aGlzO1xuICAgIHNvY2tldFtrV2ViU29ja2V0XSA9IHRoaXM7XG5cbiAgICByZWNlaXZlci5vbignY29uY2x1ZGUnLCByZWNlaXZlck9uQ29uY2x1ZGUpO1xuICAgIHJlY2VpdmVyLm9uKCdkcmFpbicsIHJlY2VpdmVyT25EcmFpbik7XG4gICAgcmVjZWl2ZXIub24oJ2Vycm9yJywgcmVjZWl2ZXJPbkVycm9yKTtcbiAgICByZWNlaXZlci5vbignbWVzc2FnZScsIHJlY2VpdmVyT25NZXNzYWdlKTtcbiAgICByZWNlaXZlci5vbigncGluZycsIHJlY2VpdmVyT25QaW5nKTtcbiAgICByZWNlaXZlci5vbigncG9uZycsIHJlY2VpdmVyT25Qb25nKTtcblxuICAgIHNvY2tldC5zZXRUaW1lb3V0KDApO1xuICAgIHNvY2tldC5zZXROb0RlbGF5KCk7XG5cbiAgICBpZiAoaGVhZC5sZW5ndGggPiAwKSBzb2NrZXQudW5zaGlmdChoZWFkKTtcblxuICAgIHNvY2tldC5vbignY2xvc2UnLCBzb2NrZXRPbkNsb3NlKTtcbiAgICBzb2NrZXQub24oJ2RhdGEnLCBzb2NrZXRPbkRhdGEpO1xuICAgIHNvY2tldC5vbignZW5kJywgc29ja2V0T25FbmQpO1xuICAgIHNvY2tldC5vbignZXJyb3InLCBzb2NrZXRPbkVycm9yKTtcblxuICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBXZWJTb2NrZXQuT1BFTjtcbiAgICB0aGlzLmVtaXQoJ29wZW4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBFbWl0IHRoZSBgJ2Nsb3NlJ2AgZXZlbnQuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBlbWl0Q2xvc2UoKSB7XG4gICAgaWYgKCF0aGlzLl9zb2NrZXQpIHtcbiAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0VEO1xuICAgICAgdGhpcy5lbWl0KCdjbG9zZScsIHRoaXMuX2Nsb3NlQ29kZSwgdGhpcy5fY2xvc2VNZXNzYWdlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXSkge1xuICAgICAgdGhpcy5fZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXS5jbGVhbnVwKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVjZWl2ZXIucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TRUQ7XG4gICAgdGhpcy5lbWl0KCdjbG9zZScsIHRoaXMuX2Nsb3NlQ29kZSwgdGhpcy5fY2xvc2VNZXNzYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCBhIGNsb3NpbmcgaGFuZHNoYWtlLlxuICAgKlxuICAgKiAgICAgICAgICArLS0tLS0tLS0tLSsgICArLS0tLS0tLS0tLS0rICAgKy0tLS0tLS0tLS0rXG4gICAqICAgICAtIC0gLXx3cy5jbG9zZSgpfC0tPnxjbG9zZSBmcmFtZXwtLT58d3MuY2xvc2UoKXwtIC0gLVxuICAgKiAgICB8ICAgICArLS0tLS0tLS0tLSsgICArLS0tLS0tLS0tLS0rICAgKy0tLS0tLS0tLS0rICAgICB8XG4gICAqICAgICAgICAgICstLS0tLS0tLS0tKyAgICstLS0tLS0tLS0tLSsgICAgICAgICB8XG4gICAqIENMT1NJTkcgIHx3cy5jbG9zZSgpfDwtLXxjbG9zZSBmcmFtZXw8LS0rLS0tLS0rICAgICAgIENMT1NJTkdcbiAgICogICAgICAgICAgKy0tLS0tLS0tLS0rICAgKy0tLS0tLS0tLS0tKyAgIHxcbiAgICogICAgfCAgICAgICAgICAgfCAgICAgICAgICAgICAgICAgICAgICAgIHwgICArLS0tKyAgICAgICAgfFxuICAgKiAgICAgICAgICAgICAgICArLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKy0tPnxmaW58IC0gLSAtIC1cbiAgICogICAgfCAgICAgICAgICstLS0rICAgICAgICAgICAgICAgICAgICAgIHwgICArLS0tK1xuICAgKiAgICAgLSAtIC0gLSAtfGZpbnw8LS0tLS0tLS0tLS0tLS0tLS0tLS0tK1xuICAgKiAgICAgICAgICAgICAgKy0tLStcbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ9IFtjb2RlXSBTdGF0dXMgY29kZSBleHBsYWluaW5nIHdoeSB0aGUgY29ubmVjdGlvbiBpcyBjbG9zaW5nXG4gICAqIEBwYXJhbSB7KFN0cmluZ3xCdWZmZXIpfSBbZGF0YV0gVGhlIHJlYXNvbiB3aHkgdGhlIGNvbm5lY3Rpb24gaXNcbiAgICogICAgIGNsb3NpbmdcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY2xvc2UoY29kZSwgZGF0YSkge1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DTE9TRUQpIHJldHVybjtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ09OTkVDVElORykge1xuICAgICAgY29uc3QgbXNnID0gJ1dlYlNvY2tldCB3YXMgY2xvc2VkIGJlZm9yZSB0aGUgY29ubmVjdGlvbiB3YXMgZXN0YWJsaXNoZWQnO1xuICAgICAgYWJvcnRIYW5kc2hha2UodGhpcywgdGhpcy5fcmVxLCBtc2cpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DTE9TSU5HKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuX2Nsb3NlRnJhbWVTZW50ICYmXG4gICAgICAgICh0aGlzLl9jbG9zZUZyYW1lUmVjZWl2ZWQgfHwgdGhpcy5fcmVjZWl2ZXIuX3dyaXRhYmxlU3RhdGUuZXJyb3JFbWl0dGVkKVxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX3NvY2tldC5lbmQoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0lORztcbiAgICB0aGlzLl9zZW5kZXIuY2xvc2UoY29kZSwgZGF0YSwgIXRoaXMuX2lzU2VydmVyLCAoZXJyKSA9PiB7XG4gICAgICAvL1xuICAgICAgLy8gVGhpcyBlcnJvciBpcyBoYW5kbGVkIGJ5IHRoZSBgJ2Vycm9yJ2AgbGlzdGVuZXIgb24gdGhlIHNvY2tldC4gV2Ugb25seVxuICAgICAgLy8gd2FudCB0byBrbm93IGlmIHRoZSBjbG9zZSBmcmFtZSBoYXMgYmVlbiBzZW50IGhlcmUuXG4gICAgICAvL1xuICAgICAgaWYgKGVycikgcmV0dXJuO1xuXG4gICAgICB0aGlzLl9jbG9zZUZyYW1lU2VudCA9IHRydWU7XG5cbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5fY2xvc2VGcmFtZVJlY2VpdmVkIHx8XG4gICAgICAgIHRoaXMuX3JlY2VpdmVyLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX3NvY2tldC5lbmQoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vXG4gICAgLy8gU3BlY2lmeSBhIHRpbWVvdXQgZm9yIHRoZSBjbG9zaW5nIGhhbmRzaGFrZSB0byBjb21wbGV0ZS5cbiAgICAvL1xuICAgIHRoaXMuX2Nsb3NlVGltZXIgPSBzZXRUaW1lb3V0KFxuICAgICAgdGhpcy5fc29ja2V0LmRlc3Ryb3kuYmluZCh0aGlzLl9zb2NrZXQpLFxuICAgICAgY2xvc2VUaW1lb3V0XG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXVzZSB0aGUgc29ja2V0LlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICBwYXVzZSgpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DT05ORUNUSU5HIHx8XG4gICAgICB0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DTE9TRURcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuX3NvY2tldC5wYXVzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgYSBwaW5nLlxuICAgKlxuICAgKiBAcGFyYW0geyp9IFtkYXRhXSBUaGUgZGF0YSB0byBzZW5kXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gW21hc2tdIEluZGljYXRlcyB3aGV0aGVyIG9yIG5vdCB0byBtYXNrIGBkYXRhYFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2JdIENhbGxiYWNrIHdoaWNoIGlzIGV4ZWN1dGVkIHdoZW4gdGhlIHBpbmcgaXMgc2VudFxuICAgKiBAcHVibGljXG4gICAqL1xuICBwaW5nKGRhdGEsIG1hc2ssIGNiKSB7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNPTk5FQ1RJTkcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignV2ViU29ja2V0IGlzIG5vdCBvcGVuOiByZWFkeVN0YXRlIDAgKENPTk5FQ1RJTkcpJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYiA9IGRhdGE7XG4gICAgICBkYXRhID0gbWFzayA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBtYXNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjYiA9IG1hc2s7XG4gICAgICBtYXNrID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ251bWJlcicpIGRhdGEgPSBkYXRhLnRvU3RyaW5nKCk7XG5cbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlICE9PSBXZWJTb2NrZXQuT1BFTikge1xuICAgICAgc2VuZEFmdGVyQ2xvc2UodGhpcywgZGF0YSwgY2IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChtYXNrID09PSB1bmRlZmluZWQpIG1hc2sgPSAhdGhpcy5faXNTZXJ2ZXI7XG4gICAgdGhpcy5fc2VuZGVyLnBpbmcoZGF0YSB8fCBFTVBUWV9CVUZGRVIsIG1hc2ssIGNiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGEgcG9uZy5cbiAgICpcbiAgICogQHBhcmFtIHsqfSBbZGF0YV0gVGhlIGRhdGEgdG8gc2VuZFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFttYXNrXSBJbmRpY2F0ZXMgd2hldGhlciBvciBub3QgdG8gbWFzayBgZGF0YWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXSBDYWxsYmFjayB3aGljaCBpcyBleGVjdXRlZCB3aGVuIHRoZSBwb25nIGlzIHNlbnRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcG9uZyhkYXRhLCBtYXNrLCBjYikge1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DT05ORUNUSU5HKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYlNvY2tldCBpcyBub3Qgb3BlbjogcmVhZHlTdGF0ZSAwIChDT05ORUNUSU5HKScpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IgPSBkYXRhO1xuICAgICAgZGF0YSA9IG1hc2sgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgbWFzayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IgPSBtYXNrO1xuICAgICAgbWFzayA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdudW1iZXInKSBkYXRhID0gZGF0YS50b1N0cmluZygpO1xuXG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSAhPT0gV2ViU29ja2V0Lk9QRU4pIHtcbiAgICAgIHNlbmRBZnRlckNsb3NlKHRoaXMsIGRhdGEsIGNiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobWFzayA9PT0gdW5kZWZpbmVkKSBtYXNrID0gIXRoaXMuX2lzU2VydmVyO1xuICAgIHRoaXMuX3NlbmRlci5wb25nKGRhdGEgfHwgRU1QVFlfQlVGRkVSLCBtYXNrLCBjYik7XG4gIH1cblxuICAvKipcbiAgICogUmVzdW1lIHRoZSBzb2NrZXQuXG4gICAqXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHJlc3VtZSgpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DT05ORUNUSU5HIHx8XG4gICAgICB0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DTE9TRURcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9wYXVzZWQgPSBmYWxzZTtcbiAgICBpZiAoIXRoaXMuX3JlY2VpdmVyLl93cml0YWJsZVN0YXRlLm5lZWREcmFpbikgdGhpcy5fc29ja2V0LnJlc3VtZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgYSBkYXRhIG1lc3NhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gZGF0YSBUaGUgbWVzc2FnZSB0byBzZW5kXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gT3B0aW9ucyBvYmplY3RcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5iaW5hcnldIFNwZWNpZmllcyB3aGV0aGVyIGBkYXRhYCBpcyBiaW5hcnkgb3JcbiAgICogICAgIHRleHRcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5jb21wcmVzc10gU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIGNvbXByZXNzXG4gICAqICAgICBgZGF0YWBcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5maW49dHJ1ZV0gU3BlY2lmaWVzIHdoZXRoZXIgdGhlIGZyYWdtZW50IGlzIHRoZVxuICAgKiAgICAgbGFzdCBvbmVcbiAgICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5tYXNrXSBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gbWFzayBgZGF0YWBcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXSBDYWxsYmFjayB3aGljaCBpcyBleGVjdXRlZCB3aGVuIGRhdGEgaXMgd3JpdHRlbiBvdXRcbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2VuZChkYXRhLCBvcHRpb25zLCBjYikge1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DT05ORUNUSU5HKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYlNvY2tldCBpcyBub3Qgb3BlbjogcmVhZHlTdGF0ZSAwIChDT05ORUNUSU5HKScpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2IgPSBvcHRpb25zO1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ251bWJlcicpIGRhdGEgPSBkYXRhLnRvU3RyaW5nKCk7XG5cbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlICE9PSBXZWJTb2NrZXQuT1BFTikge1xuICAgICAgc2VuZEFmdGVyQ2xvc2UodGhpcywgZGF0YSwgY2IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG9wdHMgPSB7XG4gICAgICBiaW5hcnk6IHR5cGVvZiBkYXRhICE9PSAnc3RyaW5nJyxcbiAgICAgIG1hc2s6ICF0aGlzLl9pc1NlcnZlcixcbiAgICAgIGNvbXByZXNzOiB0cnVlLFxuICAgICAgZmluOiB0cnVlLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG5cbiAgICBpZiAoIXRoaXMuX2V4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0pIHtcbiAgICAgIG9wdHMuY29tcHJlc3MgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLl9zZW5kZXIuc2VuZChkYXRhIHx8IEVNUFRZX0JVRkZFUiwgb3B0cywgY2IpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZvcmNpYmx5IGNsb3NlIHRoZSBjb25uZWN0aW9uLlxuICAgKlxuICAgKiBAcHVibGljXG4gICAqL1xuICB0ZXJtaW5hdGUoKSB7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNMT1NFRCkgcmV0dXJuO1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DT05ORUNUSU5HKSB7XG4gICAgICBjb25zdCBtc2cgPSAnV2ViU29ja2V0IHdhcyBjbG9zZWQgYmVmb3JlIHRoZSBjb25uZWN0aW9uIHdhcyBlc3RhYmxpc2hlZCc7XG4gICAgICBhYm9ydEhhbmRzaGFrZSh0aGlzLCB0aGlzLl9yZXEsIG1zZyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3NvY2tldCkge1xuICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuICAgICAgdGhpcy5fc29ja2V0LmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBAY29uc3RhbnQge051bWJlcn0gQ09OTkVDVElOR1xuICogQG1lbWJlcm9mIFdlYlNvY2tldFxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoV2ViU29ja2V0LCAnQ09OTkVDVElORycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgdmFsdWU6IHJlYWR5U3RhdGVzLmluZGV4T2YoJ0NPTk5FQ1RJTkcnKVxufSk7XG5cbi8qKlxuICogQGNvbnN0YW50IHtOdW1iZXJ9IENPTk5FQ1RJTkdcbiAqIEBtZW1iZXJvZiBXZWJTb2NrZXQucHJvdG90eXBlXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShXZWJTb2NrZXQucHJvdG90eXBlLCAnQ09OTkVDVElORycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgdmFsdWU6IHJlYWR5U3RhdGVzLmluZGV4T2YoJ0NPTk5FQ1RJTkcnKVxufSk7XG5cbi8qKlxuICogQGNvbnN0YW50IHtOdW1iZXJ9IE9QRU5cbiAqIEBtZW1iZXJvZiBXZWJTb2NrZXRcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFdlYlNvY2tldCwgJ09QRU4nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIHZhbHVlOiByZWFkeVN0YXRlcy5pbmRleE9mKCdPUEVOJylcbn0pO1xuXG4vKipcbiAqIEBjb25zdGFudCB7TnVtYmVyfSBPUEVOXG4gKiBAbWVtYmVyb2YgV2ViU29ja2V0LnByb3RvdHlwZVxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoV2ViU29ja2V0LnByb3RvdHlwZSwgJ09QRU4nLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIHZhbHVlOiByZWFkeVN0YXRlcy5pbmRleE9mKCdPUEVOJylcbn0pO1xuXG4vKipcbiAqIEBjb25zdGFudCB7TnVtYmVyfSBDTE9TSU5HXG4gKiBAbWVtYmVyb2YgV2ViU29ja2V0XG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShXZWJTb2NrZXQsICdDTE9TSU5HJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICB2YWx1ZTogcmVhZHlTdGF0ZXMuaW5kZXhPZignQ0xPU0lORycpXG59KTtcblxuLyoqXG4gKiBAY29uc3RhbnQge051bWJlcn0gQ0xPU0lOR1xuICogQG1lbWJlcm9mIFdlYlNvY2tldC5wcm90b3R5cGVcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFdlYlNvY2tldC5wcm90b3R5cGUsICdDTE9TSU5HJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICB2YWx1ZTogcmVhZHlTdGF0ZXMuaW5kZXhPZignQ0xPU0lORycpXG59KTtcblxuLyoqXG4gKiBAY29uc3RhbnQge051bWJlcn0gQ0xPU0VEXG4gKiBAbWVtYmVyb2YgV2ViU29ja2V0XG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShXZWJTb2NrZXQsICdDTE9TRUQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIHZhbHVlOiByZWFkeVN0YXRlcy5pbmRleE9mKCdDTE9TRUQnKVxufSk7XG5cbi8qKlxuICogQGNvbnN0YW50IHtOdW1iZXJ9IENMT1NFRFxuICogQG1lbWJlcm9mIFdlYlNvY2tldC5wcm90b3R5cGVcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KFdlYlNvY2tldC5wcm90b3R5cGUsICdDTE9TRUQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIHZhbHVlOiByZWFkeVN0YXRlcy5pbmRleE9mKCdDTE9TRUQnKVxufSk7XG5cbltcbiAgJ2JpbmFyeVR5cGUnLFxuICAnYnVmZmVyZWRBbW91bnQnLFxuICAnZXh0ZW5zaW9ucycsXG4gICdpc1BhdXNlZCcsXG4gICdwcm90b2NvbCcsXG4gICdyZWFkeVN0YXRlJyxcbiAgJ3VybCdcbl0uZm9yRWFjaCgocHJvcGVydHkpID0+IHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdlYlNvY2tldC5wcm90b3R5cGUsIHByb3BlcnR5LCB7IGVudW1lcmFibGU6IHRydWUgfSk7XG59KTtcblxuLy9cbi8vIEFkZCB0aGUgYG9ub3BlbmAsIGBvbmVycm9yYCwgYG9uY2xvc2VgLCBhbmQgYG9ubWVzc2FnZWAgYXR0cmlidXRlcy5cbi8vIFNlZSBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9jb21tcy5odG1sI3RoZS13ZWJzb2NrZXQtaW50ZXJmYWNlXG4vL1xuWydvcGVuJywgJ2Vycm9yJywgJ2Nsb3NlJywgJ21lc3NhZ2UnXS5mb3JFYWNoKChtZXRob2QpID0+IHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdlYlNvY2tldC5wcm90b3R5cGUsIGBvbiR7bWV0aG9kfWAsIHtcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGdldCgpIHtcbiAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgdGhpcy5saXN0ZW5lcnMobWV0aG9kKSkge1xuICAgICAgICBpZiAobGlzdGVuZXJba0Zvck9uRXZlbnRBdHRyaWJ1dGVdKSByZXR1cm4gbGlzdGVuZXJba0xpc3RlbmVyXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBzZXQoaGFuZGxlcikge1xuICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiB0aGlzLmxpc3RlbmVycyhtZXRob2QpKSB7XG4gICAgICAgIGlmIChsaXN0ZW5lcltrRm9yT25FdmVudEF0dHJpYnV0ZV0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKG1ldGhvZCwgbGlzdGVuZXIpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuO1xuXG4gICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIobWV0aG9kLCBoYW5kbGVyLCB7XG4gICAgICAgIFtrRm9yT25FdmVudEF0dHJpYnV0ZV06IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfSk7XG59KTtcblxuV2ViU29ja2V0LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gYWRkRXZlbnRMaXN0ZW5lcjtcbldlYlNvY2tldC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHJlbW92ZUV2ZW50TGlzdGVuZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gV2ViU29ja2V0O1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBXZWJTb2NrZXQgY2xpZW50LlxuICpcbiAqIEBwYXJhbSB7V2ViU29ja2V0fSB3ZWJzb2NrZXQgVGhlIGNsaWVudCB0byBpbml0aWFsaXplXG4gKiBAcGFyYW0geyhTdHJpbmd8VVJMKX0gYWRkcmVzcyBUaGUgVVJMIHRvIHdoaWNoIHRvIGNvbm5lY3RcbiAqIEBwYXJhbSB7QXJyYXl9IHByb3RvY29scyBUaGUgc3VicHJvdG9jb2xzXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIENvbm5lY3Rpb24gb3B0aW9uc1xuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5mb2xsb3dSZWRpcmVjdHM9ZmFsc2VdIFdoZXRoZXIgb3Igbm90IHRvIGZvbGxvd1xuICogICAgIHJlZGlyZWN0c1xuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuZ2VuZXJhdGVNYXNrXSBUaGUgZnVuY3Rpb24gdXNlZCB0byBnZW5lcmF0ZSB0aGVcbiAqICAgICBtYXNraW5nIGtleVxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmhhbmRzaGFrZVRpbWVvdXRdIFRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGVcbiAqICAgICBoYW5kc2hha2UgcmVxdWVzdFxuICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLm1heFBheWxvYWQ9MTA0ODU3NjAwXSBUaGUgbWF4aW11bSBhbGxvd2VkIG1lc3NhZ2VcbiAqICAgICBzaXplXG4gKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMubWF4UmVkaXJlY3RzPTEwXSBUaGUgbWF4aW11bSBudW1iZXIgb2YgcmVkaXJlY3RzXG4gKiAgICAgYWxsb3dlZFxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLm9yaWdpbl0gVmFsdWUgb2YgdGhlIGBPcmlnaW5gIG9yXG4gKiAgICAgYFNlYy1XZWJTb2NrZXQtT3JpZ2luYCBoZWFkZXJcbiAqIEBwYXJhbSB7KEJvb2xlYW58T2JqZWN0KX0gW29wdGlvbnMucGVyTWVzc2FnZURlZmxhdGU9dHJ1ZV0gRW5hYmxlL2Rpc2FibGVcbiAqICAgICBwZXJtZXNzYWdlLWRlZmxhdGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5wcm90b2NvbFZlcnNpb249MTNdIFZhbHVlIG9mIHRoZVxuICogICAgIGBTZWMtV2ViU29ja2V0LVZlcnNpb25gIGhlYWRlclxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5za2lwVVRGOFZhbGlkYXRpb249ZmFsc2VdIFNwZWNpZmllcyB3aGV0aGVyIG9yXG4gKiAgICAgbm90IHRvIHNraXAgVVRGLTggdmFsaWRhdGlvbiBmb3IgdGV4dCBhbmQgY2xvc2UgbWVzc2FnZXNcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGluaXRBc0NsaWVudCh3ZWJzb2NrZXQsIGFkZHJlc3MsIHByb3RvY29scywgb3B0aW9ucykge1xuICBjb25zdCBvcHRzID0ge1xuICAgIHByb3RvY29sVmVyc2lvbjogcHJvdG9jb2xWZXJzaW9uc1sxXSxcbiAgICBtYXhQYXlsb2FkOiAxMDAgKiAxMDI0ICogMTAyNCxcbiAgICBza2lwVVRGOFZhbGlkYXRpb246IGZhbHNlLFxuICAgIHBlck1lc3NhZ2VEZWZsYXRlOiB0cnVlLFxuICAgIGZvbGxvd1JlZGlyZWN0czogZmFsc2UsXG4gICAgbWF4UmVkaXJlY3RzOiAxMCxcbiAgICAuLi5vcHRpb25zLFxuICAgIGNyZWF0ZUNvbm5lY3Rpb246IHVuZGVmaW5lZCxcbiAgICBzb2NrZXRQYXRoOiB1bmRlZmluZWQsXG4gICAgaG9zdG5hbWU6IHVuZGVmaW5lZCxcbiAgICBwcm90b2NvbDogdW5kZWZpbmVkLFxuICAgIHRpbWVvdXQ6IHVuZGVmaW5lZCxcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIGhvc3Q6IHVuZGVmaW5lZCxcbiAgICBwYXRoOiB1bmRlZmluZWQsXG4gICAgcG9ydDogdW5kZWZpbmVkXG4gIH07XG5cbiAgaWYgKCFwcm90b2NvbFZlcnNpb25zLmluY2x1ZGVzKG9wdHMucHJvdG9jb2xWZXJzaW9uKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFxuICAgICAgYFVuc3VwcG9ydGVkIHByb3RvY29sIHZlcnNpb246ICR7b3B0cy5wcm90b2NvbFZlcnNpb259IGAgK1xuICAgICAgICBgKHN1cHBvcnRlZCB2ZXJzaW9uczogJHtwcm90b2NvbFZlcnNpb25zLmpvaW4oJywgJyl9KWBcbiAgICApO1xuICB9XG5cbiAgbGV0IHBhcnNlZFVybDtcblxuICBpZiAoYWRkcmVzcyBpbnN0YW5jZW9mIFVSTCkge1xuICAgIHBhcnNlZFVybCA9IGFkZHJlc3M7XG4gICAgd2Vic29ja2V0Ll91cmwgPSBhZGRyZXNzLmhyZWY7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHtcbiAgICAgIHBhcnNlZFVybCA9IG5ldyBVUkwoYWRkcmVzcyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKGBJbnZhbGlkIFVSTDogJHthZGRyZXNzfWApO1xuICAgIH1cblxuICAgIHdlYnNvY2tldC5fdXJsID0gYWRkcmVzcztcbiAgfVxuXG4gIGNvbnN0IGlzU2VjdXJlID0gcGFyc2VkVXJsLnByb3RvY29sID09PSAnd3NzOic7XG4gIGNvbnN0IGlzSXBjVXJsID0gcGFyc2VkVXJsLnByb3RvY29sID09PSAnd3MrdW5peDonO1xuICBsZXQgaW52YWxpZFVybE1lc3NhZ2U7XG5cbiAgaWYgKHBhcnNlZFVybC5wcm90b2NvbCAhPT0gJ3dzOicgJiYgIWlzU2VjdXJlICYmICFpc0lwY1VybCkge1xuICAgIGludmFsaWRVcmxNZXNzYWdlID1cbiAgICAgICdUaGUgVVJMXFwncyBwcm90b2NvbCBtdXN0IGJlIG9uZSBvZiBcIndzOlwiLCBcIndzczpcIiwgb3IgXCJ3cyt1bml4OlwiJztcbiAgfSBlbHNlIGlmIChpc0lwY1VybCAmJiAhcGFyc2VkVXJsLnBhdGhuYW1lKSB7XG4gICAgaW52YWxpZFVybE1lc3NhZ2UgPSBcIlRoZSBVUkwncyBwYXRobmFtZSBpcyBlbXB0eVwiO1xuICB9IGVsc2UgaWYgKHBhcnNlZFVybC5oYXNoKSB7XG4gICAgaW52YWxpZFVybE1lc3NhZ2UgPSAnVGhlIFVSTCBjb250YWlucyBhIGZyYWdtZW50IGlkZW50aWZpZXInO1xuICB9XG5cbiAgaWYgKGludmFsaWRVcmxNZXNzYWdlKSB7XG4gICAgY29uc3QgZXJyID0gbmV3IFN5bnRheEVycm9yKGludmFsaWRVcmxNZXNzYWdlKTtcblxuICAgIGlmICh3ZWJzb2NrZXQuX3JlZGlyZWN0cyA9PT0gMCkge1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbWl0RXJyb3JBbmRDbG9zZSh3ZWJzb2NrZXQsIGVycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZGVmYXVsdFBvcnQgPSBpc1NlY3VyZSA/IDQ0MyA6IDgwO1xuICBjb25zdCBrZXkgPSByYW5kb21CeXRlcygxNikudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICBjb25zdCByZXF1ZXN0ID0gaXNTZWN1cmUgPyBodHRwcy5yZXF1ZXN0IDogaHR0cC5yZXF1ZXN0O1xuICBjb25zdCBwcm90b2NvbFNldCA9IG5ldyBTZXQoKTtcbiAgbGV0IHBlck1lc3NhZ2VEZWZsYXRlO1xuXG4gIG9wdHMuY3JlYXRlQ29ubmVjdGlvbiA9IGlzU2VjdXJlID8gdGxzQ29ubmVjdCA6IG5ldENvbm5lY3Q7XG4gIG9wdHMuZGVmYXVsdFBvcnQgPSBvcHRzLmRlZmF1bHRQb3J0IHx8IGRlZmF1bHRQb3J0O1xuICBvcHRzLnBvcnQgPSBwYXJzZWRVcmwucG9ydCB8fCBkZWZhdWx0UG9ydDtcbiAgb3B0cy5ob3N0ID0gcGFyc2VkVXJsLmhvc3RuYW1lLnN0YXJ0c1dpdGgoJ1snKVxuICAgID8gcGFyc2VkVXJsLmhvc3RuYW1lLnNsaWNlKDEsIC0xKVxuICAgIDogcGFyc2VkVXJsLmhvc3RuYW1lO1xuICBvcHRzLmhlYWRlcnMgPSB7XG4gICAgLi4ub3B0cy5oZWFkZXJzLFxuICAgICdTZWMtV2ViU29ja2V0LVZlcnNpb24nOiBvcHRzLnByb3RvY29sVmVyc2lvbixcbiAgICAnU2VjLVdlYlNvY2tldC1LZXknOiBrZXksXG4gICAgQ29ubmVjdGlvbjogJ1VwZ3JhZGUnLFxuICAgIFVwZ3JhZGU6ICd3ZWJzb2NrZXQnXG4gIH07XG4gIG9wdHMucGF0aCA9IHBhcnNlZFVybC5wYXRobmFtZSArIHBhcnNlZFVybC5zZWFyY2g7XG4gIG9wdHMudGltZW91dCA9IG9wdHMuaGFuZHNoYWtlVGltZW91dDtcblxuICBpZiAob3B0cy5wZXJNZXNzYWdlRGVmbGF0ZSkge1xuICAgIHBlck1lc3NhZ2VEZWZsYXRlID0gbmV3IFBlck1lc3NhZ2VEZWZsYXRlKFxuICAgICAgb3B0cy5wZXJNZXNzYWdlRGVmbGF0ZSAhPT0gdHJ1ZSA/IG9wdHMucGVyTWVzc2FnZURlZmxhdGUgOiB7fSxcbiAgICAgIGZhbHNlLFxuICAgICAgb3B0cy5tYXhQYXlsb2FkXG4gICAgKTtcbiAgICBvcHRzLmhlYWRlcnNbJ1NlYy1XZWJTb2NrZXQtRXh0ZW5zaW9ucyddID0gZm9ybWF0KHtcbiAgICAgIFtQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXTogcGVyTWVzc2FnZURlZmxhdGUub2ZmZXIoKVxuICAgIH0pO1xuICB9XG4gIGlmIChwcm90b2NvbHMubGVuZ3RoKSB7XG4gICAgZm9yIChjb25zdCBwcm90b2NvbCBvZiBwcm90b2NvbHMpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIHByb3RvY29sICE9PSAnc3RyaW5nJyB8fFxuICAgICAgICAhc3VicHJvdG9jb2xSZWdleC50ZXN0KHByb3RvY29sKSB8fFxuICAgICAgICBwcm90b2NvbFNldC5oYXMocHJvdG9jb2wpXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKFxuICAgICAgICAgICdBbiBpbnZhbGlkIG9yIGR1cGxpY2F0ZWQgc3VicHJvdG9jb2wgd2FzIHNwZWNpZmllZCdcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcHJvdG9jb2xTZXQuYWRkKHByb3RvY29sKTtcbiAgICB9XG5cbiAgICBvcHRzLmhlYWRlcnNbJ1NlYy1XZWJTb2NrZXQtUHJvdG9jb2wnXSA9IHByb3RvY29scy5qb2luKCcsJyk7XG4gIH1cbiAgaWYgKG9wdHMub3JpZ2luKSB7XG4gICAgaWYgKG9wdHMucHJvdG9jb2xWZXJzaW9uIDwgMTMpIHtcbiAgICAgIG9wdHMuaGVhZGVyc1snU2VjLVdlYlNvY2tldC1PcmlnaW4nXSA9IG9wdHMub3JpZ2luO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRzLmhlYWRlcnMuT3JpZ2luID0gb3B0cy5vcmlnaW47XG4gICAgfVxuICB9XG4gIGlmIChwYXJzZWRVcmwudXNlcm5hbWUgfHwgcGFyc2VkVXJsLnBhc3N3b3JkKSB7XG4gICAgb3B0cy5hdXRoID0gYCR7cGFyc2VkVXJsLnVzZXJuYW1lfToke3BhcnNlZFVybC5wYXNzd29yZH1gO1xuICB9XG5cbiAgaWYgKGlzSXBjVXJsKSB7XG4gICAgY29uc3QgcGFydHMgPSBvcHRzLnBhdGguc3BsaXQoJzonKTtcblxuICAgIG9wdHMuc29ja2V0UGF0aCA9IHBhcnRzWzBdO1xuICAgIG9wdHMucGF0aCA9IHBhcnRzWzFdO1xuICB9XG5cbiAgbGV0IHJlcTtcblxuICBpZiAob3B0cy5mb2xsb3dSZWRpcmVjdHMpIHtcbiAgICBpZiAod2Vic29ja2V0Ll9yZWRpcmVjdHMgPT09IDApIHtcbiAgICAgIHdlYnNvY2tldC5fb3JpZ2luYWxJcGMgPSBpc0lwY1VybDtcbiAgICAgIHdlYnNvY2tldC5fb3JpZ2luYWxTZWN1cmUgPSBpc1NlY3VyZTtcbiAgICAgIHdlYnNvY2tldC5fb3JpZ2luYWxIb3N0T3JTb2NrZXRQYXRoID0gaXNJcGNVcmxcbiAgICAgICAgPyBvcHRzLnNvY2tldFBhdGhcbiAgICAgICAgOiBwYXJzZWRVcmwuaG9zdDtcblxuICAgICAgY29uc3QgaGVhZGVycyA9IG9wdGlvbnMgJiYgb3B0aW9ucy5oZWFkZXJzO1xuXG4gICAgICAvL1xuICAgICAgLy8gU2hhbGxvdyBjb3B5IHRoZSB1c2VyIHByb3ZpZGVkIG9wdGlvbnMgc28gdGhhdCBoZWFkZXJzIGNhbiBiZSBjaGFuZ2VkXG4gICAgICAvLyB3aXRob3V0IG11dGF0aW5nIHRoZSBvcmlnaW5hbCBvYmplY3QuXG4gICAgICAvL1xuICAgICAgb3B0aW9ucyA9IHsgLi4ub3B0aW9ucywgaGVhZGVyczoge30gfTtcblxuICAgICAgaWYgKGhlYWRlcnMpIHtcbiAgICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoaGVhZGVycykpIHtcbiAgICAgICAgICBvcHRpb25zLmhlYWRlcnNba2V5LnRvTG93ZXJDYXNlKCldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHdlYnNvY2tldC5saXN0ZW5lckNvdW50KCdyZWRpcmVjdCcpID09PSAwKSB7XG4gICAgICBjb25zdCBpc1NhbWVIb3N0ID0gaXNJcGNVcmxcbiAgICAgICAgPyB3ZWJzb2NrZXQuX29yaWdpbmFsSXBjXG4gICAgICAgICAgPyBvcHRzLnNvY2tldFBhdGggPT09IHdlYnNvY2tldC5fb3JpZ2luYWxIb3N0T3JTb2NrZXRQYXRoXG4gICAgICAgICAgOiBmYWxzZVxuICAgICAgICA6IHdlYnNvY2tldC5fb3JpZ2luYWxJcGNcbiAgICAgICAgPyBmYWxzZVxuICAgICAgICA6IHBhcnNlZFVybC5ob3N0ID09PSB3ZWJzb2NrZXQuX29yaWdpbmFsSG9zdE9yU29ja2V0UGF0aDtcblxuICAgICAgaWYgKCFpc1NhbWVIb3N0IHx8ICh3ZWJzb2NrZXQuX29yaWdpbmFsU2VjdXJlICYmICFpc1NlY3VyZSkpIHtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gTWF0Y2ggY3VybCA3Ljc3LjAgYmVoYXZpb3IgYW5kIGRyb3AgdGhlIGZvbGxvd2luZyBoZWFkZXJzLiBUaGVzZVxuICAgICAgICAvLyBoZWFkZXJzIGFyZSBhbHNvIGRyb3BwZWQgd2hlbiBmb2xsb3dpbmcgYSByZWRpcmVjdCB0byBhIHN1YmRvbWFpbi5cbiAgICAgICAgLy9cbiAgICAgICAgZGVsZXRlIG9wdHMuaGVhZGVycy5hdXRob3JpemF0aW9uO1xuICAgICAgICBkZWxldGUgb3B0cy5oZWFkZXJzLmNvb2tpZTtcblxuICAgICAgICBpZiAoIWlzU2FtZUhvc3QpIGRlbGV0ZSBvcHRzLmhlYWRlcnMuaG9zdDtcblxuICAgICAgICBvcHRzLmF1dGggPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBNYXRjaCBjdXJsIDcuNzcuMCBiZWhhdmlvciBhbmQgbWFrZSB0aGUgZmlyc3QgYEF1dGhvcml6YXRpb25gIGhlYWRlciB3aW4uXG4gICAgLy8gSWYgdGhlIGBBdXRob3JpemF0aW9uYCBoZWFkZXIgaXMgc2V0LCB0aGVuIHRoZXJlIGlzIG5vdGhpbmcgdG8gZG8gYXMgaXRcbiAgICAvLyB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAgICAvL1xuICAgIGlmIChvcHRzLmF1dGggJiYgIW9wdGlvbnMuaGVhZGVycy5hdXRob3JpemF0aW9uKSB7XG4gICAgICBvcHRpb25zLmhlYWRlcnMuYXV0aG9yaXphdGlvbiA9XG4gICAgICAgICdCYXNpYyAnICsgQnVmZmVyLmZyb20ob3B0cy5hdXRoKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gICAgfVxuXG4gICAgcmVxID0gd2Vic29ja2V0Ll9yZXEgPSByZXF1ZXN0KG9wdHMpO1xuXG4gICAgaWYgKHdlYnNvY2tldC5fcmVkaXJlY3RzKSB7XG4gICAgICAvL1xuICAgICAgLy8gVW5saWtlIHdoYXQgaXMgZG9uZSBmb3IgdGhlIGAndXBncmFkZSdgIGV2ZW50LCBubyBlYXJseSBleGl0IGlzXG4gICAgICAvLyB0cmlnZ2VyZWQgaGVyZSBpZiB0aGUgdXNlciBjYWxscyBgd2Vic29ja2V0LmNsb3NlKClgIG9yXG4gICAgICAvLyBgd2Vic29ja2V0LnRlcm1pbmF0ZSgpYCBmcm9tIGEgbGlzdGVuZXIgb2YgdGhlIGAncmVkaXJlY3QnYCBldmVudC4gVGhpc1xuICAgICAgLy8gaXMgYmVjYXVzZSB0aGUgdXNlciBjYW4gYWxzbyBjYWxsIGByZXF1ZXN0LmRlc3Ryb3koKWAgd2l0aCBhbiBlcnJvclxuICAgICAgLy8gYmVmb3JlIGNhbGxpbmcgYHdlYnNvY2tldC5jbG9zZSgpYCBvciBgd2Vic29ja2V0LnRlcm1pbmF0ZSgpYCBhbmQgdGhpc1xuICAgICAgLy8gd291bGQgcmVzdWx0IGluIGFuIGVycm9yIGJlaW5nIGVtaXR0ZWQgb24gdGhlIGByZXF1ZXN0YCBvYmplY3Qgd2l0aCBub1xuICAgICAgLy8gYCdlcnJvcidgIGV2ZW50IGxpc3RlbmVycyBhdHRhY2hlZC5cbiAgICAgIC8vXG4gICAgICB3ZWJzb2NrZXQuZW1pdCgncmVkaXJlY3QnLCB3ZWJzb2NrZXQudXJsLCByZXEpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXEgPSB3ZWJzb2NrZXQuX3JlcSA9IHJlcXVlc3Qob3B0cyk7XG4gIH1cblxuICBpZiAob3B0cy50aW1lb3V0KSB7XG4gICAgcmVxLm9uKCd0aW1lb3V0JywgKCkgPT4ge1xuICAgICAgYWJvcnRIYW5kc2hha2Uod2Vic29ja2V0LCByZXEsICdPcGVuaW5nIGhhbmRzaGFrZSBoYXMgdGltZWQgb3V0Jyk7XG4gICAgfSk7XG4gIH1cblxuICByZXEub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgIGlmIChyZXEgPT09IG51bGwgfHwgcmVxW2tBYm9ydGVkXSkgcmV0dXJuO1xuXG4gICAgcmVxID0gd2Vic29ja2V0Ll9yZXEgPSBudWxsO1xuICAgIGVtaXRFcnJvckFuZENsb3NlKHdlYnNvY2tldCwgZXJyKTtcbiAgfSk7XG5cbiAgcmVxLm9uKCdyZXNwb25zZScsIChyZXMpID0+IHtcbiAgICBjb25zdCBsb2NhdGlvbiA9IHJlcy5oZWFkZXJzLmxvY2F0aW9uO1xuICAgIGNvbnN0IHN0YXR1c0NvZGUgPSByZXMuc3RhdHVzQ29kZTtcblxuICAgIGlmIChcbiAgICAgIGxvY2F0aW9uICYmXG4gICAgICBvcHRzLmZvbGxvd1JlZGlyZWN0cyAmJlxuICAgICAgc3RhdHVzQ29kZSA+PSAzMDAgJiZcbiAgICAgIHN0YXR1c0NvZGUgPCA0MDBcbiAgICApIHtcbiAgICAgIGlmICgrK3dlYnNvY2tldC5fcmVkaXJlY3RzID4gb3B0cy5tYXhSZWRpcmVjdHMpIHtcbiAgICAgICAgYWJvcnRIYW5kc2hha2Uod2Vic29ja2V0LCByZXEsICdNYXhpbXVtIHJlZGlyZWN0cyBleGNlZWRlZCcpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlcS5hYm9ydCgpO1xuXG4gICAgICBsZXQgYWRkcjtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYWRkciA9IG5ldyBVUkwobG9jYXRpb24sIGFkZHJlc3MpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zdCBlcnIgPSBuZXcgU3ludGF4RXJyb3IoYEludmFsaWQgVVJMOiAke2xvY2F0aW9ufWApO1xuICAgICAgICBlbWl0RXJyb3JBbmRDbG9zZSh3ZWJzb2NrZXQsIGVycik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaW5pdEFzQ2xpZW50KHdlYnNvY2tldCwgYWRkciwgcHJvdG9jb2xzLCBvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKCF3ZWJzb2NrZXQuZW1pdCgndW5leHBlY3RlZC1yZXNwb25zZScsIHJlcSwgcmVzKSkge1xuICAgICAgYWJvcnRIYW5kc2hha2UoXG4gICAgICAgIHdlYnNvY2tldCxcbiAgICAgICAgcmVxLFxuICAgICAgICBgVW5leHBlY3RlZCBzZXJ2ZXIgcmVzcG9uc2U6ICR7cmVzLnN0YXR1c0NvZGV9YFxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJlcS5vbigndXBncmFkZScsIChyZXMsIHNvY2tldCwgaGVhZCkgPT4ge1xuICAgIHdlYnNvY2tldC5lbWl0KCd1cGdyYWRlJywgcmVzKTtcblxuICAgIC8vXG4gICAgLy8gVGhlIHVzZXIgbWF5IGhhdmUgY2xvc2VkIHRoZSBjb25uZWN0aW9uIGZyb20gYSBsaXN0ZW5lciBvZiB0aGVcbiAgICAvLyBgJ3VwZ3JhZGUnYCBldmVudC5cbiAgICAvL1xuICAgIGlmICh3ZWJzb2NrZXQucmVhZHlTdGF0ZSAhPT0gV2ViU29ja2V0LkNPTk5FQ1RJTkcpIHJldHVybjtcblxuICAgIHJlcSA9IHdlYnNvY2tldC5fcmVxID0gbnVsbDtcblxuICAgIGlmIChyZXMuaGVhZGVycy51cGdyYWRlLnRvTG93ZXJDYXNlKCkgIT09ICd3ZWJzb2NrZXQnKSB7XG4gICAgICBhYm9ydEhhbmRzaGFrZSh3ZWJzb2NrZXQsIHNvY2tldCwgJ0ludmFsaWQgVXBncmFkZSBoZWFkZXInKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkaWdlc3QgPSBjcmVhdGVIYXNoKCdzaGExJylcbiAgICAgIC51cGRhdGUoa2V5ICsgR1VJRClcbiAgICAgIC5kaWdlc3QoJ2Jhc2U2NCcpO1xuXG4gICAgaWYgKHJlcy5oZWFkZXJzWydzZWMtd2Vic29ja2V0LWFjY2VwdCddICE9PSBkaWdlc3QpIHtcbiAgICAgIGFib3J0SGFuZHNoYWtlKHdlYnNvY2tldCwgc29ja2V0LCAnSW52YWxpZCBTZWMtV2ViU29ja2V0LUFjY2VwdCBoZWFkZXInKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzZXJ2ZXJQcm90ID0gcmVzLmhlYWRlcnNbJ3NlYy13ZWJzb2NrZXQtcHJvdG9jb2wnXTtcbiAgICBsZXQgcHJvdEVycm9yO1xuXG4gICAgaWYgKHNlcnZlclByb3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgaWYgKCFwcm90b2NvbFNldC5zaXplKSB7XG4gICAgICAgIHByb3RFcnJvciA9ICdTZXJ2ZXIgc2VudCBhIHN1YnByb3RvY29sIGJ1dCBub25lIHdhcyByZXF1ZXN0ZWQnO1xuICAgICAgfSBlbHNlIGlmICghcHJvdG9jb2xTZXQuaGFzKHNlcnZlclByb3QpKSB7XG4gICAgICAgIHByb3RFcnJvciA9ICdTZXJ2ZXIgc2VudCBhbiBpbnZhbGlkIHN1YnByb3RvY29sJztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHByb3RvY29sU2V0LnNpemUpIHtcbiAgICAgIHByb3RFcnJvciA9ICdTZXJ2ZXIgc2VudCBubyBzdWJwcm90b2NvbCc7XG4gICAgfVxuXG4gICAgaWYgKHByb3RFcnJvcikge1xuICAgICAgYWJvcnRIYW5kc2hha2Uod2Vic29ja2V0LCBzb2NrZXQsIHByb3RFcnJvcik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHNlcnZlclByb3QpIHdlYnNvY2tldC5fcHJvdG9jb2wgPSBzZXJ2ZXJQcm90O1xuXG4gICAgY29uc3Qgc2VjV2ViU29ja2V0RXh0ZW5zaW9ucyA9IHJlcy5oZWFkZXJzWydzZWMtd2Vic29ja2V0LWV4dGVuc2lvbnMnXTtcblxuICAgIGlmIChzZWNXZWJTb2NrZXRFeHRlbnNpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICghcGVyTWVzc2FnZURlZmxhdGUpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9XG4gICAgICAgICAgJ1NlcnZlciBzZW50IGEgU2VjLVdlYlNvY2tldC1FeHRlbnNpb25zIGhlYWRlciBidXQgbm8gZXh0ZW5zaW9uICcgK1xuICAgICAgICAgICd3YXMgcmVxdWVzdGVkJztcbiAgICAgICAgYWJvcnRIYW5kc2hha2Uod2Vic29ja2V0LCBzb2NrZXQsIG1lc3NhZ2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBleHRlbnNpb25zO1xuXG4gICAgICB0cnkge1xuICAgICAgICBleHRlbnNpb25zID0gcGFyc2Uoc2VjV2ViU29ja2V0RXh0ZW5zaW9ucyk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9ICdJbnZhbGlkIFNlYy1XZWJTb2NrZXQtRXh0ZW5zaW9ucyBoZWFkZXInO1xuICAgICAgICBhYm9ydEhhbmRzaGFrZSh3ZWJzb2NrZXQsIHNvY2tldCwgbWVzc2FnZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXh0ZW5zaW9uTmFtZXMgPSBPYmplY3Qua2V5cyhleHRlbnNpb25zKTtcblxuICAgICAgaWYgKFxuICAgICAgICBleHRlbnNpb25OYW1lcy5sZW5ndGggIT09IDEgfHxcbiAgICAgICAgZXh0ZW5zaW9uTmFtZXNbMF0gIT09IFBlck1lc3NhZ2VEZWZsYXRlLmV4dGVuc2lvbk5hbWVcbiAgICAgICkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gJ1NlcnZlciBpbmRpY2F0ZWQgYW4gZXh0ZW5zaW9uIHRoYXQgd2FzIG5vdCByZXF1ZXN0ZWQnO1xuICAgICAgICBhYm9ydEhhbmRzaGFrZSh3ZWJzb2NrZXQsIHNvY2tldCwgbWVzc2FnZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgcGVyTWVzc2FnZURlZmxhdGUuYWNjZXB0KGV4dGVuc2lvbnNbUGVyTWVzc2FnZURlZmxhdGUuZXh0ZW5zaW9uTmFtZV0pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAnSW52YWxpZCBTZWMtV2ViU29ja2V0LUV4dGVuc2lvbnMgaGVhZGVyJztcbiAgICAgICAgYWJvcnRIYW5kc2hha2Uod2Vic29ja2V0LCBzb2NrZXQsIG1lc3NhZ2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHdlYnNvY2tldC5fZXh0ZW5zaW9uc1tQZXJNZXNzYWdlRGVmbGF0ZS5leHRlbnNpb25OYW1lXSA9XG4gICAgICAgIHBlck1lc3NhZ2VEZWZsYXRlO1xuICAgIH1cblxuICAgIHdlYnNvY2tldC5zZXRTb2NrZXQoc29ja2V0LCBoZWFkLCB7XG4gICAgICBnZW5lcmF0ZU1hc2s6IG9wdHMuZ2VuZXJhdGVNYXNrLFxuICAgICAgbWF4UGF5bG9hZDogb3B0cy5tYXhQYXlsb2FkLFxuICAgICAgc2tpcFVURjhWYWxpZGF0aW9uOiBvcHRzLnNraXBVVEY4VmFsaWRhdGlvblxuICAgIH0pO1xuICB9KTtcblxuICByZXEuZW5kKCk7XG59XG5cbi8qKlxuICogRW1pdCB0aGUgYCdlcnJvcidgIGFuZCBgJ2Nsb3NlJ2AgZXZlbnRzLlxuICpcbiAqIEBwYXJhbSB7V2ViU29ja2V0fSB3ZWJzb2NrZXQgVGhlIFdlYlNvY2tldCBpbnN0YW5jZVxuICogQHBhcmFtIHtFcnJvcn0gVGhlIGVycm9yIHRvIGVtaXRcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGVtaXRFcnJvckFuZENsb3NlKHdlYnNvY2tldCwgZXJyKSB7XG4gIHdlYnNvY2tldC5fcmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuICB3ZWJzb2NrZXQuZW1pdCgnZXJyb3InLCBlcnIpO1xuICB3ZWJzb2NrZXQuZW1pdENsb3NlKCk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgYG5ldC5Tb2NrZXRgIGFuZCBpbml0aWF0ZSBhIGNvbm5lY3Rpb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQ29ubmVjdGlvbiBvcHRpb25zXG4gKiBAcmV0dXJuIHtuZXQuU29ja2V0fSBUaGUgbmV3bHkgY3JlYXRlZCBzb2NrZXQgdXNlZCB0byBzdGFydCB0aGUgY29ubmVjdGlvblxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbmV0Q29ubmVjdChvcHRpb25zKSB7XG4gIG9wdGlvbnMucGF0aCA9IG9wdGlvbnMuc29ja2V0UGF0aDtcbiAgcmV0dXJuIG5ldC5jb25uZWN0KG9wdGlvbnMpO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGB0bHMuVExTU29ja2V0YCBhbmQgaW5pdGlhdGUgYSBjb25uZWN0aW9uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIENvbm5lY3Rpb24gb3B0aW9uc1xuICogQHJldHVybiB7dGxzLlRMU1NvY2tldH0gVGhlIG5ld2x5IGNyZWF0ZWQgc29ja2V0IHVzZWQgdG8gc3RhcnQgdGhlIGNvbm5lY3Rpb25cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHRsc0Nvbm5lY3Qob3B0aW9ucykge1xuICBvcHRpb25zLnBhdGggPSB1bmRlZmluZWQ7XG5cbiAgaWYgKCFvcHRpb25zLnNlcnZlcm5hbWUgJiYgb3B0aW9ucy5zZXJ2ZXJuYW1lICE9PSAnJykge1xuICAgIG9wdGlvbnMuc2VydmVybmFtZSA9IG5ldC5pc0lQKG9wdGlvbnMuaG9zdCkgPyAnJyA6IG9wdGlvbnMuaG9zdDtcbiAgfVxuXG4gIHJldHVybiB0bHMuY29ubmVjdChvcHRpb25zKTtcbn1cblxuLyoqXG4gKiBBYm9ydCB0aGUgaGFuZHNoYWtlIGFuZCBlbWl0IGFuIGVycm9yLlxuICpcbiAqIEBwYXJhbSB7V2ViU29ja2V0fSB3ZWJzb2NrZXQgVGhlIFdlYlNvY2tldCBpbnN0YW5jZVxuICogQHBhcmFtIHsoaHR0cC5DbGllbnRSZXF1ZXN0fG5ldC5Tb2NrZXR8dGxzLlNvY2tldCl9IHN0cmVhbSBUaGUgcmVxdWVzdCB0b1xuICogICAgIGFib3J0IG9yIHRoZSBzb2NrZXQgdG8gZGVzdHJveVxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2VcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGFib3J0SGFuZHNoYWtlKHdlYnNvY2tldCwgc3RyZWFtLCBtZXNzYWdlKSB7XG4gIHdlYnNvY2tldC5fcmVhZHlTdGF0ZSA9IFdlYlNvY2tldC5DTE9TSU5HO1xuXG4gIGNvbnN0IGVyciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UoZXJyLCBhYm9ydEhhbmRzaGFrZSk7XG5cbiAgaWYgKHN0cmVhbS5zZXRIZWFkZXIpIHtcbiAgICBzdHJlYW1ba0Fib3J0ZWRdID0gdHJ1ZTtcbiAgICBzdHJlYW0uYWJvcnQoKTtcblxuICAgIGlmIChzdHJlYW0uc29ja2V0ICYmICFzdHJlYW0uc29ja2V0LmRlc3Ryb3llZCkge1xuICAgICAgLy9cbiAgICAgIC8vIE9uIE5vZGUuanMgPj0gMTQuMy4wIGByZXF1ZXN0LmFib3J0KClgIGRvZXMgbm90IGRlc3Ryb3kgdGhlIHNvY2tldCBpZlxuICAgICAgLy8gY2FsbGVkIGFmdGVyIHRoZSByZXF1ZXN0IGNvbXBsZXRlZC4gU2VlXG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vd2Vic29ja2V0cy93cy9pc3N1ZXMvMTg2OS5cbiAgICAgIC8vXG4gICAgICBzdHJlYW0uc29ja2V0LmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICBwcm9jZXNzLm5leHRUaWNrKGVtaXRFcnJvckFuZENsb3NlLCB3ZWJzb2NrZXQsIGVycik7XG4gIH0gZWxzZSB7XG4gICAgc3RyZWFtLmRlc3Ryb3koZXJyKTtcbiAgICBzdHJlYW0ub25jZSgnZXJyb3InLCB3ZWJzb2NrZXQuZW1pdC5iaW5kKHdlYnNvY2tldCwgJ2Vycm9yJykpO1xuICAgIHN0cmVhbS5vbmNlKCdjbG9zZScsIHdlYnNvY2tldC5lbWl0Q2xvc2UuYmluZCh3ZWJzb2NrZXQpKTtcbiAgfVxufVxuXG4vKipcbiAqIEhhbmRsZSBjYXNlcyB3aGVyZSB0aGUgYHBpbmcoKWAsIGBwb25nKClgLCBvciBgc2VuZCgpYCBtZXRob2RzIGFyZSBjYWxsZWRcbiAqIHdoZW4gdGhlIGByZWFkeVN0YXRlYCBhdHRyaWJ1dGUgaXMgYENMT1NJTkdgIG9yIGBDTE9TRURgLlxuICpcbiAqIEBwYXJhbSB7V2ViU29ja2V0fSB3ZWJzb2NrZXQgVGhlIFdlYlNvY2tldCBpbnN0YW5jZVxuICogQHBhcmFtIHsqfSBbZGF0YV0gVGhlIGRhdGEgdG8gc2VuZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NiXSBDYWxsYmFja1xuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2VuZEFmdGVyQ2xvc2Uod2Vic29ja2V0LCBkYXRhLCBjYikge1xuICBpZiAoZGF0YSkge1xuICAgIGNvbnN0IGxlbmd0aCA9IHRvQnVmZmVyKGRhdGEpLmxlbmd0aDtcblxuICAgIC8vXG4gICAgLy8gVGhlIGBfYnVmZmVyZWRBbW91bnRgIHByb3BlcnR5IGlzIHVzZWQgb25seSB3aGVuIHRoZSBwZWVyIGlzIGEgY2xpZW50IGFuZFxuICAgIC8vIHRoZSBvcGVuaW5nIGhhbmRzaGFrZSBmYWlscy4gVW5kZXIgdGhlc2UgY2lyY3Vtc3RhbmNlcywgaW4gZmFjdCwgdGhlXG4gICAgLy8gYHNldFNvY2tldCgpYCBtZXRob2QgaXMgbm90IGNhbGxlZCwgc28gdGhlIGBfc29ja2V0YCBhbmQgYF9zZW5kZXJgXG4gICAgLy8gcHJvcGVydGllcyBhcmUgc2V0IHRvIGBudWxsYC5cbiAgICAvL1xuICAgIGlmICh3ZWJzb2NrZXQuX3NvY2tldCkgd2Vic29ja2V0Ll9zZW5kZXIuX2J1ZmZlcmVkQnl0ZXMgKz0gbGVuZ3RoO1xuICAgIGVsc2Ugd2Vic29ja2V0Ll9idWZmZXJlZEFtb3VudCArPSBsZW5ndGg7XG4gIH1cblxuICBpZiAoY2IpIHtcbiAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICBgV2ViU29ja2V0IGlzIG5vdCBvcGVuOiByZWFkeVN0YXRlICR7d2Vic29ja2V0LnJlYWR5U3RhdGV9IGAgK1xuICAgICAgICBgKCR7cmVhZHlTdGF0ZXNbd2Vic29ja2V0LnJlYWR5U3RhdGVdfSlgXG4gICAgKTtcbiAgICBwcm9jZXNzLm5leHRUaWNrKGNiLCBlcnIpO1xuICB9XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgUmVjZWl2ZXJgIGAnY29uY2x1ZGUnYCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gY29kZSBUaGUgc3RhdHVzIGNvZGVcbiAqIEBwYXJhbSB7QnVmZmVyfSByZWFzb24gVGhlIHJlYXNvbiBmb3IgY2xvc2luZ1xuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVjZWl2ZXJPbkNvbmNsdWRlKGNvZGUsIHJlYXNvbikge1xuICBjb25zdCB3ZWJzb2NrZXQgPSB0aGlzW2tXZWJTb2NrZXRdO1xuXG4gIHdlYnNvY2tldC5fY2xvc2VGcmFtZVJlY2VpdmVkID0gdHJ1ZTtcbiAgd2Vic29ja2V0Ll9jbG9zZU1lc3NhZ2UgPSByZWFzb247XG4gIHdlYnNvY2tldC5fY2xvc2VDb2RlID0gY29kZTtcblxuICBpZiAod2Vic29ja2V0Ll9zb2NrZXRba1dlYlNvY2tldF0gPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gIHdlYnNvY2tldC5fc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdkYXRhJywgc29ja2V0T25EYXRhKTtcbiAgcHJvY2Vzcy5uZXh0VGljayhyZXN1bWUsIHdlYnNvY2tldC5fc29ja2V0KTtcblxuICBpZiAoY29kZSA9PT0gMTAwNSkgd2Vic29ja2V0LmNsb3NlKCk7XG4gIGVsc2Ugd2Vic29ja2V0LmNsb3NlKGNvZGUsIHJlYXNvbik7XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgUmVjZWl2ZXJgIGAnZHJhaW4nYCBldmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZWNlaXZlck9uRHJhaW4oKSB7XG4gIGNvbnN0IHdlYnNvY2tldCA9IHRoaXNba1dlYlNvY2tldF07XG5cbiAgaWYgKCF3ZWJzb2NrZXQuaXNQYXVzZWQpIHdlYnNvY2tldC5fc29ja2V0LnJlc3VtZSgpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYFJlY2VpdmVyYCBgJ2Vycm9yJ2AgZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoUmFuZ2VFcnJvcnxFcnJvcil9IGVyciBUaGUgZW1pdHRlZCBlcnJvclxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVjZWl2ZXJPbkVycm9yKGVycikge1xuICBjb25zdCB3ZWJzb2NrZXQgPSB0aGlzW2tXZWJTb2NrZXRdO1xuXG4gIGlmICh3ZWJzb2NrZXQuX3NvY2tldFtrV2ViU29ja2V0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgd2Vic29ja2V0Ll9zb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2RhdGEnLCBzb2NrZXRPbkRhdGEpO1xuXG4gICAgLy9cbiAgICAvLyBPbiBOb2RlLmpzIDwgMTQuMC4wIHRoZSBgJ2Vycm9yJ2AgZXZlbnQgaXMgZW1pdHRlZCBzeW5jaHJvbm91c2x5LiBTZWVcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vd2Vic29ja2V0cy93cy9pc3N1ZXMvMTk0MC5cbiAgICAvL1xuICAgIHByb2Nlc3MubmV4dFRpY2socmVzdW1lLCB3ZWJzb2NrZXQuX3NvY2tldCk7XG5cbiAgICB3ZWJzb2NrZXQuY2xvc2UoZXJyW2tTdGF0dXNDb2RlXSk7XG4gIH1cblxuICB3ZWJzb2NrZXQuZW1pdCgnZXJyb3InLCBlcnIpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYFJlY2VpdmVyYCBgJ2ZpbmlzaCdgIGV2ZW50LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlY2VpdmVyT25GaW5pc2goKSB7XG4gIHRoaXNba1dlYlNvY2tldF0uZW1pdENsb3NlKCk7XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgUmVjZWl2ZXJgIGAnbWVzc2FnZSdgIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfEFycmF5QnVmZmVyfEJ1ZmZlcltdKX0gZGF0YSBUaGUgbWVzc2FnZVxuICogQHBhcmFtIHtCb29sZWFufSBpc0JpbmFyeSBTcGVjaWZpZXMgd2hldGhlciB0aGUgbWVzc2FnZSBpcyBiaW5hcnkgb3Igbm90XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZWNlaXZlck9uTWVzc2FnZShkYXRhLCBpc0JpbmFyeSkge1xuICB0aGlzW2tXZWJTb2NrZXRdLmVtaXQoJ21lc3NhZ2UnLCBkYXRhLCBpc0JpbmFyeSk7XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgUmVjZWl2ZXJgIGAncGluZydgIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBkYXRhIFRoZSBkYXRhIGluY2x1ZGVkIGluIHRoZSBwaW5nIGZyYW1lXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZWNlaXZlck9uUGluZyhkYXRhKSB7XG4gIGNvbnN0IHdlYnNvY2tldCA9IHRoaXNba1dlYlNvY2tldF07XG5cbiAgd2Vic29ja2V0LnBvbmcoZGF0YSwgIXdlYnNvY2tldC5faXNTZXJ2ZXIsIE5PT1ApO1xuICB3ZWJzb2NrZXQuZW1pdCgncGluZycsIGRhdGEpO1xufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYFJlY2VpdmVyYCBgJ3BvbmcnYCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gZGF0YSBUaGUgZGF0YSBpbmNsdWRlZCBpbiB0aGUgcG9uZyBmcmFtZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVjZWl2ZXJPblBvbmcoZGF0YSkge1xuICB0aGlzW2tXZWJTb2NrZXRdLmVtaXQoJ3BvbmcnLCBkYXRhKTtcbn1cblxuLyoqXG4gKiBSZXN1bWUgYSByZWFkYWJsZSBzdHJlYW1cbiAqXG4gKiBAcGFyYW0ge1JlYWRhYmxlfSBzdHJlYW0gVGhlIHJlYWRhYmxlIHN0cmVhbVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gcmVzdW1lKHN0cmVhbSkge1xuICBzdHJlYW0ucmVzdW1lKCk7XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgbmV0LlNvY2tldGAgYCdjbG9zZSdgIGV2ZW50LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNvY2tldE9uQ2xvc2UoKSB7XG4gIGNvbnN0IHdlYnNvY2tldCA9IHRoaXNba1dlYlNvY2tldF07XG5cbiAgdGhpcy5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBzb2NrZXRPbkNsb3NlKTtcbiAgdGhpcy5yZW1vdmVMaXN0ZW5lcignZGF0YScsIHNvY2tldE9uRGF0YSk7XG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2VuZCcsIHNvY2tldE9uRW5kKTtcblxuICB3ZWJzb2NrZXQuX3JlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0lORztcblxuICBsZXQgY2h1bms7XG5cbiAgLy9cbiAgLy8gVGhlIGNsb3NlIGZyYW1lIG1pZ2h0IG5vdCBoYXZlIGJlZW4gcmVjZWl2ZWQgb3IgdGhlIGAnZW5kJ2AgZXZlbnQgZW1pdHRlZCxcbiAgLy8gZm9yIGV4YW1wbGUsIGlmIHRoZSBzb2NrZXQgd2FzIGRlc3Ryb3llZCBkdWUgdG8gYW4gZXJyb3IuIEVuc3VyZSB0aGF0IHRoZVxuICAvLyBgcmVjZWl2ZXJgIHN0cmVhbSBpcyBjbG9zZWQgYWZ0ZXIgd3JpdGluZyBhbnkgcmVtYWluaW5nIGJ1ZmZlcmVkIGRhdGEgdG9cbiAgLy8gaXQuIElmIHRoZSByZWFkYWJsZSBzaWRlIG9mIHRoZSBzb2NrZXQgaXMgaW4gZmxvd2luZyBtb2RlIHRoZW4gdGhlcmUgaXMgbm9cbiAgLy8gYnVmZmVyZWQgZGF0YSBhcyBldmVyeXRoaW5nIGhhcyBiZWVuIGFscmVhZHkgd3JpdHRlbiBhbmQgYHJlYWRhYmxlLnJlYWQoKWBcbiAgLy8gd2lsbCByZXR1cm4gYG51bGxgLiBJZiBpbnN0ZWFkLCB0aGUgc29ja2V0IGlzIHBhdXNlZCwgYW55IHBvc3NpYmxlIGJ1ZmZlcmVkXG4gIC8vIGRhdGEgd2lsbCBiZSByZWFkIGFzIGEgc2luZ2xlIGNodW5rLlxuICAvL1xuICBpZiAoXG4gICAgIXRoaXMuX3JlYWRhYmxlU3RhdGUuZW5kRW1pdHRlZCAmJlxuICAgICF3ZWJzb2NrZXQuX2Nsb3NlRnJhbWVSZWNlaXZlZCAmJlxuICAgICF3ZWJzb2NrZXQuX3JlY2VpdmVyLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZCAmJlxuICAgIChjaHVuayA9IHdlYnNvY2tldC5fc29ja2V0LnJlYWQoKSkgIT09IG51bGxcbiAgKSB7XG4gICAgd2Vic29ja2V0Ll9yZWNlaXZlci53cml0ZShjaHVuayk7XG4gIH1cblxuICB3ZWJzb2NrZXQuX3JlY2VpdmVyLmVuZCgpO1xuXG4gIHRoaXNba1dlYlNvY2tldF0gPSB1bmRlZmluZWQ7XG5cbiAgY2xlYXJUaW1lb3V0KHdlYnNvY2tldC5fY2xvc2VUaW1lcik7XG5cbiAgaWYgKFxuICAgIHdlYnNvY2tldC5fcmVjZWl2ZXIuX3dyaXRhYmxlU3RhdGUuZmluaXNoZWQgfHxcbiAgICB3ZWJzb2NrZXQuX3JlY2VpdmVyLl93cml0YWJsZVN0YXRlLmVycm9yRW1pdHRlZFxuICApIHtcbiAgICB3ZWJzb2NrZXQuZW1pdENsb3NlKCk7XG4gIH0gZWxzZSB7XG4gICAgd2Vic29ja2V0Ll9yZWNlaXZlci5vbignZXJyb3InLCByZWNlaXZlck9uRmluaXNoKTtcbiAgICB3ZWJzb2NrZXQuX3JlY2VpdmVyLm9uKCdmaW5pc2gnLCByZWNlaXZlck9uRmluaXNoKTtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYG5ldC5Tb2NrZXRgIGAnZGF0YSdgIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBjaHVuayBBIGNodW5rIG9mIGRhdGFcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNvY2tldE9uRGF0YShjaHVuaykge1xuICBpZiAoIXRoaXNba1dlYlNvY2tldF0uX3JlY2VpdmVyLndyaXRlKGNodW5rKSkge1xuICAgIHRoaXMucGF1c2UoKTtcbiAgfVxufVxuXG4vKipcbiAqIFRoZSBsaXN0ZW5lciBvZiB0aGUgYG5ldC5Tb2NrZXRgIGAnZW5kJ2AgZXZlbnQuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc29ja2V0T25FbmQoKSB7XG4gIGNvbnN0IHdlYnNvY2tldCA9IHRoaXNba1dlYlNvY2tldF07XG5cbiAgd2Vic29ja2V0Ll9yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NJTkc7XG4gIHdlYnNvY2tldC5fcmVjZWl2ZXIuZW5kKCk7XG4gIHRoaXMuZW5kKCk7XG59XG5cbi8qKlxuICogVGhlIGxpc3RlbmVyIG9mIHRoZSBgbmV0LlNvY2tldGAgYCdlcnJvcidgIGV2ZW50LlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNvY2tldE9uRXJyb3IoKSB7XG4gIGNvbnN0IHdlYnNvY2tldCA9IHRoaXNba1dlYlNvY2tldF07XG5cbiAgdGhpcy5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBzb2NrZXRPbkVycm9yKTtcbiAgdGhpcy5vbignZXJyb3InLCBOT09QKTtcblxuICBpZiAod2Vic29ja2V0KSB7XG4gICAgd2Vic29ja2V0Ll9yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NJTkc7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImJ1ZmZlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXZlbnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3RyZWFtXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRsc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1cmxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ6bGliXCIpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18ubm1kID0gKG1vZHVsZSkgPT4ge1xuXHRtb2R1bGUucGF0aHMgPSBbXTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiOyIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuVmVsb3ggPSB2b2lkIDA7XHJcbmNvbnN0IGNoYW5uZWxfbm9kZV8xID0gcmVxdWlyZShcIi4vY2hhbm5lbC5ub2RlXCIpO1xyXG5jb25zdCBuZXN0X25vZGVfMSA9IHJlcXVpcmUoXCIuL25lc3Qubm9kZVwiKTtcclxuY29uc3QgaW50ZXJmYWNlc19ub2RlXzEgPSByZXF1aXJlKFwiLi9pbnRlcmZhY2VzLm5vZGVcIik7XHJcbmNvbnN0IGV2ZW50c18xID0gcmVxdWlyZShcImV2ZW50c1wiKTtcclxuY2xhc3MgVmVsb3gge1xyXG4gICAgY29uc3RydWN0b3Ioc29ja2V0QWRkcikge1xyXG4gICAgICAgIHRoaXMuX2JlYWNvbiA9IG5ldyBldmVudHNfMS5FdmVudEVtaXR0ZXIoKTtcclxuICAgICAgICB0aGlzLl9vbkNoYW5uZWxPcGVuZWQgPSAoVVVJRCkgPT4gY29uc29sZS5sb2coVVVJRCArIFwiIE9wZW5lZFwiKTtcclxuICAgICAgICB0aGlzLl9vbkNoYW5uZWxDbG9zZWQgPSAoVVVJRCkgPT4gY29uc29sZS5sb2coVVVJRCArIFwiIENsb3NlZFwiKTtcclxuICAgICAgICB0aGlzLl9hY3RpdmVDaGFubmVscyA9IG5ldyBNYXAoKTtcclxuICAgICAgICB0aGlzLl9tZXNzYWdlQ2FsbGJhY2tNYXAgPSBuZXcgTWFwO1xyXG4gICAgICAgIHRoaXMuX2RlZmF1bHRNZXNzYWdlQ2FsbGJhY2sgPSAoY20pID0+IHsgY29uc29sZS5sb2coY20pOyB9O1xyXG4gICAgICAgIGNvbnN0IFJDTUhhbmRsZXIgPSAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9iZWFjb24uZW1pdChcIlJDTVwiLCB7IENNOiBtZXNzYWdlIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgU05NSGFuZGxlciA9IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JlYWNvbi5lbWl0KFwiU05NXCIsIHsgU05NOiBtZXNzYWdlIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgUk5NSGFuZGxlciA9IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JlYWNvbi5lbWl0KFwiUk5NXCIsIHsgUk5NOiBtZXNzYWdlIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgQ01VSGFuZGxlciA9IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JlYWNvbi5lbWl0KFwiQ01VXCIsIHsgQ01VOiBtZXNzYWdlIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fYmVhY29uLm9uKFwiUk5NXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXZlbnQuUk5NO1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5UeXBlID09IGludGVyZmFjZXNfbm9kZV8xLlJlY2lldmFibGVOZXN0TWVzc2FnZVR5cGUuSW5pdGlhbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fVVVJRCA9IG1lc3NhZ2UuVVVJRDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChtZXNzYWdlLlR5cGUgPT0gaW50ZXJmYWNlc19ub2RlXzEuUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZS5TdGFydEhhbmRzaGFrZSB8fCBtZXNzYWdlLlR5cGUgPT0gaW50ZXJmYWNlc19ub2RlXzEuUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZS5PZmZlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlQ2hhbm5lbHMuc2V0KG1lc3NhZ2UuVVVJRCwgbmV3IGNoYW5uZWxfbm9kZV8xLkNoYW5uZWwoU05NSGFuZGxlciwgUkNNSGFuZGxlciwgQ01VSGFuZGxlcikpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmVhY29uLm9uKG1lc3NhZ2UuVVVJRCwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWN0aXZlQ2hhbm5lbHMuZ2V0KG1lc3NhZ2UuVVVJRCkuUk5NUHJvY2Vzc29yKGV2ZW50LlJOTSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JlYWNvbi5lbWl0KG1lc3NhZ2UuVVVJRCwgeyBSTk06IG1lc3NhZ2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAobWVzc2FnZS5VVUlEICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JlYWNvbi5lbWl0KG1lc3NhZ2UuVVVJRCwgeyBSTk06IG1lc3NhZ2UgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9iZWFjb24ub24oXCJTTk1cIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBldmVudC5TTk07XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLlVVSUQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmVzdC5TTk1Qcm9jZXNzb3IoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtZXNzYWdlKSwgeyBVVUlEOiB0aGlzLl9VVUlEIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25lc3QuU05NUHJvY2Vzc29yKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fYmVhY29uLm9uKFwiUkNNXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXZlbnQuQ007XHJcbiAgICAgICAgICAgIGNvbnN0IGYgPSB0aGlzLl9tZXNzYWdlQ2FsbGJhY2tNYXAuZ2V0KG1lc3NhZ2UuVHlwZSk7XHJcbiAgICAgICAgICAgIGlmIChmID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVmYXVsdE1lc3NhZ2VDYWxsYmFjayhtZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGYobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9iZWFjb24ub24oXCJDTVVcIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBldmVudC5DTVU7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLlVwZGF0ZSA9PSBcIk9wZW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkNoYW5uZWxPcGVuZWQobWVzc2FnZS5QZWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChtZXNzYWdlLlVwZGF0ZSA9PSBcIkNsb3NlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkNoYW5uZWxDbG9zZWQobWVzc2FnZS5QZWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX25lc3QgPSBuZXcgbmVzdF9ub2RlXzEuTmVzdChzb2NrZXRBZGRyLCBSTk1IYW5kbGVyKTtcclxuICAgIH1cclxuICAgIGNvbm5lY3QobmV0d29ya0lEKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IHsgVHlwZTogaW50ZXJmYWNlc19ub2RlXzEuU2VuZGFibGVOZXN0TWVzc2FnZVR5cGUuSW5pdGlhbCwgT3RoZXI6IG5ldHdvcmtJRCB9O1xyXG4gICAgICAgIGNvbnN0IHggPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9uZXN0LmlzQWN0aXZlKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2JlYWNvbi5lbWl0KFwiU05NXCIsIHsgU05NOiBtZXNzYWdlIH0pO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwKTtcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyTWVzc2FnZSh0eXBlLCBjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VDYWxsYmFja01hcFt0eXBlXSA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG4gICAgcmVnaXN0ZXJEZWZhdWx0KGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdE1lc3NhZ2VDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG4gICAgb25jaGFubmVsb3BlbihjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbm5lbE9wZW5lZCA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG4gICAgb25jaGFubmVsY2xvc2UoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLl9vbkNoYW5uZWxDbG9zZWQgPSBjYWxsYmFjaztcclxuICAgIH1cclxuICAgIHNlbmQoY20sIHVzZXJzKSB7XHJcbiAgICAgICAgaWYgKHVzZXJzID09IHVuZGVmaW5lZCB8fCB1c2Vycy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IFtrZXksIGNoYW5uZWxdIG9mIHRoaXMuX2FjdGl2ZUNoYW5uZWxzLmVudHJpZXMoKSkge1xyXG4gICAgICAgICAgICAgICAgY2hhbm5lbC5TQ01Qcm9jZXNzb3IoY20pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHVzZXIgb2YgdXNlcnMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoYW5uZWwgPSB0aGlzLl9hY3RpdmVDaGFubmVscy5nZXQodXNlcik7XHJcbiAgICAgICAgICAgICAgICBjaGFubmVsLlNDTVByb2Nlc3NvcihjbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5WZWxveCA9IFZlbG94O1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=