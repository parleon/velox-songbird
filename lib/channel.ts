import { ChannelMessage, RecievableNestMessage,
         RecievableNestMessageType, 
         SendableNestMessage,
         SendableNestMessageType } from "./interfaces";

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
    private _veloxConnector: (msg: ChannelMessage) => void;
    private _active: boolean = false;


    constructor(nestConnector: (msg: SendableNestMessage) => void, veloxConnector: (msg: ChannelMessage) => void, RTCConfig?: RTCConfiguration) {
        this._nestConnector = nestConnector;
        this._veloxConnector = veloxConnector;
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
    }

    async send(msg: ChannelMessage) {
        const msgStr = JSON.stringify(msg)
        const bytes = new TextEncoder().encode(msgStr)
        const blob = new Blob([bytes],{
            type: "application/json;charset=utf-8"
        })
        const blobData = await blob.arrayBuffer()
        this._dataChannel.send(blobData)
    }

    processNestMessage(event: CustomEvent) {
        const message: RecievableNestMessage = event.detail;
        if (message.Type == RecievableNestMessageType.StartHandshake) {
            this._peerUUID = message.UUID;
            this._dataChannel = this._peerConnection.createDataChannel("m");
            this._dataChannel.binaryType="arraybuffer"

            this._dataChannel.onmessage = async (ev) => {
                const jsonString = new TextDecoder().decode(ev.data)
                const msg = JSON.parse(jsonString) as ChannelMessage
                this._veloxConnector(msg)
            };

            this._dataChannel.onopen = () => {
                console.log("Channel Opened")
                this._active = true;
                const test: ChannelMessage = {Type:"Hello", Body:"World"}
                this.send(test) 
            };

            this._dataChannel.onclose = () => {
                console.log("Channel Closed")
            };

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
            this._peerUUID = message.UUID;
            this._peerConnection.ondatachannel = (ev) => {
                this._dataChannel = ev.channel;
                this._dataChannel.binaryType="arraybuffer"
                this._dataChannel.onmessage = async (ev) => {
                    const jsonString = new TextDecoder().decode(ev.data)
                    const msg = JSON.parse(jsonString) as ChannelMessage
                    this._veloxConnector(msg)
                };
                this._dataChannel.onopen = () => {
                    console.log("Channel Opened")
                    this._active = true;
                    const test: ChannelMessage = {Type:"Hello", Body:"World"}
                    this.send(test)   
                };
                this._dataChannel.onclose = () => {console.log("Channel Closed")};
              }
            this._peerConnection.setRemoteDescription(new RTCSessionDescription(message.SDPOffer));
            this._peerConnection.createAnswer().then((answer) => {
                this._peerConnection.setLocalDescription(answer);
                const msg: SendableNestMessage = {
                    UUID: this._peerUUID,
                    SDPOffer: answer,
                    Type: SendableNestMessageType.Answer
                }
                this._nestConnector(msg);

                this._peerConnection.onicecandidate = ({candidate}) => {
                    const msg: SendableNestMessage = {
                        UUID: this._peerUUID, 
                        Candidate: candidate,
                        Type: SendableNestMessageType.ICE
                    }
                    this._nestConnector(msg);
                }
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
