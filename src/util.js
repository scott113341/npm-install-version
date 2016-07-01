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


function displayHelp(exitCode=null) {
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
  alreadyInstalled,
  displayHelp,
  error,
  sanitize,
};
