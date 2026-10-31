---
name: cesium-design
description: Build interfaces with the Cesium Design System — a dark-first, data-dense design system for React and Vue, built for geospatial and instrument-style products. Use this skill whenever the task involves UI work that should match this system: dashboards, tables, HUD overlays, forms, inspectors, settings pages, or any component work using @cesium-ds/core. Triggers on "Cesium design", "cesium-ds", "use our design system", "build a dashboard / HUD / inspector", or when the project imports from @cesium-ds/core.
---

# Cesium Design System

A dark-first design system for planetary-scale data. Precision over decoration, data over
chrome, dark by construction, motion as feedback.

This skill tells you **what to build with**, **what never to do**, and **how to compose**
the components into screens that look like they belong to the same product.

---

## 0. Non-negotiables

These six rules are checked by reviewers and by anyone who knows the system. Breaking them
is the difference between "on-system" and "generic dark UI".

1. **Tokens only.** Every colour, space, radius, duration and shadow comes from a `--cs-*`
   variable. No hex values. No `padding: 13px`. No `border-radius: 6px`.
2. **One accent per view.** `--cs-accent` (steel) marks interactive and selected states only —
   links, focus rings, active indicators, the sidebar tick. Never use it for decoration,
   headings, or "brand". **Primary buttons are not accent** — they are `--cs-solid`: white on
   dark, near-black on light. Colour never signals "this is the main action"; contrast does.
3. **Monospace for machine data.** Coordinates, IDs, metrics, timestamps, column headers and
   micro-captions are `--cs-font-mono`. Interface text is `--cs-font-sans`. Display type uses
   `--cs-font-display` — a serif — at `--cs-fw-regular` or `--cs-fw-medium` (never bold) with
   `--cs-tracking-display` (−0.021em); leave `font-optical-sizing: auto` on so the optical axis
   picks the right cut. Serif is for statements and section labels, never for body copy.
4. **Density by default.** Controls are 34px (`md`), interface type is 13px, borders are 1px
   at 9–16% opacity, radii are 2–8px. Nothing is 12px radius except dialogs and drawers.
5. **Every state, always.** Interactive elements ship hover, `:focus-visible`, disabled and
   loading. Data views ship empty and error states.
6. **Never let the platform draw a widget.** No `<select>` popups, `<dialog>`, `<details>`,
   `title` tooltips, default scrollbars, or native range/thumb rendering — every one of them
   drops the theme and looks like a different product. `Select`, `Menu`, `Dropdown`, `Sidebar`,
   `Modal` and `Slider` are all drawn by the system for this reason. Use `.cs-scroll` on any
   scrolling panel. `Checkbox`, `Radio` and `Switch` keep a 1px invisible `<input>` for form
   semantics only — none of it is visible, and the visual is drawn in CSS.

If a needed value does not exist as a token, **use the nearest token** — do not invent one.

---

## 1. Setup

The package is **not on npm yet**. If `@cesium-ds/core` is already in the project's
`package.json`, use it and skip the build. If it is not, install it from the repository:

```bash
git clone https://github.com/brown-sussy/cesium-design-system.git
cd cesium-design-system && npm install && npm run build:lib
# then, in the target project
npm install ../cesium-design-system
```

```tsx
// app entry — once
import '@cesium-ds/core/styles.css';

import { Button, Panel, PanelBody } from '@cesium-ds/core';
```

Working **inside** this repository? Import from `src/index.ts` directly (the docs site aliases
`@cesium-ds/core` to it) — no build step needed, and `npm run dev` serves the docs at
`http://localhost:5178`.

Dark is the default. Light is opt-in:

```ts
document.documentElement.dataset.theme = 'light'; // or remove the attribute for dark
```

Peer dependency: React ≥ 18, or Vue ≥ 3.3 — whichever the host app already runs, and both are
optional in `peerDependenciesMeta`, so installing the package never pulls a framework in. No
CSS-in-JS, no Tailwind, no runtime styling library.

### If the project is Vue

The same components ship at `@cesium-ds/core/vue` — one `.vue` SFC per component, same
`.cs-*` markup, **same stylesheet** (`import '@cesium-ds/core/styles.css'`). Do not write a
second CSS file and do not re-create a component that exists in both builds.

```vue
<script setup lang="ts">
import '@cesium-ds/core/styles.css';
import { Button, Panel, PanelBody } from '@cesium-ds/core/vue';
</script>
```

Vue idioms, not React ones: `v-model` for values, `v-model:open` for overlays,
`@select` on `Menu`/`Sidebar`/`ThreadList`, `#cell-<key>` scoped slots on `Table`
(React's `column.render` only returns text here), `#icon-left` / `#icon-right` on `Button`,
and `app.use(CesiumVue)` to register every component as `<CsButton>`, `<CsPanel>`, …
Typecheck with `vue-tsc`; the exported declarations are plain `.d.ts` and resolve without a
`.vue` shim.

### Start from a page, not a blank file

Four whole-page templates ship with the docs site at `#/templates` — **homepage**, **sign in**,
**settings** (the app shell), **404**. Each is a single `.tsx` file that imports only from
`@cesium-ds/core` and styles itself with `--cs-*` variables, so it drops into a project as-is.

- Building a marketing page, an auth screen, a settings screen or an error page? **Read the
  matching template first** and adapt it, rather than composing from scratch.
- `#/templates/<slug>?view=full` renders it with no docs chrome — that is the page, not a preview.
- The templates are the reference for *page-level* decisions: where the save action lives, how many
  primaries a band gets, how a page reflows without media queries.

---

## 2. The token vocabulary

Memorise these; they cover ~90% of real usage. Full list in `reference/tokens.md`.

| Purpose | Token | Notes |
| --- | --- | --- |
| Page background | `--cs-bg-canvas` | App shell, scroll areas |
| Card / panel surface | `--cs-bg-surface` | Raised one step |
| Dialog / popover | `--cs-bg-raised` | Highest surface |
| Inputs, code, wells | `--cs-bg-inset` | Recessed |
| Hairline | `--cs-border-subtle` | Dividers, card edges |
| Control border | `--cs-border` | Inputs, buttons, table frame |
| Hover border | `--cs-border-strong` | Also disabled text |
| Body text | `--cs-text-secondary` | Default paragraph colour |
| Heading text | `--cs-text-primary` | Values, titles |
| Metadata text | `--cs-text-tertiary` | Hints, column headers |
| Primary action | `--cs-solid` / `--cs-solid-contrast` | White key on dark, near-black on light |
| Interaction | `--cs-accent` | Links, active tab, focus ring, selected row |
| Tint | `--cs-accent-soft` | Focus halo, selected row, subtle button |
| Accent border | `--cs-accent-line` | 1px accent borders |
| Status | `--cs-success` / `--cs-warning` / `--cs-danger` / `--cs-info` | Always paired with a label |
| Spacing | `--cs-space-4 … --cs-space-64` | Named by pixel value |
| Radius | `--cs-radius-sm / md / lg / xl` | 3 / 5 / 8 / 12px |
| Control radius | `--cs-radius-control` | 5px classic, `999px` (capsule) in Plus |
| Duration | `--cs-dur-fast / base / slow` | 120 / 180 / 260ms |
| Elevation | `--cs-shadow-sm / md / lg` | Only for things that float |

Type sizes: `--cs-fs-2xs` 10, `xs` 11, `sm` 12, `base` 13, `md` 14, `lg` 16, `xl` 18,
`2xl` 22, `3xl` 28, `4xl` 36. Pair each with the matching `--cs-lh-*`.

### Motion

Four entrance utilities ship with the stylesheet. They animate opacity plus one transform,
run once, and never loop:

| Class | Effect | Use for |
| --- | --- | --- |
| `cs-anim-fade` | opacity | overlays, swapped panels |
| `cs-anim-rise` | opacity + 10px up | content blocks, cards |
| `cs-anim-scale` | opacity + 0.97 scale | dialogs, popovers |
| `cs-anim-slide` | opacity + 8px sideways | drawers, list rows |

- `cs-stagger` on a parent staggers children 45ms apart.
- `cs-reveal` + `.is-in` is the scroll-reveal pair; add `.is-in` from an IntersectionObserver,
  and gate the hidden state behind a JS-added class so no-JS still shows content.
- Tune with `--cs-anim-dur` and `--cs-anim-delay`.
- Everything collapses under `prefers-reduced-motion: reduce` — do not re-enable it.
- Never loop, never bounce, never animate layout. A looping pulse is reserved for live status.

### Shape presets

Two presets ship in the same stylesheet. Only the radius + elevation layer changes:

| Preset | Activate with | Corners |
| --- | --- | --- |
| **classic** (default) | nothing | 2–16px, instrument-sharp |
| **plus** | `<html data-style="plus">` | 4–30px continuous, softer wider shadows, capsule controls |

- Never mix the two. A product picks one at the root and keeps it.
- Do not hardcode a radius that a preset should control — `--cs-radius-md`, not `5px`.
- Controls (buttons, segmented control, menu triggers) use `--cs-radius-control`; surfaces use the
  `sm → 2xl` ramp.
- The two compose freely with dark/light: `data-style` and `data-theme` are independent attributes.

---

## 3. Choosing components

| You need | Use | Not |
| --- | --- | --- |
| Trigger an action | `Button` | `div onClick` |
| Icon-only action | `IconButton` (requires `label`) | `Button` with only an icon |
| Grouped related actions | `ButtonGroup` | multiple buttons with margins |
| Text input | `Input` + `Field` | raw `<input>` |
| Multi-line / JSON | `Textarea` (`mono`) | `Input` |
| 2–4 exclusive options | `SegmentedControl` | `Select` |
| 5+ exclusive options | `Select` (add `searchable` past ~12) | `SegmentedControl` |
| Actions on one object | `Menu` | `Select` (that is a form value) |
| A surface behind a trigger | `Dropdown` | `Menu` for a form, `Modal` for a decision |
| App navigation | `Sidebar` | a hand-rolled `<ul>` of links |
| Instant on/off | `Switch` | `Checkbox` |
| Deferred on/off | `Checkbox` | `Switch` |
| Status of a thing | `Badge` or `StatusDot` | coloured text |
| Applied filter | `Tag` with `onRemove` | `Badge` |
| Dense records | `Table` | cards in a grid |
| One metric | `Stat` | a styled `<div>` |
| Label/value readout | `KeyValue` | a `<ul>` |
| Grouped content | `Card` | `Panel` |
| Live instrument block | `Panel` | `Card` |
| Row of icon tools | `Toolbar` | loose `IconButton`s |
| Decision / short task | `Modal` | `Drawer` |
| Inspect one object | `Drawer` | `Modal` |
| Inline message | `Alert` | toast, tooltip |
| Camera position | `CoordinateReadout` | custom markup |
| Heading indicator | `Compass` | an icon |
| Map scale | `ScaleBar` | text |
| Shortcut hint | `Kbd` / `KbdGroup` | plain text |
| What the agent did | `ReasoningTrace` | a `<ul>` of sentences |
| One tool invocation | `ToolCall` | a raw `<pre>` |
| Context budget | `ContextMeter` | `Progress` with no scale |
| A chat turn | `Message` inside `MessageList` | `div` bubbles |
| Chat input | `Composer` | `Textarea` + `Button` |
| Waiting on a model | `TypingIndicator` | a bare `Spinner` |
| Conversation list | `ThreadList` | `Menu` |
| A measured value | `Quantity` | `Stat` (a metric, not a measurement) |
| x/y/z components | `VectorReadout` | three `KeyValue` rows |
| Binned distribution | `Histogram` | `Sparkline` (no axes) |
| Detector event | `EventDisplay` | a screenshot |
| Sequence / alignment | `SequenceView` | `<pre>` |
| Dose–response curve | `DoseResponse` | a generic line chart |

`Panel` vs `Card`: **Panel** has a 32px monospace header strip and is dense — use it for
dashboards, inspectors and HUD blocks. **Card** has a 16px padded header and is roomier — use
it for content that is read rather than monitored.

**Science** components are readouts, not charts: they take numbers, units and bins, not a
charting library's config object. Reach for them when the value itself is the content —
a mass with its uncertainty, a spectrum, an event. They render static SVG with no
interaction layer, so they cost nothing to put in a table cell.

---

## 4. Composition recipes

### Page shell

```tsx
<div style={{ minHeight: '100vh', background: 'var(--cs-bg-canvas)' }}>
  <header
    style={{
      height: 'var(--cs-header-h)',
      borderBottom: '1px solid var(--cs-border-subtle)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 var(--cs-space-16)',
      gap: 'var(--cs-space-12)',
    }}
  >
    <span className="cs-mono" style={{ fontSize: 10, letterSpacing: '0.18em' }}>
      ORBITAL OPS
    </span>
    <span className="cs-grow" />
    <Button size="sm" variant="primary">Deploy</Button>
  </header>
  <main style={{ padding: 'var(--cs-space-24)', maxWidth: 1200 }}>{/* … */}</main>
</div>
```

### App shell with a sidebar

```tsx
<div style={{ height: '100vh', display: 'flex', background: 'var(--cs-bg-canvas)' }}>
  <Sidebar
    label="Project"
    sections={[
      { id: 'workspace', title: 'Workspace', items: [
        { id: 'layers', label: 'Layers', icon: 'layers', badge: 12, active, onSelect: go },
        { id: 'assets', label: 'Assets', icon: 'box', badge: 48, onSelect: go },
      ]},
      { id: 'analysis', title: 'Analysis', collapsible: true, items: [
        { id: 'measure', label: 'Measure', icon: 'ruler', onSelect: go },
      ]},
    ]}
  />
  <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
    <Toolbar>{/* … */}</Toolbar>
    <div style={{ flex: 1, minHeight: 0, position: 'relative' }}>{/* globe + HUD */}</div>
  </main>
</div>
```

The sidebar owns its own scroll and its own rail; never wrap it in a scroll container. Give the
globe `flex: 1` and `minWidth: 0` so the canvas can shrink — a Cesium viewer inside a flex row
without `minWidth: 0` will refuse to resize.

### Metric strip above a table

```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 18,
              paddingBottom: 16, borderBottom: '1px solid var(--cs-border-subtle)' }}>
  <Stat label="Tiles ingested" value="12,480" delta={{ value: '4.2%', direction: 'up', label: 'vs 24h' }} />
  <Stat label="Mean decode" value="9.4" unit="ms" spark={[12, 11, 10, 9.4]} />
</div>
```

### Table + side panels

```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.55fr) minmax(0,1fr)', gap: 12 }}>
  <Panel title="Active pipelines" flush>
    <Table columns={columns} rows={rows} rowKey={(r) => r.id} compact selectedKey={id} />
  </Panel>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Panel title="Scene budget" accent>
      <PanelBody>
        <Progress label="Primitives" value={82} showValue thin />
      </PanelBody>
    </Panel>
    <Panel title="Node status">
      <PanelBody><KeyValue items={[...]} /></PanelBody>
    </Panel>
  </div>
</div>
```

### Form row

```tsx
<div className="cs-form-grid">
  <Field label="Layer URL" hint="CORS-enabled tile endpoint." htmlFor="url" required>
    <Input id="url" prefixText="https://" placeholder="tiles.example.com" />
  </Field>
  <Field label="Max level" htmlFor="lvl" error={error}>
    <Input id="lvl" invalid={Boolean(error)} suffixText="lvl" />
  </Field>
</div>
```

### HUD overlay on a scene

Corners are fixed: status **top-left**, compass **top-right**, inspector **bottom-left**,
scale **bottom-right**, coordinates **bottom-centre**. Never cross the middle third.

```tsx
<div className="cs-hud" style={{ position: 'relative', height: 420 }}>
  {/* scene canvas goes here */}
  <div style={{ position: 'absolute', top: 16, left: 16 }}>
    <StatusDot tone="success" label="Live" pulse />
  </div>
  <div style={{ position: 'absolute', top: 16, right: 16 }}>
    <Compass heading={28} size={68} />
  </div>
  <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)' }}>
    <CoordinateReadout lat={37.7749} lon={-122.4194} alt={1284.5} />
  </div>
</div>
```

Overlay surfaces use a frosted inset: `background: color-mix(in srgb, var(--cs-bg-inset) 72%, transparent)`
plus `backdrop-filter: blur(10px)` and `border: 1px solid var(--cs-border-subtle)`.

---

## 5. Patterns that are wrong

```tsx
// ✗ raw colour and magic numbers
<div style={{ background: '#0d1117', padding: 13, borderRadius: 6 }} />

// ✓ tokens
<div style={{ background: 'var(--cs-bg-surface)', padding: 'var(--cs-space-12)',
              borderRadius: 'var(--cs-radius-md)' }} />
```

```tsx
// ✗ two accents competing
<Button variant="primary">Save</Button>
<Button variant="primary">Cancel</Button>

// ✓ one primary, one secondary
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
```

```tsx
// ✗ icon-only control with no accessible name
<IconButton><Icon name="sliders" /></IconButton>

// ✓ labelled
<IconButton label="Layer settings"><Icon name="sliders" size={14} /></IconButton>
```

```tsx
// ✗ status by colour alone
<span style={{ color: 'var(--cs-danger)' }}>Failed</span>

// ✓ status component with text
<StatusDot tone="danger" label="Failed" />
```

```tsx
// ✗ sentence in monospace
<p className="cs-mono">The layer failed to load because the token expired.</p>

// ✓ monospace only for machine values
<p>The layer failed to load. Token expired <span className="cs-mono">2026-10-18T10:40Z</span>.</p>
```

---

## 6. Checklist before you finish

- [ ] No hex colours, no arbitrary px in the diff — grep for `#` and `px` in inline styles.
- [ ] Exactly one `variant="primary"` per visible region.
- [ ] Every icon-only control has a `label`.
- [ ] Every form control is wrapped in `Field` with a label.
- [ ] Tables: numeric columns `align: 'right'` + `mono: true`; status columns use `StatusDot`.
- [ ] Empty state provided for tables and lists.
- [ ] Focus states survive: do not set `outline: none` without a replacement ring.
- [ ] Light theme checked if the product supports it.
- [ ] Long lists of numbers are `font-variant-numeric: tabular-nums` (built into `Stat`, `KeyValue`, table numerics).

---

## 7. References

- `reference/tokens.md` — every token, both themes, with values.
- `reference/components.md` — props and copy-ready snippets for all 40 components.
- `reference/patterns.md` — four complete compositions: dashboard, HUD, settings form, inspector.
- Docs site `#/templates` — four complete pages as single files: homepage, sign in, settings, 404.

When in doubt: fewer colours, smaller radii, more whitespace between groups, monospace for
anything a machine produced.
