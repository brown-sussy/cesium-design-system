<script setup lang="ts">
import { Badge, Divider, Icon, StatusDot } from '../../vue';
import CodeBlock from '../components/CodeBlock.vue';
import { componentCount, navByCategory } from '../lib/nav.generated';

const installBash = `git clone https://github.com/brown-sussy/cesium-design-system.git
cd cesium-design-system
npm install
npm run build:vue        # writes dist/vue/ — required before another project can install it`;

const installApp = `# in your app
npm install ../cesium-design-system`;

const usageVue = `<script setup lang="ts">
import '@cesium-ds/core/styles.css';
import { Button, Panel, Compass } from '@cesium-ds/core/vue';
<\/script>

<template>
  <Panel title="Mission" accent>
    <Button variant="primary">Deploy</Button>
    <Compass :heading="28" />
  </Panel>
</template>`;

const pluginTs = `import { createApp } from 'vue';
import CesiumVue from '@cesium-ds/core/vue';

createApp(App).use(CesiumVue);`;

const themeOverrideCss = `/* override a token — scope it, never edit the compiled file */
.brand-scope {
  --cs-accent: #4EB8DE;
  --cs-accent-hover: #6EC7EA;
  --cs-accent-soft: rgba(78, 184, 222, 0.14);
  --cs-accent-line: rgba(78, 184, 222, 0.38);
  --cs-accent-contrast: #041217;
}`;

const tokensTable = [
  ['Colour (themed)', '--cs-', '39', '--cs-text-secondary'],
  ['Typography', '--cs-fs / lh / fw / tracking', '32', '--cs-fs-md'],
  ['Space & radius', '--cs-space / radius', '24', '--cs-space-16'],
  ['Motion', '--cs-dur / ease', '8', '--cs-dur-base'],
  ['Layers & layout', '--cs-z / control / header', '10', '--cs-header-h'],
  ['Elevation', '--cs-shadow', '5', '--cs-shadow-md'],
  ['Primitives', '--cs-atmos / slate / signal', '35', '--cs-atmos-400'],
];

const packageContents = [
  ['dist/vue/index.js', 'Vue 3 ES module build, tree-shakeable'],
  ['dist/vue/index.cjs', 'CommonJS build for Vue'],
  ['dist/vue/index.d.ts', 'TypeScript declarations for all 68 Vue exports'],
  ['dist/cesium-ds.css', 'Shared stylesheet: compiled tokens, base reset, component CSS'],
  ['dist/tokens.json', 'Token bundle for design tools'],
  ['vue/', 'Vue SFC sources, composables and types'],
];
</script>

<template>
  <div class="doc-main__inner">
    <header>
      <div class="doc-eyebrow">Resources</div>
      <h1 class="doc-h1">Installation & theming</h1>
      <p class="doc-lede">
        One package, one stylesheet, two themes — for Vue 3 and React. Zero runtime dependencies beyond Vue.
      </p>
      <div class="doc-meta">
        <Badge tone="accent">v1.0.0</Badge>
        <Badge>Vue ≥ 3.3</Badge>
        <Badge>React ≥ 18</Badge>
        <Badge>MIT</Badge>
      </div>
    </header>

    <section class="doc-section">
      <h2 class="doc-h2">Install</h2>
      <div class="prose">
        <p>
          The package is <strong>not on npm yet</strong>. Until it is, build it from this repository
          and install it by path — one setup in the repo, one command in your app. The imports below
          are already written against <code>@cesium-ds/core</code>.
        </p>
      </div>
      <div style="height: 12px" />
      <CodeBlock lang="bash" :code="installBash" />
      <div style="height: 12px" />
      <CodeBlock lang="bash" :code="installApp" />
      <div style="height: 12px" />
      <CodeBlock lang="vue" :code="usageVue" />
      <div style="height: 18px" />
      <div class="prose">
        <p>
          Or register all 68 exports globally with the plugin — every component is available as
          <code>&lt;CsButton&gt;</code>, <code>&lt;CsPanel&gt;</code> and so on:
        </p>
      </div>
      <div style="height: 10px" />
      <CodeBlock lang="ts" :code="pluginTs" />
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">Theming</h2>
      <div class="prose">
        <p>
          Dark is the default. Light is enabled by setting <code>data-theme="light"</code> on <code>&lt;html&gt;</code>.
        </p>
      </div>
      <div style="height: 12px" />
      <CodeBlock lang="css" :code="themeOverrideCss" />
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">Tokens</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th>Group</th>
              <th>Prefix</th>
              <th>Count</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in tokensTable" :key="row[0]">
              <td class="props-table__name">{{ row[0] }}</td>
              <td class="cs-mono cs-t-xs">{{ row[1] }}</td>
              <td class="cs-mono cs-t-xs">{{ row[2] }}</td>
              <td class="props-table__type">{{ row[3] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">Package contents</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th style="width: 36%">Path</th>
              <th>Contents</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="[path, desc] in packageContents" :key="path">
              <td class="props-table__name">{{ path }}</td>
              <td>{{ desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">Support & constraints</h2>
      <div class="cs-stack" style="gap: 12px; max-width: 560px">
        <div class="cs-row" style="gap: 10px">
          <StatusDot tone="success" label="Chrome / Edge 111+" />
        </div>
        <div class="cs-row" style="gap: 10px">
          <StatusDot tone="success" label="Safari 16.4+" />
        </div>
        <div class="cs-row" style="gap: 10px">
          <StatusDot tone="success" label="Firefox 113+" />
        </div>
        <Divider />
        <p class="cs-t-sm cs-dimmer" style="line-height: 1.6">
          <code>color-mix()</code> is used for derived borders and tints. In older browsers those borders fall back to transparent.
        </p>
      </div>
    </section>
  </div>
</template>
