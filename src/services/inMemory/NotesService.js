/* eslint-disable linebreak-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

const { nanoid } = require('nanoid');


class NotesService {
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
      throw new Error('Catatan gagal ditambahkan');
    }

    return id;
  }
}
