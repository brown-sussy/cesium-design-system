/**
 * GENERATED FILE — do not edit.
 *
 * Produced by `scripts/build-docs-nav.mjs` from `docs/content/*.tsx`. It carries
 * the navigation metadata only: importing the full registry into the chrome
 * pulled every component's demos and source strings into the entry bundle.
 *
 * Regenerate with `npm run docs:nav` (also runs before `dev` and `build:docs`).
 */

export type NavCategory =
  | 'Actions'
  | 'Forms'
  | 'Display'
  | 'Layout'
  | 'Data'
  | 'Navigation'
  | 'Overlay'
  | 'HUD'
  | 'AI'
  | 'Chat'
  | 'Science';

export interface NavEntry {
  slug: string;
  name: string;
  category: NavCategory;
  summary: string;
  status?: 'Stable' | 'New' | 'Beta';
  /** How many live examples the component page shows. */
  examples: number;
}

export const navEntries: NavEntry[] = [
  { slug: 'button', name: 'Button', category: 'Actions', summary: 'Triggers an action. One primary action per view, everything else is secondary or quieter.', status: 'Stable', examples: 5 },
  { slug: 'input', name: 'Input', category: 'Forms', summary: 'Single-line text entry with optional prefix, suffix and validation state.', status: 'Stable', examples: 4 },
  { slug: 'textarea', name: 'Textarea', category: 'Forms', summary: 'Multi-line text entry, with a monospace mode for configuration and JSON.', status: 'Stable', examples: 2 },
  { slug: 'select', name: 'Select', category: 'Forms', summary: 'A listbox drawn by the system, not by the operating system.', status: 'Stable', examples: 2 },
  { slug: 'checkbox', name: 'Checkbox', category: 'Forms', summary: 'Binary or multi-select choice, with an indeterminate state for partial selection.', status: 'Stable', examples: 2 },
  { slug: 'switch', name: 'Switch', category: 'Forms', summary: 'Immediate on/off setting that applies without a save step.', status: 'Stable', examples: 1 },
  { slug: 'slider', name: 'Slider', category: 'Forms', summary: 'A track, a fill and a thumb, all drawn by the system.', status: 'Stable', examples: 2 },
  { slug: 'field', name: 'Field', category: 'Forms', summary: 'Label, hint and error wrapper that keeps every form row on the same vertical rhythm.', status: 'Stable', examples: 1 },
  { slug: 'segmented-control', name: 'SegmentedControl', category: 'Forms', summary: 'Two to four mutually exclusive options, visible at once — no dropdown required.', status: 'Stable', examples: 2 },
  { slug: 'badge', name: 'Badge', category: 'Display', summary: 'Compact status or category marker. Monospace, uppercase, 19px tall.', status: 'Stable', examples: 1 },
  { slug: 'tag', name: 'Tag', category: 'Display', summary: 'Applied filter or category chip, optionally removable.', status: 'Stable', examples: 1 },
  { slug: 'avatar', name: 'Avatar', category: 'Display', summary: 'Identity chip with initials fallback, five sizes and an optional presence dot.', status: 'Stable', examples: 1 },
  { slug: 'kbd', name: 'Kbd', category: 'Display', summary: 'Keyboard shortcut keycap, with a grouped variant for chords.', status: 'Stable', examples: 1 },
  { slug: 'status-dot', name: 'StatusDot', category: 'Display', summary: 'Six-pixel presence indicator with an optional pulse for live states.', status: 'Stable', examples: 1 },
  { slug: 'spinner', name: 'Spinner', category: 'Display', summary: 'Indeterminate progress for waits under roughly two seconds.', status: 'Stable', examples: 1 },
  { slug: 'progress', name: 'Progress', category: 'Display', summary: 'Determinate or indeterminate progress bar with an optional labelled readout.', status: 'Stable', examples: 1 },
  { slug: 'skeleton', name: 'Skeleton', category: 'Display', summary: 'Layout-stable placeholder shown while content loads.', status: 'Stable', examples: 1 },
  { slug: 'divider', name: 'Divider', category: 'Display', summary: 'Hairline separation, optionally with a centred label or vertical orientation.', status: 'Stable', examples: 1 },
  { slug: 'tooltip', name: 'Tooltip', category: 'Display', summary: 'Short contextual label shown on hover or focus.', status: 'Stable', examples: 1 },
  { slug: 'icon', name: 'Icon', category: 'Display', summary: 'Forty-four stroke icons on a 24px grid at 1.5px, sized by a single prop.', status: 'Stable', examples: 1 },
  { slug: 'card', name: 'Card', category: 'Layout', summary: 'Grouped content on a raised surface with an optional header and footer.', status: 'Stable', examples: 1 },
  { slug: 'panel', name: 'Panel', category: 'Layout', summary: 'The instrument surface: a dense, monospace-titled container for live readouts.', status: 'Stable', examples: 1 },
  { slug: 'toolbar', name: 'Toolbar', category: 'Layout', summary: 'A single row of icon actions with hairline separators.', status: 'Stable', examples: 1 },
  { slug: 'table', name: 'Table', category: 'Data', summary: 'Dense data table with sticky monospace headers, row selection and numeric alignment.', status: 'Stable', examples: 2 },
  { slug: 'stat', name: 'Stat', category: 'Data', summary: 'A single metric: label, tabular value, optional delta and sparkline.', status: 'Stable', examples: 1 },
  { slug: 'key-value', name: 'KeyValue', category: 'Data', summary: 'Readout list with dotted leaders, like a printed instrument panel.', status: 'Stable', examples: 1 },
  { slug: 'sparkline', name: 'Sparkline', category: 'Data', summary: 'Trend line without axes — for shape, not for reading exact values.', status: 'Stable', examples: 1 },
  { slug: 'coordinate-readout', name: 'CoordinateReadout', category: 'Data', summary: 'Latitude, longitude and altitude in a glass readout — the signature HUD component.', status: 'New', examples: 1 },
  { slug: 'legend', name: 'Legend', category: 'Data', summary: 'Series key for charts and map layers, with optional counts.', status: 'Stable', examples: 1 },
  { slug: 'tabs', name: 'Tabs', category: 'Navigation', summary: 'Switch between sibling views without leaving the page.', status: 'Stable', examples: 2 },
  { slug: 'menu', name: 'Menu', category: 'Navigation', summary: 'A dropdown of actions for one object. Keyboard-driven, portalled, and never clipped by its parent.', status: 'Stable', examples: 2 },
  { slug: 'sidebar', name: 'Sidebar', category: 'Navigation', summary: 'The navigation spine: sections of rows, one active row, optional folding, optional icon rail.', status: 'New', examples: 2 },
  { slug: 'breadcrumb', name: 'Breadcrumb', category: 'Navigation', summary: 'Hierarchical location trail with monospace separators.', status: 'Stable', examples: 1 },
  { slug: 'pagination', name: 'Pagination', category: 'Navigation', summary: 'Page control that collapses long ranges around the current page.', status: 'Stable', examples: 1 },
  { slug: 'dropdown', name: 'Dropdown', category: 'Overlay', summary: 'A trigger with a floating panel of arbitrary content — filters, mini forms, detail cards.', status: 'New', examples: 2 },
  { slug: 'modal', name: 'Modal', category: 'Overlay', summary: 'Focused dialog for a decision or a short task.', status: 'Stable', examples: 1 },
  { slug: 'drawer', name: 'Drawer', category: 'Overlay', summary: 'Side panel for inspecting or editing one object without losing context.', status: 'Stable', examples: 1 },
  { slug: 'alert', name: 'Alert', category: 'Overlay', summary: 'Inline message tied to the content around it — not a toast.', status: 'Stable', examples: 1 },
  { slug: 'compass', name: 'Compass', category: 'HUD', summary: 'Camera heading indicator: a fixed card, a needle that tracks north.', status: 'New', examples: 1 },
  { slug: 'scale-bar', name: 'ScaleBar', category: 'HUD', summary: 'Map scale bracket with end caps and a mid tick.', status: 'New', examples: 1 },
  { slug: 'reasoning-trace', name: 'ReasoningTrace', category: 'AI', summary: 'The steps an agent took, as a collapsible list with per-step timing.', status: 'New', examples: 2 },
  { slug: 'tool-call', name: 'ToolCall', category: 'AI', summary: 'One tool invocation: name, arguments, status, duration and raw result.', status: 'New', examples: 1 },
  { slug: 'context-meter', name: 'ContextMeter', category: 'AI', summary: 'How much of the context window is spent, split by what spent it.', status: 'New', examples: 1 },
  { slug: 'message', name: 'Message', category: 'Chat', summary: 'One turn in a transcript, with role, timing and an optional streaming caret.', status: 'New', examples: 2 },
  { slug: 'composer', name: 'Composer', category: 'Chat', summary: 'The input line: attach, hint, counter, and send that becomes stop.', status: 'New', examples: 1 },
  { slug: 'typing-indicator', name: 'TypingIndicator', category: 'Chat', summary: 'Three dots and a caption: what the surface does while it waits.', status: 'New', examples: 1 },
  { slug: 'thread-list', name: 'ThreadList', category: 'Chat', summary: 'Conversations as rows: title, preview, time, unread count.', status: 'New', examples: 1 },
  { slug: 'quantity', name: 'Quantity', category: 'Science', summary: 'A measured value: digits, ± uncertainty, power of ten, unit.', status: 'New', examples: 2 },
  { slug: 'vector-readout', name: 'VectorReadout', category: 'Science', summary: 'Three components and a magnitude, sharing one decimal column.', status: 'New', examples: 1 },
  { slug: 'histogram', name: 'Histogram', category: 'Science', summary: 'Binned counts as a static SVG, linear or log, with an optional marker.', status: 'New', examples: 2 },
  { slug: 'event-display', name: 'EventDisplay', category: 'Science', summary: 'A transverse view of one collision: tracker, tracks and calorimeter towers.', status: 'New', examples: 1 },
  { slug: 'sequence-view', name: 'SequenceView', category: 'Science', summary: 'A wrapped nucleotide or protein sequence with a position ruler.', status: 'New', examples: 2 },
  { slug: 'dose-response', name: 'DoseResponse', category: 'Science', summary: 'A four-parameter dose–response curve on a log x axis, with IC50 marked.', status: 'New', examples: 1 },
];

export const navByCategory: Array<{ category: NavCategory; docs: NavEntry[] }> = [
  {
    category: 'Actions',
    docs: navEntries.filter((d) => d.category === 'Actions'),
  },
  {
    category: 'Forms',
    docs: navEntries.filter((d) => d.category === 'Forms'),
  },
  {
    category: 'Display',
    docs: navEntries.filter((d) => d.category === 'Display'),
  },
  {
    category: 'Layout',
    docs: navEntries.filter((d) => d.category === 'Layout'),
  },
  {
    category: 'Data',
    docs: navEntries.filter((d) => d.category === 'Data'),
  },
  {
    category: 'Navigation',
    docs: navEntries.filter((d) => d.category === 'Navigation'),
  },
  {
    category: 'Overlay',
    docs: navEntries.filter((d) => d.category === 'Overlay'),
  },
  {
    category: 'HUD',
    docs: navEntries.filter((d) => d.category === 'HUD'),
  },
  {
    category: 'AI',
    docs: navEntries.filter((d) => d.category === 'AI'),
  },
  {
    category: 'Chat',
    docs: navEntries.filter((d) => d.category === 'Chat'),
  },
  {
    category: 'Science',
    docs: navEntries.filter((d) => d.category === 'Science'),
  },
];

export const componentCount = navEntries.length;

export const findNavEntry = (slug: string): NavEntry | undefined =>
  navEntries.find((entry) => entry.slug === slug);
