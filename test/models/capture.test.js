'use strict';

const Capture = require('../../src/models/capture');

const capture = Factory.build('capture');

describe('capture model', () => {

  describe('serialize', () => {

    it('returns the correct fields', () => {
      expect(Capture.forge(capture).serialize()).to.have.all.keys([
        'pokemon_id',
        'user_id',
        'captured'
      ]);
    });

  });

});
