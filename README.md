# npm-install-version

[![npm-version][npm-version-badge]][npm-version-href]
[![build-status][build-status-badge]][build-status-href]
[![dependencies][dependencies-badge]][dependencies-href]
[![dev-dependencies][dev-dependencies-badge]][dev-dependencies-href]


Install node modules to versioned or custom directories.


## CLI Usage

Install globally: `npm install npm-install-version -g`

```usage
usage: niv <package> [options...]

required:
  
  package
    the package to be installed
    gets passed directly to "npm install <package>"

optional:
  
  --destination, -d
    the destination install directory inside node_modules/
    default: sanitized <package>
  
  --overwrite, -o
    overwrite if there is already a package at [destination]
    default: false
  
  --help, -h
    display this message
```


## Programmatic Usage

Install locally: `npm install npm-install-version --save-dev`

```javascript
const niv = require('npm-install-version');
const fs = require('fs');

niv.install('csjs@1.0.0');
const packageJson = JSON.parse(fs.readFileSync('node_modules/csjs@1.0.0/package.json'));
console.log(packageJson.version);
// "1.0.0"

niv.install('csjs@1.0.0', { directory: 'some-dir' });
// installs csjs@1.0.0 to node_modules/some-dir/

niv.install('csjs@1.0.0', { directory: 'some-dir' });
// doesn't do anything because node_modules/some-dir/ already exists

niv.install('csjs@1.0.0', { directory: 'some-dir', overwrite: true });
// removes node_modules/some-dir/ then installs csjs@1.0.0 to node_modules/some-dir/
```


[npm-version-badge]: https://img.shields.io/npm/v/npm-install-version.svg?style=flat-square
[npm-version-href]: https://www.npmjs.com/package/npm-install-version

[build-status-badge]: https://img.shields.io/travis/scott113341/npm-install-version/master.svg?style=flat-square
[build-status-href]: https://travis-ci.org/scott113341/npm-install-version/branches

[dependencies-badge]: https://img.shields.io/david/scott113341/npm-install-version.svg?style=flat-square
[dependencies-href]: https://david-dm.org/scott113341/npm-install-version#info=dependencies

[dev-dependencies-badge]: https://img.shields.io/david/dev/scott113341/npm-install-version.svg?style=flat-square
[dev-dependencies-href]: https://david-dm.org/scott113341/npm-install-version#info=devDependencies
