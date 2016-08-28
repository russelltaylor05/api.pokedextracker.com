'use strict';

const Joi = require('joi');

const Controller = require('./controller');
const Pokemon    = require('../../../models/pokemon');

exports.register = (server, options, next) => {

  let pokemon;

  server.route([{
    method: 'GET',
    path: '/captures',
    config: {
      handler: (request, reply) => reply(Controller.list(request.query, pokemon)),
      validate: { query: Joi.object({ user: Joi.number().integer().required() }) }
    }
  }, {
    method: 'POST',
    path: '/captures',
    config: {
      auth: 'token',
      handler: (request, reply) => reply(Controller.create(request.payload, request.auth.credentials)),
      validate: { payload: Joi.object({ pokemon: Joi.array().items(Joi.number().integer()).single().required() }) }
    }
  }, {
    method: 'DELETE',
    path: '/captures',
    config: {
      auth: 'token',
      handler: (request, reply) => reply(Controller.delete(request.payload, request.auth.credentials)),
      validate: { payload: Joi.object({ pokemon: Joi.array().items(Joi.number().integer()).single().required() }) }
    }
  }]);

  return new Pokemon().query((qb) => qb.orderBy('national_id')).fetchAll()
  .get('models')
  .then((p) => {
    pokemon = p;
    next();
  });

};

exports.register.attributes = {
  name: 'captures'
};
