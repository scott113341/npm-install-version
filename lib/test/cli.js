'use strict';

var execSync = require('child_process').execSync;
var fs = require('fs');
var path = require('path');
var test = require('tape');

var _require = require('./test-util.js');

var clean = _require.clean;


var CLI_PATH = path.join(__dirname, '..', 'cli.js');
function run(command) {
  execSync(CLI_PATH + ' ' + command, { stdio: [0, 1, 2] });
}

test('cli install normal', function (t) {
  clean();
  run('csjs@1.0.0');
  var packageJson = fs.readFileSync('node_modules/csjs@1.0.0/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});

test('cli install remote', function (t) {
  clean();
  run('scott113341/csjs#extract-extends-performance');
  var packageJson = fs.readFileSync('node_modules/scott113341-csjs#extract-extends-performance/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.4');
  t.end();
});

test('cli install w/ destination', function (t) {
  clean();
  run('csjs@1.0.0 --destination=csjs@yolo');
  var packageJson = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});

test('cli install w/o overwrite', function (t) {
  clean();
  run('csjs@1.0.0 --destination=csjs@yolo');
  var packageJson1 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson1).version, '1.0.0');

  run('csjs@1.0.1 --destination=csjs@yolo');
  var packageJson2 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson2).version, '1.0.0');

  t.end();
});

test('cli install w/ overwrite', function (t) {
  clean();
  run('csjs@1.0.0 --destination=csjs@yolo');
  var packageJson1 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson1).version, '1.0.0');

  run('csjs@1.0.1 --destination=csjs@yolo --overwrite');
  var packageJson2 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson2).version, '1.0.1');

  t.end();
});

test('cli help', function (t) {
  clean();
  var out = execSync(CLI_PATH + ' --help').toString();
  t.equal(out.indexOf('usage: niv <package> [options...]'), 0);
  t.equal(out.length > 100, true);
  t.end();
});

test('cli no package', function (t) {
  clean();
  t.plan(2);
  try {
    execSync('' + CLI_PATH);
  } catch (e) {
    var out = e.stdout.toString();
    t.equal(out.indexOf('usage: niv <package> [options...]'), 0);
    t.equal(out.length > 100, true);
  }
});