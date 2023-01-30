import { Nest } from "./nest";

export class Velox {

    private _UUID: string;
    private _nest: Nest;

    constructor() {
        this._nest = new Nest();
    };

}