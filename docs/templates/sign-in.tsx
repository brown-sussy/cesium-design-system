import type { CSSProperties } from 'react';
import { Button, Checkbox, Field, Icon, Input } from '@cesium-ds/core';

const card: CSSProperties = {
  width: '100%',
  maxWidth: 384,
  border: '1px solid var(--cs-border)',
  borderRadius: 'var(--cs-radius-lg)',
  background: 'var(--cs-bg-surface)',
  boxShadow: 'var(--cs-shadow-lg)',
  padding: 28,
};

/**
 * Sign-in page — a single centred card over a gridded void. No split screen,
 * no marketing panel: one job, one column, one primary action.
 */
export default function SignInTemplate() {
  return (
    <div
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 22,
        padding: '56px 24px',
        background: 'var(--cs-bg-base)',
        color: 'var(--cs-text-primary)',
        fontFamily: 'var(--cs-font-sans)',
        backgroundImage:
          'radial-gradient(90% 60% at 50% 0%, color-mix(in srgb, var(--cs-accent) 10%, transparent) 0%, transparent 60%), linear-gradient(to right, var(--cs-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--cs-grid-line) 1px, transparent 1px)',
        backgroundSize: '100% 100%, 32px 32px, 32px 32px',
      }}
    >
      <div style={card}>
        <span className="cs-row" style={{ gap: 9, alignItems: 'center', marginBottom: 26 }}>
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

        <h1
          style={{
            fontFamily: 'var(--cs-font-display)',
            fontWeight: 400,
            fontSize: 28,
            lineHeight: '34px',
            letterSpacing: 'var(--cs-tracking-tight)',
            margin: 0,
          }}
        >
          Sign in
        </h1>
        <p className="cs-t-sm" style={{ color: 'var(--cs-text-secondary)', margin: '8px 0 24px' }}>
          Use the account your workspace administrator issued.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: 'grid', gap: 16 }}
        >
          <Field label="Email" htmlFor="tpl-email">
            <Input
              id="tpl-email"
              type="email"
              autoComplete="username"
              placeholder="you@meridian.systems"
            />
          </Field>

          <Field
            label={
              <span style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span>Password</span>
                <a href="#" style={{ color: 'var(--cs-accent)', textDecoration: 'none' }}>
                  Forgot?
                </a>
              </span>
            }
            htmlFor="tpl-password"
          >
            <Input id="tpl-password" type="password" autoComplete="current-password" placeholder="••••••••••" />
          </Field>

          <Checkbox label="Keep me signed in for 30 days" defaultChecked />

          <Button type="submit" variant="primary" block>
            Continue
          </Button>
        </form>

        <div className="cs-row" style={{ gap: 12, margin: '22px 0' }}>
          <span style={{ flex: 1, height: 1, background: 'var(--cs-border-subtle)' }} />
          <span className="cs-t-2xs cs-dimmer" style={{ textTransform: 'uppercase', letterSpacing: '0.14em' }}>
            or
          </span>
          <span style={{ flex: 1, height: 1, background: 'var(--cs-border-subtle)' }} />
        </div>

        <Button variant="secondary" block iconLeft={<Icon name="command" size={13} />}>
          Continue with SSO
        </Button>

        <p className="cs-t-xs cs-dimmer" style={{ margin: '22px 0 0', textAlign: 'center' }}>
          No account?{' '}
          <a href="#" style={{ color: 'var(--cs-text-secondary)', textDecoration: 'underline' }}>
            Request access
          </a>
        </p>
      </div>

      <p className="cs-mono cs-t-2xs cs-dimmer" style={{ margin: 0, textAlign: 'center' }}>
        SSO ENFORCED · SOC 2 TYPE II · EU-WEST-1
      </p>
    </div>
  );
}
