'use strict';

const Knex   = require('../../../../src/libraries/knex');
const Server = require('../../../../src/server');
const User   = require('../../../../src/models/user');

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

    it('saves an X-Forwarded-For IP address if present', () => {
      const ip = '123.123.123.123';
      const username = 'test';

      return Server.injectThen({
        method: 'POST',
        url: '/users',
        headers: { 'X-Forwarded-For': ip },
        payload: {
          username,
          password: 'testtest'
        }
      })
      .then(() => new User().where('username', username).fetch())
      .then((user) => {
        expect(user.get('last_ip')).to.eql(ip);
      });
    });

    it('saves the first X-Forwarded-For IP address if multiple are present', () => {
      const ips = ['123.123.123.123', '124.124.124.124'];
      const username = 'test';

      return Server.injectThen({
        method: 'POST',
        url: '/users',
        headers: { 'X-Forwarded-For': ips.join(',') },
        payload: {
          username,
          password: 'testtest'
        }
      })
      .then(() => new User().where('username', username).fetch())
      .then((user) => {
        expect(user.get('last_ip')).to.eql(ips[0]);
      });
    });

  });

});
