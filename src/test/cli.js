const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const test = require('tape');

const { clean } = require('./test-util.js');


const CLI_PATH = path.join(__dirname, '..', 'cli.js');
function run(command) {
  execSync(`${CLI_PATH} ${command}`, { stdio:[0,1,2] });
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


test('cli install w/ destination', t => {
  clean();
  run('csjs@1.0.0 --destination=csjs@yolo');
  const packageJson = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});


test('cli install w/o overwrite', t => {
  clean();
  run('csjs@1.0.0 --destination=csjs@yolo');
  const packageJson1 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson1).version, '1.0.0');

  run('csjs@1.0.1 --destination=csjs@yolo');
  const packageJson2 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson2).version, '1.0.0');

  t.end();
});


test('cli install w/ overwrite', t => {
  clean();
  run('csjs@1.0.0 --destination=csjs@yolo');
  const packageJson1 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson1).version, '1.0.0');

  run('csjs@1.0.1 --destination=csjs@yolo --overwrite');
  const packageJson2 = fs.readFileSync('node_modules/csjs@yolo/package.json');
  t.equal(JSON.parse(packageJson2).version, '1.0.1');

  t.end();
});


test('cli help', t => {
  clean();
  const out = execSync(`${CLI_PATH} --help`).toString();
  t.equal(out.indexOf('usage: niv <package> [options...]'), 0);
  t.equal(out.length > 100, true);
  t.end();
});


test('cli no package', t => {
  clean();
  t.plan(2);
  try {
    execSync(`${CLI_PATH}`);
  }
  catch (e) {
    const out = e.stdout.toString();
    t.equal(out.indexOf('usage: niv <package> [options...]'), 0);
    t.equal(out.length > 100, true);
  }
});
