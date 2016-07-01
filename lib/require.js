'use strict';

var _require2 = require('./util.js');

var sanitize = _require2.sanitize;


function _require(npmPackage) {
  return require(sanitize(npmPackage));
}

module.exports = _require;