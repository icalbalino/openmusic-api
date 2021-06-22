/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable object-curly-newline */
/* eslint-disable space-before-blocks */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */

const ClientError = require('../../exceptions/ClientError');


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
      this._validator.validateMusicPayload(request.payload);

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
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
 
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });

      response.code(500);
      console.error(error);
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
      const { songId } = request.params;
      const song = await this._service.getMusicById(songId);
      return {
        status: 'success',
        data: {
          song,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
 
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });

      response.code(500);
      console.error(error);
      return response;

    }
  }

  async putSongByIdHandler(request, h){
    try {
      this._validator.validateMusicPayload(request.payload);

      const { songId } = request.params;
 
      await this._service.editMusicById(songId, request.payload);
 
      return {
        status: 'success',
        message: 'Lagu berhasil diperbarui',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
 
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });

      response.code(500);
      console.error(error);
      return response;

    }
  }

  async deleteSongByIdHandler(request, h){
    try {
      const { songId } = request.params;

      await this._service.deleteMusicById(songId);
      
      return {
        status: 'success',
        message: 'Lagu berhasil dihapus',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
 
      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });

      response.code(500);
      console.error(error);
      return response;
      
    }
  }
}

module.exports = MusicsHandler;
