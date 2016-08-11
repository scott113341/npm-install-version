const childProcess = require('child_process');
const fs = require('fs-extra');
const path = require('path');
const shelljs = require('shelljs');

const util = require('./util.js');


const TEMP = path.join(process.cwd(), 'node_modules', '.npm-install-version-temp');


function install(npmPackage, options={}) {
  const {
    destination = util.sanitize(npmPackage),
    overwrite = false,
  } = options;

  if (!npmPackage) util.error();
  const destinationPath = path.join(process.cwd(), 'node_modules', destination);
  if (!overwrite && util.directoryExists(destinationPath)) {
    return console.log(`Directory at ${destinationPath} already exists, skipping`);
  }

  var errored = false;
  try {
    // make temp install dir
    shelljs.rm('-rf', TEMP);
    shelljs.mkdir('-p', path.join(TEMP, 'node_modules'));

    // install package to temp dir
    const installOptions = {
      cwd: TEMP,
      stdio: [null, null, null],
    };
    childProcess.spawnSync('npm', ['install', npmPackage], installOptions);

    // get real package name
    const packageName = util.getPackageName(npmPackage);

    // move deps inside package
    shelljs.mkdir(path.join(TEMP, 'node_modules', packageName, 'node_modules'));
    shelljs.ls(path.join(TEMP, 'node_modules'))
      .forEach(dep => {
        if (dep === packageName) return;
        const from = path.join(TEMP, 'node_modules', dep).toString();
        const to = path.join(TEMP, 'node_modules', packageName, 'node_modules', dep).toString();
        shelljs.mv(from, to);
      });

    // copy to node_modules/
    shelljs.rm('-rf', destinationPath);
    shelljs.mv(path.join(TEMP, 'node_modules', packageName), destinationPath);

    console.log(`Installed ${npmPackage} to ${destinationPath}`);
  }
  catch (err) {
    errored = true;
    console.log(`Error installing ${npmPackage}`);
    console.log(err.toString());
  }
  finally {
    // clean up temp install dir
    shelljs.rm('-rf', TEMP);

    if (errored) process.exit(1);
  }
}


module.exports = install;
