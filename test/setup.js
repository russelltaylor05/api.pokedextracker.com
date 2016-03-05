'use strict';

const Chai  = require('chai');
const Rosie = require('rosie');

const API = require('../src/server');

API.register([
  require('inject-then')
], (err) => {
  if (err) {
    throw err;
  }
});

global.expect = Chai.expect;
global.Factory = Rosie.Factory;
