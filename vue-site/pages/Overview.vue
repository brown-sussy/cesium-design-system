<script setup lang="ts">
import { Badge, Panel, PanelBody, StatusDot } from '../../vue';
import CodeBlock from '../components/CodeBlock.vue';
import { componentCount, navByCategory, totalProps } from '../lib/nav.generated';

const install = `git clone https://github.com/brown-sussy/cesium-design-system.git
cd cesium-design-system
npm install
npm run build:lib        # dist/        — React build + the shared stylesheet
npm run build:vue        # dist/vue/    — the Vue build this page documents

# in your app
npm install ../cesium-design-system`;

const usage = `<script setup lang="ts">
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

const plugin = `import { createApp } from 'vue';
import CesiumVue from '@cesium-ds/core/vue';

createApp(App).use(CesiumVue); // <CsButton>, <CsPanel>, …`;
</script>

<template>
  <div class="doc-container">
    <header style="padding-top: 40px">
      <div class="doc-eyebrow">Vue</div>
      <h1 class="doc-h1">The same system, in Vue</h1>
      <p class="doc-lede">
        {{ componentCount }} typed components as <code>.vue</code> single-file components, on the
        same stylesheet the React build emits. Not a wrapper and not a re-skin — the same
        <code>.cs-*</code> markup, so a page built with either one is the same page.
      </p>
      <div class="doc-meta">
        <Badge tone="accent">Vue ≥ 3.3</Badge>
        <Badge>{{ componentCount }} components</Badge>
        <Badge>{{ totalProps }} documented props</Badge>
        <Badge>One stylesheet</Badge>
      </div>
    </header>

    <div class="site-cards">
      <a class="site-card" href="#/components">
        <span class="site-card__title">Browse the components</span>
        <span class="site-card__desc">
          Every component with a live demo, its own source, the prop table and the accessibility
          notes.
        </span>
      </a>
      <a class="site-card" href="#/components/button">
        <span class="site-card__title">Start with Button</span>
        <span class="site-card__desc">
          Six variants, three sizes, icon slots and a loading state — the smallest complete
          example of the system's conventions.
        </span>
      </a>
      <a class="site-card" href="https://brown-sussy.github.io/cesium-design-system/">
        <span class="site-card__title">React documentation</span>
        <span class="site-card__desc">
          Foundations, patterns and the four page templates — the half of the system that is not a
          component.
        </span>
      </a>
    </div>

    <section class="doc-section">
      <h2 class="doc-h2">Install</h2>
      <div class="prose">
        <p>
          The package is <strong>not on npm yet</strong>. Until it is, build it from the repository
          and install it by path — the imports below are already written against
          <code>@cesium-ds/core</code>, so nothing changes when the name goes live.
        </p>
        <p>
          The package ships both builds. Vue is an optional peer dependency — installing it never
          pulls React in, and vice versa.
        </p>
      </div>
      <div style="height: 12px" />
      <CodeBlock :code="install" lang="bash" />
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">Use</h2>
      <div class="prose">
        <p>
          Props are the same names in kebab-case. Where Vue has a convention of its own it is used
          instead: <code>v-model</code> rather than <code>value</code> +
          <code>onValueChange</code>, <code>v-model:open</code> for overlays, scoped slots in place
          of render props.
        </p>
      </div>
      <div style="height: 12px" />
      <CodeBlock :code="usage" lang="vue" />
      <div style="height: 18px" />
      <div class="prose">
        <p>Or register all {{ componentCount }} components globally:</p>
      </div>
      <div style="height: 10px" />
      <CodeBlock :code="plugin" lang="ts" />
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">What this site is made of</h2>
      <div class="prose">
        <p>
          The chrome is not bespoke: the navigation is the library's <code>Sidebar</code>, the shape
          menu is <code>Menu</code>, the theme switch is <code>Tooltip</code> over a plain button.
          Every demo on the component pages is a real <code>.vue</code> file, and the code shown
          beside it is that same file read from disk — so a demo cannot drift from the code that is
          printed under it.
        </p>
      </div>
      <div style="height: 16px" />
      <Panel title="Status" accent>
        <PanelBody>
          <div style="display: flex; align-items: center; gap: 10px">
            <StatusDot tone="success" pulse />
            <span class="cs-t-sm">
              {{ componentCount }} components · {{ navByCategory.length }} categories ·
              {{ totalProps }} props · one stylesheet
            </span>
          </div>
        </PanelBody>
      </Panel>
    </section>
  </div>
</template>
