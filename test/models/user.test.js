'use strict';

const User = require('../../src/models/user');

const user = Factory.build('user');

describe('user model', () => {

  describe('serialize', () => {

    it('returns the correct fields', () => {
      expect(User.forge(user).serialize()).to.have.all.keys([
        'id',
        'username',
        'friend_code',
        'date_created',
        'date_modified'
      ]);
    });

  });

});
