import fs from 'node:fs';
import path from 'node:path';
import { execSync, execFileSync } from 'node:child_process';

import got from 'got';
import through from 'through2';
import rcopy from 'recursive-copy';

import Git from './git.js';
import * as log from '../utils/log.js';
import { replaceAll } from '../utils/string.js';
import { resolveCwd, dirname } from '../utils/path.js';

const DATE = new Date();
const CREATION_DATE = `${DATE.getDate()}/${DATE.getMonth() + 1}/${DATE.getFullYear()}`;

export default class App extends Git {
  name = '';

  outDir = '';

  options = {};

  template = '';

  ci = process.env.CI === 'true' || false;

  constructor(name, options) {
    const appName = name

    super(resolveCwd('./' + appName), (options.template || options.t) ?? '');

    this.name = appName;
    this.options = options;
    this.outDir = resolveCwd('./' + appName);
    this.template = (options.template || options.t) ?? '';
  }

  /**
   * Get Github username by searching it based on configured e-mail
   * in user's local machine. If the we failed to get the configured e-mail
   * or some HTTP errors, we give kratos Github username instead.
   * @private
   * @returns {Promise<string>}
   */
  get #ghname() {
    return (async function () {
      const kratos = 'kratos-bot';
      try {
        const email = execSync('git config --global user.email');
        const res = await got(`https://api.github.com/search/users?q=${email.toString()}`);

        if (res.statusCode !== 200) {
          return kratos;
        }

        const { items = [] } = JSON.parse(res.body);
        return items[0]?.login ?? kratos;
      } catch (error) {
        return kratos;
      }
    })();
  }


  /**
   * Recursively copy whole `inDir` directory hierarchies to `this.outDir`.
   * We also need to transform certain file contents using streams by renaming certain
   * character to valid value.
   * @private
   * @param {string} inDir
   * @returns {Promise<void>}
   */
  #copy = async inDir => {
    try {
      const ghname = await this.#ghname;

      await rcopy(inDir, this.outDir, {
        dot: true,
        overwrite: false,
        filter: ['**/*', '!node_modules', '!node_modules/**', '!build/**'],
      });
    } catch (err) {
      if (err.message.includes('EEXIST')) {
        log.warn(err.message ?? String(err));
      } else {
        log.error('Error while generating project', err);
        log.errorNoPrefix(err);
      }
    }
  };

  /**
   * Install necessary dependencies defined in `${outDir}/package.json`
   * using pnpm. We also create `.env` files represented from `.env.example` as well
   * to utilize environment varaible in local machine.
   * @private
   * @returns {void}
   */
  #install = () => {
    log.event('Installing dependencies...\n');

    execSync(`cp .env.example .env || :`, { stdio: 'inherit', cwd: this.outDir });
    execSync(`mv gitignore.example .gitignore || :`, { stdio: 'inherit', cwd: this.outDir });
    execSync(`pnpm install ${this.ci ? '--frozen-lockfile' : '--no-frozen-lockfile'}`, {
      stdio: 'inherit',
      cwd: this.outDir,
    });

    log.info('Dependencies installed!');

    if (this.options.dev || this.options.D) {
      log.info('Dev mode detected, linking ordi dependencies...\n');

      execFileSync('pnpm', ['link', path.resolve(dirname, '../../ordi')], {
        stdio: 'ignore',
        cwd: this.outDir,
      });
    }
  };

  /**
   * Generate the application without template needed.
   * @private
   * @returns {Promise<void>}
   */
  #genApp = async () => {
    log.event(`Creating "${this.name}".`);
    const inDir = path.resolve(dirname, '../template');
    await this.#copy(inDir);
  };

  /**
   * This is Entry point for `Init` class. Generate the ordi application
   * based on the `this.template` value, if `this.template` available, then the
   * ordi application will generate with neccessary files from given template. Otherwise
   * just copy `template` directory (faster).
   * @returns {Promise<void>}
   */
  gen = async () => {
    await this.#genApp();
    
    this.#install();
    log.info('Project is successfully generated!');
    log.ready(`Run "cd ${this.outDir} && pnpm start" to get started!`);
  };
}
