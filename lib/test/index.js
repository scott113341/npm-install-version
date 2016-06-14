'use strict';

var fs = require('fs');
var test = require('tape');

var niv = require('../index.js');

test('niv#install', function (t) {
  niv.install('csjs@1.0.0');
  var packageJson = fs.readFileSync('node_modules/csjs@1.0.0/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});