'use strict';

exports.up = function (knex, Promise) {
  return knex.schema.table('pokemon', (table) => {
    table.integer('evolution_family_id').index();
  })
  .then(() => {
    return knex.schema.createTable('evolutions', (table) => {
      table.primary(['evolving_pokemon_id', 'evolved_pokemon_id']);
      table.integer('evolving_pokemon_id').references('national_id').inTable('pokemon');
      table.integer('evolved_pokemon_id').references('national_id').inTable('pokemon');
      table.integer('evolution_family_id').notNullable().index();
      table.integer('stage').notNullable();
      table.enum('trigger', ['breed', 'level', 'stone', 'trade']).notNullable();
      table.integer('level');
      table.enum('stone', ['fire', 'water', 'thunder', 'leaf', 'moon', 'sun', 'shiny', 'dusk', 'dawn']);
      table.string('held_item');
      table.text('notes');
      table.timestamp('date_created').notNullable().defaultTo(knex.fn.now());
      table.timestamp('date_modified').notNullable().defaultTo(knex.fn.now());
    });
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('evolutions')
  .then(() => {
    return knex.schema.table('pokemon', (table) => {
      table.dropColumn('evolution_family_id');
    });
  });
};
