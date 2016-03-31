'use strict';

const Util = require('util');

const Config = require('../config');
const API    = require('./server');

require('newrelic');

API.start(() => Util.log(`Server started on port: ${Config.PORT}`));
