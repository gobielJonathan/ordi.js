import chalk from "chalk";

export const log = (message) =>
  console.log(chalk.bold.magenta("[beyond]: "), chalk.magenta(message));

export const info = (message) =>
  console.info(chalk.bold.blue("[beyond]: "), chalk.blue(message));

export const error = (message) =>
  console.error(chalk.bold.red("[beyond]: "), chalk.red(message));

export const warn = (message) =>
  console.warn(chalk.bold.yellow("[beyond]: "), chalk.yellow(message));
