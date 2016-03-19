'use strict';

const Config     = require('../../../../config');
const Controller = require('../../../../src/plugins/features/sessions/controller');
const Errors     = require('../../../../src/libraries/errors');
const Knex       = require('../../../../src/libraries/knex');

const user = Factory.build('user', { password: Config.PASSWORD_HASH });

describe('session controller', () => {

  describe('create', () => {

    beforeEach(() => {
      return Knex('users').insert(user);
    });

    it('signs a token if the password is valid', () => {
      return Controller.create({ username: user.username, password: Config.PASSWORD_VALUE })
      .then((session) => {
        expect(session.token).to.be.a('string');
      });
    });

    it('rejects if the user is not found', () => {
      return Controller.create({ username: 'bad_username', password: Config.PASSWORD_VALUE })
      .catch((err) => err)
      .then((err) => {
        expect(err).to.be.an.instanceof(Errors.NotFound);
      });
    });

    it('rejects if the password is incorrect', () => {
      return Controller.create({ username: user.username, password: 'test' })
      .catch((err) => err)
      .then((err) => {
        expect(err).to.be.an.instanceof(Errors.InvalidPassword);
      });
    });

  });

});
