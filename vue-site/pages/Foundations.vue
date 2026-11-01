<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { Badge, Button, Icon, iconPaths } from '../../vue';
import type { IconName } from '../../vue/types';
import CodeBlock from '../components/CodeBlock.vue';
import { TOKEN_STATS } from '../../docs/lib/tokenStats';

/**
 * The foundations pages: principles, colour, type, space, motion, icons.
 *
 * Two things are deliberately *not* typed in. The semantic swatches read their
 * values from the live stylesheet, so switching theme — or the shape preset,
 * which moves every radius — updates the numbers instead of contradicting
 * them. And the icon gallery is the glyph table itself, not a hand-kept copy of
 * it: the React page still lists 44 while the table holds 50.
 */
const props = defineProps<{ id?: string }>();

const pageId = computed(() => props.id || 'principles');

/* ------------------------------------------------------------------ */
/* live token reader                                                   */
/* ------------------------------------------------------------------ */

const semanticNames = [
  'bg-base', 'bg-canvas', 'bg-surface', 'bg-raised', 'bg-inset', 'bg-hover', 'bg-selected',
  'text-primary', 'text-secondary', 'text-tertiary', 'text-disabled', 'text-inverse',
  'border-subtle', 'border', 'border-strong',
  'solid', 'solid-hover', 'solid-active', 'solid-contrast',
  'accent', 'accent-hover', 'accent-active', 'accent-soft', 'accent-line',
  'success', 'warning', 'danger', 'info',
];

const radiusNames = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'pill'];

const watched = [...semanticNames, ...radiusNames.map((r) => `radius-${r}`)];
const values = ref<Record<string, string>>({});

function readTokens() {
  const style = getComputedStyle(document.documentElement);
  const next: Record<string, string> = {};
  for (const name of watched) next[name] = style.getPropertyValue(`--cs-${name}`).trim();
  values.value = next;
}

let observer: MutationObserver | undefined;

onMounted(() => {
  readTokens();
  // `data-theme` swaps the values; `data-style` moves every radius. Both have
  // to be watched or the page silently reports the previous theme.
  observer = new MutationObserver(readTokens);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'data-style'],
  });
});

onBeforeUnmount(() => observer?.disconnect());

const tokenValue = (name: string) => values.value[name] || '—';

/* ------------------------------------------------------------------ */
/* principles                                                          */
/* ------------------------------------------------------------------ */

const principles = [
  {
    title: 'Precision over decoration',
    text: 'Hairlines instead of shadows, numbers instead of adjectives. If a border can carry the structure, no background is needed.',
    detail:
      'This is why the radius scale stops in the high teens, why borders are 1px at 9–16% opacity, and why elevation is used only for things that genuinely float: dialogs, popovers, tooltips.',
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
      'The accent is re-picked rather than reused: a lighter cyan on the dark ground, a deeper one on white. Semantic colours darken by roughly 40% instead of being carried over.',
  },
  {
    title: 'Motion as feedback',
    text: '120–260ms with a mechanical ease-out. Motion confirms a state change; it never announces itself.',
    detail:
      'Nothing bounces, nothing loops except a live status pulse, and every duration collapses to 0ms under prefers-reduced-motion.',
  },
];

const nonGoals = [
  {
    title: 'Not a marketing site kit.',
    text: 'There is no hero type scale above 64px and no illustration system. Large expressive type belongs to the product, not the shell.',
  },
  {
    title: 'Not a mobile-first app shell.',
    text: 'Components are responsive, but the density targets a workstation with a pointer and a keyboard.',
  },
  {
    title: 'Not themeable into another brand.',
    text: 'The tokens are semantic and complete; swapping the accent is supported, inventing a second visual language is not.',
  },
];

/* ------------------------------------------------------------------ */
/* color                                                               */
/* ------------------------------------------------------------------ */

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

const colorRules = [
  {
    title: 'Primary is solid, not coloured.',
    text: 'The one white surface on the page is the action you want taken. If two buttons are white, neither is primary.',
  },
  {
    title: 'The accent is a signal, not a decoration.',
    text: 'If it is not interactive or selected, it is not accent.',
  },
  {
    title: 'Never stack two soft backgrounds.',
    text: 'A tinted alert inside a tinted panel loses both readings; drop the outer tint.',
  },
  {
    title: 'Status colour needs a label.',
    text: 'A red dot alone fails for roughly 8% of male users and for every screen reader.',
  },
  {
    title: 'Contrast.',
    text: 'Body text is at least 4.5:1 against its surface, large text 3:1, and 1px borders are treated as decorative — never the sole indicator.',
  },
];

/* ------------------------------------------------------------------ */
/* typography                                                          */
/* ------------------------------------------------------------------ */

const families = [
  {
    index: 'Display · 01',
    name: 'Newsreader',
    meta: 'optical sizes 6–72',
    key: 'display',
    italic: true,
    text: 'Roman for statements, italic for the margin voice — section labels, accents, asides. Drawn at two weights only, so the face never has to fake a bold.',
  },
  {
    index: 'Interface · 02',
    name: 'Instrument Sans',
    meta: 'weights 400–700',
    key: 'sans',
    italic: false,
    text: 'The working voice: body copy, labels, buttons, table cells. Slightly wide, open apertures, low contrast — legible at 11px in a dense panel and quiet at 16px in a paragraph.',
  },
  {
    index: 'Data · 03',
    name: 'JetBrains Mono',
    meta: '37.7749° N',
    key: 'mono',
    italic: false,
    text: 'Coordinates, identifiers, byte counts, timestamps, column headers, keycaps. Always with tabular numerals when the value can change, never for a sentence.',
  },
];

const typeScale = [
  { token: '5xl', size: '48px', line: '54px', sample: 'Planetary scale', use: 'Marketing and empty-state headlines only' },
  { token: '4xl', size: '36px', line: '42px', sample: 'Scene overview', use: 'Page titles' },
  { token: '3xl', size: '28px', line: '36px', sample: 'Metric headline', use: 'Stat values, section leads' },
  { token: '2xl', size: '22px', line: '30px', sample: 'Imagery layers', use: 'Sub-sections' },
  { token: 'xl', size: '18px', line: '26px', sample: 'Camera controls', use: 'Dialog titles, card headings' },
  { token: 'lg', size: '16px', line: '24px', sample: 'Load a tileset into the current scene.', use: 'Lede paragraphs' },
  { token: 'md', size: '14px', line: '22px', sample: 'Body copy sits at fourteen pixels.', use: 'Body, default document text' },
  { token: 'base', size: '13px', line: '20px', sample: 'Interface default — buttons, inputs, table cells.', use: 'Controls and dense UI' },
  { token: 'sm', size: '12px', line: '18px', sample: 'Secondary labels and helper text.', use: 'Labels, hints, tags' },
  { token: 'xs', size: '11px', line: '16px', sample: 'Monospace micro-data · 37.7749° N', use: 'Kbd, badges, readouts' },
  { token: '2xs', size: '10px', line: '14px', sample: 'COLUMN HEADER · UPPERCASE', use: 'Table headers, eyebrows' },
];

const monoRules = [
  {
    title: 'Readouts',
    text: 'coordinates, altitude, heading. Uppercase 8–10px keys with 11–12px values.',
  },
  {
    title: 'Identifiers',
    text: 'asset IDs, CRS codes, tile paths. Never uppercase these; they are case-sensitive.',
  },
  {
    title: 'Micro-captions',
    text: 'column headers, eyebrows, panel titles. Uppercase at 0.14–0.18em tracking, at 9–10px.',
  },
];

/* ------------------------------------------------------------------ */
/* spacing                                                             */
/* ------------------------------------------------------------------ */

const spaceScale = [2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128];

const rhythm = [
  ['4px', 'between a label and its control.'],
  ['8px', 'between related controls in a row.'],
  ['16px', 'between fields; 24px between form groups.'],
  ['32–48px', 'between page sections; 76px between major bands on a landing surface.'],
];

const controls = [
  { name: 'sm', h: 28, use: 'Toolbars, table filters, dense headers' },
  { name: 'md', h: 34, use: 'Default for every form control' },
  { name: 'lg', h: 40, use: 'Primary page actions, hero CTAs' },
];

/* ------------------------------------------------------------------ */
/* motion                                                              */
/* ------------------------------------------------------------------ */

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

const easings = [
  ['ease-out', 'cubic-bezier(0.22, 1, 0.36, 1)', 'Entering and settling. The default.'],
  ['ease-in-out', 'cubic-bezier(0.4, 0, 0.2, 1)', 'Moving between two states.'],
  ['ease-spring', 'cubic-bezier(0.34, 1.56, 0.64, 1)', 'Small physical parts: switch thumbs, checkmarks.'],
];

const motionCode = `<div class="cs-anim-rise">…</div>   <!-- opacity + 10px rise -->
<div class="cs-anim-fade">…</div>   <!-- opacity only -->
<div class="cs-anim-scale">…</div>  <!-- opacity + 0.97 scale -->
<div class="cs-anim-slide">…</div>  <!-- opacity + 8px slide -->

<!-- stagger children 45ms apart -->
<ul class="cs-stagger">…</ul>

<!-- reveal on scroll — add .is-in when it enters view -->
<section class="cs-reveal">…</section>`;

const motionRules = [
  {
    title: 'Animate one property.',
    text: 'Opacity, transform, or colour — not all three. The modal animates opacity and a 10px translate; that is the ceiling.',
  },
  {
    title: 'No infinite motion except live status.',
    text: 'A pulsing dot means “this is streaming right now”. A pulsing button means nothing.',
  },
  {
    title: 'Never animate layout.',
    text: 'Width, height and top/left force reflow; use transform and opacity.',
  },
  {
    title: 'Respect the setting.',
    text: 'Every duration token collapses to 0ms under prefers-reduced-motion.',
  },
];

/* ------------------------------------------------------------------ */
/* iconography                                                         */
/* ------------------------------------------------------------------ */

/**
 * The gallery *is* the glyph table, in the table's order. A hand-written list
 * is how the React page came to advertise 44 glyphs while shipping 50.
 */
const iconNames = Object.keys(iconPaths) as IconName[];

const iconRules = [
  {
    title: 'Sizes:',
    text: '12px in dense toolbars, 14–16px in buttons and inputs, 18–20px standalone. Never below 12px.',
  },
  {
    title: 'Stroke:',
    text: '1.5px at 14–24px, 2px only below 12px so the mark does not disappear.',
  },
  {
    title: 'Colour:',
    text: 'icons inherit currentColor. They are never the accent unless the control is active.',
  },
  {
    title: 'Meaning:',
    text: 'an icon never carries meaning alone in a control — it is paired with a label or an accessible name.',
  },
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
          Four rules that decide what the system does when two options both look reasonable. They are
          short on purpose — everything else in these docs is a consequence.
        </p>
        <div class="doc-meta">
          <Badge tone="accent">{{ principles.length }} principles</Badge>
          <Badge>Applied system-wide</Badge>
        </div>
      </header>

      <section class="doc-section">
        <h2 class="doc-h2">The rules</h2>
        <div class="principle-grid">
          <div v-for="(p, i) in principles" :key="p.title" class="principle-card">
            <div class="principle-card__index">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="principle-card__title">{{ p.title }}</div>
            <div class="principle-card__text">{{ p.text }}</div>
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

      <section class="doc-section">
        <h2 class="doc-h2">Non-goals</h2>
        <div class="prose">
          <ul>
            <li v-for="g in nonGoals" :key="g.title">
              <strong>{{ g.title }}</strong> {{ g.text }}
            </li>
          </ul>
        </div>
      </section>
    </template>

    <!-- 2. Color -->
    <template v-else-if="pageId === 'color'">
      <header>
        <div class="doc-eyebrow">Foundations</div>
        <h1 class="doc-h1">Color</h1>
        <p class="doc-lede">
          True greys carry the entire structure — no blue cast in a surface, a border or a label. The
          primary action is a solid white key, and one steel accent is left over for whatever is
          interactive or selected.
        </p>
        <div class="doc-meta">
          <Badge tone="accent">2 themes</Badge>
          <Badge>{{ TOKEN_STATS.themed }} themed tokens</Badge>
          <Badge>WCAG AA body text</Badge>
        </div>
      </header>

      <section class="doc-section">
        <h2 class="doc-h2">Primitive ramps</h2>
        <p class="doc-sub">
          Primitives are static and identical in both themes. They are for charts, illustrations and
          the occasional accent tint — never for UI surfaces.
        </p>

        <div class="ramp-label">
          <span class="ramp-label__name">Atmosphere</span>
          <span class="ramp-label__meta">steel · {{ atmosKeys.length }} steps</span>
        </div>
        <div class="swatch-grid">
          <div v-for="k in atmosKeys" :key="k">
            <div class="swatch__chip" :style="{ background: `var(--cs-${k})` }" />
            <div class="swatch__label">{{ k.split('-')[1] }}</div>
          </div>
        </div>

        <div class="ramp-label">
          <span class="ramp-label__name">Slate</span>
          <span class="ramp-label__meta">neutral · {{ slateKeys.length }} steps</span>
        </div>
        <div class="swatch-grid">
          <div v-for="k in slateKeys" :key="k">
            <div class="swatch__chip" :style="{ background: `var(--cs-${k})` }" />
            <div class="swatch__label">{{ k.split('-')[1] }}</div>
          </div>
        </div>

        <div class="ramp-label">
          <span class="ramp-label__name">Signal</span>
          <span class="ramp-label__meta">state hues · {{ signalKeys.length }}</span>
        </div>
        <div class="swatch-grid">
          <div v-for="k in signalKeys" :key="k">
            <div class="swatch__chip" :style="{ background: `var(--cs-${k})` }" />
            <div class="swatch__label">{{ k.replace('signal-', '') }}</div>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-h2">Semantic tokens</h2>
        <p class="doc-sub">
          Components only ever reference semantic tokens. The values below are read from the live
          stylesheet — switch the theme in the header and they update.
        </p>
        <div v-for="group in semanticGroups" :key="group.title" style="margin-bottom: 26px">
          <div class="ramp-label" style="margin-top: 0">
            <span class="ramp-label__name">{{ group.title }}</span>
          </div>
          <div v-for="[name, use] in group.rows" :key="name" class="token-row">
            <span class="token-row__dot" :style="{ background: `var(--cs-${name})` }" />
            <span class="token-row__name">--cs-{{ name }}</span>
            <span class="token-row__use">{{ use }}</span>
            <span class="token-row__value">{{ tokenValue(name) }}</span>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-h2">Usage rules</h2>
        <div class="prose">
          <ul>
            <li v-for="r in colorRules" :key="r.title">
              <strong>{{ r.title }}</strong> {{ r.text }}
            </li>
          </ul>
        </div>
      </section>
    </template>

    <!-- 3. Typography -->
    <template v-else-if="pageId === 'typography'">
      <header>
        <div class="doc-eyebrow">Foundations</div>
        <h1 class="doc-h1">Typography</h1>
        <p class="doc-lede">
          Newsreader for the display voice, Instrument Sans for the interface, JetBrains Mono for
          anything a machine produced. Three families, eleven sizes — and a hard rule that numbers
          are always tabular.
        </p>
        <div class="doc-meta">
          <Badge tone="accent">{{ families.length }} families</Badge>
          <Badge>{{ typeScale.length }} sizes</Badge>
          <Badge>tabular numerals</Badge>
        </div>
      </header>

      <section class="doc-section">
        <h2 class="doc-h2">Families</h2>
        <p class="doc-sub">
          Three voices, each with one job. A serif that sets the tone, a grotesque that does the work,
          and a mono that reports what the machine measured.
        </p>
        <div class="family-grid">
          <div v-for="f in families" :key="f.name">
            <div class="doc-eyebrow" style="color: var(--cs-text-tertiary)">{{ f.index }}</div>
            <div :class="`family-name family-name--${f.key}`">{{ f.name }}</div>
            <div :class="`family-meta family-meta--${f.key}`">{{ f.meta }}</div>
            <p class="doc-sub" style="margin-top: 10px">{{ f.text }}</p>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-h2">Scale</h2>
        <p class="doc-sub">
          Each size is paired with a line-height token. Do not mix a size with a line-height from a
          different step.
        </p>
        <div>
          <div v-for="t in typeScale" :key="t.token" class="type-row">
            <div class="type-row__meta">
              {{ t.token }} · {{ t.size }}<br />lh {{ t.line }}
            </div>
            <div>
              <div class="type-row__sample" :style="{ fontSize: t.size, lineHeight: t.line }">
                {{ t.sample }}
              </div>
              <div class="cs-t-xs cs-dimmer" style="margin-top: 3px">{{ t.use }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-h2">Monospace in practice</h2>
        <div class="prose">
          <p>
            Monospace is the system’s second voice. It signals “this value came from a machine” and it
            makes columns of digits line up. Three patterns cover almost every case:
          </p>
          <ul>
            <li v-for="r in monoRules" :key="r.title">
              <strong>{{ r.title }}</strong> — {{ r.text }}
            </li>
          </ul>
          <p>
            Never set a sentence in monospace. It is a data voice, not a display voice — and it will
            read as a code block even when it is prose.
          </p>
        </div>
      </section>
    </template>

    <!-- 4. Spacing -->
    <template v-else-if="pageId === 'spacing'">
      <header>
        <div class="doc-eyebrow">Foundations</div>
        <h1 class="doc-h1">Space &amp; grid</h1>
        <p class="doc-lede">
          A 4px base unit with named pixel steps, so a token always tells you its value. Control
          heights and radii are part of the same rhythm.
        </p>
        <div class="doc-meta">
          <Badge tone="accent">4px base</Badge>
          <Badge>{{ spaceScale.length }} steps</Badge>
          <Badge>hairline borders</Badge>
        </div>
      </header>

      <section class="doc-section">
        <h2 class="doc-h2">Space scale</h2>
        <p class="doc-sub">
          Steps are named after their pixel value: <code>--cs-space-16</code> is 16px. Half-steps of 2
          and 6px exist for optical alignment inside controls, not for layout.
        </p>
        <div>
          <div v-for="s in spaceScale" :key="s" class="space-row">
            <span class="space-row__name">space-{{ s }}</span>
            <span class="space-row__bar" :style="{ width: `${s}px` }" />
            <span class="space-row__px">{{ s }}px</span>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-h2">Vertical rhythm</h2>
        <div class="prose">
          <ul>
            <li v-for="[step, use] in rhythm" :key="step">
              <strong>{{ step }}</strong> {{ use }}
            </li>
          </ul>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-h2">Radii</h2>
        <p class="doc-sub">
          Radii stay small because the surfaces are technical. The shape preset moves the whole scale
          — the values below are read live, so switch the preset and watch them change.
        </p>
        <div class="radius-grid">
          <div v-for="name in radiusNames" :key="name" class="radius-demo">
            <div
              class="radius-demo__box"
              :style="{ borderRadius: `var(--cs-radius-${name})` }"
            />
            <span class="radius-demo__name">{{ name }} · {{ tokenValue(`radius-${name}`) }}</span>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-h2">Control heights</h2>
        <div class="cs-stack" style="gap: 10px; max-width: 380px">
          <div v-for="c in controls" :key="c.name" class="cs-row" style="gap: 14px">
            <div
              :style="{
                width: `${c.h}px`,
                height: `${c.h}px`,
                borderRadius: 'var(--cs-radius-sm)',
                background: 'var(--cs-accent-soft)',
                border: '1px solid var(--cs-accent-line)',
              }"
            />
            <div>
              <div class="cs-mono cs-t-sm" style="color: var(--cs-text-primary)">
                control-{{ c.name }} · {{ c.h }}px
              </div>
              <div class="cs-t-xs cs-dimmer">{{ c.use }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-h2">Grid</h2>
        <div class="prose">
          <p>
            Layout is built from a 12-column fluid grid with 24px gutters inside a 1440px maximum page
            width. Panels and cards do not snap to columns — they flow in CSS grid with a 10–14px gap,
            because dashboards change shape far more often than marketing pages.
          </p>
          <p>
            The graticule texture — a 32px hairline grid — is available as
            <code>.cs-graticule</code> for empty states and map backdrops. Use it at 5–6% opacity; it
            should be felt, not read.
          </p>
        </div>
      </section>
    </template>

    <!-- 5. Motion -->
    <template v-else-if="pageId === 'motion'">
      <header>
        <div class="doc-eyebrow">Foundations</div>
        <h1 class="doc-h1">Motion</h1>
        <p class="doc-lede">
          Motion confirms a state change and then gets out of the way. Fast, mechanical, and never
          decorative — a 180ms transition is already at the edge of what a dense interface can afford.
        </p>
        <div class="doc-meta">
          <Badge tone="accent">{{ durations.length }} durations</Badge>
          <Badge>{{ easings.length }} easings</Badge>
          <Badge>reduced-motion aware</Badge>
        </div>
      </header>

      <section class="doc-section">
        <h2 class="doc-h2">Durations</h2>
        <div>
          <div v-for="[name, value, use] in durations" :key="name" class="motion-row">
            <span class="motion-row__name">dur-{{ name }}</span>
            <span class="motion-row__val">{{ value }}</span>
            <div>
              <div class="cs-t-xs" style="color: var(--cs-text-secondary)">{{ use }}</div>
              <div class="motion-demo" style="margin-top: 6px">
                <span
                  class="motion-demo__bar"
                  :style="{
                    animationDuration: value,
                    animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                    animationIterationCount: 'infinite',
                    animationDirection: 'alternate',
                    width: '24px',
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-h2">Easings</h2>
        <div>
          <div v-for="[name, curve, use] in easings" :key="name" class="motion-row">
            <span class="motion-row__name">{{ name }}</span>
            <span class="motion-row__val" style="font-size: 9px">{{ curve }}</span>
            <span class="cs-t-xs" style="color: var(--cs-text-secondary)">{{ use }}</span>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-h2">Primitives</h2>
        <p class="doc-sub">
          Four entrance animations cover almost everything. They animate opacity plus a single
          transform, run once, and never loop.
        </p>

        <div class="cs-row" style="gap: 12px; margin-bottom: 16px">
          <Button size="sm" variant="secondary" @click="motionRun++">
            <template #icon-left><Icon name="play" :size="11" /></template>
            Replay
          </Button>
          <span class="cs-t-xs cs-dimmer">Remounts each sample so the animation runs again.</span>
        </div>

        <div :key="motionRun" class="motion-grid">
          <div
            v-for="(p, i) in motionPrimitives"
            :key="p.name"
            :class="`motion-sample ${p.cls}`"
            :style="{ '--cs-anim-delay': `${i * 70}ms` }"
          >
            <span class="motion-sample__stage">
              <span class="motion-sample__dot" />
              <span class="motion-sample__bar" />
            </span>
            <span class="motion-sample__name">{{ p.name }}</span>
            <span class="motion-sample__note">{{ p.note }}</span>
          </div>
        </div>

        <div style="height: 16px" />
        <CodeBlock lang="html" :code="motionCode" />
      </section>

      <section class="doc-section">
        <h2 class="doc-h2">Rules</h2>
        <div class="prose">
          <ul>
            <li v-for="r in motionRules" :key="r.title">
              <strong>{{ r.title }}</strong> {{ r.text }}
            </li>
          </ul>
        </div>
      </section>
    </template>

    <!-- 6. Iconography -->
    <template v-else-if="pageId === 'iconography'">
      <header>
        <div class="doc-eyebrow">Foundations</div>
        <h1 class="doc-h1">Iconography</h1>
        <p class="doc-lede">
          {{ iconNames.length }} glyphs drawn on a 24px grid with a 1.5px stroke. Geometric, open, and
          instrument-like — circles, crosshairs, chevrons, no fills except where a mark needs weight.
        </p>
        <div class="doc-meta">
          <Badge tone="accent">{{ iconNames.length }} icons</Badge>
          <Badge>24px grid</Badge>
          <Badge>1.5px stroke</Badge>
        </div>
      </header>

      <section class="doc-section">
        <h2 class="doc-h2">Set</h2>
        <div class="icon-gallery">
          <div v-for="name in iconNames" :key="name" class="icon-cell">
            <Icon :name="name" :size="18" />
            <span class="icon-cell__name">{{ name }}</span>
          </div>
        </div>
      </section>

      <section class="doc-section">
        <h2 class="doc-h2">Rules</h2>
        <div class="prose">
          <ul>
            <li v-for="r in iconRules" :key="r.title">
              <strong>{{ r.title }}</strong> {{ r.text }}
            </li>
          </ul>
        </div>
      </section>
    </template>

    <template v-else>
      <header>
        <div class="doc-eyebrow">404</div>
        <h1 class="doc-h1">Not found</h1>
        <p class="doc-lede">That foundation page does not exist.</p>
      </header>
    </template>
  </div>
</template>
