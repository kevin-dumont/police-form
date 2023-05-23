#!/usr/bin/env node
const { build } = require("esbuild");
const { exec } = require("child_process");
const config = require("./config");

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
  await build(config);

  const dateTime = 197001010000;
  console.time("🚀 built in");

  await execShellCommand(
    `find ./build -exec touch -t ${dateTime} {} + && zip -rX build/handler.zip build/* -x build/*.zip && touch -t ${dateTime} build/handler.zip && shasum build/handler.zip && pwd`
  );
  console.timeEnd("🚀 built in");
})();
