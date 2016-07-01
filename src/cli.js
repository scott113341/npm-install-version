#!/usr/bin/env node

const minimist = require('minimist');
const niv = require('./index.js');
const { displayHelp } = require('./util.js');


const options = {
  default: {
    destination: undefined,
    help: false,
    overwrite: undefined,
  },
  alias: {
    destination: 'd',
    help: 'h',
    overwrite: 'o',
  },
};

const args = minimist(process.argv.slice(2), options);

if (args.help) displayHelp(0);
if (!args._.length) displayHelp(1);

niv.install(args._[0], args);
