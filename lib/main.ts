import { Velox } from "./velox";
const config = require("./../build/config.json")
//export default (): Velox => {
    const velox = new Velox(config.socketAddr)
    //return velox
//}