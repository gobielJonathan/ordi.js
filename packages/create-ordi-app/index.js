#!/usr/bin/env node

import path from "node:path";
import * as url from "node:url";
import { execSync } from "node:child_process";

import yargs from "yargs";
import semver from "semver";
import { hideBin } from "yargs/helpers";

import App from "./cli/app.js";
import * as log from "./utils/log.js";
import { read, scan } from "./utils/pkg-json.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NODE_VERSION_ALLOWED = semver.coerce(
  scan(read(path.resolve(__dirname, "package.json"))).engines.node
).major;

const GIT_VERSION_ALLOWED = "2.25.0";

const AVAILABLE_OPTIONS = {
  dev: { alias: "D", describe: "Run ordi application in development mode" },
};

yargs(hideBin(process.argv))
  .scriptName("create-ordi-app")
  .middleware((argv) => {
    const [name] = argv._;

    if (typeof name === "undefined") {
      log.error("Please specify the project name.");
      process.exit(1);
    }

    argv.name = name;

    const pvn = process.versions.node;
    const nodev = pvn.split(".")[0];

    if (nodev < NODE_VERSION_ALLOWED) {
      log.error(
        `Create ordi App requires Node v${NODE_VERSION_ALLOWED} or higher. Got: v${pvn}.`
      );
      process.exit(1);
    }

    // git sparse-checkout only available started from 2.25.0.
    // checking user git version is necessary to keep the functionality works.
    // If it not satisfied, program will exit with 1 status by suggesting
    // user to install the newer version of git.
    const gitVersionRaw = execSync("git --version", { encoding: "utf-8" });
    const [gitVersion] = /(?<=version\s)[\w]+\.[\w]+\.[\w]+/.exec(
      gitVersionRaw
    );

    if (GIT_VERSION_ALLOWED.localeCompare(gitVersion) > 0) {
      log.error(
        `Create ordi App requires Git v${GIT_VERSION_ALLOWED} or higher. Got: v${gitVersion}.`
      );
      process.exit(1);
    }
  })

  .command("$0", "Generate ordi application", AVAILABLE_OPTIONS, (argv) => {
    const { name, ...options } = argv;
    const app = new App(name, options);
    app.gen();
  })

  .epilog("🐧 Create ordi App")

  .help("h")
  .alias("h", "help")

  .version("v")
  .alias("v", "version")

  .strictOptions()

  .parse();
