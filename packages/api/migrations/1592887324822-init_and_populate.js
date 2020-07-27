'use strict'
const create = require ("../dist/init/create-db").default;

module.exports.up = async function () {
  await create();
}

module.exports.down = function (next) {
  next()
}
