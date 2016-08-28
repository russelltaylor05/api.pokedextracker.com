'use strict';

const Joi = require('joi');

const Controller = require('./controller');

exports.register = (server, options, next) => {

  server.route([{
    method: 'GET',
    path: '/pokemon',
    config: {
      handler: (request, reply) => reply(Controller.list())
    }
  }, {
    method: 'GET',
    path: '/pokemon/{id}',
    config: {
      handler: (request, reply) => reply(Controller.retrieve(request.params.id)),
      validate: { params: Joi.object({ id: Joi.number().integer() }) }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'pokemon'
};
