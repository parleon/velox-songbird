import { Channel } from "./channel";
import { Nest } from "./nest";
import { RecievableNestMessageType, SendableNestMessage } from "./interfaces";

export class Velox {

    private _UUID: string;
    private _nest: Nest;
    private _pendingChannel: Channel;
    private _activeChannels: Channel[];
    private _beacon: EventTarget = new EventTarget();
    private _channelNestBridge: (msg: SendableNestMessage) => void 

    constructor(/* TODO: Add Velox options (including Nest, Channel options) */) {

        this._nest = new Nest(/* TODO: Add Nest options */);
        this._activeChannels = []

        this._channelNestBridge = (msg: SendableNestMessage) => {
            if (msg.UUID == null) {
                msg = {...msg, UUID: this._UUID};
            }
            this._nest.send(msg)    
        }

        this._nest.addNestMessageProcess('recieved', (message) => {
            if (message.Type == RecievableNestMessageType.Initial) {
                this._UUID = message.UUID
                this._pendingChannel = new Channel(this._channelNestBridge);     
            } else if (message.Type == RecievableNestMessageType.StartHandshake || message.Type == RecievableNestMessageType.Offer) {
                this._beacon.addEventListener(message.UUID, (event: CustomEvent) => {
                    this._pendingChannel.processNestMessage(event);
                })
                this._activeChannels.push(this._pendingChannel)
                this._pendingChannel = new Channel(this._channelNestBridge)
                this._beacon.dispatchEvent(new CustomEvent(message.UUID, {detail: message}))
            } else if (message.UUID != null) {
                this._beacon.dispatchEvent(new CustomEvent(message.UUID, {detail: message}))
            }
        }
        )

    };


}