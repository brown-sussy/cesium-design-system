# Patterns

Four compositions that cover most product screens. Copy them, then replace the data.

Every snippet assumes:

```tsx
import '@cesium-ds/core/styles.css';
```

---

## 1. Operations dashboard

Metric strip → dense table → live panel column. The canonical layout.

```tsx
import {
  Avatar, Badge, Icon, IconButton, KeyValue, Panel, PanelBody, Progress,
  SegmentedControl, Stat, StatusDot, Table, Toolbar, ToolbarSeparator,
  type Column,
} from '@cesium-ds/core';
import { useState } from 'react';

type Pipeline = {
  id: string;
  name: string;
  region: string;
  tiles: string;
  state: 'ready' | 'processing' | 'failed';
};

const columns: Column<Pipeline>[] = [
  { key: 'name', header: 'Pipeline', primary: true },
  { key: 'region', header: 'Region' },
  { key: 'tiles', header: 'Tiles', align: 'right', mono: true },
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

export function Dashboard({ rows }: { rows: Pipeline[] }) {
  const [range, setRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [selected, setSelected] = useState(rows[0]?.id);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cs-bg-canvas)' }}>
      {/* header */}
      <header
        style={{
          height: 'var(--cs-header-h)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--cs-space-10)',
          padding: '0 var(--cs-space-16)',
          borderBottom: '1px solid var(--cs-border-subtle)',
        }}
      >
        <span className="cs-mono" style={{ fontSize: 10, letterSpacing: '0.18em' }}>
          ORBITAL OPS
        </span>
        <span className="cs-mono cs-t-xs cs-dimmer">/ ingestion</span>
        <span className="cs-grow" />
        <SegmentedControl
          value={range}
          onChange={setRange}
          options={[
            { value: '24h', label: '24H' },
            { value: '7d', label: '7D' },
            { value: '30d', label: '30D' },
          ]}
        />
        <Toolbar>
          <IconButton label="Refresh" size="sm" variant="ghost">
            <Icon name="activity" size={13} />
          </IconButton>
          <ToolbarSeparator />
          <IconButton label="Export" size="sm" variant="ghost">
            <Icon name="download" size={13} />
          </IconButton>
        </Toolbar>
        <Avatar name="Ada Lovelace" size="sm" status />
      </header>

      <main style={{ padding: 'var(--cs-space-20)', maxWidth: 1280 }}>
        {/* metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 18,
            paddingBottom: 16,
            borderBottom: '1px solid var(--cs-border-subtle)',
          }}
        >
          <Stat label="Tiles ingested" value="12,480" delta={{ value: '4.2%', direction: 'up', label: 'vs 24h' }} />
          <Stat label="Mean decode" value="9.4" unit="ms" spark={[12, 11, 12.5, 10.2, 9.8, 9.4]} />
          <Stat label="Queue depth" value="38" delta={{ value: '12', direction: 'down', label: 'vs 24h' }} />
          <Stat label="Failures" value="3" delta={{ value: '2', direction: 'down' }} />
        </div>

        {/* table + panels */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.55fr) minmax(0, 1fr)', gap: 12, marginTop: 14 }}>
          <Panel title="Active pipelines" flush>
            <Table
              columns={columns}
              rows={rows}
              rowKey={(r) => r.id}
              compact
              selectedKey={selected}
              onRowClick={(r) => setSelected(r.id)}
            />
          </Panel>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Panel title="Scene budget" accent>
              <PanelBody>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                  <Progress label="Primitives" value={82} showValue thin />
                  <Progress label="Textures" value={54} showValue thin />
                  <Progress label="GPU memory" value={91} tone="warning" showValue thin />
                </div>
              </PanelBody>
            </Panel>

            <Panel title="Node status">
              <PanelBody>
                <KeyValue
                  items={[
                    { key: 'Region', value: 'us-west-2' },
                    { key: 'Uptime', value: '18d 04h' },
                    { key: 'Latency p95', value: '142 ms' },
                  ]}
                />
              </PanelBody>
            </Panel>
          </div>
        </div>
      </main>
    </div>
  );
}
```

**Why it works:** one accent (active range + selected row), metrics before detail, panels
rather than cards in the right column, tabular figures everywhere.

---

## 2. Globe HUD

Corner discipline: status TL, compass TR, inspector BL, scale BR, coordinates bottom-centre.

```tsx
import {
  Compass, CoordinateReadout, KeyValue, Legend, Panel, PanelBody,
  ScaleBar, StatusDot,
} from '@cesium-ds/core';

const frosted: React.CSSProperties = {
  position: 'absolute',
  padding: 8,
  background: 'color-mix(in srgb, var(--cs-bg-inset) 72%, transparent)',
  border: '1px solid var(--cs-border-subtle)',
  borderRadius: 'var(--cs-radius-md)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'var(--cs-shadow-md)',
};

export function GlobeHud({ heading, lat, lon, alt }: {
  heading: number; lat: number; lon: number; alt: number;
}) {
  return (
    <div className="cs-hud" style={{ position: 'relative', height: '100%', minHeight: 420 }}>
      {/* <Viewer /> mounts here — the HUD is pointer-events:none except for controls */}

      <div style={{ ...frosted, top: 16, left: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <StatusDot tone="success" label="Live" pulse />
          <span className="cs-mono" style={{ fontSize: 10, color: 'var(--cs-text-tertiary)' }}>
            60 FPS
          </span>
        </div>
      </div>

      <div style={{ ...frosted, top: 16, right: 16 }}>
        <Compass heading={heading} size={68} />
      </div>

      <div style={{ ...frosted, bottom: 18, left: 16, width: 224 }}>
        <Panel title="Camera" accent flush>
          <PanelBody>
            <KeyValue
              items={[
                { key: 'Height', value: `${Math.round(alt).toLocaleString()} m` },
                { key: 'Pitch', value: '-34.0°' },
                { key: 'FOV', value: '60°' },
              ]}
            />
          </PanelBody>
        </Panel>
      </div>

      <div style={{ ...frosted, bottom: 18, right: 16, padding: '10px 12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
          <Legend
            items={[
              { label: 'Coverage', color: 'var(--cs-accent)' },
              { label: 'Gap', color: 'var(--cs-warning)' },
            ]}
          />
          <ScaleBar distance={500} unit="km" width={120} />
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)' }}>
        <CoordinateReadout lat={lat} lon={lon} alt={alt} />
      </div>
    </div>
  );
}
```

**Rules:** overlays never cross the middle third; the centre belongs to the scene. Use
`pointer-events: none` on the HUD container and re-enable it on the interactive children if
the scene must stay draggable.

---

## 3. Settings form

Two-column fields, grouped by section, with a sticky action bar.

```tsx
import {
  Alert, Button, Divider, Field, Input, RadioGroup, Select, Switch, Textarea,
} from '@cesium-ds/core';
import { useState } from 'react';

export function SettingsForm() {
  const [httpsOnly, setHttpsOnly] = useState(true);
  const [crs, setCrs] = useState('3857');

  return (
    <form
      style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 28 }}
      onSubmit={(e) => e.preventDefault()}
    >
      <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: 'var(--cs-text-primary)' }}>Workspace</h2>

        <div className="cs-form-grid">
          <Field label="Workspace name" required htmlFor="ws">
            <Input id="ws" defaultValue="Orbital Ops" />
          </Field>

          <Field label="Default CRS" htmlFor="crs" hint="Applied to new layers.">
            <Select id="crs" value={crs} onChange={(e) => setCrs(e.target.value)}>
              <option value="3857">EPSG:3857 — Web Mercator</option>
              <option value="4326">EPSG:4326 — WGS 84</option>
              <option value="4978">EPSG:4978 — ECEF</option>
            </Select>
          </Field>
        </div>

        <Field
          label="Tile endpoint"
          htmlFor="ep"
          error="Endpoint must be reachable over HTTPS."
        >
          <Input id="ep" invalid prefixText="https://" defaultValue="http://tiles.internal" />
        </Field>

        <Field label="Notes" htmlFor="notes" hint="Visible to everyone in the workspace.">
          <Textarea id="notes" rows={3} placeholder="Operational context…" />
        </Field>
      </section>

      <Divider label="Access" />

      <section style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Switch label="Require HTTPS for all tile sources" checked={httpsOnly} onChange={(e) => setHttpsOnly(e.target.checked)} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span className="cs-label">Height reference</span>
          <RadioGroup
            name="height"
            value={crs}
            onChange={setCrs}
            options={[
              { value: '3857', label: 'Ellipsoid (WGS 84)' },
              { value: '4326', label: 'Terrain' },
              { value: '4978', label: 'Relative to ground' },
            ]}
          />
        </div>

        <Alert tone="warning" title="Token expires in 6 days">
          Rotate the workspace token before 2026-11-01 to avoid interrupted tile streams.
        </Alert>
      </section>

      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 8,
          paddingTop: 16,
          borderTop: '1px solid var(--cs-border-subtle)',
        }}
      >
        <Button variant="ghost">Reset</Button>
        <Button variant="primary" type="submit">Save changes</Button>
      </div>
    </form>
  );
}
```

---

## 4. Entity inspector

A drawer for one object, opened from a table row.

```tsx
import {
  Badge, Button, Divider, Drawer, Field, Input, KeyValue, Table, Tabs,
} from '@cesium-ds/core';
import { useState } from 'react';

export function EntityInspector({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState('overview');

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Entity inspector"
      width={440}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Close</Button>
          <Button variant="primary">Fly to</Button>
        </>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Badge tone="accent">Polygon</Badge>
          <Badge>Draft</Badge>
          <span className="cs-mono cs-t-xs cs-dimmer" style={{ marginLeft: 'auto' }}>
            ent_8f21
          </span>
        </div>

        <Tabs
          value={tab}
          onChange={setTab}
          variant="enclosed"
          items={[
            { id: 'overview', label: 'Overview' },
            { id: 'geometry', label: 'Geometry' },
          ]}
        />

        {tab === 'overview' ? (
          <KeyValue
            items={[
              { key: 'Vertices', value: '24' },
              { key: 'Area', value: '12.4 km²' },
              { key: 'Perimeter', value: '14.8 km' },
              { key: 'Height', value: 'clamped' },
              { key: 'Created', value: '2026-10-18T10:40Z' },
            ]}
          />
        ) : (
          <Table
            compact
            columns={[
              { key: 'i', header: '#', width: '48px', mono: true },
              { key: 'lat', header: 'Lat', align: 'right', mono: true },
              { key: 'lon', header: 'Lon', align: 'right', mono: true },
            ]}
            rows={[
              { i: '1', lat: '37.7749', lon: '-122.4194' },
              { i: '2', lat: '37.7801', lon: '-122.4102' },
            ]}
            rowKey={(r) => r.i}
          />
        )}

        <Divider />

        <Field label="Label" htmlFor="label">
          <Input id="label" defaultValue="North ridge" />
        </Field>
      </div>
    </Drawer>
  );
}
```

---

## Composition rules of thumb

| Question | Answer |
| --- | --- |
| How many surfaces deep? | Three: canvas → surface → raised. A fourth needs a dialog. |
| How much padding in a panel? | 12px body, 34px header. Cards get 16px. |
| Where do actions live? | Top-right of the region, or a footer bar for dialogs. |
| Where do filters live? | Above the table, left-aligned, 28px tall. |
| Where do statuses live? | Right-most column of a table, or a leading dot in a list. |
| When do I use a Drawer vs Modal? | Drawer = inspect/edit one object while keeping context. Modal = a decision. |
| How many fonts on a screen? | Two: sans for language, mono for values. |
| Can I add a second accent? | No. Use a semantic status colour if the meaning is a state. |
