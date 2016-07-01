#!/usr/bin/env node
'use strict';

var minimist = require('minimist');
var niv = require('./index.js');

var options = {
  default: {
    overwrite: undefined,
    destination: undefined
  }
};
var args = minimist(process.argv.slice(2), options);
niv.install(args._[0], args);