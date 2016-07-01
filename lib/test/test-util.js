'use strict';

var execSync = require('child_process').execSync;

function clean() {
  execSync('./node_modules/.bin/shx rm -rf node_modules/csjs* node_modules/scott113341*');
}

module.exports = {
  clean: clean
};