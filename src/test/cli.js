const spawnSync = require('child_process').spawnSync;
const fs = require('fs');
const path = require('path');
const test = require('tape');

const { clean } = require('./test-util.js');

const CLI_PATH = path.join(__dirname, '..', 'cli.js');
function run (...commands) {
  spawnSync(CLI_PATH, commands, { stdio: [0, 1, 2] });
}

test('cli install normal', t => {
  clean();
  run('csjs@1.0.0');
  const packageJson = fs.readFileSync('node_modules/csjs@1.0.0/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});

test('cli install remote', t => {
  clean();
  run('scott113341/csjs#extract-extends-performance');
  const packageJson = fs.readFileSync('node_modules/scott113341-csjs#extract-extends-performance/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.4');
  t.end();
});

test('cli install scoped', t => {
  clean();
  run('@scott113341/niv-scoped-test@1.0.0');
  const packageJson = fs.readFileSync('node_modules/@scott113341-niv-scoped-test@1.0.0/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});

test('cli install w/ dependencies', t => {
  clean();
  run('push-dir@0.2.2');
  const packageJson = fs.readFileSync('node_modules/push-dir@0.2.2/package.json');
  t.equal(JSON.parse(packageJson).version, '0.2.2');
  t.end();
});

test('cli install w/ destination', t => {
  clean();
  run('csjs@1.0.0', '--destination=csjs@yolo');
  const packageJson = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});

test('cli install w/o overwrite', t => {
  clean();
  run('csjs@1.0.0', '--destination=csjs@yolo');
  const packageJson1 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson1).version, '1.0.0');

  run('csjs@1.0.1', '--destination=csjs@yolo');
  const packageJson2 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson2).version, '1.0.0');

  t.end();
});

test('cli install w/ overwrite', t => {
  clean();
  run('csjs@1.0.0', '--destination=csjs@yolo');
  const packageJson1 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson1).version, '1.0.0');

  run('csjs@1.0.1', '--destination=csjs@yolo', '--overwrite');
  const packageJson2 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson2).version, '1.0.1');

  t.end();
});

test('cli help', t => {
  clean();
  const out = spawnSync(CLI_PATH, ['--help']);
  const stdout = out.stdout.toString();
  t.equal(out.status, 0);
  t.equal(stdout.indexOf('usage: niv <package> [options...]'), 0);
  t.equal(stdout.length > 100, true);
  t.end();
});

test('cli no package', t => {
  clean();
  const out = spawnSync(CLI_PATH);
  const stderr = out.stderr.toString();
  t.equal(out.status, 1);
  t.equal(stderr.indexOf('usage: niv <package> [options...]'), 0);
  t.equal(stderr.length > 100, true);
  t.end();
});
