import { SendableNestMessage, RecievableNestMessage } from "./interfaces"
/**
 * API to handle communication with Velox nest
 */
export class Nest {
    private _ws: WebSocket;
    private _active: boolean = false;
    readonly _sockAddr: string = "ws:127.0.0.1:8080/nest";
    private _beacon: EventTarget = new EventTarget;
        

    constructor(sockAddr?: string) {

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
            console.log("Recieved: ",message)
            this._beacon.dispatchEvent(
                new CustomEvent('recieved', { detail: message })
            );

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

    send(data: SendableNestMessage): void {
        const dta = JSON.stringify(data)
        this._ws.send(dta);
    }

    // TODO: fix behavior to handle multiple types
    addNestMessageProcess(type: string, callback: (message: RecievableNestMessage) => void) {
        const eventCallback = (event: CustomEvent) => {
            const message: RecievableNestMessage = event.detail
            callback(message)
        }
        this._beacon.addEventListener(type, eventCallback)
    }

}