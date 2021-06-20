/* eslint-disable linebreak-style */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-unused-vars */


const MusicsHandler = require('./handler');
const routes = require('./routes');


module.exports = {
  name: 'openmusic',
  version: '1.0.0',
  register: async (server, { service }) => {
    const musicsHandler = new MusicsHandler(service);
    server.route(routes(musicsHandler));
  },
};
