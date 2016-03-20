'use strict';

exports.up = function (knex, Promise) {
  return knex.raw('ALTER TABLE users ALTER COLUMN username TYPE VARCHAR(20)');
};

exports.down = function (knex, Promise) {
  return knex.raw('ALTER TABLE users ALTER COLUMN username TYPE VARCHAR(255)');
};
