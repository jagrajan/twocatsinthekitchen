'use strict'
const create = require ("../dist/init/create-db").default;
const populate = require ("../dist/init/populate-db").default;

module.exports.up = async function () {
  await create();
  await populate();
}

module.exports.down = function (next) {
  next()
}
