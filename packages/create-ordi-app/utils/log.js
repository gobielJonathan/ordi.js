import chalk from 'chalk';

function isObject(value) {
  return value != null && (typeof value === 'object' || typeof value === 'function');
}

function toObject(values) {
  return Object.assign({}, ...values);
}

function prefixes(customPrefix) {
  const extendedPrefix = `[create-ordi-app${customPrefix ? `:${customPrefix}` : ''}]`;

  return {
    wait: chalk.blueBright(`${extendedPrefix} wait`) + '  -',
    error: chalk.red(`${extendedPrefix} error`) + ' -',
    warn: chalk.yellow(`${extendedPrefix} warn`) + '  -',
    ready: chalk.green(`${extendedPrefix} ready`) + ' -',
    info: chalk.cyan(`${extendedPrefix} info`) + '  -',
    event: chalk.magenta(`${extendedPrefix} event`) + ' -',
  };
}

export function logWithPrefix(callback, type, ...args) {
  const options = args.filter(a => isObject(a));
  const message = args.filter(a => !isObject(a));
  const prefix = prefixes(toObject(options).prefix);

  return callback.call(this, prefix[type], ...message);
}

export function wait(...args) {
  logWithPrefix(console.log, 'wait', ...args);
}

export function error(...args) {
  logWithPrefix(console.error, 'error', ...args);
}

export function errorNoPrefix(message) {
  console.error(chalk.red(message));
}

export function warn(...args) {
  logWithPrefix(console.warn, 'warn', ...args);
}

export function warnNoPrefix(message) {
  console.warn(chalk.yellow(message));
}

export function ready(...args) {
  logWithPrefix(console.log, 'ready', ...args);
}

export function info(...args) {
  logWithPrefix(console.info, 'info', ...args);
}

export function event(...args) {
  logWithPrefix(console.log, 'event', ...args);
}
