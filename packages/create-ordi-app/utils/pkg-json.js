import fs from 'node:fs';
import path from 'node:path';
import * as log from './log.js';

export function read(p) {
  if (!p.includes('package.json')) {
    log.error(`${p} Path must contains package.json!`);
    process.exit(1);
  } else {
    return fs.readFileSync(path.resolve(p), 'utf-8');
  }
}

export function scan(str) {
  return JSON.parse(str);
}
