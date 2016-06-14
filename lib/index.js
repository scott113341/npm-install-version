'use strict';

var execSync = require('child_process').execSync;
var fs = require('fs');
var path = require('path');

var _require = require('./util.js');

var error = _require.error;
var sanitize = _require.sanitize;


var SHX = 'node node_modules/.bin/shx';
var TEMP = '.npm-install-version-temp';

function install(npmPackage, destination) {
  if (!npmPackage) error();
  destination = destination || sanitize(npmPackage);
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

function requirePackage(npmPackage) {
  return require(sanitize(npmPackage));
}

module.exports = {
  install: install,
  require: requirePackage
};