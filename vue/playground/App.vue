<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Compass,
  Composer,
  ContextMeter,
  CoordinateReadout,
  Divider,
  DoseResponse,
  Drawer,
  Dropdown,
  DropdownFooter,
  DropdownHeader,
  EventDisplay,
  Field,
  Histogram,
  Icon,
  IconButton,
  Input,
  Kbd,
  KbdGroup,
  KeyValue,
  Legend,
  Menu,
  Message,
  MessageList,
  Modal,
  Pagination,
  Panel,
  PanelBody,
  Progress,
  Quantity,
  RadioGroup,
  ReasoningTrace,
  ScaleBar,
  SearchInput,
  SegmentedControl,
  Select,
  SequenceView,
  Sidebar,
  Skeleton,
  SkeletonText,
  Slider,
  Sparkline,
  Spinner,
  Stat,
  StatusDot,
  Switch,
  Table,
  Tabs,
  Tag,
  Textarea,
  ThreadList,
  Toolbar,
  ToolbarSeparator,
  ToolCall,
  Tooltip,
  TypingIndicator,
  VectorReadout,
  type Column,
  type ContextSegment,
  type DosePoint,
  type EventCalo,
  type EventHit,
  type EventTrack,
  type HistogramBin,
  type MenuEntry,
  type SelectOption,
  type SidebarSection,
  type ThreadItem,
  type TraceStep,
} from '../index';

/* ---------------------------------------------------------------- theme -- */

const theme = ref<'dark' | 'light'>('dark');
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme.value;
}

/* ------------------------------------------------------------ page nav --- */

const navSections: SidebarSection[] = [
  { id: 'start', title: 'Playground', items: [{ id: 'actions', label: 'Actions', icon: 'zap', active: true }] },
  {
    id: 'input',
    title: 'Input',
    items: [
      { id: 'forms', label: 'Forms', icon: 'sliders' },
      { id: 'selection', label: 'Selection', icon: 'check' },
    ],
  },
  {
    id: 'surface',
    title: 'Surface',
    items: [
      { id: 'layout', label: 'Layout', icon: 'layers' },
      { id: 'data', label: 'Data', icon: 'table' },
      { id: 'navigation', label: 'Navigation', icon: 'compass' },
      { id: 'overlay', label: 'Overlay', icon: 'box' },
    ],
  },
  {
    id: 'domain',
    title: 'Domain',
    items: [
      { id: 'hud', label: 'HUD', icon: 'crosshair' },
      { id: 'ai', label: 'AI', icon: 'sparkles' },
      { id: 'chat', label: 'Chat', icon: 'send' },
      { id: 'science', label: 'Science', icon: 'dna' },
    ],
  },
];

const navCollapsed = ref(false);

/* --------------------------------------------------------------- state --- */

const select = ref('wgs84');
const search = ref('');
const text = ref('Run a viewshed analysis from the camera position.');
const checked = ref(true);
const indeterminate = ref(false);
const switched = ref(true);
const slider = ref(42);
const segmented = ref('2d');
const tab = ref('layers');
const page = ref(4);
const thread = ref('t1');
const message = ref('');
const modalOpen = ref(false);
const drawerOpen = ref(false);
const traceOpen = ref(true);
const heading = ref(38);

const selectOptions: SelectOption[] = [
  { value: 'wgs84', label: 'WGS 84', hint: 'EPSG:4326' },
  { value: 'mercator', label: 'Web Mercator', hint: '3857' },
  { value: 'utm', label: 'UTM Zone 31N', hint: '32631' },
  { value: 'ecef', label: 'Earth-centred', hint: '4978' },
  { value: 'moon', label: 'Lunar Mean', hint: '30100' },
];

const menuItems: MenuEntry[] = [
  { header: 'Scene' },
  { id: 'fly', label: 'Fly to extent', icon: 'crosshair', shortcut: 'F' },
  { id: 'capture', label: 'Capture frame', icon: 'download', shortcut: '⌘S' },
  { id: 'grid', label: 'Show graticule', checked: true },
  'separator',
  { header: 'Session' },
  { id: 'share', label: 'Copy share link', icon: 'external' },
  { id: 'reset', label: 'Reset view', danger: true },
];

const rows = [
  { id: '25544', name: 'ISS (ZARYA)', alt: 418, status: 'tracking' },
  { id: '48274', name: 'CSS (TIANHE)', alt: 389, status: 'tracking' },
  { id: '20580', name: 'HST', alt: 537, status: 'stale' },
  { id: '43013', name: 'NOAA 20', alt: 824, status: 'tracking' },
];
type SatRow = (typeof rows)[number];

const columns: Column<SatRow>[] = [
  { key: 'id', header: 'NORAD', mono: true, primary: true, width: '88px' },
  { key: 'name', header: 'Object' },
  { key: 'alt', header: 'Alt', align: 'right', mono: true, render: (r) => `${r.alt} km` },
  { key: 'status', header: 'State', width: '96px' },
];

const threads: ThreadItem[] = [
  { id: 't1', title: 'Viewshed from K2', preview: 'Terrain blocks the eastern arc…', time: '09:41', unread: 2 },
  { id: 't2', title: 'TLE refresh cadence', preview: 'Two-line elements are 6h stale.', time: '08:12' },
  { id: 't3', title: 'Lunar mosaic tiling', preview: 'Seam at 340° longitude.', time: 'Tue' },
];

const traceSteps: TraceStep[] = [
  { id: 's1', label: 'Parse request', time: '12ms' },
  { id: 's2', label: 'Resolve camera frustum', detail: 'lat 46.8 · lon 10.4 · alt 3,240 m', time: '48ms' },
  { id: 's3', label: 'Sample terrain tiles', detail: '14 tiles · 2.1 MB', time: '310ms', status: 'done' },
  { id: 's4', label: 'Trace horizon rays', time: '1.2s', status: 'active' },
];

const contextSegments: ContextSegment[] = [
  { label: 'system', tokens: 1240, tone: 'neutral' },
  { label: 'tools', tokens: 3180, tone: 'accent' },
  { label: 'history', tokens: 8640, tone: 'success' },
  { label: 'retrieval', tokens: 2100, tone: 'warning' },
];

const bins: HistogramBin[] = Array.from({ length: 40 }, (_, i) => {
  const x = 60 + i * 2.5;
  const peak = 91;
  const gauss = Math.exp(-((x - peak) ** 2) / (2 * 4.2 ** 2));
  const tail = 0.18 * Math.exp(-((x - peak) ** 2) / (2 * 13 ** 2));
  return { x0: x, x1: x + 2.5, count: Math.round(4200 * gauss + 900 * tail) };
});

const tracks: EventTrack[] = [
  { angle: 28, length: 0.86, charge: 1 },
  { angle: 132, length: 0.74, charge: -1 },
  { angle: 205, length: 0.62, charge: 1 },
  { angle: 252, length: 0.41, charge: 0 },
  { angle: 318, length: 0.93, charge: -1 },
];
const hits: EventHit[] = Array.from({ length: 26 }, (_, i) => ({
  x: Math.cos((i * 47 * Math.PI) / 180) * (0.42 + (i % 5) * 0.1),
  y: Math.sin((i * 47 * Math.PI) / 180) * (0.42 + (i % 5) * 0.1),
  r: i % 4 === 0 ? 1.6 : 1.1,
}));
const calo: EventCalo[] = Array.from({ length: 24 }, (_, i) => ({
  angle: i * 15,
  energy: 0.18 + 0.8 * Math.abs(Math.sin(i * 1.7)),
}));

const dosePoints: DosePoint[] = [
  { x: 0.4, y: 96 },
  { x: 1.2, y: 91 },
  { x: 4, y: 74 },
  { x: 12, y: 41 },
  { x: 38, y: 16 },
  { x: 120, y: 5 },
];

const sequence =
  'ATGGCTAGCAAAGGAGAAGAACTTTTCACTGGAGTTGTCCCAATTCTTGTTGAATTAGATGGTGATGTTAATGGGCACAAATTTTCTGTCAGTGGAGAGGGTGAAGGTGATGCAACATACGGAAAACTTACCCTTAAATTTATTTGCACTACTGGAAAACTACCTGTTCCATGGCCAACACTTGTCACTACTTTCGGTTATGGTGTTCAATGCTTTGCGAGATACCCAGATCATATGAAACAGCATGACTTTTTCAAGAGTGCCATGCCCGAAGGTTATGTACAGGAAAGAACTATATTTTTCAAAGATGACGGGAACTACAAGACACGTGCTGAAGTCAAGTTTGAAGGTGATACCCTTGTTAATAGAATCGAGTTAAAAGGTATTGATTTTAAAGAAGATGGAAACATTCTTGGACACAAATTGGAATACAACTATAACTCACACAATGTATACATCATGGCAGACAAACAAAAGAATGGAATCAAAGTTAACTTCAAAATTAGACACAACATTGAAGATGGAAGCGTTCAACTAGCAGACCATTATCAACAAAATACTCCAATTGGCGATGGCCCTGTCCTTTTACCAGACAACCATTACCTGTCCACACAATCTGCCCTTTCGAAAGATCCCAACGAAAAGAGAGACCACATGGTCCTTCTTGAGTTTGTAACAGCTGCTGGGATTACACATGGCATGGATGAACTATACAAATAA';

function jump(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

onMounted(() => {
  document.documentElement.dataset.theme = theme.value;
});
</script>

<template>
  <div class="pg">
    <Sidebar
      :sections="navSections"
      :collapsed="navCollapsed"
      :width="navCollapsed ? undefined : 232"
      label="Playground sections"
      @select="(item) => jump(item.id)"
    >
      <template #header>
        <div class="cs-row" style="gap: 8px; padding: 4px 6px">
          <Icon name="box" :size="16" class="cs-accent-text" />
          <strong style="font-size: 13px; letter-spacing: 0.02em">Cesium</strong>
          <Badge tone="accent" style="margin-left: auto">vue</Badge>
        </div>
      </template>
      <template #footer>
        <div class="cs-row" style="gap: 6px">
          <IconButton label="Toggle rail" size="sm" @click="navCollapsed = !navCollapsed">
            <Icon name="panel-left" :size="14" />
          </IconButton>
          <span class="cs-mono cs-dimmer" style="font-size: 11px">68 components</span>
        </div>
      </template>
    </Sidebar>

    <main class="pg-main">
      <header class="pg-top">
        <div class="pg-title">Vue port<span>same tokens · same css</span></div>
        <StatusDot tone="success" label="mounted" pulse />
        <Toolbar>
          <ToolbarSeparator />
          <IconButton label="Toggle theme" size="sm" @click="toggleTheme">
            <Icon :name="theme === 'dark' ? 'sun' : 'moon'" :size="14" />
          </IconButton>
        </Toolbar>
      </header>

      <!-- ------------------------------------------------------- actions -->
      <section id="actions" class="pg-section">
        <div class="pg-head">
          <h2>Actions</h2>
          <p>Button · IconButton · ButtonGroup</p>
        </div>
        <div class="pg-grid">
          <div class="pg-cell">
            <div class="pg-cell__label">Variants</div>
            <div class="pg-row">
              <Button variant="primary">Deploy</Button>
              <Button variant="secondary">Preview</Button>
              <Button variant="ghost">Cancel</Button>
              <Button variant="subtle">Inspect</Button>
              <Button variant="danger">Purge</Button>
              <Button variant="danger-ghost">Detach</Button>
            </div>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Sizes &amp; states</div>
            <div class="pg-row">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button loading>Saving</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Icons</div>
            <div class="pg-row">
              <Button variant="primary">
                <template #icon-left><Icon name="play" :size="13" /></template>
                Run
              </Button>
              <Button>
                Export
                <template #icon-right><Icon name="download" :size="13" /></template>
              </Button>
              <ButtonGroup aria-label="Zoom">
                <Button size="sm"><Icon name="minus" :size="13" /></Button>
                <Button size="sm"><Icon name="plus" :size="13" /></Button>
              </ButtonGroup>
              <IconButton label="Settings"><Icon name="sliders" :size="14" /></IconButton>
            </div>
          </div>
        </div>
      </section>

      <!-- --------------------------------------------------------- forms -->
      <section id="forms" class="pg-section">
        <div class="pg-head">
          <h2>Forms</h2>
          <p>Input · SearchInput · Textarea · Select · Field · SegmentedControl</p>
        </div>
        <div class="pg-grid">
          <div class="pg-cell">
            <div class="pg-cell__label">Text</div>
            <div class="cs-stack" style="gap: 10px">
              <Field label="Target name" hint="Shown in the layer list">
                <Input placeholder="e.g. K2 base camp" />
              </Field>
              <Field label="Range" required>
                <Input size="sm" prefix-text="km" suffix-text="WGS84" value="1240" />
              </Field>
              <Field label="Callsign" error="Already assigned to another asset">
                <Input invalid value="ATLAS-2" />
              </Field>
              <SearchInput v-model="search" />
              <Textarea v-model="text" :rows="3" mono />
            </div>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Choice</div>
            <div class="cs-stack" style="gap: 12px">
              <Field label="Projection">
                <Select v-model="select" :options="selectOptions" searchable />
              </Field>
              <Select :options="selectOptions" size="sm" placeholder="Small, unsearchable" />
              <SegmentedControl
                v-model="segmented"
                :options="[
                  { value: '2d', label: '2D' },
                  { value: '3d', label: '3D' },
                  { value: 'globe', label: 'Globe' },
                ]"
                accent
                block
              />
            </div>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Toggles</div>
            <div class="cs-stack" style="gap: 12px">
              <Checkbox v-model="checked" label="Show graticule" />
              <Checkbox v-model="indeterminate" :indeterminate="true" label="Partial selection" />
              <RadioGroup
                name="datum"
                v-model="select"
                direction="row"
                :options="[
                  { value: 'wgs84', label: 'WGS 84' },
                  { value: 'mercator', label: 'Mercator' },
                  { value: 'utm', label: 'UTM' },
                ]"
              />
              <Switch v-model="switched" label="Live telemetry" />
              <Switch v-model="switched" size="sm" label="Compact switch" />
            </div>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Slider — {{ slider }}</div>
            <Slider
              v-model="slider"
              :min="0"
              :max="100"
              :step="1"
              :ticks="[0, 25, 50, 75, 100]"
              show-value
              label="Opacity"
            />
            <Divider />
            <Slider :default-value="20" :min="0" :max="40" :step="5" :ticks="[0, 10, 20, 30, 40]" />
          </div>
        </div>
      </section>

      <!-- ----------------------------------------------------- selection -->
      <section id="selection" class="pg-section">
        <div class="pg-head">
          <h2>Display</h2>
          <p>Badge · Tag · Avatar · Kbd · Progress · Skeleton · Divider · Tooltip</p>
        </div>
        <div class="pg-grid">
          <div class="pg-cell">
            <div class="pg-cell__label">Badges &amp; tags</div>
            <div class="pg-row">
              <Badge>neutral</Badge>
              <Badge tone="accent" dot>live</Badge>
              <Badge tone="success">synced</Badge>
              <Badge tone="warning" solid>degraded</Badge>
              <Badge tone="danger" dot>offline</Badge>
            </div>
            <div class="pg-row" style="margin-top: 12px">
              <Tag accent><template #icon><Icon name="map-pin" :size="11" /></template>AOI-14</Tag>
              <Tag removable @remove="() => {}">terrain</Tag>
              <Tag>vector</Tag>
            </div>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Avatars &amp; keys</div>
            <div class="pg-row">
              <Avatar name="Ada Lovelace" status />
              <Avatar name="Grace Hopper" size="sm" accent />
              <Avatar name="Katherine Johnson" size="lg" square />
              <Avatar name="··" size="xs" />
            </div>
            <div class="pg-row" style="margin-top: 12px">
              <Kbd>⌘</Kbd>
              <KbdGroup :keys="['⌘', 'K']" />
              <KbdGroup :keys="['⇧', '⌥', 'P']" />
            </div>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Progress &amp; loaders</div>
            <div class="cs-stack" style="gap: 10px">
              <Progress :value="64" label="Tile cache" show-value />
              <Progress :value="92" tone="warning" thin />
              <Progress indeterminate label="Warming" />
              <div class="pg-row">
                <Spinner size="sm" />
                <Spinner />
                <Spinner size="lg" />
              </div>
            </div>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Skeletons &amp; tooltip</div>
            <SkeletonText :lines="3" />
            <div class="pg-row" style="margin-top: 12px">
              <Skeleton variant="circle" :width="28" :height="28" />
              <Skeleton variant="rect" :width="90" :height="28" />
              <Tooltip content="Recentres on the active AOI" placement="top">
                <Button size="sm">Hover me</Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      <!-- -------------------------------------------------------- layout -->
      <section id="layout" class="pg-section">
        <div class="pg-head">
          <h2>Layout</h2>
          <p>Card · Panel · Toolbar</p>
        </div>
        <div class="pg-grid">
          <div class="pg-cell">
            <div class="pg-cell__label">Card</div>
            <Card>
              <CardHeader title="Sentinel-2 L2A" desc="10 m · 5 day revisit" />
              <CardBody>
                <KeyValue
                  :items="[
                    { key: 'Cloud', value: '3.1%' },
                    { key: 'Acquired', value: '2026-10-29' },
                    { key: 'Tiles', value: '14', dim: true },
                  ]"
                />
              </CardBody>
              <CardFooter>
                <Button size="sm" variant="ghost">Details</Button>
                <Button size="sm" variant="primary">Load</Button>
              </CardFooter>
            </Card>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Panel</div>
            <Panel title="Layers" accent>
              <template #actions>
                <IconButton label="Add layer" size="sm"><Icon name="plus" :size="13" /></IconButton>
              </template>
              <PanelBody>
                <div class="cs-stack" style="gap: 8px">
                  <div class="cs-row"><StatusDot tone="accent" label="Terrain" /><span class="cs-grow" /><span class="cs-mono cs-dimmer">on</span></div>
                  <div class="cs-row"><StatusDot tone="success" label="Imagery" /><span class="cs-grow" /><span class="cs-mono cs-dimmer">on</span></div>
                  <div class="cs-row"><StatusDot label="Labels" /><span class="cs-grow" /><span class="cs-mono cs-dimmer">off</span></div>
                </div>
              </PanelBody>
            </Panel>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Toolbar</div>
            <Toolbar label="View">
              <Button size="sm" variant="ghost"><Icon name="crosshair" :size="13" /></Button>
              <Button size="sm" variant="ghost"><Icon name="layers" :size="13" /></Button>
              <ToolbarSeparator />
              <Button size="sm" variant="ghost"><Icon name="ruler" :size="13" /></Button>
              <Button size="sm" variant="ghost"><Icon name="compass" :size="13" /></Button>
            </Toolbar>
          </div>
        </div>
      </section>

      <!-- ---------------------------------------------------------- data -->
      <section id="data" class="pg-section">
        <div class="pg-head">
          <h2>Data</h2>
          <p>Table · Stat · KeyValue · Sparkline · CoordinateReadout · Legend</p>
        </div>
        <div class="pg-grid">
          <div class="pg-cell pg-cell--wide">
            <div class="pg-cell__label">Table — scoped cell slots</div>
            <Table :columns="columns" :rows="rows" :row-key="(r) => r.id" selected-key="48274" compact>
              <template #cell-status="{ row }">
                <Badge :tone="row.status === 'tracking' ? 'success' : 'warning'" dot>{{ row.status }}</Badge>
              </template>
            </Table>
          </div>
          <div class="pg-cell pg-cell--wide">
            <div class="pg-cell__label">Stats</div>
            <div class="cs-stack" style="gap: 14px">
              <Stat
                label="Downlink"
                value="842"
                unit="Mbps"
                :delta="{ value: '4.2%', direction: 'up', label: 'vs 1h' }"
                :spark="[12, 18, 15, 22, 30, 27, 34, 41, 38, 46]"
              />
              <Stat label="Packet loss" value="0.03" unit="%" size="sm" :delta="{ value: '0.01%', direction: 'down' }" />
            </div>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Coordinates</div>
            <CoordinateReadout :lat="46.8523" :lon="10.4421" :alt="3240" />
            <Divider />
            <Legend
              :items="[
                { label: 'Visible', color: 'var(--cs-accent)' },
                { label: 'Occluded', color: 'var(--cs-text-tertiary)' },
                { label: 'Partial', color: 'var(--cs-warning)', shape: 'line' },
                { label: 'AOI', color: 'var(--cs-success)', shape: 'circle' },
              ]"
              column
            />
          </div>
        </div>
      </section>

      <!-- ---------------------------------------------------- navigation -->
      <section id="navigation" class="pg-section">
        <div class="pg-head">
          <h2>Navigation</h2>
          <p>Tabs · Breadcrumb · Pagination · Menu</p>
        </div>
        <div class="pg-grid">
          <div class="pg-cell">
            <div class="pg-cell__label">Tabs</div>
            <Tabs
              v-model="tab"
              :items="[
                { id: 'layers', label: 'Layers', count: 12 },
                { id: 'filters', label: 'Filters' },
                { id: 'meta', label: 'Metadata', count: 3 },
              ]"
            />
            <div style="margin-top: 12px">
              <Tabs
                v-model="tab"
                variant="enclosed"
                :items="[
                  { id: 'layers', label: 'Layers' },
                  { id: 'filters', label: 'Filters' },
                  { id: 'meta', label: 'Metadata' },
                ]"
              />
            </div>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Breadcrumb &amp; pagination</div>
            <Breadcrumb
              :items="[
                { label: 'Scenes', href: '#' },
                { label: 'Sentinel-2' },
                { label: 'T33TUM' },
              ]"
            />
            <div style="margin-top: 14px">
              <Pagination v-model:page="page" :page-count="24" show-meta :total="2412" :page-size="100" />
            </div>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Menu</div>
            <div class="pg-row">
              <Menu label="Scene" icon="layers" :items="menuItems" @select="() => {}" />
              <Menu label="Align end" align="end" :items="menuItems" />
            </div>
            <div style="margin-top: 14px">
              <Menu :items="menuItems">
                <template #trigger>
                  <span class="cs-row" style="gap: 6px"><Icon name="sparkles" :size="13" /> Custom trigger</span>
                </template>
              </Menu>
            </div>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Sidebar — rail mode</div>
            <div style="height: 240px; display: flex; border: 1px solid var(--cs-border-subtle); border-radius: var(--cs-radius-sm); overflow: hidden">
              <Sidebar
                collapsed
                :sections="[
                  { id: 'a', items: [
                    { id: '1', label: 'Globe', icon: 'globe', active: true },
                    { id: '2', label: 'Layers', icon: 'layers' },
                    { id: '3', label: 'Analysis', icon: 'activity' },
                    { id: '4', label: 'Bookmarks', icon: 'book' },
                  ] },
                ]"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- ------------------------------------------------------- overlay -->
      <section id="overlay" class="pg-section">
        <div class="pg-head">
          <h2>Overlay</h2>
          <p>Modal · Drawer · Dropdown · Alert</p>
        </div>
        <div class="pg-grid">
          <div class="pg-cell">
            <div class="pg-cell__label">Surfaces</div>
            <div class="pg-row">
              <Button @click="modalOpen = true">Open modal</Button>
              <Button @click="drawerOpen = true">Open drawer</Button>
            </div>
            <div style="margin-top: 12px">
              <Dropdown label="Filters" :width="260">
                <template #trigger>
                  <span class="cs-row" style="gap: 6px"><Icon name="sliders" :size="13" /> Filters</span>
                </template>
                <DropdownHeader title="Filter stack" hint="3 active" />
                <div style="padding: 12px" class="cs-stack">
                  <Field label="Min cloud %"><Input size="sm" value="10" /></Field>
                  <Field label="Acquired after"><Input size="sm" type="date" value="2026-10-01" /></Field>
                  <Checkbox :model-value="true" label="Only L2A" />
                </div>
                <DropdownFooter>
                  <Button size="sm" variant="ghost" data-dropdown-close>Reset</Button>
                  <Button size="sm" variant="primary" data-dropdown-close>Apply</Button>
                </DropdownFooter>
              </Dropdown>
            </div>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Alerts</div>
            <div class="cs-stack" style="gap: 10px">
              <Alert tone="accent" title="Projection reprojected">Scene is being served in EPSG:3857.</Alert>
              <Alert tone="warning" title="Tiles stale" dismissible @close="() => {}">
                Last refresh 6h ago.
              </Alert>
              <Alert tone="danger" title="Link lost">Telemetry stream closed by peer.</Alert>
            </div>
          </div>
        </div>
      </section>

      <!-- ----------------------------------------------------------- hud -->
      <section id="hud" class="pg-section">
        <div class="pg-head">
          <h2>HUD</h2>
          <p>Compass · ScaleBar</p>
        </div>
        <div class="pg-grid">
          <div class="pg-cell">
            <div class="pg-cell__label">Compass — {{ heading }}°</div>
            <div class="pg-row" style="gap: 24px">
              <Compass :heading="heading" :size="96" />
              <Compass :heading="heading" :size="64" :show-heading="false" />
            </div>
            <div style="margin-top: 16px">
              <Slider v-model="heading" :min="0" :max="359" :step="1" />
            </div>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Scale</div>
            <ScaleBar :distance="500" unit="km" />
            <div style="margin-top: 16px">
              <ScaleBar :distance="2" unit="m" :width="96" label="2 m" />
            </div>
          </div>
        </div>
      </section>

      <!-- ------------------------------------------------------------ ai -->
      <section id="ai" class="pg-section">
        <div class="pg-head">
          <h2>AI</h2>
          <p>ReasoningTrace · ToolCall · ContextMeter</p>
        </div>
        <div class="pg-grid">
          <div class="pg-cell pg-cell--wide">
            <div class="pg-cell__label">Trace &amp; tool calls</div>
            <ReasoningTrace v-model:open="traceOpen" :steps="traceSteps" />
            <div class="cs-stack" style="gap: 8px; margin-top: 14px">
              <ToolCall
                name="terrain.sample"
                :args="{ bbox: '11.2,46.4,11.9,47.1', zoom: 12 }"
                status="done"
                duration="310ms"
                result="14 tiles · 2.1 MB · p95 84ms"
                default-open
              />
              <ToolCall name="horizon.trace" :args="{ rays: 720 }" status="running" duration="1.2s" />
              <ToolCall name="tle.fetch" :args="{ norad: 25544 }" status="failed" result="HTTP 429 — retry after 30s" />
            </div>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Context</div>
            <ContextMeter :segments="contextSegments" :limit="20000" />
            <Divider />
            <ContextMeter
              :segments="[{ label: 'system', tokens: 2400 }, { label: 'history', tokens: 16800, tone: 'warning' }]"
              :limit="16000"
              label="Window"
              :show-legend="false"
            />
          </div>
        </div>
      </section>

      <!-- ---------------------------------------------------------- chat -->
      <section id="chat" class="pg-section">
        <div class="pg-head">
          <h2>Chat</h2>
          <p>MessageList · Message · Composer · TypingIndicator · ThreadList</p>
        </div>
        <div class="pg-split">
          <div class="pg-cell">
            <div class="pg-cell__label">Threads</div>
            <ThreadList v-model="thread" :items="threads" />
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Transcript</div>
            <MessageList>
              <Message role="user" time="09:40">
                Can you check whether the eastern ridge blocks line of sight from the summit?
              </Message>
              <Message role="assistant" time="09:41" :meta="[{ label: 'tok', value: 412 }, { label: 'lat', value: '1.9s' }]">
                The eastern arc is blocked below 6.4° elevation. Two ridges intersect the ray path at 2.1 km and 4.8 km.
              </Message>
              <Message role="tool" author="terrain.sample" time="09:41">
                <code class="cs-mono">p95 = 84 ms · 14 tiles</code>
              </Message>
            </MessageList>
            <TypingIndicator />
            <Composer v-model="message" style="margin-top: 12px" />
          </div>
        </div>
      </section>

      <!-- ------------------------------------------------------- science -->
      <section id="science" class="pg-section">
        <div class="pg-head">
          <h2>Science</h2>
          <p>Quantity · VectorReadout · Histogram · EventDisplay · SequenceView · DoseResponse</p>
        </div>
        <div class="pg-grid">
          <div class="pg-cell">
            <div class="pg-cell__label">Quantities</div>
            <div class="cs-stack" style="gap: 10px">
              <Quantity :value="9.1093837" :exponent="-31" unit="kg" :precision="7" />
              <Quantity :value="299792458" unit="m·s⁻¹" size="lg" />
              <Quantity :value="0.511" :uncertainty="0.0002" unit="MeV" :precision="3" />
              <VectorReadout :x="12.4" :y="-3.8" :z="41.2" unit="m" :magnitude="43.5" />
            </div>
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Histogram — Z mass</div>
            <Histogram :bins="bins" :height="132" unit="GeV" :marker="91" :aria-label="'Invariant mass, 40 bins'" />
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Event display</div>
            <EventDisplay :tracks="tracks" :hits="hits" :calorimeter="calo" label="RUN 4821 · EVT 37" :size="220" />
          </div>
          <div class="pg-cell pg-cell--wide">
            <div class="pg-cell__label">Sequence — GFP CDS</div>
            <SequenceView :sequence="sequence" :per-line="60" :highlight="{ start: 60, end: 130 }" label="class" />
          </div>
          <div class="pg-cell">
            <div class="pg-cell__label">Dose response</div>
            <DoseResponse :ic50="9.4" :hill="1.2" :points="dosePoints" unit="nM" />
          </div>
        </div>
      </section>

      <footer class="pg-section" style="padding-bottom: 64px">
        <div class="cs-row" style="justify-content: space-between">
          <span class="cs-mono cs-dimmer">Cesium DS · Vue 3 · {{ theme }} theme</span>
          <KbdGroup :keys="['vue', '3.5']" />
        </div>
      </footer>
    </main>

    <Modal :open="modalOpen" title="Purge tile cache" description="This drops 2.1 GB of derived terrain." @close="modalOpen = false">
      <p style="margin: 0; color: var(--cs-text-secondary)">
        Cached tiles are rebuilt on the next camera move. Share links keep working.
      </p>
      <template #footer>
        <Button variant="ghost" @click="modalOpen = false">Cancel</Button>
        <Button variant="danger" @click="modalOpen = false">Purge</Button>
      </template>
    </Modal>

    <Drawer :open="drawerOpen" title="Scene inspector" @close="drawerOpen = false">
      <KeyValue
        :items="[
          { key: 'Camera', value: '46.85° N 10.44° E' },
          { key: 'Altitude', value: '3,240 m' },
          { key: 'Heading', value: `${heading}°` },
          { key: 'Pitch', value: '−32.5°' },
          { key: 'FOV', value: '60°' },
        ]"
      />
    </Drawer>
  </div>
</template>
