'use strict'
const db = require('../dist/db').default;

module.exports.up = async function () {
  await db.query(`
    CREATE TABLE cookbook.alternative_measurement (
      measured_ingredient_id INTEGER PRIMARY KEY REFERENCES cookbook.measured_ingredient(id),
      unit_id INTEGER REFERENCES cookbook.unit(id) NOT NULL,
      min_amount TEXT NOT NULL,
      max_amount TEXT NOT NULL
    );
  `);
}

module.exports.down = function (next) {
  next()
}
