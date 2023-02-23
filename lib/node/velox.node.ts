import { Channel } from "./channel.node";
import { Nest } from "./nest.node";
import { BeaconEvent, ChannelMessage, ChannelMetaUpdate, RecievableNestMessage, RecievableNestMessageType, SendableNestMessage, SendableNestMessageType } from "./interfaces.node";
import { EventEmitter } from 'events'

export class Velox {

    private _UUID: string;
    private _nest: Nest;
    private _activeChannels: Map<string, Channel>;
    private _beacon: EventEmitter = new EventEmitter();
    private _messageCallbackMap: Map<string, (cm: ChannelMessage) => void>
    private _defaultMessageCallback: (cm: ChannelMessage) => void
    private _onChannelOpened: (UUID: string) => void = (UUID: string) => console.log(UUID + " Opened")
    private _onChannelClosed: (UUID: string) => void = (UUID: string) => console.log(UUID + " Closed")

    constructor(socketAddr?: string) {

        this._activeChannels = new Map<string, Channel>();
        this._messageCallbackMap = new Map<string, (cm: ChannelMessage) => void>;
        this._defaultMessageCallback = (cm) => {console.log(cm)}

        // channel uses this to emit RCM for velox to route to client
        const RCMHandler = (message: ChannelMessage) => {
            this._beacon.emit("RCM", {CM: message})
        }

        // channel uses this to emit SNM for velox to route to nest
        const SNMHandler = (message: SendableNestMessage) => {
            this._beacon.emit("SNM", {SNM: message})  
        }

        // nest uses this to emit RNM for velox to route to channels
        const RNMHandler = (message: RecievableNestMessage) => {
            this._beacon.emit("RNM", {RNM: message})
        }

        // channel uses this to emit CMU for velox to handle or forward
        const CMUHandler = (message: ChannelMetaUpdate) => {
            this._beacon.emit("CMU", {CMU: message})
        }

        this._beacon.on("RNM", (event: BeaconEvent) => {

            const message = event.RNM;

            // initial messages are used to configure velox metadata
            if (message.Type == RecievableNestMessageType.Initial) {
                this._UUID = message.UUID   
            
            // the start handshake and offer messages create new channels and binds a listener to them for RNM routing
            } else if (message.Type == RecievableNestMessageType.StartHandshake || message.Type == RecievableNestMessageType.Offer) {
                this._activeChannels.set(message.UUID, 
                    new Channel(
                        SNMHandler,
                        RCMHandler,
                        CMUHandler));
                this._beacon.on(message.UUID, (event: BeaconEvent) => {
                    this._activeChannels.get(message.UUID).RNMProcessor(event.RNM);
                })
                this._beacon.emit(message.UUID, {RNM: message})
            
            // all other RNM are routed accordingly
            } else if (message.UUID != null) {
                this._beacon.emit(message.UUID, {RNM: message})
            }
        })

        this._beacon.on("SNM", (event: BeaconEvent) => {
            const message: SendableNestMessage = event.SNM
            if (message.UUID == null) {
                this._nest.SNMProcessor({...message, UUID:this._UUID})
            } else {
                this._nest.SNMProcessor(message)
            }
        })

        this._beacon.on("RCM", (event: BeaconEvent) => {
            const message: ChannelMessage = event.CM
            const f = this._messageCallbackMap.get(message.Type)
            if (f == undefined) {
                this._defaultMessageCallback(message)
            } else {
                f(message)
            }
        })

        this._beacon.on("CMU", (event: BeaconEvent) => {
            const message: ChannelMetaUpdate = event.CMU
            if (message.Update == "Opened") {
                this._onChannelOpened(message.Peer)
            } else if (message.Update == "Closed") {
                this._onChannelClosed(message.Peer)
            }
        })

        this._nest = new Nest(socketAddr, RNMHandler);

    }

    connect(networkID: string) {
        const message: SendableNestMessage = {Type: SendableNestMessageType.Initial, Other: networkID}
        const x = setInterval(() => {
            if (this._nest.isActive()) {
                this._beacon.emit("SNM", {SNM: message})
                clearInterval(x)
            }
        }, 10)
    }

    registerMessage(type: string, callback: (cm: ChannelMessage) => void) {
        this._messageCallbackMap[type] = callback
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
            for(const [key, channel] of this._activeChannels.entries()) {
                channel.SCMProcessor(cm)
            }
        } else {
            for(const user of users) {
                const channel = this._activeChannels.get(user)
                channel.SCMProcessor(cm)
            }
        }
    }

}