#!/usr/bin/env node

const niv = require('./index.js');


const args = process.argv.slice(2);
niv.install(...args);
