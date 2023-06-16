#!/usr/bin/env node
const { build } = require('esbuild');
const config = require('./config');

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      resolve(stdout || stderr);
    });
  });
}

(async () => {
  console.time('🚀 built in');

  await build(config);

  console.timeEnd('🚀 built in');
})();
