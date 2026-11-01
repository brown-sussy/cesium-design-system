<script setup lang="ts">
import {
  Button,
  Compass,
  CoordinateReadout,
  Icon,
  Kbd,
  ScaleBar,
  StatusDot,
} from '../../vue';
import Globe from '../components/Globe.vue';
import CodeBlock from '../components/CodeBlock.vue';
import { componentCount, navEntries } from '../lib/nav.generated';
import { templateMeta } from '../lib/site';
import { navigate } from '../lib/router';

const rules = [
  {
    title: 'Token-first',
    text: 'Every colour, space and duration is a CSS custom property compiled from one JSON source. Component code contains no raw values.',
  },
  {
    title: 'Dark by construction',
    text: 'The default theme is the void behind the globe. Light is written per surface, not inverted from dark.',
  },
  {
    title: 'Density with air',
    text: '28 / 34 / 40px control heights on a 4px grid, hairline borders, 3–6px radii. Compact, never cramped.',
  },
  {
    title: 'Instrument language',
    text: 'Monospace labels, tabular figures, dotted leaders, uppercase micro-captions. Data reads as a readout.',
  },
  {
    title: 'One accent, earned',
    text: 'Grey carries structure, white carries the action. Steel cyan is left for whatever is interactive or selected.',
  },
  {
    title: 'Agent-ready',
    text: 'Ships with a SKILL.md that teaches an agent the tokens, APIs and anti-patterns, so generated UI stays on-system.',
  },
  {
    title: 'Past the chrome',
    text: 'AI traces, tool calls, transcripts, spectra, event displays and sequences — the same tokens, no charting dependency.',
  },
];

const featured = [
  'button',
  'input',
  'table',
  'panel',
  'reasoning-trace',
  'event-display',
  'compass',
  'coordinate-readout',
];

const featuredDocs = featured
  .map((slug) => navEntries.find((d) => d.slug === slug))
  .filter((d): d is (typeof navEntries)[number] => Boolean(d));

const principles = [
  ['Precision over decoration', 'A hairline where a shadow would do. A number where an adjective would do.'],
  ['Data over chrome', 'The interface recedes so the scene, the table and the coordinates can lead.'],
  ['Dark first', 'Designed for a darkened operations room, then re-tuned for daylight.'],
  ['Motion as feedback', '120–260ms, mechanical easing. Nothing bounces, nothing lingers.'],
];

const swatches: [string, string][] = [
  ['bg-base', 'var(--cs-bg-base)'],
  ['border', 'var(--cs-border)'],
  ['text-disabled', 'var(--cs-text-disabled)'],
  ['text-tertiary', 'var(--cs-text-tertiary)'],
  ['text-primary', 'var(--cs-text-primary)'],
  ['accent', 'var(--cs-accent)'],
  ['success', 'var(--cs-success)'],
  ['warning', 'var(--cs-warning)'],
];

const specs: [string, string][] = [
  ['Components', String(componentCount)],
  ['Tokens', '153'],
  ['Runtime deps', '0'],
  ['Peer dep', 'Vue · React'],
];

const installBash = `git clone https://github.com/brown-sussy/cesium-design-system
cd cesium-design-system && npm i && npm run build:vue

# in your app
npm install ../cesium-design-system`;

const usageVue = `<script setup lang="ts">
import '@cesium-ds/core/styles.css';
import { Button, Panel, PanelBody, CoordinateReadout } from '@cesium-ds/core/vue';
<\/script>

<template>
  <Panel title="Camera" accent>
    <PanelBody>
      <CoordinateReadout :lat="37.7749" :lon="-122.4194" :alt="1284.5" />
      <Button variant="primary">Deploy</Button>
    </PanelBody>
  </Panel>
</template>`;
</script>

<template>
  <div class="doc-container">
    <section class="hero">
      <div class="hero__text">
        <h1 class="hero__title">
          Interfaces for
          <br />
          planetary scale.
        </h1>
        <p class="hero__lede">
          A design system for maps, globes and the dashboards that watch them. {{ componentCount }}
          components, 153 tokens, one stylesheet for Vue and React.
        </p>
        <div class="hero__actions">
          <Button variant="primary" size="lg" @click="navigate('/components')">
            Browse components
          </Button>
          <button type="button" class="hero__link" @click="navigate('/resources')">
            Get started
            <Icon name="arrow-right" :size="13" />
          </button>
        </div>
        <dl class="hero__specs">
          <div v-for="[label, value] in specs" :key="label">
            <dt>{{ label }}</dt>
            <dd>{{ value }}</dd>
          </div>
        </dl>
      </div>

      <div class="hero-stage">
        <div class="hero-stage__globe">
          <Globe />
        </div>

        <div class="hud-float hud-float--status">
          <StatusDot tone="success" label="Stream live" pulse />
        </div>

        <div class="hud-float hud-float--compass">
          <Compass :heading="28" :size="56" />
        </div>

        <div class="hud-float hud-float--coords">
          <CoordinateReadout :lat="37.7749" :lon="-122.4194" :alt="1284.5" />
        </div>

        <div class="hud-float hud-float--scale">
          <ScaleBar :distance="500" unit="km" :width="104" />
        </div>
      </div>
    </section>

    <section class="home-section">
      <div class="home-head">
        <div>
          <div class="doc-eyebrow">The system</div>
          <h2 class="home-head__title">{{ rules.length }} rules, enforced by tokens</h2>
        </div>
        <p class="home-head__note">
          The rules are few. Because they live in tokens rather than in component code, a
          dashboard, a dialog and a HUD overlay stay one product.
        </p>
      </div>
      <div class="rule-list">
        <div v-for="(rule, i) in rules" :key="rule.title" class="rule">
          <span class="rule__n">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="rule__title">{{ rule.title }}</span>
          <span class="rule__text">{{ rule.text }}</span>
        </div>
      </div>
    </section>

    <section class="home-section">
      <div class="home-head">
        <div>
          <div class="doc-eyebrow">Foundations</div>
          <h2 class="home-head__title">Grey structure, white action</h2>
        </div>
        <p class="home-head__note">
          Neutral greys carry surfaces, borders and labels. Celestial cyan marks what is interactive.
          Signal colours only ever mean state.
        </p>
      </div>
      <div class="swatch-band">
        <div v-for="[name, value] in swatches" :key="name" class="swatch">
          <span class="swatch__chip" :style="{ background: value }" />
          <span class="swatch__name">{{ name }}</span>
        </div>
      </div>
      <div class="home-more">
        <button type="button" class="home__link" @click="navigate('/foundations/color')">
          Colour system
          <Icon name="arrow-right" :size="12" />
        </button>
      </div>
    </section>

    <section class="home-section">
      <div class="home-head">
        <div>
          <div class="doc-eyebrow">Components</div>
          <h2 class="home-head__title">The index</h2>
        </div>
        <p class="home-head__note">
          Typed, dependency-free, documented with live examples, prop tables and keyboard notes.
        </p>
      </div>
      <div class="index-list">
        <a
          v-for="doc in featuredDocs"
          :key="doc.slug"
          class="index-row"
          :href="`#/components/${doc.slug}`"
          @click.prevent="navigate(`/components/${doc.slug}`)"
        >
          <span class="index-row__name">{{ doc.name }}</span>
          <span class="index-row__dots" />
          <span class="index-row__cat">{{ doc.category }}</span>
        </a>
      </div>
      <div class="home-more">
        <button type="button" class="home__link" @click="navigate('/components')">
          All {{ componentCount }} components
          <Icon name="arrow-right" :size="12" />
        </button>
      </div>
    </section>

    <section class="home-section">
      <div class="home-head">
        <div>
          <div class="doc-eyebrow">Templates</div>
          <h2 class="home-head__title">Start from a page</h2>
        </div>
        <p class="home-head__note">
          Four whole screens built from the system. Each is rendered live from its own source.
        </p>
      </div>
      <div class="site-cards" style="margin-top: 0">
        <a
          v-for="t in templateMeta"
          :key="t.slug"
          class="site-card"
          :href="`#/templates/${t.slug}`"
          @click.prevent="navigate(`/templates/${t.slug}`)"
        >
          <span class="site-card__title">{{ t.name }}</span>
          <span class="site-card__desc">{{ t.tagline }} — {{ t.description }}</span>
        </a>
      </div>
    </section>

    <section class="home-section">
      <div class="split">
        <div>
          <div class="doc-eyebrow">Principles</div>
          <h2 class="home-head__title" style="margin-top: 10px">
            What we optimise for
          </h2>
          <ol class="principle-list">
            <li v-for="([title, text], i) in principles" :key="title" class="principle">
              <span class="principle__n">{{ String(i + 1).padStart(2, '0') }}</span>
              <span>
                <span class="principle__title">{{ title }}</span>
                <span class="principle__text">{{ text }}</span>
              </span>
            </li>
          </ol>
        </div>
        <div>
          <div class="doc-eyebrow">Install</div>
          <h2 class="home-head__title" style="margin-top: 10px">
            Build it, then install it
          </h2>
          <p class="doc-sub" style="margin-top: 8px">
            One package, one stylesheet. Vue 3.3+ or React 18+ — whichever you run — is the peer dependency.
          </p>
          <CodeBlock lang="bash" :code="installBash" />
          <div style="height: 10px" />
          <CodeBlock lang="vue" :code="usageVue" />
          <div class="cs-row" style="gap: 10px; margin-top: 14px">
            <Kbd>⌘</Kbd>
            <span class="cs-t-sm cs-dimmer">Press</span>
            <Kbd>K</Kbd>
            <span class="cs-t-sm cs-dimmer">to search the whole system.</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
