'use strict';

const Errors  = require('../../../libraries/errors');
const Pokemon = require('../../../models/pokemon');

exports.list = function () {
  return new Pokemon().query((qb) => qb.orderBy('national_id')).fetchAll();
};

exports.retrieve = function (nationalId) {
  return new Pokemon().where('national_id', nationalId).fetch({ require: true })
  .catch(Pokemon.NotFoundError, () => {
    throw new Errors.NotFound('pokemon');
  });
};
