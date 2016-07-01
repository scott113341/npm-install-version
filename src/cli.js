#!/usr/bin/env node

const minimist = require('minimist');
const niv = require('./index.js');


const options = {
  default: {
    overwrite: undefined,
    destination: undefined,
  },
};
const args = minimist(process.argv.slice(2), options);
niv.install(args._[0], args);
