import path from 'node:path';
import * as url from 'node:url';

export const cwd = process.cwd();
export const pcwd = path.resolve(cwd);

export const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export function resolveCwd(name) {
  return path.resolve(cwd, name);
}

export function resolveDir(...args) {
  return path.resolve(dirname, ...args);
}
