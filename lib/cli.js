#!/usr/bin/env node
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var niv = require('./index.js');

var args = process.argv.slice(2);
niv.install.apply(niv, _toConsumableArray(args));