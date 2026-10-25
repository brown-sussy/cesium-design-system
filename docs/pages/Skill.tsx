import { Badge, Divider, Icon, KeyValue, Panel, PanelBody } from '@cesium-ds/core';
import { CodeBlock, PageHead, Section } from '../components/DocsUI';
import { componentCount } from '../content/registry';

const structure = [
  ['skill/SKILL.md', 'Entry point: when to use the system, the token rules, the component API, anti-patterns.'],
  ['skill/reference/tokens.md', 'Every token, grouped, with values for both themes.'],
  ['skill/reference/components.md', `Props and usage for all ${componentCount} components, plus copy-ready snippets.`],
  ['skill/reference/patterns.md', 'Four full compositions: dashboard, HUD, form, inspector.'],
];

export function Skill() {
  return (
    <div className="doc-main__inner">
      <PageHead
        eyebrow="Resources"
        title="Agent skill"
        lede="The system ships with a skill package that teaches an AI agent how to build with it — tokens, component APIs, composition recipes and the mistakes to avoid."
        meta={
          <>
            <Badge tone="accent">SKILL.md</Badge>
            <Badge>4 files</Badge>
            <Badge>~900 lines</Badge>
          </>
        }
      />

      <section className="doc-section" id="why">
        <h2 className="doc-h2">Why a skill</h2>
        <div className="prose">
          <p>
            A component library alone is not enough context for an agent. Left to itself, a model will
            invent a second accent colour, reach for a 12px radius, and put an icon-only button in a
            toolbar without a label. The skill exists to make the correct choice the obvious one.
          </p>
          <p>
            It is plain Markdown with no runtime: read by a human, loaded by an agent, and versioned
            alongside the code it describes.
          </p>
        </div>
      </section>

      <Section id="install" title="Install">
        <CodeBlock
          lang="bash"
          code={`# from the repository
cp -r skill ~/.workbuddy-ai/skills/cesium-design

# verify
ls ~/.workbuddy-ai/skills/cesium-design
# SKILL.md  reference/`}
        />
        <div className="prose" style={{ marginTop: 16 }}>
          <p>
            Once installed, the skill is available to every project. Reference it by name when asking
            for UI work: <em>“Build the ingest dashboard using the cesium-design skill.”</em>
          </p>
        </div>
      </Section>

      <Section id="structure" title="Contents">
        <div className="props-table">
          <table>
            <thead>
              <tr>
                <th style={{ width: '34%' }}>File</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {structure.map(([file, desc]) => (
                <tr key={file}>
                  <td className="props-table__name">{file}</td>
                  <td>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section id="excerpt" title="What it enforces">
        <div className="split" style={{ alignItems: 'start' }}>
          <div className="prose">
            <ul>
              <li>
                <strong>Tokens or nothing.</strong> No hex values, no arbitrary px. Every colour, space
                and radius comes from a <code>--cs-*</code> variable.
              </li>
              <li>
                <strong>One accent per view.</strong> The accent is reserved for interactive and
                selected states.
              </li>
              <li>
                <strong>Monospace for data.</strong> Coordinates, identifiers and metrics are always
                monospace with tabular figures.
              </li>
              <li>
                <strong>Density by default.</strong> 34px controls, 13px interface type, hairline
                borders, 2–8px radii.
              </li>
              <li>
                <strong>Complete states.</strong> Every interactive element ships hover, focus-visible,
                disabled and loading.
              </li>
            </ul>
          </div>
          <div>
            <Panel title="Skill metadata" accent>
              <PanelBody>
                <KeyValue
                  items={[
                    { key: 'Name', value: 'cesium-design' },
                    { key: 'Version', value: '1.0.0' },
                    { key: 'Triggers', value: 'UI · dashboard · HUD' },
                    { key: 'References', value: '3 files' },
                    { key: 'License', value: 'MIT' },
                  ]}
                />
              </PanelBody>
            </Panel>
          </div>
        </div>
      </Section>

      <Section id="prompt" title="Example prompt">
        <CodeBlock
          lang="text"
          code={`Using the cesium-design skill, build a tileset ingestion dashboard:
- header with workspace switcher and 24H / 7D / 30D range
- four stats: tiles ingested, mean decode, queue depth, failures
- a compact table of pipelines with status dots
- a right column with a scene-budget panel and a node-status readout
Dark theme, no external UI libraries.`}
        />
        <div className="prose" style={{ marginTop: 16 }}>
          <p>
            The output should look like the <a href="#/patterns/dashboard">operations dashboard</a>{' '}
            pattern: same density, same accent discipline, same monospace readouts.
          </p>
        </div>
      </Section>

      <Section id="guardrails" title="Guardrails">
        <div className="prose">
          <ul>
            <li>
              <strong>No new colours.</strong> If a state is missing, use the nearest semantic token —
              never a one-off hex.
            </li>
            <li>
              <strong>No component forking.</strong> Compose with existing components; if a variant is
              genuinely missing, extend the component and document it.
            </li>
            <li>
              <strong>No icon-only controls without labels.</strong> IconButton requires{' '}
              <code>label</code>, and the skill checks for it.
            </li>
            <li>
              <strong>No decorative gradients.</strong> The only gradient in the system is the accent
              bloom on a HUD or the atmosphere behind a globe.
            </li>
          </ul>
        </div>
      </Section>

      <div style={{ marginTop: 40 }}>
        <Divider label="Also available" />
        <div className="cs-row" style={{ gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
          <a className="cs-btn cs-btn--secondary" href="#/resources">
            <span className="cs-btn__icon">
              <Icon name="download" size={13} />
            </span>
            Installation
          </a>
          <a className="cs-btn cs-btn--ghost" href="#/components">
            <span className="cs-btn__icon">
              <Icon name="grid" size={13} />
            </span>
            Component index
          </a>
        </div>
      </div>
    </div>
  );
}
