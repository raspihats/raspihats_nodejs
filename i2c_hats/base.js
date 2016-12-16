var crc16 = require('../crc16');
var bus = require('i2c-bus').openSync(1);

var FRAME_ID_SIZE = 1;
var FRAME_CMD_SIZE = 1;
var FRAME_CRC_SIZE = 2;

var Command = {
    // common board commands
    GET_BOARD_NAME            : 0x10,
    GET_FIRMWARE_VERSION      : 0x11,
    GET_STATUS_WORD           : 0x12,
    RESET                     : 0x13,
    
    // Communication WatchDog commands
    CWDT_SET_PERIOD           : 0x14,
    CWDT_GET_PERIOD           : 0x15,
    CWDT_SET_STATE            : 0x16,
  
    // Digital Inputs commands
    DI_GET_ALL_CHANNEL_STATES : 0x20,
    DI_GET_CHANNEL_STATE      : 0x21,
    DI_GET_COUNTER            : 0x22,
    DI_RESET_COUNTER          : 0x23,
    DI_RESET_ALL_COUNTERS     : 0x24,
    
    // Digital Outputs commands
    DO_SET_POWER_ON_VALUE     : 0x30,
    DO_GET_POWER_ON_VALUE     : 0x31,
    DO_SET_SAFETY_VALUE       : 0x32,
    DO_GET_SAFETY_VALUE       : 0x33,
    DO_SET_ALL_CHANNEL_STATES : 0x34,
    DO_GET_ALL_CHANNEL_STATES : 0x35,
    DO_SET_CHANNEL_STATE      : 0x36,
    DO_GET_CHANNEL_STATE      : 0x37,
};

class I2cHat {
  constructor(address) {
    this.address = address;
  }
  
  generateRequestId() {
    I2cHat.id = ++I2cHat.id || 0x00;
    if(I2cHat.id > 0xFF) {
        I2cHat.id = 0;
    }
    return I2cHat.id;
  }

  encode(frame) {
    console.log(frame);
    var buffer = Buffer.from([frame.id, frame.command]);
    if(frame.data !== undefined) {
      buffer = Buffer.concat([buffer, frame.data]);
    }
    crc = crc16.modbus(buffer);
    buffer = Buffer.concat([buffer, Buffer.from([crc & 0xFF, (crc >> 8) & 0xFF])]);
    return buffer;
  }
  
  decode(buffer) {
    var len = buffer.length;
    var crc = buffer[len - 2] + (buffer[len - 1] << 8);
    if(crc !== crc16.modbus(buffer.slice(0, len - 2))) {
      throw "Bad CRC";
    }
    var frame = {
      id : buffer[0],
      command : buffer[1],
      data : buffer.slice(2, len - 2)
    };
    return frame;
  }
  
  transfer(request, responseLength, tries=5) {
    //try {
    
    var requestBuffer = this.encode(request);
    console.log("request: " + requestBuffer.toString('hex'));
    bus.i2cWriteSync(this.address, requestBuffer.length, requestBuffer);
    
    if(responseLength === 0) {
      return;
    }
    
    var responseBuffer = new Buffer(FRAME_ID_SIZE + FRAME_CMD_SIZE + responseLength + FRAME_CRC_SIZE);
    bus.i2cReadSync(this.address, responseBuffer.length, responseBuffer);
    console.log("response: " + responseBuffer.toString('hex'));
    var response = this.decode(responseBuffer);
    
    if(request.id !== response.id) {
      throw "Bad response frame Id!";
    }
    
    if(request.command !== response.command) {
      throw "Bad response frame Command!";
    }
    
    return response;
    
    //}
    //catch(err) {
    //
    //}
  }
  
  getUint32Value(command) {
    var request = {
      id : generateRequestId(),
      command : command
    };
  
    var response = transfer(request, 4);
    if(response.data.length != 4) {
      throw "Bad response frame length";
    }
    return response.data.readUInt32LE(0);
  }
  
  setUint32Value(command, value) {
    var request = {
      id : this.generateRequestId(),
      command : command,
      data : Buffer.alloc(4)
    };

    request.data.writeUInt32LE(value, 0);
    
    var response = this.transfer(request, 4);
    if(!request.data.equals(response.data)) {
      throw "Bad response frame Data!";
    }
  }
  
  get name() {
    var request = {
        id : this.generateRequestId(),
        command : Command.GET_BOARD_NAME,
    };
    var response = this.transfer(request, 25);
    return response.data.toString('ascii');
  }
  
  get fw_version() {
    var request = {
        id : this.generateRequestId(),
        command : Command.GET_FIRMWARE_VERSION,
    };
    var response = this.transfer(request, 3);
    var data = response.data.map(function(x){
        return x + 0x30;
    });
    return "v" + String.fromCharCode(data[0]) + "." + String.fromCharCode(data[1]) + "." + String.fromCharCode(data[2]);
  }
  
  get status() {
    return getUint32Value(Command.GET_STATUS_WORD);
  }
  
  reset() {
    var request = {
        id : this.generateRequestId(),
        command : Command.RESET,
    };
    this.transfer(request, 0);
  }
  
}

I2cHat.Command = Command;

exports.I2cHat = I2cHat;