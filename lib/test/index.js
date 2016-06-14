'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var execSync = require('child_process').execSync;
var fs = require('fs');
var test = require('tape');
var niv = require('../index.js');

execSync('./node_modules/.bin/shx rm -rf node_modules/csjs*');

test('niv#install normal', function (t) {
  niv.install('csjs@1.0.0');
  var packageJson = fs.readFileSync('node_modules/csjs@1.0.0/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});

test('niv#install remote', function (t) {
  niv.install('scott113341/csjs#extract-extends-performance');
  var packageJson = fs.readFileSync('node_modules/scott113341-csjs#extract-extends-performance/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.4');
  t.end();
});

test('niv#require normal', function (t) {
  niv.install('csjs@1.0.0');
  var csjs = niv.require('csjs@1.0.0');
  t.assert(typeof csjs === 'undefined' ? 'undefined' : _typeof(csjs), 'function');
  t.end();
});

test('niv#require remote', function (t) {
  niv.install('scott113341/csjs#extract-extends-performance');
  var csjs = niv.require('scott113341/csjs#extract-extends-performance');
  t.assert(typeof csjs === 'undefined' ? 'undefined' : _typeof(csjs), 'function');
  t.end();
});