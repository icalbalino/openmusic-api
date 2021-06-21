/* eslint-disable linebreak-style */
/* eslint-disable padded-blocks */
/* eslint-disable no-console */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */

require('dotenv').config();

const Hapi = require('@hapi/hapi');
const musics = require('./api/musics');
const MusicsService = require('./services/inMemory/MusicsService');


const init = async () => {
  const musicsService = new MusicsService();
  
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: musics,
    options: {
      service: musicsService,
    },
  });
 
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);

};


init();
