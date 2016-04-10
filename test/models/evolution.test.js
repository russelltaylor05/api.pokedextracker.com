'use strict';

const Evolution = require('../../src/models/evolution');
const Pokemon   = require('../../src/models/pokemon');

describe('evolution model', () => {

  describe('serialize', () => {

    it('returns the correct fields', () => {
      const model = Evolution.forge();
      model.relations.evolving_pokemon = Pokemon.forge();
      model.relations.evolved_pokemon = Pokemon.forge();
      const json = model.serialize();

      expect(json).to.have.all.keys([
        'evolving_pokemon',
        'evolved_pokemon',
        'stage',
        'trigger',
        'level',
        'stone',
        'held_item',
        'notes'
      ]);
      expect(json.evolving_pokemon).to.have.all.keys([
        'national_id',
        'name',
        'icon_url'
      ]);
      expect(json.evolved_pokemon).to.have.all.keys([
        'national_id',
        'name',
        'icon_url'
      ]);
    });

  });

});
