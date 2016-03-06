'use strict';

const Knex = require('../src/libraries/knex');

beforeEach(() => {
  return Knex.raw('TRUNCATE users CASCADE');
});
