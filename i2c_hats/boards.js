var base = require('./base');
var I2cHat = base.I2cHat;
var Cwdt = base.Cwdt;
var digital = require('./digital');

class Di16 extends I2cHat {
  constructor(address) {
    super(address, "Di16 I2C-HAT");
    this.cwdt = new Cwdt(this);
    this.digitalInputs = new digital.Inputs(this, ["Di1.1", "Di1.2", "Di1.3", "Di1.4", "Di2.1", "Di2.2", "Di2.3", "Di2.4", "Di3.1", "Di3.2", "Di3.3", "Di3.4", "Di4.1", "Di4.2", "Di4.3", "Di4.4"]);
    this.DI = this.digitalInputs;
  }
}

class Rly10 extends I2cHat {
  constructor(address) {
    super(address, "Rly10 I2C-HAT");
    this.cwdt = new Cwdt(this);
    this.digitalOutputs = new digital.Outputs(this, ["Rly1", "Rly2", "Rly3", "Rly4", "Rly5", "Rly6", "Rly7", "Rly8", "Rly9", "Rly10"]);
    this.DQ = this.digitalOutputs;
  }
}

class Di6Rly6 extends I2cHat {
  constructor(address) {
    super(address, "Di6Rly6 I2C-HAT");
    this.cwdt = new Cwdt(this);
    this.digitalInputs = new digital.Inputs(this, ["Di1", "Di2", "Di3", "Di4", "Di5", "Di6"]);
    this.DI = this.digitalInputs;
    this.digitalOutputs = new digital.Outputs(this, ["Rly1", "Rly2", "Rly3", "Rly4", "Rly5", "Rly6"]);
    this.DQ = this.digitalOutputs;
  }
}

class DI16ac extends I2cHat {
  constructor(address) {
    super(address, "DI16ac I2C-HAT");
    this.cwdt = new Cwdt(this);
    this.digitalInputs = new digital.Inputs(this, ["I0", "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9", "I10", "I11", "I12", "I13", "I14", "I15"]);
    this.DI = this.digitalInputs;
  }
}

class DQ8rly extends I2cHat {
  constructor(address) {
    super(address, "DQ8rly I2C-HAT");
    this.cwdt = new Cwdt(this);
    this.digitalOutputs = new digital.Outputs(this, ["Q0", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7"]);
    this.DQ = this.digitalOutputs;
  }
}

class DQ10rly extends I2cHat {
  constructor(address) {
    super(address, "DQ10rly I2C-HAT");
    this.cwdt = new Cwdt(this);
    this.digitalOutputs = new digital.Outputs(this, ["Q0", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9"]);
    this.DQ = this.digitalOutputs;
  }
}

class DQ16oc extends I2cHat {
  constructor(address) {
    super(address, "DQ16oc I2C-HAT");
    this.cwdt = new Cwdt(this);
    this.digitalOutputs = new digital.Outputs(this, ["Q0", "Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12", "Q13", "Q14", "Q15"]);
    this.DQ = this.digitalOutputs;
  }
}

class DI6acDQ6rly extends I2cHat {
  constructor(address) {
    super(address, "DI6acDQ6rly I2C-HAT");
    this.cwdt = new Cwdt(this);
    this.digitalInputs = new digital.Inputs(this, ["I0", "I1", "I2", "I3", "I4", "I5"]);
    this.DI = this.digitalInputs;
    this.digitalOutputs = new digital.Outputs(this, ["Q0", "Q1", "Q2", "Q3", "Q4", "Q5"]);
    this.DQ = this.digitalOutputs;
  }
}


exports.Di16 = Di16;
exports.Rly10 = Rly10;
exports.Di6Rly6 = Di6Rly6;
exports.DI16ac = DI16ac;
exports.DQ8rly = DQ8rly;
exports.DQ10rly = DQ10rly;
exports.DQ16oc = DQ16oc;
exports.DI6acDQ6rly = DI6acDQ6rly;