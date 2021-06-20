/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
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

  async postSongsHandler(request, h){
    try {
      const { title = 'untitled', year, performer, genre, duration } = request.payload;
 
      const songId = this._service.addMusic({ title, year, performer, genre, duration });
 
      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: {
          songId,
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
  
  async getSongsHandler(){
    const songs = this._service.getMusic();
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request, h){
    try {
      const { id } = request.params;
      const songs = this._service.getMusicById(id);
      return {
        status: 'success',
        data: {
          songs,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  }

  async putSongByIdHandler(){

  }

  async deleteSongByIdHandler(){

  }
}

module.exports = MusicsHandler;
