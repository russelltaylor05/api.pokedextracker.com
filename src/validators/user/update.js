'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  friend_code: Joi.string().regex(/^\d{4}-\d{4}-\d{4}$/)
})
.options({
  language: {
    string: { regex: { base: 'must be a 12-digit number' } }
  }
});
