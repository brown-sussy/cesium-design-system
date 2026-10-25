import { componentCount, navEntries } from '../content/nav.generated';
import { templateMeta } from '../templates/meta';

export interface Link {
  label: string;
  to: string;
  desc?: string;
}

export const foundations: Link[] = [
  { label: 'Principles', to: '/foundations/principles', desc: 'The four rules behind every decision' },
  { label: 'Color', to: '/foundations/color', desc: 'Atmosphere, slate and signal' },
  { label: 'Typography', to: '/foundations/typography', desc: 'Newsreader, Instrument Sans, JetBrains Mono' },
  { label: 'Space & grid', to: '/foundations/spacing', desc: '4px base, hairline structure' },
  { label: 'Motion', to: '/foundations/motion', desc: 'Fast, mechanical, never bouncy' },
  { label: 'Iconography', to: '/foundations/iconography', desc: '24px grid, 1.5px stroke' },
];

export const patterns: Link[] = [
  { label: 'Operations dashboard', to: '/patterns/dashboard', desc: 'Stats, panels and a dense table' },
  { label: 'Globe HUD', to: '/patterns/map-hud', desc: 'Overlays for a 3D scene' },
];

// Derived from the template metadata rather than repeated here: the label and
// description were already written once, in `templates/meta.ts`.
export const templates: Link[] = templateMeta.map((t) => ({
  label: t.name,
  to: `/templates/${t.slug}`,
  desc: t.tagline,
}));

export const resources: Link[] = [
  { label: 'Installation & theming', to: '/resources', desc: 'npm, CSS import, dark and light' },
  { label: 'Agent skill', to: '/skill', desc: 'Teach an agent to build with the system' },
];

export interface PaletteItem extends Link {
  group: string;
}

export const paletteItems: PaletteItem[] = [
  { group: 'Overview', label: 'Introduction', to: '/', desc: 'What the system is for' },
  { group: 'Overview', label: 'Component index', to: '/components', desc: `${componentCount} components` },
  ...foundations.map((f) => ({ ...f, group: 'Foundations' })),
  ...navEntries.map((doc) => ({
    group: doc.category,
    label: doc.name,
    to: `/components/${doc.slug}`,
    desc: doc.summary,
  })),
  ...patterns.map((p) => ({ ...p, group: 'Patterns' })),
  { group: 'Templates', label: 'All templates', to: '/templates', desc: 'Whole pages, copy-ready' },
  ...templates.map((t) => ({ ...t, group: 'Templates' })),
  ...resources.map((r) => ({ ...r, group: 'Resources' })),
];
