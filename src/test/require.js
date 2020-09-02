const test = require('tape');

const niv = require('../index.js');
const { clean } = require('./test-util.js');

test('niv.require normal', t => {
  clean();
  niv.install('csjs@1.0.0').then(() => {
    const csjs = niv.require('csjs@1.0.0');
    t.assert(typeof csjs, 'function');
    t.end();
  }, err => t.end(err));
});

test('niv.require remote', t => {
  clean();
  niv.install('scott113341/csjs#extract-extends-performance').then(() => {
    const csjs = niv.require('scott113341/csjs#extract-extends-performance');
    t.assert(typeof csjs, 'function');
    t.end();
  }, err => t.end(err));
});

test('niv.require scoped', t => {
  clean();
  niv.install('@scott113341/niv-scoped-test@1.0.0').then(() => {
    const pkg = niv.require('@scott113341/niv-scoped-test@1.0.0');
    t.assert(typeof pkg.addNumbers, 'function');
    t.end();
  }, err => t.end(err));
});

test('niv.require w/ destination', t => {
  clean();
  niv.install('scott113341/csjs#extract-extends-performance', { destination: 'csjs@yolo' }).then(() => {
    const csjs = niv.require('csjs@yolo');
    t.assert(typeof csjs, 'function');
    t.end();
  }, err => t.end(err));
});

test('niv.require path', t => {
  clean();
  niv.install('@scott113341/niv-scoped-test@1.0.0').then(() => {
    const packageJson = niv.require('@scott113341/niv-scoped-test@1.0.0', "package.json");
    t.assert(packageJson.name = '@scott113341/niv-scoped-test');
    t.end();
  }, err => t.end(err));
});
