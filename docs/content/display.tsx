import {
  Badge,
  Tag,
  Avatar,
  Kbd,
  KbdGroup,
  StatusDot,
  Spinner,
  Progress,
  Skeleton,
  SkeletonText,
  Divider,
  Tooltip,
  Icon,
  Button,
} from '@cesium-ds/core';
import type { ComponentDoc } from './types';

function BadgeTones() {
  return (
    <>
      <Badge>Draft</Badge>
      <Badge tone="accent" dot>
        Live
      </Badge>
      <Badge tone="success">Healthy</Badge>
      <Badge tone="warning">Degraded</Badge>
      <Badge tone="danger">Failed</Badge>
      <Badge tone="info">Queued</Badge>
      <Badge tone="accent" solid>
        v1.0
      </Badge>
    </>
  );
}

function TagDemo() {
  return (
    <>
      <Tag onRemove={() => {}}>terrain</Tag>
      <Tag accent onRemove={() => {}}>
        imagery
      </Tag>
      <Tag>3D Tiles</Tag>
      <Tag onRemove={() => {}}>labels</Tag>
    </>
  );
}

function AvatarDemo() {
  return (
    <>
      <Avatar name="Ada Lovelace" size="xs" />
      <Avatar name="Grace Hopper" size="sm" />
      <Avatar name="Katherine Johnson" status />
      <Avatar name="Margaret Hamilton" size="lg" accent />
      <Avatar name="Valerie Thomas" size="xl" square />
    </>
  );
}

function KbdDemo() {
  return (
    <>
      <KbdGroup keys={['⌘', 'K']} />
      <KbdGroup keys={['⇧', '⌘', 'P']} />
      <Kbd>Esc</Kbd>
      <Kbd>Enter</Kbd>
    </>
  );
}

function StatusDemo() {
  return (
    <div className="cs-stack" style={{ gap: 10 }}>
      <StatusDot tone="success" label="Stream connected" pulse />
      <StatusDot tone="accent" label="Syncing tiles" />
      <StatusDot tone="warning" label="Partial coverage" />
      <StatusDot tone="danger" label="Node unreachable" />
      <StatusDot label="Idle" />
    </div>
  );
}

function SpinnerDemo() {
  return (
    <>
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
      <Spinner size="lg" inherit style={{ color: 'var(--cs-success)' }} />
    </>
  );
}

function ProgressDemo() {
  return (
    <div className="cs-stack" style={{ width: 360, gap: 18 }}>
      <Progress label="Tiles decoded" value={68} showValue />
      <Progress label="Upload" value={100} tone="success" showValue />
      <Progress label="Cache warm" value={32} tone="warning" showValue />
      <Progress label="Streaming" indeterminate />
      <Progress value={54} thin />
    </div>
  );
}

function SkeletonDemo() {
  return (
    <div className="cs-row" style={{ width: 380, gap: 14, alignItems: 'flex-start' }}>
      <Skeleton variant="circle" width={36} height={36} />
      <div className="cs-grow cs-stack" style={{ gap: 8 }}>
        <Skeleton variant="text" width="45%" />
        <SkeletonText lines={2} />
      </div>
    </div>
  );
}

function DividerDemo() {
  return (
    <div className="cs-stack" style={{ width: 380, gap: 14 }}>
      <span className="cs-t-sm cs-dim">Camera</span>
      <Divider />
      <span className="cs-t-sm cs-dim">Scene</span>
      <Divider label="Advanced" />
      <div className="cs-row" style={{ height: 22, gap: 12 }}>
        <span className="cs-t-sm cs-dim">Latitude</span>
        <Divider orientation="vertical" />
        <span className="cs-t-sm cs-dim">Longitude</span>
        <Divider orientation="vertical" />
        <span className="cs-t-sm cs-dim">Height</span>
      </div>
    </div>
  );
}

function TooltipDemo() {
  return (
    <>
      <Tooltip content="Recompute the visible set" placement="top">
        <Button variant="secondary" size="sm">
          Hover top
        </Button>
      </Tooltip>
      <Tooltip content="Frame the selected entity" placement="bottom">
        <Button variant="secondary" size="sm">
          Hover bottom
        </Button>
      </Tooltip>
      <Tooltip content="Fly to coordinates" placement="right">
        <Button variant="secondary" size="sm">
          Hover right
        </Button>
      </Tooltip>
    </>
  );
}

function IconGrid() {
  const names = [
    'globe',
    'layers',
    'box',
    'compass',
    'map-pin',
    'crosshair',
    'gauge',
    'activity',
    'search',
    'sliders',
    'table',
    'code',
    'terminal',
    'palette',
    'type',
    'ruler',
    'zap',
    'sparkles',
    'download',
    'external',
    'grid',
    'book',
    'play',
    'plus',
    'minus',
    'check',
    'close',
    'chevron-right',
  ] as const;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 44px)', gap: 8 }}>
      {names.map((n) => (
        <div
          key={n}
          title={n}
          style={{
            display: 'grid',
            placeItems: 'center',
            height: 40,
            border: '1px solid var(--cs-border-subtle)',
            borderRadius: 4,
            background: 'var(--cs-bg-surface)',
            color: 'var(--cs-text-secondary)',
          }}
        >
          <Icon name={n} size={16} />
        </div>
      ))}
    </div>
  );
}

export const display: ComponentDoc[] = [
  {
    slug: 'badge',
    name: 'Badge',
    category: 'Display',
    status: 'Stable',
    summary: 'Compact status or category marker. Monospace, uppercase, 19px tall.',
    intro:
      'Badges are metadata, not actions. They never carry a click handler and never compete with the primary action — which is why they are set in monospace uppercase at 10px.',
    examples: [
      {
        title: 'Tones',
        description: 'Six semantic tones plus a solid variant for the strongest signal.',
        code: `<Badge>Draft</Badge>
<Badge tone="accent" dot>Live</Badge>
<Badge tone="success">Healthy</Badge>
<Badge tone="warning">Degraded</Badge>
<Badge tone="danger">Failed</Badge>
<Badge tone="info">Queued</Badge>`,
        render: BadgeTones,
      },
    ],
    props: [
      { name: 'tone', type: "'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'", default: "'neutral'", description: 'Semantic colour.' },
      { name: 'dot', type: 'boolean', default: 'false', description: 'Leading 4px dot.' },
      { name: 'solid', type: 'boolean', default: 'false', description: 'Filled accent badge for the strongest emphasis.' },
    ],
    a11y: ['Colour alone must not carry meaning — the label always states the status.', 'Badges are not focusable.'],
    related: ['tag', 'status-dot'],
  },

  {
    slug: 'tag',
    name: 'Tag',
    category: 'Display',
    status: 'Stable',
    summary: 'Applied filter or category chip, optionally removable.',
    examples: [
      {
        title: 'Removable',
        description: 'The remove control is a 14px hit area inside the chip, not a separate button.',
        code: `<Tag onRemove={() => {}}>terrain</Tag>
<Tag accent onRemove={() => {}}>imagery</Tag>
<Tag>3D Tiles</Tag>`,
        render: TagDemo,
      },
    ],
    props: [
      { name: 'accent', type: 'boolean', default: 'false', description: 'Tinted accent treatment for active filters.' },
      { name: 'onRemove', type: '() => void', default: '—', description: 'Renders a dismiss control when provided.' },
      { name: 'icon', type: 'ReactNode', default: '—', description: 'Optional leading icon.' },
    ],
    a11y: ['The remove control has an aria-label and stops click propagation.'],
    related: ['badge'],
  },

  {
    slug: 'avatar',
    name: 'Avatar',
    category: 'Display',
    status: 'Stable',
    summary: 'Identity chip with initials fallback, five sizes and an optional presence dot.',
    examples: [
      {
        title: 'Sizes and shapes',
        description: 'Initials are set in monospace so two-letter fallbacks stay optically even.',
        code: `<Avatar name="Ada Lovelace" size="xs" />
<Avatar name="Katherine Johnson" status />
<Avatar name="Margaret Hamilton" size="lg" accent />
<Avatar name="Valerie Thomas" size="xl" square />`,
        render: AvatarDemo,
      },
    ],
    props: [
      { name: 'name', type: 'string', default: "''", description: 'Used for initials, alt text and title.' },
      { name: 'src', type: 'string', default: '—', description: 'Image URL; falls back to initials.' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: '22 to 56px.' },
      { name: 'square', type: 'boolean', default: 'false', description: 'Rounded square instead of circle.' },
      { name: 'status', type: 'boolean', default: 'false', description: 'Presence dot at the lower right.' },
    ],
    a11y: ['The image carries the name as alt text; initials are decorative when a title exists.'],
    related: ['badge', 'status-dot'],
  },

  {
    slug: 'kbd',
    name: 'Kbd',
    category: 'Display',
    status: 'Stable',
    summary: 'Keyboard shortcut keycap, with a grouped variant for chords.',
    examples: [
      {
        title: 'Keys and chords',
        description: 'Use the platform glyphs (⌘, ⇧, ⌥) rather than words.',
        code: `<KbdGroup keys={['⌘', 'K']} />
<KbdGroup keys={['⇧', '⌘', 'P']} />
<Kbd>Esc</Kbd>`,
        render: KbdDemo,
      },
    ],
    props: [
      { name: 'children', type: 'string', default: '—', description: 'Single key glyph or label.' },
      { name: 'keys', type: 'string[]', default: '—', description: 'KbdGroup: keys joined with a plus sign.' },
    ],
    a11y: ['Renders a native <kbd> element.', 'Never rely on a shortcut alone — also expose it in a menu.'],
    related: ['tooltip'],
  },

  {
    slug: 'status-dot',
    name: 'StatusDot',
    category: 'Display',
    status: 'Stable',
    summary: 'Six-pixel presence indicator with an optional pulse for live states.',
    examples: [
      {
        title: 'Tones',
        description: 'Reserve the pulse for genuinely live streams — it loses meaning if everything pulses.',
        code: `<StatusDot tone="success" label="Stream connected" pulse />
<StatusDot tone="accent" label="Syncing tiles" />
<StatusDot tone="warning" label="Partial coverage" />
<StatusDot tone="danger" label="Node unreachable" />`,
        render: StatusDemo,
        align: 'start',
      },
    ],
    props: [
      { name: 'tone', type: "'neutral' | 'accent' | 'success' | 'warning' | 'danger'", default: "'neutral'", description: 'Indicator colour.' },
      { name: 'label', type: 'ReactNode', default: '—', description: 'Text beside the dot.' },
      { name: 'pulse', type: 'boolean', default: 'false', description: '2s expanding halo animation.' },
    ],
    a11y: ['Pair the dot with a text label; a bare dot is not announced.', 'Motion respects prefers-reduced-motion.'],
    related: ['badge', 'spinner'],
  },

  {
    slug: 'spinner',
    name: 'Spinner',
    category: 'Display',
    status: 'Stable',
    summary: 'Indeterminate progress for waits under roughly two seconds.',
    examples: [
      {
        title: 'Sizes',
        description: 'The inherit variant takes the surrounding text colour, useful inside buttons and alerts.',
        code: `<Spinner size="sm" />
<Spinner />
<Spinner size="lg" />`,
        render: SpinnerDemo,
      },
    ],
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '11, 14 or 22px.' },
      { name: 'inherit', type: 'boolean', default: 'false', description: 'Uses currentColor instead of the accent.' },
    ],
    a11y: ['Carries role="status" and an accessible label.', 'For waits over two seconds, add context text.'],
    related: ['progress', 'skeleton'],
  },

  {
    slug: 'progress',
    name: 'Progress',
    category: 'Display',
    status: 'Stable',
    summary: 'Determinate or indeterminate progress bar with an optional labelled readout.',
    examples: [
      {
        title: 'Determinate and indeterminate',
        description: 'The bar glows faintly while active; the glow is removed for semantic tones so colour stays legible.',
        code: `<Progress label="Tiles decoded" value={68} showValue />
<Progress label="Upload" value={100} tone="success" showValue />
<Progress label="Streaming" indeterminate />
<Progress value={54} thin />`,
        render: ProgressDemo,
        align: 'start',
      },
    ],
    props: [
      { name: 'value / max', type: 'number', default: '0 / 100', description: 'Progress values.' },
      { name: 'tone', type: "'accent' | 'success' | 'warning' | 'danger'", default: "'accent'", description: 'Fill colour.' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Unknown duration animation.' },
      { name: 'thin', type: 'boolean', default: 'false', description: '3px track for table rows and headers.' },
      { name: 'showValue', type: 'boolean', default: 'false', description: 'Monospace percentage on the right.' },
    ],
    a11y: ['Sets role="progressbar" with aria-valuenow/min/max; indeterminate omits the value.'],
    related: ['spinner', 'skeleton', 'stat'],
  },

  {
    slug: 'skeleton',
    name: 'Skeleton',
    category: 'Display',
    status: 'Stable',
    summary: 'Layout-stable placeholder shown while content loads.',
    examples: [
      {
        title: 'Composition',
        description: 'Match the skeleton to the real layout — a wrong skeleton is worse than a spinner.',
        code: `<Skeleton variant="circle" width={36} height={36} />
<Skeleton variant="text" width="45%" />
<SkeletonText lines={2} />`,
        render: SkeletonDemo,
      },
    ],
    props: [
      { name: 'variant', type: "'text' | 'circle' | 'rect'", default: "'text'", description: 'Shape preset.' },
      { name: 'width / height', type: 'number | string', default: '—', description: 'Explicit dimensions.' },
      { name: 'lines', type: 'number', default: '3', description: 'SkeletonText only: number of rows.' },
    ],
    a11y: ['Decorative and aria-hidden; announce loading state separately.'],
    related: ['spinner', 'progress'],
  },

  {
    slug: 'divider',
    name: 'Divider',
    category: 'Display',
    status: 'Stable',
    summary: 'Hairline separation, optionally with a centred label or vertical orientation.',
    examples: [
      {
        title: 'Horizontal and vertical',
        description: 'The label variant is set in monospace uppercase — a quiet section marker.',
        code: `<Divider />
<Divider label="Advanced" />
<Divider orientation="vertical" />`,
        render: DividerDemo,
        align: 'start',
      },
    ],
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Direction of the rule.' },
      { name: 'label', type: 'ReactNode', default: '—', description: 'Centred label between two rules.' },
    ],
    a11y: ['Renders role="separator" with the correct orientation.'],
    related: ['card', 'panel'],
  },

  {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'Display',
    status: 'Stable',
    summary: 'Short contextual label shown on hover or focus.',
    examples: [
      {
        title: 'Placements',
        description: 'Tooltips open on focus-within too, so keyboard users get the same information.',
        code: `<Tooltip content="Recompute the visible set" placement="top">
  <Button variant="secondary" size="sm">Hover top</Button>
</Tooltip>`,
        render: TooltipDemo,
      },
    ],
    props: [
      { name: 'content', type: 'ReactNode', default: '—', description: 'Tooltip body, kept to one short line.' },
      { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Preferred side.' },
      { name: 'align', type: "'center' | 'end'", default: "'center'", description: 'End-aligns the bubble — for controls at the right edge.' },
    ],
    a11y: [
      'The tooltip carries role="tooltip" and opens on focus-within.',
      'Never put interactive content inside a tooltip — use a popover instead.',
      'Avoid for essential information; tooltips are not available to touch users.',
    ],
    related: ['kbd', 'icon'],
  },

  {
    slug: 'icon',
    name: 'Icon',
    category: 'Display',
    status: 'Stable',
    summary: 'Forty-four stroke icons on a 24px grid at 1.5px, sized by a single prop.',
    intro:
      'The icon set is geometric and instrument-like: circles, crosshairs, chevrons. Icons inherit currentColor and are always decorative — the accessible name lives on the control.',
    examples: [
      {
        title: 'Set',
        description: 'Sizes 12–16px in UI, 20px for empty states. Never scale a 24px glyph below 12px.',
        code: `<Icon name="globe" size={16} />
<Icon name="layers" size={16} />
<Icon name="crosshair" size={16} />`,
        render: IconGrid,
      },
    ],
    props: [
      { name: 'name', type: 'IconName', default: '—', description: 'One of the 44 named glyphs.' },
      { name: 'size', type: 'number', default: '16', description: 'Rendered square size in px.' },
      { name: 'strokeWidth', type: 'number', default: '1.5', description: 'Stroke weight; 2 for 10px marks.' },
    ],
    a11y: ['aria-hidden by default; label the parent control instead.'],
    related: ['button', 'tooltip'],
  },
];
