const execSync = require('child_process').execSync;
const fs = require('fs');
const test = require('tape');
const niv = require('../index.js');


execSync(`./node_modules/.bin/shx rm -rf node_modules/csjs*`);


test('niv#install normal', t => {
  niv.install('csjs@1.0.0');
  const packageJson = fs.readFileSync('node_modules/csjs@1.0.0/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});

test('niv#install remote', t => {
  niv.install('scott113341/csjs#extract-extends-performance');
  const packageJson = fs.readFileSync('node_modules/scott113341-csjs#extract-extends-performance/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.4');
  t.end();
});


test('niv#require normal', t => {
  niv.install('csjs@1.0.0');
  const csjs = niv.require('csjs@1.0.0');
  t.assert(typeof csjs, 'function');
  t.end();
});

test('niv#require remote', t => {
  niv.install('scott113341/csjs#extract-extends-performance');
  const csjs = niv.require('scott113341/csjs#extract-extends-performance');
  t.assert(typeof csjs, 'function');
  t.end();
});
