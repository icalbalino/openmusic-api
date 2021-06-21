/* eslint-disable linebreak-style */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-unused-vars */


const MusicsHandler = require('./handler');
const routes = require('./routes');


module.exports = {
  name: 'openmusic',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const musicsHandler = new MusicsHandler(service, validator);
    server.route(routes(musicsHandler));
  },
};
