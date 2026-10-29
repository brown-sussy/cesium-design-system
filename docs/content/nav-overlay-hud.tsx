import { useState } from 'react';
import {
  Tabs,
  Breadcrumb,
  Pagination,
  Modal,
  Drawer,
  Alert,
  Compass,
  ScaleBar,
  Button,
  Input,
  Field,
  KeyValue,
  Slider,
  Badge,
  Icon,
  SegmentedControl,
  Menu,
  Sidebar,
  Dropdown,
  DropdownHeader,
  DropdownFooter,
  Checkbox,
} from '@cesium-ds/core';
import type { ComponentDoc } from './types';

function TabsDemo() {
  const [tab, setTab] = useState('layers');
  return (
    <div style={{ width: 420 }}>
      <Tabs
        value={tab}
        onChange={setTab}
        items={[
          { id: 'layers', label: 'Layers', count: 12 },
          { id: 'entities', label: 'Entities', count: 340 },
          { id: 'sources', label: 'Sources' },
        ]}
      />
      <div style={{ paddingTop: 14 }} className="cs-t-sm cs-dimmer cs-mono">
        active: {tab}
      </div>
    </div>
  );
}

function TabsEnclosed() {
  const [tab, setTab] = useState('3d');
  return (
    <Tabs
      variant="enclosed"
      value={tab}
      onChange={setTab}
      items={[
        { id: '2d', label: '2D' },
        { id: '3d', label: '3D' },
        { id: 'cv', label: 'Columbus' },
      ]}
    />
  );
}

function BreadcrumbDemo() {
  return (
    <Breadcrumb
      items={[
        { label: 'Workspaces', href: '#' },
        { label: 'Orbital Ops', href: '#' },
        { label: 'Assets', href: '#' },
        { label: 'World Terrain' },
      ]}
    />
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(3);
  return <Pagination page={page} pageCount={12} onChange={setPage} showMeta total={2480} pageSize={50} />;
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Open dialog
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Attach imagery layer"
        description="Layers are streamed on demand and cached at the edge."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Attach layer
            </Button>
          </>
        }
      >
        <div className="cs-stack" style={{ gap: 14 }}>
          <Field label="Layer URL" hint="Must be a CORS-enabled tile endpoint." htmlFor="m-url">
            <Input id="m-url" prefixText="https://" placeholder="tiles.cesium.dev/s2" />
          </Field>
          <Field label="Maximum level" htmlFor="m-lvl">
            <Input id="m-lvl" defaultValue="16" suffixText="lvl" />
          </Field>
        </div>
      </Modal>
    </>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open inspector
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Entity inspector"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button variant="primary">Fly to</Button>
          </>
        }
      >
        <div className="cs-stack" style={{ gap: 18 }}>
          <div className="cs-row" style={{ gap: 10 }}>
            <Badge tone="accent">Polygon</Badge>
            <Badge>Draft</Badge>
          </div>
          <KeyValue
            items={[
              { key: 'Entity id', value: 'ent_8f21' },
              { key: 'Vertices', value: '24' },
              { key: 'Area', value: '12.4 km²' },
              { key: 'Height', value: 'clamped' },
            ]}
          />
          <Field label="Label" htmlFor="d-label">
            <Input id="d-label" defaultValue="North ridge" />
          </Field>
        </div>
      </Drawer>
    </>
  );
}

function AlertDemo() {
  return (
    <div className="cs-stack" style={{ width: 460, gap: 10 }}>
      <Alert tone="accent" title="Token expires in 6 days">
        Rotate the workspace token before 2026-11-01 to avoid interrupted tile streams.
      </Alert>
      <Alert tone="success" title="Tileset validated" />
      <Alert tone="warning" title="Partial coverage">
        3 of 48 tiles failed to decode at level 18.
      </Alert>
      <Alert tone="danger" title="Endpoint unreachable" onClose={() => {}}>
        tiles.cesium.dev did not respond within 5s.
      </Alert>
    </div>
  );
}

function CompassDemo() {
  const [heading, setHeading] = useState(28);
  return (
    <div className="cs-row" style={{ gap: 28 }}>
      <Compass heading={heading} size={96} />
      <div style={{ width: 220 }}>
        <Slider value={heading} min={0} max={359} onValueChange={setHeading} showValue formatValue={(v) => `${v}°`} />
      </div>
    </div>
  );
}

function ScaleBarDemo() {
  return (
    <div className="cs-row" style={{ gap: 28, alignItems: 'flex-end' }}>
      <ScaleBar distance={500} unit="km" width={148} />
      <ScaleBar distance={2} unit="km" width={96} />
      <ScaleBar distance={250} unit="m" width={64} />
    </div>
  );
}

function MenuDemo() {
  const [sort, setSort] = useState('name');
  const [last, setLast] = useState('nothing yet');

  return (
    <div className="cs-row" style={{ gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
      <Menu
        label="Layer actions"
        icon="sliders"
        items={[
          { header: 'Sort by' },
          { id: 'name', label: 'Name', checked: sort === 'name', onSelect: () => setSort('name') },
          { id: 'size', label: 'Size', checked: sort === 'size', onSelect: () => setSort('size') },
          { id: 'updated', label: 'Last updated', checked: sort === 'updated', onSelect: () => setSort('updated') },
          'separator',
          { id: 'export', label: 'Export GeoJSON', icon: 'download', shortcut: '\u2318E', onSelect: () => setLast('Export') },
          { id: 'duplicate', label: 'Duplicate layer', icon: 'copy', shortcut: '\u2318D', onSelect: () => setLast('Duplicate') },
          { id: 'archive', label: 'Archive', icon: 'box', disabled: true },
          'separator',
          { id: 'delete', label: 'Delete layer', icon: 'close', danger: true, onSelect: () => setLast('Delete') },
        ]}
      />
      <span className="cs-t-xs cs-dimmer">
        sorted by {sort} · last action: {last}
      </span>
    </div>
  );
}

function MenuAlignDemo() {
  const [density, setDensity] = useState('comfortable');

  return (
    <div className="cs-row" style={{ gap: 12, width: '100%', justifyContent: 'flex-end' }}>
      <Menu
        align="end"
        label="View options"
        trigger={<Icon name="menu" size={14} />}
        items={[
          { header: 'Row density' },
          { id: 'compact', label: 'Compact', checked: density === 'compact', onSelect: () => setDensity('compact') },
          { id: 'comfortable', label: 'Comfortable', checked: density === 'comfortable', onSelect: () => setDensity('comfortable') },
          'separator',
          { id: 'columns', label: 'Choose columns\u2026', icon: 'grid' },
          { id: 'reset', label: 'Reset view', icon: 'compass' },
        ]}
      />
    </div>
  );
}

function SidebarDemo() {
  const [active, setActive] = useState('layers');
  const nav = (id: string) => ({ active: active === id, onSelect: () => setActive(id) });

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        maxWidth: 640,
        height: 440,
        border: '1px solid var(--cs-border)',
        borderRadius: 'var(--cs-radius-lg)',
        overflow: 'hidden',
      }}
    >
      <Sidebar
        label="Project"
        sections={[
          {
            id: 'workspace',
            title: 'Workspace',
            items: [
              { id: 'layers', label: 'Layers', icon: 'layers', badge: 12, ...nav('layers') },
              { id: 'assets', label: 'Assets', icon: 'box', badge: 48, ...nav('assets') },
              { id: 'imagery', label: 'Imagery', icon: 'globe', ...nav('imagery') },
            ],
          },
          {
            id: 'analysis',
            title: 'Analysis',
            collapsible: true,
            items: [
              { id: 'measure', label: 'Measure', icon: 'ruler', ...nav('measure') },
              { id: 'viewshed', label: 'Viewshed', icon: 'crosshair', ...nav('viewshed') },
              { id: 'timeline', label: 'Timeline', icon: 'activity', ...nav('timeline') },
            ],
          },
          {
            id: 'settings',
            title: 'Settings',
            items: [
              { id: 'tokens', label: 'Tokens', icon: 'palette', ...nav('tokens') },
              { id: 'export', label: 'Export', icon: 'download', disabled: true },
            ],
          },
        ]}
        footer={<span className="cs-t-2xs cs-mono cs-dimmer">v1.0.0</span>}
      />
      <div style={{ flex: 1, background: 'var(--cs-bg-canvas)' }} />
    </div>
  );
}

function SidebarRailDemo() {
  const [collapsed, setCollapsed] = useState(true);
  const [active, setActive] = useState('layers');
  const nav = (id: string) => ({ active: active === id, onSelect: () => setActive(id) });

  return (
    <div className="cs-stack" style={{ width: '100%', maxWidth: 640, gap: 10 }}>
      <div>
        <Button size="sm" variant="secondary" onClick={() => setCollapsed((v) => !v)}>
          {collapsed ? 'Expand rail' : 'Collapse to rail'}
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          height: 300,
          border: '1px solid var(--cs-border)',
          borderRadius: 'var(--cs-radius-lg)',
          overflow: 'hidden',
        }}
      >
        <Sidebar
          collapsed={collapsed}
          label="Project"
          sections={[
            {
              id: 'workspace',
              title: 'Workspace',
              items: [
                { id: 'layers', label: 'Layers', icon: 'layers', ...nav('layers') },
                { id: 'assets', label: 'Assets', icon: 'box', ...nav('assets') },
                { id: 'imagery', label: 'Imagery', icon: 'globe', ...nav('imagery') },
              ],
            },
            {
              id: 'analysis',
              title: 'Analysis',
              items: [
                { id: 'measure', label: 'Measure', icon: 'ruler', ...nav('measure') },
                { id: 'viewshed', label: 'Viewshed', icon: 'crosshair', ...nav('viewshed') },
              ],
            },
          ]}
        />
        <div style={{ flex: 1, background: 'var(--cs-bg-canvas)' }} />
      </div>
    </div>
  );
}

function DropdownDemo() {
  const [layers, setLayers] = useState({ terrain: true, imagery: true, labels: false });
  const toggle = (key: keyof typeof layers) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setLayers({ ...layers, [key]: e.target.checked });
  const count = Object.values(layers).filter(Boolean).length;

  return (
    <Dropdown
      label="Filters"
      width={252}
      trigger={
        <>
          <Icon name="sliders" size={14} />
          Filters
        </>
      }
    >
      <DropdownHeader title="Visible layers" hint={`${count} of 3`} />
      <div className="cs-stack" style={{ gap: 9 }}>
        <Checkbox label="Terrain" checked={layers.terrain} onChange={toggle('terrain')} />
        <Checkbox label="Imagery" checked={layers.imagery} onChange={toggle('imagery')} />
        <Checkbox label="Labels" checked={layers.labels} onChange={toggle('labels')} />
      </div>
      <DropdownFooter>
        <Button size="sm" variant="ghost" data-dropdown-close>
          Reset
        </Button>
        <Button size="sm" variant="primary" data-dropdown-close>
          Apply
        </Button>
      </DropdownFooter>
    </Dropdown>
  );
}

function DropdownDetailDemo() {
  return (
    <div className="cs-row" style={{ width: '100%', justifyContent: 'flex-end' }}>
      <Dropdown
        align="end"
        label="Layer details"
        width={262}
        trigger={<Icon name="info" size={14} />}
      >
        <DropdownHeader title="Sentinel-2 cloudless" hint="tileset · 4.1 GB" />
        <KeyValue
          items={[
            { key: 'Added', value: '2026-10-14' },
            { key: 'CRS', value: 'EPSG:3857' },
            { key: 'Max SSE', value: '16' },
            { key: 'Tiles', value: '184,320' },
          ]}
        />
      </Dropdown>
    </div>
  );
}

export const navOverlayHud: ComponentDoc[] = [  {
    slug: 'tabs',
    name: 'Tabs',
    category: 'Navigation',
    status: 'Stable',
    summary: 'Switch between sibling views without leaving the page.',
    examples: [
      {
        title: 'Underline',
        description:
          'The indicator is a 2px accent bar the full width of the tab, sitting on the hairline. It is measured in JS so it slides rather than fades.',
        code: `<Tabs
  value={tab}
  onChange={setTab}
  items={[
    { id: 'layers', label: 'Layers', count: 12 },
    { id: 'entities', label: 'Entities', count: 340 },
  ]}
/>`,
        render: TabsDemo,
      },
      {
        title: 'Enclosed',
        description: 'Use enclosed tabs inside a panel header where the tab set is a control, not navigation.',
        code: `<Tabs variant="enclosed" value={tab} onChange={setTab} items={[...]} />`,
        render: TabsEnclosed,
      },
    ],
    props: [
      { name: 'items', type: 'TabItem[]', default: '—', description: 'id, label, optional count and icon.' },
      { name: 'value', type: 'string', default: '—', description: 'Active tab id.' },
      { name: 'onChange', type: '(id: string) => void', default: '—', description: 'Selection handler.' },
      { name: 'variant', type: "'underline' | 'enclosed'", default: "'underline'", description: 'Visual treatment.' },
    ],
    a11y: ['role="tablist" with aria-selected; pair with role="tabpanel" in your content area.'],
    related: ['segmented-control', 'breadcrumb'],
  },

  {
    slug: 'menu',
    name: 'Menu',
    category: 'Navigation',
    status: 'Stable',
    summary: 'A dropdown of actions for one object. Keyboard-driven, portalled, and never clipped by its parent.',
    examples: [
      {
        title: 'Actions',
        description:
          'Items can be plain actions, checkable state, disabled, or destructive. Shortcuts render as keycaps on the right.',
        code: `<Menu
  label="Layer actions"
  icon="sliders"
  items={[
    { header: 'Sort by' },
    { id: 'name', label: 'Name', checked: true },
    'separator',
    { id: 'export', label: 'Export GeoJSON', icon: 'download', shortcut: '\u2318E' },
    { id: 'delete', label: 'Delete layer', danger: true },
  ]}
/>`,
        render: MenuDemo,
        align: 'start',
      },
      {
        title: 'Aligned to the end',
        description:
          'align="end" pins the menu to the trigger\u2019s right edge \u2014 use it for toolbars and table row actions. The list flips upward when it would overflow the viewport.',
        code: `<Menu align="end" label="View options" trigger={<Icon name="menu" />} items={[...]} />`,
        render: MenuAlignDemo,
      },
    ],
    props: [
      { name: 'items', type: 'MenuEntry[]', default: '\u2014', description: "Items, 'separator' strings, or { header } group labels." },
      { name: 'label', type: 'string', default: '\u2014', description: 'Accessible name; also the default trigger text.' },
      { name: 'icon', type: 'IconName', default: '\u2014', description: 'Leading icon on the default trigger.' },
      { name: 'trigger', type: 'ReactNode', default: '\u2014', description: 'Replaces the trigger contents (icon-only, avatar, custom).' },
      { name: 'align', type: "'start' | 'end'", default: "'start'", description: 'Which trigger edge the menu aligns to.' },
      { name: 'width', type: 'number', default: 'trigger width', description: 'Minimum menu width in px.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the trigger.' },
    ],
    a11y: [
      'The trigger carries aria-haspopup="menu", aria-expanded and aria-controls.',
      'Roving focus: ArrowUp/ArrowDown cycle, Home/End jump, Esc closes and returns focus to the trigger.',
      'Checkable items use role="menuitemcheckbox" with aria-checked, not a tick icon alone.',
    ],
    related: ['button', 'tabs', 'tooltip'],
  },

  {
    slug: 'sidebar',
    name: 'Sidebar',
    category: 'Navigation',
    status: 'New',
    summary: 'The navigation spine: sections of rows, one active row, optional folding, optional icon rail.',
    intro:
      'A sidebar is where a geospatial product puts its object model — layers, assets, analysis tools. It needs three things a generic list does not: a travelling active indicator, section folding that does not jump the scroll position, and a rail mode narrow enough to give the globe the screen back.',
    examples: [
      {
        title: 'Sections',
        description:
          'Folding is a 0fr → 1fr grid transition, so nothing is measured and nothing jumps. The accent tick is positioned from the active row, which means it slides when the route changes.',
        code: `<Sidebar
  label="Project"
  sections={[
    {
      id: 'workspace',
      title: 'Workspace',
      items: [
        { id: 'layers', label: 'Layers', icon: 'layers', badge: 12, active: true },
        { id: 'assets', label: 'Assets', icon: 'box', badge: 48 },
      ],
    },
    {
      id: 'analysis',
      title: 'Analysis',
      collapsible: true,
      items: [{ id: 'measure', label: 'Measure', icon: 'ruler' }],
    },
  ]}
  footer={<span>v1.0.0</span>}
/>`,
        render: SidebarDemo,
        align: 'start',
      },
      {
        title: 'Icon rail',
        description:
          'Collapsed mode is 56px. Labels move into a flyout drawn by the system — not the browser\u2019s `title` bubble, which waits a second and ignores the theme.',
        code: `<Sidebar collapsed sections={sections} />`,
        render: SidebarRailDemo,
        align: 'start',
      },
    ],
    props: [
      { name: 'sections', type: 'SidebarSection[]', default: '—', description: 'id, title?, count?, collapsible?, defaultOpen?, items.' },
      { name: 'items', type: 'SidebarItem[]', default: '—', description: 'id, label, icon?, href?, badge?, active?, disabled?, onSelect?' },
      { name: 'collapsed', type: 'boolean', default: 'false', description: '56px icon rail with flyout labels.' },
      { name: 'rail', type: 'boolean', default: 'true', description: 'Travelling accent tick on the active row.' },
      { name: 'header / footer', type: 'ReactNode', default: '—', description: 'Pinned above and below the scrolling nav.' },
      { name: 'width', type: 'number', default: 'sidebar-w token', description: 'Overrides the token width.' },
    ],
    a11y: [
      'A single <nav> landmark with aria-label; the active row carries aria-current="page".',
      'ArrowUp/ArrowDown move between rows, Home/End jump to the ends — focus stays in the nav.',
      'Folding is aria-expanded on the section toggle with aria-controls pointing at the group.',
    ],
    guidance: {
      do: [
        'Keep one active row — the tick, the tint, and aria-current all point at the same place.',
        'Let the nav reveal itself: on first paint it parks the active row\u2019s heading at the top, so the hierarchy stays readable.',
      ],
      dont: [
        'Don\u2019t put more than a dozen destinations in the rail — the flyout turns hovering into reading.',
        'Don\u2019t pin the active row to the bottom edge with a minimal scroll; the reader lands on a stray label.',
      ],
    },
    related: ['menu', 'tabs', 'breadcrumb'],
  },


  {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    category: 'Navigation',
    status: 'Stable',
    summary: 'Hierarchical location trail with monospace separators.',
    examples: [
      {
        title: 'Trail',
        description: 'The last item is the current page and is not a link.',
        code: `<Breadcrumb items={[
  { label: 'Workspaces', href: '#' },
  { label: 'Orbital Ops', href: '#' },
  { label: 'World Terrain' },
]} />`,
        render: BreadcrumbDemo,
        align: 'start',
      },
    ],
    props: [
      { name: 'items', type: 'BreadcrumbItem[]', default: '—', description: 'label, optional href or onClick.' },
      { name: 'separator', type: 'ReactNode', default: "'/'", description: 'Separator glyph.' },
    ],
    a11y: ['Wrapped in nav with aria-label="Breadcrumb"; the last item gets aria-current="page".'],
    related: ['tabs', 'pagination'],
  },

  {
    slug: 'pagination',
    name: 'Pagination',
    category: 'Navigation',
    status: 'Stable',
    summary: 'Page control that collapses long ranges around the current page.',
    examples: [
      {
        title: 'With record count',
        code: `<Pagination page={page} pageCount={12} onChange={setPage} showMeta total={2480} pageSize={50} />`,
        render: PaginationDemo,
      },
    ],
    props: [
      { name: 'page / pageCount', type: 'number', default: '—', description: 'Current page and total pages.' },
      { name: 'onChange', type: '(page: number) => void', default: '—', description: 'Page change handler.' },
      { name: 'showMeta', type: 'boolean', default: 'false', description: 'Shows total records and page size.' },
    ],
    a11y: ['Current page uses aria-current="page"; prev/next have labels and disabled states.'],
    related: ['table'],
  },

  {
    slug: 'dropdown',
    name: 'Dropdown',
    category: 'Overlay',
    status: 'New',
    summary: 'A trigger with a floating panel of arbitrary content — filters, mini forms, detail cards.',
    intro:
      'Menu is for verbs; Dropdown is for surfaces. The panel holds whatever you put in it, takes focus on open, and hands focus back on close. Use it when the thing behind the trigger needs controls, not a list of actions.',
    examples: [
      {
        title: 'Filter panel',
        description:
          'Header and footer are sticky. Anything marked `data-dropdown-close` dismisses the panel — Apply and Reset both do.',
        code: `<Dropdown label="Filters" width={252} trigger={<><Icon name="sliders" /> Filters</>}>
  <DropdownHeader title="Visible layers" hint="2 of 3" />
  <Checkbox label="Terrain" checked={layers.terrain} onChange={...} />
  <DropdownFooter>
    <Button size="sm" variant="ghost" data-dropdown-close>Reset</Button>
    <Button size="sm" variant="primary" data-dropdown-close>Apply</Button>
  </DropdownFooter>
</Dropdown>`,
        render: DropdownDemo,
        align: 'start',
      },
      {
        title: 'Detail card',
        description: 'align="end" pins the panel to the trigger\u2019s right edge — the right call for row-level inspectors.',
        code: `<Dropdown align="end" label="Layer details" width={262} trigger={<Icon name="info" />}>
  <DropdownHeader title="Sentinel-2 cloudless" hint="tileset · 4.1 GB" />
  <KeyValue items={rows} />
</Dropdown>`,
        render: DropdownDetailDemo,
        align: 'start',
      },
    ],
    props: [
      { name: 'trigger', type: 'ReactNode', default: '—', description: 'Contents of the trigger button.' },
      { name: 'children', type: 'ReactNode', default: '—', description: 'Panel content — any component.' },
      { name: 'label', type: 'string', default: '—', description: 'Accessible name for the panel and trigger.' },
      { name: 'align', type: "'start' | 'end'", default: "'start'", description: 'Which trigger edge the panel hangs from.' },
      { name: 'side', type: "'bottom' | 'top' | 'auto'", default: "'bottom'", description: 'Preferred side; flips when there is no room.' },
      { name: 'width', type: 'number', default: 'content', description: 'Minimum panel width in px.' },
      { name: 'matchWidth', type: 'boolean', default: 'false', description: 'Panel takes the trigger width.' },
      { name: 'closeOnAction', type: 'boolean', default: 'true', description: 'Honours data-dropdown-close descendants.' },
      { name: 'open / onOpenChange', type: 'boolean / fn', default: '—', description: 'Controlled open state.' },
    ],
    a11y: [
      'The panel is role="dialog" with an aria-label and tabIndex={-1}; the trigger carries aria-haspopup="dialog".',
      'Focus moves to the first control on open and returns to the trigger on Esc.',
      'Outside click and scroll-away both close it; the panel is portalled, so no parent can clip it.',
    ],
    related: ['menu', 'select', 'modal'],
  },

  {
    slug: 'modal',
    name: 'Modal',
    category: 'Overlay',
    status: 'Stable',
    summary: 'Focused dialog for a decision or a short task.',
    intro:
      'The overlay blurs and saturates the scene behind it — the content stays visible but unmistakably inactive. Escape closes, focus moves into the panel, and body scroll is locked while open.',
    examples: [
      {
        title: 'Form dialog',
        description: 'Keep dialogs to one decision. Long forms belong in a drawer or a page.',
        code: `<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Attach imagery layer"
  description="Layers are streamed on demand and cached at the edge."
  footer={<>
    <Button variant="ghost" onClick={close}>Cancel</Button>
    <Button variant="primary" onClick={close}>Attach layer</Button>
  </>}
>
  <Field label="Layer URL"><Input prefixText="https://" /></Field>
</Modal>`,
        render: ModalDemo,
      },
    ],
    props: [
      { name: 'open', type: 'boolean', default: 'false', description: 'Visibility.' },
      { name: 'onClose', type: '() => void', default: '—', description: 'Called on Escape, overlay click or close button.' },
      { name: 'title / description', type: 'ReactNode', default: '—', description: 'Header content.' },
      { name: 'footer', type: 'ReactNode', default: '—', description: 'Action row.' },
      { name: 'width', type: 'number', default: '480', description: 'Max panel width in px.' },
    ],
    a11y: [
      'role="dialog" with aria-modal and an accessible title.',
      'Escape closes; focus is moved into the panel on open.',
      'Body scroll is locked while the dialog is mounted.',
    ],
    related: ['drawer', 'alert'],
  },

  {
    slug: 'drawer',
    name: 'Drawer',
    category: 'Overlay',
    status: 'Stable',
    summary: 'Side panel for inspecting or editing one object without losing context.',
    examples: [
      {
        title: 'Inspector',
        description: 'Drawers slide from the right and keep the underlying scene visible and interactive.',
        code: `<Drawer open={open} onClose={close} title="Entity inspector" footer={<Button variant="primary">Fly to</Button>}>
  <KeyValue items={[...]} />
</Drawer>`,
        render: DrawerDemo,
      },
    ],
    props: [
      { name: 'open', type: 'boolean', default: 'false', description: 'Visibility.' },
      { name: 'onClose', type: '() => void', default: '—', description: 'Close handler.' },
      { name: 'title', type: 'ReactNode', default: '—', description: 'Header title.' },
      { name: 'width', type: 'number', default: '420', description: 'Panel width in px.' },
      { name: 'footer', type: 'ReactNode', default: '—', description: 'Action row.' },
    ],
    a11y: ['role="dialog" with aria-modal; Escape closes.', 'Do not nest a drawer inside a modal.'],
    related: ['modal', 'panel'],
  },

  {
    slug: 'alert',
    name: 'Alert',
    category: 'Overlay',
    status: 'Stable',
    summary: 'Inline message tied to the content around it — not a toast.',
    examples: [
      {
        title: 'Tones',
        description: 'A 2px semantic rule on the leading edge carries the tone; the body stays quiet.',
        code: `<Alert tone="accent" title="Token expires in 6 days">Rotate before 2026-11-01.</Alert>
<Alert tone="warning" title="Partial coverage">3 of 48 tiles failed to decode.</Alert>
<Alert tone="danger" title="Endpoint unreachable" onClose={dismiss}>…</Alert>`,
        render: AlertDemo,
        align: 'start',
      },
    ],
    props: [
      { name: 'tone', type: "'accent' | 'success' | 'warning' | 'danger' | 'neutral'", default: "'neutral'", description: 'Semantic tone and default icon.' },
      { name: 'title', type: 'ReactNode', default: '—', description: 'One-line summary.' },
      { name: 'icon', type: 'ReactNode | false', default: '—', description: 'Override or remove the icon.' },
      { name: 'onClose', type: '() => void', default: '—', description: 'Adds a dismiss control.' },
    ],
    a11y: ['role="status" so the message is announced when it appears.', 'Persistent alerts should not be dismissible if the state still holds.'],
    related: ['modal', 'progress'],
  },

  {
    slug: 'compass',
    name: 'Compass',
    category: 'HUD',
    status: 'New',
    summary: 'Camera heading indicator: a fixed card, a needle that tracks north.',
    intro:
      'The compass is drawn as an instrument, not an icon: 24 ticks at 15°, major ticks every 45°, and cardinal letters fixed to the card so N always reads north-up. Only the needle turns — it rotates by the negative of the heading, because it points at north, not at the camera.',
    examples: [
      {
        title: 'Live heading',
        description: 'Drive the heading from camera state. The card stays put; the needle swings counter to the heading, and eases over 260ms instead of snapping.',
        code: `<Compass heading={28} size={96} />`,
        render: CompassDemo,
      },
    ],
    props: [
      { name: 'heading', type: 'number', default: '0', description: 'Camera heading in degrees, 0 = north.' },
      { name: 'size', type: 'number', default: '72', description: 'Diameter in px.' },
      { name: 'showHeading', type: 'boolean', default: 'true', description: 'Numeric readout plate.' },
    ],
    a11y: ['role="img" with a label describing the rounded heading.'],
    related: ['coordinate-readout', 'scale-bar'],
  },

  {
    slug: 'scale-bar',
    name: 'ScaleBar',
    category: 'HUD',
    status: 'New',
    summary: 'Map scale bracket with end caps and a mid tick.',
    examples: [
      {
        title: 'Distances',
        description: 'Width is a prop, not derived — pass the pixel width that corresponds to the distance.',
        code: `<ScaleBar distance={500} unit="km" width={148} />
<ScaleBar distance={2} unit="km" width={96} />`,
        render: ScaleBarDemo,
      },
    ],
    props: [
      { name: 'distance', type: 'number', default: '—', description: 'Represented distance.' },
      { name: 'unit', type: 'string', default: "'km'", description: 'Unit label.' },
      { name: 'width', type: 'number', default: '132', description: 'Bracket width in px.' },
      { name: 'label', type: 'string', default: '—', description: 'Overrides the auto label.' },
    ],
    a11y: ['Carries an aria-label such as "Scale: 500 km".'],
    related: ['compass', 'coordinate-readout'],
  },
];
