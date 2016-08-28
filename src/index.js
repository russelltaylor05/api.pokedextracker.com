'use strict';

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
  require('newrelic');
}

const Util = require('util');

const Config = require('../config');
const API    = require('./server');

API.start()
.then(() => Util.log(`Server started on port: ${Config.PORT}`));
