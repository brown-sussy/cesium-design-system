#!/usr/bin/env node
/**
 * Cesium Design System — token compiler.
 *
 * Reads tokens/tokens.json (the single source of truth) and emits:
 *   src/styles/tokens.css   CSS custom properties, dark default + [data-theme="light"]
 *   dist/tokens.json        machine-readable token bundle for design tools
 *
 * Colors are theme-paired and emitted per theme. Static + shadow tokens are
 * emitted once for :root, with shadows repeated under the light selector.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(readFileSync(resolve(root, 'tokens/tokens.json'), 'utf8'));

const BANNER = `/* ------------------------------------------------------------------
 * Cesium Design System — design tokens
 * GENERATED FILE. Do not edit directly.
 * Source: tokens/tokens.json   Compiler: scripts/build-tokens.mjs
 * ------------------------------------------------------------------ */`;

const varName = (key) => `--cs-${key}`;

function decls(entries, indent = '  ') {
  return entries.map(([key, value]) => `${indent}${varName(key)}: ${value};`).join('\n');
}

const colorKeys = Object.keys(tokens.color);
const darkColors = colorKeys.map((k) => [k, tokens.color[k].dark]);
const lightColors = colorKeys.map((k) => [k, tokens.color[k].light]);
const staticEntries = Object.entries(tokens.static);
const shadowKeys = Object.keys(tokens.shadow);

const darkShadows = shadowKeys.map((k) => [k, tokens.shadow[k].dark]);
const lightShadows = shadowKeys.map((k) => [k, tokens.shadow[k].light]);

/* Shape presets — alternative values for the same variable names, activated
 * with <html data-style="plus">. Only overrides are emitted, so the default
 * (classic) stays in :root. */
const styleNames = Object.keys(tokens.style ?? {}).filter((k) => !k.startsWith('$'));
const styleBlocks = styleNames
  .map((name) => {
    const preset = tokens.style[name];
    const scalars = Object.entries(preset).filter(([, v]) => typeof v === 'string');
    const shadows = Object.entries(preset).filter(([, v]) => typeof v === 'object');
    const dark = shadows.map(([k, v]) => [k, v.dark]);
    const light = shadows.map(([k, v]) => [k, v.light]);
    return `[data-style='${name}'] {

  /* ---- shape ---- */
${decls(scalars)}

  /* ---- elevation (dark) ---- */
${decls(dark)}
}

[data-style='${name}'][data-theme='light'] {

  /* ---- elevation (light) ---- */
${decls(light)}
}`;
  })
  .join('\n\n');

const out = `${BANNER}

:root {
  color-scheme: dark;

  /* ---- color (dark) ---- */
${decls(darkColors)}

  /* ---- typography ---- */
${decls(staticEntries.filter(([k]) => /^(font|fs|lh|fw|tracking)-/.test(k)))}

  /* ---- space / radius ---- */
${decls(staticEntries.filter(([k]) => /^(space|radius)-/.test(k)))}

  /* ---- motion ---- */
${decls(staticEntries.filter(([k]) => /^(dur|ease)-/.test(k)))}

  /* ---- layers & layout ---- */
${decls(staticEntries.filter(([k]) => /^(z|control|header|sidebar|content)-/.test(k)))}

  /* ---- primitives ---- */
${decls(staticEntries.filter(([k]) => /^(atmos|slate|signal)-/.test(k)))}

  /* ---- elevation (dark) ---- */
${decls(darkShadows)}

  /* ---- focus ---- */
  --cs-ring: 0 0 0 2px var(--cs-bg-canvas), 0 0 0 4px var(--cs-accent);
}

[data-theme='light'] {
  color-scheme: light;

  /* ---- color (light) ---- */
${decls(lightColors)}

  /* ---- elevation (light) ---- */
${decls(lightShadows)}
}

/* ---- shape presets ---- */
${styleBlocks}

@media (prefers-reduced-motion: reduce) {
  :root {
    --cs-dur-instant: 0ms;
    --cs-dur-fast: 0ms;
    --cs-dur-base: 0ms;
    --cs-dur-slow: 0ms;
    --cs-dur-slower: 0ms;
  }
}
`;

mkdirSync(resolve(root, 'src/styles'), { recursive: true });
mkdirSync(resolve(root, 'dist'), { recursive: true });
mkdirSync(resolve(root, 'docs/public'), { recursive: true });
writeFileSync(resolve(root, 'src/styles/tokens.css'), out, 'utf8');

const bundle = {
  $meta: tokens.$meta,
  // No build timestamp here on purpose: it made the same source produce
  // different bytes on every run, so `npm run tokens` always left the working
  // tree dirty and CI could not tell a real change from a rebuild.
  themes: ['dark', 'light'],
  styles: ['classic', ...styleNames],
  cssVariables: {
    color: Object.fromEntries(colorKeys.map((k) => [`--cs-${k}`, tokens.color[k]])),
    shadow: Object.fromEntries(shadowKeys.map((k) => [`--cs-${k}`, tokens.shadow[k]])),
  },
  tokens: { static: tokens.static },
  styleOverrides: Object.fromEntries(styleNames.map((n) => [n, tokens.style[n]])),
};
const json = JSON.stringify(bundle, null, 2);
writeFileSync(resolve(root, 'dist/tokens.json'), json, 'utf8');

// downloadable copies for the documentation site
writeFileSync(resolve(root, 'docs/public/tokens.json'), json, 'utf8');
writeFileSync(resolve(root, 'docs/public/tokens.css'), out, 'utf8');

const count = colorKeys.length + staticEntries.length + shadowKeys.length;
console.log(`✓ tokens.css — ${count} variables (${colorKeys.length} themed, ${shadowKeys.length} elevation)`);
console.log(`✓ dist/tokens.json`);

/* ------------------------------------------------------------------
 * Docs stats: single generated source for every count shown on the site,
 * so copy can never drift from tokens.json again.
 * ------------------------------------------------------------------ */
const staticKeys = Object.keys(tokens.static);
const groupCount = (re) => staticKeys.filter((k) => re.test(k)).length;
const groups_ = {
  color: colorKeys.length,
  typography: groupCount(/^(font|fs|lh|fw|tracking)-/),
  spaceRadius: groupCount(/^(space|radius)-/),
  motion: groupCount(/^(dur|ease)-/),
  layout: groupCount(/^(z|control|header|sidebar|content)-/),
  primitives: groupCount(/^(atmos|slate|signal)-/),
  elevation: shadowKeys.length,
};

mkdirSync(resolve(root, 'docs/lib'), { recursive: true });
writeFileSync(
  resolve(root, 'docs/lib/tokenStats.ts'),
  `// GENERATED FILE — do not edit. Source: tokens/tokens.json
// Compiler: scripts/build-tokens.mjs

export const TOKEN_STATS = {
  /** Unique token names across both themes. */
  total: ${count},
  /** Theme-paired colours (each emitted for dark and light). */
  themed: ${colorKeys.length},
  /** Theme-paired elevation shadows. */
  elevation: ${shadowKeys.length},
  /** Theme-independent values: type, space, radius, motion, layout, primitives. */
  static: ${staticEntries.length},
  /** Per-group counts; sums to \`total\`. */
  groups: {
${Object.entries(groups_).map(([k, v]) => `    ${k}: ${v},`).join('\n')}
  },
} as const;
`,
  'utf8',
);
console.log('✓ docs/lib/tokenStats.ts');

/* ------------------------------------------------------------------
 * Skill reference: generate skill/reference/tokens.md from the same source.
 * ------------------------------------------------------------------ */

const groups = [
  { title: 'Surfaces', match: /^bg-/ },
  { title: 'Borders', match: /^border/ },
  { title: 'Text', match: /^text-/ },
  { title: 'Solid (primary action)', match: /^solid/ },
  { title: 'Accent (interaction signal)', match: /^accent/ },
  { title: 'State', match: /^(success|warning|danger|info)/ },
  { title: 'Texture & overlay', match: /^(grid-|overlay|shadow-color)/ },
];

const colorRows = groups
  .map((group) => {
    const rows = colorKeys
      .filter((k) => group.match.test(k))
      .map((k) => `| \`--cs-${k}\` | \`${tokens.color[k].dark}\` | \`${tokens.color[k].light}\` |`)
      .join('\n');
    return `### ${group.title}\n\n| Token | Dark | Light |\n| --- | --- | --- |\n${rows}`;
  })
  .join('\n\n');

const staticGroups = [
  { title: 'Font families', match: /^font-/ },
  { title: 'Font sizes', match: /^fs-/ },
  { title: 'Line heights', match: /^lh-/ },
  { title: 'Weights & tracking', match: /^(fw|tracking)-/ },
  { title: 'Space', match: /^space-/ },
  { title: 'Radius', match: /^radius-/ },
  { title: 'Motion', match: /^(dur|ease)-/ },
  { title: 'Layers & layout', match: /^(z|control|header|sidebar|content)-/ },
  { title: 'Primitive ramps', match: /^(atmos|slate|signal)-/ },
];

const staticRows = staticGroups
  .map((group) => {
    const rows = staticEntries
      .filter(([k]) => group.match.test(k))
      .map(([k, v]) => `| \`--cs-${k}\` | \`${v.replace(/\|/g, '\\|')}\` |`)
      .join('\n');
    return `### ${group.title}\n\n| Token | Value |\n| --- | --- |\n${rows}`;
  })
  .join('\n\n');

const shadowRows = shadowKeys
  .map((k) => `| \`--cs-${k}\` | \`${tokens.shadow[k].dark}\` | \`${tokens.shadow[k].light}\` |`)
  .join('\n');

const md = `# Tokens

GENERATED FILE — do not edit. Source: \`tokens/tokens.json\`.

Every value in the system is a CSS custom property. Components reference **semantic** tokens
only; primitives exist for charts and illustrations.

- Dark is the default (\`:root\`).
- Light is activated by \`<html data-theme="light">\`.
- Total: ${colorKeys.length} themed colours, ${shadowKeys.length} elevations, ${staticEntries.length} static values.

## Colour (themed)

${colorRows}

## Elevation (themed)

| Token | Dark | Light |
| --- | --- | --- |
${shadowRows}

## Static

${staticRows}
`;

writeFileSync(resolve(root, 'skill/reference/tokens.md'), md, 'utf8');
console.log('✓ skill/reference/tokens.md');
