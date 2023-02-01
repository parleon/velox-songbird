interface worm {
    UUID?: string;
    Type?: SendableType;
    SDPOffer?: RTCSessionDescription;
    Candidate?: RTCIceCandidate;
    Other?: string;
}

export interface NestResponse {
    UUID?: string;
    Type?: RecievableType;
    SDPOffer?: RTCSessionDescription;
    Meta?: string;
    Other?: string;
}

enum SendableType {
    Init,
    Offering,
    Accepting,
    Rejection,
    Update
}

export enum RecievableType {
    Init,
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
            const message: NestResponse = JSON.parse(event.data);

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

    send(data: worm): void {
        this._ws.send(JSON.stringify(data));
    }

    // TODO: fix behavior to handle multiple types
    addNestMessageProcess(type: string, callback: (message: NestResponse) => void) {
        const eventCallback = (event: CustomEvent) => {
            const message: NestResponse = event.detail
            callback(message)
        }
        this._beacon.addEventListener(type, eventCallback)
    }
}