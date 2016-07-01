'use strict';

var fs = require('fs');
var test = require('tape');

var niv = require('../index.js');

var _require = require('./test-util.js');

var clean = _require.clean;

// left intentionally blank
// so this lines up with cli.js

test('niv.install normal', function (t) {
  clean();
  niv.install('csjs@1.0.0');
  var packageJson = fs.readFileSync('node_modules/csjs@1.0.0/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});

test('niv.install remote', function (t) {
  clean();
  niv.install('scott113341/csjs#extract-extends-performance');
  var packageJson = fs.readFileSync('node_modules/scott113341-csjs#extract-extends-performance/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.4');
  t.end();
});

test('niv.install w/ destination', function (t) {
  clean();
  niv.install('csjs@1.0.0', { destination: 'csjs@yolo' });
  var packageJson = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});

test('niv.install w/o overwrite', function (t) {
  clean();
  niv.install('csjs@1.0.0', { destination: 'csjs@yolo' });
  var packageJson1 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson1).version, '1.0.0');

  niv.install('csjs@1.0.1', { destination: 'csjs@yolo' });
  var packageJson2 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson2).version, '1.0.0');

  t.end();
});

test('niv.install w/ overwrite', function (t) {
  clean();
  niv.install('csjs@1.0.0', { destination: 'csjs@yolo' });
  var packageJson1 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson1).version, '1.0.0');

  niv.install('csjs@1.0.1', { destination: 'csjs@yolo', overwrite: true });
  var packageJson2 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson2).version, '1.0.1');

  t.end();
});