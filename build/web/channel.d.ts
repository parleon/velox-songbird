import { ChannelMessage, ChannelMetaUpdate, RecievableNestMessage, SendableNestMessage } from "./interfaces";
export declare class Channel {
    private _peerConnection;
    private _dataChannel;
    private _peerUUID;
    private _SCMQueue;
    private _SNMHandler;
    private _RCMHandler;
    private _CMUHandler;
    private _active;
    constructor(SNMHandler: (msg: SendableNestMessage) => void, RCMHandler: (msg: ChannelMessage) => void, CMUHandler: (msg: ChannelMetaUpdate) => void, RTCConfig?: RTCConfiguration);
    SCMProcessor(msg: ChannelMessage): void;
    executeSCMQueue(): void;
    RNMProcessor(message: RecievableNestMessage): void;
    private _onOpenHandler;
    private _onmessageHandler;
    private _onCloseHandler;
}
