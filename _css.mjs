import { readFileSync } from 'node:fs';

const css = readFileSync('docs/docs.css', 'utf8');
const lines = css.split('\n');

// Walk the file tracking media-query depth and brace depth.
let media = null;
let depth = 0;
let mediaDepth = -1;
const baseRules = [];   // {sel, line}
const mediaRules = [];  // {sel, line, media}

for (let i = 0; i < lines.length; i++) {
  const raw = lines[i];
  const line = raw.replace(/\/\*.*?\*\//g, '');
  if (/@media/.test(line) && /{/.test(line)) {
    media = line.trim();
    mediaDepth = depth;
    depth++;
    continue;
  }
  // A rule header ends with '{'
  const m = line.match(/^\s*([^@{}][^{}]*?)\s*\{/);
  if (m) {
    const sel = m[1].trim();
    if (media) mediaRules.push({ sel, line: i + 1, media });
    else baseRules.push({ sel, line: i + 1 });
    depth++;
    continue;
  }
  const opens = (line.match(/{/g) || []).length;
  const closes = (line.match(/}/g) || []).length;
  depth += opens - closes;
  if (media && depth <= mediaDepth) media = null;
}

const baseLine = new Map();
for (const r of baseRules) baseLine.set(r.sel, r.line);

const shadowed = mediaRules.filter((r) => {
  const b = baseLine.get(r.sel);
  return b !== undefined && b > r.line;
});

console.log(`base rules: ${baseRules.length}, media rules: ${mediaRules.length}`);
console.log(`\nshadowed overrides (media rule appears before its base rule):`);
for (const s of shadowed) {
  console.log(`  ${s.sel.padEnd(28)} media@${String(s.line).padStart(5)}  base@${baseLine.get(s.sel)}  ${s.media}`);
}
console.log(`\ntotal: ${shadowed.length}`);
