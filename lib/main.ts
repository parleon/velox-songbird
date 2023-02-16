import { Velox } from "./velox";

const config = require("./../build/config.json")

const velox = new Velox(config.socketAddr)