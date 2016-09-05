'use strict';

const Joi = require('joi');

const UserUpdateValidator = require('../../../src/validators/user/update');

describe('user update validator', () => {

  it('has no required params', () => {
    const data = {};
    const result = Joi.validate(data, UserUpdateValidator);

    expect(result.error).to.not.exist;
  });

  describe('password', () => {

    it('requires at least 8 characters', () => {
      const data = { password: 'a'.repeat(7) };
      const result = Joi.validate(data, UserUpdateValidator);

      expect(result.error).to.match(/"password" length must be at least 8 characters long/);
    });

    it('limits to 72 characters', () => {
      const data = { password: 'a'.repeat(73) };
      const result = Joi.validate(data, UserUpdateValidator);

      expect(result.error).to.match(/"password" length must be less than or equal to 72 characters long/);
    });

  });

  describe('friend_code', () => {

    it('allows codes in the format of 1234-1234-1234', () => {
      const data = { friend_code: '1234-1234-1234' };
      const result = Joi.validate(data, UserUpdateValidator);

      expect(result.error).to.be.null;
    });

    it('disallows codes not in the format of 1234-1234-1234', () => {
      const data = { friend_code: '234-1234-1234' };
      const result = Joi.validate(data, UserUpdateValidator);

      expect(result.error).to.match(/"friend_code" must be a 12-digit number/);
    });

  });

});
