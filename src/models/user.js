'use strict';

const Bookshelf = require('../libraries/bookshelf');

module.exports = Bookshelf.model('User', Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: ['date_created', 'date_modified'],
  serialize () {
    return {
      id: this.get('id'),
      username: this.get('username'),
      friend_code: this.get('friend_code'),
      date_created: this.get('date_created'),
      date_modified: this.get('date_modified')
    };
  }
}));
