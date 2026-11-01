import { readFileSync } from 'node:fs';

const text = readFileSync('docs/docs.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const lines = text.split('\n');

let media = null, mediaDepth = -1, depth = 0;
const base = new Map();  // sel -> {line, props:Set}
const med = [];          // {sel, line, media, props:Set}

function readBlock(startLine) {
  // Collect declarations until the matching closing brace.
  const props = new Set();
  let d = 0;
  for (let i = startLine; i < lines.length; i++) {
    const l = lines[i];
    d += (l.match(/{/g) || []).length - (l.match(/}/g) || []).length;
    const decls = l.match(/[a-z-]+\s*:/g) || [];
    for (const dd of decls) props.add(dd.replace(/\s*:/, '').trim());
    if (d <= 0 && i > startLine) break;
  }
  return props;
}

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (/@media/.test(line) && line.includes('{')) {
    media = line.trim(); mediaDepth = depth; depth++; continue;
  }
  const m = line.match(/^\s*([^@{}][^{}]*?)\s*\{\s*$/);
  if (m) {
    const sel = m[1].trim();
    const props = readBlock(i);
    if (media) med.push({ sel, line: i + 1, media, props });
    else base.set(sel, { line: i + 1, props });
    depth++; continue;
  }
  depth += (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
  if (media && depth <= mediaDepth) media = null;
}

const hits = [];
for (const r of med) {
  const b = base.get(r.sel);
  if (!b || b.line <= r.line) continue;
  const shared = [...r.props].filter((p) => b.props.has(p));
  if (shared.length) hits.push({ ...r, baseLine: b.line, shared });
}
console.log(`real shadowing (same selector, later base rule, overlapping property):`);
for (const h of hits) {
  console.log(`  ${h.sel.padEnd(20)} media@${String(h.line).padStart(5)} base@${String(h.baseLine).padStart(5)}  props: ${h.shared.join(', ')}   ${h.media}`);
}
console.log(`\ntotal: ${hits.length}`);
