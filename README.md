STATUS: EARLY WIP

# songbird
A javascript library to simplify webRTC based communication networks.

### Our Purpose
This library provides a wrapper around webRTC optimized for datachannel communication between a large network of clients. 

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

// send message to network - Note: Body and Type are both optional
v.send({Type:"msg_type", Body:"This is a message that I have sent globally"});


// sent message to specific user
v.send({Type:"msg_type", Body:"I am sending this to a specific user"}, ["9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"])

```
