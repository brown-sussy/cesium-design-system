import { componentCount, navEntries } from './nav.generated';

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

export interface TemplateMeta {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  parts: string[];
  notes: string[];
}

export const templateMeta: TemplateMeta[] = [
  {
    slug: 'homepage',
    name: 'Homepage',
    tagline: 'Marketing landing page',
    description:
      'A product homepage: sticky-free header, split hero with a live-looking scene card, a metric strip, three features, a closing call to action and a footer.',
    parts: ['Button', 'Badge', 'Icon', 'StatusDot'],
    notes: [
      'One primary action per band. The header, the hero and the closing band each carry exactly one white key — never two.',
      'The scene card is drawn, not screenshotted: grid lines from --cs-grid-line, a radial accent wash, and four monospace corner readouts.',
      'The metric strip uses hairline dividers instead of cards, so four numbers read as one row rather than four boxes.',
      'Every row is a grid with auto-fit and a minimum column width, so the page reflows without a single media query.',
    ],
  },
  {
    slug: 'sign-in',
    name: 'Sign in',
    tagline: 'Authentication page',
    description:
      'A single centred card over a gridded void: email and password, a remembered-session checkbox, one primary action, and an SSO fallback.',
    parts: ['Field', 'Input', 'Checkbox', 'Button', 'Icon'],
    notes: [
      'No split screen and no marketing panel. An authentication page has one job, and a second column is a second thing to read.',
      'The primary button is the only filled surface in the card — the SSO fallback stays secondary.',
      'Labels are Field, not placeholders. The password row puts "Forgot?" inside the label, which keeps the control on one line.',
      'A monospace compliance line sits outside the card, where it reads as an environmental readout.',
    ],
  },
  {
    slug: 'settings',
    name: 'Settings',
    tagline: 'App shell with a sidebar',
    description:
      'The system app shell: a 252px sidebar that folds to a 56px rail below 900px, a pinned header with one save action, and a single column of panels.',
    parts: ['Sidebar', 'Tabs', 'Panel', 'Field', 'Select', 'Switch', 'Avatar'],
    notes: [
      'The sidebar is the library component — sections, badges, a travelling accent tick, and a rail when the window narrows.',
      'Save lives in the header, not at the bottom of the form. A settings page scrolls; the action that commits it should not.',
      'Panels, not cards: 34px headers stack tightly, and the body never exceeds a 760px measure.',
      'The danger zone is the only place a tinted button appears. Everything above it is neutral.',
    ],
  },
  {
    slug: 'not-found',
    name: '404',
    tagline: 'Signal lost',
    description:
      'An error page that stays in character: a mono status line, a 120px numeral, one display sentence, two actions and the failed request.',
    parts: ['Button', 'Icon'],
    notes: [
      'The number carries the size, the serif sentence carries the tone.',
      'Two actions, one primary — back to the console, or the status page.',
      'The failed route is printed in monospace with its status code.',
      'The reticle is decorative and aria-hidden; nothing about the page depends on seeing it.',
    ],
  },
];

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
