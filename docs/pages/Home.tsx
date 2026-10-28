import {
  Button,
  Compass,
  CoordinateReadout,
  Icon,
  Kbd,
  ScaleBar,
  StatusDot,
} from '@cesium-ds/core';
import { Globe } from '../components/Globe';
import { CodeBlock } from '../components/DocsUI';
import { TemplateThumb } from '../components/TemplateThumb';
import { componentCount, navEntries } from '../content/nav.generated';
import { templateMeta } from '../templates/meta';
import Homepage from '../templates/homepage';
import { navigate } from '../lib/router';
import { TOKEN_STATS } from '../lib/tokenStats';

/** The teaser renders one template for real; the list beside it is metadata only. */
const TeaserPage = Homepage;
const templateList = templateMeta;

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
    text: '28 / 34 / 40px control heights on a 4px grid, hairline borders, 2–5px radii. Compact, never cramped.',
  },
  {
    title: 'Instrument language',
    text: 'Monospace labels, tabular figures, dotted leaders, uppercase micro-captions. Data reads as a readout.',
  },
  {
    title: 'One accent, earned',
    text: 'Grey carries structure, white carries the action. Steel is left for whatever is interactive or selected.',
  },
  {
    title: 'Agent-ready',
    text: 'Ships with a SKILL.md that teaches an agent the tokens, APIs and anti-patterns, so generated UI stays on-system.',
  },
];

const featured = ['button', 'input', 'table', 'panel', 'badge', 'tabs', 'compass', 'coordinate-readout'];

const principles = [
  ['Precision over decoration', 'A hairline where a shadow would do. A number where an adjective would do.'],
  ['Data over chrome', 'The interface recedes so the scene, the table and the coordinates can lead.'],
  ['Dark first', 'Designed for a darkened operations room, then re-tuned for daylight.'],
  ['Motion as feedback', '120–260ms, mechanical easing. Nothing bounces, nothing lingers.'],
];

/* One ramp from surface to signal, so the band reads as a value scale in
   either theme rather than eight unrelated swatches. */
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
  ['Tokens', String(TOKEN_STATS.total)],
  ['Runtime deps', '0'],
  ['Peer dep', 'React 18'],
];

export function Home() {
  // Curated order, not registry order: actions, forms, data, layout, display,
  // navigation, HUD — so the two columns read left to right.
  const docs = featured
    .map((slug) => navEntries.find((d) => d.slug === slug))
    .filter((d): d is (typeof navEntries)[number] => Boolean(d));

  return (
    <div className="doc-container">
      <section className="hero">
        <div className="hero__text">
          <h1 className="hero__title">
            Interfaces for
            <br />
            planetary scale.
          </h1>
          <p className="hero__lede">
            A design system for maps, globes and the dashboards that watch them. {componentCount}{' '}
            components, {TOKEN_STATS.total} tokens, one stylesheet.
          </p>
          <div className="hero__actions">
            <Button variant="primary" size="lg" onClick={() => navigate('/components')}>
              Browse components
            </Button>
            <button type="button" className="hero__link" onClick={() => navigate('/resources')}>
              Get started
              <Icon name="arrow-right" size={13} />
            </button>
          </div>
          <dl className="hero__specs">
            {specs.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-stage">
          <div className="hero-stage__globe">
            <Globe />
          </div>

          <div className="hud-float hud-float--status">
            <StatusDot tone="success" label="Stream live" pulse />
          </div>

          <div className="hud-float hud-float--compass">
            <Compass heading={28} size={56} />
          </div>

          <div className="hud-float hud-float--coords">
            <CoordinateReadout lat={37.7749} lon={-122.4194} alt={1284.5} />
          </div>

          <div className="hud-float hud-float--scale">
            <ScaleBar distance={500} unit="km" width={104} />
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-head">
          <div>
            <div className="doc-eyebrow">The system</div>
            <h2 className="home-head__title">Six rules, enforced by tokens</h2>
          </div>
          <p className="home-head__note">
            The rules are few. Because they live in tokens rather than in component code, a
            dashboard, a dialog and a HUD overlay stay one product.
          </p>
        </div>
        <div className="rule-list">
          {rules.map((rule, i) => (
            <div className="rule" key={rule.title}>
              <span className="rule__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="rule__title">{rule.title}</span>
              <span className="rule__text">{rule.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-head">
          <div>
            <div className="doc-eyebrow">Foundations</div>
            <h2 className="home-head__title">Grey structure, white action</h2>
          </div>
          <p className="home-head__note">
            Neutral greys carry surfaces, borders and labels. Steel marks what is interactive.
            Signal colours only ever mean state.
          </p>
        </div>
        <div className="swatch-band">
          {swatches.map(([name, value]) => (
            <div className="swatch" key={name}>
              <span className="swatch__chip" style={{ background: value }} />
              <span className="swatch__name">{name}</span>
            </div>
          ))}
        </div>
        <div className="home-more">
          <button type="button" className="home__link" onClick={() => navigate('/foundations/color')}>
            Colour system
            <Icon name="arrow-right" size={12} />
          </button>
        </div>
      </section>

      <section className="home-section">
        <div className="home-head">
          <div>
            <div className="doc-eyebrow">Components</div>
            <h2 className="home-head__title">The index</h2>
          </div>
          <p className="home-head__note">
            Typed, dependency-free, documented with live examples, prop tables and keyboard notes.
          </p>
        </div>
        <div className="index-list">
          {docs.map((doc) => (
            <a
              className="index-row"
              key={doc.slug}
              href={`#/components/${doc.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/components/${doc.slug}`);
              }}
            >
              <span className="index-row__name">{doc.name}</span>
              <span className="index-row__dots" />
              <span className="index-row__cat">{doc.category}</span>
            </a>
          ))}
        </div>
        <div className="home-more">
          <button type="button" className="home__link" onClick={() => navigate('/components')}>
            All {componentCount} components
            <Icon name="arrow-right" size={12} />
          </button>
        </div>
      </section>

      <section className="home-section">
        <div className="home-head">
          <div>
            <div className="doc-eyebrow">Templates</div>
            <h2 className="home-head__title">Start from a page</h2>
          </div>
          <p className="home-head__note">
            Four whole screens built from the system. Each is a single file, rendered live from its
            own source.
          </p>
        </div>
        <div className="tpl-teaser">
          <TemplateThumb className="tpl-teaser__art">
            <TeaserPage />
          </TemplateThumb>
          <div className="tpl-teaser__body">
            <div className="cs-stack" style={{ gap: 0 }}>
              {templateList.map((t) => (
                <a
                  key={t.slug}
                  className="tpl-teaser__row"
                  href={`#/templates/${t.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/templates/${t.slug}`);
                  }}
                >
                  <span className="tpl-teaser__name">{t.name}</span>
                  <span className="tpl-teaser__tag">{t.tagline}</span>
                  <Icon name="arrow-right" size={12} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="split">
          <div>
            <div className="doc-eyebrow">Principles</div>
            <h2 className="home-head__title" style={{ marginTop: 10 }}>
              What we optimise for
            </h2>
            <ol className="principle-list">
              {principles.map(([title, text], i) => (
                <li className="principle" key={title}>
                  <span className="principle__n">{String(i + 1).padStart(2, '0')}</span>
                  <span>
                    <span className="principle__title">{title}</span>
                    <span className="principle__text">{text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="doc-eyebrow">Install</div>
            <h2 className="home-head__title" style={{ marginTop: 10 }}>
              Build it, then install it
            </h2>
            <p className="doc-sub" style={{ marginTop: 8 }}>
              One package, one stylesheet. React 18+ is the only peer dependency. Not on npm yet —
              build it from the repo, then install it by path.
            </p>
            <CodeBlock
              lang="bash"
              code={`git clone https://github.com/brown-sussy/cesium-design-system
cd cesium-design-system && npm i && npm run build:lib

# then, in your app
npm install ../cesium-design-system`}
            />
            <div style={{ height: 10 }} />
            <CodeBlock
              code={`import { Button, Panel, Compass } from '@cesium-ds/core';

export function Deploy() {
  return (
    <Panel title="Mission" accent>
      <Button variant="primary">Deploy</Button>
    </Panel>
  );
}`}
            />
            <div className="cs-row" style={{ gap: 10, marginTop: 14 }}>
              <Kbd>⌘</Kbd>
              <span className="cs-t-sm cs-dimmer">Press</span>
              <Kbd>K</Kbd>
              <span className="cs-t-sm cs-dimmer">to search the whole system.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
