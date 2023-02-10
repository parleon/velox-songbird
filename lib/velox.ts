import { Channel } from "./channel";
import { Nest } from "./nest";
import { RecievableNestMessageType, SendableNestMessage } from "./interfaces";

export class Velox {

    private _UUID: string;
    private _nest: Nest;
    private _activeChannels: Map<string, Channel>;
    private _beacon: EventTarget = new EventTarget();
    private _channelNestBridge: (msg: SendableNestMessage) => void 

    constructor(/* TODO: Add Velox options (including Nest, Channel options) */) {

        this._nest = new Nest(/* TODO: Add Nest options */);
        this._activeChannels = new Map<string, Channel>();

        this._channelNestBridge = (msg: SendableNestMessage) => {
            if (msg.UUID == null) {
                msg = {...msg, UUID: this._UUID};
            }
            this._nest.send(msg)    
        }

        this._nest.addNestMessageProcess('recieved', (message) => {
            if (message.Type == RecievableNestMessageType.Initial) {
                this._UUID = message.UUID   
            } else if (message.Type == RecievableNestMessageType.StartHandshake || message.Type == RecievableNestMessageType.Offer) {
                this._activeChannels.set(message.UUID, new Channel(this._channelNestBridge));
                this._beacon.addEventListener(message.UUID, (event: CustomEvent) => {
                    this._activeChannels.get(message.UUID).processNestMessage(event);
                })
                this._beacon.dispatchEvent(new CustomEvent(message.UUID, {detail: message}))
            } else if (message.UUID != null) {
                this._beacon.dispatchEvent(new CustomEvent(message.UUID, {detail: message}))
            }
        }
        )

    }


}