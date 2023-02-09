interface BaseNestMessage { 
    UUID?: string;                      // can be clients UUID or a peers UUID depending on context             // 
    SDPOffer?: RTCSessionDescription;
    Candidate?: RTCIceCandidate;
    Other?: string;
}

export interface RecievableNestMessage extends BaseNestMessage {
    Type?: RecievableNestMessageType;   
}

export interface SendableNestMessage extends BaseNestMessage {
    Type?: SendableNestMessageType;
}

export enum RecievableNestMessageType {
    Initial = "IN", // ws sends initial to configure client UUID, velox level config
    StartHandshake = "SH", // signal from websocket to open channel and start a handshake, channel level config  
    Offer = "OF", // signal from websocket with SDP Offer
    Answer = "AN", // signal from websocket with SDP Answer
    ICE = "C" // ICE candidate
}

export enum SendableNestMessageType {
    Initial = "IN", // velox level config
    Offer = "OF",
    Answer = "AN",
    ICE = "C"
}

export const MessageTypeMap = new Map<string, RecievableNestMessageType>([
    ["IN", RecievableNestMessageType.Initial],
    ["SH", RecievableNestMessageType.StartHandshake],
    ["OF", RecievableNestMessageType.Offer],
    ["AN", RecievableNestMessageType.Answer],
    ["C", RecievableNestMessageType.ICE],
]);