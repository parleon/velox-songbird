interface BaseNestMessage {
    UUID?: string;
    SDPOffer?: RTCSessionDescriptionInit;
    Candidate?: RTCIceCandidate;
    Other?: string;
}
export interface RecievableNestMessage extends BaseNestMessage {
    Type?: RecievableNestMessageType;
}
export interface SendableNestMessage extends BaseNestMessage {
    Type?: SendableNestMessageType;
}
export declare enum RecievableNestMessageType {
    Initial = "IN",
    StartHandshake = "SH",
    Offer = "OF",
    Answer = "AN",
    ICE = "C"
}
export declare enum SendableNestMessageType {
    Initial = "IN",
    Offer = "OF",
    Answer = "AN",
    ICE = "C"
}
export interface ChannelMessage {
    Body?: any;
    Type?: string;
    UUID?: string;
    BlobRelay?: string;
}
export interface ChannelMetaUpdate {
    Peer?: string;
    Update?: string;
}
export interface BeaconEvent {
    RNM?: RecievableNestMessage;
    SNM?: SendableNestMessage;
    CM?: ChannelMessage;
    CMU?: ChannelMetaUpdate;
}
export {};
