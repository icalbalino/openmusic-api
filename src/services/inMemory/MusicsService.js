/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable object-property-newline */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');


class MusicsService {
  constructor() {
    this._music = [];
  }


  addMusic({ title, year, performer, genre, duration }) {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newMusic = { title, year, performer, genre, duration, id, insertedAt, updatedAt };

    this._music.push(newMusic);

    const isSuccess = this._music.filter((music) => music.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return id;
  }

  getMusic() {
    return this._music;
  }

  getMusicById(id) {
    const music = this._music.filter((n) => n.id === id)[0];
    if (!music) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }
    return music;
  }

  editMusicById(id, { title, year, performer, genre, duration }) {
    const index = this._music.findIndex((music) => music.id === id);
 
    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
    }
 
    const updatedAt = new Date().toISOString();
 
    this._music[index] = {
      ...this._music[index],
      title,
      year,
      performer,
      genre,
      duration,
      updatedAt,
    };
  }

  deleteMusicById(id) {
    const index = this._music.findIndex((music) => music.id === id);
    if (index === -1) {
      throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
    }
    this._music.splice(index, 1);
  }
}


module.exports = MusicsService;