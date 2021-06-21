/* eslint-disable linebreak-style */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable eol-last */

const InvariantError = require('../../exceptions/InvariantError');
const { MusicPayloadSchema } = require('./schema');


const MusicsValidator = {
  validateMusicPayload: (payload) => {
    const validationResult = MusicPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};


module.exports = MusicsValidator;