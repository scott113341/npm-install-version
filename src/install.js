const childProcess = require('child_process');
const path = require('path');
const shelljs = require('shelljs');

const util = require('./util.js');

const CWD = process.cwd();
const TEMP = path.join(CWD, 'node_modules', '.npm-install-version-temp');

function install (npmPackage, options = {}) {
  const {
    destination = util.sanitize(npmPackage),
    overwrite = false,
    quiet = false
  } = options;

  const log = quiet ? () => {} : (...args) => console.log(...args);

  if (!npmPackage) util.error();
  const destinationPath = path.join(CWD, 'node_modules', destination);
  if (!overwrite && util.directoryExists(destinationPath)) {
    return log(`Directory at ${destinationPath} already exists, skipping`);
  }

  let errored = false;
  try {
    // make temp install dir
    shelljs.rm('-rf', TEMP);
    shelljs.mkdir('-p', path.join(TEMP, 'node_modules'));

    // copy local .npmrc file if exists
    const npmrcFile = path.join(CWD, '.npmrc');
    if (shelljs.test('-f', npmrcFile)) {
      shelljs.cp(npmrcFile, TEMP);
    }

    // install package to temp dir
    const installOptions = {
      cwd: TEMP,
      stdio: [null, null, null]
    };
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    childProcess.spawnSync(command, ['install', npmPackage], installOptions);

    // get real package name
    const packageName = util.getPackageName(npmPackage);

    // move deps inside package
    shelljs.mkdir('-p', path.join(TEMP, 'node_modules', packageName, 'node_modules'));
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

    log(`Installed ${npmPackage} to ${destinationPath}`);
  } catch (err) {
    errored = true;
    console.error(`Error installing ${npmPackage}`);
    console.error(err.toString());
  } finally {
    // clean up temp install dir
    shelljs.rm('-rf', TEMP);

    if (errored) process.exit(1);
  }
}

module.exports = install;
