const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    'server': path.resolve(__dirname, '../server/src'),
  })
);
