/**
 * The Vue package carries its own copy of the icon geometry (vue/lib/icons.ts)
 * because it must not import from src/components/Icon.tsx. A copy that nobody
 * checks is a copy that drifts, so this script compares the two object literals
 * key by key and path by path.
 *
 * Both files declare a plain literal — `const paths = { … }` in the React
 * source, `export const iconPaths = { … }` in the Vue one — so the object can
 * be lifted out with a brace scan and evaluated, no TypeScript parser needed.
 */
import { readFileSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;

const sources = [
  { label: 'React', file: 'src/components/Icon.tsx', decl: 'const paths = {' },
  { label: 'Vue', file: 'vue/lib/icons.ts', decl: 'export const iconPaths = {' },
];

/** Lift the object literal that starts at `decl` and evaluate it. */
function readIconMap({ label, file, decl }) {
  const text = readFileSync(root + file, 'utf8');
  const start = text.indexOf(decl);
  if (start === -1) throw new Error(`${file}: cannot find "${decl}"`);

  const open = text.indexOf('{', start);
  let depth = 0;
  let end = -1;
  let quote = null;

  for (let i = open; i < text.length; i += 1) {
    const ch = text[i];
    if (quote) {
      if (ch === '\\') i += 1;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') quote = ch;
    else if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end === -1) throw new Error(`${file}: unbalanced braces after "${decl}"`);

  const literal = text.slice(open, end);
  // eslint-disable-next-line no-new-func
  const map = new Function(`return (${literal})`)();

  for (const [name, value] of Object.entries(map)) {
    if (!Array.isArray(value) || value.some((p) => typeof p !== 'string')) {
      throw new Error(`${file}: icon "${name}" is not a string array`);
    }
  }
  return { label, file, map };
}

const [react, vue] = sources.map(readIconMap);
const problems = [];

for (const name of Object.keys(react.map)) {
  if (!(name in vue.map)) problems.push(`missing in Vue: ${name}`);
}
for (const name of Object.keys(vue.map)) {
  if (!(name in react.map)) problems.push(`extra in Vue: ${name}`);
}
for (const name of Object.keys(react.map)) {
  const a = react.map[name];
  const b = vue.map[name];
  if (!b) continue;
  if (a.length !== b.length) {
    problems.push(`${name}: ${a.length} path(s) in React, ${b.length} in Vue`);
    continue;
  }
  a.forEach((path, i) => {
    if (path !== b[i]) problems.push(`${name}[${i}]: ${path} !== ${b[i]}`);
  });
}

const count = Object.keys(react.map).length;
if (problems.length) {
  console.error(`✗ icon sets differ — ${problems.length} problem(s)`);
  for (const p of problems) console.error(`  ${p}`);
  console.error(`\nRegenerate vue/lib/icons.ts from ${react.file}.`);
  process.exit(1);
}

console.log(`✓ icon sets match — ${count} glyphs, ${count} identical path sets`);
