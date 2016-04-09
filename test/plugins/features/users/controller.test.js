'use strict';

const Controller = require('../../../../src/plugins/features/users/controller');
const Errors     = require('../../../../src/libraries/errors');
const Knex       = require('../../../../src/libraries/knex');

const firstUser  = Factory.build('user');
const secondUser = Factory.build('user');

describe('user controller', () => {

  describe('list', () => {

    beforeEach(() => {
      return Knex('users').insert([firstUser, secondUser]);
    });

    it('returns a collection of users', () => {
      return Controller.list()
      .get('models')
      .map((user) => user.id)
      .then((users) => {
        expect(users).to.have.length(2);
        expect(users).to.contain(firstUser.id);
        expect(users).to.contain(secondUser.id);
      });
    });

  });

  describe('retrieve', () => {

    beforeEach(() => {
      return Knex('users').insert(firstUser);
    });

    it('returns an individual user from its username', () => {
      return Controller.retrieve(firstUser.username)
      .then((user) => {
        expect(user.id).to.eql(firstUser.id);
      });
    });

    it('rejects if the username does not exist', () => {
      return Controller.retrieve('bad_username')
      .catch((err) => err)
      .then((err) => {
        expect(err).to.be.an.instanceof(Errors.NotFound);
      });
    });

  });

  describe('create', () => {

    it('saves a user with a hashed password', () => {
      return Controller.create({ username: 'test', password: 'test' })
      .then((session) => {
        expect(session.token).to.be.a('string');
      });
    });

    it('rejects if the username is already taken', () => {
      return Knex('users').insert(firstUser)
      .then(() => {
        return Controller.create({ username: firstUser.username, password: 'test' });
      })
      .catch((err) => err)
      .then((err) => {
        expect(err).to.be.an.instanceof(Errors.ExistingUsername);
      });
    });

  });

});
