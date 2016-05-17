'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.text('referrer');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('referrer');
  });
};
