import { RecievableNestMessage,
         RecievableNestMessageType, 
         SendableNestMessage,
         SendableNestMessageType,
         MessageTypeMap } from "./interfaces";

/**
 * handles webRTC channel
 * 
 * exposes simplified functionality to send BLOBs
 * 
 * recieved messages are emitted as events to the queue
 */
export class Channel {
    private _peerConnection: RTCPeerConnection 
    private _dataChannel: RTCDataChannel;
    private _peerUUID: string;
    private _nestConnector: (msg: SendableNestMessage) => void;
    private _beacon: EventTarget = new EventTarget();

    constructor(connectorFunc: (msg: SendableNestMessage) => void, RTCConfig?: RTCConfiguration) {
        this._nestConnector = connectorFunc;
        if (RTCConfig) {
            this._peerConnection = new RTCPeerConnection(RTCConfig);
        } else {
            this._peerConnection = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: "stun:stun.1.google.com:19302"
                    }
                ]
            });
        }
        this._dataChannel = this._peerConnection.createDataChannel("m");
    }

    processNestMessage(event: CustomEvent) {
        const message: RecievableNestMessage = event.detail;
        if (message.Type == RecievableNestMessageType.StartHandshake) {
            this._peerUUID = message.UUID;
            this._peerConnection.createOffer().then((offer) => {
                this._peerConnection.setLocalDescription(offer);
                const msg: SendableNestMessage = {
                    UUID: this._peerUUID, 
                    SDPOffer: offer,
                    Type: SendableNestMessageType.Offer
                }
                this._nestConnector(msg);
            })
        } else if (message.Type == RecievableNestMessageType.Offer) {
            this._peerConnection.setRemoteDescription(new RTCSessionDescription(message.SDPOffer));
            this._peerConnection.createAnswer().then((answer) => {
                this._peerConnection.setLocalDescription(answer);
                const msg: SendableNestMessage = {
                    UUID: this._peerUUID, 
                    SDPOffer: answer,
                    Type: SendableNestMessageType.Answer
                }
                this._nestConnector(msg);
            })
        } else if (message.Type == RecievableNestMessageType.Answer) {
                this._peerConnection.setRemoteDescription(new RTCSessionDescription(message.SDPOffer))
                this._peerConnection.onicecandidate = ({candidate}) => {
                    const msg: SendableNestMessage = {
                        UUID: this._peerUUID, 
                        Candidate: candidate,
                        Type: SendableNestMessageType.ICE
                    }
                    this._nestConnector(msg);
                }

        } else if (message.Type == RecievableNestMessageType.ICE) {
                this._peerConnection.addIceCandidate(message.Candidate)            
        } else {
                console.log("default");
        }
    }


}
