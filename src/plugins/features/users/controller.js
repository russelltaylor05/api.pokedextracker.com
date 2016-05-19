'use strict';

const Bluebird = require('bluebird');
const Bcrypt   = Bluebird.promisifyAll(require('bcrypt'));

const Config = require('../../../../config');
const Errors = require('../../../libraries/errors');
const JWT    = require('../../../libraries/jwt');
const User   = require('../../../models/user');

exports.list = function () {
  return new User().query((qb) => qb.orderBy('id')).fetchAll();
};

exports.retrieve = function (username) {
  return new User().where('username', username).fetch({ require: true })
  .catch(User.NotFoundError, () => {
    throw new Errors.NotFound('user');
  });
};

exports.create = function (payload, request) {
  return Bcrypt.hashAsync(payload.password, Config.SALT_ROUNDS)
  .then((hash) => {
    const xff = request.headers['x-forwarded-for'];
    const ip = xff ? xff.split(',')[0].trim() : request.info.remoteAddress;

    payload.password = hash;
    payload.last_ip = ip;

    return new User().where('username', payload.username).fetch();
  })
  .then((user) => {
    if (user) {
      throw new Errors.ExistingUsername();
    }

    return new User(payload).save();
  })
  .then((user) => JWT.sign(user))
  .catch(Errors.DuplicateKey, () => {
    throw new Errors.ExistingUsername();
  });
};

exports.update = function (username, payload, auth) {
  return new User({ id: auth.id }).where('username', username).save(payload)
  .catch(User.NoRowsUpdatedError, () => {
    throw new Errors.ForbiddenAction('updating this user');
  });
};
