'use strict'
const db = require('../dist/db').default;

module.exports.up = async function () {
  await db.query(`
    ALTER TABLE cookbook.measured_ingredient ADD COLUMN IF NOT EXISTS instructions TEXT;
  `);
}

module.exports.down = function (next) {
  next()
}
