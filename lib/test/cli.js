'use strict';

var spawnSync = require('child_process').spawnSync;
var fs = require('fs');
var path = require('path');
var test = require('tape');

var _require = require('./test-util.js');

var clean = _require.clean;


var CLI_PATH = path.join(__dirname, '..', 'cli.js');
function run() {
  for (var _len = arguments.length, commands = Array(_len), _key = 0; _key < _len; _key++) {
    commands[_key] = arguments[_key];
  }

  spawnSync(CLI_PATH, commands, { stdio: [0, 1, 2] });
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

test('cli install scoped', function (t) {
  clean();
  run('@scott113341/niv-scoped-test@1.0.0');
  var packageJson = fs.readFileSync('node_modules/@scott113341-niv-scoped-test@1.0.0/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});

test('cli install w/ dependencies', function (t) {
  clean();
  run('push-dir@0.2.2');
  var packageJson = fs.readFileSync('node_modules/push-dir@0.2.2/package.json');
  t.equal(JSON.parse(packageJson).version, '0.2.2');
  t.end();
});

test('cli install w/ destination', function (t) {
  clean();
  run('csjs@1.0.0', '--destination=csjs@yolo');
  var packageJson = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});

test('cli install w/o overwrite', function (t) {
  clean();
  run('csjs@1.0.0', '--destination=csjs@yolo');
  var packageJson1 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson1).version, '1.0.0');

  run('csjs@1.0.1', '--destination=csjs@yolo');
  var packageJson2 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson2).version, '1.0.0');

  t.end();
});

test('cli install w/ overwrite', function (t) {
  clean();
  run('csjs@1.0.0', '--destination=csjs@yolo');
  var packageJson1 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson1).version, '1.0.0');

  run('csjs@1.0.1', '--destination=csjs@yolo', '--overwrite');
  var packageJson2 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson2).version, '1.0.1');

  t.end();
});

test('cli help', function (t) {
  clean();
  var out = spawnSync(CLI_PATH, ['--help']);
  var stdout = out.stdout.toString();
  t.equal(out.status, 0);
  t.equal(stdout.indexOf('usage: niv <package> [options...]'), 0);
  t.equal(stdout.length > 100, true);
  t.end();
});

test('cli no package', function (t) {
  clean();
  var out = spawnSync(CLI_PATH);
  var stderr = out.stderr.toString();
  t.equal(out.status, 1);
  t.equal(stderr.indexOf('usage: niv <package> [options...]'), 0);
  t.equal(stderr.length > 100, true);
  t.end();
});