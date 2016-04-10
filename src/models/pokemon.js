'use strict';

const Bookshelf = require('../libraries/bookshelf');
const Evolution = require('./evolution');

module.exports = Bookshelf.model('Pokemon', Bookshelf.Model.extend({
  tableName: 'pokemon',
  idAttribute: 'national_id',
  hasTimestamps: ['date_created', 'date_modified'],
  evolutions () {
    return new Evolution()
    .where('evolution_family_id', this.get('evolution_family_id'))
    .fetchAll({ withRelated: Evolution.RELATED })
    .get('models');
  },
  virtuals: {
    bulbapedia_url () {
      return `http://bulbapedia.bulbagarden.net/wiki/${encodeURIComponent(this.get('name'))}_(Pok%C3%A9mon)`;
    },
    summary () {
      return {
        national_id: this.get('national_id'),
        name: this.get('name'),
        icon_url: this.get('icon_url')
      };
    },
    types () {
      return [this.get('type1'), this.get('type2')].filter((type) => type);
    },
    x_locations () {
      return this.get('x_location').split(', ');
    },
    y_locations () {
      return this.get('y_location').split(', ');
    },
    or_locations () {
      return this.get('or_location').split(', ');
    },
    as_locations () {
      return this.get('as_location').split(', ');
    }
  },
  serialize () {
    return this.evolutions()
    .reduce((stages, evolution) => {
      const i = evolution.get('stage') - 1;
      stages[i] = stages[i] || [];
      stages[i].push(evolution);
      return stages;
    }, [])
    .then((stages) => {
      return {
        national_id: this.get('national_id'),
        name: this.get('name'),
        kanto_id: this.get('kanto_id') || undefined,
        johto_id: this.get('johto_id') || undefined,
        hoenn_id: this.get('hoenn_id') || undefined,
        sinnoh_id: this.get('sinnoh_id') || undefined,
        unova_id: this.get('unova_id') || undefined,
        central_kalos_id: this.get('central_kalos_id') || undefined,
        coastal_kalos_id: this.get('coastal_kalos_id') || undefined,
        mountain_kalos_id: this.get('mountain_kalos_id') || undefined,
        regionless: this.get('regionless') || undefined,
        icon_url: this.get('icon_url'),
        bulbapedia_url: this.get('bulbapedia_url'),
        x_locations: this.get('x_locations'),
        y_locations: this.get('y_locations'),
        or_locations: this.get('or_locations'),
        as_locations: this.get('as_locations'),
        evolutions: stages.map((stage) => stage.map((evolution) => evolution.serialize()))
      };
    });
  }
}));
