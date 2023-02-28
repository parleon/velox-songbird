import { SendableNestMessage, RecievableNestMessage } from "./interfaces.node"
import { WebSocket } from 'ws'
/**
 * API to handle communication with Velox nest
 */
export class Nest {
    private _ws: WebSocket;
    private _active: boolean = false;
    readonly _sockAddr: string = "ws:45.33.74.165:80/nest";

    constructor(sockAddr?: string, RNMHandler?: (message: RecievableNestMessage) => void) {

        if (sockAddr !== undefined) {
            this._sockAddr = sockAddr;
        }

        this._ws = new WebSocket(this._sockAddr);

        this._ws.onopen = () => {
            this._active = true;
            console.log("opened connection to nest");
        };

        this._ws.onmessage = (event) => {
            const message: RecievableNestMessage = JSON.parse(event.data);
            RNMHandler(message)
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

    isActive(): boolean {
        return this._active;
    }

    SNMProcessor(SNM: SendableNestMessage): void {
        const dta = JSON.stringify(SNM)
        this._ws.send(dta);
    }

}