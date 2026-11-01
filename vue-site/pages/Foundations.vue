<script setup lang="ts">
import { computed, ref } from 'vue';
import { Badge, Button, Icon } from '../../vue';
import type { IconName } from '../../vue/types';
import CodeBlock from '../components/CodeBlock.vue';
import { navigate } from '../lib/router';

const props = defineProps<{ id?: string }>();

const pageId = computed(() => props.id || 'principles');

/* Principles */
const principles = [
  {
    title: 'Precision over decoration',
    text: 'Hairlines instead of shadows, numbers instead of adjectives. If a border can carry the structure, no background is needed.',
    detail:
      'This is why the radius scale stops at 18px, why borders are 1px at 8–14% opacity, and why elevation is used only for things that genuinely float: dialogs, popovers, tooltips.',
  },
  {
    title: 'Data over chrome',
    text: 'The interface recedes. A table of coordinates, a scene, a frame-time graph — these are the content, and the system exists to frame them.',
    detail:
      'Headers are 10px monospace so they sit behind the data. Chrome never uses the accent colour; only interactive and selected states do.',
  },
  {
    title: 'Dark first, not dark only',
    text: 'The default theme is the darkened operations room. Light is designed separately, value by value, for daylight and print-adjacent contexts.',
    detail:
      'The accent shifts from #4EB8DE to #1F6C87 for contrast on white. Semantic colours darken by roughly 40% rather than being reused.',
  },
  {
    title: 'Motion as feedback',
    text: '120–260ms with a mechanical ease-out. Motion confirms a state change; it never announces itself.',
    detail:
      'Nothing bounces, nothing loops except a live status pulse, and every duration collapses to 0ms under prefers-reduced-motion.',
  },
];

/* Color */
const semanticGroups = [
  {
    title: 'Surfaces',
    rows: [
      ['bg-base', 'The void behind everything; app background'],
      ['bg-canvas', 'Page background, preview stage'],
      ['bg-surface', 'Cards, panels, toolbars'],
      ['bg-raised', 'Popovers, dialogs, active segments'],
      ['bg-inset', 'Inputs, code blocks, wells'],
      ['bg-hover', 'Row and control hover overlay'],
      ['bg-selected', 'Selected row or option'],
    ],
  },
  {
    title: 'Text',
    rows: [
      ['text-primary', 'Headings and primary values'],
      ['text-secondary', 'Body copy and labels'],
      ['text-tertiary', 'Hints, metadata, column headers'],
      ['text-disabled', 'Disabled and placeholder text'],
      ['text-inverse', 'Text on a filled surface'],
    ],
  },
  {
    title: 'Borders',
    rows: [
      ['border-subtle', 'Dividers and card edges'],
      ['border', 'Control borders, table frame'],
      ['border-strong', 'Hover borders, strong separation'],
    ],
  },
  {
    title: 'Solid',
    rows: [
      ['solid', 'Primary button: white in dark, near-black in light'],
      ['solid-hover', 'Hover on the solid surface'],
      ['solid-active', 'Pressed solid surface'],
      ['solid-contrast', 'Label on the solid surface'],
    ],
  },
  {
    title: 'Accent',
    rows: [
      ['accent', 'Links, selected rows, focus rings, active indicators'],
      ['accent-hover', 'Hover on accent text and hairlines'],
      ['accent-active', 'Pressed accent indicators'],
      ['accent-soft', 'Tinted backgrounds and focus halos'],
      ['accent-line', 'Accent borders and focus rings'],
    ],
  },
  {
    title: 'State',
    rows: [
      ['success', 'Healthy, complete, connected'],
      ['warning', 'Degraded, partial, approaching a limit'],
      ['danger', 'Failed, destructive, invalid'],
      ['info', 'Neutral informational emphasis'],
    ],
  },
];

const atmosKeys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((n) => `atmos-${n}`);
const slateKeys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((n) => `slate-${n}`);
const signalKeys = ['signal-mint', 'signal-amber', 'signal-rose', 'signal-iris', 'signal-teal'];

/* Typography */
const typeScale = [
  { token: '5xl', size: '48px', line: '54px', sample: 'Planetary scale', use: 'Marketing headlines only' },
  { token: '4xl', size: '36px', line: '42px', sample: 'Scene overview', use: 'Page titles' },
  { token: '3xl', size: '28px', line: '36px', sample: 'Metric headline', use: 'Stat values, section leads' },
  { token: '2xl', size: '22px', line: '30px', sample: 'Imagery layers', use: 'Sub-sections' },
  { token: 'xl', size: '18px', line: '26px', sample: 'Camera controls', use: 'Dialog titles, card headings' },
  { token: 'lg', size: '16px', line: '24px', sample: 'Load a tileset into the current scene.', use: 'Lede paragraphs' },
  { token: 'md', size: '14px', line: '22px', sample: 'Body copy sits at fourteen pixels.', use: 'Body, default text' },
  { token: 'base', size: '13px', line: '20px', sample: 'Interface default — buttons, inputs, cells.', use: 'Controls and dense UI' },
  { token: 'sm', size: '12px', line: '18px', sample: 'Secondary labels and helper text.', use: 'Labels, hints, tags' },
  { token: 'xs', size: '11px', line: '16px', sample: 'Monospace micro-data · 37.7749° N', use: 'Kbd, badges, readouts' },
  { token: '2xs', size: '10px', line: '14px', sample: 'COLUMN HEADER · UPPERCASE', use: 'Table headers, eyebrows' },
];

/* Spacing */
const spaceScale = [2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128];
const radii = [
  ['xs', '3px'],
  ['sm', '4px'],
  ['md', '6px'],
  ['lg', '10px'],
  ['xl', '14px'],
  ['2xl', '18px'],
  ['pill', '999px'],
];

/* Motion */
const motionRun = ref(0);
const motionPrimitives = [
  { cls: 'cs-anim-fade', name: 'cs-anim-fade', note: 'Opacity only. Surfaces, overlays.' },
  { cls: 'cs-anim-rise', name: 'cs-anim-rise', note: 'Opacity + 10px rise. Content blocks.' },
  { cls: 'cs-anim-scale', name: 'cs-anim-scale', note: 'Opacity + 0.97 scale. Dialogs, popovers.' },
  { cls: 'cs-anim-slide', name: 'cs-anim-slide', note: 'Opacity + 8px slide. Drawers, rows.' },
];
const durations = [
  ['instant', '80ms', 'Pressed states, checkbox ticks'],
  ['fast', '120ms', 'Hover, focus, colour changes'],
  ['base', '180ms', 'Default transition for surfaces'],
  ['slow', '260ms', 'Dialogs, drawers, expanding rows'],
  ['slower', '420ms', 'Rare: full-panel reveals'],
];

/* Icons */
const iconNames: IconName[] = [
  'globe', 'layers', 'box', 'compass', 'map-pin', 'crosshair', 'gauge', 'activity',
  'search', 'sliders', 'table', 'code', 'terminal', 'palette', 'type', 'ruler',
  'zap', 'sparkles', 'download', 'external', 'grid', 'book', 'play', 'plus',
  'minus', 'check', 'close', 'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right',
  'arrow-right', 'arrow-up-right', 'arrow-down', 'menu', 'copy', 'info', 'warning',
  'success', 'error', 'sun', 'moon', 'command', 'panel-left',
];
</script>

<template>
  <div class="doc-main__inner">
    <!-- 1. Principles -->
    <template v-if="pageId === 'principles'">
      <header>
        <div class="doc-eyebrow">Foundations</div>
        <h1 class="doc-h1">Principles</h1>
        <p class="doc-lede">
          Four rules that decide what the system does when two options both look reasonable.
        </p>
        <div class="doc-meta">
          <Badge tone="accent">4 principles</Badge>
          <Badge>Applied system-wide</Badge>
        </div>
      </header>

      <section class="doc-section">
        <h2 class="doc-h2">The rules</h2>
        <div class="site-cards">
          <div v-for="(p, i) in principles" :key="p.title" class="site-card">
            <span class="cs-mono cs-t-xs" style="color: var(--cs-accent)">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="site-card__title">{{ p.title }}</span>
            <span class="site-card__desc">{{ p.text }}</span>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-h2">How they show up</h2>
        <div class="prose">
          <div v-for="p in principles" :key="p.title" style="margin-bottom: 22px">
            <h3>{{ p.title }}</h3>
            <p>{{ p.detail }}</p>
          </div>
        </div>
      </section>
    </template>

    <!-- 2. Color -->
    <template v-else-if="pageId === 'color'">
      <header>
        <div class="doc-eyebrow">Foundations</div>
        <h1 class="doc-h1">Color</h1>
        <p class="doc-lede">
          True neutral greys carry the structure. Solid keys carry actions. One celestial cyan accent marks interaction and selection.
        </p>
        <div class="doc-meta">
          <Badge tone="accent">2 themes</Badge>
          <Badge>39 themed tokens</Badge>
          <Badge>WCAG AA</Badge>
        </div>
      </header>

      <section class="doc-section">
        <h2 class="doc-h2">Primitive ramps</h2>
        <div class="cs-stack" style="gap: 16px; margin-top: 16px">
          <div>
            <div class="cs-mono cs-t-xs cs-dimmer" style="margin-bottom: 8px">Atmosphere · 11 steps</div>
            <div class="swatch-band" style="grid-template-columns: repeat(11, 1fr)">
              <div v-for="k in atmosKeys" :key="k" class="swatch">
                <span class="swatch__chip" :style="{ background: `var(--cs-${k})`, height: '48px' }" />
                <span class="swatch__name">{{ k.split('-')[1] }}</span>
              </div>
            </div>
          </div>
          <div>
            <div class="cs-mono cs-t-xs cs-dimmer" style="margin-bottom: 8px">Slate · 11 steps</div>
            <div class="swatch-band" style="grid-template-columns: repeat(11, 1fr)">
              <div v-for="k in slateKeys" :key="k" class="swatch">
                <span class="swatch__chip" :style="{ background: `var(--cs-${k})`, height: '48px' }" />
                <span class="swatch__name">{{ k.split('-')[1] }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-h2">Semantic tokens</h2>
        <div v-for="group in semanticGroups" :key="group.title" style="margin-bottom: 26px">
          <h3 class="doc-h3" style="margin-bottom: 12px">{{ group.title }}</h3>
          <div class="props-table">
            <table>
              <tbody>
                <tr v-for="[name, use] in group.rows" :key="name">
                  <td style="width: 32px">
                    <span style="display: inline-block; width: 14px; height: 14px; border-radius: 3px; border: 1px solid var(--cs-border);" :style="{ background: `var(--cs-${name})` }" />
                  </td>
                  <td class="props-table__name">--cs-{{ name }}</td>
                  <td>{{ use }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </template>

    <!-- 3. Typography -->
    <template v-else-if="pageId === 'typography'">
      <header>
        <div class="doc-eyebrow">Foundations</div>
        <h1 class="doc-h1">Typography</h1>
        <p class="doc-lede">
          Newsreader for display editorial headers, Instrument Sans for the interface, JetBrains Mono for machine data.
        </p>
        <div class="doc-meta">
          <Badge tone="accent">3 families</Badge>
          <Badge>11 sizes</Badge>
          <Badge>Tabular numerals</Badge>
        </div>
      </header>

      <section class="doc-section">
        <h2 class="doc-h2">Scale</h2>
        <div class="props-table">
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Size / Line</th>
                <th>Sample</th>
                <th>Use</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in typeScale" :key="t.token">
                <td class="props-table__name">{{ t.token }}</td>
                <td class="cs-mono cs-t-xs">{{ t.size }} / {{ t.line }}</td>
                <td :style="{ fontSize: t.size, lineHeight: t.line }">{{ t.sample }}</td>
                <td class="cs-dimmer cs-t-xs">{{ t.use }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>

    <!-- 4. Spacing -->
    <template v-else-if="pageId === 'spacing'">
      <header>
        <div class="doc-eyebrow">Foundations</div>
        <h1 class="doc-h1">Space & grid</h1>
        <p class="doc-lede">
          A 4px base unit with named pixel steps. Hairline borders, precision control heights and compact radii.
        </p>
      </header>

      <section class="doc-section">
        <h2 class="doc-h2">Space scale</h2>
        <div class="cs-stack" style="gap: 8px">
          <div v-for="s in spaceScale" :key="s" class="cs-row" style="gap: 16px">
            <span class="cs-mono cs-t-xs" style="width: 90px">space-{{ s }}</span>
            <div style="height: 12px; background: var(--cs-accent); border-radius: 2px" :style="{ width: `${s}px` }" />
            <span class="cs-mono cs-t-xs cs-dimmer">{{ s }}px</span>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-h2">Radii</h2>
        <div class="cs-row" style="gap: 20px; flex-wrap: wrap">
          <div v-for="[name, val] in radii" :key="name" class="cs-stack" style="align-items: center; gap: 8px">
            <div style="width: 54px; height: 54px; background: var(--cs-bg-raised); border: 1px solid var(--cs-accent-line)" :style="{ borderRadius: val }" />
            <span class="cs-mono cs-t-xs">{{ name }} ({{ val }})</span>
          </div>
        </div>
      </section>
    </template>

    <!-- 5. Motion -->
    <template v-else-if="pageId === 'motion'">
      <header>
        <div class="doc-eyebrow">Foundations</div>
        <h1 class="doc-h1">Motion</h1>
        <p class="doc-lede">
          Motion confirms a state change and gets out of the way. 80–260ms, mechanical easing.
        </p>
      </header>

      <section class="doc-section">
        <h2 class="doc-h2">Primitives</h2>
        <div class="cs-row" style="gap: 12px; margin-bottom: 16px">
          <Button size="sm" variant="secondary" @click="motionRun++">
            <template #icon-left><Icon name="play" :size="12" /></template>
            Replay
          </Button>
        </div>
        <div :key="motionRun" class="site-cards">
          <div v-for="(p, i) in motionPrimitives" :key="p.name" :class="`site-card ${p.cls}`" :style="{ animationDelay: `${i * 80}ms` }">
            <span class="site-card__title">{{ p.name }}</span>
            <span class="site-card__desc">{{ p.note }}</span>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-h2">Durations</h2>
        <div class="props-table">
          <table>
            <thead>
              <tr>
                <th>Token</th>
                <th>Value</th>
                <th>Usage</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="[name, val, use] in durations" :key="name">
                <td class="props-table__name">dur-{{ name }}</td>
                <td class="cs-mono cs-t-xs">{{ val }}</td>
                <td>{{ use }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </template>

    <!-- 6. Iconography -->
    <template v-else-if="pageId === 'iconography'">
      <header>
        <div class="doc-eyebrow">Foundations</div>
        <h1 class="doc-h1">Iconography</h1>
        <p class="doc-lede">
          44 precision glyphs drawn on a 24px grid with 1.5px stroke. Instrument-like and geometric.
        </p>
      </header>

      <section class="doc-section">
        <h2 class="doc-h2">Glyphs ({{ iconNames.length }})</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 12px; margin-top: 16px">
          <div v-for="name in iconNames" :key="name" class="cs-card" style="padding: 16px; align-items: center; gap: 8px">
            <Icon :name="name" :size="20" style="color: var(--cs-accent)" />
            <span class="cs-mono cs-t-xs cs-dimmer" style="font-size: 10px">{{ name }}</span>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
