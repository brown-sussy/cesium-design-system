# Component reference

All components are exported from the package root:

```tsx
import { Button, Panel, Table } from '@cesium-ds/core';
```

Every component accepts `className` and spreads native DOM attributes. Refs are forwarded where
the underlying element is interactive (`Button`, `Input`, `Textarea`, `Select`, `Checkbox`,
`Radio`, `Switch`, `Slider`).

---

## Actions

### Button

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `variant` | `primary \| secondary \| ghost \| subtle \| danger \| danger-ghost` | `secondary` | One `primary` per region. `primary` is `--cs-solid` — white on dark, near-black on light — never the accent. |
| `size` | `sm \| md \| lg` | `md` | 28 / 34 / 40px. |
| `loading` | `boolean` | `false` | Swaps content for a spinner, sets `aria-busy`. |
| `block` | `boolean` | `false` | Full width. |
| `iconLeft` / `iconRight` | `ReactNode` | — | Icon slot, 12–16px. |
| `disabled` | `boolean` | `false` | 42% opacity. |

```tsx
<Button variant="primary" iconLeft={<Icon name="play" size={13} />}>Run</Button>
<Button variant="secondary" loading>Deploying</Button>
```

### IconButton

Requires `label` (becomes `aria-label` + `title`).

```tsx
<IconButton label="Layer settings" variant="ghost" size="sm">
  <Icon name="sliders" size={14} />
</IconButton>
```

### ButtonGroup

Collapses radii and overlaps 1px borders. Children must be `Button`/`IconButton`.

```tsx
<ButtonGroup aria-label="Range">
  <Button size="sm" variant="secondary">1H</Button>
  <Button size="sm" variant="secondary">24H</Button>
</ButtonGroup>
```

---

## Forms

### Input

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `size` | `sm \| md \| lg` | `md` | |
| `invalid` | `boolean` | `false` | Danger border + `aria-invalid`. |
| `prefix` / `suffix` | `ReactNode` | — | Icons or elements. |
| `prefixText` / `suffixText` | `string` | — | Monospace affixes (protocols, units). |

```tsx
<Input prefixText="https://" placeholder="tiles.example.com" suffixText=".json" />
```

`SearchInput` adds a search glyph and a clear button (`onClear`).

### Textarea

`mono` for JSON/config, `rows`, `invalid`.

```tsx
<Textarea mono rows={5} defaultValue={'{\n  "level": 16\n}'} />
```

### Select

A listbox drawn by the system. The native `<select>` popup is the one surface a design system
cannot style — macOS and Windows each render their own menu and ignore every token — so this is a
portalled listbox with the same semantics.

```tsx
<Select
  label="Projection"
  value={epsg}
  onValueChange={setEpsg}
  options={[
    { value: '3857', label: 'EPSG:3857 — Web Mercator' },
    { value: '4326', label: 'EPSG:4326 — WGS 84' },
    { value: '4978', label: 'EPSG:4978 — ECEF', hint: 'geocentric' },
  ]}
/>
```

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `options` | `SelectOption[]` | — | `{ value, label, disabled?, hint? }`. |
| `value` / `onValueChange` | `string` / `fn` | — | Fires on commit, not on highlight. |
| `searchable` | `boolean` | `false` | Filter field, focused on open. Past ~12 options. |
| `size` | `sm \| md \| lg` | `md` | Matches the control heights. |
| `name` | `string` | — | Posts the value through a hidden input. |
| `invalid` / `disabled` | `boolean` | `false` | |

Keyboard: `ArrowUp/Down`, `Home/End`, `Enter`, `Esc`, and typeahead without opening the panel
first. `role="combobox"` + `aria-activedescendant` drive it.

### Checkbox / Radio / RadioGroup

```tsx
<Checkbox label="Terrain" checked={v} onChange={e => setV(e.target.checked)} />
<Checkbox label="Partial" indeterminate />
<RadioGroup name="crs" value={v} onChange={setV} options={[{ value: '3857', label: 'Web Mercator' }]} />
```

### Switch

Instant-effect toggle. `label`, `size: 'sm' | 'md'`, `checked`, `disabled`.

### Slider

A track, a fill and a thumb drawn by the system — no native range input, so ticks, the drag
readout and the hit area are all ours.

| Prop | Type | Default |
| --- | --- | --- |
| `value` / `min` / `max` / `step` | `number` | `0 / 0 / 100 / 1` |
| `onValueChange` | `(n: number) => void` | — |
| `showValue` | `boolean` | `false` |
| `formatValue` | `(n: number) => string` | — |
| `ticks` | `number[]` | — |
| `name` | `string` | — |

```tsx
<Slider label="Opacity" value={v} onValueChange={setV} showValue
        ticks={[0, 25, 50, 75, 100]} formatValue={(n) => `${n}%`} />
```

`role="slider"` with `aria-valuetext` from `formatValue`. Arrows step, `PageUp/Down` step by ten,
`Home/End` jump to the bounds.

### Field

Wraps any control with a label, hint and error. `error` replaces `hint`.

```tsx
<Field label="Tile endpoint" hint="HTTPS only." error={err} required htmlFor="ep">
  <Input id="ep" invalid={Boolean(err)} />
</Field>
```

### SegmentedControl

```tsx
<SegmentedControl
  value={mode}
  onChange={setMode}
  options={[{ value: '2d', label: '2D' }, { value: '3d', label: '3D' }]}
  accent        // optional: tinted active segment
  block         // optional: full width
/>
```

---

## Display

### Badge

`tone: neutral | accent | success | warning | danger | info`, `dot`, `solid`.
Monospace uppercase 10px — metadata only, never interactive.

### Tag

`accent`, `onRemove`, `icon`. Removable chips for applied filters.

### Avatar

`name`, `src`, `size: xs|sm|md|lg|xl`, `square`, `accent`, `status`.

### Kbd / KbdGroup

```tsx
<Kbd>Esc</Kbd>
<KbdGroup keys={['⌘', 'K']} />
```

### StatusDot

`tone: neutral|accent|success|warning|danger`, `label`, `pulse`. Always pass a label.

### Spinner

`size: sm|md|lg`, `inherit` (uses currentColor).

### Progress

`value`, `max`, `label`, `tone`, `indeterminate`, `thin`, `showValue`, `formatValue`.

### Skeleton / SkeletonText

`variant: text|circle|rect`, `width`, `height`; `SkeletonText` takes `lines`.

### Divider

`orientation: horizontal|vertical`, `label` (centred monospace caption).

### Tooltip

`content`, `placement: top|bottom|left|right`. Opens on hover and focus. No interactive content.

### Icon

44 glyphs, 24px grid, 1.5px stroke.

```
globe layers box compass map-pin crosshair gauge activity search sliders table code
terminal palette type ruler zap sparkles download external grid book play plus minus
check close chevron-down chevron-up chevron-left chevron-right arrow-right
arrow-up-right arrow-down menu copy info warning success error sun moon command panel-left
```

```tsx
<Icon name="compass" size={16} />
```

---

## Layout

### Card / CardHeader / CardBody / CardFooter

`Card`: `interactive`, `accent`, `flush`. Header: `title`, `desc`, `actions`.

### Panel / PanelBody

The dense instrument container: 34px monospace header strip.

`Panel`: `title`, `actions`, `accent` (2px gradient hairline), `flush` (no body padding).

```tsx
<Panel title="Camera state" accent actions={<IconButton label="Refresh" size="sm" />}>
  <PanelBody><KeyValue items={items} /></PanelBody>
</Panel>
```

### Toolbar / ToolbarSeparator

Row of icon buttons with 1px separators. `label` adds a leading monospace caption.

---

## Data

### Table

```tsx
const columns: Column<Row>[] = [
  { key: 'name', header: 'Asset', primary: true },
  { key: 'size', header: 'Size', align: 'right', mono: true },
  { key: 'state', header: 'State', render: (r) => <StatusDot tone={r.tone} label={r.state} /> },
];

<Table columns={columns} rows={rows} rowKey={(r) => r.id} compact
       selectedKey={id} onRowClick={(r) => setId(r.id)} />
```

Column fields: `key`, `header`, `align`, `width`, `mono`, `primary`, `render`.
Table props: `rows`, `rowKey`, `compact`, `selectedKey`, `onRowClick`, `empty`.

### Stat

`label`, `value`, `unit`, `delta: { value, direction, label }`, `spark: number[]`, `size`.

### KeyValue

```tsx
<KeyValue items={[
  { key: 'Scene mode', value: '3D' },
  { key: 'Projection', value: 'EPSG:4978' },
  { key: 'Tileset', value: '1 / 3', dim: true },
]} />
```

### Sparkline

`data`, `width`, `height`, `area`, `showDot`, `color`.

### CoordinateReadout

`lat`, `lon`, `alt`, `precision` (default 4), `altUnit`, `accentAlt`.

### Legend

`items: { label, value?, color?, shape?: 'square'|'line'|'circle' }[]`, `column`.

---

## Navigation

### Tabs

```tsx
<Tabs value={tab} onChange={setTab} variant="underline"
      items={[{ id: 'layers', label: 'Layers', count: 12 }]} />
```

### Breadcrumb

`items: { label, href?, onClick? }[]`, `separator` (default `/`).

### Pagination

`page`, `pageCount`, `onChange`, `showMeta`, `total`, `pageSize`.

### Menu

A dropdown of actions for one object. Portalled to `document.body`, so a parent with
`overflow: hidden` never clips it. Keyboard: `ArrowUp/Down` cycle, `Home/End` jump, `Esc` closes
and returns focus to the trigger.

```tsx
<Menu
  label="Layer actions"
  icon="sliders"
  align="start"                 // or 'end' to pin to the trigger's right edge
  items={[
    { header: 'Sort by' },      // group label
    { id: 'name', label: 'Name', checked: true },   // menuitemcheckbox
    'separator',
    { id: 'export', label: 'Export', icon: 'download', shortcut: '⌘E', onSelect: run },
    { id: 'archive', label: 'Archive', disabled: true },
    { id: 'delete', label: 'Delete', danger: true, onSelect: drop },
  ]}
/>
```

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `items` | `MenuEntry[]` | — | Items, `'separator'`, or `{ header }`. |
| `label` | `string` | — | Accessible name; also the default trigger text. |
| `trigger` | `ReactNode` | — | Replaces the trigger contents (icon-only, avatar). |
| `align` | `'start' \| 'end'` | `'start'` | Which trigger edge the list aligns to. |
| `width` | `number` | trigger width | Minimum list width. |

Use `Menu` for actions on a thing. Use `Select` when the choice is a form value, `Dropdown` when
the trigger opens a surface rather than a list of verbs, and `Tabs` when the choices are views.

### Sidebar

The navigation spine: sections of rows, one active row, optional folding, optional icon rail.

```tsx
<Sidebar
  label="Project"
  sections={[
    { id: 'workspace', title: 'Workspace', items: [
      { id: 'layers', label: 'Layers', icon: 'layers', badge: 12, active: true, onSelect: go },
      { id: 'assets', label: 'Assets', icon: 'box', badge: 48, onSelect: go },
    ]},
    { id: 'analysis', title: 'Analysis', collapsible: true, items: [
      { id: 'measure', label: 'Measure', icon: 'ruler', onSelect: go },
    ]},
  ]}
  footer={<span className="cs-t-2xs cs-mono cs-dimmer">v1.0.0</span>}
/>
```

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `sections` | `SidebarSection[]` | — | `title?`, `count?`, `href?`, `collapsible?`, `items`, `groups?`. |
| `items` | `SidebarItem[]` | — | `id`, `label`, `icon?`, `href?`, `badge?`, `active?`, `disabled?`. |
| `collapsed` | `boolean` | `false` | 56px rail; labels become a flyout on hover/focus. |
| `rail` | `boolean` | `true` | Travelling accent tick on the active row. |
| `header` / `footer` | `ReactNode` | — | Pinned outside the scrolling nav. |

- `groups` adds one level of sub-headings — a category list inside a "Components" section.
- Folding animates `grid-template-rows: 0fr → 1fr`; nothing is measured, nothing jumps.
- `ArrowUp/Down` rove between rows, `Home/End` jump. The active row is `aria-current="page"`.
- On first paint the nav parks the heading that owns the active row at the top — not a minimal scroll that pins the row to the bottom edge and hides its hierarchy. Later route changes only nudge when the row is out of view, so folding or resizing never yanks the nav.
- The nav is a single `<nav>` landmark; give it a `label`.

---

## Overlay

### Dropdown

A trigger with a floating panel of arbitrary content — filters, mini forms, detail cards. The
difference from `Menu` is the payload: a Menu is a list of verbs and owns its keyboard model; a
Dropdown is a surface and hands focus to whatever you put inside.

```tsx
<Dropdown label="Filters" width={252} trigger={<><Icon name="sliders" /> Filters</>}>
  <DropdownHeader title="Visible layers" hint="2 of 3" />
  <Checkbox label="Terrain" checked={terrain} onChange={setTerrain} />
  <DropdownFooter>
    <Button size="sm" variant="ghost" data-dropdown-close>Reset</Button>
    <Button size="sm" variant="primary" data-dropdown-close>Apply</Button>
  </DropdownFooter>
</Dropdown>
```

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `trigger` / `children` | `ReactNode` | — | Trigger contents; panel content. |
| `align` | `'start' \| 'end'` | `'start'` | Which trigger edge the panel hangs from. |
| `side` | `'bottom' \| 'top' \| 'auto'` | `'bottom'` | Flips when there is no room. |
| `width` / `matchWidth` | `number` / `boolean` | content / `false` | |
| `closeOnAction` | `boolean` | `true` | Honours `data-dropdown-close` descendants. |
| `open` / `onOpenChange` | `boolean` / `fn` | — | Controlled. |

`role="dialog"`, focus in on open, focus back to the trigger on `Esc`. Header and footer are
sticky; the panel is portalled and never clipped.

### Modal

`open`, `onClose`, `title`, `description`, `footer`, `width` (default 480), `hideClose`,
`closeOnOverlay`. Escape closes, body scroll locks, focus moves into the panel.

### Drawer

`open`, `onClose`, `title`, `footer`, `width` (default 420). Slides from the right.

### Alert

`tone: accent|success|warning|danger|neutral`, `title`, `children`, `icon`, `onClose`.
Inline message with a 2px semantic leading rule.

---

## HUD

### Compass

`heading` (degrees, 0 = north), `size` (default 72), `showHeading` (readout chip renders below the dial at ≥80px, adding ~16px of height).

The card — ticks and N/E/S/W — is fixed. Only the needle rotates, by `-heading`, because it points
at north rather than at the camera. `heading={28}` therefore puts the needle 28° west of the top.

### ScaleBar

`distance`, `unit` (default `km`), `width` (default 132), `label`.

```tsx
<ScaleBar distance={500} unit="km" width={148} />
```

---

## HUD surface utility

`className="cs-hud"` gives the scene backdrop: dark inset, 28px graticule, accent bloom.
`className="cs-hud__corner cs-hud__corner--tl"` (and `-tr`, `-bl`, `-br`) draws the corner
brackets.

Frosted overlay recipe:

```css
background: color-mix(in srgb, var(--cs-bg-inset) 72%, transparent);
border: 1px solid var(--cs-border-subtle);
backdrop-filter: blur(10px);
border-radius: var(--cs-radius-md);
box-shadow: var(--cs-shadow-md);
```

---

## Utility classes

| Class | Effect |
| --- | --- |
| `.cs-mono` | Monospace + 0.02em tracking |
| `.cs-tabular` | `font-variant-numeric: tabular-nums` |
| `.cs-eyebrow` | 10px mono uppercase, 0.14em |
| `.cs-label` | 12px medium, wide tracking |
| `.cs-stack` | Column flex, gap `--cs-gap` (16 default) |
| `.cs-row` | Row flex, centred, gap `--cs-gap` (8 default) |
| `.cs-grow` | `flex: 1 1 auto; min-width: 0` |
| `.cs-graticule` | 32px hairline grid background |
| `.cs-atmosphere` | Radial accent glow behind an element |
| `.cs-t-2xs … .cs-t-5xl` | Type size + matching line-height |
| `.cs-form-grid` | Two-column responsive form grid |
