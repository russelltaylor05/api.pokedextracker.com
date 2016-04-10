'use strict';

const Capture = require('../../src/models/capture');
const Pokemon = require('../../src/models/pokemon');

const pokemon = Factory.build('pokemon');

const capture = Factory.build('capture', { pokemon_id: pokemon.national_id });

describe('capture model', () => {

  describe('serialize', () => {

    it('returns the correct fields', () => {
      const model = Capture.forge(capture);
      model.relations.pokemon = Pokemon.forge(pokemon);

      return model.serialize()
      .then((json) => {
        expect(json).to.have.all.keys([
          'pokemon',
          'user_id',
          'captured'
        ]);
        expect(json.pokemon).to.have.all.keys([
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
      });
    });

  });

});
