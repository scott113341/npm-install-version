'use strict';

var execSync = require('child_process').execSync;
var fs = require('fs');
var path = require('path');

var _require = require('./util.js');

var alreadyInstalled = _require.alreadyInstalled;
var error = _require.error;
var sanitize = _require.sanitize;


var SHX = 'node node_modules/.bin/shx';
var TEMP = 'node_modules/.npm-install-version-temp';

function install(npmPackage) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var _options$destination = options.destination;
  var destination = _options$destination === undefined ? sanitize(npmPackage) : _options$destination;
  var _options$overwrite = options.overwrite;
  var overwrite = _options$overwrite === undefined ? false : _options$overwrite;


  if (!npmPackage) error();
  var destinationPath = path.join('node_modules', destination);
  if (!overwrite && alreadyInstalled(destinationPath)) {
    return console.log('Directory ' + destinationPath + ' already exists, skipping');
  }

  var errored = false;
  try {
    // make temp install dir
    execSync(SHX + ' rm -rf ' + TEMP + '/');
    execSync(SHX + ' mkdir -p ' + TEMP + '/node_modules/');

    // install package to temp dir
    var installOptions = {
      cwd: TEMP,
      stdio: [null, null, null]
    };
    execSync('npm install ' + npmPackage, installOptions);

    // copy to node_modules/
    execSync(SHX + ' rm -rf ' + destinationPath);
    var name = fs.readdirSync(TEMP + '/node_modules/')[0];
    execSync(SHX + ' mv ' + TEMP + '/node_modules/' + name + ' ' + destinationPath);

    console.log('Installed ' + npmPackage + ' to ' + destinationPath);
  } catch (err) {
    errored = true;
    console.log('Error installing ' + npmPackage);
    console.log(err.toString());
  } finally {
    // clean up temp install dir
    execSync(SHX + ' rm -rf ' + TEMP);

    if (errored) process.exit(1);
  }
}

module.exports = install;