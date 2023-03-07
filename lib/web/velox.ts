import { Channel } from "./channel";
import { Nest } from "./nest";
import { BeaconEvent, ChannelMessage, ChannelMetaUpdate, RecievableNestMessage, RecievableNestMessageType, SendableNestMessage, SendableNestMessageType } from "./interfaces";
import SparkMD5 = require("spark-md5");

export class Velox {

    private _UUID: string;
    private _nest: Nest;
    private _activeChannels: Map<string, Channel>;
    private _beacon: EventTarget = new EventTarget();

    private _mountedBlobs: Map<string, ArrayBuffer> = new Map(); 
    private _blobInfo: Map<string, {Id: string, Type: string}> = new Map();
    private _blobRLookup: Map<string, string> = new Map();

    private _messageCallbackMap: Map<string, (cm: ChannelMessage) => void>
    private _defaultMessageCallback: (cm: ChannelMessage) => void
    private _onChannelOpened: (UUID: string) => void = (UUID: string) => console.log(UUID + " Opened")
    private _onChannelClosed: (UUID: string) => void = (UUID: string) => console.log(UUID + " Closed")

    constructor(socketAddr?: string) {
        this._activeChannels = new Map<string, Channel>();
        this._messageCallbackMap = new Map<string, (cm: ChannelMessage) => void>();
        this._defaultMessageCallback = (cm) => { console.log(cm) }

        // channel uses this to emit RCM for velox to route to client
        const RCMHandler = (message: ChannelMessage) => {
            this._beacon.dispatchEvent(new CustomEvent("RCM", { detail: { CM: message } }))
        }

        // channel uses this to emit SNM for velox to route to nest
        const SNMHandler = (message: SendableNestMessage) => {
            this._beacon.dispatchEvent(new CustomEvent("SNM", { detail: { SNM: message } }))
        }

        // nest uses this to emit RNM for velox to route to channels
        const RNMHandler = (message: RecievableNestMessage) => {
            this._beacon.dispatchEvent(new CustomEvent<BeaconEvent>("RNM", { detail: { RNM: message } }))
        }

        // channel uses this to emit CMU for velox to handle or forward
        const CMUHandler = (message: ChannelMetaUpdate) => {
            this._beacon.dispatchEvent(new CustomEvent<BeaconEvent>("CMU", { detail: { CMU: message } }))
        }

        const MBHandler = (message: any) => {
            this._beacon.dispatchEvent(new CustomEvent("MB", { detail: {Hash: message.Hash}}))
        }

        this._beacon.addEventListener("MB", (event: CustomEvent) => {
            // use hash from event
            const h = event.detail.Hash
            if (this._mountedBlobs.has(h) && this._blobInfo.has(h)) {
                this._beacon.dispatchEvent(new CustomEvent("BMC", {detail: {Id: this._blobInfo.get(h).Id, Type: this._blobInfo.get(h).Type, AB: this._mountedBlobs.get(h)}}))
            }
        })

        this._beacon.addEventListener("RNM", (event: CustomEvent<BeaconEvent>) => {

            const message = event.detail.RNM;

            // initial messages are used to configure velox metadata
            if (message.Type == RecievableNestMessageType.Initial) {
                this._UUID = message.UUID

                // the start handshake and offer messages create new channels and binds a listener to them for RNM routing
            } else if (message.Type == RecievableNestMessageType.StartHandshake || message.Type == RecievableNestMessageType.Offer) {
                this._activeChannels.set(message.UUID,
                    new Channel(
                        SNMHandler,
                        RCMHandler,
                        CMUHandler,
                        MBHandler,
                        this._mountedBlobs));
                this._beacon.addEventListener(message.UUID, (event: CustomEvent<BeaconEvent>) => {
                    this._activeChannels.get(message.UUID).RNMProcessor(event.detail.RNM);
                })
                this._beacon.dispatchEvent(new CustomEvent<BeaconEvent>(message.UUID, { detail: { RNM: message } }))

                // all other RNM are routed accordingly
            } else if (message.UUID != null) {
                this._beacon.dispatchEvent(new CustomEvent<BeaconEvent>(message.UUID, { detail: { RNM: message } }))
            }
        })

        this._beacon.addEventListener("SNM", (event: CustomEvent<BeaconEvent>) => {
            const message: SendableNestMessage = event.detail.SNM
            if (message.UUID == null) {
                this._nest.SNMProcessor({ ...message, UUID: this._UUID })
            } else {
                this._nest.SNMProcessor(message)
            }
        })

        this._beacon.addEventListener("RCM", (event: CustomEvent<BeaconEvent>) => {
            const message: ChannelMessage = event.detail.CM
            if (message.BlobRelay != undefined) {
                if (message.BlobRelay == "id") {
                    if (this._blobRLookup.has(message.Body)) {
                        const h = this._blobRLookup.get(message.Body)
                        this.send(
                            {BlobRelay:"h", 
                                Body: {
                                    Hash: h, Info: this._blobInfo.get(h)
                                }
                            }, [message.UUID]
                        )
                        this.sendBlob(h, [message.UUID])
                    }
                } else if (message.BlobRelay == "h") {
                    if (!this._blobInfo.has(message.Body.Hash)) {
                        this._blobInfo.set(message.Body.Hash, message.Body.Info)
                    }
                    MBHandler({Hash: message.Body.Hash})
                }
            } else {
                const f = this._messageCallbackMap.get(message.Type)
                if (f == undefined) {
                    this._defaultMessageCallback(message)
                } else {
                    f(message)
                }
            }
        })

        this._beacon.addEventListener("CMU", (event: CustomEvent<BeaconEvent>) => {
            const message: ChannelMetaUpdate = event.detail.CMU
            if (message.Update == "Opened") {
                this._onChannelOpened(message.Peer)
            } else if (message.Update == "Closed") {
                this._onChannelClosed(message.Peer)
            }
        })

        this._nest = new Nest(socketAddr, RNMHandler);

    }

    connect(networkID: string) {
        const message: SendableNestMessage = { Type: SendableNestMessageType.Initial, Other: networkID }
        const x = setInterval(() => {
            if (this._nest.isActive()) {
                this._beacon.dispatchEvent(new CustomEvent("SNM", { detail: { SNM: message } }))
                clearInterval(x)
            }
        }, 10)
    }

    registerMessage(type: string, callback: (cm: ChannelMessage) => void) {
        this._messageCallbackMap.set(type, callback)
    }

    registerDefault(callback: (cm: ChannelMessage) => void) {
        this._defaultMessageCallback = callback
    }

    onchannelopen(callback: (peer: string) => void) {
        this._onChannelOpened = callback
    }

    onchannelclose(callback: (peer: string) => void) {
        this._onChannelClosed = callback
    }

    send(cm: ChannelMessage, users?: string[]) {
        // if users is undefined or empty send message globally, otherwise send to specified user(s)
        if (users == undefined || users.length == 0) {
            for (const [key, channel] of this._activeChannels.entries()) {
                channel.SCMProcessor(cm)
            }
        } else {
            for (const user of users) {
                const channel = this._activeChannels.get(user)
                channel.SCMProcessor(cm)
            }
        }
    }

    requestBlob(id: string, users?: string[]): Promise<Blob> {
        this.send({BlobRelay: "id", Body:id}, users)
        return new Promise((resolve) => {
            this._beacon.addEventListener("BMC", (event: CustomEvent) => {
                if (event.detail.Id == id) {
                    const b = new Blob([event.detail.AB], {type: event.detail.Type})
            
                    resolve(b)
                    this.mountBlob(id, b)
            
                }
            })
        })
    }

    mountBlob(id: string, blob: Blob) {
        const type = blob.type
        blob.arrayBuffer().then((ab) => {
            const hash = hashAB(ab)
            this._blobInfo.set(hash, {Id: id, Type: type})
            this._mountedBlobs.set(hash, ab)
            this._blobRLookup.set(id, hash)
        })
    }

    sendBlob(hash: string, users?: string[]) {
        if (this._mountedBlobs.has(hash)) {
            const ab = this._mountedBlobs.get(hash)
            if (users == undefined || users.length == 0) {
                for (const [key, channel] of this._activeChannels.entries()) {
                    channel.RawMessage(ab)
                }
            } else {
                for (const user of users) {
                    const channel = this._activeChannels.get(user)
                    channel.RawMessage(ab)
                }
            }
        }
    }
 
}

export function hashAB(ab:  ArrayBuffer) {
        return SparkMD5.ArrayBuffer.hash(ab, true)
}
