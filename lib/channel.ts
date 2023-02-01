/**
 * handles webRTC channel
 * 
 * exposes simplified functionality to send BLOBs
 * 
 * recieved messages are emitted as events to the queue
 */
export class Channel {
    private _peerConnection: RTCPeerConnection;
    private _dataChannel: RTCDataChannel;
    private _connectionId: number;
    private _peerUUID: string;
    private _beacon: EventTarget = new EventTarget();

    constructor(connId: number) {
        this._connectionId = connId;
        
        this._peerConnection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.1.google.com:19302"
                }
            ]
        });

        this._dataChannel = this._peerConnection.createDataChannel("m");
    }



}