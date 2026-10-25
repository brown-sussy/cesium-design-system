#!/usr/bin/env node
/**
 * Bundles src/styles/index.css into a single dist/cesium-ds.css.
 *
 * The stylesheet is authored as plain CSS with @import statements, so a
 * deterministic resolver is all that is needed — no PostCSS, no preprocessor.
 * Nested @imports are inlined in order and deduplicated.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const seen = new Set();

function inline(file) {
  const abs = resolve(root, file);
  if (seen.has(abs)) return '';
  seen.add(abs);

  const css = readFileSync(abs, 'utf8');
  return css.replace(/@import\s+['"](.+?)['"]\s*;/g, (_match, spec) => {
    const target = spec.startsWith('.') ? resolve(dirname(abs), spec) : null;
    if (!target || !existsSync(target)) {
      throw new Error(`Cannot resolve @import "${spec}" from ${relative(root, abs)}`);
    }
    return inline(target);
  });
}

const bundle = inline('src/styles/index.css')
  .replace(/\n{3,}/g, '\n\n')
  .trim();

writeFileSync(resolve(root, 'dist/cesium-ds.css'), `${bundle}\n`, 'utf8');

const kb = (Buffer.byteLength(bundle) / 1024).toFixed(1);
console.log(`✓ dist/cesium-ds.css — ${kb} kB, ${seen.size} files inlined`);
