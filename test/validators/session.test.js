'use strict';

const Joi = require('joi');

const SessionValidator = require('../../src/validators/session');

describe('session validator', () => {

  describe('username', () => {

    it('allows alpha-numeric and underscore characters', () => {
      const data = { username: 'test_TEST', password: 'testtest' };
      const result = Joi.validate(data, SessionValidator);

      expect(result.error).to.be.null;
    });

    it('disallows anything besides alpha-numeric and underscore characters', () => {
      const data = { username: 'test-TEST', password: 'testtest' };
      const result = Joi.validate(data, SessionValidator);

      expect(result.error).to.match(/"username" must only contain alpha-numeric and underscore characters/);
    });

    it('converts to lowercase', () => {
      const username = 'TESTING';
      const data = { username, password: 'testtest' };
      const result = Joi.validate(data, SessionValidator);

      expect(result.value.username).to.eql(username.toLowerCase());
    });

    it('trims whitespace', () => {
      const username = '  testing ';
      const data = { username, password: 'testtest' };
      const result = Joi.validate(data, SessionValidator);

      expect(result.value.username).to.eql(username.trim());
    });

  });

  describe('password', () => {

    it('requires a string', () => {
      const data = { username: 'testing' };
      const result = Joi.validate(data, SessionValidator);

      expect(result.error).to.match(/"password" is required/);
    });

  });

});
