require('regenerator-runtime/runtime');

module.exports = {
  "require": ["@babel/register", "test/testGlobals.js"],
  "recursive": true,
  "extension": ["js", "cjs", "mjs"],
  "color": true,
  "diff": true,
  "inline-diffs": true,
  "watch": false,
  "timeout": 5000,
  "ui": "bdd"
}