const shelljs = require('shelljs');

function clean () {
  shelljs.rm('-rf', 'node_modules/csjs*', 'node_modules/@scott113341*', 'node_modules/scott113341*', 'node_modules/push-dir*');
}

module.exports = {
  clean
};
