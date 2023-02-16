import { ChannelMessage } from "./interfaces";
import { Velox } from "./velox";

const config = require("./../build/config.json")

const velox = new Velox(config.socketAddr)

velox.onchannelopen((peer) => {
    const cm: ChannelMessage = {Body:"Hello World"}
    velox.send(cm)
    velox.send({Body:peer}, [peer])
})