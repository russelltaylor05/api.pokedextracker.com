'use strict';

const Capture = require('../../../models/capture');
const Errors  = require('../../../libraries/errors');
const Knex    = require('../../../libraries/knex');
const Pokemon = require('../../../models/pokemon');
const User    = require('../../../models/user');

exports.list = function (query) {
  return new User({ id: query.user }).fetch({ require: true })
  .catch(User.NotFoundError, () => {
    throw new Errors.NotFound('user');
  })
  .then(() => new Capture().where('user_id', query.user).fetchAll())
  .get('models')
  .reduce((captures, capture) => {
    captures[capture.get('pokemon_id')] = capture;
    return captures;
  }, {})
  .then((captures) => {
    return new Pokemon().count().then((count) => new Array(parseInt(count)))
    .map((_, i) => captures[i + 1] || Capture.forge({ user_id: query.user, pokemon_id: i + 1, captured: false }));
  })
  .map((capture) => capture.load(Capture.RELATED));
};

exports.create = function (payload, auth) {
  return new Pokemon({ national_id: payload.pokemon }).fetch({ require: true })
  .catch(Pokemon.NotFoundError, () => {
    throw new Errors.NotFound('pokemon');
  })
  .then(() => Knex('captures').insert({ pokemon_id: payload.pokemon, user_id: auth.id, captured: true }))
  .catch(Errors.DuplicateKey, () => {
    throw new Errors.AlreadyExists('capture');
  })
  .then(() => new Capture({ pokemon_id: payload.pokemon, user_id: auth.id }).fetch({ withRelated: Capture.RELATED }));
};

exports.delete = function (payload, auth) {
  return new Capture().where({ pokemon_id: payload.pokemon, user_id: auth.id }).destroy({ require: true })
  .catch(Capture.NoRowsDeletedError, () => {
    throw new Errors.NotFound('capture');
  })
  .then(() => {
    return { deleted: true };
  });
};
