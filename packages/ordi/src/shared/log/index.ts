import chalk from "chalk";

const log = (...message: unknown[]) =>
  console.log(chalk.bold.magenta("[ordi]: "), chalk.magenta(message));

const info = (...message: unknown[]) =>
  console.info(chalk.bold.blue("[ordi]: "), chalk.blue(message));

const error = (...message: unknown[]) =>
  console.error(chalk.bold.red("[ordi]: "), chalk.red(message));

const warn = (...message: unknown[]) =>
  console.warn(chalk.bold.yellow("[ordi]: "), chalk.yellow(message));

export { log, info, error, warn };
