'use strict';

const Joi = require('joi');

const UserCreateValidator = require('../../../src/validators/user/create');

describe('user create validator', () => {

  describe('username', () => {

    it('allows alpha-numeric and underscore characters', () => {
      const data = { username: 'test_TEST', password: 'testtest' };
      const result = Joi.validate(data, UserCreateValidator);

      expect(result.error).to.be.null;
    });

    it('disallows anything besides alpha-numeric and underscore characters', () => {
      const data = { username: 'test-TEST', password: 'testtest' };
      const result = Joi.validate(data, UserCreateValidator);

      expect(result.error).to.match(/"username" must only contain alpha-numeric and underscore characters/);
    });

    it('limits to 20 characters', () => {
      const data = { username: 'a'.repeat(21), password: 'testtest' };
      const result = Joi.validate(data, UserCreateValidator);

      expect(result.error).to.match(/"username" length must be less than or equal to 20 characters long/);
    });

    it('trims whitespace', () => {
      const username = '  testing ';
      const data = { username, password: 'testtest' };
      const result = Joi.validate(data, UserCreateValidator);

      expect(result.value.username).to.eql(username.trim());
    });

  });

  describe('password', () => {

    it('requires at least 8 characters', () => {
      const data = { username: 'testing', password: 'a'.repeat(7) };
      const result = Joi.validate(data, UserCreateValidator);

      expect(result.error).to.match(/"password" length must be at least 8 characters long/);
    });

    it('limits to 72 characters', () => {
      const data = { username: 'testing', password: 'a'.repeat(73) };
      const result = Joi.validate(data, UserCreateValidator);

      expect(result.error).to.match(/"password" length must be less than or equal to 72 characters long/);
    });

  });

  describe('friend_code', () => {

    it('allows null', () => {
      const data = { username: 'testing', password: 'testtest', friend_code: null };
      const result = Joi.validate(data, UserCreateValidator);

      expect(result.error).to.not.exist;
      expect(result.value.friend_code).to.not.exist;
    });

    it('converts the empty string to null', () => {
      const data = { username: 'testing', password: 'testtest', friend_code: '' };
      const result = Joi.validate(data, UserCreateValidator);

      expect(result.error).to.not.exist;
      expect(result.value.friend_code).to.not.exist;
    });

    it('allows codes in the format of 1234-1234-1234', () => {
      const data = { username: 'testing', password: 'testtest', friend_code: '1234-1234-1234' };
      const result = Joi.validate(data, UserCreateValidator);

      expect(result.error).to.be.null;
    });

    it('disallows codes not in the format of 1234-1234-1234', () => {
      const data = { username: 'testing', password: 'testtest', friend_code: '234-1234-1234' };
      const result = Joi.validate(data, UserCreateValidator);

      expect(result.error).to.match(/"friend_code" must be a 12-digit number/);
    });

  });

  describe('referrer', () => {

    it('is optional', () => {
      const data = { username: 'testing', password: 'testtest', friend_code: '1234-1234-1234' };
      const result = Joi.validate(data, UserCreateValidator);

      expect(result.error).to.be.null;
      expect(result.value.referrer).to.be.undefined;
    });

    it('can be a string', () => {
      const data = { username: 'testing', password: 'testtest', friend_code: '1234-1234-1234', referrer: 'http://test.com' };
      const result = Joi.validate(data, UserCreateValidator);

      expect(result.error).to.be.null;
      expect(result.value.referrer).to.eql(data.referrer);
    });

    it('converts the empty string to undefined', () => {
      const data = { username: 'testing', password: 'testtest', friend_code: '1234-1234-1234', referrer: '' };
      const result = Joi.validate(data, UserCreateValidator);

      expect(result.error).to.be.null;
      expect(result.value.referrer).to.be.undefined;
    });

    it('converts null to undefined', () => {
      const data = { username: 'testing', password: 'testtest', friend_code: '1234-1234-1234', referrer: null };
      const result = Joi.validate(data, UserCreateValidator);

      expect(result.error).to.be.null;
      expect(result.value.referrer).to.be.undefined;
    });

  });

});
