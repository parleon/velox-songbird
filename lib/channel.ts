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

    constructor() {
        
    }

}