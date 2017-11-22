'use strict';

const Joi = require('joi');

module.exports = {
  db: {
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
  },
  validation: {
    phoneCheckSchema: Joi.object().keys({
      phone: Joi.string().required().regex(/^\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/)
    }),
    phoneEditSchema: Joi.object().keys({
      id: Joi.number().integer(),
      phone: Joi.string().required().regex(/^\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/)
    }),
    phoneDeleteSchema: Joi.object().keys({
      id: Joi.number().integer().required()
    })
  }
};
