'use strict';

module.exports = Factory.define('evolution')
  .sequence('evolving_pokemon_id')
  .sequence('evolved_pokemon_id')
  .sequence('evolution_family_id')
  .attr('stage', 1)
  .attr('trigger', 'level');
