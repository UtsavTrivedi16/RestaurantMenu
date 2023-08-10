require('regenerator-runtime/runtime');

module.exports = {
  "recursive": true,
  "extension": ["js", "cjs", "mjs"],
  "color": true,
  "diff": true,
  "inline-diffs": true,
  "watch": false,
  "timeout": 60000,
  "ui": "bdd",
  "require": "test/testGlobals.js"
}