'use strict';

const Bluebird = require('bluebird');

const Knex = require('../src/libraries/knex');

beforeEach(() => {
  return Bluebird.all([
    Knex.raw('TRUNCATE captures CASCADE'),
    Knex.raw('TRUNCATE evolutions CASCADE'),
    Knex.raw('TRUNCATE pokemon CASCADE'),
    Knex.raw('TRUNCATE users CASCADE')
  ]);
});
