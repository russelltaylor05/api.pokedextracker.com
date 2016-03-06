'use strict';

const Hapi = require('hapi');
const Joi  = require('joi');

describe('errors service plugin', () => {

  let server;

  beforeEach(() => {
    server = new Hapi.Server();
    server.connection({ port: 80 });

    server.register([
      require('inject-then'),
      require('../../../src/plugins/services/errors')
    ], () => {})

    server.route([{
      method: 'GET',
      path: '/normal',
      config: {
        handler: (request, reply) => reply({})
      }
    }, {
      method: 'POST',
      path: '/joi',
      config: {
        handler: (request, reply) => reply({}),
        validate: { payload: { test: Joi.number() } }
      }
    }, {
      method: 'POST',
      path: '/error',
      config: {
        handler: (request, reply) => reply(new Error())
      }
    }]);
  });

  it('does not do anything for non-errors', () => {
    return server.injectThen({
      method: 'GET',
      url: '/normal'
    })
    .then((res) => {
      expect(res.statusCode).to.eql(200);
      expect(res.result).to.eql({});
    });
  });

  it('converts Joi validation errors into 422s', () => {
    return server.injectThen({
      method: 'POST',
      url: '/joi',
      payload: { test: 'not a number' }
    })
    .then((res) => {
      expect(res.statusCode).to.eql(422);
    });
  });

  it('removes quotes form Joi validation errors', () => {
    return server.injectThen({
      method: 'POST',
      url: '/joi',
      payload: { test: 'not a number' }
    })
    .then((res) => {
      expect(res.result.error.message).to.not.contain('"');
    });
  });

  it('does not alter the 500 message', () => {
    return server.injectThen({
      method: 'POST',
      url: '/error'
    })
    .then((res) => {
      expect(res.result.error.message).to.eql('An internal server error occurred');
    });
  });

});
