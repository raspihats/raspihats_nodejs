class DigitalOutputs {
  constructor(i2cHat) {
    this.i2cHat = i2cHat;
  }
  
  setValue(value) {
    this.i2cHat.setUint32Value(this.i2cHat.Command.DO_SET_ALL_CHANNEL_STATES, value);
  }
  
  getValue() {
    return this.i2cHat.getUint32Value(this.i2cHat.Command.DO_GET_ALL_CHANNEL_STATES);
  }
  
  setChannel(channel, value) {
    request = {};
    request.id = this.i2cHat.generateRequestId();
    request.command = this.i2cHat.Command.DO_SET_CHANNEL_STATE;
    request.data = Buffer.from([channel, value]);
    
    response = this.i2cHat.transfer(request, 2);
    if(!request.data.equals(response.data)) {
      throw "Bad response frame Data!";
    }
  }
  
  getChannel(channel) {
    request = {};
    request.id = this.i2cHat.generateRequestId();
    request.command = this.i2cHat.Command.DO_GET_CHANNEL_STATE;
    request.data = Buffer.from([channel]);
    
    response = this.i2cHat.transfer(request, 2);
    if((response.data.length != 2) && (response.data[0] != channel) ) {
      throw "Bad response frame Data!";
    }
  }
  
  setPowerOnValue(value) {
    this.i2cHat.setUint32Value(this.i2cHat.Command.DO_SET_POWER_ON_VALUE, value);
  }
  
  getPowerOnValue() {
    return this.i2cHat.getUint32Value(this.i2cHat.Command.DO_GET_POWER_ON_VALUE);
  }
  
  setSafetyValue(value) {
    this.i2cHat.setUint32Value(this.i2cHat.Command.DO_SET_SAFETY_VALUE, value);
  }
  
  getSafetyValue() {
    return this.i2cHat.getUint32Value(this.i2cHat.Command.DO_GET_SAFETY_VALUE);
  }
  
}

class DigitalInputs {
  constructor(i2cHat) {
    this.i2cHat = i2cHat;
  }
  
  getValue() {
    return this.i2cHat.getUint32Value(this.i2cHat.Command.DI_GET_ALL_CHANNEL_STATES);
  }
  
  getChannel(channel) {
    request = {};
    request.id = this.i2cHat.generateRequestId();
    request.command = this.i2cHat.Command.DI_GET_CHANNEL_STATE;
    request.data = Buffer.from([channel]);
    
    response = this.i2cHat.transfer(request, 2);
    if((response.data.length != 2) && (response.data[0] != channel) ) {
      throw "Bad response frame Data!";
    }
  }
  
}

exports.DigitalOutputs = DigitalOutputs;
exports.DigitalInputs = DigitalInputs;
