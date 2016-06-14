'use strict';

var fs = require('fs');
var sanitizeFilename = require('sanitize-filename');

function alreadyInstalled(destination) {
  try {
    fs.lstatSync(destination);
    return true;
  } catch (e) {
    return false;
  }
}

function error() {
  throw Error('You must specify an install target like this: csjs@1.0.0');
}

function sanitize(npmPackage) {
  return sanitizeFilename(npmPackage, { replacement: '-' });
}

module.exports = {
  alreadyInstalled: alreadyInstalled,
  error: error,
  sanitize: sanitize
};