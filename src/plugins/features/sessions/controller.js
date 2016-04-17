'use strict';

const Bluebird = require('bluebird');
const Bcrypt   = Bluebird.promisifyAll(require('bcrypt'));

const Errors = require('../../../libraries/errors');
const JWT    = require('../../../libraries/jwt');
const User   = require('../../../models/user');

exports.create = function (payload, request) {
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
  .tap((user) => {
    const xff = request.headers['x-forwarded-for'];
    const ip = xff ? xff.split(',')[0].trim() : request.info.remoteAddress;

    return user.save({ last_ip: ip, last_login: new Date() });
  })
  .then((user) => JWT.sign(user));
};
