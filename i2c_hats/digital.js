var I2cHat = require('./base').I2cHat;

class Outputs {
  constructor(i2cHat) {
    this.i2cHat = i2cHat;
  }
  
  setValue(value) {
    this.i2cHat.setUint32Value(I2cHat.Command.DO_SET_ALL_CHANNEL_STATES, value);
  }
  
  getValue() {
    return this.i2cHat.getUint32Value(I2cHat.Command.DO_GET_ALL_CHANNEL_STATES);
  }
  
  setChannel(channel, value) {
    var request = {
      id : this.i2cHat.generateRequestId(),
      command : I2cHat.Command.DO_SET_CHANNEL_STATE,
      data : Buffer.from([channel, value])
    };
    
    var response = this.i2cHat.transfer(request, 2);
    if(!request.data.equals(response.data)) {
      throw "Bad response frame Data!";
    }
  }
  
  getChannel(channel) {
    var request = {
      id : this.i2cHat.generateRequestId(),
      command : I2cHat.Command.DO_GET_CHANNEL_STATE,
      data : Buffer.from([channel])
    };
    
    var response = this.i2cHat.transfer(request, 2);
    if((response.data.length != 2) && (response.data[0] != channel) ) {
      throw "Bad response frame Data!";
    }
    
    return response.data[1];
  }
  
  setPowerOnValue(value) {
    this.i2cHat.setUint32Value(I2cHat.Command.DO_SET_POWER_ON_VALUE, value);
  }
  
  getPowerOnValue() {
    return this.i2cHat.getUint32Value(I2cHat.Command.DO_GET_POWER_ON_VALUE);
  }
  
  setSafetyValue(value) {
    this.i2cHat.setUint32Value(I2cHat.Command.DO_SET_SAFETY_VALUE, value);
  }
  
  getSafetyValue() {
    return this.i2cHat.getUint32Value(I2cHat.Command.DO_GET_SAFETY_VALUE);
  }
  
}

class Inputs {
  constructor(i2cHat) {
    this.i2cHat = i2cHat;
  }
  
  getValue() {
    return this.i2cHat.getUint32Value(I2cHat.Command.DI_GET_ALL_CHANNEL_STATES);
  }
  
  getChannel(channel) {
    var request = {
      id : this.i2cHat.generateRequestId(),
      command : I2cHat.Command.DI_GET_CHANNEL_STATE,
      data : Buffer.from([channel])
    };
    
    var response = this.i2cHat.transfer(request, 2);
    if((response.data.length != 2) && (response.data[0] != channel) ) {
      throw "Bad response frame Data!";
    }
    
    return response.data[1];
  }
  
}

exports.Outputs = Outputs;
exports.Inputs = Inputs;
