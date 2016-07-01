'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var fs = require('fs');
var test = require('tape');

var niv = require('../index.js');

var _require = require('./test-util.js');

var clean = _require.clean;


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