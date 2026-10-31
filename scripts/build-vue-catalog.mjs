/**
 * Generates `vue-site/lib/catalog.generated.ts` — the Vue demo site's content.
 *
 * The React docs and the Vue demo site describe the same components. Writing
 * that description twice is how two sites end up disagreeing about what `Panel`
 * does, so this bundles the real registry in Node and emits the metadata the
 * Vue site needs: slug, name, category, summary, props, a11y notes, guidance.
 *
 * What it deliberately does *not* carry: the React examples. Those are JSX and
 * belong to the React site. The Vue site pairs this metadata with its own demo
 * SFCs, which are both the live demo and the displayed source.
 *
 * Same esbuild trick as `build-docs-nav.mjs`: bundle, import, read the exported
 * data. The demo components inside the registry are function declarations that
 * are never called, so nothing renders and no DOM is needed.
 */
import { build } from 'esbuild';
import { writeFile, unlink, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const entry = resolve(root, 'docs/content/registry.ts');
const outFile = resolve(root, 'vue-site/lib/catalog.generated.ts');
const tmpFile = resolve(root, '.vue-catalog.tmp.mjs');

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
  throw new Error('registry is empty — refusing to write an empty catalogue');
}

/* ------------------------------------------------------------------ */
/* shape                                                               */
/* ------------------------------------------------------------------ */

/**
 * React nodes cannot cross into the Vue build, so anything that is not plain
 * text is dropped rather than serialised into something unusable. `intro` is
 * JSX on most pages; the `summary` string carries the same information.
 */
const text = (value) => (typeof value === 'string' ? value : undefined);

const entries = registry.map((doc) => ({
  slug: doc.slug,
  name: doc.name,
  category: doc.category,
  summary: doc.summary,
  status: doc.status,
  props: (doc.props ?? []).map((row) => ({
    name: row.name,
    type: row.type,
    default: row.default,
    description: row.description,
  })),
  a11y: doc.a11y ?? [],
  guidance: doc.guidance
    ? { do: doc.guidance.do ?? [], dont: doc.guidance.dont ?? [] }
    : undefined,
  related: doc.related ?? [],
  intro: text(doc.intro),
  examples: (doc.examples ?? []).map((ex) => ex.title),
}));

const grouped = categoryOrder
  .map((category) => ({ category, docs: entries.filter((d) => d.category === category) }))
  .filter((g) => g.docs.length > 0);

const categoryUnion = categoryOrder.map((c) => `  | ${JSON.stringify(c)}`).join('\n');

const body = `/**
 * GENERATED FILE — do not edit.
 *
 * Produced by \`scripts/build-vue-catalog.mjs\` from \`docs/content/*.tsx\`, so the
 * Vue demo site describes the same components, with the same props and the same
 * accessibility notes, as the React documentation. Regenerate with
 * \`npm run vue:catalog\` (also runs before \`dev:site\` and \`build:site\`).
 */

export type CatalogCategory =
${categoryUnion};

export interface CatalogProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface CatalogEntry {
  slug: string;
  name: string;
  category: CatalogCategory;
  summary: string;
  status?: 'Stable' | 'New' | 'Beta';
  props: CatalogProp[];
  a11y: string[];
  guidance?: { do: string[]; dont: string[] };
  related: string[];
  /** Plain-text intro, when the registry had one that was not JSX. */
  intro?: string;
  /** Titles of the React examples — the Vue demos are separate files. */
  examples: string[];
}

export const catalog: CatalogEntry[] = ${JSON.stringify(entries, null, 2)};

export const catalogByCategory: Array<{ category: CatalogCategory; docs: CatalogEntry[] }> = [
${grouped
  .map(
    (g) => `  {
    category: ${JSON.stringify(g.category)},
    docs: catalog.filter((d) => d.category === ${JSON.stringify(g.category)}),
  },`,
  )
  .join('\n')}
];

export const catalogCount = catalog.length;

export const findEntry = (slug: string): CatalogEntry | undefined =>
  catalog.find((entry) => entry.slug === slug);
`;

await mkdir(dirname(outFile), { recursive: true });
const readFile = (await import('node:fs/promises')).readFile;
const previous = await readFile(outFile, 'utf8').catch(() => '');
if (previous !== body) await writeFile(outFile, body);

/* ------------------------------------------------------------------ */
/* the light index                                                     */
/* ------------------------------------------------------------------ */

/**
 * The chrome only needs names and categories. Shipping the full catalogue —
 * 238 prop descriptions — in the entry bundle would repeat the mistake the
 * React docs already fixed: the sidebar pulling every page's content into the
 * first paint.
 */
const navBody = `/**
 * GENERATED FILE — do not edit.
 *
 * The light half of \`catalog.generated.ts\`: navigation metadata only, so the
 * sidebar and the command palette never pull 238 prop descriptions into the
 * entry bundle. Produced by \`scripts/build-vue-catalog.mjs\`.
 */

import type { CatalogCategory } from './catalog.generated';

export type NavCategory = CatalogCategory;

export interface NavEntry {
  slug: string;
  name: string;
  category: CatalogCategory;
  summary: string;
  status?: 'Stable' | 'New' | 'Beta';
  /** How many props the component declares. */
  props: number;
}

export const navEntries: NavEntry[] = ${JSON.stringify(
  entries.map(({ slug, name, category, summary, status, props }) => ({
    slug,
    name,
    category,
    summary,
    status,
    props: props.length,
  })),
  null,
  2,
)};

export const navByCategory: Array<{ category: CatalogCategory; docs: NavEntry[] }> = [
${grouped
  .map(
    (g) => `  {
    category: ${JSON.stringify(g.category)},
    docs: navEntries.filter((d) => d.category === ${JSON.stringify(g.category)}),
  },`,
  )
  .join('\n')}
];

export const componentCount = navEntries.length;

/** Derived, so the overview page never imports the full catalogue for a number. */
export const totalProps = navEntries.reduce((n, entry) => n + entry.props, 0);

export const findNavEntry = (slug: string): NavEntry | undefined =>
  navEntries.find((entry) => entry.slug === slug);
`;

const navFile = resolve(root, 'vue-site/lib/nav.generated.ts');
const previousNav = await readFile(navFile, 'utf8').catch(() => '');
if (previousNav !== navBody) await writeFile(navFile, navBody);

const props = entries.reduce((n, e) => n + e.props.length, 0);
console.log(
  `✓ vue catalogue — ${entries.length} components, ${props} props, ` +
    `${grouped.length} categories in ${Date.now() - started}ms` +
    `${previous === body ? ' — unchanged' : ''}`,
);
