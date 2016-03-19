'use strict';

const Bluebird = require('bluebird');
const Bcrypt   = Bluebird.promisifyAll(require('bcrypt'));

const Errors = require('../../../libraries/errors');
const JWT    = require('../../../libraries/jwt');
const User   = require('../../../models/user');

exports.create = function (payload) {
  return new User().where('username', payload.username).fetch({ require: true })
  .catch(User.NotFoundError, () => {
    throw new Errors.NotFound('user');
  })
  .tap((user) => {
    return Bcrypt.compareAsync(payload.password, user.get('password'))
    .then((valid) => {
      if (!valid) {
        throw new Errors.InvalidPassword();
      }
    });
  })
  .then((user) => JWT.sign(user));
};
