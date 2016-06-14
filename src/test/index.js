const fs = require('fs');
const test = require('tape');

const niv = require('../index.js');


test('niv#install', t => {
  niv.install('csjs@1.0.0');
  const packageJson = fs.readFileSync('node_modules/csjs@1.0.0/package.json');
  t.equal(JSON.parse(packageJson).version, '1.0.0');
  t.end();
});
