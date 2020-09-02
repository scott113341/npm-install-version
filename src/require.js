const path = require("path");
const { sanitize } = require('./util.js');

function _require (npmPackage, customPath = "") {
  return require(path.join(process.cwd(), "niv_modules", sanitize(npmPackage), customPath));
}

module.exports = _require;
