#!/usr/bin/env node

const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const [target, as] = args;
if (!target) error();

const name = target.split('@').slice(0, -1).join('@');
const version = target.split('@').slice(-1).join('@');
if (!name) error();
if (!version) error();

const shx = './node_modules/.bin/shx';
const tempDir = './.npm-install-version-temp';


try {
  // make temp install dir
  execSync(`${shx} rm -rf ${tempDir}/`);
  execSync(`${shx} mkdir -p ${tempDir}/node_modules/`);

  // install package to temp dir
  const installOptions = {
    cwd: tempDir,
    stdio: [null, null, null],
  };
  execSync(`npm install ${target}`, installOptions);

  // copy to node_modules/
  const destination = as ? `${name}@${as}` : target;
  execSync(`${shx} rm -rf node_modules/${destination}`);
  execSync(`${shx} mv ${tempDir}/node_modules/${name} node_modules/${destination}`);

  console.log(`Installed ${target} to node_modules/${destination}/`);
}
catch (err) {}
finally {
  // clean up temp install dir
  execSync(`${shx} rm -rf ${tempDir}`);
}


function error() {
  throw Error('You must specify an install target like this: csjs@1.0.0');
}
