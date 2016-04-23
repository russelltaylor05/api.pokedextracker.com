'use strict';

const Joi = require('joi');

const UserUpdateValidator = require('../../../src/validators/user/update');

describe('user update validator', () => {

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
