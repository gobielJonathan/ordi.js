import chalk from "chalk";

const log = (...message: unknown[]) =>
  console.log(chalk.bold.magenta("[beyond]: "), chalk.magenta(message));

const info = (...message: unknown[]) =>
  console.info(chalk.bold.blue("[beyond]: "), chalk.blue(message));

const error = (...message: unknown[]) =>
  console.error(chalk.bold.red("[beyond]: "), chalk.red(message));

const warn = (...message: unknown[]) =>
  console.warn(chalk.bold.yellow("[beyond]: "), chalk.yellow(message));

export { log, info, error, warn };
