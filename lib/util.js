'use strict';

var deasync = require('deasync');
var fs = require('fs');
var npm = require('npm');
var path = require('path');
var sanitizeFilename = require('sanitize-filename');

function directoryExists(destination) {
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

function getPackageName(packageName) {
  var load = deasync(npm.load);
  load({ loaded: false });

  var fetchPackageMetadata = deasync(require('npm/lib/fetch-package-metadata.js'));
  return fetchPackageMetadata(packageName, process.cwd()).name;
}

function getUsage() {
  var readme = path.join(__dirname, '..', 'README.md');
  var readmeText = String(fs.readFileSync(readme));
  return (/```usage\n([\s\S]*?)```/.exec(readmeText)[1]
  );
}

function sanitize(npmPackage) {
  return sanitizeFilename(npmPackage, { replacement: '-' });
}

module.exports = {
  directoryExists: directoryExists,
  error: error,
  getPackageName: getPackageName,
  getUsage: getUsage,
  sanitize: sanitize
};