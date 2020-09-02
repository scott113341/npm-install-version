const shelljs = require('shelljs');
const path = require("path");

const { sanitize } = require('./util.js');

const MODULES_DIRECTORY = path.join(process.cwd(), "/niv_modules")

module.exports = function(npmPackage) {
  shelljs.rm("-rf", path.join(MODULES_DIRECTORY, sanitize(npmPackage)))
};
