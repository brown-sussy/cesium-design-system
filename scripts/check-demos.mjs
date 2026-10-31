/**
 * Demo coverage guard.
 *
 * Every catalogued component must have a `vue-site/demos/<Name>.vue`, and every
 * demo file must correspond to a catalogued component. The site itself only
 * says "No demo file for X yet" at runtime — this fails the build instead, so a
 * new component cannot be documented without an example that runs.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const catalog = readFileSync(resolve(root, 'vue-site/lib/nav.generated.ts'), 'utf8');

const documented = [...catalog.matchAll(/"name": "([^"]+)"/g)].map((m) => m[1]);
const demos = readdirSync(resolve(root, 'vue-site/demos'))
  .filter((f) => f.endsWith('.vue'))
  .map((f) => f.replace(/\.vue$/, ''));

const documentedSet = new Set(documented);
const demoSet = new Set(demos);

const missing = documented.filter((n) => !demoSet.has(n));
const orphan = demos.filter((n) => !documentedSet.has(n));

if (missing.length || orphan.length) {
  if (missing.length) {
    console.error(`✗ ${missing.length} documented component(s) have no demo:`);
    console.error(`    ${missing.join(', ')}`);
  }
  if (orphan.length) {
    console.error(`✗ ${orphan.length} demo file(s) match no component:`);
    console.error(`    ${orphan.join(', ')}`);
  }
  process.exit(1);
}

console.log(`✓ demo coverage — ${demos.length}/${documented.length} components have a demo`);
