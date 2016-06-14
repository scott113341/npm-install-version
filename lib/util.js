'use strict';

var sanitizeFilename = require('sanitize-filename');

function error() {
  throw Error('You must specify an install target like this: csjs@1.0.0');
}

function sanitize(npmPackage) {
  return sanitizeFilename(npmPackage, { replacement: '-' });
}

module.exports = {
  error: error,
  sanitize: sanitize
};