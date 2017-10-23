const test = require('tape');
const fs = require("fs");

const niv = require('../index.js');
const { clean, tryCatchOptimizer } = require('./test-util.js');

test('niv.uninstall normal', t => {
  clean();
  niv.install('csjs@1.0.0');
  const csjs = niv.require('csjs@1.0.0');
  t.assert(typeof csjs, 'function');
  niv.uninstall('csjs@1.0.0');
  t.throws(fs.readFileSync.bind(this, 'niv_modules/csjs@yolo/package.json'), /ENOENT/, "Should throw ENOENT error.");
  t.end();
});

test('niv.uninstall remote', t => {
  clean();
  niv.install('scott113341/csjs#extract-extends-performance');
  const csjs = niv.require('scott113341/csjs#extract-extends-performance');
  t.assert(typeof csjs, 'function');
  niv.uninstall('scott113341/csjs#extract-extends-performance');
  t.throws(fs.readFileSync.bind(this, 'scott113341/csjs#extract-extends-performance'), /ENOENT/, "Should throw ENOENT error.");
  t.end();
});

test('niv.uninstall scoped', t => {
  clean();
  niv.install('@scott113341/niv-scoped-test@1.0.0');
  const pkg = niv.require('@scott113341/niv-scoped-test@1.0.0');
  t.assert(typeof pkg.addNumbers, 'function');
  niv.uninstall('@scott113341/niv-scoped-test@1.0.0');
  t.throws(fs.readFileSync.bind(this, '@scott113341/niv-scoped-test@1.0.0'), /ENOENT/, "Should throw ENOENT error.");
  t.end();
});

test('niv.uninstall w/ destination', t => {
  clean();
  niv.install('scott113341/csjs#extract-extends-performance', { destination: 'csjs@yolo' });
  const csjs = niv.require('csjs@yolo');
  t.assert(typeof csjs, 'function');
  niv.uninstall('csjs@yolo');
  t.throws(fs.readFileSync.bind(this, 'csjs@yolo'), /ENOENT/, "Should throw ENOENT error.");
  t.end();
});
