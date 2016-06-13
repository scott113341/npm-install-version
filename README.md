# npm-install-version

[![npm-version][npm-version-badge]][npm-version-href]
[![build-status][build-status-badge]][build-status-href]
[![dependencies][dependencies-badge]][dependencies-href]
[![dev-dependencies][dev-dependencies-badge]][dev-dependencies-href]


Install node modules to versioned directories.


command | installs package | installed to
--- | --- | ---
`niv csjs@1.0.0` | csjs@1.0.0 | node_modules/csjs@1.0.0
`niv csjs@1.0.0 first` | csjs@1.0.0 | node_modules/csjs@first
`niv csjs@https://github.com/scott113341/csjs/tarball/some-branch testmaster` | https://github.com/scott113341/csjs/tarball/some-branch | node_modules/csjs@testmaster


[npm-version-badge]: https://img.shields.io/npm/v/npm-install-version.svg?style=flat-square
[npm-version-href]: https://www.npmjs.com/package/npm-install-version

[build-status-badge]: https://img.shields.io/travis/scott113341/npm-install-version.svg?style=flat-square
[build-status-href]: https://travis-ci.org/scott113341/npm-install-version

[dependencies-badge]: https://img.shields.io/david/scott113341/npm-install-version.svg?style=flat-square
[dependencies-href]: https://david-dm.org/scott113341/npm-install-version#info=dependencies

[dev-dependencies-badge]: https://img.shields.io/david/dev/scott113341/npm-install-version.svg?style=flat-square
[dev-dependencies-href]: https://david-dm.org/scott113341/npm-install-version#info=devDependencies
