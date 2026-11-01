<script setup lang="ts">
import { h } from 'vue';
import { Badge, Button, Icon, StatusDot, type IconName } from '../../vue';

/**
 * Marketing homepage — nav, split hero with a live-looking scene card, a
 * three-up feature row, a metric strip, a closing call to action and a footer.
 *
 * Responsive without media queries: every row is a grid with `auto-fit` and a
 * minimum column width, so it reflows on its own at any container size.
 *
 * Markup carries classes rather than inline styles, because the same file is
 * rendered twice — full-screen and inside the docs frame — and a stylesheet is
 * the only way both sizes can be adjusted in one place.
 */
const links = ['Product', 'Pricing', 'Docs', 'Changelog'];

const features: Array<{ icon: IconName; title: string; text: string }> = [
  {
    icon: 'layers',
    title: 'Streaming tilesets',
    text: 'Terrain, imagery and 3D Tiles from one endpoint — cached at the edge, decoded on the GPU.',
  },
  {
    icon: 'gauge',
    title: 'A frame budget you set',
    text: 'Every layer declares its cost. The scene drops detail before it ever drops a frame.',
  },
  {
    icon: 'terminal',
    title: 'API first',
    text: 'Every control in the console is a documented call. Automate the whole pipeline.',
  },
];

const metrics = [
  { value: '1.2 B', label: 'tiles served / day' },
  { value: '38 ms', label: 'p50 frame time' },
  { value: '99.98%', label: 'streaming uptime' },
  { value: '24', label: 'regions' },
];

const footerCols = [
  { title: 'Product', items: ['Tilesets', 'Scene API', 'Console', 'Changelog'] },
  { title: 'Developers', items: ['Documentation', 'Reference', 'Status', 'Examples'] },
  { title: 'Company', items: ['About', 'Careers', 'Security', 'Contact'] },
];

/**
 * The wordmark appears in the header and again in the footer. A second SFC for
 * it would break the "one file per template" promise the Templates page makes,
 * so it is a functional component built with `h()` — still this file, still no
 * inline styles.
 */
const Brand = () =>
  h('span', { class: 'tpl-brand' }, [
    h('span', { class: 'tpl-brand__mark' }, h(Icon, { name: 'globe', size: 13 })),
    h('span', { class: 'tpl-brand__name' }, 'Meridian'),
  ]);
</script>

<template>
  <div class="tpl tpl-home">
    <header class="tpl-home__nav">
      <div class="tpl-wrap tpl-home__nav-inner">
        <Brand />
        <nav class="tpl-home__links" aria-label="Primary">
          <a v-for="l in links" :key="l" class="tpl-home__link" href="#">{{ l }}</a>
        </nav>
        <div class="tpl-home__nav-actions">
          <Button variant="ghost" size="sm">Sign in</Button>
          <Button variant="primary" size="sm">Start free</Button>
        </div>
      </div>
    </header>

    <main class="tpl-home__main">
      <!-- hero -->
      <section class="tpl-wrap tpl-home__hero">
        <div class="tpl-home__hero-grid">
          <div>
            <Badge tone="accent" dot>v2.4 — vector tiles in beta</Badge>
            <h1 class="tpl-home__title">
              The planet,
              <br />
              <em>streaming.</em>
            </h1>
            <p class="tpl-home__lede">
              Meridian serves terrain, imagery and 3D Tiles to any client at sixty frames a second —
              with a budget you can actually predict.
            </p>
            <div class="tpl-home__cta">
              <Button variant="primary">
                Start free
                <template #icon-right><Icon name="arrow-right" :size="13" /></template>
              </Button>
              <Button variant="secondary">
                <template #icon-left><Icon name="play" :size="12" /></template>
                Watch the demo
              </Button>
            </div>
            <p class="cs-t-xs cs-dimmer tpl-home__note">
              No card. 50 GB of streaming included.
            </p>
          </div>

          <div class="tpl-scene">
            <div class="tpl-scene__stage">
              <span class="cs-mono cs-t-2xs cs-dimmer tpl-scene__tl">SCENE 03 · ORBITAL</span>
              <span class="cs-mono cs-t-2xs cs-dimmer tpl-scene__tr">WGS 84</span>
              <span class="cs-mono cs-t-2xs tpl-scene__bl">37.7749° N · 122.4194° W</span>
              <span class="cs-mono cs-t-2xs cs-dimmer tpl-scene__br">1:2 400 000</span>

              <!-- the horizon -->
              <svg class="tpl-scene__horizon" viewBox="0 0 400 240" aria-hidden="true">
                <ellipse
                  cx="200"
                  cy="268"
                  rx="210"
                  ry="150"
                  fill="none"
                  stroke="var(--cs-accent)"
                  stroke-opacity="0.5"
                />
                <ellipse
                  cx="200"
                  cy="268"
                  rx="210"
                  ry="60"
                  fill="none"
                  stroke="var(--cs-accent)"
                  stroke-opacity="0.22"
                />
                <ellipse
                  cx="200"
                  cy="268"
                  rx="90"
                  ry="150"
                  fill="none"
                  stroke="var(--cs-accent)"
                  stroke-opacity="0.18"
                />
                <circle cx="252" cy="150" r="3" fill="var(--cs-accent)" />
              </svg>
            </div>

            <div class="tpl-scene__bar">
              <StatusDot tone="success" label="streaming" pulse />
              <span class="tpl-scene__readout">
                <span class="cs-mono cs-t-2xs cs-dimmer">60 FPS</span>
                <span class="cs-mono cs-t-2xs cs-dimmer">18 LAYERS</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- metrics — 1px gaps act as the dividers, so any column count works -->
      <section class="tpl-home__metrics">
        <div class="tpl-wrap">
          <div class="tpl-metrics">
            <div v-for="m in metrics" :key="m.label" class="tpl-metrics__cell">
              <div class="cs-mono tpl-metrics__value">{{ m.value }}</div>
              <div class="cs-t-2xs cs-dimmer tpl-metrics__label">{{ m.label }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- features -->
      <section class="tpl-wrap tpl-home__features">
        <h2 class="tpl-home__h2">Built for scenes that cannot stutter.</h2>
        <div class="tpl-features">
          <div v-for="f in features" :key="f.title" class="tpl-feature">
            <span class="tpl-feature__icon"><Icon :name="f.icon" :size="15" /></span>
            <h3 class="tpl-feature__title">{{ f.title }}</h3>
            <p class="cs-t-sm tpl-feature__text">{{ f.text }}</p>
          </div>
        </div>
      </section>

      <!-- cta -->
      <section class="tpl-wrap tpl-home__closing">
        <div class="tpl-home__cta-card">
          <div>
            <h2 class="tpl-home__cta-title">Point it at a scene. See it in a minute.</h2>
            <p class="cs-t-sm tpl-home__cta-text">Free tier, no card, cancel whenever.</p>
          </div>
          <div class="tpl-home__cta-actions">
            <Button variant="secondary">Read the docs</Button>
            <Button variant="primary">
              Start free
              <template #icon-right><Icon name="arrow-right" :size="13" /></template>
            </Button>
          </div>
        </div>
      </section>
    </main>

    <footer class="tpl-home__footer">
      <div class="tpl-wrap tpl-home__footer-inner">
        <div class="tpl-home__footer-grid">
          <div>
            <Brand />
            <p class="cs-t-xs cs-dimmer tpl-home__blurb">
              Streaming infrastructure for planetary-scale data.
            </p>
          </div>
          <div v-for="col in footerCols" :key="col.title">
            <div class="cs-t-2xs cs-dimmer tpl-home__footer-head">{{ col.title }}</div>
            <ul class="tpl-home__footer-list">
              <li v-for="item in col.items" :key="item">
                <a class="cs-t-sm tpl-home__footer-link" href="#">{{ item }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="cs-t-2xs cs-dimmer tpl-home__footer-rule">
          <span>© 2026 Meridian Systems</span>
          <span class="cs-mono">ALL SYSTEMS NOMINAL</span>
        </div>
      </div>
    </footer>
  </div>
</template>
