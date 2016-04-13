'use strict';

const Joi = require('joi');

const Controller = require('./controller');

exports.register = (server, options, next) => {

  server.route([{
    method: 'GET',
    path: '/captures',
    config: {
      handler: (request, reply) => reply(Controller.list(request.query)),
      validate: { query: { user: Joi.number().integer().required() } }
    }
  }, {
    method: 'POST',
    path: '/captures',
    config: {
      auth: 'token',
      handler: (request, reply) => reply(Controller.create(request.payload, request.auth.credentials)),
      validate: { payload: { pokemon: Joi.array().items(Joi.number().integer()).single().required() } }
    }
  }, {
    method: 'DELETE',
    path: '/captures',
    config: {
      auth: 'token',
      handler: (request, reply) => reply(Controller.delete(request.payload, request.auth.credentials)),
      validate: { payload: { pokemon: Joi.array().items(Joi.number().integer()).single().required() } }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'captures'
};
