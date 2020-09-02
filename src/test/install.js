const fs = require('fs');
const test = require('tape');

const niv = require('../index.js');
const { clean } = require('./test-util.js');

// TODO: Test cleanup & test dependencies

test('niv.install normal', t => {
  clean();

  niv.install('csjs@1.0.0').then(() => {
    const packageJson = fs.readFileSync('niv_modules/csjs@1.0.0/package.json');
    t.equal(JSON.parse(packageJson).version, '1.0.0');
    t.end();
  }, function(err) {
    t.end(err);
  })
});

test('niv.install remote', t => {
  clean();

  niv.install('scott113341/csjs#extract-extends-performance').then(() => {
    const packageJson = fs.readFileSync('niv_modules/scott113341-csjs#extract-extends-performance/package.json');
    t.equal(JSON.parse(packageJson).version, '1.0.4');
    t.end();
  }, error => t.end(error));
});

test('niv.install scoped', t => {
  clean();

  niv.install('@scott113341/niv-scoped-test@1.0.0').then(() => {
    const packageJson = fs.readFileSync('niv_modules/@scott113341-niv-scoped-test@1.0.0/package.json');
    t.equal(JSON.parse(packageJson).version, '1.0.0');
    t.end();
  }, error => t.end(error));
});

test('niv.install w/ dependencies', t => {
  clean();

  niv.install('push-dir@0.2.2').then(() => {
    const packageJson = fs.readFileSync('niv_modules/push-dir@0.2.2/package.json');
    t.equal(JSON.parse(packageJson).version, '0.2.2');
    t.end();
  }, error => t.end(error));
});

test('niv.install w/ destination', t => {
  clean();

  niv.install('csjs@1.0.0', { destination: 'csjs@yolo' }).then(() => {
    const packageJson = fs.readFileSync('niv_modules/csjs@yolo/package.json');
    t.equal(JSON.parse(packageJson).version, '1.0.0');
    t.end();
  }, error => t.end(error));
});

test('niv.install w/o overwrite', t => {
  clean();

  niv.install('csjs@1.0.0', { destination: 'csjs@yolo' })
    .then(() => {
      const packageJson1 = fs.readFileSync('niv_modules/csjs@yolo/package.json');
      t.equal(JSON.parse(packageJson1).version, '1.0.0');
    })
    .then(() => niv.install('csjs@1.0.1', { destination: 'csjs@yolo' }))
    .then(() => {
      const packageJson2 = fs.readFileSync('niv_modules/csjs@yolo/package.json');
      t.equal(JSON.parse(packageJson2).version, '1.0.0');
      t.end();
    }, error => t.end(error));
});

test('niv.install w/ overwrite', t => {
  clean();

  niv.install('csjs@1.0.0', { destination: 'csjs@yolo' })
    .then(() => {
      const packageJson1 = fs.readFileSync('niv_modules/csjs@yolo/package.json');
      t.equal(JSON.parse(packageJson1).version, '1.0.0');
    })
    .then(() => niv.install('csjs@1.0.1', { destination: 'csjs@yolo', overwrite: true }))
    .then(() => {
      const packageJson2 = fs.readFileSync('niv_modules/csjs@yolo/package.json');
      t.equal(JSON.parse(packageJson2).version, '1.0.1');
      t.end();
    }, error => t.end(error));
});
