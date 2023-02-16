import { ChannelMessage, ChannelMetaUpdate, RecievableNestMessage,
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
    private _SNMHandler: (msg: SendableNestMessage) => void;
    private _RCMHandler: (msg: ChannelMessage) => void;
    private _CMUHandler: (msg: ChannelMetaUpdate) => void;
    private _active: boolean = false;


    constructor(SNMHandler: (msg: SendableNestMessage) => void, RCMHandler: (msg: ChannelMessage) => void, CMUHandler: (msg: ChannelMetaUpdate) => void, RTCConfig?: RTCConfiguration) {
        this._SNMHandler = SNMHandler;
        this._RCMHandler = RCMHandler;
        this._CMUHandler = CMUHandler;
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

    SCMProcessor(msg: ChannelMessage) {
        const msgStr = JSON.stringify(msg)
        const bytes = new TextEncoder().encode(msgStr)
        const blob = new Blob([bytes],{
            type: "application/json;charset=utf-8"
        })
        blob.arrayBuffer().then((blobData) => {
            this._dataChannel.send(blobData)
        })
    }

    RNMProcessor(message: RecievableNestMessage) {
        if (message.Type == RecievableNestMessageType.StartHandshake) {
            this._peerUUID = message.UUID;
            this._dataChannel = this._peerConnection.createDataChannel("m");
            this._dataChannel.binaryType="arraybuffer"

            this._dataChannel.onmessage = (ev) => this._onmessageHandler(ev)
            this._dataChannel.onopen = (ev) => this._onOpenHandler(ev)
            this._dataChannel.onclose = (ev) => this._onCloseHandler(ev)

            this._peerConnection.createOffer().then((offer) => {
                this._peerConnection.setLocalDescription(offer);
                const msg: SendableNestMessage = {
                    UUID: this._peerUUID, 
                    SDPOffer: offer,
                    Type: SendableNestMessageType.Offer
                }
                this._SNMHandler(msg);
            })
        } else if (message.Type == RecievableNestMessageType.Offer) {
            this._peerUUID = message.UUID;
            this._peerConnection.ondatachannel = (ev) => {
                this._dataChannel = ev.channel;
                this._dataChannel.binaryType="arraybuffer"
                this._dataChannel.onmessage = (ev) => this._onmessageHandler(ev)
                this._dataChannel.onopen = (ev) => this._onOpenHandler(ev)
                this._dataChannel.onclose = (ev) => this._onCloseHandler(ev)
            }
            this._peerConnection.setRemoteDescription(new RTCSessionDescription(message.SDPOffer));
            this._peerConnection.createAnswer().then((answer) => {
                this._peerConnection.setLocalDescription(answer);
                const msg: SendableNestMessage = {
                    UUID: this._peerUUID,
                    SDPOffer: answer,
                    Type: SendableNestMessageType.Answer
                }
                this._SNMHandler(msg);

                this._peerConnection.onicecandidate = ({candidate}) => {
                    const msg: SendableNestMessage = {
                        UUID: this._peerUUID, 
                        Candidate: candidate,
                        Type: SendableNestMessageType.ICE
                    }
                    this._SNMHandler(msg);
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
                this._SNMHandler(msg);
            }
        } else if (message.Type == RecievableNestMessageType.ICE) {
         
                this._peerConnection.addIceCandidate(message.Candidate)            
        } else {
                console.log("default");
        }
    }

    private _onOpenHandler(ev: Event) {
        this._active = true;
        const meta_update: ChannelMetaUpdate = {Peer: this._peerUUID, Update: "Opened"}
        this._CMUHandler(meta_update)
    }

    private _onmessageHandler(ev: MessageEvent<any>) {
        const jsonString = new TextDecoder().decode(ev.data)
        const msg = JSON.parse(jsonString) as ChannelMessage
        this._RCMHandler({...msg, UUID: this._peerUUID})
    }

    private _onCloseHandler(ev: Event) {
        const meta_update: ChannelMetaUpdate = {Peer: this._peerUUID, Update: "Closed"}
        this._CMUHandler(meta_update)
    }

}
