const fs = require('fs');
const path = require('path');
const sanitizeFilename = require('sanitize-filename');


function alreadyInstalled(destination) {
  try {
    fs.lstatSync(destination);
    return true;
  }
  catch (e) {
    return false;
  }
}


function error() {
  throw Error('You must specify an install target like this: csjs@1.0.0');
}


function getUsage() {
  var readme = path.join(__dirname, '..', 'README.md');
  var readmeText = String(fs.readFileSync(readme));
  return /```usage\n([\s\S]*?)```/.exec(readmeText)[1];
}


function sanitize(npmPackage) {
  return sanitizeFilename(npmPackage, { replacement: '-' });
}


module.exports = {
  alreadyInstalled,
  error,
  getUsage,
  sanitize,
};
