# npm-install-version

[![npm-version][npm-version-badge]][npm-version-href]
[![build-status][build-status-badge]][build-status-href]
[![dependencies][dependencies-badge]][dependencies-href]
[![dev-dependencies][dev-dependencies-badge]][dev-dependencies-href]


Installs node modules to versioned or custom directories.

Very useful if you want to use multiple versions of the same package as top-level dependencies.


## CLI Usage

Install globally: `npm install npm-install-version -g`

#### Example Usage

```text
$ niv csjs@1.0.0
# installs csjs@1.0.0 to node_modules/csjs@1.0.0/

$ niv csjs@1.0.0 --destination csjs-v1
# installs csjs@1.0.0 to node_modules/csjs-v1/

$ niv scott113341/csjs#some-branch --overwrite
# installs https://github.com/scott113341/csjs#some-branch to node_modules/scott113341-csjs#some-branch/
# notice how the installation directory is sanitized (the "/" is replaced with a "-")
# overwrites the previously installed version there, which is useful if I just updated "some-branch"
```

#### Full Usage

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

  --quiet, -q
    suppress informational output
    default: false

  --help, -h
    display this message
```


## Programmatic Usage

Install locally: `npm install npm-install-version --save-dev`

#### Basic Example

Let's say we want to benchmark a few versions of `csjs` against each other:

```javascript
const niv = require('npm-install-version');
const benchmark = require('./some-benchmark-function.js');

niv.install('csjs@1.0.0');
// installs csjs@1.0.0 to node_modules/csjs@1.0.0/

niv.install('csjs@1.0.1');
// installs csjs@1.0.1 to node_modules/csjs@1.0.1/

const csjs_old = niv.require('csjs@1.0.0');
const csjs_new = niv.require('csjs@1.0.1');
// require the old and new versions of csjs

benchmark([csjs_old, csjs_new], 'some-test-input');
// run our fake benchmark function on the old and new versions of csjs
```

#### Advanced Example

```javascript
const niv = require('npm-install-version');

niv.install('csjs@1.0.0', { destination: 'some-dir' });
// installs csjs@1.0.0 to node_modules/some-dir/

niv.install('csjs@1.0.1', { destination: 'some-dir' });
// doesn't do anything because node_modules/some-dir/ already exists

niv.install('csjs@1.0.1', { destination: 'some-dir', overwrite: true });
// installs csjs@1.0.1 to node_modules/some-dir/, overwriting the existing install
```


[npm-version-badge]: https://img.shields.io/npm/v/npm-install-version.svg?style=flat-square
[npm-version-href]: https://www.npmjs.com/package/npm-install-version

[build-status-badge]: https://img.shields.io/travis/scott113341/npm-install-version/master.svg?style=flat-square
[build-status-href]: https://travis-ci.org/scott113341/npm-install-version/branches

[dependencies-badge]: https://img.shields.io/david/scott113341/npm-install-version.svg?style=flat-square
[dependencies-href]: https://david-dm.org/scott113341/npm-install-version#info=dependencies

[dev-dependencies-badge]: https://img.shields.io/david/dev/scott113341/npm-install-version.svg?style=flat-square
[dev-dependencies-href]: https://david-dm.org/scott113341/npm-install-version#info=devDependencies
