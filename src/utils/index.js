/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable object-curly-newline */

const mapDBToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  inserted_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  insertedAt: inserted_at,
  updatedAt: updated_at,
});


module.exports = { mapDBToModel };
