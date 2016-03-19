'use strict';

const HapiAuthJWT = require('hapi-auth-jwt');

const Config = require('../../../config');

exports.register = function (server, options, next) {

  server.register(HapiAuthJWT, (err) => {
    /* istanbul ignore if */
    if (err) {
      return next(err);
    }

    server.auth.strategy('token', 'jwt', { key: Config.JWT_SECRET });

    next();
  });

};

exports.register.attributes = {
  name: 'auth'
};
