/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable no-console */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */


// mengimpor dotenv dan menjalankan konfigurasinya
require('dotenv').config();

const Hapi = require('@hapi/hapi');

//musics
const musics = require('./api/musics');
//const MusicsService = require('./services/inMemory/MusicsService');
const MusicsService = require('./services/postgres/MusicsService');
const MusicsValidator = require('./validator/musics');

// users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');


const init = async () => {
  const musicsService = new MusicsService();
  const usersService = new UsersService();
  
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: musics,
      options: {
        service: musicsService,
        validator: MusicsValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
  ]);
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);

};


init();
