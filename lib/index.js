#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var execSync = require('child_process').execSync;
var fs = require('fs');
var path = require('path');

var args = process.argv.slice(2);

var _args = _slicedToArray(args, 2);

var target = _args[0];
var as = _args[1];

if (!target) error();

var name = target.split('@').slice(0, -1).join('@');
var version = target.split('@').slice(-1).join('@');
if (!name) error();
if (!version) error();

var shx = './node_modules/.bin/shx';
var tempDir = './.npm-install-version-temp';

try {
  // make temp install dir
  execSync(shx + ' rm -rf ' + tempDir + '/');
  execSync(shx + ' mkdir -p ' + tempDir + '/node_modules/');

  // install package to temp dir
  var installOptions = {
    cwd: tempDir,
    stdio: [null, null, null]
  };
  execSync('npm install ' + target, installOptions);

  // copy to node_modules/
  var destination = as ? name + '@' + as : target;
  execSync(shx + ' rm -rf node_modules/' + destination);
  execSync(shx + ' mv ' + tempDir + '/node_modules/' + name + ' node_modules/' + destination);

  console.log('Installed ' + target + ' to node_modules/' + destination + '/');
} catch (err) {} finally {
  // clean up temp install dir
  execSync(shx + ' rm -rf ' + tempDir);
}

function error() {
  throw Error('You must specify an install target like this: csjs@1.0.0');
}