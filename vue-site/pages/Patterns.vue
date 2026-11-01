<script setup lang="ts">
import { computed, ref } from 'vue';
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
} from '../../vue';
import type { Column } from '../../vue/types';
import Globe from '../components/Globe.vue';

const props = defineProps<{ id?: string }>();

const patternId = computed(() => props.id || 'dashboard');

/* Dashboard demo state */
type Job = {
  id: string;
  name: string;
  region: string;
  tiles: string;
  state: 'ready' | 'processing' | 'failed';
};

const range = ref<'24h' | '7d' | '30d'>('24h');

const jobs: Job[] = [
  { id: 'j1', name: 'Sentinel-2 L2A', region: 'EMEA', tiles: '4,210', state: 'ready' },
  { id: 'j2', name: 'Landsat 9 C2', region: 'AMER', tiles: '3,880', state: 'ready' },
  { id: 'j3', name: 'Planet Basemap', region: 'APAC', tiles: '1,204', state: 'processing' },
  { id: 'j4', name: 'SRTM 1-arc', region: 'GLOBAL', tiles: '2,660', state: 'ready' },
  { id: 'j5', name: 'Radar Mosaic', region: 'EMEA', tiles: '—', state: 'failed' },
];

const columns: Column<Job>[] = [
  { key: 'name', header: 'Pipeline', primary: true },
  { key: 'region', header: 'Region' },
  { key: 'tiles', header: 'Tiles', align: 'right', mono: true },
  { key: 'state', header: 'State' },
];
</script>

<template>
  <div class="doc-main__inner">
    <!-- 1. Dashboard Pattern -->
    <template v-if="patternId === 'dashboard'">
      <header>
        <div class="doc-eyebrow">Patterns</div>
        <h1 class="doc-h1">Operations dashboard</h1>
        <p class="doc-lede">
          A monitoring surface: a metric strip, a dense table and a column of live panels. This is the composition the system was designed around.
        </p>
        <div class="doc-meta">
          <Badge tone="accent">Composite</Badge>
          <Badge>Stat · Table · Panel</Badge>
        </div>
      </header>

      <section class="doc-section">
        <h2 class="doc-h2">Composition</h2>
        <div class="pattern-frame">
          <div class="pattern-toolbar">
            <span class="cs-row" style="gap: 8px">
              <span
                style="width: 20px; height: 20px; border-radius: 50%; border: 1px solid var(--cs-accent-line); display: grid; place-items: center;"
              >
                <Icon name="globe" :size="11" style="color: var(--cs-accent)" />
              </span>
              <span class="cs-mono" style="font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;">
                Orbital Ops
              </span>
              <span class="cs-mono cs-t-xs cs-dimmer">/ ingestion</span>
            </span>
            <span class="cs-grow" />
            <SegmentedControl
              v-model="range"
              :options="[
                { value: '24h', label: '24H' },
                { value: '7d', label: '7D' },
                { value: '30d', label: '30D' },
              ]"
            />
            <Toolbar>
              <IconButton label="Refresh" size="sm" variant="ghost">
                <Icon name="activity" :size="13" />
              </IconButton>
              <ToolbarSeparator />
              <IconButton label="Export" size="sm" variant="ghost">
                <Icon name="download" :size="13" />
              </IconButton>
            </Toolbar>
            <Avatar name="Ada Lovelace" size="sm" status />
          </div>

          <div class="pattern-body">
            <div
              style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; padding-bottom: 16px; border-bottom: 1px solid var(--cs-border-subtle);"
            >
              <Stat label="Tiles ingested" value="12,480" :delta="{ value: '4.2%', direction: 'up', label: 'vs 24h' }" />
              <Stat label="Mean decode" value="9.4" unit="ms" :spark="[12, 11, 12.5, 10.2, 9.8, 9.6, 9.4, 9.1]" />
              <Stat label="Queue depth" value="38" :delta="{ value: '12', direction: 'down', label: 'vs 24h' }" />
              <Stat label="Failures" value="3" :delta="{ value: '2', direction: 'down' }" />
            </div>

            <div class="pattern-grid" style="margin-top: 14px">
              <Panel title="Active pipelines" flush>
                <Table :columns="columns" :rows="jobs" :row-key="(r) => r.id" selected-key="j3" compact>
                  <template #cell-state="{ row }">
                    <StatusDot
                      :tone="row.state === 'ready' ? 'success' : row.state === 'processing' ? 'accent' : 'danger'"
                      :label="row.state"
                      :pulse="row.state === 'processing'"
                    />
                  </template>
                </Table>
              </Panel>

              <div class="cs-stack" style="gap: 12px">
                <Panel title="Scene budget" accent>
                  <PanelBody>
                    <div class="cs-stack" style="gap: 11px">
                      <Progress label="Primitives" :value="82" show-value thin />
                      <Progress label="Textures" :value="54" show-value thin />
                      <Progress label="Tiles" :value="37" show-value thin />
                      <Progress label="GPU memory" :value="91" tone="warning" show-value thin />
                    </div>
                  </PanelBody>
                </Panel>

                <Panel title="Node status">
                  <PanelBody>
                    <KeyValue
                      :items="[
                        { key: 'Region', value: 'us-west-2' },
                        { key: 'Uptime', value: '18d 04h' },
                        { key: 'Streams', value: '24 / 24' },
                        { key: 'Latency p95', value: '142 ms' },
                      ]"
                    />
                  </PanelBody>
                </Panel>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- 2. Globe HUD Pattern -->
    <template v-else-if="patternId === 'map-hud'">
      <header>
        <div class="doc-eyebrow">Patterns</div>
        <h1 class="doc-h1">Globe HUD</h1>
        <p class="doc-lede">
          Instrument overlays on a 3D scene. Everything floats on frosted glass, sits in a corner, and stays out of the centre of the viewport.
        </p>
        <div class="doc-meta">
          <Badge tone="accent">Composite</Badge>
          <Badge>Compass · Coordinates · ScaleBar</Badge>
        </div>
      </header>

      <section class="doc-section">
        <h2 class="doc-h2">Composition</h2>
        <div class="hud-demo">
          <div class="hud-demo__globe">
            <Globe />
          </div>

          <div class="hud-corner-tl">
            <div class="hud-float" style="position: relative; inset: auto">
              <div class="cs-stack" style="gap: 6px">
                <span class="cs-mono" style="font-size: 9px; letter-spacing: 0.18em; color: var(--cs-text-tertiary)">
                  SCENE 03 · WGS 84
                </span>
                <div class="cs-row" style="gap: 10px">
                  <StatusDot tone="success" label="Live" pulse />
                  <span class="cs-mono" style="font-size: 10px; color: var(--cs-text-tertiary)">
                    60 FPS
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="hud-corner-tr">
            <div class="hud-float" style="position: relative; inset: auto; padding: 6px">
              <Compass :heading="28" :size="84" />
            </div>
          </div>

          <div class="hud-corner-bl">
            <div class="hud-float" style="position: relative; inset: auto; width: 224px">
              <Panel title="Camera" accent flush>
                <PanelBody>
                  <KeyValue
                    :items="[
                      { key: 'Height', value: '1,284 m' },
                      { key: 'Pitch', value: '-34.0°' },
                      { key: 'FOV', value: '60°' },
                    ]"
                  />
                </PanelBody>
              </Panel>
            </div>
          </div>

          <div class="hud-corner-br">
            <div class="cs-stack" style="gap: 10px; align-items: flex-end">
              <div class="hud-float" style="position: relative; inset: auto">
                <Legend
                  :items="[
                    { label: 'Coverage', color: 'var(--cs-accent)' },
                    { label: 'Gap', color: 'var(--cs-warning)' },
                  ]"
                />
              </div>
              <div class="hud-float" style="position: relative; inset: auto; padding: 8px 10px">
                <ScaleBar :distance="500" unit="km" :width="120" />
              </div>
            </div>
          </div>

          <div style="position: absolute; bottom: 22px; left: 50%; transform: translateX(-50%)">
            <CoordinateReadout :lat="37.7749" :lon="-122.4194" :alt="1284.5" />
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
