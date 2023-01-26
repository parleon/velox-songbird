interface worm {
    UUID?: string;
    Type?: Sendable;
    SDPOffer?: RTCSessionDescription;
    Other?: string;
}

interface response {
    UUID?: string;
    Type?: Recievable;
    SDPOffer?: RTCSessionDescription;
    Meta?: string;
    Other?: string;
}

enum Sendable {
    init,
    offering,
    accepting,
    rejection,
    update
}

enum Recievable {
    Meta,
    Make,
    Accepted,
}

/**
 * API to handle communication with Velox nest
 */
export class Nest {
    private _ws: WebSocket;
    private _active: boolean = false;

    constructor() {

        this._ws = new WebSocket("ws:127.0.0.1:8080/Nest");

        this._ws.onopen = () => {
            this._active = true;
        };

        this._ws.onmessage = (event) => {
            // messages to create connections should be emitted and handled by event handler
            // so that there is no distinction in how peer MKC and server MKC is handled.
            const message: response = JSON.parse(event.data);
            
        };

        this._ws.onclose = () => {
            console.log("connection with nest has been closed");
            this._active = false;
        };

        this._ws.onerror = (event) => {
            console.log(event);
        };

    }

    send(data: worm): void {
        this._ws.send(JSON.stringify(data));
    }

}