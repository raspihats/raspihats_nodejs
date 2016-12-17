var I2cHat = require('./base').I2cHat;

  function valueValidator(value, labels) {
    var maxValue = Math.pow(2, labels.length) - 1;
    if((value < 0) || (value > maxValue)) {
      throw "Value: " + value + " not in range[0.." + maxValue + "]";
    }
  }
  
  function channelValidator(channel, labels) {
    var index = labels.indexOf(channel);
    if(index != -1) {
      return index;
    }
    if((0 <= channel) && (channel < labels.length)) {
      return channel
    }
    throw "Channel: " + channel + " not in range[0.." + (labels.length - 1) + "] nor in labels: " + labels;
  }

class Outputs {
  constructor(i2cHat, labels) {
    this.i2cHat = i2cHat;
    this.labels = labels
  }
  
  getLabels() {
    return this.labels;
  }
  
  setValue(value) {
    valueValidator(value, this.labels);
    this.i2cHat.setUint32Value(I2cHat.Command.DO_SET_ALL_CHANNEL_STATES, value);
  }
  
  getValue() {
    return this.i2cHat.getUint32Value(I2cHat.Command.DO_GET_ALL_CHANNEL_STATES);
  }
  
  setChannel(channel, value) {
    channel = channelValidator(channel, this.labels);
    
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
    channel = channelValidator(channel, this.labels);
    
    var request = {
      id : this.i2cHat.generateRequestId(),
      command : I2cHat.Command.DO_GET_CHANNEL_STATE,
      data : Buffer.from([channel])
    };
    
    var response = this.i2cHat.transfer(request, 2);
    if(response.data[0] != channel) {
      throw "Bad response frame Data!";
    }
    
    return response.data[1];
  }
  
  setPowerOnValue(value) {
    valueValidator(value, this.labels);
    this.i2cHat.setUint32Value(I2cHat.Command.DO_SET_POWER_ON_VALUE, value);
  }
  
  getPowerOnValue() {
    return this.i2cHat.getUint32Value(I2cHat.Command.DO_GET_POWER_ON_VALUE);
  }
  
  setSafetyValue(value) {
    valueValidator(value, this.labels);
    this.i2cHat.setUint32Value(I2cHat.Command.DO_SET_SAFETY_VALUE, value);
  }
  
  getSafetyValue() {
    return this.i2cHat.getUint32Value(I2cHat.Command.DO_GET_SAFETY_VALUE);
  }
  
}

CounterType = {
  FALLING_EDGE  : 0,
  RISING_EDGE   : 1
}

class Inputs {
  constructor(i2cHat, labels) {
    this.i2cHat = i2cHat;
    this.labels = labels;
    this.CounterType = CounterType;
  }
  
  getLabels() {
    return this.labels;
  }
  
  getValue() {
    return this.i2cHat.getUint32Value(I2cHat.Command.DI_GET_ALL_CHANNEL_STATES);
  }
  
  getChannel(channel) {
    channel = channelValidator(channel, this.labels);
    
    var request = {
      id : this.i2cHat.generateRequestId(),
      command : I2cHat.Command.DI_GET_CHANNEL_STATE,
      data : Buffer.from([channel])
    };
    
    var response = this.i2cHat.transfer(request, 2);
    if(response.data[0] != channel) {
      throw "Bad response frame Data!";
    }
    
    return response.data[1];
  }
  
  getCounter(channel, type) {
    channel = channelValidator(channel, this.labels);
    
    var request = {
      id : this.i2cHat.generateRequestId(),
      command : I2cHat.Command.DI_GET_COUNTER,
      data : Buffer.from([channel, type])
    };
    
    var response = this.i2cHat.transfer(request, 6);
    if((response.data[0] != channel) && (response.data[1] != type)) {
      throw "Bad response frame Data!";
    }
    
    return response.data.readUInt32LE(2);
  }
  
  resetCounter(channel, type) {
    channel = channelValidator(channel, this.labels);
    
    var request = {
      id : this.i2cHat.generateRequestId(),
      command : I2cHat.Command.DI_RESET_COUNTER,
      data : Buffer.from([channel, type])
    };
    
    var response = this.i2cHat.transfer(request, 2);
    if(response.data[0] != channel) {
      throw "Bad response frame Data!";
    }
  }
  
  resetAllCounters() {
    var request = {
      id : this.i2cHat.generateRequestId(),
      command : I2cHat.Command.DI_RESET_ALL_COUNTERS,
    };
    
    this.i2cHat.transfer(request, 0);
  }  
}


exports.Outputs = Outputs;
exports.Inputs = Inputs;
