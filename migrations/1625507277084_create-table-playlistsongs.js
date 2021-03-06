exports.up = (pgm) => {
  pgm.createTable('playlistsongs', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint('playlistsongs', 'uq.playlist_id_song_id', 'UNIQUE(playlist_id, song_id)');
  pgm.addConstraint('playlistsongs', 'fk.playlistsongs.playlist_id_playlists.id', 'FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');
  pgm.addConstraint('playlistsongs', 'fk.playlistsongs.song_id_openmusic.id', 'FOREIGN KEY(song_id) REFERENCES openmusic(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('playlistsongs');
};
