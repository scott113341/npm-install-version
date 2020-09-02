const childProcess = require('child_process');
const path = require('path');
const fse = require("fs-extra");

const util = require('./util.js');

const CWD = process.cwd();
const TEMP = path.join(CWD, 'niv_modules', '.npm-install-version-temp' + Math.random());

function install (npmPackage, options = {}) {
  const {
    destination = util.sanitize(npmPackage),
    overwrite = false,
    quiet = false
  } = options;

  const log = quiet ? () => {} : (...args) => console.log(...args);

  if (!npmPackage) util.error();
  const destinationPath = path.join(CWD, 'niv_modules', destination);
  if (!overwrite && util.directoryExists(destinationPath)) {
    return log(`Directory at ${destinationPath} already exists, skipping`);
  }

  // get real package name
  let packageName;
  
  return util.getPackageName(npmPackage)
    .then(function(result) {
      packageName = result;
    })
    .then(() => fse.remove(TEMP))
    // make temp install dir
    .then(() => fse.mkdirs(path.join(TEMP, 'node_modules')))

    // copy local .npmrc file if exists
    .then(() => fse.pathExists(path.join(CWD, '.npmrc')))
    .then((npmrcExists) => {
      if (npmrcExists) {
        return fse.copy(path.join(CWD, '.npmrc'), path.join(TEMP, ".npmrc"))
      }
    })

    // install package to temp dir
    .then(() => {
      const installOptions = {
        cwd: TEMP,
        stdio: [null, null, null]
      };
      const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';

      return new Promise((resolve, reject) => {
        const ps = childProcess.exec([command, 'install', npmPackage].join(" "), installOptions);

        ps.stdout.on("data", (data) => log(data));
        ps.stderr.on("data", (data) => log(data));
        ps.on("close", (code) => {
            if(code !== 0) {
              return reject(`npm install process exited with code ${code}`)
            }
            resolve();
          });
      });
    })

    // move deps inside package
    .then(() => fse.mkdirs(path.join(TEMP, 'node_modules', packageName, 'node_modules')))
    .then(() => {
      const from = path.join(TEMP, 'node_modules');
      const to = path.join(TEMP, 'node_modules', packageName, 'node_modules');
      const filterRegex = new RegExp("^" + path.join(TEMP, 'node_modules', packageName));
      const filter = (src, dest) => {
        return !src.match(filterRegex);
      }

      return fse.copy(from, to, { filter });
    })

    // copy to niv_modules/
    .then(() => fse.remove(destinationPath))
    .then(() => fse.move(path.join(TEMP, 'node_modules', packageName), destinationPath))

    // cleanup
    .then(() => fse.remove(TEMP))
    .then(
      () => log(`Installed ${npmPackage} to ${destinationPath}`),
      error => {
        console.error(`Error installing ${npmPackage}`);
        console.error(error.toString());

        throw Error(`Error installing ${npmPackage}`);
      }
    );
}

module.exports = install;
