/**
 * Generates `docs/content/nav.generated.ts` — the navigation index.
 *
 * Why this exists: the docs sidebar and the command palette need every
 * component's name, category and summary. The content modules also carry each
 * component's demo components and copy-ready source strings, which are ~100 kB
 * of the bundle and are only needed by *one* route at a time. Importing the
 * registry from the chrome therefore shipped all 40 documentation pages to
 * every visitor, before they had asked for any of them.
 *
 * So: bundle the real registry here, in Node, and emit just the metadata. The
 * app imports the generated file; the heavy registry stays behind the route.
 * Nothing is hand-maintained, so the index cannot drift from the docs.
 *
 * `esbuild` is a declared devDependency, not a transitive one borrowed from
 * Vite: under pnpm or any strict resolver, an undeclared import fails.
 */
import { build } from 'esbuild';
import { writeFile, unlink, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const entry = resolve(root, 'docs/content/registry.ts');
const outFile = resolve(root, 'docs/content/nav.generated.ts');
const tmpFile = resolve(root, '.nav-registry.tmp.mjs');

const started = Date.now();

const result = await build({
  entryPoints: [entry],
  bundle: true,
  write: false,
  format: 'esm',
  platform: 'node',
  jsx: 'automatic',
  alias: { '@cesium-ds/core': resolve(root, 'src/index.ts') },
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  logLevel: 'silent',
});

// CSS imports become a second output; the JS one is what we want.
const js = result.outputFiles.filter((f) => !f.path.endsWith('.css')).pop();
if (!js) throw new Error('esbuild produced no JavaScript output for the registry');

await writeFile(tmpFile, js.text);
let registry;
let categoryOrder;
try {
  const mod = await import(`${tmpFile}?v=${started}`);
  registry = mod.registry;
  categoryOrder = mod.categoryOrder;
} finally {
  await unlink(tmpFile);
}

if (!Array.isArray(registry) || registry.length === 0) {
  throw new Error('registry is empty — refusing to write an empty navigation index');
}

/* ------------------------------------------------------------------ */
/* emit                                                                */
/* ------------------------------------------------------------------ */

const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

const entryLine = (d) =>
  `  { slug: ${q(d.slug)}, name: ${q(d.name)}, category: ${q(d.category)}, ` +
  `summary: ${q(d.summary)}, status: ${d.status ? q(d.status) : 'undefined'}, ` +
  `examples: ${d.examples?.length ?? 0} },`;

const grouped = categoryOrder
  .map((category) => ({
    category,
    docs: registry.filter((d) => d.category === category),
  }))
  .filter((g) => g.docs.length > 0);

const body = `/**
 * GENERATED FILE — do not edit.
 *
 * Produced by \`scripts/build-docs-nav.mjs\` from \`docs/content/*.tsx\`. It carries
 * the navigation metadata only: importing the full registry into the chrome
 * pulled every component's demos and source strings into the entry bundle.
 *
 * Regenerate with \`npm run docs:nav\` (also runs before \`dev\` and \`build:docs\`).
 */

export type NavCategory =
  | 'Actions'
  | 'Forms'
  | 'Display'
  | 'Layout'
  | 'Data'
  | 'Navigation'
  | 'Overlay'
  | 'HUD';

export interface NavEntry {
  slug: string;
  name: string;
  category: NavCategory;
  summary: string;
  status?: 'Stable' | 'New' | 'Beta';
  /** How many live examples the component page shows. */
  examples: number;
}

export const navEntries: NavEntry[] = [
${registry.map(entryLine).join('\n')}
];

export const navByCategory: Array<{ category: NavCategory; docs: NavEntry[] }> = [
${grouped
  .map(
    (g) => `  {
    category: ${q(g.category)},
    docs: navEntries.filter((d) => d.category === ${q(g.category)}),
  },`,
  )
  .join('\n')}
];

export const componentCount = navEntries.length;

export const findNavEntry = (slug: string): NavEntry | undefined =>
  navEntries.find((entry) => entry.slug === slug);
`;

const previous = await readFile(outFile, 'utf8').catch(() => '');
if (previous !== body) await writeFile(outFile, body);

const counts = grouped.map((g) => `${g.category} ${g.docs.length}`).join(' · ');
console.log(
  `✓ nav index — ${registry.length} components, ${grouped.length} categories ` +
    `(${counts}) in ${Date.now() - started}ms${previous === body ? ' — unchanged' : ''}`,
);
