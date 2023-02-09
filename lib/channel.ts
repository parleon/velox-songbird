import { RecievableNestMessage,
         RecievableNestMessageType, 
         SendableNestMessage,
         SendableNestMessageType} from "./interfaces";

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
    private _peerUUID: string;
    private _nestConnector: (msg: SendableNestMessage) => void;
    private _beacon: EventTarget = new EventTarget();


    constructor(connectorFunc: (msg: SendableNestMessage) => void) {
        this._nestConnector = connectorFunc;
        this._peerConnection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun.1.google.com:19302"
                }
            ]
        });

        this._dataChannel = this._peerConnection.createDataChannel("m");

    }

    processNestMessage(event: CustomEvent) {
        const message: RecievableNestMessage = event.detail

        switch (message.Type) {
            case RecievableNestMessageType.StartHandshake: {
                this._peerUUID = message.UUID;
                (async function make() {
                    const offer = await this._peerConnection.createOffer()
                    await this._peerConnection.setLocalDescription(offer)

                    //send back to nest
                    const msg: SendableNestMessage = {
                        UUID: this._peerUUID, 
                        SDPOffer: offer,
                        Type: SendableNestMessageType.Offer
                    }
                    this._nestConnector(msg)
                })
                
            }

            case RecievableNestMessageType.Offer: {
                (async function accept() {
                    await this._peerConnection.setRemoteDescription(new RTCSessionDescription(message.SDPOffer))
                    const answer = await this._peerConnection.createAnswer();
                    await this._peerConnection.setLocalDescription(answer)

                    const msg: SendableNestMessage = {
                        UUID: this._peerUUID, 
                        SDPOffer: answer,
                        Type: SendableNestMessageType.Answer
                    }
                    this._nestConnector(msg)
                })

                    //send back to nest
                    

            }

            case RecievableNestMessageType.Answer: {
                (async function () {
                    await this._peerConnection.setRemoteDescription(new RTCSessionDescription(message.SDPOffer))
                })

                this._peerConnection.onicecandidate = ({candidate}) => {
                    const msg: SendableNestMessage = {
                        UUID: this._peerUUID, 
                        Candidate: candidate,
                        Type: SendableNestMessageType.ICE
                    }
                    this._nestConnector(msg)
                }
            }

            case RecievableNestMessageType.ICE: {
                (async function () {
                    await this._peerConnection.addIceCandidate(message.Candidate)
                })

            }
            default: {
                console.log(message)
            }

        }
    }


}
