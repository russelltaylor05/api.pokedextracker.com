'use strict';

const Joi = require('joi');

module.exports = Joi.object().keys({
  username: Joi.string().token().lowercase().trim().required(),
  password: Joi.string().required()
});
