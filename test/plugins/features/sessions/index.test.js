'use strict';

const Config = require('../../../../config');
const Knex   = require('../../../../src/libraries/knex');
const Server = require('../../../../src/server');

const user = Factory.build('user', { password: Config.PASSWORD_HASH });

describe('session integration', () => {

  describe('create', () => {

    beforeEach(() => {
      return Knex('users').insert(user);
    });

    it('creates a token', () => {
      return Server.injectThen({
        method: 'POST',
        url: '/sessions',
        payload: {
          username: user.username,
          password: Config.PASSWORD_VALUE
        }
      })
      .then((res) => {
        expect(res.statusCode).to.eql(200);
      });
    });

  });

});
