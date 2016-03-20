'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.createTable('captures', (table) => {
    table.primary(['user_id', 'pokemon_id']);
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE').index();
    table.integer('pokemon_id').references('national_id').inTable('pokemon').onDelete('CASCADE');
    table.boolean('captured').notNullable();
    table.timestamp('date_created').notNullable().defaultTo(knex.fn.now());
    table.timestamp('date_modified').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('captures');
};
