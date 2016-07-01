'use strict';

var fs = require('fs');
var path = require('path');
var sanitizeFilename = require('sanitize-filename');

function alreadyInstalled(destination) {
  try {
    fs.lstatSync(destination);
    return true;
  } catch (e) {
    return false;
  }
}

function displayHelp() {
  var exitCode = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

  var readme = path.join(__dirname, '..', 'README.md');
  var readmeText = String(fs.readFileSync(readme));
  var readmeUsageText = /```usage\n([\s\S]*?)```/.exec(readmeText)[1];
  process.stdout.write(readmeUsageText);
  if (exitCode !== null) process.exit(exitCode);
}

function error() {
  throw Error('You must specify an install target like this: csjs@1.0.0');
}

function sanitize(npmPackage) {
  return sanitizeFilename(npmPackage, { replacement: '-' });
}

module.exports = {
  alreadyInstalled: alreadyInstalled,
  displayHelp: displayHelp,
  error: error,
  sanitize: sanitize
};