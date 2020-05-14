# raspihats

Node.js package for interfacing Raspberry Pi add-on boards located at [raspihats.com](http://raspihats.com/)

## Installation
  ```sh
  $ npm install raspihats --save
  ```
  
### I2C clock stretch timeout
  It's important for the I2C clock stretch timeout to have the right value before issuing requests to a I2C-HAT, cd to 'node_modules/raspihats' and run the following command to set the right clock stretch timeout:
  
  ```sh
  $ sudo npm run i2c_clks_timeout
  ```

## I2C-HAT usage example

```javascript
var raspihats = require('raspihats');
var DI6acDQ6rly = raspihats.i2cHats.DI6acDQ6rly;

var b = new DI6acDQ6rly(0x60);

// All the following methods will issue a request and get a response from the board over the I2C bus.
b.getName();                // reads board name
b.getFirmwareVersion();     // reads firmware version
//b.reset();                  // resets the board, wait at least 1ms after reset before issuing another request
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

* **1.0.0** Initial release

  Supported functionality:
  * Basic(read board name, read firmware version, read status word, reset)
  * Communication WatchDog(read/write period)
  * Digital Inputs(read value, read channel, read channel counter, reset channel counter)
  * Digital Outputs(read/write value, read/write channel, read/write PowerOnValue, read/write SafetyValue)
  
  Supported boards:
  * [Di16 I2C-HAT](http://raspihats.com/product/di16/)
  * [Rly10 I2C-HAT](http://raspihats.com/product/rly10/)
  * [Di6Rly6 I2C-HAT](http://raspihats.com/product/di6rly6/)
  * [DI16ac I2C-HAT](http://raspihats.com/product/di16ac/)
  * [DQ10rly I2C-HAT](http://raspihats.com/product/dq10rly/)
  * [DQ16oc I2C-HAT](http://raspihats.com/product/dq16oc/)
  * [DI6acDQ6rly I2C-HAT](http://raspihats.com/product/di6acdq6rly/)

* **1.1.0** Added DQ8rly
  
  Added boards:
  * [DQ8rly I2C-HAT](http://raspihats.com/product/dq8rly/)

* **1.1.1** Small fix
  
  Modified exception message thrown if an unexpected board is found at the desired address.

* **1.1.2** Updated i2c-bus dependency version and small fix
  
  Now using i2c-bus@5.2.0, and using Buffer.alloc instead of new Buffer.

## License

MIT
