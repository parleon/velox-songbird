import { SendableNestMessage, RecievableNestMessage } from "./interfaces";
export declare class Nest {
    private _ws;
    private _active;
    readonly _sockAddr: string;
    constructor(sockAddr?: string, RNMHandler?: (message: RecievableNestMessage) => void);
    isActive(): boolean;
    SNMProcessor(SNM: SendableNestMessage): void;
}
