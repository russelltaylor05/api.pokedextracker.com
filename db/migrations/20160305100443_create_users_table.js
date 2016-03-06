'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').index();
    table.string('username').notNullable().unique().index();
    table.string('password', 60).notNullable();
    table.string('friend_code', 14);
    table.timestamp('date_created').notNullable().defaultTo(knex.fn.now());
    table.timestamp('date_modified').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
