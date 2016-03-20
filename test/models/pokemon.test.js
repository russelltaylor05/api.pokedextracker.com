'use strict';

const Pokemon = require('../../src/models/pokemon');

const pokemon = Factory.build('pokemon');

describe('pokemon model', () => {

  describe('virtuals', () => {

    describe('bulbapedia_url', () => {

      it('URL-encodes the name in the Bulbapedia link', () => {
        expect(Pokemon.forge({ name: 'Pokémon' }).get('bulbapedia_url')).to.eql('http://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_(Pok%C3%A9mon)');
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
      expect(Pokemon.forge(pokemon).serialize()).to.have.all.keys([
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
        'as_locations'
      ]);
    });

  });

});
