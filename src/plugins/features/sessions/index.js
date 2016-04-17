'use strict';

const Controller       = require('./controller');
const SessionValidator = require('../../../validators/session');

exports.register = (server, options, next) => {

  server.route([{
    method: 'POST',
    path: '/sessions',
    config: {
      handler: (request, reply) => reply(Controller.create(request.payload, request)),
      validate: { payload: SessionValidator }
    }
  }]);

  next();

};

exports.register.attributes = {
  name: 'sessions'
};
