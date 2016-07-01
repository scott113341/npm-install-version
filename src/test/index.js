const execSync = require('child_process').execSync;
const fs = require('fs');
const test = require('tape');
const niv = require('../index.js');


function clean() {
  execSync(`./node_modules/.bin/shx rm -rf node_modules/csjs* node_modules/scott113341*`);
}


test('niv.install normal', t => {
  clean();
  niv.install('csjs@1.0.0');
  const packageJson = fs.readFileSync('node_modules/csjs@1.0.0/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});

test('niv.install remote', t => {
  clean();
  niv.install('scott113341/csjs#extract-extends-performance');
  const packageJson = fs.readFileSync('node_modules/scott113341-csjs#extract-extends-performance/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.4');
  t.end();
});


test('niv.require normal', t => {
  clean();
  niv.install('csjs@1.0.0');
  const csjs = niv.require('csjs@1.0.0');
  t.assert(typeof csjs, 'function');
  t.end();
});

test('niv.require remote', t => {
  clean();
  niv.install('scott113341/csjs#extract-extends-performance');
  const csjs = niv.require('scott113341/csjs#extract-extends-performance');
  t.assert(typeof csjs, 'function');
  t.end();
});

test('niv.require w/ destination', t => {
  clean();
  niv.install('scott113341/csjs#extract-extends-performance', { destination: 'csjs@yolo' });
  const csjs = niv.require('csjs@yolo');
  t.assert(typeof csjs, 'function');
  t.end();
});


test('niv.install w/ destination', t => {
  clean();
  niv.install('csjs@1.0.0', { destination: 'csjs@yolo' });
  const packageJson = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});


test('niv.install w/o overwrite', t => {
  clean();
  niv.install('csjs@1.0.0', { destination: 'csjs@yolo' });
  const packageJson1 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson1).version, '1.0.0');

  niv.install('csjs@1.0.1', { destination: 'csjs@yolo' });
  const packageJson2 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson2).version, '1.0.0');

  t.end();
});

test('niv.install w/ overwrite', t => {
  clean();
  niv.install('csjs@1.0.0', { destination: 'csjs@yolo' });
  const packageJson1 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson1).version, '1.0.0');

  niv.install('csjs@1.0.1', { destination: 'csjs@yolo', overwrite: true });
  const packageJson2 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson2).version, '1.0.1');

  t.end();
});
