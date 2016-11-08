const fs = require('fs');
const test = require('tape');

const niv = require('../index.js');
const { clean } = require('./test-util.js');

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

test('niv.install scoped', t => {
  clean();
  niv.install('@scott113341/niv-scoped-test@1.0.0');
  const packageJson = fs.readFileSync('node_modules/@scott113341-niv-scoped-test@1.0.0/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});

test('niv.install w/ dependencies', t => {
  clean();
  niv.install('push-dir@0.2.2');
  const packageJson = fs.readFileSync('node_modules/push-dir@0.2.2/package.json');
  t.equal(JSON.parse(packageJson).version, '0.2.2');
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
