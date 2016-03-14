'use strict';

const TYPES = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy'
];

exports.up = function (knex, Promise) {
  return knex.schema.createTable('pokemon', (table) => {
    table.integer('national_id').primary().index();
    table.string('name').notNullable();
    table.integer('kanto_id');
    table.integer('johto_id');
    table.integer('hoenn_id');
    table.integer('sinnoh_id');
    table.integer('unova_id');
    table.integer('central_kalos_id');
    table.integer('coastal_kalos_id');
    table.integer('mountain_kalos_id');
    table.boolean('regionless').notNullable().defaultTo(false);
    table.enum('type1', TYPES).notNullable();
    table.enum('type2', TYPES);
    table.string('icon_url').notNullable();
    table.string('avatar_url').notNullable();
    table.text('x_location').notNullable();
    table.text('y_location').notNullable();
    table.text('or_location').notNullable();
    table.text('as_location').notNullable();
    table.timestamp('date_created').notNullable().defaultTo(knex.fn.now());
    table.timestamp('date_modified').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('pokemon');
};
