import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  IconButton,
  Icon,
  Input,
  SearchInput,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  Switch,
  Slider,
  Field,
  SegmentedControl,
} from '@cesium-ds/core';
import type { ComponentDoc } from './types';

/* ------------------------------------------------------------------ */
/* demos                                                               */
/* ------------------------------------------------------------------ */

function ButtonVariants() {
  return (
    <>
      <Button variant="primary">Deploy</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="ghost">Dismiss</Button>
      <Button variant="subtle">Inspect</Button>
      <Button variant="danger-ghost">Delete</Button>
    </>
  );
}

function ButtonSizes() {
  return (
    <>
      <Button size="sm" variant="secondary">
        Small
      </Button>
      <Button variant="secondary">Medium</Button>
      <Button size="lg" variant="primary">
        Large
      </Button>
    </>
  );
}

function ButtonIcons() {
  return (
    <>
      <Button variant="primary" iconLeft={<Icon name="play" size={13} />}>
        Run simulation
      </Button>
      <Button variant="secondary" iconRight={<Icon name="arrow-right" size={13} />}>
        Next step
      </Button>
      <IconButton label="Layers" variant="secondary">
        <Icon name="layers" size={15} />
      </IconButton>
      <IconButton label="Settings" variant="ghost">
        <Icon name="sliders" size={15} />
      </IconButton>
    </>
  );
}

function ButtonStates() {
  return (
    <>
      <Button variant="primary" loading>
        Deploying
      </Button>
      <Button variant="secondary" disabled>
        Disabled
      </Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
    </>
  );
}

function ButtonGroups() {
  return (
    <>
      <ButtonGroup aria-label="Time range">
        <Button size="sm" variant="secondary">
          1H
        </Button>
        <Button size="sm" variant="secondary">
          24H
        </Button>
        <Button size="sm" variant="secondary">
          7D
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Zoom">
        <IconButton label="Zoom out" size="sm" variant="secondary">
          <Icon name="minus" size={12} />
        </IconButton>
        <IconButton label="Zoom in" size="sm" variant="secondary">
          <Icon name="plus" size={12} />
        </IconButton>
      </ButtonGroup>
    </>
  );
}

function InputBasic() {
  return (
    <div style={{ width: 300 }}>
      <Field label="Asset name" hint="Shown in the layer tree and search results." htmlFor="asset">
        <Input id="asset" placeholder="Sentinel-2 · tile 31T" />
      </Field>
    </div>
  );
}

function InputAffixes() {
  return (
    <div className="cs-stack" style={{ width: 300, gap: 10 }}>
      <Input prefixText="https://" placeholder="tiles.cesium.dev" suffixText=".json" />
      <Input prefix={<Icon name="search" size={14} />} placeholder="Search imagery" />
      <Input suffixText="km" defaultValue="128" />
    </div>
  );
}

function InputStates() {
  return (
    <div className="cs-stack" style={{ width: 300, gap: 10 }}>
      <Input invalid defaultValue="0.0000, 0.0000" />
      <Input disabled placeholder="Read-only field" />
    </div>
  );
}

function SearchDemo() {
  return (
    <div style={{ width: 300 }}>
      <SearchInput placeholder="Search 12,480 assets" />
    </div>
  );
}

function TextareaDemo() {
  return (
    <div style={{ width: 360 }}>
      <Textarea placeholder="Describe the observation window…" rows={3} />
    </div>
  );
}

function TextareaMono() {
  return (
    <div style={{ width: 360 }}>
      <Textarea
        mono
        rows={4}
        defaultValue={'{\n  "type": "Cesium3DTileset",\n  "maximumScreenSpaceError": 16\n}'}
      />
    </div>
  );
}

function SelectDemo() {
  const [epsg, setEpsg] = useState('3857');
  return (
    <div className="cs-stack" style={{ width: 300, gap: 10 }}>
      <Select
        label="Projection"
        value={epsg}
        onValueChange={setEpsg}
        options={[
          { value: '3857', label: 'EPSG:3857 — Web Mercator' },
          { value: '4326', label: 'EPSG:4326 — WGS 84' },
          { value: '4978', label: 'EPSG:4978 — ECEF' },
        ]}
      />
      <Select
        disabled
        label="Level"
        value="1"
        options={[{ value: '1', label: 'Fixed level 12' }]}
      />
    </div>
  );
}

function SelectSearchDemo() {
  const [provider, setProvider] = useState('sentinel');
  return (
    <div style={{ width: 300 }}>
      <Select
        searchable
        label="Imagery provider"
        value={provider}
        onValueChange={setProvider}
        options={[
          { value: 'bing', label: 'Bing Maps Aerial', hint: 'free' },
          { value: 'sentinel', label: 'Sentinel-2 cloudless', hint: '10 m' },
          { value: 'arcgis', label: 'ArcGIS World Imagery', hint: 'paid' },
          { value: 'osm', label: 'OpenStreetMap', hint: 'raster' },
          { value: 'ion', label: 'Cesium ion asset 2', hint: 'token' },
          { value: 'mapbox', label: 'Mapbox Satellite', hint: 'token' },
        ]}
      />
    </div>
  );
}

function CheckboxDemo() {
  const [state, setState] = useState({ terrain: true, imagery: true, labels: false });
  return (
    <div className="cs-stack" style={{ gap: 9 }}>
      <Checkbox
        label="Terrain"
        checked={state.terrain}
        onChange={(e) => setState({ ...state, terrain: e.target.checked })}
      />
      <Checkbox
        label="Imagery"
        checked={state.imagery}
        onChange={(e) => setState({ ...state, imagery: e.target.checked })}
      />
      <Checkbox
        label="Labels"
        checked={state.labels}
        onChange={(e) => setState({ ...state, labels: e.target.checked })}
      />
      <Checkbox label="Partial selection" indeterminate />
      <Checkbox label="Unavailable in this tier" disabled />
    </div>
  );
}

function RadioDemo() {
  const [value, setValue] = useState('ellipsoid');
  return (
    <RadioGroup
      name="height-reference"
      value={value}
      onChange={setValue}
      options={[
        { value: 'ellipsoid', label: 'Ellipsoid (WGS 84)' },
        { value: 'terrain', label: 'Terrain' },
        { value: 'relative', label: 'Relative to ground' },
      ]}
    />
  );
}

function SwitchDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className="cs-stack" style={{ gap: 12 }}>
      <Switch label="Depth test against terrain" checked={on} onChange={(e) => setOn(e.target.checked)} />
      <Switch label="Compact mode" size="sm" />
      <Switch label="Disabled" disabled />
    </div>
  );
}

function SliderDemo() {
  const [value, setValue] = useState(45);
  return (
    <div style={{ width: 320 }}>
      <Slider
        label="Opacity"
        value={value}
        onValueChange={setValue}
        showValue
        ticks={[0, 25, 50, 75, 100]}
        formatValue={(v) => `${v}%`}
      />
    </div>
  );
}

function SliderStepDemo() {
  const [value, setValue] = useState(16);
  return (
    <div style={{ width: 320 }}>
      <Slider
        label="Maximum screen-space error"
        value={value}
        onValueChange={setValue}
        min={1}
        max={64}
        step={0.5}
        showValue
        formatValue={(v) => v.toFixed(1)}
      />
    </div>
  );
}

function FieldDemo() {
  return (
    <div className="cs-stack" style={{ width: 320, gap: 18 }}>
      <Field label="API token" hint="Scoped to a single workspace." htmlFor="token">
        <Input id="token" prefixText="cs_" placeholder="••••••••••••" />
      </Field>
      <Field label="Tile endpoint" error="Endpoint must be reachable over HTTPS." htmlFor="endpoint">
        <Input id="endpoint" invalid defaultValue="http://tiles.internal" />
      </Field>
      <Field label="Workspace" required htmlFor="ws">
        <Input id="ws" placeholder="orbital-ops" />
      </Field>
    </div>
  );
}

function SegmentedDemo() {
  const [value, setValue] = useState<'2d' | '3d' | 'columbus'>('3d');
  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      options={[
        { value: '2d', label: '2D' },
        { value: '3d', label: '3D' },
        { value: 'columbus', label: 'Columbus' },
      ]}
    />
  );
}

function SegmentedAccent() {
  const [value, setValue] = useState<'raw' | 'delta'>('delta');
  return (
    <SegmentedControl
      accent
      value={value}
      onChange={setValue}
      options={[
        { value: 'raw', label: 'Raw' },
        { value: 'delta', label: 'Delta' },
      ]}
    />
  );
}

/* ------------------------------------------------------------------ */
/* docs                                                                */
/* ------------------------------------------------------------------ */

export const actionsForms: ComponentDoc[] = [
  {
    slug: 'button',
    name: 'Button',
    category: 'Actions',
    status: 'Stable',
    summary: 'Triggers an action. One primary action per view, everything else is secondary or quieter.',
    intro:
      'Buttons are the loudest element in the system, so the hierarchy is strict: primary is a solid key — white on dark, near-black on light — secondary is a bordered surface, ghost is text-only, and destructive actions stay tinted rather than solid. Colour is never what makes a button primary.',
    examples: [
      {
        title: 'Variants',
        description: 'Use exactly one primary per view. Destructive actions use the tinted danger variant.',
        code: `<Button variant="primary">Deploy</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Dismiss</Button>
<Button variant="subtle">Inspect</Button>
<Button variant="danger-ghost">Delete</Button>`,
        render: ButtonVariants,
      },
      {
        title: 'Sizes',
        description: 'Three heights map to 28, 34 and 40px. Medium is the default for all form and toolbar contexts.',
        code: `<Button size="sm" variant="secondary">Small</Button>
<Button variant="secondary">Medium</Button>
<Button size="lg" variant="primary">Large</Button>`,
        render: ButtonSizes,
      },
      {
        title: 'Icons',
        description:
          'Icons sit in a 13–15px optical slot. Icon-only buttons must carry an accessible label.',
        code: `<Button variant="primary" iconLeft={<Icon name="play" size={13} />}>
  Run simulation
</Button>
<Button variant="secondary" iconRight={<Icon name="arrow-right" size={13} />}>
  Next step
</Button>
<IconButton label="Layers" variant="secondary">
  <Icon name="layers" size={15} />
</IconButton>`,
        render: ButtonIcons,
      },
      {
        title: 'States',
        description: 'Loading replaces the label with a spinner and blocks pointer events.',
        code: `<Button variant="primary" loading>Deploying</Button>
<Button variant="secondary" disabled>Disabled</Button>
<Button variant="primary" disabled>Disabled</Button>`,
        render: ButtonStates,
      },
      {
        title: 'Group',
        description: 'Segmented actions collapse their radii and share a single hairline border.',
        code: `<ButtonGroup aria-label="Time range">
  <Button size="sm" variant="secondary">1H</Button>
  <Button size="sm" variant="secondary">24H</Button>
  <Button size="sm" variant="secondary">7D</Button>
</ButtonGroup>`,
        render: ButtonGroups,
      },
    ],
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'subtle' | 'danger' | 'danger-ghost'", default: "'secondary'", description: 'Visual weight of the action.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Control height: 28 / 34 / 40px.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Swaps content for a spinner and disables interaction.' },
      { name: 'block', type: 'boolean', default: 'false', description: 'Stretches the button to the container width.' },
      { name: 'iconLeft / iconRight', type: 'ReactNode', default: '—', description: 'Leading or trailing icon slot.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Native disabled state, 42% opacity.' },
    ],
    a11y: [
      'Renders a native <button>; always set type when inside a form.',
      'IconButton requires a label prop, applied as aria-label — no `title` attribute, since the browser bubble cannot be themed. Wrap it in Tooltip when a visible hover hint is needed.',
      'Loading sets aria-busy and keeps the button focusable until the promise settles.',
      'Focus ring is a 2px canvas gap plus a 2px accent halo — never remove it.',
    ],
    guidance: {
      do: ['Use one primary action per screen region.', 'Label with a verb: "Deploy", "Publish", "Attach".'],
      dont: ['Do not use a button for navigation — use a link.', 'Do not stack two primary buttons side by side.'],
    },
    related: ['icon-button', 'toolbar', 'button-group'],
  },

  {
    slug: 'input',
    name: 'Input',
    category: 'Forms',
    status: 'Stable',
    summary: 'Single-line text entry with optional prefix, suffix and validation state.',
    intro:
      'Inputs sit on an inset surface so the field reads as a recess rather than a raised card. Focus promotes the field to the surface colour and adds a 3px accent halo.',
    examples: [
      {
        title: 'With a field label',
        description: 'Always pair an input with a label. Hint text explains format; error text explains the fix.',
        code: `<Field label="Asset name" hint="Shown in the layer tree and search results." htmlFor="asset">
  <Input id="asset" placeholder="Sentinel-2 · tile 31T" />
</Field>`,
        render: InputBasic,
      },
      {
        title: 'Prefix and suffix',
        description: 'Affixes are monospace by default when passed as text, so units align across a form.',
        code: `<Input prefixText="https://" placeholder="tiles.cesium.dev" suffixText=".json" />
<Input prefix={<Icon name="search" size={14} />} placeholder="Search imagery" />
<Input suffixText="km" defaultValue="128" />`,
        render: InputAffixes,
      },
      {
        title: 'Validation and disabled',
        code: `<Input invalid defaultValue="0.0000, 0.0000" />
<Input disabled placeholder="Read-only field" />`,
        render: InputStates,
      },
      {
        title: 'Search',
        description: 'SearchInput adds a leading glyph and a clear affordance once a value exists.',
        code: `<SearchInput placeholder="Search 12,480 assets" />`,
        render: SearchDemo,
      },
    ],
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Control height.' },
      { name: 'invalid', type: 'boolean', default: 'false', description: 'Danger border and aria-invalid.' },
      { name: 'prefix', type: 'ReactNode', default: '—', description: 'Leading icon or element.' },
      { name: 'suffix', type: 'ReactNode', default: '—', description: 'Trailing icon or element.' },
      { name: 'prefixText', type: 'string', default: '—', description: 'Monospace text affix, e.g. a protocol.' },
      { name: 'suffixText', type: 'string', default: '—', description: 'Monospace text affix, e.g. a unit.' },
    ],
    a11y: [
      'Wrap in Field to get a programmatic label association via htmlFor.',
      'invalid sets aria-invalid; pair it with an error message in Field.',
      'Placeholders are never a substitute for labels.',
    ],
    related: ['field', 'textarea', 'select'],
  },

  {
    slug: 'textarea',
    name: 'Textarea',
    category: 'Forms',
    status: 'Stable',
    summary: 'Multi-line text entry, with a monospace mode for configuration and JSON.',
    examples: [
      {
        title: 'Default',
        code: `<Textarea placeholder="Describe the observation window…" rows={3} />`,
        render: TextareaDemo,
        align: 'start',
      },
      {
        title: 'Monospace',
        description: 'Use mono for anything a machine will parse.',
        code: `<Textarea mono rows={4} defaultValue={'{ ... }'} />`,
        render: TextareaMono,
        align: 'start',
      },
    ],
    props: [
      { name: 'rows', type: 'number', default: '4', description: 'Initial visible rows.' },
      { name: 'mono', type: 'boolean', default: 'false', description: 'Monospace variant at 12px/1.7.' },
      { name: 'invalid', type: 'boolean', default: 'false', description: 'Danger border and aria-invalid.' },
    ],
    a11y: [
      'Resize is CSS, not a prop: .cs-textarea sets resize: vertical, because horizontal resizing breaks the grid. Override it with style if you must.',
      'Use Field for labelling.',
    ],
    related: ['input', 'field'],
  },

  {
    slug: 'select',
    name: 'Select',
    category: 'Forms',
    status: 'Stable',
    summary: 'A listbox drawn by the system, not by the operating system.',
    intro:
      'The native <select> popup is the one surface no design system can style: macOS and Windows each render their own menu, ignore every token, and drop the caret animation. This is a portalled listbox instead — same semantics, same keyboard model, our pixels.',
    examples: [
      {
        title: 'Default',
        description: 'Single value, controlled. The closed control matches Input exactly.',
        code: `<Select
  label="Projection"
  value={epsg}
  onValueChange={setEpsg}
  options={[
    { value: '3857', label: 'EPSG:3857 — Web Mercator' },
    { value: '4326', label: 'EPSG:4326 — WGS 84' },
  ]}
/>`,
        render: SelectDemo,
        align: 'start',
      },
      {
        title: 'Searchable',
        description:
          'Past ~12 options add the filter field. Hints carry the detail that would otherwise bloat the label.',
        code: `<Select
  searchable
  label="Imagery provider"
  value={provider}
  onValueChange={setProvider}
  options={[
    { value: 'sentinel', label: 'Sentinel-2 cloudless', hint: '10 m' },
    { value: 'osm', label: 'OpenStreetMap', hint: 'raster' },
  ]}
/>`,
        render: SelectSearchDemo,
        align: 'start',
      },
    ],
    props: [
      { name: 'options', type: 'SelectOption[]', default: '—', description: '{ value, label, disabled?, hint? }.' },
      { name: 'value', type: 'string', default: '—', description: 'Controlled value.' },
      { name: 'onValueChange', type: '(value: string) => void', default: '—', description: 'Fires on commit, not on highlight.' },
      { name: 'searchable', type: 'boolean', default: 'false', description: 'Adds a filter field and focuses it on open.' },
      { name: 'placeholder', type: 'string', default: "'Select…'", description: 'Shown when nothing is selected.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Matches the control heights.' },
      { name: 'name', type: 'string', default: '—', description: 'Posts the value through a hidden input.' },
      { name: 'invalid', type: 'boolean', default: 'false', description: 'Danger border and aria-invalid.' },
    ],
    a11y: [
      'role="combobox" on the trigger, role="listbox"/"option" in the panel, with aria-activedescendant tracking the highlight.',
      'Arrow keys, Home/End, Enter, Esc and typeahead all work without opening the panel first.',
      'A hidden input carries the value so the control still submits inside a native form.',
    ],
    related: ['input', 'menu', 'dropdown'],
  },

  {
    slug: 'checkbox',
    name: 'Checkbox',
    category: 'Forms',
    status: 'Stable',
    summary: 'Binary or multi-select choice, with an indeterminate state for partial selection.',
    examples: [
      {
        title: 'Group',
        description: 'Vertical rhythm of 9px keeps dense layer panels scannable.',
        code: `<Checkbox label="Terrain" checked={terrain} onChange={...} />
<Checkbox label="Imagery" checked={imagery} onChange={...} />
<Checkbox label="Partial selection" indeterminate />
<Checkbox label="Unavailable in this tier" disabled />`,
        render: CheckboxDemo,
        align: 'start',
      },
      {
        title: 'Radio group',
        description: 'RadioGroup handles name, checked and change wiring.',
        code: `<RadioGroup
  name="height-reference"
  value={value}
  onChange={setValue}
  options={[
    { value: 'ellipsoid', label: 'Ellipsoid (WGS 84)' },
    { value: 'terrain', label: 'Terrain' },
  ]}
/>`,
        render: RadioDemo,
        align: 'start',
      },
    ],
    props: [
      { name: 'label', type: 'ReactNode', default: '—', description: 'Inline label, rendered inside the click target.' },
      { name: 'checked', type: 'boolean', default: '—', description: 'Controlled state.' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Checkbox only: partial selection dash.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Dims the control to 45%.' },
    ],
    a11y: [
      'The native input stays in the DOM and keeps keyboard and screen-reader semantics.',
      'Focus ring is drawn on the visual box via :focus-visible, not the hidden input.',
    ],
    related: ['switch', 'radio', 'field'],
  },

  {
    slug: 'switch',
    name: 'Switch',
    category: 'Forms',
    status: 'Stable',
    summary: 'Immediate on/off setting that applies without a save step.',
    examples: [
      {
        title: 'States',
        description: 'Use a switch only when the change takes effect instantly. Otherwise use a checkbox.',
        code: `<Switch label="Depth test against terrain" checked={on} onChange={...} />
<Switch label="Compact mode" size="sm" />
<Switch label="Disabled" disabled />`,
        render: SwitchDemo,
        align: 'start',
      },
    ],
    props: [
      { name: 'label', type: 'ReactNode', default: '—', description: 'Text to the right of the track.' },
      { name: 'size', type: "'sm' | 'md'", default: "'md'", description: '34×20 or 28×16 track.' },
      { name: 'checked', type: 'boolean', default: '—', description: 'Controlled state.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction.' },
    ],
    a11y: ['Renders role="switch"; the label is part of the click target.', 'Thumb travels 14px with a spring easing.'],
    related: ['checkbox'],
  },

  {
    slug: 'slider',
    name: 'Slider',
    category: 'Forms',
    status: 'Stable',
    summary: 'A track, a fill and a thumb, all drawn by the system.',
    intro:
      'The native range input renders a different widget in every engine and is only reachable through ::-webkit-slider-thumb, which rules out ticks, a drag readout and a consistent hit area. This is a div with role="slider" — pointer-driven, keyboard-complete.',
    examples: [
      {
        title: 'With ticks and readout',
        description:
          'Ticks mark the values worth landing on. The readout is tabular; the bubble appears only while dragging.',
        code: `const [value, setValue] = useState(45);

<Slider
  label="Opacity"
  value={value}
  onValueChange={setValue}
  showValue
  ticks={[0, 25, 50, 75, 100]}
  formatValue={(v) => v + '%'}
/>`,
        render: SliderDemo,
      },
      {
        title: 'Fractional step',
        description: 'Step 0.5 with a one-decimal readout — the values a terrain loader actually takes.',
        code: `<Slider min={1} max={64} step={0.5} showValue formatValue={(v) => v.toFixed(1)} />`,
        render: SliderStepDemo,
      },
    ],
    props: [
      { name: 'value', type: 'number', default: '0', description: 'Controlled value.' },
      { name: 'min / max', type: 'number', default: '0 / 100', description: 'Range bounds.' },
      { name: 'step', type: 'number', default: '1', description: 'Snap increment.' },
      { name: 'onValueChange', type: '(value: number) => void', default: '—', description: 'Fires while dragging.' },
      { name: 'ticks', type: 'number[]', default: '—', description: 'Marks drawn under the track.' },
      { name: 'showValue', type: 'boolean', default: 'false', description: 'Monospace readout beside the track.' },
      { name: 'name', type: 'string', default: '—', description: 'Posts the value through a hidden input.' },
    ],
    a11y: [
      'role="slider" with aria-valuenow / valuemin / valuemax and aria-valuetext from formatValue.',
      'Arrows step, PageUp/PageDown step by ten, Home and End jump to the bounds.',
      'The thumb is pointer-transparent: the track owns the gesture, so the hit area never shrinks.',
    ],
    related: ['input', 'progress'],
  },

  {
    slug: 'field',
    name: 'Field',
    category: 'Forms',
    status: 'Stable',
    summary: 'Label, hint and error wrapper that keeps every form row on the same vertical rhythm.',
    examples: [
      {
        title: 'Complete field anatomy',
        description: 'Error replaces hint rather than stacking, so rows never jump height unexpectedly.',
        code: `<Field label="API token" hint="Scoped to a single workspace." htmlFor="token">
  <Input id="token" prefixText="cs_" placeholder="••••••••••••" />
</Field>

<Field label="Tile endpoint" error="Endpoint must be reachable over HTTPS." htmlFor="endpoint">
  <Input id="endpoint" invalid defaultValue="http://tiles.internal" />
</Field>

<Field label="Workspace" required htmlFor="ws">
  <Input id="ws" placeholder="orbital-ops" />
</Field>`,
        render: FieldDemo,
        align: 'start',
      },
    ],
    props: [
      { name: 'label', type: 'ReactNode', default: '—', description: 'Field label, 12px medium.' },
      { name: 'hint', type: 'ReactNode', default: '—', description: 'Helper text below the control.' },
      { name: 'error', type: 'ReactNode', default: '—', description: 'Error text; replaces the hint.' },
      { name: 'required', type: 'boolean', default: 'false', description: 'Appends a danger asterisk.' },
      { name: 'htmlFor', type: 'string', default: '—', description: 'ID of the control to label.' },
    ],
    a11y: ['Errors render with role="alert".', 'Do not use the asterisk as the only required signal — also set required on the input.'],
    related: ['input', 'select', 'checkbox'],
  },

  {
    slug: 'segmented-control',
    name: 'SegmentedControl',
    category: 'Forms',
    status: 'Stable',
    summary: 'Two to four mutually exclusive options, visible at once — no dropdown required.',
    examples: [
      {
        title: 'Default',
        description: 'Use for view modes and small enums. Above four options, use Tabs or a Select.',
        code: `<SegmentedControl
  value={value}
  onChange={setValue}
  options={[
    { value: '2d', label: '2D' },
    { value: '3d', label: '3D' },
    { value: 'columbus', label: 'Columbus' },
  ]}
/>`,
        render: SegmentedDemo,
      },
      {
        title: 'Accent',
        description: 'The accent variant marks a meaningful mode switch rather than a view toggle.',
        code: `<SegmentedControl accent value={value} onChange={setValue} options={[...]} />`,
        render: SegmentedAccent,
      },
    ],
    props: [
      { name: 'options', type: 'SegmentedOption[]', default: '—', description: 'value, label, optional icon and disabled.' },
      { name: 'value', type: 'string', default: '—', description: 'Active option.' },
      { name: 'onChange', type: '(value: string) => void', default: '—', description: 'Selection handler.' },
      { name: 'accent', type: 'boolean', default: 'false', description: 'Tints the active segment.' },
      { name: 'block', type: 'boolean', default: 'false', description: 'Full-width equal segments.' },
    ],
    a11y: ['Exposed as a tablist with aria-selected on each segment.', 'Keep labels to one or two words.'],
    related: ['tabs', 'select'],
  },
];
