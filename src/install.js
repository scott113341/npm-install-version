const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');

const { alreadyInstalled, error, sanitize } = require('./util.js');


const TEMP = path.join('node_modules', '.npm-install-version-temp');


function install(npmPackage, options={}) {
  const {
    destination = sanitize(npmPackage),
    overwrite = false,
    cmd = 'npm',
  } = options;

  if (!npmPackage) error();
  const destinationPath = path.join('node_modules', destination);
  if (!overwrite && alreadyInstalled(destinationPath)) {
    return console.log(`Directory ${destinationPath} already exists, skipping`);
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
    childProcess.spawnSync(cmd, ['install', npmPackage], installOptions);

    // copy to node_modules/
    shelljs.rm('-rf', destinationPath);
    const name = fs.readdirSync(path.join(TEMP, 'node_modules'))[0];
    shelljs.mv(path.join(TEMP, 'node_modules', name), destinationPath);

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
