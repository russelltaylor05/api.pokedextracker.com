'use strict';

const Sinon = require('sinon');

const Controller = require('../../../../src/plugins/features/users/controller');
const Errors     = require('../../../../src/libraries/errors');
const Knex       = require('../../../../src/libraries/knex');
const User       = require('../../../../src/models/user');

const firstUser  = Factory.build('user');
const secondUser = Factory.build('user');

describe('user controller', () => {

  describe('list', () => {

    beforeEach(() => {
      return Knex('users').insert([firstUser, secondUser]);
    });

    it('returns a collection of users ordered by id descending', () => {
      return Controller.list()
      .get('models')
      .map((user) => user.id)
      .then((users) => {
        expect(users).to.have.length(2);
        expect(users[0]).to.eql(secondUser.id);
        expect(users[1]).to.eql(firstUser.id);
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

    const request = { headers: {}, info: {} };

    it('saves a user with a hashed password', () => {
      return Controller.create({ username: 'test', password: 'test' }, request)
      .then((session) => {
        expect(session.token).to.be.a('string');
      });
    });

    it('saves last login date', () => {
      const username = 'test';

      return Controller.create({ username, password: 'test' }, request)
      .then(() => new User().where('username', username).fetch())
      .then((user) => {
        expect(user.get('last_login')).to.be.an.instanceof(Date);
      });
    });

    it('saves referrer', () => {
      const username = 'test';
      const referrer = 'http://test.com';

      return Controller.create({ username, password: 'test', referrer }, request)
      .then(() => new User().where('username', username).fetch())
      .then((user) => {
        expect(user.get('referrer')).to.eql(referrer);
      });
    });

    it('rejects if the username is already taken', () => {
      return Knex('users').insert(firstUser)
      .then(() => {
        return Controller.create({ username: firstUser.username, password: 'test' }, request);
      })
      .catch((err) => err)
      .then((err) => {
        expect(err).to.be.an.instanceof(Errors.ExistingUsername);
      });
    });

    it('rejects if the username is taken after the fetch', () => {
      Sinon.stub(User.prototype, 'save').throws(new Error('duplicate key value'));

      return Controller.create({ username: firstUser.username, password: 'test' }, request)
      .catch((err) => err)
      .then((err) => {
        expect(err).to.be.an.instanceof(Errors.ExistingUsername);
      })
      .finally(() => {
        User.prototype.save.restore();
      });
    });

  });

  describe('update', () => {

    beforeEach(() => {
      return Knex('users').insert([firstUser, secondUser]);
    });

    it('updates a user', () => {
      const friendCode = '4321-4321-4321';

      return Controller.update(firstUser.username, { friend_code: friendCode }, { id: firstUser.id })
      .then(() => new User({ id: firstUser.id }).fetch())
      .then((user) => {
        expect(user.get('friend_code')).to.eql(friendCode);
      });
    });

    it('returns a new session', () => {
      const friendCode = '4321-4321-4321';

      return Controller.update(firstUser.username, { friend_code: friendCode }, { id: firstUser.id })
      .then((session) => {
        expect(session.token).to.be.a('string');
      });
    });

    it('rejects if the username and auth id do not match', () => {
      return Controller.update(firstUser.username, {}, { id: secondUser.id })
      .catch((err) => err)
      .then((err) => {
        expect(err).to.be.an.instanceof(Errors.ForbiddenAction);
      });
    });

  });

});
