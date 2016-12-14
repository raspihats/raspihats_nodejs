# Raspihats

Node.js package for interfacing Raspberry Pi add-on boards located at [raspihats.com]http://raspihats.com/

## Installation

  npm install raspihats --save

## Usage

  var raspihats = require('raspihats');
  var DQ10rly = raspihats.i2cHats.DQ10rly;
  
  var b = DQ10rly(0x50);

  b.dq.value = 0x3FF;       // set all digital output channels
  b.dq.channel[0] = true;   // set single digital output channel

## Tests

  npm test

## Release History

* 0.1.0 Initial release
