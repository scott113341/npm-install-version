'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var execSync = require('child_process').execSync;
var fs = require('fs');
var test = require('tape');
var niv = require('../index.js');

function clean() {
  execSync('./node_modules/.bin/shx rm -rf node_modules/csjs* node_modules/scott113341*');
}

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

test('niv.require normal', function (t) {
  clean();
  niv.install('csjs@1.0.0');
  var csjs = niv.require('csjs@1.0.0');
  t.assert(typeof csjs === 'undefined' ? 'undefined' : _typeof(csjs), 'function');
  t.end();
});

test('niv.require remote', function (t) {
  clean();
  niv.install('scott113341/csjs#extract-extends-performance');
  var csjs = niv.require('scott113341/csjs#extract-extends-performance');
  t.assert(typeof csjs === 'undefined' ? 'undefined' : _typeof(csjs), 'function');
  t.end();
});

test('niv.require w/ destination', function (t) {
  clean();
  niv.install('scott113341/csjs#extract-extends-performance', { destination: 'csjs@yolo' });
  var csjs = niv.require('csjs@yolo');
  t.assert(typeof csjs === 'undefined' ? 'undefined' : _typeof(csjs), 'function');
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