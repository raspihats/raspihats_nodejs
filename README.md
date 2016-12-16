# Raspihats

Node.js package for interfacing Raspberry Pi add-on boards located at [raspihats.com](http://raspihats.com/)

## Installation

  npm install raspihats --save

## I2C-HAT usage example

```javascript
var raspihats = require('raspihats');
var DI6acDQ6rly = raspihats.i2cHats.DI6acDQ6rly;

var b = new DI6acDQ6rly(0x60);

// All the following methods will issue a request and get a response from the board over the I2C bus.
b.getName();                // reads board name
b.getFirmwareVersion();     // reads firmware version
b.reset();                  // resets the board, wait at least 1ms after reset before issuing another request
b.getStatus();              // reads status word, bits [0: power on reset, 1: software reset, 2: watchdog reset]

// Digital Inputs
b.DI.getValue();            // read all digital input channels
b.DI.getChannel(0);         // read single digital input channel

// Digital Outputs
b.DQ.setValue(0x02);        // write all digital output channels
b.DQ.setChannel(0, true);   // write single digital output channel

b.DQ.getValue();            // read all digital output channels
b.DQ.getChannel(0);         // read single digital output channel
```

## Release History

* 0.1.0 Initial release
