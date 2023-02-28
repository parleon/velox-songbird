import { ChannelMessage } from "./interfaces";
export declare class Velox {
    private _UUID;
    private _nest;
    private _activeChannels;
    private _beacon;
    private _messageCallbackMap;
    private _defaultMessageCallback;
    private _onChannelOpened;
    private _onChannelClosed;
    constructor(socketAddr?: string);
    connect(networkID: string): void;
    registerMessage(type: string, callback: (cm: ChannelMessage) => void): void;
    registerDefault(callback: (cm: ChannelMessage) => void): void;
    onchannelopen(callback: (peer: string) => void): void;
    onchannelclose(callback: (peer: string) => void): void;
    send(cm: ChannelMessage, users?: string[]): void;
}
