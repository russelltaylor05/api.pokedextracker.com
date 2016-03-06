'use strict';

const Knex   = require('../../../../src/libraries/knex');
const Server = require('../../../../src/server');

const firstUser  = Factory.build('user');
const secondUser = Factory.build('user');

describe('user integration', () => {

  describe('list', () => {

    beforeEach(() => {
      return Knex('users').insert([firstUser, secondUser]);
    });

    it('returns a collection of users', () => {
      return Server.injectThen({
        method: 'GET',
        url: '/users'
      })
      .then((res) => {
        expect(res.statusCode).to.eql(200);
      });
    });

  });

  describe('retrieve', () => {

    beforeEach(() => {
      return Knex('users').insert(firstUser);
    });

    it('returns an individual user from its username', () => {
      return Server.injectThen({
        method: 'GET',
        url: `/users/${firstUser.username}`
      })
      .then((res) => {
        expect(res.statusCode).to.eql(200);
      });
    });

  });

  describe('create', () => {

    it('saves a user', () => {
      return Server.injectThen({
        method: 'POST',
        url: '/users',
        payload: {
          username: 'test',
          password: 'testtest'
        }
      })
      .then((res) => {
        expect(res.statusCode).to.eql(200);
      });
    });

  });

});
