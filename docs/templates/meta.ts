export type TemplateCategory = 'Marketing' | 'Application' | 'System';

/**
 * Template metadata, with no component or source attached.
 *
 * The registry in `./index` pairs each of these with a rendered component and
 * its verbatim source string. Anything that only needs to *list* templates —
 * the docs nav, the command palette, the homepage teaser — imports this file
 * instead, so it does not pull four whole pages into the bundle.
 */
export interface TemplateMeta {
  slug: string;
  name: string;
  /** One line, used on the card and in the palette. */
  tagline: string;
  /** The page lede. */
  description: string;
  category: TemplateCategory;
  /** Components the page is composed from. */
  parts: string[];
  /** What the page is doing, in the order a reviewer would check it. */
  notes: string[];
}

export const templateMeta: TemplateMeta[] = [
  {
    slug: 'homepage',
    name: 'Homepage',
    tagline: 'Marketing landing page',
    description:
      'A product homepage: sticky-free header, split hero with a live-looking scene card, a metric strip, three features, a closing call to action and a footer.',
    category: 'Marketing',
    parts: ['Button', 'Badge', 'Icon', 'StatusDot'],
    notes: [
      'One primary action per band. The header, the hero and the closing band each carry exactly one white key — never two.',
      'The scene card is drawn, not screenshotted: grid lines from --cs-grid-line, a radial accent wash, and four monospace corner readouts. It inherits both themes for free.',
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
    category: 'Application',
    parts: ['Field', 'Input', 'Checkbox', 'Button', 'Icon'],
    notes: [
      'No split screen and no marketing panel. An authentication page has one job, and a second column is a second thing to read.',
      'The primary button is the only filled surface in the card — the SSO fallback stays secondary, so the hierarchy survives.',
      'Labels are Field, not placeholders. The password row puts "Forgot?" inside the label, which keeps the control on one line.',
      'A monospace compliance line sits outside the card, where it reads as a property of the environment rather than a claim in the form.',
    ],
  },
  {
    slug: 'settings',
    name: 'Settings',
    tagline: 'App shell with a sidebar',
    description:
      'The system app shell: a 252px sidebar that folds to a 56px rail below 900px, a pinned header with one save action, and a single column of panels.',
    category: 'Application',
    parts: ['Sidebar', 'Tabs', 'Panel', 'Field', 'Select', 'Switch', 'Avatar'],
    notes: [
      'The sidebar is the library component — sections, badges, a travelling accent tick, and a rail with portalled flyouts when the window narrows.',
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
    category: 'System',
    parts: ['Button', 'Icon'],
    notes: [
      'The number carries the size, the serif sentence carries the tone. Reversing that reads as a poster instead of an error.',
      'Two actions, one primary — back to the console, or the status page if the fault is ours.',
      'The failed route is printed in monospace with its status code. It costs one line and saves the support ticket.',
      'The reticle is decorative and aria-hidden; nothing about the page depends on seeing it.',
    ],
  },
];

export const findTemplateMeta = (slug: string) => templateMeta.find((t) => t.slug === slug);
