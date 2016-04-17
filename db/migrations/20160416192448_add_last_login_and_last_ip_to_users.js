'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.string('last_ip', 45);
    table.timestamp('last_login').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('last_ip');
    table.dropColumn('last_login');
  });
};
