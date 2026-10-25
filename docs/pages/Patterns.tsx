import { useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Compass,
  CoordinateReadout,
  Icon,
  IconButton,
  KeyValue,
  Legend,
  Panel,
  PanelBody,
  Progress,
  ScaleBar,
  SegmentedControl,
  Stat,
  StatusDot,
  Table,
  Toolbar,
  ToolbarSeparator,
  type Column,
} from '@cesium-ds/core';
import { PageHead, Section } from '../components/DocsUI';
import { Globe } from '../components/Globe';
import { useCountUp } from '../lib/motion';

/* ------------------------------------------------------------------ */
/* dashboard                                                           */
/* ------------------------------------------------------------------ */

type Job = {
  id: string;
  name: string;
  region: string;
  tiles: string;
  state: 'ready' | 'processing' | 'failed';
};

const jobs: Job[] = [
  { id: 'j1', name: 'Sentinel-2 L2A', region: 'EMEA', tiles: '4,210', state: 'ready' },
  { id: 'j2', name: 'Landsat 9 C2', region: 'AMER', tiles: '3,880', state: 'ready' },
  { id: 'j3', name: 'Planet Basemap', region: 'APAC', tiles: '1,204', state: 'processing' },
  { id: 'j4', name: 'SRTM 1-arc', region: 'GLOBAL', tiles: '2,660', state: 'ready' },
  { id: 'j5', name: 'Radar Mosaic', region: 'EMEA', tiles: '—', state: 'failed' },
];

const columns: Array<Column<Job>> = [
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

function DashboardDemo() {
  const [range, setRange] = useState<'24h' | '7d' | '30d'>('24h');
  const tiles = useCountUp(12480, 1100);
  const queue = useCountUp(38, 900);
  return (
    <div className="pattern-frame">
      <div className="pattern-toolbar">
        <span className="cs-row" style={{ gap: 8 }}>
          <span
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              border: '1px solid var(--cs-accent-line)',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Icon name="globe" size={11} style={{ color: 'var(--cs-accent)' }} />
          </span>
          <span className="cs-mono" style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Orbital Ops
          </span>
          <span className="cs-mono cs-t-xs cs-dimmer">/ ingestion</span>
        </span>
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
      </div>

      <div className="pattern-body">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 18,
            paddingBottom: 16,
            borderBottom: '1px solid var(--cs-border-subtle)',
          }}
        >
          <Stat label="Tiles ingested" value={tiles.toLocaleString('en-US')} delta={{ value: '4.2%', direction: 'up', label: 'vs 24h' }} />
          <Stat label="Mean decode" value="9.4" unit="ms" spark={[12, 11, 12.5, 10.2, 9.8, 9.6, 9.4, 9.1]} />
          <Stat label="Queue depth" value={String(queue)} delta={{ value: '12', direction: 'down', label: 'vs 24h' }} />
          <Stat label="Failures" value="3" delta={{ value: '2', direction: 'down' }} />
        </div>

        <div className="pattern-grid" style={{ marginTop: 14 }}>
          <Panel title="Active pipelines" flush>
            <Table columns={columns} rows={jobs} rowKey={(r) => r.id} selectedKey="j3" compact />
          </Panel>

          <div className="cs-stack" style={{ gap: 12 }}>
            <Panel title="Scene budget" accent>
              <PanelBody>
                <div className="cs-stack" style={{ gap: 11 }}>
                  <Progress label="Primitives" value={82} showValue thin />
                  <Progress label="Textures" value={54} showValue thin />
                  <Progress label="Tiles" value={37} showValue thin />
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
                    { key: 'Streams', value: '24 / 24' },
                    { key: 'Latency p95', value: '142 ms' },
                  ]}
                />
              </PanelBody>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardPattern() {
  return (
    <div className="doc-main__inner">
      <PageHead
        eyebrow="Patterns"
        title="Operations dashboard"
        lede="A monitoring surface: a metric strip, a dense table and a column of live panels. This is the composition the system was designed around."
        meta={
          <>
            <Badge tone="accent">Composite</Badge>
            <Badge>Stat · Table · Panel</Badge>
          </>
        }
      />

      <section className="doc-section" id="demo">
        <h2 className="doc-h2">Composition</h2>
        <DashboardDemo />
      </section>

      <Section id="notes" title="What makes it work">
        <div className="prose">
          <ul>
            <li>
              <strong>One accent, used twice.</strong> The accent appears on the active range segment
              and the selected table row. Everything else is neutral — which is why those two things
              read instantly.
            </li>
            <li>
              <strong>Metrics before detail.</strong> Four stats on a hairline rule establish the state
              of the system before the table asks for attention.
            </li>
            <li>
              <strong>Panels, not cards.</strong> The right column uses 34px panel headers so it stacks
              tightly without the padding a card would demand.
            </li>
            <li>
              <strong>Numbers are monospace and tabular.</strong> Tile counts, latencies and percentages
              align vertically across rows even as they update.
            </li>
          </ul>
        </div>
      </Section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* map hud                                                             */
/* ------------------------------------------------------------------ */

export function MapHudPattern() {
  return (
    <div className="doc-main__inner">
      <PageHead
        eyebrow="Patterns"
        title="Globe HUD"
        lede="Instrument overlays on a 3D scene. Everything floats on frosted glass, sits in a corner, and stays out of the centre of the viewport."
        meta={
          <>
            <Badge tone="accent">Composite</Badge>
            <Badge>Compass · Coordinates · ScaleBar</Badge>
          </>
        }
      />

      <section className="doc-section" id="demo">
        <h2 className="doc-h2">Composition</h2>
        <div className="hud-demo">
          <div className="hud-demo__globe">
            <Globe />
          </div>

          <div className="hud-corner-tl">
            <div className="hud-float" style={{ position: 'relative', inset: 'auto' }}>
              <div className="cs-stack" style={{ gap: 6 }}>
                <span className="cs-mono" style={{ fontSize: 9, letterSpacing: '0.18em', color: 'var(--cs-text-tertiary)' }}>
                  SCENE 03 · WGS 84
                </span>
                <div className="cs-row" style={{ gap: 10 }}>
                  <StatusDot tone="success" label="Live" pulse />
                  <span className="cs-mono" style={{ fontSize: 10, color: 'var(--cs-text-tertiary)' }}>
                    60 FPS
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="hud-corner-tr">
            <div className="hud-float" style={{ position: 'relative', inset: 'auto', padding: 6 }}>
              <Compass heading={28} size={84} />
            </div>
          </div>

          <div className="hud-corner-bl">
            <div className="hud-float" style={{ position: 'relative', inset: 'auto', width: 224 }}>
              <Panel title="Camera" accent flush>
                <PanelBody>
                  <KeyValue
                    items={[
                      { key: 'Height', value: '1,284 m' },
                      { key: 'Pitch', value: '-34.0°' },
                      { key: 'FOV', value: '60°' },
                    ]}
                  />
                </PanelBody>
              </Panel>
            </div>
          </div>

          <div className="hud-corner-br">
            <div className="cs-stack" style={{ gap: 10, alignItems: 'flex-end' }}>
              <div className="hud-float" style={{ position: 'relative', inset: 'auto' }}>
                <Legend
                  items={[
                    { label: 'Coverage', color: 'var(--cs-accent)' },
                    { label: 'Gap', color: 'var(--cs-warning)' },
                  ]}
                />
              </div>
              <div className="hud-float" style={{ position: 'relative', inset: 'auto', padding: '8px 10px' }}>
                <ScaleBar distance={500} unit="km" width={120} />
              </div>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)' }}>
            <CoordinateReadout lat={37.7749} lon={-122.4194} alt={1284.5} />
          </div>
        </div>
      </section>

      <Section id="notes" title="What makes it work">
        <div className="prose">
          <ul>
            <li>
              <strong>Frosted, not opaque.</strong> Overlays use a 72–78% inset background with a 10px
              blur, so the scene remains legible underneath and the HUD still reads as an instrument.
            </li>
            <li>
              <strong>Corners are reserved.</strong> Status top-left, compass top-right, inspector
              bottom-left, scale bottom-right. Coordinates own the bottom centre. Nothing moves between
              sessions.
            </li>
            <li>
              <strong>The centre stays clear.</strong> The globe is the subject; overlays never cross the
              middle third of the viewport.
            </li>
            <li>
              <strong>Numbers are the interface.</strong> Every readout is monospace with tabular
              figures, and the altitude is the only value tinted with the accent.
            </li>
          </ul>
        </div>
      </Section>

      <Section id="code" title="Overlay shell">
        <div className="prose">
          <p>
            The HUD frame itself is a CSS utility: <code>.cs-hud</code> provides the dark inset, the
            28px graticule and the accent bloom at the bottom edge, and <code>.cs-hud__corner</code>{' '}
            draws the four 10px corner brackets.
          </p>
          <div className="cs-row" style={{ gap: 8, marginTop: 12 }}>
            <Button size="sm" variant="secondary" iconLeft={<Icon name="code" size={12} />}>
              View source
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
