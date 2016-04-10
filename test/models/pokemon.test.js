'use strict';

const Knex    = require('../../src/libraries/knex');
const Pokemon = require('../../src/models/pokemon');

const pokemon      = Factory.build('pokemon');
const otherPokemon = Factory.build('pokemon');

const evolution      = Factory.build('evolution', { evolving_pokemon_id: pokemon.national_id, evolved_pokemon_id: pokemon.national_id, evolution_family_id: pokemon.evolution_family_id });
const otherEvolution = Factory.build('evolution', { evolving_pokemon_id: otherPokemon.national_id, evolved_pokemon_id: otherPokemon.national_id, evolution_family_id: otherPokemon.evolution_family_id });

describe('pokemon model', () => {

  beforeEach(() => {
    return Knex('pokemon').insert([pokemon, otherPokemon])
    .then(() => {
      return Knex('evolutions').insert([evolution, otherEvolution]);
    });
  });

  describe('evolutions', () => {

    it('only gets the models with the associated evolution_family_id', () => {
      return Pokemon.forge(pokemon).evolutions()
      .then((evolutions) => {
        expect(evolutions).to.have.length(1);
        expect(evolutions[0].get('evolution_family_id')).to.eql(pokemon.evolution_family_id);
      });
    });

  });

  describe('virtuals', () => {

    describe('bulbapedia_url', () => {

      it('URL-encodes the name in the Bulbapedia link', () => {
        expect(Pokemon.forge({ name: 'Pokémon' }).get('bulbapedia_url')).to.eql('http://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_(Pok%C3%A9mon)');
      });

    });

    describe('summary', () => {

      it('only includes the national_id, name, and icon_url of the pokemon', () => {
        expect(Pokemon.forge().get('summary')).to.have.all.keys([
          'national_id',
          'name',
          'icon_url'
        ]);
      });

    });

    describe('types', () => {

      it('returns an array of types', () => {
        expect(Pokemon.forge({ type1: 'fire', type2: 'water' }).get('types')).to.eql(['fire', 'water']);
      });

      it('doesn\'t include the second type if it does exist', () => {
        expect(Pokemon.forge({ type1: 'fire' }).get('types')).to.eql(['fire']);
      });

    });

    describe('x_locations', () => {

      it('splits by commas', () => {
        expect(Pokemon.forge({ x_location: 'Route 1, Route 2' }).get('x_locations')).to.eql(['Route 1', 'Route 2']);
      });

    });

    describe('y_locations', () => {

      it('splits by commas', () => {
        expect(Pokemon.forge({ y_location: 'Route 1, Route 2' }).get('y_locations')).to.eql(['Route 1', 'Route 2']);
      });

    });

    describe('or_locations', () => {

      it('splits by commas', () => {
        expect(Pokemon.forge({ or_location: 'Route 1, Route 2' }).get('or_locations')).to.eql(['Route 1', 'Route 2']);
      });

    });

    describe('as_locations', () => {

      it('splits by commas', () => {
        expect(Pokemon.forge({ as_location: 'Route 1, Route 2' }).get('as_locations')).to.eql(['Route 1', 'Route 2']);
      });

    });

  });

  describe('serialize', () => {

    it('returns the correct fields', () => {
      return Pokemon.forge(pokemon).serialize()
      .then((json) => {
        expect(json).to.have.all.keys([
          'national_id',
          'name',
          'kanto_id',
          'johto_id',
          'hoenn_id',
          'sinnoh_id',
          'unova_id',
          'central_kalos_id',
          'coastal_kalos_id',
          'mountain_kalos_id',
          'regionless',
          'icon_url',
          'bulbapedia_url',
          'x_locations',
          'y_locations',
          'or_locations',
          'as_locations',
          'evolutions'
        ]);
        expect(json.evolutions).to.have.length(1);
        expect(json.evolutions[0]).to.have.length(1);
        expect(json.evolutions[0][0]).to.have.all.keys([
          'evolving_pokemon',
          'evolved_pokemon',
          'stage',
          'trigger',
          'level',
          'stone',
          'held_item',
          'notes'
        ]);
      });
    });

  });

});
