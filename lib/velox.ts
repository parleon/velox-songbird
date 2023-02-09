import { Channel } from "./channel";
import { Nest } from "./nest";
import { RecievableNestMessageType, SendableNestMessage } from "./interfaces";

export class Velox {

    private _UUID: string;
    private _nest: Nest;
    private _channels: Channel[];
    private _beacon: EventTarget = new EventTarget();
    private _channelNestBridge: (msg: SendableNestMessage) => void 

    constructor(/* TODO: Add Velox options (including Nest, Channel options) */) {

        this._nest = new Nest(/* TODO: Add Nest options */);

        this._channelNestBridge = (msg: SendableNestMessage) => {
            if (msg.UUID == null) {
                msg = {...msg, UUID: this._UUID};
            }
            this._nest.send(msg)    
        }

        this._nest.addNestMessageProcess('recieved', (message) => {
            console.log(message)

            if (message.Type == RecievableNestMessageType.Initial) {
                this._UUID = message.UUID
                /**
                 * go through process of creating initial channel
                 */
                const chan = new Channel(this._channelNestBridge);
                this._channels.push(chan);

                // bind event listener to channel for future coordination
                this._beacon.addEventListener(this._UUID /* make it peer id */, (event: CustomEvent) => {
                    chan.processNestMessage(event);
                })
            }

            else if (message.UUID != null) {
                this._beacon.dispatchEvent(new CustomEvent(message.UUID, {detail: message}))
            }
        }
        )

    };


}