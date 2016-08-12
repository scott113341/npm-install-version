const { sanitize } = require('./util.js');

function _require (npmPackage) {
  return require(sanitize(npmPackage));
}

module.exports = _require;
