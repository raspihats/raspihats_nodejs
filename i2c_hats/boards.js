var I2cHat = require('./base').I2cHat;
var digital = require('./digital');

class Di16 extends I2cHat {
  constructor(address) {
    super(address);
    this.digitalInputs = new digital.Inputs(this);
    this.DI = this.digitalInputs;
  }
}

class Rly10 extends I2cHat {
  constructor(address) {
    super(address);
    this.digitalOutputs = new digital.Outputs(this);
    this.DQ = this.digitalOutputs;
  }
}

class Di6Rly6 extends I2cHat {
  constructor(address) {
    super(address);
    this.digitalInputs = new digital.Inputs(this);
    this.DI = this.digitalInputs;
    this.digitalOutputs = new digital.Outputs(this);
    this.DQ = this.digitalOutputs;
  }
}

class DI16ac extends I2cHat {
  constructor(address) {
    super(address);
    this.digitalInputs = new digital.Inputs(this);
    this.DI = this.digitalInputs;
  }
}

class DQ10rly extends I2cHat {
  constructor(address) {
    super(address);
    this.digitalOutputs = new digital.Outputs(this);
    this.DQ = this.digitalOutputs;
  }
}

class DQ16oc extends I2cHat {
  constructor(address) {
    super(address);
    this.digitalOutputs = new digital.Outputs(this);
    this.DQ = this.digitalOutputs;
  }
}

class DI6acDQ6rly extends I2cHat {
  constructor(address) {
    super(address);
    this.digitalInputs = new digital.Inputs(this);
    this.DI = this.digitalInputs;
    this.digitalOutputs = new digital.Outputs(this);
    this.DQ = this.digitalOutputs;
  }
}


exports.Di16 = Di16;
exports.Rly10 = Rly10;
exports.Di6Rly6 = Di6Rly6;
exports.DI16ac = DI16ac;
exports.DQ10rly = DQ10rly;
exports.DQ16oc = DQ16oc;
exports.DI6acDQ6rly = DI6acDQ6rly;