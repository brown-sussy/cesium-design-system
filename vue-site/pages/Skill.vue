<script setup lang="ts">
import { Badge, Divider, Icon, KeyValue, Panel, PanelBody } from '../../vue';
import CodeBlock from '../components/CodeBlock.vue';
import { componentCount } from '../lib/nav.generated';

const structure = [
  ['skill/SKILL.md', 'Entry point: when to use the system, the token rules, the component API, anti-patterns.'],
  ['skill/reference/tokens.md', 'Every token, grouped, with values for both themes.'],
  ['skill/reference/components.md', `Props and usage for all ${componentCount} components, plus copy-ready snippets.`],
  ['skill/reference/patterns.md', 'Four full compositions: dashboard, HUD, form, inspector.'],
];

const installSkill = `# from the repository
cp -r skill ~/.workbuddy-ai/skills/cesium-design

# verify
ls ~/.workbuddy-ai/skills/cesium-design
# SKILL.md  reference/`;

const promptExample = `Using the cesium-design skill, build a tileset ingestion dashboard in Vue 3:
- header with workspace switcher and 24H / 7D / 30D range
- four stats: tiles ingested, mean decode, queue depth, failures
- a compact table of pipelines with status dots
- a right column with a scene-budget panel and a node-status readout
Dark theme, <script setup lang="ts">, no external UI libraries.`;
</script>

<template>
  <div class="doc-main__inner">
    <header>
      <div class="doc-eyebrow">Resources</div>
      <h1 class="doc-h1">Agent skill</h1>
      <p class="doc-lede">
        The system ships with a skill package that teaches an AI agent how to build with it — tokens, component APIs, composition recipes and the mistakes to avoid.
      </p>
      <div class="doc-meta">
        <Badge tone="accent">SKILL.md</Badge>
        <Badge>4 files</Badge>
        <Badge>~1.7k lines</Badge>
      </div>
    </header>

    <section class="doc-section">
      <h2 class="doc-h2">Why a skill</h2>
      <div class="prose">
        <p>
          A component library alone is not enough context for an agent. Left to itself, a model will
          invent a second accent colour, reach for a 12px radius, and put an icon-only button in a
          toolbar without a label. The skill exists to make the correct choice the obvious one.
        </p>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">Install</h2>
      <CodeBlock lang="bash" :code="installSkill" />
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">Contents</h2>
      <div class="props-table">
        <table>
          <thead>
            <tr>
              <th style="width: 34%">File</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="[file, desc] in structure" :key="file">
              <td class="props-table__name">{{ file }}</td>
              <td>{{ desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">What it enforces</h2>
      <div class="split" style="align-items: start">
        <div class="prose">
          <ul>
            <li>
              <strong>Tokens or nothing.</strong> Every colour, space and radius comes from a <code>--cs-*</code> variable.
            </li>
            <li>
              <strong>One accent per view.</strong> The accent is reserved for interactive and selected states.
            </li>
            <li>
              <strong>Monospace for data.</strong> Coordinates, identifiers and metrics are always monospace with tabular figures.
            </li>
            <li>
              <strong>Density by default.</strong> 34px controls, 13px interface type, hairline borders, compact radii.
            </li>
          </ul>
        </div>
        <div>
          <Panel title="Skill metadata" accent>
            <PanelBody>
              <KeyValue
                :items="[
                  { key: 'Name', value: 'cesium-design' },
                  { key: 'Version', value: '1.0.0' },
                  { key: 'Triggers', value: 'UI · dashboard · HUD' },
                  { key: 'References', value: '3 files' },
                  { key: 'License', value: 'MIT' },
                ]"
              />
            </PanelBody>
          </Panel>
        </div>
      </div>
    </section>

    <section class="doc-section">
      <h2 class="doc-h2">Example prompt</h2>
      <CodeBlock lang="text" :code="promptExample" />
    </section>
  </div>
</template>
