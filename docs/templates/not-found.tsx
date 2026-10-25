import { Button, Icon } from '@cesium-ds/core';

/**
 * 404 — the system's "signal lost" page. A mono coordinate readout does the
 * apologising; the two actions are the only things that carry weight.
 */
export default function NotFoundTemplate() {
  return (
    <div
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
        padding: '64px 24px',
        background: 'var(--cs-bg-base)',
        color: 'var(--cs-text-primary)',
        fontFamily: 'var(--cs-font-sans)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage:
          'radial-gradient(70% 50% at 50% 40%, color-mix(in srgb, var(--cs-accent) 9%, transparent) 0%, transparent 70%), linear-gradient(to right, var(--cs-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--cs-grid-line) 1px, transparent 1px)',
        backgroundSize: '100% 100%, 40px 40px, 40px 40px',
      }}
    >
      {/* reticle */}
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        style={{ position: 'absolute', width: 320, height: 320, opacity: 0.5, pointerEvents: 'none' }}
      >
        <circle cx="100" cy="100" r="72" fill="none" stroke="var(--cs-accent)" strokeOpacity="0.28" />
        <circle cx="100" cy="100" r="46" fill="none" stroke="var(--cs-accent)" strokeOpacity="0.18" />
        <path d="M100 18v22M100 160v22M18 100h22M160 100h22" stroke="var(--cs-accent)" strokeOpacity="0.5" />
        <circle cx="100" cy="100" r="2.5" fill="var(--cs-accent)" />
      </svg>

      <div style={{ position: 'relative', display: 'grid', justifyItems: 'center' }}>
        <span className="cs-mono cs-t-2xs cs-dimmer" style={{ letterSpacing: '0.22em' }}>
          ERR 404 · NO FIX
        </span>

        <div
          className="cs-mono"
          style={{
            fontSize: 'clamp(72px, 12vw, 120px)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            margin: '18px 0 0',
            color: 'var(--cs-text-primary)',
          }}
        >
          404
        </div>

        <h1
          style={{
            fontFamily: 'var(--cs-font-display)',
            fontWeight: 400,
            fontSize: 'clamp(26px, 3.4vw, 36px)',
            lineHeight: 1.12,
            letterSpacing: 'var(--cs-tracking-display)',
            margin: '18px 0 0',
          }}
        >
          This tile never <em style={{ fontStyle: 'italic', color: 'var(--cs-accent)' }}>resolved.</em>
        </h1>

        <p
          className="cs-t-md"
          style={{ color: 'var(--cs-text-secondary)', margin: '14px 0 0', maxWidth: 420, lineHeight: '22px' }}
        >
          The route you asked for is not in this scene. It may have been renamed, or the link may
          have been copied before the last deploy.
        </p>

        <div className="cs-row" style={{ gap: 10, marginTop: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="primary" iconLeft={<Icon name="chevron-left" size={13} />}>
            Back to the console
          </Button>
          <Button variant="secondary" iconRight={<Icon name="external" size={13} />}>
            Status page
          </Button>
        </div>

        <div
          className="cs-row"
          style={{
            gap: 10,
            marginTop: 34,
            padding: '7px 12px',
            border: '1px solid var(--cs-border-subtle)',
            borderRadius: 'var(--cs-radius-pill)',
            background: 'color-mix(in srgb, var(--cs-bg-surface) 60%, transparent)',
          }}
        >
          <span className="cs-mono cs-t-2xs cs-dimmer">GET</span>
          <span className="cs-mono cs-t-2xs" style={{ color: 'var(--cs-text-secondary)' }}>
            /scenes/north-sea/tileset/18/142031/96184
          </span>
          <span className="cs-mono cs-t-2xs" style={{ color: 'var(--cs-danger)' }}>
            404
          </span>
        </div>
      </div>
    </div>
  );
}
