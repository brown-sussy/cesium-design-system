<script setup lang="ts">
import { Badge, Divider, Icon, StatusDot, components } from '../../vue';
import CodeBlock from '../components/CodeBlock.vue';
import { componentCount, navByCategory } from '../lib/nav.generated';
import { TOKEN_STATS } from '../../docs/lib/tokenStats';

/**
 * Installation, theming and everything you have to know before copying a
 * snippet. Nothing on this page is typed by hand that can be read from the
 * package: token counts come from the generated stats, the component count and
 * category count from the catalogue, and the export count from the plugin map.
 */
const installBash = `git clone https://github.com/brown-sussy/cesium-design-system.git
cd cesium-design-system
npm install
npm run build:lib        # writes dist/ — required before another project can install it
npm run build:vue        # writes dist/vue/ — the Vue build`;

const installByPath = `# in your app
npm install ../cesium-design-system
# or
pnpm add ../cesium-design-system
# or
yarn add file:../cesium-design-system`;

const installTarball = `npm pack                                # in the repo → cesium-ds-core-1.0.0.tgz
npm install ./cesium-ds-core-1.0.0.tgz  # in your app`;

const usageVue = `<script setup lang="ts">
// the stylesheet is imported once, at the app entry
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

const themeToggle = `// toggle at runtime
document.documentElement.dataset.theme = 'light';

// persist
localStorage.setItem('cesium-theme', 'light');`;

const themeOverrideCss = `/* override a token — scope it, never edit the compiled file */
.brand-scope {
  --cs-accent: #f2b33d;
  --cs-accent-hover: #ffc964;
  --cs-accent-soft: rgba(242, 179, 61, 0.12);
  --cs-accent-line: rgba(242, 179, 61, 0.38);
  --cs-accent-contrast: #1a1204;
}`;

const shapeTs = `// one attribute at the root, no re-render, no rebuild
document.documentElement.dataset.style = 'plus';   // or delete it for classic

// persist alongside the theme
localStorage.setItem('cesium-style', 'plus');`;

const shapeCss = `/* classic */  --cs-radius-md: 6px;   --cs-radius-control: 6px;
/* plus    */  --cs-radius-md: 12px;  --cs-radius-control: 999px;  /* capsule */`;

const fontsCss = `@font-face {
  font-family: 'Newsreader';
  font-style: normal;
  font-weight: 400 500;            /* this binary is instanced to 400–500 */
  font-display: swap;
  src: url('/fonts/newsreader-latin.woff2') format('woff2');
}
@font-face {
  font-family: 'Newsreader';
  font-style: italic;
  font-weight: 200 800;
  font-display: swap;
  src: url('/fonts/newsreader-italic-latin.woff2') format('woff2');
}
@font-face {
  font-family: 'Instrument Sans';
  font-weight: 400 700;
  font-display: swap;
  src: url('/fonts/instrument-sans-latin.woff2') format('woff2');
}
@font-face {
  font-family: 'JetBrains Mono';
  font-weight: 400 600;
  font-display: swap;
  src: url('/fonts/jetbrains-mono-latin.woff2') format('woff2');
}`;

const tokenGroups = [
  ['Colour (themed)', '--cs-', TOKEN_STATS.groups.color, '--cs-text-secondary'],
  ['Typography', '--cs-fs / lh / fw / tracking', TOKEN_STATS.groups.typography, '--cs-fs-md'],
  ['Space & radius', '--cs-space / radius', TOKEN_STATS.groups.spaceRadius, '--cs-space-16'],
  ['Motion', '--cs-dur / ease', TOKEN_STATS.groups.motion, '--cs-dur-base'],
  ['Layers & layout', '--cs-z / control / header', TOKEN_STATS.groups.layout, '--cs-header-h'],
  ['Elevation', '--cs-shadow', TOKEN_STATS.groups.elevation, '--cs-shadow-md'],
  ['Primitives', '--cs-atmos / slate / signal', TOKEN_STATS.groups.primitives, '--cs-atmos-400'],
];

const packageContents = [
  ['dist/index.js', 'React ES module build, tree-shakeable'],
  ['dist/index.cjs', 'React CommonJS build'],
  ['dist/index.d.ts', 'Type declarations for every React export'],
  ['dist/vue/index.js', 'Vue 3 ES module build'],
  ['dist/vue/index.cjs', 'Vue 3 CommonJS build'],
  ['dist/vue/index.d.ts', 'Type declarations for every Vue export'],
  ['dist/cesium-ds.css', 'Compiled tokens, base layer and all component styles — both frameworks'],
  ['dist/tokens.json', 'Token bundle for design tools'],
  ['src/', 'Uncompiled TypeScript sources and the Vue SFCs, for deep imports and theming'],
];

const themingRules = [
  {
    title: 'Override semantics, not primitives.',
    text: 'Change --cs-accent and everything interactive follows; do not patch component CSS. Primary buttons read --cs-solid, not the accent — they stay neutral until you override that family too.',
  },
  {
    title: 'Keep the pair.',
    text: 'If you change the accent, change its hover, soft, line and contrast companions — otherwise focus rings and tinted surfaces drift.',
  },
  {
    title: 'Both themes or neither.',
    text: 'If you ship a light mode, verify every state in both; the light accent is deliberately darker for contrast.',
  },
];

const shapeRules = [
  {
    title: 'Never mix.',
    text: 'Pick one preset per product and set it once at the root.',
  },
  {
    title: 'Composes with theme.',
    text: 'data-style and data-theme are independent — you get four combinations, all tested.',
  },
  {
    title: 'Controls vs surfaces.',
    text: 'Buttons, segmented controls and menu triggers read --cs-radius-control so they can go capsule; panels and cards read the sm → 2xl ramp.',
  },
];

const nativeNotes = [
  {
    name: 'Select',
    text: 'is a portalled listbox, not a <select>. The native option menu is the one surface CSS cannot reach.',
  },
  {
    name: 'Slider',
    text: 'is a role="slider" track with pointer capture, not a range input — which is what makes ticks and the drag readout possible.',
  },
  {
    name: 'Menu, Dropdown, Sidebar',
    text: 'are measured popovers and navs; nothing uses title, <details> or <dialog>.',
  },
  {
    name: '.cs-scroll',
    text: 'replaces the platform scrollbar in every scrolling panel.',
  },
];

const exportCount = Object.keys(components).length;
</script>

<template>
  <div class="doc-main__inner">
    <header>
      <div class="doc-eyebrow">Resources</div>
      <h1 class="doc-h1">Installation &amp; theming</h1>
      <p class="doc-lede">
        One package, one stylesheet, two themes — for Vue 3 and React. The library has no runtime
        dependencies beyond its framework and ships CSS that is already tokenised.
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
          are already written against <code>@cesium-ds/core</code>, so nothing changes when the name
          goes live.
        </p>
      </div>
      <div style="height: 12px" />
      <CodeBlock lang="bash" :code="installBash" />
      <div style="height: 12px" />
      <CodeBlock lang="bash" :code="installByPath" />
      <div class="prose" style="margin-top: 16px">
        <p>
          Shipping it to a team or a CI runner? Pack the built package once and install the tarball —
          that is the same artefact an npm publish would produce:
        </p>
      </div>
      <div style="height: 10px" />
      <CodeBlock lang="bash" :code="installTarball" />
      <div style="height: 12px" />
      <CodeBlock lang="vue" :code="usageVue" />
      <div class="prose" style="margin-top: 16px">
        <p>
          The stylesheet is a single compiled file. If you prefer to compile from source, import
          <code>@cesium-ds/core/src/styles/index.css</code> from a PostCSS or Vite pipeline instead —
          the <code>src/</code> tree ships in the package, and the <code>exports</code> map opens it
          for exactly this.
        </p>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">Vue conventions</h2>
      <div class="prose">
        <p>
          The same components ship for Vue 3 at <code>@cesium-ds/core/vue</code>. They render the
          same <code>.cs-*</code> markup, so there is no second stylesheet to keep in sync —
          <code>styles.css</code> is the whole of it for both frameworks.
        </p>
        <p>
          Where the framework has its own convention, the Vue build uses it: <code>v-model</code>
          instead of <code>value</code> + <code>onValueChange</code>, <code>v-model:open</code> for
          overlays, and scoped slots in place of render props — <code>Table</code> takes
          <code>#cell-status</code> where React took <code>column.render</code>. A node prop becomes a
          slot: React's <code>iconLeft={&lt;Icon/&gt;}</code> is <code>#icon-left</code> here, so the
          component never has to accept <code>any</code>.
        </p>
      </div>
      <div style="height: 10px" />
      <CodeBlock lang="ts" :code="pluginTs" />
      <div class="prose" style="margin-top: 16px">
        <p>
          That plugin registers all {{ exportCount }} components globally — every one is available as
          <code>&lt;CsButton&gt;</code>, <code>&lt;CsPanel&gt;</code> and so on. Prefer named imports
          in a bundler build: the global plugin defeats tree-shaking.
        </p>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">Fonts</h2>
      <div class="prose">
        <p>
          The system is set in three families — <strong>Newsreader</strong> for display,
          <strong>Instrument Sans</strong> for the interface and <strong>JetBrains Mono</strong> for
          machine data. They are not bundled: the package stays binary-free, and every stack ends in a
          system fallback so the UI never blocks on a font request.
        </p>
        <p>
          The four files this site uses live in <code>docs/public/fonts/</code> and are served at
          <code>/fonts/</code>. Copy them into your own static directory, or load the families from
          Google Fonts. All three are SIL Open Font License 1.1 — the licence texts sit next to the
          binaries.
        </p>
      </div>
      <div style="height: 12px" />
      <CodeBlock lang="css" :code="fontsCss" />
      <div class="prose" style="margin-top: 16px">
        <p>
          Keep <code>font-optical-sizing: auto</code> on. Newsreader carries an <code>opsz 6–72</code>
          axis, so a 44px heading and a 14px label are drawn by different cuts of the same face —
          turning it off is the fastest way to make the type look wrong.
        </p>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">Theming</h2>
      <div class="prose">
        <p>
          Dark is the default and requires no attribute. Light is enabled by setting
          <code>data-theme="light"</code> on <code>&lt;html&gt;</code>. Because every value is a CSS
          custom property, a theme swap is a single attribute change with no re-render.
        </p>
      </div>
      <CodeBlock lang="ts" :code="themeToggle" />
      <div style="height: 12px" />
      <CodeBlock lang="css" :code="themeOverrideCss" />
      <div class="prose" style="margin-top: 16px">
        <ul>
          <li v-for="r in themingRules" :key="r.title">
            <strong>{{ r.title }}</strong> {{ r.text }}
          </li>
        </ul>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">Shape presets</h2>
      <div class="prose">
        <p>
          The system ships two shape languages over the same components.
          <strong>Classic</strong> is the default: small corners, hairline borders, tight shadows —
          the instrument look. <strong>Plus</strong> swaps in continuous, Apple-style corners with
          capsule controls and softer, wider elevation. Only the radius and elevation layer changes;
          type, colour, density and every component API stay identical.
        </p>
      </div>
      <CodeBlock lang="ts" :code="shapeTs" />
      <div style="height: 12px" />
      <CodeBlock lang="css" :code="shapeCss" />
      <div class="prose" style="margin-top: 16px">
        <ul>
          <li v-for="r in shapeRules" :key="r.title">
            <strong>{{ r.title }}</strong> {{ r.text }}
          </li>
        </ul>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">Drawn, not inherited</h2>
      <div class="prose">
        <p>
          Every widget in this system is drawn here. That is not dogma — it is the only way to keep
          one theme across platforms. The browser's own popups, scrollbars and thumbs are rendered by
          the operating system: macOS and Windows each use their own fonts, their own corner radii,
          their own timing, and none of them read a <code>--cs-*</code> variable.
        </p>
        <ul>
          <li v-for="n in nativeNotes" :key="n.name">
            <strong><code>{{ n.name }}</code></strong> {{ n.text }}
          </li>
          <li>
            <strong>One exception, deliberate:</strong> <code>Checkbox</code>, <code>Radio</code> and
            <code>Switch</code> keep a 1px invisible <code>&lt;input&gt;</code> so native form
            submission and screen readers keep working. The input is never painted — the box, the tick
            and the thumb are CSS.
          </li>
        </ul>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">Tokens</h2>
      <div class="prose">
        <p>
          {{ TOKEN_STATS.total }} tokens are compiled from a single JSON file. The bundle is published
          with the package so design tools and codegen can consume the same source of truth.
        </p>
      </div>
      <div class="cs-row" style="gap: 10px; margin-top: 14px">
        <a class="cs-btn cs-btn--secondary" href="./tokens.json" download>
          <span class="cs-btn__icon"><Icon name="download" :size="13" /></span>
          tokens.json
        </a>
        <a class="cs-btn cs-btn--ghost" href="./tokens.css" download>
          <span class="cs-btn__icon"><Icon name="code" :size="13" /></span>
          tokens.css
        </a>
      </div>
      <div class="props-table" style="margin-top: 18px">
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
            <tr v-for="row in tokenGroups" :key="row[0]">
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
              <th style="width: 34%">Path</th>
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
      <h2 class="doc-h2">Support &amp; constraints</h2>
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
          <code>color-mix()</code> is used for a small number of derived borders and tints. In older
          browsers those borders fall back to transparent — layout is unaffected, but upgrade if you
          need exact colour.
        </p>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">Changelog</h2>
      <div class="prose">
        <h3>1.0.0 — Initial release</h3>
        <ul>
          <li>{{ TOKEN_STATS.total }} design tokens across dark and light themes, compiled from JSON.</li>
          <li>
            {{ componentCount }} components in {{ navByCategory.length }} categories, typed and
            dependency-free — the same set for Vue and for React, off one stylesheet.
          </li>
          <li>HUD layer: Compass, ScaleBar, CoordinateReadout, Legend.</li>
          <li>
            AI, chat and science layers: reasoning traces, tool calls, context meters, transcripts,
            and readouts for physics, high-energy physics and biotech.
          </li>
          <li>Documentation site with live examples, prop tables and patterns.</li>
          <li>Agent skill package with token and component references.</li>
        </ul>
      </div>
    </section>
  </div>
</template>
