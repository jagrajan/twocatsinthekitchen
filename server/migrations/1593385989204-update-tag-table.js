'use strict'
const db = require('../dist/db').default;

module.exports.up = async function () {
  await db.query(`
    DROP TABLE IF EXISTS cookbook.recipe_tag;
    CREATE TABLE cookbook.recipe_tag (
      id SERIAL PRIMARY KEY,
      recipe_version_id INTEGER NOT NULL REFERENCES cookbook.recipe_version(id),
      tag_id INTEGER NOT NULL REFERENCES cookbook.tag(id)
    );
  `);
}

module.exports.down = function (next) {
  next()
}
