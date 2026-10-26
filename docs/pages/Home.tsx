import {
  Badge,
  Button,
  Compass,
  CoordinateReadout,
  Icon,
  KeyValue,
  Panel,
  PanelBody,
  Progress,
  ScaleBar,
  StatusDot,
  Kbd,
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

const features = [
  {
    icon: 'layers' as const,
    title: 'Token-first',
    text: 'Every colour, space and duration is a CSS custom property compiled from one JSON source. No magic numbers in component code.',
  },
  {
    icon: 'moon' as const,
    title: 'Dark by construction',
    text: 'The default theme is the void behind the globe. Light is a second pass, not an inversion — each value is chosen for its surface.',
  },
  {
    icon: 'ruler' as const,
    title: 'Density with air',
    text: '28 / 34 / 40px control heights on a 4px grid, hairline borders, and 2–3px radii. Compact, never cramped.',
  },
  {
    icon: 'gauge' as const,
    title: 'Instrument language',
    text: 'Monospace labels, tabular figures, dotted leaders and uppercase micro-captions. Data reads like a readout, not prose.',
  },
  {
    icon: 'palette' as const,
    title: 'One accent, earned',
    text: 'Grey carries the structure and a white key carries the action. One steel accent is left for what is interactive or selected.',
  },
  {
    icon: 'sparkles' as const,
    title: 'Agent-ready',
    text: 'Ships with a SKILL.md that teaches an agent the tokens, APIs and anti-patterns, so generated UI stays on-system.',
  },
];

const featured = ['button', 'input', 'table', 'panel', 'compass', 'coordinate-readout', 'badge', 'tabs'];

const principles = [
  ['Precision over decoration', 'A hairline where a shadow would do. A number where an adjective would do.'],
  ['Data over chrome', 'The interface recedes so the scene, the table and the coordinates can lead.'],
  ['Dark first', 'Designed for a darkened operations room, then re-tuned for daylight.'],
  ['Motion as feedback', '120–260ms, mechanical easing. Nothing bounces, nothing lingers.'],
];

export function Home() {
  const docs = navEntries.filter((d) => featured.includes(d.slug));

  return (
    <div className="doc-container">
      <section className="hero">
        <div className="hero__inner">
          <span className="hero__pill">
            <span className="hero__pill-dot" />
            v1.0 · {componentCount} components · 2 themes
          </span>
          <h1 className="hero__title">
            Interfaces for <br />
            <em>planetary scale</em>.
          </h1>
          <p className="hero__lede">
            A design system for geospatial, data-dense products. Built for the dark, tuned for
            precision, and shipped as tokens, React components and an agent skill.
          </p>
          <div className="hero__actions">
            <Button variant="primary" size="lg" iconRight={<Icon name="arrow-right" size={15} />} onClick={() => navigate('/components')}>
              Browse components
            </Button>
            <Button variant="secondary" size="lg" iconLeft={<Icon name="code" size={15} />} onClick={() => navigate('/resources')}>
              Get started
            </Button>
          </div>
          <div className="hero__meta">
            <span>
              <Icon name="box" size={12} /> {componentCount} components
            </span>
            <span>
              <Icon name="type" size={12} /> {TOKEN_STATS.total} tokens
            </span>
            <span>
              <Icon name="zap" size={12} /> zero runtime CSS
            </span>
            <span>
              <Icon name="terminal" size={12} /> TypeScript
            </span>
          </div>
        </div>

        <div className="hero-stage">
          <span className="hero-stage__corner hero-stage__corner--tl" />
          <span className="hero-stage__corner hero-stage__corner--tr" />
          <span className="hero-stage__corner hero-stage__corner--bl" />
          <span className="hero-stage__corner hero-stage__corner--br" />
          <span className="hero-stage__label">orbital ops · scene 03 · wgs 84</span>

          <div className="hero-stage__globe">
            <Globe />
          </div>

          <div className="hud-float hud-float--status">
            <div className="cs-row" style={{ gap: 12 }}>
              <StatusDot tone="success" label="Stream live" pulse />
              <span className="cs-mono" style={{ fontSize: 10, color: 'var(--cs-text-tertiary)' }}>
                60 FPS
              </span>
            </div>
          </div>

          <div className="hud-float hud-float--compass">
            <Compass heading={28} size={64} />
          </div>

          <div className="hud-float hud-float--panel">
            <Panel title="Scene budget" accent>
              <PanelBody>
                <div className="cs-stack" style={{ gap: 9 }}>
                  <Progress label="Primitives" value={82} showValue thin />
                  <Progress label="Textures" value={54} showValue thin />
                  <Progress label="Tiles" value={37} showValue thin />
                </div>
              </PanelBody>
            </Panel>
          </div>

          <div className="hud-float hud-float--coords">
            <CoordinateReadout lat={37.7749} lon={-122.4194} alt={1284.5} />
          </div>

          <div className="hud-float hud-float--scale">
            <ScaleBar distance={500} unit="km" width={112} />
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-head">
          <div>
            <div className="doc-eyebrow">The system</div>
            <h2 className="home-head__title">Six decisions, applied everywhere</h2>
            <p className="home-head__desc">
              The rules are few and they are enforced by tokens. That is what keeps a dashboard, a
              dialog and a HUD overlay looking like one product.
            </p>
          </div>
          <Badge tone="accent">MIT licensed</Badge>
        </div>
        <div className="feature-grid">
          {features.map((f) => (
            <div className="feature" key={f.title}>
              <span className="feature__icon">
                <Icon name={f.icon} size={15} />
              </span>
              <span className="feature__title">{f.title}</span>
              <span className="feature__text">{f.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-head">
          <div>
            <div className="doc-eyebrow">Foundations</div>
            <h2 className="home-head__title">Grey structure, white action</h2>
            <p className="home-head__desc">
              Neutral greys carry every surface, border and label. A steel accent carries
              interaction, and signal colours are reserved for state — success, warning, danger and
              info.
            </p>
          </div>
          <Button variant="ghost" size="sm" iconRight={<Icon name="arrow-right" size={12} />} onClick={() => navigate('/foundations/color')}>
            Colour system
          </Button>
        </div>
        <div className="token-strip">
          {[
            ['--cs-bg-base', 'var(--cs-bg-base)'],
            ['--cs-bg-raised', 'var(--cs-bg-raised)'],
            ['--cs-border-strong', 'var(--cs-border-strong)'],
            ['--cs-text-tertiary', 'var(--cs-text-tertiary)'],
            ['--cs-text-primary', 'var(--cs-text-primary)'],
            ['--cs-accent', 'var(--cs-accent)'],
            ['--cs-success', 'var(--cs-success)'],
            ['--cs-warning', 'var(--cs-warning)'],
          ].map(([name, value]) => (
            <div className="token-chip" key={name}>
              <span className="token-chip__swatch" style={{ background: value }} />
              <span className="token-chip__name">{name.replace('--cs-', '')}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-head">
          <div>
            <div className="doc-eyebrow">Components</div>
            <h2 className="home-head__title">{componentCount} components, one grammar</h2>
            <p className="home-head__desc">
              Typed, dependency-free, and documented with live examples, prop tables and
              accessibility notes.
            </p>
          </div>
          <Button variant="secondary" size="sm" iconRight={<Icon name="arrow-right" size={12} />} onClick={() => navigate('/components')}>
            View all
          </Button>
        </div>
        <div className="comp-grid">
          {docs.map((doc) => (
            <a
              className="comp-card"
              key={doc.slug}
              href={`#/components/${doc.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/components/${doc.slug}`);
              }}
            >
              <span className="comp-card__name">{doc.name}</span>
              <span className="comp-card__desc">{doc.summary}</span>
              <span className="comp-card__cat">{doc.category}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-head">
          <div>
            <div className="doc-eyebrow">Templates</div>
            <h2 className="home-head__title">Start from a page, not a blank file</h2>
            <p className="home-head__desc">
              Whole screens assembled from the system — a homepage, a sign-in, a settings shell and
              an error page. Each is one file, rendered live from its own source.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            iconRight={<Icon name="arrow-right" size={12} />}
            onClick={() => navigate('/templates')}
          >
            Browse templates
          </Button>
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
            <div className="cs-stack" style={{ gap: 18, marginTop: 20 }}>
              {principles.map(([title, text]) => (
                <div className="quote" key={title}>
                  <div style={{ color: 'var(--cs-text-primary)', fontWeight: 600, fontSize: 14 }}>{title}</div>
                  <div style={{ marginTop: 3, fontSize: 13, color: 'var(--cs-text-tertiary)', lineHeight: 1.55 }}>
                    {text}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="home-head__title" style={{ fontSize: 15 }}>
              Install
            </div>
            <p className="doc-sub" style={{ marginTop: 6 }}>
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
