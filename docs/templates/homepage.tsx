import type { CSSProperties } from 'react';
import { Badge, Button, Icon, StatusDot, type IconName } from '@cesium-ds/core';

const wrap: CSSProperties = {
  width: '100%',
  maxWidth: 1120,
  margin: '0 auto',
  padding: '0 28px',
};

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

const metrics: Array<[string, string]> = [
  ['1.2 B', 'tiles served / day'],
  ['38 ms', 'p50 frame time'],
  ['99.98%', 'streaming uptime'],
  ['24', 'regions'],
];

const footerCols: Array<{ title: string; items: string[] }> = [
  { title: 'Product', items: ['Tilesets', 'Scene API', 'Console', 'Changelog'] },
  { title: 'Developers', items: ['Documentation', 'Reference', 'Status', 'Examples'] },
  { title: 'Company', items: ['About', 'Careers', 'Security', 'Contact'] },
];

function Wordmark() {
  return (
    <span className="cs-row" style={{ gap: 9, alignItems: 'center' }}>
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: '50%',
          border: '1px solid var(--cs-accent)',
          display: 'grid',
          placeItems: 'center',
          color: 'var(--cs-accent)',
        }}
      >
        <Icon name="globe" size={13} />
      </span>
      <span style={{ fontSize: 15, letterSpacing: '-0.014em', fontWeight: 500 }}>Meridian</span>
    </span>
  );
}

function SceneCard() {
  return (
    <div
      style={{
        borderRadius: 'var(--cs-radius-lg)',
        border: '1px solid var(--cs-border)',
        background: 'var(--cs-bg-base)',
        overflow: 'hidden',
        boxShadow: 'var(--cs-shadow-lg)',
      }}
    >
      <div
        style={{
          position: 'relative',
          height: 296,
          backgroundImage:
            'radial-gradient(120% 90% at 50% 118%, color-mix(in srgb, var(--cs-accent) 16%, transparent) 0%, transparent 58%), linear-gradient(to right, var(--cs-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--cs-grid-line) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 28px 28px, 28px 28px',
        }}
      >
        <span className="cs-mono cs-t-2xs cs-dimmer" style={{ position: 'absolute', top: 12, left: 14 }}>
          SCENE 03 · ORBITAL
        </span>
        <span className="cs-mono cs-t-2xs cs-dimmer" style={{ position: 'absolute', top: 12, right: 14 }}>
          WGS 84
        </span>
        <span
          className="cs-mono cs-t-2xs"
          style={{ position: 'absolute', bottom: 12, left: 14, color: 'var(--cs-text-secondary)' }}
        >
          37.7749° N · 122.4194° W
        </span>
        <span className="cs-mono cs-t-2xs cs-dimmer" style={{ position: 'absolute', bottom: 12, right: 14 }}>
          1:2 400 000
        </span>

        {/* the horizon */}
        <svg
          viewBox="0 0 400 240"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          aria-hidden="true"
        >
          <ellipse cx="200" cy="268" rx="210" ry="150" fill="none" stroke="var(--cs-accent)" strokeOpacity="0.5" />
          <ellipse cx="200" cy="268" rx="210" ry="60" fill="none" stroke="var(--cs-accent)" strokeOpacity="0.22" />
          <ellipse cx="200" cy="268" rx="90" ry="150" fill="none" stroke="var(--cs-accent)" strokeOpacity="0.18" />
          <circle cx="252" cy="150" r="3" fill="var(--cs-accent)" />
        </svg>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '10px 12px',
          borderTop: '1px solid var(--cs-border-subtle)',
          background: 'var(--cs-bg-surface)',
        }}
      >
        <StatusDot tone="success" label="streaming" pulse />
        <span className="cs-row" style={{ gap: 12 }}>
          <span className="cs-mono cs-t-2xs cs-dimmer">60 FPS</span>
          <span className="cs-mono cs-t-2xs cs-dimmer">18 LAYERS</span>
        </span>
      </div>
    </div>
  );
}

/**
 * Marketing homepage — nav, split hero with a live-looking scene card, a
 * three-up feature row, a metric strip, a closing call to action and a footer.
 *
 * Responsive without media queries: every row is a grid with `auto-fit` and a
 * minimum column width, so it reflows on its own at any container size.
 */
export default function HomepageTemplate() {
  return (
    <div
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--cs-bg-base)',
        color: 'var(--cs-text-primary)',
        fontFamily: 'var(--cs-font-sans)',
      }}
    >
      <header style={{ borderBottom: '1px solid var(--cs-border-subtle)' }}>
        <div
          style={{
            ...wrap,
            minHeight: 64,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            flexWrap: 'wrap',
            paddingTop: 12,
            paddingBottom: 12,
          }}
        >
          <Wordmark />
          <nav className="cs-row" style={{ gap: 22, flex: '1 1 auto', flexWrap: 'wrap' }} aria-label="Primary">
            {links.map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  fontSize: 13,
                  color: 'var(--cs-text-secondary)',
                  textDecoration: 'none',
                }}
              >
                {l}
              </a>
            ))}
          </nav>
          <div className="cs-row" style={{ gap: 8, marginLeft: 'auto' }}>
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
            <Button variant="primary" size="sm">
              Start free
            </Button>
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        {/* hero */}
        <section style={{ ...wrap, paddingTop: 84, paddingBottom: 76 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 56,
              alignItems: 'center',
            }}
          >
            <div>
              <Badge tone="accent" dot>
                v2.4 — vector tiles in beta
              </Badge>
              <h1
                style={{
                  fontFamily: 'var(--cs-font-display)',
                  fontWeight: 400,
                  fontSize: 'clamp(40px, 5.4vw, 62px)',
                  lineHeight: 1.02,
                  letterSpacing: 'var(--cs-tracking-display)',
                  margin: '22px 0 0',
                }}
              >
                The planet,
                <br />
                <em style={{ fontStyle: 'italic', color: 'var(--cs-accent)' }}>streaming.</em>
              </h1>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: '26px',
                  color: 'var(--cs-text-secondary)',
                  margin: '20px 0 0',
                  maxWidth: 440,
                }}
              >
                Meridian serves terrain, imagery and 3D Tiles to any client at sixty frames a second —
                with a budget you can actually predict.
              </p>
              <div className="cs-row" style={{ gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
                <Button variant="primary" iconRight={<Icon name="arrow-right" size={13} />}>
                  Start free
                </Button>
                <Button variant="secondary" iconLeft={<Icon name="play" size={12} />}>
                  Watch the demo
                </Button>
              </div>
              <p className="cs-t-xs cs-dimmer" style={{ margin: '18px 0 0' }}>
                No card. 50 GB of streaming included.
              </p>
            </div>

            <SceneCard />
          </div>
        </section>

        {/* metrics — 1px gaps act as the dividers, so any column count works */}
        <section style={{ borderTop: '1px solid var(--cs-border-subtle)', borderBottom: '1px solid var(--cs-border-subtle)' }}>
          <div style={wrap}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: 1,
                background: 'var(--cs-border-subtle)',
              }}
            >
              {metrics.map(([value, label]) => (
                <div key={label} style={{ padding: '22px 20px', background: 'var(--cs-bg-base)' }}>
                  <div className="cs-mono" style={{ fontSize: 22, letterSpacing: '-0.02em' }}>
                    {value}
                  </div>
                  <div className="cs-t-2xs cs-dimmer" style={{ textTransform: 'uppercase', letterSpacing: '0.14em', marginTop: 6 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* features */}
        <section style={{ ...wrap, padding: '76px 28px' }}>
          <h2
            style={{
              fontFamily: 'var(--cs-font-display)',
              fontWeight: 400,
              fontSize: 30,
              lineHeight: '38px',
              letterSpacing: 'var(--cs-tracking-tight)',
              margin: 0,
              maxWidth: 560,
            }}
          >
            Built for scenes that cannot stutter.
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 18,
              marginTop: 36,
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  border: '1px solid var(--cs-border-subtle)',
                  borderRadius: 'var(--cs-radius-lg)',
                  padding: 20,
                  background: 'var(--cs-bg-surface)',
                }}
              >
                <span
                  style={{
                    display: 'grid',
                    placeItems: 'center',
                    width: 30,
                    height: 30,
                    borderRadius: 'var(--cs-radius-md)',
                    border: '1px solid var(--cs-border)',
                    color: 'var(--cs-text-secondary)',
                  }}
                >
                  <Icon name={f.icon} size={15} />
                </span>
                <h3 style={{ fontSize: 14, fontWeight: 500, margin: '16px 0 6px' }}>{f.title}</h3>
                <p className="cs-t-sm" style={{ color: 'var(--cs-text-secondary)', margin: 0, lineHeight: '19px' }}>
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* cta */}
        <section style={{ ...wrap, paddingBottom: 84 }}>
          <div
            style={{
              border: '1px solid var(--cs-border)',
              borderRadius: 'var(--cs-radius-lg)',
              background: 'var(--cs-bg-surface)',
              padding: '28px 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 22,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h2 style={{ fontFamily: 'var(--cs-font-display)', fontWeight: 400, fontSize: 24, margin: 0 }}>
                Point it at a scene. See it in a minute.
              </h2>
              <p className="cs-t-sm" style={{ color: 'var(--cs-text-secondary)', margin: '6px 0 0' }}>
                Free tier, no card, cancel whenever.
              </p>
            </div>
            <div className="cs-row" style={{ gap: 10 }}>
              <Button variant="secondary">Read the docs</Button>
              <Button variant="primary" iconRight={<Icon name="arrow-right" size={13} />}>
                Start free
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid var(--cs-border-subtle)' }}>
        <div style={{ ...wrap, padding: '40px 28px 32px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 24,
            }}
          >
            <div>
              <Wordmark />
              <p className="cs-t-xs cs-dimmer" style={{ margin: '12px 0 0', maxWidth: 200, lineHeight: '17px' }}>
                Streaming infrastructure for planetary-scale data.
              </p>
            </div>
            {footerCols.map((col) => (
              <div key={col.title}>
                <div className="cs-t-2xs cs-dimmer" style={{ textTransform: 'uppercase', letterSpacing: '0.14em' }}>
                  {col.title}
                </div>
                <ul style={{ listStyle: 'none', margin: '12px 0 0', padding: 0, display: 'grid', gap: 8 }}>
                  {col.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="cs-t-sm"
                        style={{ color: 'var(--cs-text-secondary)', textDecoration: 'none' }}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div
            className="cs-t-2xs cs-dimmer"
            style={{
              marginTop: 36,
              paddingTop: 18,
              borderTop: '1px solid var(--cs-border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <span>© 2026 Meridian Systems</span>
            <span className="cs-mono">ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
