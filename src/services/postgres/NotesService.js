/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-unused-vars */

const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');


class MusicsService {
  constructor() {
    this._pool = new Pool();
  }

  
  async addMusic({ title, year, performer, genre, duration }) {
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const query = {
      text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [id, title, year, performer, genre, duration, insertedAt, updatedAt],
    };

    const result = await this._pool.query(query);
 
    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }
 
    return result.rows[0].id;
  }


  
}


module.exports = MusicsService;