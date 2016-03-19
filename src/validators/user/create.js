'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  username: Joi.string().token().max(255).lowercase().trim().required(),
  password: Joi.string().min(8).max(72).required(),
  friend_code: Joi.string().regex(/^\d{4}-\d{4}-\d{4}$/)
})
.options({
  language: {
    string: { regex: { base: 'must be a 12-digit number' } }
  }
});
