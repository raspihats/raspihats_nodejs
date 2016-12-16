var I2cHat = require('./base').I2cHat;
var digital = require('./digital');

class Rly10 extends I2cHat {
  constructor(address) {
    super(address);
    this.digitalOutputs = new digital.Outputs(this);
  }
}


exports.Rly10 = Rly10;