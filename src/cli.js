#!/usr/bin/env node

const minimist = require('minimist');
const niv = require('./index.js');
const { getUsage } = require('./util.js');

const options = {
  default: {
    destination: undefined,
    cmd: undefined,
    help: false,
    overwrite: undefined,
    quiet: false
  },
  alias: {
    destination: 'd',
    cmd: 'c',
    help: 'h',
    overwrite: 'o',
    quiet: 'q'
  }
};

const args = minimist(process.argv.slice(2), options);

if (args.help) {
  process.stdout.write(getUsage());
  process.exit(0);
}
if (!args._.length) {
  process.stderr.write(getUsage());
  process.exit(1);
}

niv.install(args._[0], args);
