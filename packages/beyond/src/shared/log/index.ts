import chalk from "chalk";

const log = (message: string) =>
  console.log(chalk.bold.magenta("[beyond]: "), chalk.magenta(message));

const info = (message: string) =>
  console.info(chalk.bold.blue("[beyond]: "), chalk.blue(message));

const error = (message: string) =>
  console.error(chalk.bold.red("[beyond]: "), chalk.red(message));

const warn = (message: string) =>
  console.warn(chalk.bold.yellow("[beyond]: "), chalk.yellow(message));

export { log, info, error, warn };
