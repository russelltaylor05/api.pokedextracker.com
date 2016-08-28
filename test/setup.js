'use strict';

const Bluebird = require('bluebird');
const Chai     = require('chai');
const Rosie    = require('rosie');

Bluebird.config({ longStackTraces: true });

global.expect = Chai.expect;
global.Factory = Rosie.Factory;
