import { ChannelMessage } from "./interfaces";
export declare class Velox {
    private _UUID;
    private _nest;
    private _activeChannels;
    private _beacon;
    private _mountedBlobs;
    private _blobInfo;
    private _blobRLookup;
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
    requestBlob(id: string, users?: string[]): Promise<Blob>;
    mountBlob(id: string, blob: Blob): void;
    sendBlob(hash: string, users?: string[]): void;
}
export declare function hashAB(ab: ArrayBuffer): any;
