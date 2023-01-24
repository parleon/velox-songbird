# songbird
A javascript library to simplify webRTC based communication networks.

### Our Purpose
The goal of this library is to provide a wrapper around webRTC optimized for communication between a large network of clients. 

### Quick Start
```
import velox from 'Velox-Songbird'

v = velox(); 

// register a message type to be listened for and handled by the given callback function
v.registerMsg('msg_type', callback);

// default message handler
v.registerDefault(defaultCallback);

// connect to a network with network-ID
v.connect('velox-network-id');

// send message to network
v.send('msg_type', "This is a message that I have sent globally");

// send default message to network
v.sendDefault("This is a message that I have sent globally with no message type");

// sent message to specific user
v.send('msg_type', "I am sending this to a specific user", {users:{"9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"}})

```
