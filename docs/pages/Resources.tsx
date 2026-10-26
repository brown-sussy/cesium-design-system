import { Badge, Button, Divider, Icon, StatusDot } from '@cesium-ds/core';
import { CodeBlock, PageHead, Section } from '../components/DocsUI';
import { componentCount } from '../content/nav.generated';
import { TOKEN_STATS } from '../lib/tokenStats';

export function Resources() {
  return (
    <div className="doc-main__inner">
      <PageHead
        eyebrow="Resources"
        title="Installation & theming"
        lede="One package, one stylesheet, two themes. The library has no runtime dependencies beyond React and ships CSS that is already tokenised."
        meta={
          <>
            <Badge tone="accent">v1.0.0</Badge>
            <Badge>React ≥ 18</Badge>
            <Badge>MIT</Badge>
          </>
        }
      />

      <Section id="install" title="Install">
        <div className="prose">
          <p>
            The package is <strong>not on npm yet</strong>. Until it is, build it from this repository
            and install it by path — one setup in the repo, one command in your app. The imports below
            are already written against <code>@cesium-ds/core</code>, so nothing changes when the name
            goes live.
          </p>
        </div>
        <div style={{ height: 12 }} />
        <CodeBlock
          lang="bash"
          code={`git clone https://github.com/brown-sussy/cesium-design-system.git
cd cesium-design-system
npm install
npm run build:lib        # writes dist/ — required before another project can install it`}
        />
        <div style={{ height: 12 }} />
        <CodeBlock
          lang="bash"
          code={`# in your app
npm install ../cesium-design-system
# or
pnpm add ../cesium-design-system
# or
yarn add file:../cesium-design-system`}
        />
        <div className="prose" style={{ marginTop: 16 }}>
          <p>
            Shipping it to a team or a CI runner? Pack the built package once and install the tarball —
            that is the same artefact an npm publish would produce:
          </p>
        </div>
        <div style={{ height: 10 }} />
        <CodeBlock
          lang="bash"
          code={`npm pack                              # in the repo → cesium-ds-core-1.0.0.tgz
npm install ./cesium-ds-core-1.0.0.tgz  # in your app`}
        />
        <div style={{ height: 12 }} />
        <CodeBlock
          lang="tsx"
          code={`// app entry — import the stylesheet once
import '@cesium-ds/core/styles.css';

import { Button, Panel, Compass } from '@cesium-ds/core';

export function App() {
  return (
    <Panel title="Mission" accent>
      <Button variant="primary">Deploy</Button>
      <Compass heading={28} />
    </Panel>
  );
}`}
        />
        <div className="prose" style={{ marginTop: 16 }}>
          <p>
            The stylesheet is a single compiled file. If you prefer to compile from source, import{' '}
            <code>@cesium-ds/core/src/styles/index.css</code> from a PostCSS or Vite pipeline instead —
            the <code>src/</code> tree ships in the package for exactly this.
          </p>
        </div>
      </Section>

      <Section id="fonts" title="Fonts">
        <div className="prose">
          <p>
            The system is set in three families — <strong>Newsreader</strong> for display,{' '}
            <strong>Instrument Sans</strong> for the interface and <strong>JetBrains Mono</strong> for
            machine data. They are not bundled: the package stays binary-free, and every stack ends in
            a system fallback so the UI never blocks on a font request.
          </p>
          <p>
            The four files this site uses live in <code>docs/public/fonts/</code> and are served at{' '}
            <code>/fonts/</code>. Copy them into your own static directory, or load the families from
            Google Fonts. All three are SIL Open Font License 1.1 — the licence texts sit next to the
            binaries.
          </p>
        </div>
        <div style={{ height: 12 }} />
        <CodeBlock
          lang="css"
          code={`@font-face {
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
}`}
        />
        <div className="prose" style={{ marginTop: 16 }}>
          <p>
            Keep <code>font-optical-sizing: auto</code> on. Newsreader carries an <code>opsz 6–72</code>{' '}
            axis, so a 44px heading and a 14px label are drawn by different cuts of the same face —
            turning it off is the fastest way to make the type look wrong.
          </p>
        </div>
      </Section>

      <Section id="theming" title="Theming">
        <div className="prose">
          <p>
            Dark is the default and requires no attribute. Light is enabled by setting{' '}
            <code>data-theme="light"</code> on <code>&lt;html&gt;</code>. Because every value is a CSS
            custom property, a theme swap is a single attribute change with no re-render.
          </p>
        </div>
        <CodeBlock
          lang="tsx"
          code={`// toggle at runtime
document.documentElement.dataset.theme = 'light';

// persist
localStorage.setItem('cesium-theme', 'light');`}
        />
        <div style={{ height: 12 }} />
        <CodeBlock
          lang="css"
          code={`/* override a token — scope it, never edit the compiled file */
.brand-scope {
  --cs-accent: #f2b33d;
  --cs-accent-hover: #ffc964;
  --cs-accent-soft: rgba(242, 179, 61, 0.12);
  --cs-accent-line: rgba(242, 179, 61, 0.38);
  --cs-accent-contrast: #1a1204;
}`}
        />
        <div className="prose" style={{ marginTop: 16 }}>
          <ul>
            <li>
              <strong>Override semantics, not primitives.</strong> Change <code>--cs-accent</code> and
              everything interactive follows; do not patch component CSS. Primary buttons read{' '}
              <code>--cs-solid</code>, not the accent — they stay neutral until you override that
              family too.
            </li>
            <li>
              <strong>Keep the pair.</strong> If you change the accent, change its hover, soft, line and
              contrast companions — otherwise focus rings and tinted surfaces drift.
            </li>
            <li>
              <strong>Both themes or neither.</strong> If you ship a light mode, verify every state in
              both; the light accent is deliberately darker for contrast.
            </li>
          </ul>
        </div>
      </Section>

      <Section id="shape" title="Shape presets">
        <div className="prose">
          <p>
            The system ships two shape languages over the same components. <strong>Classic</strong> is
            the default: 2–16px corners, hairline borders, tight shadows — the instrument look.{' '}
            <strong>Plus</strong> swaps in continuous, Apple-style corners with capsule controls and
            softer, wider elevation. Only the radius and elevation layer changes; type, colour,
            density and every component API stay identical.
          </p>
        </div>
        <CodeBlock
          lang="tsx"
          code={`// one attribute at the root, no re-render, no rebuild
document.documentElement.dataset.style = 'plus';   // or delete it for classic

// persist alongside the theme
localStorage.setItem('cesium-style', 'plus');`}
        />
        <div style={{ height: 12 }} />
        <CodeBlock
          lang="css"
          code={`/* classic */  --cs-radius-md: 5px;   --cs-radius-control: 5px;
/* plus    */  --cs-radius-md: 11px;  --cs-radius-control: 999px;  /* capsule */`}
        />
        <div className="prose" style={{ marginTop: 16 }}>
          <ul>
            <li>
              <strong>Never mix.</strong> Pick one preset per product and set it once at the root.
            </li>
            <li>
              <strong>Composes with theme.</strong> <code>data-style</code> and <code>data-theme</code>{' '}
              are independent — you get four combinations, all tested.
            </li>
            <li>
              <strong>Controls vs surfaces.</strong> Buttons, segmented controls and menu triggers read{' '}
              <code>--cs-radius-control</code> so they can go capsule; panels and cards read the{' '}
              <code>sm → 2xl</code> ramp.
            </li>
          </ul>
        </div>
      </Section>

      <Section id="native" title="Drawn, not inherited">
        <div className="prose">
          <p>
            Every widget in this system is drawn here. That is not dogma — it is the only way to
            keep one theme across platforms. The browser's own popups, scrollbars and thumbs are
            rendered by the operating system: macOS and Windows each use their own fonts, their own
            corner radii, their own timing, and none of them read a <code>--cs-*</code> variable.
          </p>
        </div>
        <div className="prose" style={{ marginTop: 12 }}>
          <ul>
            <li>
              <strong>
                <code>Select</code>
              </strong>{' '}
              is a portalled listbox, not a <code>&lt;select&gt;</code>. The native option menu is
              the one surface CSS cannot reach.
            </li>
            <li>
              <strong>
                <code>Slider</code>
              </strong>{' '}
              is a <code>role="slider"</code> track with pointer capture, not a range input — which
              is what makes ticks and the drag readout possible.
            </li>
            <li>
              <strong>
                <code>Menu</code>, <code>Dropdown</code>, <code>Sidebar</code>
              </strong>{' '}
              are measured popovers and navs; nothing uses <code>title</code>,{' '}
              <code>&lt;details&gt;</code> or <code>&lt;dialog&gt;</code>.
            </li>
            <li>
              <strong>
                <code>.cs-scroll</code>
              </strong>{' '}
              replaces the platform scrollbar in every scrolling panel.
            </li>
            <li>
              <strong>One exception, deliberate:</strong> <code>Checkbox</code>, <code>Radio</code>{' '}
              and <code>Switch</code> keep a 1px invisible <code>&lt;input&gt;</code> so native form
              submission and screen readers keep working. The input is never painted — the box, the
              tick and the thumb are CSS.
            </li>
          </ul>
        </div>
      </Section>

      <Section id="tokens" title="Tokens">
        <div className="prose">
          <p>
            {TOKEN_STATS.total} tokens are compiled from a single JSON file. The bundle is published
            with the package so design tools and codegen can consume the same source of truth.
          </p>
        </div>
        <div className="cs-row" style={{ gap: 10, marginTop: 14 }}>
          <a className="cs-btn cs-btn--secondary" href="./tokens.json" download>
            <span className="cs-btn__icon">
              <Icon name="download" size={13} />
            </span>
            tokens.json
          </a>
          <a className="cs-btn cs-btn--ghost" href="./tokens.css" download>
            <span className="cs-btn__icon">
              <Icon name="code" size={13} />
            </span>
            tokens.css
          </a>
        </div>
        <div className="props-table" style={{ marginTop: 18 }}>
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
              {[
                ['Colour (themed)', '--cs-', TOKEN_STATS.groups.color, '--cs-text-secondary'],
                ['Typography', '--cs-fs / lh / fw / tracking', TOKEN_STATS.groups.typography, '--cs-fs-md'],
                ['Space & radius', '--cs-space / radius', TOKEN_STATS.groups.spaceRadius, '--cs-space-16'],
                ['Motion', '--cs-dur / ease', TOKEN_STATS.groups.motion, '--cs-dur-base'],
                ['Layers & layout', '--cs-z / control / header', TOKEN_STATS.groups.layout, '--cs-header-h'],
                ['Elevation', '--cs-shadow', TOKEN_STATS.groups.elevation, '--cs-shadow-md'],
                ['Primitives', '--cs-atmos / slate / signal', TOKEN_STATS.groups.primitives, '--cs-atmos-400'],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i} className={i === 3 ? 'props-table__type' : undefined}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="package" title="Package contents">
        <div className="props-table">
          <table>
            <thead>
              <tr>
                <th style={{ width: '34%' }}>Path</th>
                <th>Contents</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['dist/index.js', 'ES module build, tree-shakeable'],
                ['dist/index.cjs', 'CommonJS build'],
                ['dist/index.d.ts', 'Type declarations for every export'],
                ['dist/cesium-ds.css', 'Compiled tokens, base layer and all component styles'],
                ['dist/tokens.json', 'Token bundle for design tools'],
                ['src/', 'Uncompiled TypeScript sources, for deep imports and theming'],
              ].map(([path, desc]) => (
                <tr key={path}>
                  <td className="props-table__name">{path}</td>
                  <td>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="support" title="Support & constraints">
        <div className="cs-stack" style={{ gap: 12, maxWidth: 560 }}>
          <div className="cs-row" style={{ gap: 10 }}>
            <StatusDot tone="success" label="Chrome / Edge 111+" />
          </div>
          <div className="cs-row" style={{ gap: 10 }}>
            <StatusDot tone="success" label="Safari 16.4+" />
          </div>
          <div className="cs-row" style={{ gap: 10 }}>
            <StatusDot tone="success" label="Firefox 113+" />
          </div>
          <Divider />
          <p className="cs-t-sm cs-dimmer" style={{ lineHeight: 1.6 }}>
            <code>color-mix()</code> is used for a small number of derived borders and tints. In older
            browsers those borders fall back to transparent — layout is unaffected, but upgrade if you
            need exact colour.
          </p>
        </div>
      </Section>

      <Section id="changelog" title="Changelog">
        <div className="prose">
          <h3>1.0.0 — Initial release</h3>
          <ul>
            <li>{TOKEN_STATS.total} design tokens across dark and light themes, compiled from JSON.</li>
            <li>{componentCount} React components in 8 categories, typed and dependency-free.</li>
            <li>HUD layer: Compass, ScaleBar, CoordinateReadout, Legend.</li>
            <li>Documentation site with live examples, prop tables and patterns.</li>
            <li>Agent skill package with token and component references.</li>
          </ul>
        </div>
      </Section>
    </div>
  );
}
