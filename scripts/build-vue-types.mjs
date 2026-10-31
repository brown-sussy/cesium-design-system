#!/usr/bin/env node
/**
 * Rewrites the Vue declaration output so plain TypeScript can read it.
 *
 * vue-tsc emits `Button.vue.d.ts` and imports it as `'./components/Button.vue'`.
 * That resolves inside Volar, but a consumer on plain `tsc` (or an editor
 * without the Vue extension) gets "cannot find module './components/Button.vue'".
 *
 * So: strip `.vue` out of every module specifier and out of every file name.
 * `Button.vue.d.ts` becomes `Button.d.ts`, and `from './components/Button.vue'`
 * becomes `from './components/Button'` — which TypeScript resolves the usual
 * way. The runtime bundle is unaffected; it is a single bundled file.
 */
import { readdirSync, readFileSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'dist/vue');

const files = [];
(function walk(path) {
  for (const entry of readdirSync(path)) {
    const full = join(path, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry.endsWith('.d.ts')) files.push(full);
  }
})(dir);

let renamed = 0;
let rewritten = 0;

for (const file of files) {
  const source = readFileSync(file, 'utf8');

  // Any quoted string that ends in `.vue` is a module specifier here.
  const next = source.replace(/(['"])([^'"]+)\.vue\1/g, (_match, quote, spec) => {
    rewritten += 1;
    return `${quote}${spec}${quote}`;
  });

  const target = file.endsWith('.vue.d.ts') ? file.replace(/\.vue\.d\.ts$/, '.d.ts') : file;

  writeFileSync(target, next, 'utf8');
  if (target !== file) {
    unlinkSync(file);
    renamed += 1;
  }
}

const leftovers = [];
(function walk(path) {
  for (const entry of readdirSync(path)) {
    const full = join(path, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (entry.endsWith('.vue.d.ts')) leftovers.push(full);
  }
})(dir);

if (leftovers.length) {
  console.error(`✗ ${leftovers.length} .vue.d.ts files still present`);
  process.exit(1);
}

console.log(`✓ dist/vue declarations — ${renamed} files renamed, ${rewritten} specifiers rewritten`);
