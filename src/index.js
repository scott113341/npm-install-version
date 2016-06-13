#!/usr/bin/env node

const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const [npmPackage, destinationOverride] = args;
if (!npmPackage) error();

const shx = './node_modules/.bin/shx';
const tempDir = './.npm-install-version-temp';
var caughtError = false;


try {
  // make temp install dir
  execSync(`${shx} rm -rf ${tempDir}/`);
  execSync(`${shx} mkdir -p ${tempDir}/node_modules/`);

  // install package to temp dir
  const installOptions = {
    cwd: tempDir,
    stdio: [null, null, null],
  };
  execSync(`npm install ${npmPackage}`, installOptions);

  // copy to node_modules/
  const destination = destinationOverride || npmPackage;
  execSync(`${shx} rm -rf node_modules/${destination}`);
  const name = fs.readdirSync(`${tempDir}/node_modules/`)[0];
  execSync(`${shx} mv ${tempDir}/node_modules/${name} node_modules/${destination}`);

  console.log(`Installed ${name} from ${npmPackage} to node_modules/${destination}/`);
}
catch (err) {
  caughtError = true;
  console.log(`Error installing ${npmPackage}`);
  console.log(err.toString());
}
finally {
  // clean up temp install dir
  execSync(`${shx} rm -rf ${tempDir}`);

  if (caughtError) process.exit(1);
}


function error() {
  throw Error('You must specify an install target like this: csjs@1.0.0');
}
