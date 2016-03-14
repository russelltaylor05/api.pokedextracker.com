'use strict';

const Knex   = require('../../../../src/libraries/knex');
const Server = require('../../../../src/server');

const firstPokemon  = Factory.build('pokemon');
const secondPokemon = Factory.build('pokemon');

describe('pokemon integration', () => {

  describe('list', () => {

    beforeEach(() => {
      return Knex('pokemon').insert([firstPokemon, secondPokemon]);
    });

    it('returns a collection of pokemon', () => {
      return Server.injectThen({
        method: 'GET',
        url: '/pokemon'
      })
      .then((res) => {
        expect(res.statusCode).to.eql(200);
      });
    });

  });

  describe('retrieve', () => {

    beforeEach(() => {
      return Knex('pokemon').insert(firstPokemon);
    });

    it('returns an individual pokemon from its national ID', () => {
      return Server.injectThen({
        method: 'GET',
        url: `/pokemon/${firstPokemon.national_id}`
      })
      .then((res) => {
        expect(res.statusCode).to.eql(200);
      });
    });

    it('only allows numeric IDs', () => {
      return Server.injectThen({
        method: 'GET',
        url: '/pokemon/string'
      })
      .then((res) => {
        expect(res.statusCode).to.eql(422);
      });
    });

  });

});
