'use strict';

var execSync = require('child_process').execSync;
var fs = require('fs');
var path = require('path');

var SHX = 'node node_modules/.bin/shx';
var TEMP = '.npm-install-version-temp';

function install(npmPackage) {
  var destination = arguments.length <= 1 || arguments[1] === undefined ? npmPackage : arguments[1];

  if (!npmPackage) error();
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
    execSync(SHX + ' rm -rf node_modules/' + destination);
    var name = fs.readdirSync(TEMP + '/node_modules/')[0];
    execSync(SHX + ' mv ' + TEMP + '/node_modules/' + name + ' node_modules/' + destination);

    console.log('Installed ' + npmPackage + ' to node_modules/' + destination + '/');
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

function error() {
  throw Error('You must specify an install target like this: csjs@1.0.0');
}

module.exports = {
  install: install
};