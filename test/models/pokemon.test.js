'use strict';

const Pokemon = require('../../src/models/pokemon');

const pokemon        = Factory.build('pokemon');
const twoTypePokemon = Factory.build('pokemon', { type2: 'water' });

describe('pokemon model', () => {

  describe('virtuals', () => {

    describe('types', () => {

      it('returns an array of types', () => {
        expect(Pokemon.forge(twoTypePokemon).get('types')).to.eql([twoTypePokemon.type1, twoTypePokemon.type2]);
      });

      it('doesn\'t include the second type if it does exist', () => {
        expect(Pokemon.forge(pokemon).get('types')).to.eql([pokemon.type1]);
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
        'types',
        'icon_url',
        'avatar_url',
        'x_location',
        'y_location',
        'or_location',
        'as_location'
      ]);
    });

  });

});
