/* eslint-disable linebreak-style */
/* eslint-disable no-multiple-empty-lines */

const Joi = require('joi');

const MusicPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  performer: Joi.string().required(),
  genre: Joi.array().items(Joi.string()).required(),
  duration: Joi.number(),
});


module.exports = { MusicPayloadSchema };
