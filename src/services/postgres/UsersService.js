/* eslint-disable linebreak-style */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */


const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');


class UsersService {
  constructor() {
    this._pool = new Pool();
  }



  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
    }
  }
}
