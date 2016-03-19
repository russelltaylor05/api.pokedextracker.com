'use strict';

const JWT  = require('../../src/libraries/jwt');
const User = require('../../src/models/user');

describe('jwt library', () => {

  describe('sign', () => {

    it('signs the user model and resolves with the jwt wrapped in an object', () => {
      const user = User.forge({ id: 1 });

      return JWT.sign(user)
      .then((session) => {
        expect(session.token).to.match(/^.*\..*\..*$/);
      });
    });

  });

});
