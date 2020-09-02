const fs = require('fs');
const npm = require('npm');
const path = require('path');
const sanitizeFilename = require('sanitize-filename');

function directoryExists (destination) {
  try {
    fs.lstatSync(destination);
    return true;
  } catch (e) {
    return false;
  }
}

function error () {
  throw Error('You must specify an install target like this: csjs@1.0.0');
}

function getPackageName(packageName) {
  return new Promise(function(resolve, reject) {
    npm.load({ loaded: false }, function(err, result) {
        if(err) {
          return reject(err);
        }

        delete require.cache[require.resolve('npm/lib/fetch-package-metadata.js')];
        var fetchPackageMeta = require('npm/lib/fetch-package-metadata.js');

        fetchPackageMeta(packageName, process.cwd(), function(err, result) {
          if(err) {
            return reject(err);
          }

          return resolve(result.name);
        });
    });
  });
}

function getUsage () {
  var readme = path.join(__dirname, '..', 'README.md');
  var readmeText = String(fs.readFileSync(readme));
  return /```usage\n([\s\S]*?)```/.exec(readmeText)[1];
}

function sanitize (npmPackage) {
  return sanitizeFilename(npmPackage, { replacement: '-' });
}

function tryCatchOptimizer (fn, errorFn, finalFn) {
  var safeCallFunction = (fn, ...params) => {
    if(typeof fn === "function") {
      fn(...params);
    }
  }

  try {
    safeCallFunction(fn);
  } catch(error) {
    safeCallFunction(errorFn);
  } finally {
    safeCallFunction(finalFn);
  }
}

module.exports = {
  directoryExists,
  error,
  getPackageName,
  getUsage,
  sanitize,
  tryCatchOptimizer
};
