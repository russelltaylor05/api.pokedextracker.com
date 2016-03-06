'use strict';

module.exports = Factory.define('user')
  .sequence('id')
  .sequence('username', (i) => `u${i}`)
  .attr('password', '');
