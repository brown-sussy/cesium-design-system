/**
 * Public types for the Vue package.
 *
 * Component prop types live inline in each SFC (that is where Vue users read
 * them); what is collected here is the data shapes a caller has to name —
 * a column definition, a menu entry, a sidebar section — plus the unions that
 * show up in templates.
 */

export type { IconName } from './lib/icons';
export type { PopoverAlign, PopoverSide } from './lib/usePopover';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'subtle' | 'danger' | 'danger-ghost';

export type Tone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

export type AlertTone = 'accent' | 'success' | 'warning' | 'danger' | 'neutral';

/* data ------------------------------------------------------------------ */

export interface Column<T = Record<string, unknown>> {
  key: string;
  header: string;
  align?: 'left' | 'right';
  width?: string;
  mono?: boolean;
  primary?: boolean;
  /**
   * Text-only cell formatter. Rich cells are a scoped slot named
   * `cell-<key>` — see Table.vue.
   */
  render?: (row: T, index: number) => string | number;
}

export interface KeyValueItem {
  key: string;
  value: string | number;
  dim?: boolean;
}

export interface LegendItem {
  label: string;
  value?: string | number;
  color?: string;
  shape?: 'square' | 'line' | 'circle';
}

/* navigation ------------------------------------------------------------ */

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: import('./lib/icons').IconName;
  shortcut?: string;
  disabled?: boolean;
  /** Renders in the danger colour and tints its icon. */
  danger?: boolean;
  /** Turns the item into a `menuitemcheckbox`. */
  checked?: boolean;
}

/** A menu entry: an item, a hairline, or a group heading. */
export type MenuEntry = MenuItem | 'separator' | { header: string };

export interface SidebarItem {
  id: string;
  label: string;
  icon?: import('./lib/icons').IconName;
  /** Renders an anchor instead of a button. */
  href?: string;
  active?: boolean;
  disabled?: boolean;
  /** Count, status word, or a short marker. Hidden in collapsed mode. */
  badge?: string | number;
}

export interface SidebarGroup {
  id: string;
  /** Sub-heading inside a section — a category inside "Components". */
  title?: string;
  items: SidebarItem[];
}

export interface SidebarSection {
  id: string;
  /** Group heading. Omit for an unlabelled run of items. */
  title?: string;
  /** Trailing figure in the heading — a count, usually. */
  count?: string | number;
  /** Heading becomes a link. */
  href?: string;
  /** Heading becomes a toggle and the items fold away. */
  collapsible?: boolean;
  defaultOpen?: boolean;
  items?: SidebarItem[];
  /** One level of sub-headings, for taxonomies with categories. */
  groups?: SidebarGroup[];
}

/* forms ----------------------------------------------------------------- */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
  /** Right-aligned secondary text — a unit, a count, a key. */
  hint?: string | number;
}

export interface SegmentedOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/* ai / chat ------------------------------------------------------------- */

export type TraceStatus = 'pending' | 'active' | 'done' | 'failed';

export interface TraceStep {
  id: string;
  label: string;
  /** Secondary line — the query that was run, the file that was read. */
  detail?: string;
  status?: TraceStatus;
  time?: string;
}

export type ToolStatus = 'running' | 'done' | 'failed';

export type ContextTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

export interface ContextSegment {
  label: string;
  tokens: number;
  tone?: ContextTone;
}

export type MessageRole = 'user' | 'assistant' | 'system' | 'tool';

export interface MessageMeta {
  label: string;
  value: string | number;
}

export interface ThreadItem {
  id: string;
  title: string;
  preview?: string;
  time?: string;
  unread?: number;
}

/* science --------------------------------------------------------------- */

export interface HistogramBin {
  x0: number;
  x1: number;
  count: number;
}

export type SequenceKind = 'dna' | 'protein';

export interface DosePoint {
  x: number;
  y: number;
}

export interface EventTrack {
  /** Degrees, counter-clockwise from +x. */
  angle: number;
  /** 0–1 of the tracker radius. */
  length: number;
  /** +1 curves one way, −1 the other, 0 draws straight. */
  charge?: 1 | -1 | 0;
}

export interface EventHit {
  /** −1…1 of the detector radius. */
  x: number;
  y: number;
  r?: number;
}

export interface EventCalo {
  angle: number;
  /** 0–1 of the maximum tower height. */
  energy: number;
}
