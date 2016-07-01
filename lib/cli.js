#!/usr/bin/env node
'use strict';

var minimist = require('minimist');
var niv = require('./index.js');

var _require = require('./util.js');

var displayHelp = _require.displayHelp;


var options = {
  default: {
    destination: undefined,
    help: false,
    overwrite: undefined
  },
  alias: {
    destination: 'd',
    help: 'h',
    overwrite: 'o'
  }
};

var args = minimist(process.argv.slice(2), options);

if (args.help) displayHelp(0);
if (!args._.length) displayHelp(1);

niv.install(args._[0], args);