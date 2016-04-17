'use strict';

const Controller          = require('./controller');
const UserCreateValidator = require('../../../validators/user/create');

exports.register = (server, options, next) => {

  server.route([{
    method: 'GET',
    path: '/users',
    config: {
      handler: (request, reply) => reply(Controller.list())
    }
  }, {
    method: 'GET',
    path: '/users/{id}',
    config: {
      handler: (request, reply) => reply(Controller.retrieve(request.params.id))
    }
  }, {
    method: 'POST',
    path: '/users',
    config: {
      handler: (request, reply) => reply(Controller.create(request.payload, request)),
      validate: { payload: UserCreateValidator }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'users'
};
