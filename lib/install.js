'use strict';

var childProcess = require('child_process');
var path = require('path');
var shelljs = require('shelljs');

var util = require('./util.js');

var TEMP = path.join(process.cwd(), 'node_modules', '.npm-install-version-temp');

function install(npmPackage) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var _options$destination = options.destination;
  var destination = _options$destination === undefined ? util.sanitize(npmPackage) : _options$destination;
  var _options$overwrite = options.overwrite;
  var overwrite = _options$overwrite === undefined ? false : _options$overwrite;


  if (!npmPackage) util.error();
  var destinationPath = path.join(process.cwd(), 'node_modules', destination);
  if (!overwrite && util.directoryExists(destinationPath)) {
    return console.log('Directory at ' + destinationPath + ' already exists, skipping');
  }

  var errored = false;
  try {
    (function () {
      // make temp install dir
      shelljs.rm('-rf', TEMP);
      shelljs.mkdir('-p', path.join(TEMP, 'node_modules'));

      // install package to temp dir
      var installOptions = {
        cwd: TEMP,
        stdio: [null, null, null]
      };
      childProcess.spawnSync('npm', ['install', npmPackage], installOptions);

      // get real package name
      var packageName = util.getPackageName(npmPackage);

      // move deps inside package
      shelljs.mkdir(path.join(TEMP, 'node_modules', packageName, 'node_modules'));
      shelljs.ls(path.join(TEMP, 'node_modules')).forEach(function (dep) {
        if (dep === packageName) return;
        var from = path.join(TEMP, 'node_modules', dep).toString();
        var to = path.join(TEMP, 'node_modules', packageName, 'node_modules', dep).toString();
        shelljs.mv(from, to);
      });

      // copy to node_modules/
      shelljs.rm('-rf', destinationPath);
      shelljs.mv(path.join(TEMP, 'node_modules', packageName), destinationPath);

      console.log('Installed ' + npmPackage + ' to ' + destinationPath);
    })();
  } catch (err) {
    errored = true;
    console.log('Error installing ' + npmPackage);
    console.log(err.toString());
  } finally {
    // clean up temp install dir
    shelljs.rm('-rf', TEMP);

    if (errored) process.exit(1);
  }
}

module.exports = install;