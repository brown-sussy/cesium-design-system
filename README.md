# Cesium Design System

**Precision interfaces for planetary-scale data.**

[![CI](https://github.com/brown-sussy/cesium-design-system/actions/workflows/ci.yml/badge.svg)](https://github.com/brown-sussy/cesium-design-system/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-7BB1C6?style=flat-square)](LICENSE)
[![React ≥ 18](https://img.shields.io/badge/react-%E2%89%A5%2018-7BB1C6?style=flat-square)](package.json)
[![Live docs](https://img.shields.io/badge/docs-live-7BB1C6?style=flat-square)](https://brown-sussy.github.io/cesium-design-system/)

A dark-first design system for geospatial, instrument-like products: one accent colour, a cool
neutral ramp, monospace for anything a machine produced, and a HUD layer built for globes and
maps.

It ships five things that stay in sync:

| Deliverable | Path | What it is |
| --- | --- | --- |
| Design tokens | `tokens/tokens.json` → `src/styles/tokens.css` | 153 design tokens, dark + light + 2 shape presets, compiled from one JSON source |
| React library | `src/` | 40 typed components, zero runtime dependencies |
| Page templates | `docs/templates/` | 4 complete pages — homepage, sign in, settings, 404 — each one file |
| Documentation site | `docs/` | Live examples, prop tables, foundations, patterns |
| Agent skill | `skill/` | `SKILL.md` + three references so an AI agent can build on-system UI |

---

## Why it looks the way it does

- **Dark by construction.** The default theme is a true neutral void (`#08090A`) — no blue cast in
  a single surface, border or label. Light is designed value-by-value, not inverted.
- **Grey structure, white action.** The primary button is a solid key: white on dark, near-black
  on light (`--cs-solid`). Colour never marks the main action — contrast does.
- **One accent, earned.** Steel (`#7BB1C6` dark / `#2A6E85` light) is reserved for interactive and
  selected states. Status colours appear only when something has a state.
- **Density with air.** 28 / 34 / 40px controls, 13px interface type, 1px borders at 9–16%
  opacity, radii of 2–8px.
- **Two shape languages.** `classic` is the instrument: 2–16px corners, hairline structure. `plus`
  swaps in continuous Apple-style corners (4–30px), capsule controls and softer, wider elevation.
  One `<html data-style="plus">` attribute, no rebuild — and it composes with both themes.
- **Type with three voices.** Newsreader — a serif with an `opsz 6–72` axis — sets every heading,
  section label and the wordmark at 400/500 weight. Instrument Sans does the interface work.
  JetBrains Mono carries anything a machine produced. Display tracking steps to `-0.021em`, and
  `font-optical-sizing: auto` lets each size pick its own cut.
- **Instrument language.** Monospace labels, tabular figures, dotted leaders, uppercase
  micro-captions, 2px gradient hairlines on panels.
- **Motion as feedback.** 80–260ms, mechanical easing, no infinite motion except a live pulse.

---

## Quick start

The package is **not on npm yet** — the name `@cesium-ds/core` is what it will publish under, so
install from this repository for now:

```bash
git clone https://github.com/brown-sussy/cesium-design-system.git
cd cesium-design-system
npm install
npm run build:lib     # → dist/ : ESM + CJS + .d.ts + cesium-ds.css
npm run dev           # documentation site at http://localhost:5178
```

Then point your app at the local package:

```bash
npm install ../cesium-design-system
```

```tsx
import '@cesium-ds/core/styles.css';
import { Button, Panel, PanelBody, CoordinateReadout } from '@cesium-ds/core';

export function App() {
  return (
    <Panel title="Camera" accent>
      <PanelBody>
        <CoordinateReadout lat={37.7749} lon={-122.4194} alt={1284.5} />
        <Button variant="primary">Deploy</Button>
      </PanelBody>
    </Panel>
  );
}
```

Light theme: `document.documentElement.dataset.theme = 'light'`.

No build step and no CSS framework needed at the consumer end — `styles.css` is a single compiled
stylesheet, and the components ship as ES modules with type declarations.

---

## Repository layout

```
cesium-design-system/
├── tokens/tokens.json          single source of truth for every value
├── scripts/
│   ├── build-tokens.mjs        JSON → CSS variables + tokens.json + skill reference
│   ├── build-docs-nav.mjs      content registry → docs navigation index (metadata only)
│   └── shots.mjs               screenshot harness (playwright)
├── src/
│   ├── index.ts                public API
│   ├── components/             one file per component, all typed
│   ├── lib/cx.ts               class name helper
│   └── styles/
│       ├── tokens.css          GENERATED — do not edit
│       ├── base.css            reset, document type, focus, scrollbars, textures
│       ├── utilities.css       the small utility layer
│       └── components/*.css    actions, forms, display, layout, data, nav, overlay, hud
├── docs/                       documentation site (Vite + React)
│   ├── content/                component docs as data
│   ├── pages/                  home, foundations, component page, patterns, resources
│   ├── templates/              whole-page templates, one file each
│   └── docs.css                docs-only chrome
└── skill/
    ├── SKILL.md
    └── reference/{tokens,components,patterns}.md
```

---

## Components (40)

**Actions** — Button, IconButton, ButtonGroup
**Forms** — Input, SearchInput, Textarea, Select, Checkbox, Radio, RadioGroup, Switch, Slider,
Field, SegmentedControl
**Display** — Badge, Tag, Avatar, Kbd, KbdGroup, StatusDot, Spinner, Progress, Skeleton,
Divider, Tooltip, Icon (44 glyphs)
**Layout** — Card, Panel, Toolbar
**Data** — Table, Stat, KeyValue, Sparkline, CoordinateReadout, Legend
**Navigation** — Tabs, Breadcrumb, Pagination, Menu, Sidebar
**Overlay** — Dropdown, Modal, Drawer, Alert
**HUD** — Compass, ScaleBar, plus the `.cs-hud` surface utility

Nothing in that list is a native browser widget. `Select` is a portalled listbox rather than a
`<select>` popup, `Slider` is a `role="slider"` track rather than a range input, `Menu` and
`Dropdown` are measured popovers, and `.cs-scroll` replaces the platform scrollbar. The one
exception is deliberate: `Checkbox` / `Radio` / `Switch` keep a 1px invisible `<input>` so forms
and screen readers keep working — nothing of it is drawn.

---

## Templates

Four complete pages live in `docs/templates/`, on the docs site at `#/templates`:

| Template | What it is | Composed from |
| --- | --- | --- |
| **Homepage** | Marketing landing page: split hero with a drawn scene card, metric strip, three features, closing CTA, footer | Button, Badge, Icon, StatusDot |
| **Sign in** | Centred auth card over a gridded void, remembered-session checkbox, SSO fallback | Field, Input, Checkbox, Button |
| **Settings** | The app shell: 252px sidebar that folds to a 56px rail, pinned header, tabbed panels, danger zone | Sidebar, Tabs, Panel, Field, Select, Switch, Avatar |
| **404** | Signal lost: mono status line, 120px numeral, one display sentence, two actions | Button, Icon |

Each template is **one `.tsx` file** that imports only from `@cesium-ds/core` and styles itself
with `--cs-*` variables — no local stylesheet, no build step. The same file is the rendered page,
the thumbnail on the index, and the source shown beside it (`?raw`), so the three cannot drift.

`#/templates/settings?view=full` renders a template with no docs chrome at all — that is what
"Open full page" links to, and it is the closest thing to opening the file in your own app.

---

## Site performance

The docs ship as **route-split chunks**, not one bundle. The landing page is eager; every other
page is a `React.lazy` module, so opening the site to read about `Button` no longer downloads the
foundations essays, both patterns, four templates and all 40 component pages first.

```
before   index.js  410 kB (118 kB gzip)   ← one bundle, everything
after    index.js   71 kB ( 23 kB gzip)   ← chrome + landing page
         react.js  138 kB ( 45 kB gzip)   ← vendor, cached across deploys
         + one chunk per page, on demand
```

Two rules keep it that way:

- **The chrome never imports the content registry.** `docs/content/*.tsx` carries every demo
  component and copy-ready source string. The sidebar only needs names and categories, so
  `scripts/build-docs-nav.mjs` bundles the real registry in Node and emits
  `docs/content/nav.generated.ts` — metadata only, generated from the same source, so it cannot
  drift. Importing `registry` from `Chrome.tsx` or `site.ts` would put all of it back in the entry.
- **Links prefetch on intent.** Hovering or tabbing to any `#/` link starts fetching that page's
  chunk (`docs/lib/prefetch.ts`), so the Suspense fallback is effectively never seen.

The display serif is instanced to the `400–500` weight range it is actually drawn at (the optical
size axis is intact), which took it from 129 kB to 86 kB.

---

## Scripts

| Command | Does |
| --- | --- |
| `npm run tokens` | Compile `tokens/tokens.json` → CSS, JSON bundle, skill reference |
| `npm run docs:nav` | Rebuild the docs navigation index from the content registry |
| `npm run dev` | Documentation site at `http://localhost:5178` |
| `npm run build` | Tokens → library (`dist/`) → static site (`site/`) |
| `npm run build:lib` | Library only (ESM + CJS + `.d.ts` + `cesium-ds.css`) |
| `npm run build:docs` | Static documentation site |
| `npm run typecheck` | `tsc --noEmit` across library and docs |

---

## Theming

Every value is a CSS variable, so a theme swap is one attribute:

```ts
document.documentElement.dataset.theme = 'light';
```

To rebrand the accent, override the semantic family — never the component CSS:

```css
.brand-scope {
  --cs-accent: #f2b33d;
  --cs-accent-hover: #ffc964;
  --cs-accent-soft: rgba(242, 179, 61, 0.12);
  --cs-accent-line: rgba(242, 179, 61, 0.38);
  --cs-accent-contrast: #1a1204;
}
```

---

## Agent skill

```bash
cp -r skill ~/.workbuddy-ai/skills/cesium-design
```

Then ask for UI work by name: *“Build the ingest dashboard using the cesium-design skill.”*
The skill encodes the token vocabulary, the component APIs, four composition recipes and the
anti-patterns that generic dark UIs fall into.

---

## Browser support

Chrome / Edge 111+, Safari 16.4+, Firefox 113+. `color-mix()` is used for a small number of
derived borders and tints; older browsers fall back to transparent borders without breaking
layout.

---

## Contributing

Issues and pull requests are welcome — see [CONTRIBUTING.md](CONTRIBUTING.md) for the layout, the
token workflow and the checks that run in CI. The short version: edit `tokens/tokens.json` (never
`tokens.css`, it is generated), keep component CSS on `--cs-*` variables, and run
`npm run typecheck && npm run build` before opening a PR.

---

## License

[MIT](LICENSE) © Cesium Design System

Fonts are licensed separately, all under the SIL Open Font License 1.1: Newsreader, Instrument
Sans and JetBrains Mono. License texts are in [`docs/public/fonts/`](docs/public/fonts/) alongside
the `.woff2` files. The Newsreader binary here is a narrowed instance of the upstream variable
font (weight axis restricted to 400–500, optical size axis 6–72 intact); the upstream license
declares no Reserved Font Name, so the modified build keeps the family name.
