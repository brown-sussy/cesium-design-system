import { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Field,
  Icon,
  Input,
  Panel,
  PanelBody,
  Select,
  Sidebar,
  Switch,
  Tabs,
  type SidebarSection,
} from '@cesium-ds/core';

const sections: SidebarSection[] = [
  {
    id: 'account',
    title: 'Account',
    items: [
      { id: 'profile', label: 'Profile', icon: 'sliders', active: true },
      { id: 'security', label: 'Security', icon: 'crosshair' },
      { id: 'sessions', label: 'Sessions', icon: 'activity', badge: 2 },
    ],
  },
  {
    id: 'workspace',
    title: 'Workspace',
    items: [
      { id: 'members', label: 'Members', icon: 'layers', badge: 18 },
      { id: 'roles', label: 'Roles', icon: 'grid' },
      { id: 'domains', label: 'Domains', icon: 'globe' },
    ],
  },
  {
    id: 'developer',
    title: 'Developer',
    items: [
      { id: 'keys', label: 'API keys', icon: 'command' },
      { id: 'webhooks', label: 'Webhooks', icon: 'zap' },
    ],
  },
];

const timezones = [
  { value: 'utc', label: 'UTC — Coordinated Universal Time' },
  { value: 'lisbon', label: 'Europe/Lisbon' },
  { value: 'new-york', label: 'America/New_York' },
  { value: 'tokyo', label: 'Asia/Tokyo' },
];

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'danger', label: 'Danger zone' },
];

function Row({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
        alignItems: 'center',
        padding: '14px 0',
        borderTop: '1px solid var(--cs-border-subtle)',
      }}
    >
      <div>
        <div className="cs-t-base">{title}</div>
        <div className="cs-t-xs cs-dimmer" style={{ marginTop: 2 }}>
          {hint}
        </div>
      </div>
      <div style={{ justifySelf: 'start' }}>{children}</div>
    </div>
  );
}

/**
 * Settings page — the system's app shell: a 252px sidebar that folds to a 56px
 * rail under 900px, and a single column of panels that never exceeds a readable
 * measure. One save action, pinned to the header.
 */
export default function SettingsTemplate() {
  const [tab, setTab] = useState('profile');
  const [timezone, setTimezone] = useState('utc');
  const [rail, setRail] = useState(false);

  // Fold the sidebar to a rail when the window gets narrow. A template has no
  // build step of its own, so the breakpoint lives in one matchMedia here.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    const sync = () => setRail(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <div
      style={{
        // `height`, not `min-height`: the sidebar sizes itself from its parent,
        // so the shell needs a definite height for the rail to reach the floor.
        height: '100%',
        minHeight: 0,
        display: 'flex',
        background: 'var(--cs-bg-canvas)',
        color: 'var(--cs-text-primary)',
        fontFamily: 'var(--cs-font-sans)',
      }}
    >
      <Sidebar
        label="Settings"
        sections={sections}
        collapsed={rail}
        header={
          rail ? (
            <div style={{ display: 'grid', placeItems: 'center', padding: '14px 0' }}>
              <Avatar name="Ada Okonjo" size="sm" accent />
            </div>
          ) : (
            <div className="cs-row" style={{ gap: 9, alignItems: 'center', padding: '14px 12px' }}>
              <Avatar name="Ada Okonjo" size="sm" accent />
              <span style={{ minWidth: 0 }}>
                <span className="cs-t-sm" style={{ display: 'block' }}>
                  Ada Okonjo
                </span>
                <span className="cs-t-2xs cs-dimmer">Owner</span>
              </span>
            </div>
          )
        }
        footer={
          <div style={{ padding: rail ? '10px 0' : '10px 12px', textAlign: 'center' }}>
            <span className="cs-mono cs-t-2xs cs-dimmer">{rail ? '2.4' : 'v2.4.1'}</span>
          </div>
        }
      />

      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
            padding: '0 24px',
            height: 56,
            borderBottom: '1px solid var(--cs-border-subtle)',
            background: 'var(--cs-bg-base)',
          }}
        >
          <div style={{ flex: 1, minWidth: 160 }}>
            <div className="cs-eyebrow">Settings</div>
          </div>
          <div className="cs-row" style={{ gap: 8 }}>
            <Button variant="ghost" size="sm">
              Discard
            </Button>
            <Button variant="primary" size="sm">
              Save changes
            </Button>
          </div>
        </header>

        <div style={{ padding: '26px 24px 40px', maxWidth: 760 }}>
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
            Profile
          </h1>
          <p className="cs-t-sm" style={{ color: 'var(--cs-text-secondary)', margin: '8px 0 22px' }}>
            How you appear to the rest of the workspace, and what this console does by default.
          </p>

          <Tabs items={tabs} value={tab} onChange={setTab} aria-label="Profile sections" />

          <div style={{ marginTop: 22, display: 'grid', gap: 14 }}>
            {tab === 'profile' && (
              <>
                <Panel title="Identity">
                  <PanelBody>
                    <div className="cs-row" style={{ gap: 14, marginBottom: 18, flexWrap: 'wrap' }}>
                      <Avatar name="Ada Okonjo" size="lg" accent />
                      <div style={{ flex: 1, minWidth: 180 }}>
                        <div className="cs-t-base">Ada Okonjo</div>
                        <div className="cs-t-xs cs-dimmer">ada@meridian.systems</div>
                      </div>
                      <Button variant="secondary" size="sm">
                        Change photo
                      </Button>
                    </div>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: 14,
                      }}
                    >
                      <Field label="Full name" htmlFor="s-name">
                        <Input id="s-name" defaultValue="Ada Okonjo" />
                      </Field>
                      <Field label="Email" htmlFor="s-email" hint="Changing this sends a verification link.">
                        <Input id="s-email" defaultValue="ada@meridian.systems" />
                      </Field>
                    </div>
                  </PanelBody>
                </Panel>

                <Panel title="Locale">
                  <PanelBody>
                    <Field label="Time zone" htmlFor="s-tz" hint="Timestamps in the console use this zone.">
                      <Select
                        id="s-tz"
                        options={timezones}
                        value={timezone}
                        onValueChange={setTimezone}
                        label="Time zone"
                      />
                    </Field>
                  </PanelBody>
                </Panel>
              </>
            )}

            {tab === 'preferences' && (
              <Panel title="Notifications">
                <PanelBody>
                  <Row title="Scene alerts" hint="Frame budget and stream failures.">
                    <Switch defaultChecked label="Email" />
                  </Row>
                  <Row title="Weekly digest" hint="Ingest volume, cost and top scenes.">
                    <Switch label="Email" />
                  </Row>
                  <Row title="Product updates" hint="Roughly once a month.">
                    <Switch defaultChecked label="Email" />
                  </Row>
                </PanelBody>
              </Panel>
            )}

            {tab === 'danger' && (
              <Panel
                title={
                  <span className="cs-row" style={{ gap: 8 }}>
                    Danger zone
                    <Badge tone="danger">Irreversible</Badge>
                  </span>
                }
              >
                <PanelBody>
                  <p className="cs-t-sm" style={{ color: 'var(--cs-text-secondary)', margin: '0 0 14px' }}>
                    Deleting the workspace removes 18 members, 4.2 TB of cached tiles and every API
                    key. Billing stops immediately.
                  </p>
                  <div className="cs-row" style={{ gap: 8, flexWrap: 'wrap' }}>
                    <Button variant="danger-ghost" iconLeft={<Icon name="warning" size={13} />}>
                      Delete workspace
                    </Button>
                    <Button variant="ghost">Transfer ownership</Button>
                  </div>
                </PanelBody>
              </Panel>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
