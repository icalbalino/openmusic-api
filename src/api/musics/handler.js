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

    this.postSongsHandler = this.postSongsHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongsHandler(request, h){
    try {
      const { title = 'untitled', year, performer, genre, duration } = request.payload;
 
      const songId = await this._service.addMusic({ title, year, performer, genre, duration });
 
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
    const songs = await this._service.getMusic();
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
      const songs = await this._service.getMusicById(id);
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

  async putSongByIdHandler(request, h){
    try {
      const { id } = request.params;
 
      await this._service.editMusicById(id, request.payload);
 
      return {
        status: 'success',
        message: 'lagu berhasil diperbarui',
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

  async deleteSongByIdHandler(request, h){
    try {
      const { id } = request.params;

      await this._service.deleteMusicById(id);
      
      return {
        status: 'success',
        message: 'lagu berhasil dihapus',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: 'Lagu gagal dihapus. Id tidak ditemukan',
      });
      response.code(404);
      return response;
    }
  }
}

module.exports = MusicsHandler;
