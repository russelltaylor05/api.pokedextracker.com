'use strict';

const Bookshelf = require('../libraries/bookshelf');

module.exports = Bookshelf.Model.extend({
  tableName: 'pokemon',
  idAttribute: 'national_id',
  hasTimestamps: ['date_created', 'date_modified'],
  virtuals: {
    types () {
      return [this.get('type1'), this.get('type2')].filter((type) => type);
    }
  },
  serialize () {
    return {
      national_id: this.get('national_id'),
      name: this.get('name'),
      kanto_id: this.get('kanto_id'),
      johto_id: this.get('johto_id'),
      hoenn_id: this.get('hoenn_id'),
      sinnoh_id: this.get('sinnoh_id'),
      unova_id: this.get('unova_id'),
      central_kalos_id: this.get('central_kalos_id'),
      coastal_kalos_id: this.get('coastal_kalos_id'),
      mountain_kalos_id: this.get('mountain_kalos_id'),
      regionless: this.get('regionless'),
      types: this.get('types'),
      icon_url: this.get('icon_url'),
      avatar_url: this.get('avatar_url'),
      x_location: this.get('x_location'),
      y_location: this.get('y_location'),
      or_location: this.get('or_location'),
      as_location: this.get('as_location')
    };
  }
});
