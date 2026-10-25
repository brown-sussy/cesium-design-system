import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Panel,
  PanelBody,
  Toolbar,
  ToolbarSeparator,
  Button,
  IconButton,
  Icon,
  Table,
  Badge,
  StatusDot,
  Stat,
  KeyValue,
  Sparkline,
  CoordinateReadout,
  Legend,
  Progress,
  SegmentedControl,
  type Column,
} from '@cesium-ds/core';
import { useState } from 'react';
import type { ComponentDoc } from './types';

/* ------------------------------------------------------------------ */

function CardDemo() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 300px)', gap: 14 }}>
      <Card>
        <CardHeader
          title="Scene budget"
          desc="Per-frame allocation across primitives."
          actions={<Badge tone="warning">Near limit</Badge>}
        />
        <CardBody>
          <Progress label="Primitives" value={82} showValue />
        </CardBody>
        <CardFooter>
          <Button size="sm" variant="ghost">
            Details
          </Button>
          <Button size="sm" variant="secondary">
            Tune
          </Button>
        </CardFooter>
      </Card>
      <Card interactive>
        <CardHeader title="Imagery layer" desc="Sentinel-2 · 10 m · 2026-10-18" />
        <CardBody>
          <div className="cs-row" style={{ gap: 10 }}>
            <span
              style={{
                width: 56,
                height: 40,
                borderRadius: 3,
                background:
                  'linear-gradient(135deg, #1b3d2f 0%, #2f5a3a 45%, #3d6b4a 70%, #24406b 100%)',
                border: '1px solid var(--cs-border-subtle)',
              }}
            />
            <div className="cs-stack" style={{ gap: 2 }}>
              <span className="cs-t-sm" style={{ color: 'var(--cs-text-primary)' }}>
                T31TCH_20261018T104021
              </span>
              <span className="cs-t-xs cs-dimmer cs-mono">COG · 412 MB · EPSG:32631</span>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

function PanelDemo() {
  return (
    <div style={{ width: 320 }}>
      <Panel
        title="Camera state"
        accent
        actions={
          <IconButton label="Refresh" size="sm" variant="ghost">
            <Icon name="activity" size={12} />
          </IconButton>
        }
      >
        <PanelBody>
          <KeyValue
            items={[
              { key: 'Latitude', value: '37.7749° N' },
              { key: 'Longitude', value: '122.4194° W' },
              { key: 'Height', value: '1,284.5 m' },
              { key: 'Heading', value: '042.0°' },
            ]}
          />
        </PanelBody>
      </Panel>
    </div>
  );
}

function ToolbarDemo() {
  return (
    <Toolbar label="Scene">
      <IconButton label="Layers" size="sm" variant="ghost">
        <Icon name="layers" size={13} />
      </IconButton>
      <IconButton label="Imagery" size="sm" variant="ghost">
        <Icon name="globe" size={13} />
      </IconButton>
      <IconButton label="Measure" size="sm" variant="ghost">
        <Icon name="ruler" size={13} />
      </IconButton>
      <ToolbarSeparator />
      <IconButton label="Zoom out" size="sm" variant="ghost">
        <Icon name="minus" size={13} />
      </IconButton>
      <IconButton label="Zoom in" size="sm" variant="ghost">
        <Icon name="plus" size={13} />
      </IconButton>
      <ToolbarSeparator />
      <IconButton label="Settings" size="sm" variant="ghost">
        <Icon name="sliders" size={13} />
      </IconButton>
    </Toolbar>
  );
}

type Asset = {
  id: string;
  name: string;
  type: string;
  size: string;
  updated: string;
  state: 'ready' | 'processing' | 'failed';
};

const assets: Asset[] = [
  { id: 'a1', name: 'World Terrain', type: 'Terrain', size: '2.4 GB', updated: '2 min ago', state: 'ready' },
  { id: 'a2', name: 'T31TCH_20261018', type: 'Imagery', size: '412 MB', updated: '18 min ago', state: 'ready' },
  { id: 'a3', name: 'Denver 3D Tiles', type: '3D Tiles', size: '8.1 GB', updated: '1 hr ago', state: 'processing' },
  { id: 'a4', name: 'Global Labels', type: 'Vector', size: '96 MB', updated: '3 hr ago', state: 'ready' },
  { id: 'a5', name: 'Radar Mosaic', type: 'Raster', size: '—', updated: '6 hr ago', state: 'failed' },
];

const columns: Array<Column<Asset>> = [
  { key: 'name', header: 'Asset', primary: true },
  { key: 'type', header: 'Type' },
  { key: 'size', header: 'Size', align: 'right', mono: true },
  { key: 'updated', header: 'Updated', align: 'right', mono: true },
  {
    key: 'state',
    header: 'State',
    render: (row) => (
      <StatusDot
        tone={row.state === 'ready' ? 'success' : row.state === 'processing' ? 'accent' : 'danger'}
        label={row.state}
        pulse={row.state === 'processing'}
      />
    ),
  },
];

function TableDemo() {
  const [selected, setSelected] = useState('a2');
  return (
    <div style={{ width: 560 }}>
      <Table
        columns={columns}
        rows={assets}
        rowKey={(row) => row.id}
        selectedKey={selected}
        onRowClick={(row) => setSelected(row.id)}
      />
    </div>
  );
}

function TableCompact() {
  return (
    <div style={{ width: 520 }}>
      <Table
        compact
        columns={[
          { key: 'name', header: 'Layer' },
          { key: 'vis', header: 'Visible', align: 'right', mono: true },
        ]}
        rows={[
          { name: 'Terrain', vis: 'true' },
          { name: 'Imagery', vis: 'true' },
          { name: 'Labels', vis: 'false' },
        ]}
        rowKey={(r) => r.name}
      />
    </div>
  );
}

function StatDemo() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 190px)', gap: 26 }}>
      <Stat label="Tiles loaded" value="12,480" delta={{ value: '4.2%', direction: 'up', label: 'vs 24h' }} />
      <Stat label="Mean frame" value="9.4" unit="ms" spark={[12, 11, 12.5, 10.2, 9.8, 9.6, 9.4, 9.1]} />
      <Stat label="Errors" value="3" delta={{ value: '2', direction: 'down', label: 'vs 24h' }} />
    </div>
  );
}

function KeyValueDemo() {
  return (
    <div style={{ width: 320 }}>
      <KeyValue
        items={[
          { key: 'Scene mode', value: '3D' },
          { key: 'Projection', value: 'EPSG:4978' },
          { key: 'Terrain', value: 'CWT · level 14' },
          { key: 'Tileset', value: '1 / 3 loaded', dim: true },
          { key: 'Frame budget', value: '16.6 ms' },
        ]}
      />
    </div>
  );
}

function SparklineDemo() {
  return (
    <div className="cs-stack" style={{ width: 320, gap: 16 }}>
      <Sparkline data={[4, 9, 7, 12, 10, 15, 13, 18, 16, 21, 19, 24]} width={320} height={44} showDot />
      <Sparkline data={[18, 16, 17, 12, 14, 9, 11, 7, 8, 5]} width={320} height={30} area={false} />
      <Sparkline
        data={[2, 3, 3, 4, 6, 5, 7, 9, 8, 11, 12, 12]}
        width={320}
        height={30}
        color="var(--cs-success)"
      />
    </div>
  );
}

function CoordinateDemo() {
  return (
    <div className="cs-stack" style={{ gap: 12 }}>
      <CoordinateReadout lat={37.7749} lon={-122.4194} alt={1284.5} />
      <CoordinateReadout lat={-33.8688} lon={151.2093} alt={42} precision={5} altUnit="km" />
    </div>
  );
}

function LegendDemo() {
  return (
    <div style={{ width: 300 }}>
      <Legend
        column
        items={[
          { label: 'Confirmed', value: '12', color: 'var(--cs-success)' },
          { label: 'Processing', value: '4', color: 'var(--cs-accent)' },
          { label: 'Degraded', value: '2', color: 'var(--cs-warning)' },
          { label: 'Failed', value: '1', color: 'var(--cs-danger)' },
        ]}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

export const layoutData: ComponentDoc[] = [
  {
    slug: 'card',
    name: 'Card',
    category: 'Layout',
    status: 'Stable',
    summary: 'Grouped content on a raised surface with an optional header and footer.',
    examples: [
      {
        title: 'Anatomy',
        description: 'The interactive variant lifts 2px and deepens its shadow on hover.',
        code: `<Card>
  <CardHeader title="Scene budget" desc="Per-frame allocation." actions={<Badge>Near limit</Badge>} />
  <CardBody>…</CardBody>
  <CardFooter>
    <Button size="sm" variant="secondary">Tune</Button>
  </CardFooter>
</Card>`,
        render: CardDemo,
      },
    ],
    props: [
      { name: 'interactive', type: 'boolean', default: 'false', description: 'Adds hover lift and pointer cursor.' },
      { name: 'accent', type: 'boolean', default: 'false', description: 'Accent hairline and soft outer glow.' },
      { name: 'flush', type: 'boolean', default: 'false', description: 'Removes body padding for tables and media.' },
    ],
    a11y: ['If the whole card is clickable, wrap it in a single link or button rather than nesting interactive children.'],
    related: ['panel', 'table'],
  },

  {
    slug: 'panel',
    name: 'Panel',
    category: 'Layout',
    status: 'Stable',
    summary: 'The instrument surface: a dense, monospace-titled container for live readouts.',
    intro:
      'Panels are tighter than cards and always carry a header strip. This is the container you reach for when composing a dashboard, a HUD overlay or a side inspector.',
    examples: [
      {
        title: 'Accent panel',
        description: 'The accent variant adds a 2px gradient hairline along the top edge.',
        code: `<Panel title="Camera state" accent actions={<IconButton label="Refresh" />}>
  <PanelBody>
    <KeyValue items={[...]} />
  </PanelBody>
</Panel>`,
        render: PanelDemo,
      },
    ],
    props: [
      { name: 'title', type: 'ReactNode', default: '—', description: 'Monospace uppercase header label.' },
      { name: 'actions', type: 'ReactNode', default: '—', description: 'Trailing header controls.' },
      { name: 'accent', type: 'boolean', default: 'false', description: 'Gradient hairline at the top edge.' },
      { name: 'flush', type: 'boolean', default: 'false', description: 'Removes body padding.' },
    ],
    a11y: ['The header is visual only; add a heading element inside if the panel is a landmark.'],
    related: ['card', 'key-value', 'toolbar'],
  },

  {
    slug: 'toolbar',
    name: 'Toolbar',
    category: 'Layout',
    status: 'Stable',
    summary: 'A single row of icon actions with hairline separators.',
    examples: [
      {
        title: 'Scene controls',
        description: 'Icon buttons are 28px; separators are 16px tall and never adjacent to the edge.',
        code: `<Toolbar label="Scene">
  <IconButton label="Layers" size="sm"><Icon name="layers" size={13} /></IconButton>
  <ToolbarSeparator />
  <IconButton label="Zoom in" size="sm"><Icon name="plus" size={13} /></IconButton>
</Toolbar>`,
        render: ToolbarDemo,
      },
    ],
    props: [
      { name: 'label', type: 'ReactNode', default: '—', description: 'Leading monospace caption.' },
      { name: 'block', type: 'boolean', default: 'false', description: 'Stretches to container width.' },
    ],
    a11y: ['role="toolbar"; give it an aria-label describing the group.'],
    related: ['button', 'panel'],
  },

  {
    slug: 'table',
    name: 'Table',
    category: 'Data',
    status: 'Stable',
    summary: 'Dense data table with sticky monospace headers, row selection and numeric alignment.',
    intro:
      'Headers are monospace uppercase at 10px so they recede behind the data. Numeric columns align right and use tabular figures, which is what makes a table of coordinates or byte counts actually readable.',
    examples: [
      {
        title: 'With selection',
        description:
          'Row hover is 5% white; the selected row lifts to 10% and goes full-contrast. Selection is a neutral step, never a tint.',
        code: `<Table
  columns={columns}
  rows={assets}
  rowKey={(row) => row.id}
  selectedKey={selected}
  onRowClick={(row) => setSelected(row.id)}
/>`,
        render: TableDemo,
        align: 'stretch',
      },
      {
        title: 'Compact',
        description: 'Compact drops to 6px vertical padding and 12px type.',
        code: `<Table compact columns={columns} rows={rows} rowKey={(r) => r.name} />`,
        render: TableCompact,
        align: 'stretch',
      },
    ],
    props: [
      { name: 'columns', type: 'Column<T>[]', default: '—', description: 'key, header, align, mono, primary, render.' },
      { name: 'rows', type: 'T[]', default: '—', description: 'Row data.' },
      { name: 'rowKey', type: '(row, index) => string', default: '—', description: 'Stable row identity.' },
      { name: 'selectedKey', type: 'string', default: '—', description: 'Highlights one row.' },
      { name: 'onRowClick', type: '(row) => void', default: '—', description: 'Adds pointer cursor and click handling.' },
      { name: 'compact', type: 'boolean', default: 'false', description: 'Denser padding and type.' },
    ],
    a11y: [
      'Renders semantic table markup with scope="col" headers.',
      'Clickable rows are a pointer convenience — always provide a keyboard-reachable action inside the row.',
      'Never rely on colour alone for status; the StatusDot includes a text label.',
    ],
    related: ['pagination', 'panel', 'badge'],
  },

  {
    slug: 'stat',
    name: 'Stat',
    category: 'Data',
    status: 'Stable',
    summary: 'A single metric: label, tabular value, optional delta and sparkline.',
    examples: [
      {
        title: 'Metric row',
        description: 'Values are monospace with tabular figures so digits do not shift as they update.',
        code: `<Stat label="Tiles loaded" value="12,480" delta={{ value: '4.2%', direction: 'up' }} />
<Stat label="Mean frame" value="9.4" unit="ms" spark={[12, 11, 10, 9.4]} />`,
        render: StatDemo,
        align: 'start',
      },
    ],
    props: [
      { name: 'label', type: 'ReactNode', default: '—', description: 'Monospace uppercase label.' },
      { name: 'value', type: 'ReactNode', default: '—', description: 'Primary figure.' },
      { name: 'unit', type: 'ReactNode', default: '—', description: 'Trailing unit, 12px dim.' },
      { name: 'delta', type: '{ value, direction, label }', default: '—', description: 'Change indicator.' },
      { name: 'spark', type: 'number[]', default: '—', description: 'Inline trend line.' },
    ],
    a11y: ['Spell out the direction in the label if colour is the only visual cue, e.g. "Errors, down 2".'],
    related: ['sparkline', 'progress', 'key-value'],
  },

  {
    slug: 'key-value',
    name: 'KeyValue',
    category: 'Data',
    status: 'Stable',
    summary: 'Readout list with dotted leaders, like a printed instrument panel.',
    examples: [
      {
        title: 'Readout',
        description: 'Keys are 10px monospace uppercase; values are 12px monospace with tabular figures.',
        code: `<KeyValue items={[
  { key: 'Scene mode', value: '3D' },
  { key: 'Projection', value: 'EPSG:4978' },
]} />`,
        render: KeyValueDemo,
        align: 'start',
      },
    ],
    props: [
      { name: 'items', type: 'KeyValueItem[]', default: '—', description: 'key, value and optional dim flag.' },
    ],
    a11y: ['Renders a definition list (dl/dt/dd), so screen readers announce key-value pairs.'],
    related: ['panel', 'coordinate-readout'],
  },

  {
    slug: 'sparkline',
    name: 'Sparkline',
    category: 'Data',
    status: 'Stable',
    summary: 'Trend line without axes — for shape, not for reading exact values.',
    examples: [
      {
        title: 'Area, line and tinted',
        description: 'The area fill is a 28% to 0% gradient of the accent. Pass colour for semantic series.',
        code: `<Sparkline data={[...]} width={320} height={44} showDot />
<Sparkline data={[...]} width={320} height={30} area={false} />
<Sparkline data={[...]} color="var(--cs-success)" />`,
        render: SparklineDemo,
        align: 'start',
      },
    ],
    props: [
      { name: 'data', type: 'number[]', default: '—', description: 'Series values, at least two.' },
      { name: 'width / height', type: 'number', default: '120 / 32', description: 'Intrinsic viewBox size.' },
      { name: 'area', type: 'boolean', default: 'true', description: 'Gradient fill under the line.' },
      { name: 'showDot', type: 'boolean', default: 'false', description: 'Marks the last point.' },
      { name: 'color', type: 'string', default: 'accent', description: 'Overrides the series colour.' },
    ],
    a11y: ['Decorative (aria-hidden). Always show the current value alongside.'],
    related: ['stat'],
  },

  {
    slug: 'coordinate-readout',
    name: 'CoordinateReadout',
    category: 'Data',
    status: 'New',
    summary: 'Latitude, longitude and altitude in a glass readout — the signature HUD component.',
    intro:
      'Coordinates are the system’s native data type. This readout uses monospace tabular figures, hemisphere suffixes instead of signs, and a frosted inset surface so it stays legible over imagery.',
    examples: [
      {
        title: 'Position readout',
        description: 'Precision is configurable; four decimals is about 11 metres at the equator.',
        code: `<CoordinateReadout lat={37.7749} lon={-122.4194} alt={1284.5} />
<CoordinateReadout lat={-33.8688} lon={151.2093} precision={5} altUnit="km" />`,
        render: CoordinateDemo,
      },
    ],
    props: [
      { name: 'lat / lon', type: 'number', default: '—', description: 'Decimal degrees.' },
      { name: 'alt', type: 'number', default: '—', description: 'Altitude; the segment is hidden when omitted.' },
      { name: 'precision', type: 'number', default: '4', description: 'Decimal places for lat/lon.' },
      { name: 'altUnit', type: 'string', default: "'m'", description: 'Altitude unit label.' },
      { name: 'accentAlt', type: 'boolean', default: 'true', description: 'Tints the altitude value with the accent.' },
    ],
    a11y: ['The container has an aria-label; values read as "37.7749 degrees N".'],
    related: ['compass', 'scale-bar', 'key-value'],
  },

  {
    slug: 'legend',
    name: 'Legend',
    category: 'Data',
    status: 'Stable',
    summary: 'Series key for charts and map layers, with optional counts.',
    examples: [
      {
        title: 'Column layout',
        code: `<Legend column items={[
  { label: 'Confirmed', value: '12', color: 'var(--cs-success)' },
  { label: 'Failed', value: '1', color: 'var(--cs-danger)' },
]} />`,
        render: LegendDemo,
        align: 'start',
      },
    ],
    props: [
      { name: 'items', type: 'LegendItem[]', default: '—', description: 'label, value, color, shape.' },
      { name: 'column', type: 'boolean', default: 'false', description: 'Vertical stacking.' },
    ],
    a11y: ['Rendered as a list, so item count is announced.'],
    related: ['sparkline', 'table'],
  },
];
