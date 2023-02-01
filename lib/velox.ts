import { Channel } from "./channel";
import { Nest, RecievableType } from "./nest";

export class Velox {

    private _UUID: string;
    private _nest: Nest;

    constructor(/* TODO: Add Velox options (including Nest, Channel options) */) {

        this._nest = new Nest(/* TODO: Add Nest options */);

        this._nest.addNestMessageProcess('recieved', (message) => {
            console.log(message)
            if (message.Type == RecievableType.Init) {
                this._UUID = message.UUID

                /**
                 * go through process of creating initial channel
                 */
                const chan = new Channel(0);

            }
        }
        )

    };


}