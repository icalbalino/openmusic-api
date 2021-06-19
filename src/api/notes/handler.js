/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable space-before-blocks */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */


class MusicsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postMusicHandler(request, h){
    try {
      const { title = 'untitled', year, performer, genre, duration } = request.payload;

      const noteId = await this._service.addNote({ title, year, performer, genre, duration });
    
      const response = h.response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId,
        },
      });
      
      response.code(201);
      return response;

    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
      return response;
    }
  }
  

}

module.exports = MusicsHandler;
