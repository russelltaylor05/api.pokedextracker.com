'use strict';

const Bookshelf = require('../libraries/bookshelf');

module.exports = Bookshelf.Model.extend({
  tableName: 'captures',
  hasTimestamps: ['date_created', 'date_modified'],
  serialize () {
    return {
      user_id: this.get('user_id'),
      pokemon_id: this.get('pokemon_id'),
      captured: this.get('captured')
    };
  }
});
