const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

const { alreadyInstalled, error, sanitize } = require('./util.js');

const SHX = 'node node_modules/.bin/shx';
const TEMP = 'node_modules/.npm-install-version-temp';


function install(npmPackage, destination, overwrite=false) {
  if (!npmPackage) error();
  destination = `node_modules/${destination || sanitize(npmPackage)}`;
  if (!overwrite && alreadyInstalled(destination)) {
    return console.log(`Directory ${destination} already exists, skipping`);
  }

  var errored = false;
  try {
    // make temp install dir
    execSync(`${SHX} rm -rf ${TEMP}/`);
    execSync(`${SHX} mkdir -p ${TEMP}/node_modules/`);

    // install package to temp dir
    const installOptions = {
      cwd: TEMP,
      stdio: [null, null, null],
    };
    execSync(`npm install ${npmPackage}`, installOptions);

    // copy to node_modules/
    execSync(`${SHX} rm -rf ${destination}`);
    const name = fs.readdirSync(`${TEMP}/node_modules/`)[0];
    execSync(`${SHX} mv ${TEMP}/node_modules/${name} ${destination}`);

    console.log(`Installed ${npmPackage} to ${destination}`);
  }
  catch (err) {
    errored = true;
    console.log(`Error installing ${npmPackage}`);
    console.log(err.toString());
  }
  finally {
    // clean up temp install dir
    execSync(`${SHX} rm -rf ${TEMP}`);

    if (errored) process.exit(1);
  }
}


function requirePackage(npmPackage) {
  return require(sanitize(npmPackage));
}


module.exports = {
  install,
  require: requirePackage,
};
