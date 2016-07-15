'use strict';

const Bluebird = require('bluebird');
const JWT      = require('jsonwebtoken');

const Config = require('../../config');

exports.sign = function (user) {
  return new Bluebird((resolve) => {
    JWT.sign(user.serialize(), Config.JWT_SECRET, {}, (err, token) => resolve({ token }));
  });
};
