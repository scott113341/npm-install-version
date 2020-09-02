const shelljs = require('shelljs');

function clean () {
  shelljs.rm('-rf', 'niv_modules/csjs*', 'niv_modules/@scott113341*', 'niv_modules/scott113341*', 'niv_modules/push-dir*');
}

function tryCatchOptimizer(fn, errorFn, finalFn) {
  try {
    fn();
  } catch(err) {
    if (typeof errorFn === "function") {
      errorFn(err);
    }
  } finally {
    if(typeof finalFn === "function") {
      finalFn();
    }
  }
}

module.exports = {
  tryCatchOptimizer,
  clean
};
