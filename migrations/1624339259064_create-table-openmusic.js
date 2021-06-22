/* eslint-disable no-multiple-empty-lines */
/* eslint-disable camelcase */

// exports.shorthands = undefined;


exports.up = (pgm) => {
  pgm.createTable('openmusic', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    year: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    performer: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    genre: {
      type: 'TEXT[]',
      notNull: true,
    },
    duration: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    inserted_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  });
};


exports.down = (pgm) => {
  pgm.dropTable('openmusic');
};
