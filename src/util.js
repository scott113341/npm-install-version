const fs = require('fs');
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


function sanitize(npmPackage) {
  return sanitizeFilename(npmPackage, { replacement: '-' });
}


module.exports = {
  alreadyInstalled,
  error,
  sanitize,
};
