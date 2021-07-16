/* eslint-disable linebreak-style */
const routes = (handler) => [
  {
    method: 'POST',
    path: '/exports/playlists/{playlistId}',
    handler: handler.postExportSongsHandler,
    options: {
      auth: 'openmusicsapp_jwt',
    },
  },
];

module.exports = routes;
