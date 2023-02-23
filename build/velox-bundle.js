(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Velox"] = factory();
	else
		root["Velox"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/web/channel.ts":
/*!****************************!*\
  !*** ./lib/web/channel.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Channel = void 0;
const interfaces_1 = __webpack_require__(/*! ./interfaces */ "./lib/web/interfaces.ts");
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
        if (message.Type == interfaces_1.RecievableNestMessageType.StartHandshake) {
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
                    Type: interfaces_1.SendableNestMessageType.Offer
                };
                this._SNMHandler(msg);
            });
        }
        else if (message.Type == interfaces_1.RecievableNestMessageType.Offer) {
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
                    Type: interfaces_1.SendableNestMessageType.Answer
                };
                this._SNMHandler(msg);
                this._peerConnection.onicecandidate = ({ candidate }) => {
                    const msg = {
                        UUID: this._peerUUID,
                        Candidate: candidate,
                        Type: interfaces_1.SendableNestMessageType.ICE
                    };
                    this._SNMHandler(msg);
                };
            });
        }
        else if (message.Type == interfaces_1.RecievableNestMessageType.Answer) {
            this._peerConnection.setRemoteDescription(new RTCSessionDescription(message.SDPOffer));
            this._peerConnection.onicecandidate = ({ candidate }) => {
                const msg = {
                    UUID: this._peerUUID,
                    Candidate: candidate,
                    Type: interfaces_1.SendableNestMessageType.ICE
                };
                this._SNMHandler(msg);
            };
        }
        else if (message.Type == interfaces_1.RecievableNestMessageType.ICE) {
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

/***/ "./lib/web/interfaces.ts":
/*!*******************************!*\
  !*** ./lib/web/interfaces.ts ***!
  \*******************************/
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

/***/ "./lib/web/nest.ts":
/*!*************************!*\
  !*** ./lib/web/nest.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Nest = void 0;
class Nest {
    constructor(sockAddr, RNMHandler) {
        this._active = false;
        this._sockAddr = "ws:45.33.74.165:80/nest";
        if (sockAddr !== undefined) {
            this._sockAddr = sockAddr;
        }
        this._ws = new WebSocket(this._sockAddr);
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
/*!**************************!*\
  !*** ./lib/web/velox.ts ***!
  \**************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Velox = void 0;
const channel_1 = __webpack_require__(/*! ./channel */ "./lib/web/channel.ts");
const nest_1 = __webpack_require__(/*! ./nest */ "./lib/web/nest.ts");
const interfaces_1 = __webpack_require__(/*! ./interfaces */ "./lib/web/interfaces.ts");
class Velox {
    constructor(socketAddr) {
        this._beacon = new EventTarget();
        this._onChannelOpened = (UUID) => console.log(UUID + " Opened");
        this._onChannelClosed = (UUID) => console.log(UUID + " Closed");
        this._activeChannels = new Map();
        this._messageCallbackMap = new Map;
        this._defaultMessageCallback = (cm) => { console.log(cm); };
        const RCMHandler = (message) => {
            this._beacon.dispatchEvent(new CustomEvent("RCM", { detail: { CM: message } }));
        };
        const SNMHandler = (message) => {
            this._beacon.dispatchEvent(new CustomEvent("SNM", { detail: { SNM: message } }));
        };
        const RNMHandler = (message) => {
            this._beacon.dispatchEvent(new CustomEvent("RNM", { detail: { RNM: message } }));
        };
        const CMUHandler = (message) => {
            this._beacon.dispatchEvent(new CustomEvent("CMU", { detail: { CMU: message } }));
        };
        this._beacon.addEventListener("RNM", (event) => {
            const message = event.detail.RNM;
            if (message.Type == interfaces_1.RecievableNestMessageType.Initial) {
                this._UUID = message.UUID;
            }
            else if (message.Type == interfaces_1.RecievableNestMessageType.StartHandshake || message.Type == interfaces_1.RecievableNestMessageType.Offer) {
                this._activeChannels.set(message.UUID, new channel_1.Channel(SNMHandler, RCMHandler, CMUHandler));
                this._beacon.addEventListener(message.UUID, (event) => {
                    this._activeChannels.get(message.UUID).RNMProcessor(event.detail.RNM);
                });
                this._beacon.dispatchEvent(new CustomEvent(message.UUID, { detail: { RNM: message } }));
            }
            else if (message.UUID != null) {
                this._beacon.dispatchEvent(new CustomEvent(message.UUID, { detail: { RNM: message } }));
            }
        });
        this._beacon.addEventListener("SNM", (event) => {
            const message = event.detail.SNM;
            if (message.UUID == null) {
                this._nest.SNMProcessor(Object.assign(Object.assign({}, message), { UUID: this._UUID }));
            }
            else {
                this._nest.SNMProcessor(message);
            }
        });
        this._beacon.addEventListener("RCM", (event) => {
            const message = event.detail.CM;
            const f = this._messageCallbackMap.get(message.Type);
            if (f == undefined) {
                this._defaultMessageCallback(message);
            }
            else {
                f(message);
            }
        });
        this._beacon.addEventListener("CMU", (event) => {
            const message = event.detail.CMU;
            if (message.Update == "Opened") {
                this._onChannelOpened(message.Peer);
            }
            else if (message.Update == "Closed") {
                this._onChannelClosed(message.Peer);
            }
        });
        this._nest = new nest_1.Nest(socketAddr, RNMHandler);
    }
    connect(networkID) {
        const message = { Type: interfaces_1.SendableNestMessageType.Initial, Other: networkID };
        const x = setInterval(() => {
            if (this._nest.isActive()) {
                this._beacon.dispatchEvent(new CustomEvent("SNM", { detail: { SNM: message } }));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLDJFQUEyRSxVQUFVLGdCQUFnQjtBQUNyRztBQUNBO0FBQ0EsMkVBQTJFLFVBQVUsZ0JBQWdCO0FBQ3JHO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRSxjQUFjLGtCQUFrQjtBQUN0RztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBLG9FQUFvRSxVQUFVLGdCQUFnQjtBQUM5RjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9WZWxveC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vVmVsb3gvLi9saWIvd2ViL2NoYW5uZWwudHMiLCJ3ZWJwYWNrOi8vVmVsb3gvLi9saWIvd2ViL2ludGVyZmFjZXMudHMiLCJ3ZWJwYWNrOi8vVmVsb3gvLi9saWIvd2ViL25lc3QudHMiLCJ3ZWJwYWNrOi8vVmVsb3gvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vVmVsb3gvLi9saWIvd2ViL3ZlbG94LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlZlbG94XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlZlbG94XCJdID0gZmFjdG9yeSgpO1xufSkoc2VsZiwgKCkgPT4ge1xucmV0dXJuICIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQ2hhbm5lbCA9IHZvaWQgMDtcclxuY29uc3QgaW50ZXJmYWNlc18xID0gcmVxdWlyZShcIi4vaW50ZXJmYWNlc1wiKTtcclxuY2xhc3MgQ2hhbm5lbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihTTk1IYW5kbGVyLCBSQ01IYW5kbGVyLCBDTVVIYW5kbGVyLCBSVENDb25maWcpIHtcclxuICAgICAgICB0aGlzLl9TQ01RdWV1ZSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX1NOTUhhbmRsZXIgPSBTTk1IYW5kbGVyO1xyXG4gICAgICAgIHRoaXMuX1JDTUhhbmRsZXIgPSBSQ01IYW5kbGVyO1xyXG4gICAgICAgIHRoaXMuX0NNVUhhbmRsZXIgPSBDTVVIYW5kbGVyO1xyXG4gICAgICAgIGlmIChSVENDb25maWcpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGVlckNvbm5lY3Rpb24gPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24oUlRDQ29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlZXJDb25uZWN0aW9uID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKHtcclxuICAgICAgICAgICAgICAgIGljZVNlcnZlcnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybHM6IFwic3R1bjpzdHVuLjEuZ29vZ2xlLmNvbToxOTMwMlwiXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBTQ01Qcm9jZXNzb3IobXNnKSB7XHJcbiAgICAgICAgY29uc3QgbXNnU3RyID0gSlNPTi5zdHJpbmdpZnkobXNnKTtcclxuICAgICAgICBjb25zdCBieXRlcyA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShtc2dTdHIpO1xyXG4gICAgICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbYnl0ZXNdLCB7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04XCJcclxuICAgICAgICB9KTtcclxuICAgICAgICBibG9iLmFycmF5QnVmZmVyKCkudGhlbigoYmxvYkRhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YUNoYW5uZWwuc2VuZChibG9iRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9TQ01RdWV1ZS5wdXNoKG1zZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGV4ZWN1dGVTQ01RdWV1ZSgpIHtcclxuICAgICAgICB3aGlsZSAodGhpcy5fU0NNUXVldWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLlNDTVByb2Nlc3Nvcih0aGlzLl9TQ01RdWV1ZS5wb3AoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgUk5NUHJvY2Vzc29yKG1lc3NhZ2UpIHtcclxuICAgICAgICBpZiAobWVzc2FnZS5UeXBlID09IGludGVyZmFjZXNfMS5SZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlLlN0YXJ0SGFuZHNoYWtlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlZXJVVUlEID0gbWVzc2FnZS5VVUlEO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhQ2hhbm5lbCA9IHRoaXMuX3BlZXJDb25uZWN0aW9uLmNyZWF0ZURhdGFDaGFubmVsKFwibVwiKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YUNoYW5uZWwuYmluYXJ5VHlwZSA9IFwiYXJyYXlidWZmZXJcIjtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YUNoYW5uZWwub25tZXNzYWdlID0gKGV2KSA9PiB0aGlzLl9vbm1lc3NhZ2VIYW5kbGVyKGV2KTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YUNoYW5uZWwub25vcGVuID0gKGV2KSA9PiB0aGlzLl9vbk9wZW5IYW5kbGVyKGV2KTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YUNoYW5uZWwub25jbG9zZSA9IChldikgPT4gdGhpcy5fb25DbG9zZUhhbmRsZXIoZXYpO1xyXG4gICAgICAgICAgICB0aGlzLl9wZWVyQ29ubmVjdGlvbi5jcmVhdGVPZmZlcigpLnRoZW4oKG9mZmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKG9mZmVyKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBVVUlEOiB0aGlzLl9wZWVyVVVJRCxcclxuICAgICAgICAgICAgICAgICAgICBTRFBPZmZlcjogb2ZmZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgVHlwZTogaW50ZXJmYWNlc18xLlNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlLk9mZmVyXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fU05NSGFuZGxlcihtc2cpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobWVzc2FnZS5UeXBlID09IGludGVyZmFjZXNfMS5SZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlLk9mZmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlZXJVVUlEID0gbWVzc2FnZS5VVUlEO1xyXG4gICAgICAgICAgICB0aGlzLl9wZWVyQ29ubmVjdGlvbi5vbmRhdGFjaGFubmVsID0gKGV2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhQ2hhbm5lbCA9IGV2LmNoYW5uZWw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhQ2hhbm5lbC5iaW5hcnlUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YUNoYW5uZWwub25tZXNzYWdlID0gKGV2KSA9PiB0aGlzLl9vbm1lc3NhZ2VIYW5kbGVyKGV2KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFDaGFubmVsLm9ub3BlbiA9IChldikgPT4gdGhpcy5fb25PcGVuSGFuZGxlcihldik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhQ2hhbm5lbC5vbmNsb3NlID0gKGV2KSA9PiB0aGlzLl9vbkNsb3NlSGFuZGxlcihldik7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuX3BlZXJDb25uZWN0aW9uLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24obWVzc2FnZS5TRFBPZmZlcikpO1xyXG4gICAgICAgICAgICB0aGlzLl9wZWVyQ29ubmVjdGlvbi5jcmVhdGVBbnN3ZXIoKS50aGVuKChhbnN3ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3BlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oYW5zd2VyKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBVVUlEOiB0aGlzLl9wZWVyVVVJRCxcclxuICAgICAgICAgICAgICAgICAgICBTRFBPZmZlcjogYW5zd2VyLFxyXG4gICAgICAgICAgICAgICAgICAgIFR5cGU6IGludGVyZmFjZXNfMS5TZW5kYWJsZU5lc3RNZXNzYWdlVHlwZS5BbnN3ZXJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9TTk1IYW5kbGVyKG1zZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wZWVyQ29ubmVjdGlvbi5vbmljZWNhbmRpZGF0ZSA9ICh7IGNhbmRpZGF0ZSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbXNnID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBVVUlEOiB0aGlzLl9wZWVyVVVJRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgQ2FuZGlkYXRlOiBjYW5kaWRhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFR5cGU6IGludGVyZmFjZXNfMS5TZW5kYWJsZU5lc3RNZXNzYWdlVHlwZS5JQ0VcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX1NOTUhhbmRsZXIobXNnKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChtZXNzYWdlLlR5cGUgPT0gaW50ZXJmYWNlc18xLlJlY2lldmFibGVOZXN0TWVzc2FnZVR5cGUuQW5zd2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BlZXJDb25uZWN0aW9uLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24obWVzc2FnZS5TRFBPZmZlcikpO1xyXG4gICAgICAgICAgICB0aGlzLl9wZWVyQ29ubmVjdGlvbi5vbmljZWNhbmRpZGF0ZSA9ICh7IGNhbmRpZGF0ZSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtc2cgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVVVJRDogdGhpcy5fcGVlclVVSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgQ2FuZGlkYXRlOiBjYW5kaWRhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgVHlwZTogaW50ZXJmYWNlc18xLlNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlLklDRVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX1NOTUhhbmRsZXIobXNnKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAobWVzc2FnZS5UeXBlID09IGludGVyZmFjZXNfMS5SZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlLklDRSkge1xyXG4gICAgICAgICAgICB0aGlzLl9wZWVyQ29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUobWVzc2FnZS5DYW5kaWRhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkZWZhdWx0XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIF9vbk9wZW5IYW5kbGVyKGV2KSB7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCBtZXRhX3VwZGF0ZSA9IHsgUGVlcjogdGhpcy5fcGVlclVVSUQsIFVwZGF0ZTogXCJPcGVuZWRcIiB9O1xyXG4gICAgICAgIHRoaXMuX0NNVUhhbmRsZXIobWV0YV91cGRhdGUpO1xyXG4gICAgICAgIHRoaXMuZXhlY3V0ZVNDTVF1ZXVlKCk7XHJcbiAgICB9XHJcbiAgICBfb25tZXNzYWdlSGFuZGxlcihldikge1xyXG4gICAgICAgIGNvbnN0IGpzb25TdHJpbmcgPSBuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUoZXYuZGF0YSk7XHJcbiAgICAgICAgY29uc3QgbXNnID0gSlNPTi5wYXJzZShqc29uU3RyaW5nKTtcclxuICAgICAgICB0aGlzLl9SQ01IYW5kbGVyKE9iamVjdC5hc3NpZ24oT2JqZWN0LmFzc2lnbih7fSwgbXNnKSwgeyBVVUlEOiB0aGlzLl9wZWVyVVVJRCB9KSk7XHJcbiAgICB9XHJcbiAgICBfb25DbG9zZUhhbmRsZXIoZXYpIHtcclxuICAgICAgICBjb25zdCBtZXRhX3VwZGF0ZSA9IHsgUGVlcjogdGhpcy5fcGVlclVVSUQsIFVwZGF0ZTogXCJDbG9zZWRcIiB9O1xyXG4gICAgICAgIHRoaXMuX0NNVUhhbmRsZXIobWV0YV91cGRhdGUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuQ2hhbm5lbCA9IENoYW5uZWw7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuU2VuZGFibGVOZXN0TWVzc2FnZVR5cGUgPSBleHBvcnRzLlJlY2lldmFibGVOZXN0TWVzc2FnZVR5cGUgPSB2b2lkIDA7XHJcbnZhciBSZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlO1xyXG4oZnVuY3Rpb24gKFJlY2lldmFibGVOZXN0TWVzc2FnZVR5cGUpIHtcclxuICAgIFJlY2lldmFibGVOZXN0TWVzc2FnZVR5cGVbXCJJbml0aWFsXCJdID0gXCJJTlwiO1xyXG4gICAgUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZVtcIlN0YXJ0SGFuZHNoYWtlXCJdID0gXCJTSFwiO1xyXG4gICAgUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZVtcIk9mZmVyXCJdID0gXCJPRlwiO1xyXG4gICAgUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZVtcIkFuc3dlclwiXSA9IFwiQU5cIjtcclxuICAgIFJlY2lldmFibGVOZXN0TWVzc2FnZVR5cGVbXCJJQ0VcIl0gPSBcIkNcIjtcclxufSkoUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZSA9IGV4cG9ydHMuUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZSB8fCAoZXhwb3J0cy5SZWNpZXZhYmxlTmVzdE1lc3NhZ2VUeXBlID0ge30pKTtcclxudmFyIFNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlO1xyXG4oZnVuY3Rpb24gKFNlbmRhYmxlTmVzdE1lc3NhZ2VUeXBlKSB7XHJcbiAgICBTZW5kYWJsZU5lc3RNZXNzYWdlVHlwZVtcIkluaXRpYWxcIl0gPSBcIklOXCI7XHJcbiAgICBTZW5kYWJsZU5lc3RNZXNzYWdlVHlwZVtcIk9mZmVyXCJdID0gXCJPRlwiO1xyXG4gICAgU2VuZGFibGVOZXN0TWVzc2FnZVR5cGVbXCJBbnN3ZXJcIl0gPSBcIkFOXCI7XHJcbiAgICBTZW5kYWJsZU5lc3RNZXNzYWdlVHlwZVtcIklDRVwiXSA9IFwiQ1wiO1xyXG59KShTZW5kYWJsZU5lc3RNZXNzYWdlVHlwZSA9IGV4cG9ydHMuU2VuZGFibGVOZXN0TWVzc2FnZVR5cGUgfHwgKGV4cG9ydHMuU2VuZGFibGVOZXN0TWVzc2FnZVR5cGUgPSB7fSkpO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLk5lc3QgPSB2b2lkIDA7XHJcbmNsYXNzIE5lc3Qge1xyXG4gICAgY29uc3RydWN0b3Ioc29ja0FkZHIsIFJOTUhhbmRsZXIpIHtcclxuICAgICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zb2NrQWRkciA9IFwid3M6NDUuMzMuNzQuMTY1OjgwL25lc3RcIjtcclxuICAgICAgICBpZiAoc29ja0FkZHIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zb2NrQWRkciA9IHNvY2tBZGRyO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl93cyA9IG5ldyBXZWJTb2NrZXQodGhpcy5fc29ja0FkZHIpO1xyXG4gICAgICAgIHRoaXMuX3dzLm9ub3BlbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJvcGVuZWQgY29ubmVjdGlvbiB0byBuZXN0XCIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fd3Mub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xyXG4gICAgICAgICAgICBSTk1IYW5kbGVyKG1lc3NhZ2UpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5fd3Mub25jbG9zZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjb25uZWN0aW9uIHdpdGggdGhlIG5lc3QgaGFzIGJlZW4gY2xvc2VkXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX3dzLm9uZXJyb3IgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQpO1xyXG4gICAgICAgICAgICB0aGlzLl93cy5jbG9zZTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgaXNBY3RpdmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcclxuICAgIH1cclxuICAgIFNOTVByb2Nlc3NvcihTTk0pIHtcclxuICAgICAgICBjb25zdCBkdGEgPSBKU09OLnN0cmluZ2lmeShTTk0pO1xyXG4gICAgICAgIHRoaXMuX3dzLnNlbmQoZHRhKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLk5lc3QgPSBOZXN0O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5WZWxveCA9IHZvaWQgMDtcclxuY29uc3QgY2hhbm5lbF8xID0gcmVxdWlyZShcIi4vY2hhbm5lbFwiKTtcclxuY29uc3QgbmVzdF8xID0gcmVxdWlyZShcIi4vbmVzdFwiKTtcclxuY29uc3QgaW50ZXJmYWNlc18xID0gcmVxdWlyZShcIi4vaW50ZXJmYWNlc1wiKTtcclxuY2xhc3MgVmVsb3gge1xyXG4gICAgY29uc3RydWN0b3Ioc29ja2V0QWRkcikge1xyXG4gICAgICAgIHRoaXMuX2JlYWNvbiA9IG5ldyBFdmVudFRhcmdldCgpO1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbm5lbE9wZW5lZCA9IChVVUlEKSA9PiBjb25zb2xlLmxvZyhVVUlEICsgXCIgT3BlbmVkXCIpO1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbm5lbENsb3NlZCA9IChVVUlEKSA9PiBjb25zb2xlLmxvZyhVVUlEICsgXCIgQ2xvc2VkXCIpO1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZUNoYW5uZWxzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2VDYWxsYmFja01hcCA9IG5ldyBNYXA7XHJcbiAgICAgICAgdGhpcy5fZGVmYXVsdE1lc3NhZ2VDYWxsYmFjayA9IChjbSkgPT4geyBjb25zb2xlLmxvZyhjbSk7IH07XHJcbiAgICAgICAgY29uc3QgUkNNSGFuZGxlciA9IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JlYWNvbi5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcIlJDTVwiLCB7IGRldGFpbDogeyBDTTogbWVzc2FnZSB9IH0pKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IFNOTUhhbmRsZXIgPSAobWVzc2FnZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9iZWFjb24uZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJTTk1cIiwgeyBkZXRhaWw6IHsgU05NOiBtZXNzYWdlIH0gfSkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgUk5NSGFuZGxlciA9IChtZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2JlYWNvbi5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChcIlJOTVwiLCB7IGRldGFpbDogeyBSTk06IG1lc3NhZ2UgfSB9KSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBDTVVIYW5kbGVyID0gKG1lc3NhZ2UpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fYmVhY29uLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiQ01VXCIsIHsgZGV0YWlsOiB7IENNVTogbWVzc2FnZSB9IH0pKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuX2JlYWNvbi5hZGRFdmVudExpc3RlbmVyKFwiUk5NXCIsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXZlbnQuZGV0YWlsLlJOTTtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuVHlwZSA9PSBpbnRlcmZhY2VzXzEuUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZS5Jbml0aWFsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9VVUlEID0gbWVzc2FnZS5VVUlEO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1lc3NhZ2UuVHlwZSA9PSBpbnRlcmZhY2VzXzEuUmVjaWV2YWJsZU5lc3RNZXNzYWdlVHlwZS5TdGFydEhhbmRzaGFrZSB8fCBtZXNzYWdlLlR5cGUgPT0gaW50ZXJmYWNlc18xLlJlY2lldmFibGVOZXN0TWVzc2FnZVR5cGUuT2ZmZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUNoYW5uZWxzLnNldChtZXNzYWdlLlVVSUQsIG5ldyBjaGFubmVsXzEuQ2hhbm5lbChTTk1IYW5kbGVyLCBSQ01IYW5kbGVyLCBDTVVIYW5kbGVyKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iZWFjb24uYWRkRXZlbnRMaXN0ZW5lcihtZXNzYWdlLlVVSUQsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FjdGl2ZUNoYW5uZWxzLmdldChtZXNzYWdlLlVVSUQpLlJOTVByb2Nlc3NvcihldmVudC5kZXRhaWwuUk5NKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmVhY29uLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KG1lc3NhZ2UuVVVJRCwgeyBkZXRhaWw6IHsgUk5NOiBtZXNzYWdlIH0gfSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG1lc3NhZ2UuVVVJRCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iZWFjb24uZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQobWVzc2FnZS5VVUlELCB7IGRldGFpbDogeyBSTk06IG1lc3NhZ2UgfSB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9iZWFjb24uYWRkRXZlbnRMaXN0ZW5lcihcIlNOTVwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGV2ZW50LmRldGFpbC5TTk07XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLlVVSUQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbmVzdC5TTk1Qcm9jZXNzb3IoT2JqZWN0LmFzc2lnbihPYmplY3QuYXNzaWduKHt9LCBtZXNzYWdlKSwgeyBVVUlEOiB0aGlzLl9VVUlEIH0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25lc3QuU05NUHJvY2Vzc29yKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5fYmVhY29uLmFkZEV2ZW50TGlzdGVuZXIoXCJSQ01cIiwgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBldmVudC5kZXRhaWwuQ007XHJcbiAgICAgICAgICAgIGNvbnN0IGYgPSB0aGlzLl9tZXNzYWdlQ2FsbGJhY2tNYXAuZ2V0KG1lc3NhZ2UuVHlwZSk7XHJcbiAgICAgICAgICAgIGlmIChmID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVmYXVsdE1lc3NhZ2VDYWxsYmFjayhtZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGYobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9iZWFjb24uYWRkRXZlbnRMaXN0ZW5lcihcIkNNVVwiLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGV2ZW50LmRldGFpbC5DTVU7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLlVwZGF0ZSA9PSBcIk9wZW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkNoYW5uZWxPcGVuZWQobWVzc2FnZS5QZWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChtZXNzYWdlLlVwZGF0ZSA9PSBcIkNsb3NlZFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkNoYW5uZWxDbG9zZWQobWVzc2FnZS5QZWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuX25lc3QgPSBuZXcgbmVzdF8xLk5lc3Qoc29ja2V0QWRkciwgUk5NSGFuZGxlcik7XHJcbiAgICB9XHJcbiAgICBjb25uZWN0KG5ldHdvcmtJRCkge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7IFR5cGU6IGludGVyZmFjZXNfMS5TZW5kYWJsZU5lc3RNZXNzYWdlVHlwZS5Jbml0aWFsLCBPdGhlcjogbmV0d29ya0lEIH07XHJcbiAgICAgICAgY29uc3QgeCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX25lc3QuaXNBY3RpdmUoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmVhY29uLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiU05NXCIsIHsgZGV0YWlsOiB7IFNOTTogbWVzc2FnZSB9IH0pKTtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMCk7XHJcbiAgICB9XHJcbiAgICByZWdpc3Rlck1lc3NhZ2UodHlwZSwgY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLl9tZXNzYWdlQ2FsbGJhY2tNYXBbdHlwZV0gPSBjYWxsYmFjaztcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyRGVmYXVsdChjYWxsYmFjaykge1xyXG4gICAgICAgIHRoaXMuX2RlZmF1bHRNZXNzYWdlQ2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIH1cclxuICAgIG9uY2hhbm5lbG9wZW4oY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLl9vbkNoYW5uZWxPcGVuZWQgPSBjYWxsYmFjaztcclxuICAgIH1cclxuICAgIG9uY2hhbm5lbGNsb3NlKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5fb25DaGFubmVsQ2xvc2VkID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcbiAgICBzZW5kKGNtLCB1c2Vycykge1xyXG4gICAgICAgIGlmICh1c2VycyA9PSB1bmRlZmluZWQgfHwgdXNlcnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBba2V5LCBjaGFubmVsXSBvZiB0aGlzLl9hY3RpdmVDaGFubmVscy5lbnRyaWVzKCkpIHtcclxuICAgICAgICAgICAgICAgIGNoYW5uZWwuU0NNUHJvY2Vzc29yKGNtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCB1c2VyIG9mIHVzZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGFubmVsID0gdGhpcy5fYWN0aXZlQ2hhbm5lbHMuZ2V0KHVzZXIpO1xyXG4gICAgICAgICAgICAgICAgY2hhbm5lbC5TQ01Qcm9jZXNzb3IoY20pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuVmVsb3ggPSBWZWxveDtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9