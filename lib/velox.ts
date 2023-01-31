import { Nest, NestResponse } from "./nest";

export class Velox {

    private _UUID: string;
    private _nest: Nest;

    constructor() {

        this._nest = new Nest();

        const nestMessage = (event: CustomEvent) => {
            const message: NestResponse = event.detail
            console.log(message)
        }

        this._nest.addEventListener('recieved', nestMessage)
        
    };

}