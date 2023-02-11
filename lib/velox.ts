import { Channel } from "./channel";
import { Nest } from "./nest";
import { ChannelMessage, RecievableNestMessageType, SendableNestMessage } from "./interfaces";

export class Velox {

    private _UUID: string;
    private _nest: Nest;
    private _activeChannels: Map<string, Channel>;
    private _beacon: EventTarget = new EventTarget();
    private _channelNestBridge: (msg: SendableNestMessage) => void 
    private _messageMap: Map<string, (cm: ChannelMessage) => void>
    private _defaultMessageCallback: (cm: ChannelMessage) => void

    constructor(/* TODO: Add Velox options (including Nest, Channel options) */) {

        this._nest = new Nest(/* TODO: Add Nest options */);
        this._activeChannels = new Map<string, Channel>();

        // function passed to a channel so it can communicate to nest
        this._channelNestBridge = (msg: SendableNestMessage) => {
            if (msg.UUID == null) {
                msg = {...msg, UUID: this._UUID};
            }
            this._nest.send(msg)    
        }

        const _veloxConnector = (msg: ChannelMessage) => {
            const fun = this._messageMap.get(msg.Type)
            if (fun == undefined) {
                this._defaultMessageCallback(msg)
            } else {
                fun(msg)
            }
        }

        this._nest.addNestMessageProcess('recieved', (message) => {
            if (message.Type == RecievableNestMessageType.Initial) {
                this._UUID = message.UUID   
            } else if (message.Type == RecievableNestMessageType.StartHandshake || message.Type == RecievableNestMessageType.Offer) {
                this._activeChannels.set(message.UUID, new Channel(this._channelNestBridge, _veloxConnector));
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

    registerMessage(type: string, callback: (cm: ChannelMessage) => void) {

    }

    registerDefault(callback: (cm: ChannelMessage) => void) {

    }

    send(body?: any, type?: string, users?: string[]) {
        const cm: ChannelMessage = {Type:type, Body:body}
        // if users specified, send to those users, otherwise send gloabally
    }

}