import { useEffect, useState, type ReactNode } from 'react';
import { Badge, Button, Icon, type IconName } from '@cesium-ds/core';
import { CodeBlock, PageHead } from '../components/DocsUI';
import { foundations } from '../lib/site';
import { TOKEN_STATS } from '../lib/tokenStats';

/* ------------------------------------------------------------------ */
/* live token reader                                                   */
/* ------------------------------------------------------------------ */

function useTokenValue(name: string) {
  const [value, setValue] = useState('');
  useEffect(() => {
    const read = () =>
      setValue(getComputedStyle(document.documentElement).getPropertyValue(name).trim());
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, [name]);
  return value;
}

function TokenRow({ name, use }: { name: string; use: string }) {
  const value = useTokenValue(`--cs-${name}`);
  return (
    <div className="token-row">
      <span className="token-row__dot" style={{ background: `var(--cs-${name})` }} />
      <span className="token-row__name">--cs-{name}</span>
      <span className="token-row__use">{use}</span>
      <span className="token-row__value">{value || '—'}</span>
    </div>
  );
}

function Ramp({ name, keys, note }: { name: string; keys: string[]; note: string }) {
  return (
    <>
      <div className="ramp-label">
        <span className="ramp-label__name">{name}</span>
        <span className="ramp-label__meta">{note}</span>
      </div>
      <div className="swatch-grid">
        {keys.map((k) => (
          <div key={k}>
            <div className="swatch__chip" style={{ background: `var(--cs-${k})` }} />
            <div className="swatch__label">{k.split('-')[1]}</div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* principles                                                          */
/* ------------------------------------------------------------------ */

const principles = [
  {
    title: 'Precision over decoration',
    text: 'Hairlines instead of shadows, numbers instead of adjectives. If a border can carry the structure, no background is needed.',
    detail:
      'This is why the radius scale stops at 16px, why borders are 1px at 9–16% opacity, and why elevation is used only for things that genuinely float: dialogs, popovers, tooltips.',
  },
  {
    title: 'Data over chrome',
    text: 'The interface recedes. A table of coordinates, a scene, a frame-time graph — these are the content, and the system exists to frame them.',
    detail:
      'Headers are 10px monospace so they sit behind the data. Chrome never uses the accent colour; only interactive and selected states do.',
  },
  {
    title: 'Dark first, not dark only',
    text: 'The default theme is the darkened operations room. Light is designed separately, value by value, for daylight and print-adjacent contexts.',
    detail:
      'The accent shifts from #7BB1C6 to #2A6E85 for contrast on white. Semantic colours darken by roughly 40% rather than being reused.',
  },
  {
    title: 'Motion as feedback',
    text: '120–260ms with a mechanical ease-out. Motion confirms a state change; it never announces itself.',
    detail:
      'Nothing bounces, nothing loops except a live status pulse, and every duration collapses to 0ms under prefers-reduced-motion.',
  },
];

function Principles() {
  return (
    <div className="doc-main__inner">
      <PageHead
        eyebrow="Foundations"
        title="Principles"
        lede="Four rules that decide what the system does when two options both look reasonable. They are short on purpose — everything else in these docs is a consequence."
        meta={
          <>
            <Badge tone="accent">4 principles</Badge>
            <Badge>Applied system-wide</Badge>
          </>
        }
      />

      <section className="doc-section" id="rules">
        <h2 className="doc-h2">The rules</h2>
        <div className="principle-grid">
          {principles.map((p, i) => (
            <div className="principle-card" key={p.title}>
              <div className="principle-card__index">{String(i + 1).padStart(2, '0')}</div>
              <div className="principle-card__title">{p.title}</div>
              <div className="principle-card__text">{p.text}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="doc-section" id="consequences">
        <h2 className="doc-h2">How they show up</h2>
        <div className="prose">
          {principles.map((p) => (
            <div key={p.title} style={{ marginBottom: 22 }}>
              <h3>{p.title}</h3>
              <p>{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="doc-section" id="non-goals">
        <h2 className="doc-h2">Non-goals</h2>
        <div className="prose">
          <ul>
            <li>
              <strong>Not a marketing site kit.</strong> There is no hero type scale above 64px and no
              illustration system. Large expressive type belongs to the product, not the shell.
            </li>
            <li>
              <strong>Not a mobile-first app shell.</strong> Components are responsive, but the density
              targets a workstation with a pointer and a keyboard.
            </li>
            <li>
              <strong>Not themeable into another brand.</strong> The tokens are semantic and complete;
              swapping the accent is supported, inventing a second visual language is not.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* color                                                               */
/* ------------------------------------------------------------------ */

const semanticGroups: Array<{ title: string; rows: Array<[string, string]> }> = [
  {
    title: 'Surfaces',
    rows: [
      ['bg-base', 'The void behind everything; app background'],
      ['bg-canvas', 'Page background, preview stage'],
      ['bg-surface', 'Cards, panels, toolbars'],
      ['bg-raised', 'Popovers, dialogs, active segments'],
      ['bg-inset', 'Inputs, code blocks, wells'],
      ['bg-hover', 'Row and control hover overlay'],
      ['bg-selected', 'Selected row or option'],
    ],
  },
  {
    title: 'Text',
    rows: [
      ['text-primary', 'Headings and primary values'],
      ['text-secondary', 'Body copy and labels'],
      ['text-tertiary', 'Hints, metadata, column headers'],
      ['text-disabled', 'Disabled and placeholder text'],
      ['text-inverse', 'Text on a filled surface'],
    ],
  },
  {
    title: 'Borders',
    rows: [
      ['border-subtle', 'Dividers and card edges'],
      ['border', 'Control borders, table frame'],
      ['border-strong', 'Hover borders, strong separation'],
    ],
  },
  {
    title: 'Solid',
    rows: [
      ['solid', 'Primary button: white in dark, near-black in light'],
      ['solid-hover', 'Hover on the solid surface'],
      ['solid-active', 'Pressed solid surface'],
      ['solid-contrast', 'Label on the solid surface'],
    ],
  },
  {
    title: 'Accent',
    rows: [
      ['accent', 'Links, selected rows, focus rings, active indicators'],
      ['accent-hover', 'Hover on accent text and hairlines'],
      ['accent-active', 'Pressed accent indicators'],
      ['accent-soft', 'Tinted backgrounds and focus halos'],
      ['accent-line', 'Accent borders and focus rings'],
    ],
  },
  {
    title: 'State',
    rows: [
      ['success', 'Healthy, complete, connected'],
      ['warning', 'Degraded, partial, approaching a limit'],
      ['danger', 'Failed, destructive, invalid'],
      ['info', 'Neutral informational emphasis'],
    ],
  },
];

function Color() {
  return (
    <div className="doc-main__inner">
      <PageHead
        eyebrow="Foundations"
        title="Color"
        lede="True greys carry the entire structure — no blue cast in a surface, a border or a label. The primary action is a solid white key, and one steel accent is left over for whatever is interactive or selected."
        meta={
          <>
            <Badge tone="accent">2 themes</Badge>
            <Badge>{TOKEN_STATS.themed} themed tokens</Badge>
            <Badge>WCAG AA body text</Badge>
          </>
        }
      />

      <section className="doc-section" id="ramps">
        <h2 className="doc-h2">Primitive ramps</h2>
        <p className="doc-sub">
          Primitives are static and identical in both themes. They are for charts, illustrations and
          the occasional accent tint — never for UI surfaces.
        </p>
        <Ramp name="Atmosphere" keys={Array.from({ length: 11 }, (_, i) => `atmos-${[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950][i]}`)} note="steel · 11 steps" />
        <Ramp name="Slate" keys={Array.from({ length: 11 }, (_, i) => `slate-${[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950][i]}`)} note="neutral · 11 steps" />
        <Ramp name="Signal" keys={['signal-mint', 'signal-amber', 'signal-rose', 'signal-iris', 'signal-teal']} note="state hues · 5" />
      </section>

      <section className="doc-section" id="semantic">
        <h2 className="doc-h2">Semantic tokens</h2>
        <p className="doc-sub">
          Components only ever reference semantic tokens. Values below update live with the theme —
          switch it in the header to compare.
        </p>
        {semanticGroups.map((group) => (
          <div key={group.title} style={{ marginBottom: 26 }}>
            <div className="ramp-label" style={{ marginTop: 0 }}>
              <span className="ramp-label__name">{group.title}</span>
            </div>
            {group.rows.map(([name, use]) => (
              <TokenRow key={name} name={name} use={use} />
            ))}
          </div>
        ))}
      </section>

      <section className="doc-section" id="usage">
        <h2 className="doc-h2">Usage rules</h2>
        <div className="prose">
          <ul>
            <li>
              <strong>Primary is solid, not coloured.</strong> The one white surface on the page is
              the action you want taken. If two buttons are white, neither is primary.
            </li>
            <li>
              <strong>The accent is a signal, not a decoration.</strong> If it is not interactive or
              selected, it is not accent.
            </li>
            <li>
              <strong>Never stack two soft backgrounds.</strong> A tinted alert inside a tinted panel
              loses both readings; drop the outer tint.
            </li>
            <li>
              <strong>Status colour needs a label.</strong> A red dot alone fails for roughly 8% of
              male users and for every screen reader.
            </li>
            <li>
              <strong>Contrast:</strong> body text is at least 4.5:1 against its surface, large text
              3:1, and 1px borders are treated as decorative — never the sole indicator.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* typography                                                          */
/* ------------------------------------------------------------------ */

const typeScale: Array<{ token: string; size: string; line: string; sample: string; use: string }> = [
  { token: '5xl', size: '48px', line: '54px', sample: 'Planetary scale', use: 'Marketing and empty-state headlines only' },
  { token: '4xl', size: '36px', line: '42px', sample: 'Scene overview', use: 'Page titles' },
  { token: '3xl', size: '28px', line: '36px', sample: 'Metric headline', use: 'Stat values, section leads' },
  { token: '2xl', size: '22px', line: '30px', sample: 'Imagery layers', use: 'Sub-sections' },
  { token: 'xl', size: '18px', line: '26px', sample: 'Camera controls', use: 'Dialog titles, card headings' },
  { token: 'lg', size: '16px', line: '24px', sample: 'Load a tileset into the current scene.', use: 'Lede paragraphs' },
  { token: 'md', size: '14px', line: '22px', sample: 'Body copy sits at fourteen pixels.', use: 'Body, default document text' },
  { token: 'base', size: '13px', line: '20px', sample: 'Interface default — buttons, inputs, table cells.', use: 'Controls and dense UI' },
  { token: 'sm', size: '12px', line: '18px', sample: 'Secondary labels and helper text.', use: 'Labels, hints, tags' },
  { token: 'xs', size: '11px', line: '16px', sample: 'Monospace micro-data · 37.7749° N', use: 'Kbd, badges, readouts' },
  { token: '2xs', size: '10px', line: '14px', sample: 'COLUMN HEADER · UPPERCASE', use: 'Table headers, eyebrows' },
];

function Typography() {
  return (
    <div className="doc-main__inner">
      <PageHead
        eyebrow="Foundations"
        title="Typography"
        lede="Newsreader for the display voice, Instrument Sans for the interface, JetBrains Mono for anything a machine produced. Three families, eleven sizes, four weights — and a hard rule that numbers are always tabular."
        meta={
          <>
            <Badge tone="accent">3 families</Badge>
            <Badge>11 sizes</Badge>
            <Badge>tabular numerals</Badge>
          </>
        }
      />

      <section className="doc-section" id="families">
        <h2 className="doc-h2">Families</h2>
        <p className="doc-sub">
          Three voices, each with one job. A serif that sets the tone, a grotesque that does the
          work, and a mono that reports what the machine measured.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: 30,
          }}
        >
          <div>
            <div className="doc-eyebrow" style={{ color: 'var(--cs-text-tertiary)' }}>
              Display · 01
            </div>
            <div
              style={{
                fontFamily: 'var(--cs-font-display)',
                fontWeight: 500,
                fontSize: 32,
                letterSpacing: '-0.021em',
                lineHeight: 1.15,
                marginTop: 10,
                color: 'var(--cs-text-primary)',
              }}
            >
              Newsreader
            </div>
            <div
              style={{
                fontFamily: 'var(--cs-font-display)',
                fontStyle: 'italic',
                fontSize: 15,
                lineHeight: 1.5,
                marginTop: 2,
                color: 'var(--cs-text-tertiary)',
              }}
            >
              optical sizes 6–72
            </div>
            <p className="doc-sub" style={{ marginTop: 10 }}>
              Weights 200–800 on an optical-size axis, so a 44px heading and a 14px nav label are
              drawn by different cuts of the same face. Roman for statements, italic for the margin
              voice — section labels, accents, asides.
            </p>
          </div>

          <div>
            <div className="doc-eyebrow" style={{ color: 'var(--cs-text-tertiary)' }}>
              Interface · 02
            </div>
            <div
              style={{
                fontFamily: 'var(--cs-font-sans)',
                fontWeight: 500,
                fontSize: 32,
                letterSpacing: '-0.018em',
                lineHeight: 1.15,
                marginTop: 10,
                color: 'var(--cs-text-primary)',
              }}
            >
              Instrument Sans
            </div>
            <div
              style={{
                fontFamily: 'var(--cs-font-sans)',
                fontSize: 15,
                lineHeight: 1.5,
                marginTop: 2,
                color: 'var(--cs-text-tertiary)',
              }}
            >
              weights 400–700
            </div>
            <p className="doc-sub" style={{ marginTop: 10 }}>
              The working voice: body copy, labels, buttons, table cells. Slightly wide, open
              apertures, low contrast — it stays legible at 11px in a dense panel and does not shout
              at 16px in a paragraph.
            </p>
          </div>

          <div>
            <div className="doc-eyebrow" style={{ color: 'var(--cs-text-tertiary)' }}>
              Data · 03
            </div>
            <div
              style={{
                fontFamily: 'var(--cs-font-mono)',
                fontWeight: 500,
                fontSize: 32,
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                marginTop: 10,
                color: 'var(--cs-text-primary)',
              }}
            >
              JetBrains Mono
            </div>
            <div
              style={{
                fontFamily: 'var(--cs-font-mono)',
                fontSize: 15,
                lineHeight: 1.5,
                marginTop: 2,
                color: 'var(--cs-text-tertiary)',
              }}
            >
              37.7749° N
            </div>
            <p className="doc-sub" style={{ marginTop: 10 }}>
              Coordinates, identifiers, byte counts, timestamps, column headers, keycaps. Always
              with <code>tabular-nums</code> when the value can change, never for a sentence.
            </p>
          </div>
        </div>
      </section>

      <section className="doc-section" id="scale">
        <h2 className="doc-h2">Scale</h2>
        <p className="doc-sub">
          Each size is paired with a line-height token. Do not mix a size with a line-height from a
          different step.
        </p>
        <div>
          {typeScale.map((t) => (
            <div className="type-row" key={t.token}>
              <div className="type-row__meta">
                {t.token} · {t.size}
                <br />
                lh {t.line}
              </div>
              <div>
                <div className="type-row__sample" style={{ fontSize: t.size, lineHeight: t.line }}>
                  {t.sample}
                </div>
                <div className="cs-t-xs cs-dimmer" style={{ marginTop: 3 }}>
                  {t.use}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="doc-section" id="mono">
        <h2 className="doc-h2">Monospace in practice</h2>
        <div className="prose">
          <p>
            Monospace is the system’s second voice. It signals “this value came from a machine” and it
            makes columns of digits line up. Three patterns cover almost every case:
          </p>
          <ul>
            <li>
              <strong>Readouts</strong> — coordinates, altitude, heading. Uppercase 8–10px keys with
              11–12px values.
            </li>
            <li>
              <strong>Identifiers</strong> — asset IDs, CRS codes, tile paths. Never uppercase these;
              they are case-sensitive.
            </li>
            <li>
              <strong>Micro-captions</strong> — column headers, eyebrows, panel titles. Uppercase at
              0.14–0.18em tracking, at 9–10px.
            </li>
          </ul>
          <p>
            Never set a sentence in monospace. It is a data voice, not a display voice — and it will
            read as a code block even when it is prose.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* spacing                                                             */
/* ------------------------------------------------------------------ */

const spaceScale = [2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128];

function Spacing() {
  return (
    <div className="doc-main__inner">
      <PageHead
        eyebrow="Foundations"
        title="Space & grid"
        lede="A 4px base unit with named pixel steps, so a token always tells you its value. Control heights and radii are part of the same rhythm."
        meta={
          <>
            <Badge tone="accent">4px base</Badge>
            <Badge>16 steps</Badge>
            <Badge>hairline borders</Badge>
          </>
        }
      />

      <section className="doc-section" id="scale">
        <h2 className="doc-h2">Space scale</h2>
        <p className="doc-sub">
          Steps are named after their pixel value: <code>--cs-space-16</code> is 16px. Half-steps of 2
          and 6px exist for optical alignment inside controls, not for layout.
        </p>
        <div>
          {spaceScale.map((s) => (
            <div className="space-row" key={s}>
              <span className="space-row__name">space-{s}</span>
              <span className="space-row__bar" style={{ width: s }} />
              <span className="space-row__px">{s}px</span>
            </div>
          ))}
        </div>
      </section>

      <section className="doc-section" id="rhythm">
        <h2 className="doc-h2">Vertical rhythm</h2>
        <div className="prose">
          <ul>
            <li>
              <strong>4px</strong> between a label and its control.
            </li>
            <li>
              <strong>8px</strong> between related controls in a row.
            </li>
            <li>
              <strong>16px</strong> between fields; <strong>24px</strong> between form groups.
            </li>
            <li>
              <strong>32–48px</strong> between page sections; <strong>76px</strong> between major bands
              on a landing surface.
            </li>
          </ul>
        </div>
      </section>

      <section className="doc-section" id="radii">
        <h2 className="doc-h2">Radii</h2>
        <p className="doc-sub">
          Radii stay small because the surfaces are technical. Anything above 16px is a pill, not a
          corner.
        </p>
        <div className="radius-grid">
          {[
            ['xs', '2px'],
            ['sm', '3px'],
            ['md', '5px'],
            ['lg', '8px'],
            ['xl', '12px'],
            ['2xl', '16px'],
            ['pill', '999px'],
          ].map(([name, value]) => (
            <div className="radius-demo" key={name}>
              <div className="radius-demo__box" style={{ borderRadius: value }} />
              <span className="radius-demo__name">
                {name} · {value}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="doc-section" id="controls">
        <h2 className="doc-h2">Control heights</h2>
        <div className="cs-stack" style={{ gap: 10, maxWidth: 380 }}>
          {[
            ['sm', 28, 'Toolbars, table filters, dense headers'],
            ['md', 34, 'Default for every form control'],
            ['lg', 40, 'Primary page actions, hero CTAs'],
          ].map(([name, h, use]) => (
            <div className="cs-row" key={name as string} style={{ gap: 14 }}>
              <div
                style={{
                  width: h as number,
                  height: h as number,
                  borderRadius: 4,
                  background: 'var(--cs-accent-soft)',
                  border: '1px solid var(--cs-accent-line)',
                }}
              />
              <div>
                <div className="cs-mono cs-t-sm" style={{ color: 'var(--cs-text-primary)' }}>
                  control-{name} · {h}px
                </div>
                <div className="cs-t-xs cs-dimmer">{use}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="doc-section" id="grid">
        <h2 className="doc-h2">Grid</h2>
        <div className="prose">
          <p>
            Layout is built from a 12-column fluid grid with 24px gutters inside a 1440px maximum page
            width. Panels and cards do not snap to columns — they flow in CSS grid with a 10–14px gap,
            because dashboards change shape far more often than marketing pages.
          </p>
          <p>
            The graticule texture — a 32px hairline grid — is available as{' '}
            <code>.cs-graticule</code> for empty states and map backdrops. Use it at 5–6% opacity; it
            should be felt, not read.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* motion                                                              */
/* ------------------------------------------------------------------ */

const primitives = [
  { cls: 'cs-anim-fade', name: 'cs-anim-fade', note: 'Opacity only. Surfaces, overlays.' },
  { cls: 'cs-anim-rise', name: 'cs-anim-rise', note: 'Opacity + 10px rise. Content blocks.' },
  { cls: 'cs-anim-scale', name: 'cs-anim-scale', note: 'Opacity + 0.97 scale. Dialogs, popovers.' },
  { cls: 'cs-anim-slide', name: 'cs-anim-slide', note: 'Opacity + 8px slide. Drawers, rows.' },
];

function MotionPrimitives() {
  const [run, setRun] = useState(0);
  return (
    <div>
      <div className="cs-row" style={{ gap: 12, marginBottom: 16 }}>
        <Button size="sm" variant="secondary" onClick={() => setRun((r) => r + 1)}>
          <Icon name="play" size={11} />
          Replay
        </Button>
        <span className="cs-t-xs cs-dimmer">
          Remounts each sample so the animation runs again.
        </span>
      </div>

      <div className="motion-grid" key={run}>
        {primitives.map((p, i) => (
          <div
            className={`motion-sample ${p.cls}`}
            key={p.name}
            style={{ ['--cs-anim-delay' as string]: `${i * 70}ms` }}
          >
            <span className="motion-sample__stage">
              <span className="motion-sample__dot" />
              <span className="motion-sample__bar" />
            </span>
            <span className="motion-sample__name">{p.name}</span>
            <span className="motion-sample__note">{p.note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const durations = [
  ['instant', '80ms', 'Pressed states, checkbox ticks'],
  ['fast', '120ms', 'Hover, focus, colour changes'],
  ['base', '180ms', 'Default transition for surfaces'],
  ['slow', '260ms', 'Dialogs, drawers, expanding rows'],
  ['slower', '420ms', 'Rare: full-panel reveals'],
];

const easings = [
  ['ease-out', 'cubic-bezier(0.22, 1, 0.36, 1)', 'Entering and settling. The default.'],
  ['ease-in-out', 'cubic-bezier(0.4, 0, 0.2, 1)', 'Moving between two states.'],
  ['ease-spring', 'cubic-bezier(0.34, 1.56, 0.64, 1)', 'Small physical parts: switch thumbs, checkmarks.'],
];

function Motion() {
  return (
    <div className="doc-main__inner">
      <PageHead
        eyebrow="Foundations"
        title="Motion"
        lede="Motion confirms a state change and then gets out of the way. Fast, mechanical, and never decorative — a 180ms transition is already at the edge of what a dense interface can afford."
        meta={
          <>
            <Badge tone="accent">5 durations</Badge>
            <Badge>3 easings</Badge>
            <Badge>reduced-motion aware</Badge>
          </>
        }
      />

      <section className="doc-section" id="durations">
        <h2 className="doc-h2">Durations</h2>
        <div>
          {durations.map(([name, value, use]) => (
            <div className="motion-row" key={name}>
              <span className="motion-row__name">dur-{name}</span>
              <span className="motion-row__val">{value}</span>
              <div>
                <div className="cs-t-xs" style={{ color: 'var(--cs-text-secondary)' }}>
                  {use}
                </div>
                <div className="motion-demo" style={{ marginTop: 6 }}>
                  <span
                    className="motion-demo__bar"
                    style={{
                      animationDuration: `${value}ms`,
                      animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                      animationIterationCount: 'infinite',
                      animationDirection: 'alternate',
                      width: 24,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="doc-section" id="easings">
        <h2 className="doc-h2">Easings</h2>
        <div>
          {easings.map(([name, curve, use]) => (
            <div className="motion-row" key={name}>
              <span className="motion-row__name">{name}</span>
              <span className="motion-row__val" style={{ fontSize: 9 }}>
                {curve}
              </span>
              <span className="cs-t-xs" style={{ color: 'var(--cs-text-secondary)' }}>
                {use}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="doc-section" id="primitives">
        <h2 className="doc-h2">Primitives</h2>
        <p className="doc-sub">
          Four entrance animations cover almost everything. They animate opacity plus a single
          transform, run once, and never loop.
        </p>
        <MotionPrimitives />
        <div style={{ height: 16 }} />
        <CodeBlock
          code={`<div className="cs-anim-rise">…</div>   // opacity + 10px rise
<div className="cs-anim-fade">…</div>   // opacity only
<div className="cs-anim-scale">…</div>  // opacity + 0.97 scale
<div className="cs-anim-slide">…</div>  // opacity + 8px slide

// stagger children 45ms apart
<ul className="cs-stagger">{items.map(…)}</ul>

// reveal on scroll — add .is-in when it enters view
<section className="cs-reveal">…</section>`}
        />
      </section>

      <section className="doc-section" id="rules">
        <h2 className="doc-h2">Rules</h2>
        <div className="prose">
          <ul>
            <li>
              <strong>Animate one property.</strong> Opacity, transform, or colour — not all three. The
              modal animates opacity and a 10px translate; that is the ceiling.
            </li>
            <li>
              <strong>No infinite motion except live status.</strong> A pulsing dot means “this is
              streaming right now”. A pulsing button means nothing.
            </li>
            <li>
              <strong>Never animate layout.</strong> Width, height and top/left force reflow; use
              transform and opacity.
            </li>
            <li>
              <strong>Respect the setting.</strong> Every duration token collapses to 0ms under{' '}
              <code>prefers-reduced-motion</code>.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* iconography                                                         */
/* ------------------------------------------------------------------ */

const iconNames: IconName[] = [
  'globe', 'layers', 'box', 'compass', 'map-pin', 'crosshair', 'gauge', 'activity',
  'search', 'sliders', 'table', 'code', 'terminal', 'palette', 'type', 'ruler',
  'zap', 'sparkles', 'download', 'external', 'grid', 'book', 'play', 'plus',
  'minus', 'check', 'close', 'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right',
  'arrow-right', 'arrow-up-right', 'arrow-down', 'menu', 'copy', 'info', 'warning',
  'success', 'error', 'sun', 'moon', 'command', 'panel-left',
];

function Iconography() {
  return (
    <div className="doc-main__inner">
      <PageHead
        eyebrow="Foundations"
        title="Iconography"
        lede="Forty-four glyphs drawn on a 24px grid with a 1.5px stroke. Geometric, open, and instrument-like — circles, crosshairs, chevrons, no fills except where a mark needs weight."
        meta={
          <>
            <Badge tone="accent">{iconNames.length} icons</Badge>
            <Badge>24px grid</Badge>
            <Badge>1.5px stroke</Badge>
          </>
        }
      />

      <section className="doc-section" id="set">
        <h2 className="doc-h2">Set</h2>
        <div className="icon-gallery">
          {iconNames.map((name) => (
            <div className="icon-cell" key={name}>
              <Icon name={name} size={18} />
              <span className="icon-cell__name">{name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="doc-section" id="rules">
        <h2 className="doc-h2">Rules</h2>
        <div className="prose">
          <ul>
            <li>
              <strong>Sizes:</strong> 12px in dense toolbars, 14–16px in buttons and inputs, 18–20px
              standalone. Never below 12px.
            </li>
            <li>
              <strong>Stroke:</strong> 1.5px at 14–24px, 2px only below 12px so the mark does not
              disappear.
            </li>
            <li>
              <strong>Colour:</strong> icons inherit <code>currentColor</code>. They are never the
              accent unless the control is active.
            </li>
            <li>
              <strong>Meaning:</strong> an icon never carries meaning alone in a control — it is paired
              with a label or an accessible name.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const pages: Record<string, () => ReactNode> = {
  principles: Principles,
  color: Color,
  typography: Typography,
  spacing: Spacing,
  motion: Motion,
  iconography: Iconography,
};

export function FoundationsPage({ id }: { id: string }) {
  const Page = pages[id];
  if (!Page) {
    return (
      <div className="doc-main__inner">
        <PageHead eyebrow="404" title="Not found" lede="That foundation page does not exist." />
      </div>
    );
  }
  return <Page />;
}

export const foundationLinks = foundations;
