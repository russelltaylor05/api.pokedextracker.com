'use strict';

const Controller = require('../../../../src/plugins/features/pokemon/controller');
const Errors     = require('../../../../src/libraries/errors');
const Knex       = require('../../../../src/libraries/knex');

const firstPokemon  = Factory.build('pokemon');
const secondPokemon = Factory.build('pokemon');

describe('pokemon controller', () => {

  describe('list', () => {

    beforeEach(() => {
      return Knex('pokemon').insert([firstPokemon, secondPokemon]);
    });

    it('returns a collection of pokemon', () => {
      return Controller.list()
      .get('models')
      .map((pokemon) => pokemon.id)
      .then((pokemon) => {
        expect(pokemon).to.have.length(2);
        expect(pokemon).to.contain(firstPokemon.national_id);
        expect(pokemon).to.contain(secondPokemon.national_id);
      });
    });

  });

  describe('retrieve', () => {

    beforeEach(() => {
      return Knex('pokemon').insert(firstPokemon);
    });

    it('returns an individual pokemon from its national ID', () => {
      return Controller.retrieve(firstPokemon.national_id)
      .then((pokemon) => {
        expect(pokemon.get('national_id')).to.eql(firstPokemon.national_id);
      });
    });

    it('rejects if the id does not exist', () => {
      return Controller.retrieve(0)
      .catch((err) => err)
      .then((err) => {
        expect(err).to.be.an.instanceof(Errors.NotFound);
      });
    });

  });

});
