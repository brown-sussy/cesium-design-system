/**
 * GENERATED FILE — do not edit.
 *
 * Produced by `scripts/build-vue-catalog.mjs` from `docs/content/*.tsx`, so the
 * Vue demo site describes the same components, with the same props and the same
 * accessibility notes, as the React documentation. Regenerate with
 * `npm run vue:catalog` (also runs before `dev:site` and `build:site`).
 */

export type CatalogCategory =
  | "Actions"
  | "Forms"
  | "Display"
  | "Layout"
  | "Data"
  | "Navigation"
  | "Overlay"
  | "HUD"
  | "AI"
  | "Chat"
  | "Science";

export interface CatalogProp {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface CatalogEntry {
  slug: string;
  name: string;
  category: CatalogCategory;
  summary: string;
  status?: 'Stable' | 'New' | 'Beta';
  props: CatalogProp[];
  a11y: string[];
  guidance?: { do: string[]; dont: string[] };
  related: string[];
  /** Plain-text intro, when the registry had one that was not JSX. */
  intro?: string;
  /** Titles of the React examples — the Vue demos are separate files. */
  examples: string[];
}

export const catalog: CatalogEntry[] = [
  {
    "slug": "button",
    "name": "Button",
    "category": "Actions",
    "summary": "Triggers an action. One primary action per view, everything else is secondary or quieter.",
    "status": "Stable",
    "props": [
      {
        "name": "variant",
        "type": "'primary' | 'secondary' | 'ghost' | 'subtle' | 'danger' | 'danger-ghost'",
        "default": "'secondary'",
        "description": "Visual weight of the action."
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg'",
        "default": "'md'",
        "description": "Control height: 28 / 34 / 40px."
      },
      {
        "name": "loading",
        "type": "boolean",
        "default": "false",
        "description": "Swaps content for a spinner and disables interaction."
      },
      {
        "name": "block",
        "type": "boolean",
        "default": "false",
        "description": "Stretches the button to the container width."
      },
      {
        "name": "iconLeft / iconRight",
        "type": "ReactNode",
        "default": "—",
        "description": "Leading or trailing icon slot."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Native disabled state, 42% opacity."
      }
    ],
    "a11y": [
      "Renders a native <button>; always set type when inside a form.",
      "IconButton requires a label prop, applied as aria-label — no `title` attribute, since the browser bubble cannot be themed. Wrap it in Tooltip when a visible hover hint is needed.",
      "Loading sets aria-busy and keeps the button focusable until the promise settles.",
      "Focus ring is a 2px canvas gap plus a 2px accent halo — never remove it."
    ],
    "guidance": {
      "do": [
        "Use one primary action per screen region.",
        "Label with a verb: \"Deploy\", \"Publish\", \"Attach\"."
      ],
      "dont": [
        "Do not use a button for navigation — use a link.",
        "Do not stack two primary buttons side by side."
      ]
    },
    "related": [
      "icon-button",
      "toolbar",
      "button-group"
    ],
    "intro": "Buttons are the loudest element in the system, so the hierarchy is strict: primary is a solid key — white on dark, near-black on light — secondary is a bordered surface, ghost is text-only, and destructive actions stay tinted rather than solid. Colour is never what makes a button primary.",
    "examples": [
      "Variants",
      "Sizes",
      "Icons",
      "States",
      "Group"
    ]
  },
  {
    "slug": "input",
    "name": "Input",
    "category": "Forms",
    "summary": "Single-line text entry with optional prefix, suffix and validation state.",
    "status": "Stable",
    "props": [
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg'",
        "default": "'md'",
        "description": "Control height."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Danger border and aria-invalid."
      },
      {
        "name": "prefix",
        "type": "ReactNode",
        "default": "—",
        "description": "Leading icon or element."
      },
      {
        "name": "suffix",
        "type": "ReactNode",
        "default": "—",
        "description": "Trailing icon or element."
      },
      {
        "name": "prefixText",
        "type": "string",
        "default": "—",
        "description": "Monospace text affix, e.g. a protocol."
      },
      {
        "name": "suffixText",
        "type": "string",
        "default": "—",
        "description": "Monospace text affix, e.g. a unit."
      }
    ],
    "a11y": [
      "Wrap in Field to get a programmatic label association via htmlFor.",
      "invalid sets aria-invalid; pair it with an error message in Field.",
      "Placeholders are never a substitute for labels."
    ],
    "related": [
      "field",
      "textarea",
      "select"
    ],
    "intro": "Inputs sit on an inset surface so the field reads as a recess rather than a raised card. Focus promotes the field to the surface colour and adds a 3px accent halo.",
    "examples": [
      "With a field label",
      "Prefix and suffix",
      "Validation and disabled",
      "Search"
    ]
  },
  {
    "slug": "textarea",
    "name": "Textarea",
    "category": "Forms",
    "summary": "Multi-line text entry, with a monospace mode for configuration and JSON.",
    "status": "Stable",
    "props": [
      {
        "name": "rows",
        "type": "number",
        "default": "4",
        "description": "Initial visible rows."
      },
      {
        "name": "mono",
        "type": "boolean",
        "default": "false",
        "description": "Monospace variant at 12px/1.7."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Danger border and aria-invalid."
      }
    ],
    "a11y": [
      "Resize is CSS, not a prop: .cs-textarea sets resize: vertical, because horizontal resizing breaks the grid. Override it with style if you must.",
      "Use Field for labelling."
    ],
    "related": [
      "input",
      "field"
    ],
    "examples": [
      "Default",
      "Monospace"
    ]
  },
  {
    "slug": "select",
    "name": "Select",
    "category": "Forms",
    "summary": "A listbox drawn by the system, not by the operating system.",
    "status": "Stable",
    "props": [
      {
        "name": "options",
        "type": "SelectOption[]",
        "default": "—",
        "description": "{ value, label, disabled?, hint? }."
      },
      {
        "name": "value",
        "type": "string",
        "default": "—",
        "description": "Controlled value."
      },
      {
        "name": "onValueChange",
        "type": "(value: string) => void",
        "default": "—",
        "description": "Fires on commit, not on highlight."
      },
      {
        "name": "searchable",
        "type": "boolean",
        "default": "false",
        "description": "Adds a filter field and focuses it on open."
      },
      {
        "name": "placeholder",
        "type": "string",
        "default": "'Select…'",
        "description": "Shown when nothing is selected."
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg'",
        "default": "'md'",
        "description": "Matches the control heights."
      },
      {
        "name": "name",
        "type": "string",
        "default": "—",
        "description": "Posts the value through a hidden input."
      },
      {
        "name": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Danger border and aria-invalid."
      }
    ],
    "a11y": [
      "role=\"combobox\" on the trigger, role=\"listbox\"/\"option\" in the panel, with aria-activedescendant tracking the highlight.",
      "Arrow keys, Home/End, Enter, Esc and typeahead all work without opening the panel first.",
      "A hidden input carries the value so the control still submits inside a native form."
    ],
    "related": [
      "input",
      "menu",
      "dropdown"
    ],
    "intro": "The native <select> popup is the one surface no design system can style: macOS and Windows each render their own menu, ignore every token, and drop the caret animation. This is a portalled listbox instead — same semantics, same keyboard model, our pixels.",
    "examples": [
      "Default",
      "Searchable"
    ]
  },
  {
    "slug": "checkbox",
    "name": "Checkbox",
    "category": "Forms",
    "summary": "Binary or multi-select choice, with an indeterminate state for partial selection.",
    "status": "Stable",
    "props": [
      {
        "name": "label",
        "type": "ReactNode",
        "default": "—",
        "description": "Inline label, rendered inside the click target."
      },
      {
        "name": "checked",
        "type": "boolean",
        "default": "—",
        "description": "Controlled state."
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "default": "false",
        "description": "Checkbox only: partial selection dash."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Dims the control to 45%."
      }
    ],
    "a11y": [
      "The native input stays in the DOM and keeps keyboard and screen-reader semantics.",
      "Focus ring is drawn on the visual box via :focus-visible, not the hidden input."
    ],
    "related": [
      "switch",
      "radio",
      "field"
    ],
    "examples": [
      "Group",
      "Radio group"
    ]
  },
  {
    "slug": "switch",
    "name": "Switch",
    "category": "Forms",
    "summary": "Immediate on/off setting that applies without a save step.",
    "status": "Stable",
    "props": [
      {
        "name": "label",
        "type": "ReactNode",
        "default": "—",
        "description": "Text to the right of the track."
      },
      {
        "name": "size",
        "type": "'sm' | 'md'",
        "default": "'md'",
        "description": "34×20 or 28×16 track."
      },
      {
        "name": "checked",
        "type": "boolean",
        "default": "—",
        "description": "Controlled state."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables interaction."
      }
    ],
    "a11y": [
      "Renders role=\"switch\"; the label is part of the click target.",
      "Thumb travels 14px with a spring easing."
    ],
    "related": [
      "checkbox"
    ],
    "examples": [
      "States"
    ]
  },
  {
    "slug": "slider",
    "name": "Slider",
    "category": "Forms",
    "summary": "A track, a fill and a thumb, all drawn by the system.",
    "status": "Stable",
    "props": [
      {
        "name": "value",
        "type": "number",
        "default": "0",
        "description": "Controlled value."
      },
      {
        "name": "min / max",
        "type": "number",
        "default": "0 / 100",
        "description": "Range bounds."
      },
      {
        "name": "step",
        "type": "number",
        "default": "1",
        "description": "Snap increment."
      },
      {
        "name": "onValueChange",
        "type": "(value: number) => void",
        "default": "—",
        "description": "Fires while dragging."
      },
      {
        "name": "ticks",
        "type": "number[]",
        "default": "—",
        "description": "Marks drawn under the track."
      },
      {
        "name": "showValue",
        "type": "boolean",
        "default": "false",
        "description": "Monospace readout beside the track."
      },
      {
        "name": "name",
        "type": "string",
        "default": "—",
        "description": "Posts the value through a hidden input."
      }
    ],
    "a11y": [
      "role=\"slider\" with aria-valuenow / valuemin / valuemax and aria-valuetext from formatValue.",
      "Arrows step, PageUp/PageDown step by ten, Home and End jump to the bounds.",
      "The thumb is pointer-transparent: the track owns the gesture, so the hit area never shrinks."
    ],
    "related": [
      "input",
      "progress"
    ],
    "intro": "The native range input renders a different widget in every engine and is only reachable through ::-webkit-slider-thumb, which rules out ticks, a drag readout and a consistent hit area. This is a div with role=\"slider\" — pointer-driven, keyboard-complete.",
    "examples": [
      "With ticks and readout",
      "Fractional step"
    ]
  },
  {
    "slug": "field",
    "name": "Field",
    "category": "Forms",
    "summary": "Label, hint and error wrapper that keeps every form row on the same vertical rhythm.",
    "status": "Stable",
    "props": [
      {
        "name": "label",
        "type": "ReactNode",
        "default": "—",
        "description": "Field label, 12px medium."
      },
      {
        "name": "hint",
        "type": "ReactNode",
        "default": "—",
        "description": "Helper text below the control."
      },
      {
        "name": "error",
        "type": "ReactNode",
        "default": "—",
        "description": "Error text; replaces the hint."
      },
      {
        "name": "required",
        "type": "boolean",
        "default": "false",
        "description": "Appends a danger asterisk."
      },
      {
        "name": "htmlFor",
        "type": "string",
        "default": "—",
        "description": "ID of the control to label."
      }
    ],
    "a11y": [
      "Errors render with role=\"alert\".",
      "Do not use the asterisk as the only required signal — also set required on the input."
    ],
    "related": [
      "input",
      "select",
      "checkbox"
    ],
    "examples": [
      "Complete field anatomy"
    ]
  },
  {
    "slug": "segmented-control",
    "name": "SegmentedControl",
    "category": "Forms",
    "summary": "Two to four mutually exclusive options, visible at once — no dropdown required.",
    "status": "Stable",
    "props": [
      {
        "name": "options",
        "type": "SegmentedOption[]",
        "default": "—",
        "description": "value, label, optional icon and disabled."
      },
      {
        "name": "value",
        "type": "string",
        "default": "—",
        "description": "Active option."
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "default": "—",
        "description": "Selection handler."
      },
      {
        "name": "accent",
        "type": "boolean",
        "default": "false",
        "description": "Tints the active segment."
      },
      {
        "name": "block",
        "type": "boolean",
        "default": "false",
        "description": "Full-width equal segments."
      }
    ],
    "a11y": [
      "Exposed as a tablist with aria-selected on each segment.",
      "Keep labels to one or two words."
    ],
    "related": [
      "tabs",
      "select"
    ],
    "examples": [
      "Default",
      "Accent"
    ]
  },
  {
    "slug": "badge",
    "name": "Badge",
    "category": "Display",
    "summary": "Compact status or category marker. Monospace, uppercase, 19px tall.",
    "status": "Stable",
    "props": [
      {
        "name": "tone",
        "type": "'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info'",
        "default": "'neutral'",
        "description": "Semantic colour."
      },
      {
        "name": "dot",
        "type": "boolean",
        "default": "false",
        "description": "Leading 4px dot."
      },
      {
        "name": "solid",
        "type": "boolean",
        "default": "false",
        "description": "Filled accent badge for the strongest emphasis."
      }
    ],
    "a11y": [
      "Colour alone must not carry meaning — the label always states the status.",
      "Badges are not focusable."
    ],
    "related": [
      "tag",
      "status-dot"
    ],
    "intro": "Badges are metadata, not actions. They never carry a click handler and never compete with the primary action — which is why they are set in monospace uppercase at 10px.",
    "examples": [
      "Tones"
    ]
  },
  {
    "slug": "tag",
    "name": "Tag",
    "category": "Display",
    "summary": "Applied filter or category chip, optionally removable.",
    "status": "Stable",
    "props": [
      {
        "name": "accent",
        "type": "boolean",
        "default": "false",
        "description": "Tinted accent treatment for active filters."
      },
      {
        "name": "onRemove",
        "type": "() => void",
        "default": "—",
        "description": "Renders a dismiss control when provided."
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "default": "—",
        "description": "Optional leading icon."
      }
    ],
    "a11y": [
      "The remove control has an aria-label and stops click propagation."
    ],
    "related": [
      "badge"
    ],
    "examples": [
      "Removable"
    ]
  },
  {
    "slug": "avatar",
    "name": "Avatar",
    "category": "Display",
    "summary": "Identity chip with initials fallback, five sizes and an optional presence dot.",
    "status": "Stable",
    "props": [
      {
        "name": "name",
        "type": "string",
        "default": "''",
        "description": "Used for initials, alt text and title."
      },
      {
        "name": "src",
        "type": "string",
        "default": "—",
        "description": "Image URL; falls back to initials."
      },
      {
        "name": "size",
        "type": "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
        "default": "'md'",
        "description": "22 to 56px."
      },
      {
        "name": "square",
        "type": "boolean",
        "default": "false",
        "description": "Rounded square instead of circle."
      },
      {
        "name": "status",
        "type": "boolean",
        "default": "false",
        "description": "Presence dot at the lower right."
      }
    ],
    "a11y": [
      "The image carries the name as alt text; initials are decorative when a title exists."
    ],
    "related": [
      "badge",
      "status-dot"
    ],
    "examples": [
      "Sizes and shapes"
    ]
  },
  {
    "slug": "kbd",
    "name": "Kbd",
    "category": "Display",
    "summary": "Keyboard shortcut keycap, with a grouped variant for chords.",
    "status": "Stable",
    "props": [
      {
        "name": "children",
        "type": "string",
        "default": "—",
        "description": "Single key glyph or label."
      },
      {
        "name": "keys",
        "type": "string[]",
        "default": "—",
        "description": "KbdGroup: keys joined with a plus sign."
      }
    ],
    "a11y": [
      "Renders a native <kbd> element.",
      "Never rely on a shortcut alone — also expose it in a menu."
    ],
    "related": [
      "tooltip"
    ],
    "examples": [
      "Keys and chords"
    ]
  },
  {
    "slug": "status-dot",
    "name": "StatusDot",
    "category": "Display",
    "summary": "Six-pixel presence indicator with an optional pulse for live states.",
    "status": "Stable",
    "props": [
      {
        "name": "tone",
        "type": "'neutral' | 'accent' | 'success' | 'warning' | 'danger'",
        "default": "'neutral'",
        "description": "Indicator colour."
      },
      {
        "name": "label",
        "type": "ReactNode",
        "default": "—",
        "description": "Text beside the dot."
      },
      {
        "name": "pulse",
        "type": "boolean",
        "default": "false",
        "description": "2s expanding halo animation."
      }
    ],
    "a11y": [
      "Pair the dot with a text label; a bare dot is not announced.",
      "Motion respects prefers-reduced-motion."
    ],
    "related": [
      "badge",
      "spinner"
    ],
    "examples": [
      "Tones"
    ]
  },
  {
    "slug": "spinner",
    "name": "Spinner",
    "category": "Display",
    "summary": "Indeterminate progress for waits under roughly two seconds.",
    "status": "Stable",
    "props": [
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg'",
        "default": "'md'",
        "description": "11, 14 or 22px."
      },
      {
        "name": "inherit",
        "type": "boolean",
        "default": "false",
        "description": "Uses currentColor instead of the accent."
      }
    ],
    "a11y": [
      "Carries role=\"status\" and an accessible label.",
      "For waits over two seconds, add context text."
    ],
    "related": [
      "progress",
      "skeleton"
    ],
    "examples": [
      "Sizes"
    ]
  },
  {
    "slug": "progress",
    "name": "Progress",
    "category": "Display",
    "summary": "Determinate or indeterminate progress bar with an optional labelled readout.",
    "status": "Stable",
    "props": [
      {
        "name": "value / max",
        "type": "number",
        "default": "0 / 100",
        "description": "Progress values."
      },
      {
        "name": "tone",
        "type": "'accent' | 'success' | 'warning' | 'danger'",
        "default": "'accent'",
        "description": "Fill colour."
      },
      {
        "name": "indeterminate",
        "type": "boolean",
        "default": "false",
        "description": "Unknown duration animation."
      },
      {
        "name": "thin",
        "type": "boolean",
        "default": "false",
        "description": "3px track for table rows and headers."
      },
      {
        "name": "showValue",
        "type": "boolean",
        "default": "false",
        "description": "Monospace percentage on the right."
      }
    ],
    "a11y": [
      "Sets role=\"progressbar\" with aria-valuenow/min/max; indeterminate omits the value."
    ],
    "related": [
      "spinner",
      "skeleton",
      "stat"
    ],
    "examples": [
      "Determinate and indeterminate"
    ]
  },
  {
    "slug": "skeleton",
    "name": "Skeleton",
    "category": "Display",
    "summary": "Layout-stable placeholder shown while content loads.",
    "status": "Stable",
    "props": [
      {
        "name": "variant",
        "type": "'text' | 'circle' | 'rect'",
        "default": "'text'",
        "description": "Shape preset."
      },
      {
        "name": "width / height",
        "type": "number | string",
        "default": "—",
        "description": "Explicit dimensions."
      },
      {
        "name": "lines",
        "type": "number",
        "default": "3",
        "description": "SkeletonText only: number of rows."
      }
    ],
    "a11y": [
      "Decorative and aria-hidden; announce loading state separately."
    ],
    "related": [
      "spinner",
      "progress"
    ],
    "examples": [
      "Composition"
    ]
  },
  {
    "slug": "divider",
    "name": "Divider",
    "category": "Display",
    "summary": "Hairline separation, optionally with a centred label or vertical orientation.",
    "status": "Stable",
    "props": [
      {
        "name": "orientation",
        "type": "'horizontal' | 'vertical'",
        "default": "'horizontal'",
        "description": "Direction of the rule."
      },
      {
        "name": "label",
        "type": "ReactNode",
        "default": "—",
        "description": "Centred label between two rules."
      }
    ],
    "a11y": [
      "Renders role=\"separator\" with the correct orientation."
    ],
    "related": [
      "card",
      "panel"
    ],
    "examples": [
      "Horizontal and vertical"
    ]
  },
  {
    "slug": "tooltip",
    "name": "Tooltip",
    "category": "Display",
    "summary": "Short contextual label shown on hover or focus.",
    "status": "Stable",
    "props": [
      {
        "name": "content",
        "type": "ReactNode",
        "default": "—",
        "description": "Tooltip body, kept to one short line."
      },
      {
        "name": "placement",
        "type": "'top' | 'bottom' | 'left' | 'right'",
        "default": "'top'",
        "description": "Preferred side."
      },
      {
        "name": "align",
        "type": "'center' | 'end'",
        "default": "'center'",
        "description": "End-aligns the bubble — for controls at the right edge."
      }
    ],
    "a11y": [
      "The tooltip carries role=\"tooltip\" and opens on focus-within.",
      "Never put interactive content inside a tooltip — use a popover instead.",
      "Avoid for essential information; tooltips are not available to touch users."
    ],
    "related": [
      "kbd",
      "icon"
    ],
    "examples": [
      "Placements"
    ]
  },
  {
    "slug": "icon",
    "name": "Icon",
    "category": "Display",
    "summary": "Forty-four stroke icons on a 24px grid at 1.5px, sized by a single prop.",
    "status": "Stable",
    "props": [
      {
        "name": "name",
        "type": "IconName",
        "default": "—",
        "description": "One of the 44 named glyphs."
      },
      {
        "name": "size",
        "type": "number",
        "default": "16",
        "description": "Rendered square size in px."
      },
      {
        "name": "strokeWidth",
        "type": "number",
        "default": "1.5",
        "description": "Stroke weight; 2 for 10px marks."
      }
    ],
    "a11y": [
      "aria-hidden by default; label the parent control instead."
    ],
    "related": [
      "button",
      "tooltip"
    ],
    "intro": "The icon set is geometric and instrument-like: circles, crosshairs, chevrons. Icons inherit currentColor and are always decorative — the accessible name lives on the control.",
    "examples": [
      "Set"
    ]
  },
  {
    "slug": "card",
    "name": "Card",
    "category": "Layout",
    "summary": "Grouped content on a raised surface with an optional header and footer.",
    "status": "Stable",
    "props": [
      {
        "name": "interactive",
        "type": "boolean",
        "default": "false",
        "description": "Adds hover lift and pointer cursor."
      },
      {
        "name": "accent",
        "type": "boolean",
        "default": "false",
        "description": "Accent hairline and soft outer glow."
      },
      {
        "name": "flush",
        "type": "boolean",
        "default": "false",
        "description": "Removes body padding for tables and media."
      }
    ],
    "a11y": [
      "If the whole card is clickable, wrap it in a single link or button rather than nesting interactive children."
    ],
    "related": [
      "panel",
      "table"
    ],
    "examples": [
      "Anatomy"
    ]
  },
  {
    "slug": "panel",
    "name": "Panel",
    "category": "Layout",
    "summary": "The instrument surface: a dense, monospace-titled container for live readouts.",
    "status": "Stable",
    "props": [
      {
        "name": "title",
        "type": "ReactNode",
        "default": "—",
        "description": "Monospace uppercase header label."
      },
      {
        "name": "actions",
        "type": "ReactNode",
        "default": "—",
        "description": "Trailing header controls."
      },
      {
        "name": "accent",
        "type": "boolean",
        "default": "false",
        "description": "Accent border and corner marks."
      },
      {
        "name": "flush",
        "type": "boolean",
        "default": "false",
        "description": "Removes body padding."
      }
    ],
    "a11y": [
      "The header is visual only; add a heading element inside if the panel is a landmark."
    ],
    "related": [
      "card",
      "key-value",
      "toolbar"
    ],
    "intro": "Panels are tighter than cards and always carry a header strip. This is the container you reach for when composing a dashboard, a HUD overlay or a side inspector.",
    "examples": [
      "Accent panel"
    ]
  },
  {
    "slug": "toolbar",
    "name": "Toolbar",
    "category": "Layout",
    "summary": "A single row of icon actions with hairline separators.",
    "status": "Stable",
    "props": [
      {
        "name": "label",
        "type": "ReactNode",
        "default": "—",
        "description": "Leading monospace caption."
      },
      {
        "name": "block",
        "type": "boolean",
        "default": "false",
        "description": "Stretches to container width."
      }
    ],
    "a11y": [
      "role=\"toolbar\"; give it an aria-label describing the group."
    ],
    "related": [
      "button",
      "panel"
    ],
    "examples": [
      "Scene controls"
    ]
  },
  {
    "slug": "table",
    "name": "Table",
    "category": "Data",
    "summary": "Dense data table with sticky monospace headers, row selection and numeric alignment.",
    "status": "Stable",
    "props": [
      {
        "name": "columns",
        "type": "Column<T>[]",
        "default": "—",
        "description": "key, header, align, mono, primary, render."
      },
      {
        "name": "rows",
        "type": "T[]",
        "default": "—",
        "description": "Row data."
      },
      {
        "name": "rowKey",
        "type": "(row, index) => string",
        "default": "—",
        "description": "Stable row identity."
      },
      {
        "name": "selectedKey",
        "type": "string",
        "default": "—",
        "description": "Highlights one row."
      },
      {
        "name": "onRowClick",
        "type": "(row) => void",
        "default": "—",
        "description": "Adds pointer cursor and click handling."
      },
      {
        "name": "compact",
        "type": "boolean",
        "default": "false",
        "description": "Denser padding and type."
      }
    ],
    "a11y": [
      "Renders semantic table markup with scope=\"col\" headers.",
      "Clickable rows are a pointer convenience — always provide a keyboard-reachable action inside the row.",
      "Never rely on colour alone for status; the StatusDot includes a text label."
    ],
    "related": [
      "pagination",
      "panel",
      "badge"
    ],
    "intro": "Headers sit on their own raised band in 10px monospace, so the column labels read as a header strip rather than a first row. Numeric columns align right and use tabular figures, which is what makes a table of coordinates or byte counts actually readable.",
    "examples": [
      "With selection",
      "Compact"
    ]
  },
  {
    "slug": "stat",
    "name": "Stat",
    "category": "Data",
    "summary": "A single metric: label, tabular value, optional delta and sparkline.",
    "status": "Stable",
    "props": [
      {
        "name": "label",
        "type": "ReactNode",
        "default": "—",
        "description": "Monospace uppercase label."
      },
      {
        "name": "value",
        "type": "ReactNode",
        "default": "—",
        "description": "Primary figure."
      },
      {
        "name": "unit",
        "type": "ReactNode",
        "default": "—",
        "description": "Trailing unit, 12px dim."
      },
      {
        "name": "delta",
        "type": "{ value, direction, label }",
        "default": "—",
        "description": "Change indicator."
      },
      {
        "name": "spark",
        "type": "number[]",
        "default": "—",
        "description": "Inline trend line."
      }
    ],
    "a11y": [
      "Spell out the direction in the label if colour is the only visual cue, e.g. \"Errors, down 2\"."
    ],
    "related": [
      "sparkline",
      "progress",
      "key-value"
    ],
    "examples": [
      "Metric row"
    ]
  },
  {
    "slug": "key-value",
    "name": "KeyValue",
    "category": "Data",
    "summary": "Readout list with dotted leaders, like a printed instrument panel.",
    "status": "Stable",
    "props": [
      {
        "name": "items",
        "type": "KeyValueItem[]",
        "default": "—",
        "description": "key, value and optional dim flag."
      }
    ],
    "a11y": [
      "Renders a definition list (dl/dt/dd), so screen readers announce key-value pairs."
    ],
    "related": [
      "panel",
      "coordinate-readout"
    ],
    "examples": [
      "Readout"
    ]
  },
  {
    "slug": "sparkline",
    "name": "Sparkline",
    "category": "Data",
    "summary": "Trend line without axes — for shape, not for reading exact values.",
    "status": "Stable",
    "props": [
      {
        "name": "data",
        "type": "number[]",
        "default": "—",
        "description": "Series values, at least two."
      },
      {
        "name": "width / height",
        "type": "number",
        "default": "120 / 32",
        "description": "Intrinsic viewBox size."
      },
      {
        "name": "area",
        "type": "boolean",
        "default": "true",
        "description": "Gradient fill under the line."
      },
      {
        "name": "showDot",
        "type": "boolean",
        "default": "false",
        "description": "Marks the last point."
      },
      {
        "name": "color",
        "type": "string",
        "default": "accent",
        "description": "Overrides the series colour."
      }
    ],
    "a11y": [
      "Decorative (aria-hidden). Always show the current value alongside."
    ],
    "related": [
      "stat"
    ],
    "examples": [
      "Area, line and tinted"
    ]
  },
  {
    "slug": "coordinate-readout",
    "name": "CoordinateReadout",
    "category": "Data",
    "summary": "Latitude, longitude and altitude in a glass readout — the signature HUD component.",
    "status": "New",
    "props": [
      {
        "name": "lat / lon",
        "type": "number",
        "default": "—",
        "description": "Decimal degrees."
      },
      {
        "name": "alt",
        "type": "number",
        "default": "—",
        "description": "Altitude; the segment is hidden when omitted."
      },
      {
        "name": "precision",
        "type": "number",
        "default": "4",
        "description": "Decimal places for lat/lon."
      },
      {
        "name": "altUnit",
        "type": "string",
        "default": "'m'",
        "description": "Altitude unit label."
      },
      {
        "name": "accentAlt",
        "type": "boolean",
        "default": "true",
        "description": "Tints the altitude value with the accent."
      }
    ],
    "a11y": [
      "The container has an aria-label; values read as \"37.7749 degrees N\"."
    ],
    "related": [
      "compass",
      "scale-bar",
      "key-value"
    ],
    "intro": "Coordinates are the system’s native data type. This readout uses monospace tabular figures, hemisphere suffixes instead of signs, and a frosted inset surface so it stays legible over imagery.",
    "examples": [
      "Position readout"
    ]
  },
  {
    "slug": "legend",
    "name": "Legend",
    "category": "Data",
    "summary": "Series key for charts and map layers, with optional counts.",
    "status": "Stable",
    "props": [
      {
        "name": "items",
        "type": "LegendItem[]",
        "default": "—",
        "description": "label, value, color, shape."
      },
      {
        "name": "column",
        "type": "boolean",
        "default": "false",
        "description": "Vertical stacking."
      }
    ],
    "a11y": [
      "Rendered as a list, so item count is announced."
    ],
    "related": [
      "sparkline",
      "table"
    ],
    "examples": [
      "Column layout"
    ]
  },
  {
    "slug": "tabs",
    "name": "Tabs",
    "category": "Navigation",
    "summary": "Switch between sibling views without leaving the page.",
    "status": "Stable",
    "props": [
      {
        "name": "items",
        "type": "TabItem[]",
        "default": "—",
        "description": "id, label, optional count and icon."
      },
      {
        "name": "value",
        "type": "string",
        "default": "—",
        "description": "Active tab id."
      },
      {
        "name": "onChange",
        "type": "(id: string) => void",
        "default": "—",
        "description": "Selection handler."
      },
      {
        "name": "variant",
        "type": "'underline' | 'enclosed'",
        "default": "'underline'",
        "description": "Visual treatment."
      }
    ],
    "a11y": [
      "role=\"tablist\" with aria-selected; pair with role=\"tabpanel\" in your content area."
    ],
    "related": [
      "segmented-control",
      "breadcrumb"
    ],
    "examples": [
      "Underline",
      "Enclosed"
    ]
  },
  {
    "slug": "menu",
    "name": "Menu",
    "category": "Navigation",
    "summary": "A dropdown of actions for one object. Keyboard-driven, portalled, and never clipped by its parent.",
    "status": "Stable",
    "props": [
      {
        "name": "items",
        "type": "MenuEntry[]",
        "default": "—",
        "description": "Items, 'separator' strings, or { header } group labels."
      },
      {
        "name": "label",
        "type": "string",
        "default": "—",
        "description": "Accessible name; also the default trigger text."
      },
      {
        "name": "icon",
        "type": "IconName",
        "default": "—",
        "description": "Leading icon on the default trigger."
      },
      {
        "name": "trigger",
        "type": "ReactNode",
        "default": "—",
        "description": "Replaces the trigger contents (icon-only, avatar, custom)."
      },
      {
        "name": "align",
        "type": "'start' | 'end'",
        "default": "'start'",
        "description": "Which trigger edge the menu aligns to."
      },
      {
        "name": "width",
        "type": "number",
        "default": "trigger width",
        "description": "Minimum menu width in px."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the trigger."
      }
    ],
    "a11y": [
      "The trigger carries aria-haspopup=\"menu\", aria-expanded and aria-controls.",
      "Roving focus: ArrowUp/ArrowDown cycle, Home/End jump, Esc closes and returns focus to the trigger.",
      "Checkable items use role=\"menuitemcheckbox\" with aria-checked, not a tick icon alone."
    ],
    "related": [
      "button",
      "tabs",
      "tooltip"
    ],
    "examples": [
      "Actions",
      "Aligned to the end"
    ]
  },
  {
    "slug": "sidebar",
    "name": "Sidebar",
    "category": "Navigation",
    "summary": "The navigation spine: sections of rows, one active row, optional folding, optional icon rail.",
    "status": "New",
    "props": [
      {
        "name": "sections",
        "type": "SidebarSection[]",
        "default": "—",
        "description": "id, title?, count?, collapsible?, defaultOpen?, items."
      },
      {
        "name": "items",
        "type": "SidebarItem[]",
        "default": "—",
        "description": "id, label, icon?, href?, badge?, active?, disabled?, onSelect?"
      },
      {
        "name": "collapsed",
        "type": "boolean",
        "default": "false",
        "description": "56px icon rail with flyout labels."
      },
      {
        "name": "rail",
        "type": "boolean",
        "default": "true",
        "description": "Travelling accent tick on the active row."
      },
      {
        "name": "header / footer",
        "type": "ReactNode",
        "default": "—",
        "description": "Pinned above and below the scrolling nav."
      },
      {
        "name": "width",
        "type": "number",
        "default": "sidebar-w token",
        "description": "Overrides the token width."
      }
    ],
    "a11y": [
      "A single <nav> landmark with aria-label; the active row carries aria-current=\"page\".",
      "ArrowUp/ArrowDown move between rows, Home/End jump to the ends — focus stays in the nav.",
      "Folding is aria-expanded on the section toggle with aria-controls pointing at the group."
    ],
    "guidance": {
      "do": [
        "Keep one active row — the tick, the tint, and aria-current all point at the same place.",
        "Let the nav reveal itself: on first paint it parks the active row’s heading at the top, so the hierarchy stays readable."
      ],
      "dont": [
        "Don’t put more than a dozen destinations in the rail — the flyout turns hovering into reading.",
        "Don’t pin the active row to the bottom edge with a minimal scroll; the reader lands on a stray label."
      ]
    },
    "related": [
      "menu",
      "tabs",
      "breadcrumb"
    ],
    "intro": "A sidebar is where a geospatial product puts its object model — layers, assets, analysis tools. It needs three things a generic list does not: a travelling active indicator, section folding that does not jump the scroll position, and a rail mode narrow enough to give the globe the screen back.",
    "examples": [
      "Sections",
      "Icon rail"
    ]
  },
  {
    "slug": "breadcrumb",
    "name": "Breadcrumb",
    "category": "Navigation",
    "summary": "Hierarchical location trail with monospace separators.",
    "status": "Stable",
    "props": [
      {
        "name": "items",
        "type": "BreadcrumbItem[]",
        "default": "—",
        "description": "label, optional href or onClick."
      },
      {
        "name": "separator",
        "type": "ReactNode",
        "default": "'/'",
        "description": "Separator glyph."
      }
    ],
    "a11y": [
      "Wrapped in nav with aria-label=\"Breadcrumb\"; the last item gets aria-current=\"page\"."
    ],
    "related": [
      "tabs",
      "pagination"
    ],
    "examples": [
      "Trail"
    ]
  },
  {
    "slug": "pagination",
    "name": "Pagination",
    "category": "Navigation",
    "summary": "Page control that collapses long ranges around the current page.",
    "status": "Stable",
    "props": [
      {
        "name": "page / pageCount",
        "type": "number",
        "default": "—",
        "description": "Current page and total pages."
      },
      {
        "name": "onChange",
        "type": "(page: number) => void",
        "default": "—",
        "description": "Page change handler."
      },
      {
        "name": "showMeta",
        "type": "boolean",
        "default": "false",
        "description": "Shows total records and page size."
      }
    ],
    "a11y": [
      "Current page uses aria-current=\"page\"; prev/next have labels and disabled states."
    ],
    "related": [
      "table"
    ],
    "examples": [
      "With record count"
    ]
  },
  {
    "slug": "dropdown",
    "name": "Dropdown",
    "category": "Overlay",
    "summary": "A trigger with a floating panel of arbitrary content — filters, mini forms, detail cards.",
    "status": "New",
    "props": [
      {
        "name": "trigger",
        "type": "ReactNode",
        "default": "—",
        "description": "Contents of the trigger button."
      },
      {
        "name": "children",
        "type": "ReactNode",
        "default": "—",
        "description": "Panel content — any component."
      },
      {
        "name": "label",
        "type": "string",
        "default": "—",
        "description": "Accessible name for the panel and trigger."
      },
      {
        "name": "align",
        "type": "'start' | 'end'",
        "default": "'start'",
        "description": "Which trigger edge the panel hangs from."
      },
      {
        "name": "side",
        "type": "'bottom' | 'top' | 'auto'",
        "default": "'bottom'",
        "description": "Preferred side; flips when there is no room."
      },
      {
        "name": "width",
        "type": "number",
        "default": "content",
        "description": "Minimum panel width in px."
      },
      {
        "name": "matchWidth",
        "type": "boolean",
        "default": "false",
        "description": "Panel takes the trigger width."
      },
      {
        "name": "closeOnAction",
        "type": "boolean",
        "default": "true",
        "description": "Honours data-dropdown-close descendants."
      },
      {
        "name": "open / onOpenChange",
        "type": "boolean / fn",
        "default": "—",
        "description": "Controlled open state."
      }
    ],
    "a11y": [
      "The panel is role=\"dialog\" with an aria-label and tabIndex={-1}; the trigger carries aria-haspopup=\"dialog\".",
      "Focus moves to the first control on open and returns to the trigger on Esc.",
      "Outside click and scroll-away both close it; the panel is portalled, so no parent can clip it."
    ],
    "related": [
      "menu",
      "select",
      "modal"
    ],
    "intro": "Menu is for verbs; Dropdown is for surfaces. The panel holds whatever you put in it, takes focus on open, and hands focus back on close. Use it when the thing behind the trigger needs controls, not a list of actions.",
    "examples": [
      "Filter panel",
      "Detail card"
    ]
  },
  {
    "slug": "modal",
    "name": "Modal",
    "category": "Overlay",
    "summary": "Focused dialog for a decision or a short task.",
    "status": "Stable",
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "false",
        "description": "Visibility."
      },
      {
        "name": "onClose",
        "type": "() => void",
        "default": "—",
        "description": "Called on Escape, overlay click or close button."
      },
      {
        "name": "title / description",
        "type": "ReactNode",
        "default": "—",
        "description": "Header content."
      },
      {
        "name": "footer",
        "type": "ReactNode",
        "default": "—",
        "description": "Action row."
      },
      {
        "name": "width",
        "type": "number",
        "default": "480",
        "description": "Max panel width in px."
      }
    ],
    "a11y": [
      "role=\"dialog\" with aria-modal and an accessible title.",
      "Escape closes; focus is moved into the panel on open.",
      "Body scroll is locked while the dialog is mounted."
    ],
    "related": [
      "drawer",
      "alert"
    ],
    "intro": "The overlay blurs and saturates the scene behind it — the content stays visible but unmistakably inactive. Escape closes, focus moves into the panel, and body scroll is locked while open.",
    "examples": [
      "Form dialog"
    ]
  },
  {
    "slug": "drawer",
    "name": "Drawer",
    "category": "Overlay",
    "summary": "Side panel for inspecting or editing one object without losing context.",
    "status": "Stable",
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "default": "false",
        "description": "Visibility."
      },
      {
        "name": "onClose",
        "type": "() => void",
        "default": "—",
        "description": "Close handler."
      },
      {
        "name": "title",
        "type": "ReactNode",
        "default": "—",
        "description": "Header title."
      },
      {
        "name": "width",
        "type": "number",
        "default": "420",
        "description": "Panel width in px."
      },
      {
        "name": "footer",
        "type": "ReactNode",
        "default": "—",
        "description": "Action row."
      }
    ],
    "a11y": [
      "role=\"dialog\" with aria-modal; Escape closes.",
      "Do not nest a drawer inside a modal."
    ],
    "related": [
      "modal",
      "panel"
    ],
    "examples": [
      "Inspector"
    ]
  },
  {
    "slug": "alert",
    "name": "Alert",
    "category": "Overlay",
    "summary": "Inline message tied to the content around it — not a toast.",
    "status": "Stable",
    "props": [
      {
        "name": "tone",
        "type": "'accent' | 'success' | 'warning' | 'danger' | 'neutral'",
        "default": "'neutral'",
        "description": "Semantic tone and default icon."
      },
      {
        "name": "title",
        "type": "ReactNode",
        "default": "—",
        "description": "One-line summary."
      },
      {
        "name": "icon",
        "type": "ReactNode | false",
        "default": "—",
        "description": "Override or remove the icon."
      },
      {
        "name": "onClose",
        "type": "() => void",
        "default": "—",
        "description": "Adds a dismiss control."
      }
    ],
    "a11y": [
      "role=\"status\" so the message is announced when it appears.",
      "Persistent alerts should not be dismissible if the state still holds."
    ],
    "related": [
      "modal",
      "progress"
    ],
    "examples": [
      "Tones"
    ]
  },
  {
    "slug": "compass",
    "name": "Compass",
    "category": "HUD",
    "summary": "Camera heading indicator: a fixed card, a needle that tracks north.",
    "status": "New",
    "props": [
      {
        "name": "heading",
        "type": "number",
        "default": "0",
        "description": "Camera heading in degrees, 0 = north."
      },
      {
        "name": "size",
        "type": "number",
        "default": "72",
        "description": "Diameter in px."
      },
      {
        "name": "showHeading",
        "type": "boolean",
        "default": "true",
        "description": "Numeric readout plate."
      }
    ],
    "a11y": [
      "role=\"img\" with a label describing the rounded heading."
    ],
    "related": [
      "coordinate-readout",
      "scale-bar"
    ],
    "intro": "The compass is drawn as an instrument, not an icon: 24 ticks at 15°, major ticks every 45°, and cardinal letters fixed to the card so N always reads north-up. Only the needle turns — it rotates by the negative of the heading, because it points at north, not at the camera.",
    "examples": [
      "Live heading"
    ]
  },
  {
    "slug": "scale-bar",
    "name": "ScaleBar",
    "category": "HUD",
    "summary": "Map scale bracket with end caps and a mid tick.",
    "status": "New",
    "props": [
      {
        "name": "distance",
        "type": "number",
        "default": "—",
        "description": "Represented distance."
      },
      {
        "name": "unit",
        "type": "string",
        "default": "'km'",
        "description": "Unit label."
      },
      {
        "name": "width",
        "type": "number",
        "default": "132",
        "description": "Bracket width in px."
      },
      {
        "name": "label",
        "type": "string",
        "default": "—",
        "description": "Overrides the auto label."
      }
    ],
    "a11y": [
      "Carries an aria-label such as \"Scale: 500 km\"."
    ],
    "related": [
      "compass",
      "coordinate-readout"
    ],
    "examples": [
      "Distances"
    ]
  },
  {
    "slug": "reasoning-trace",
    "name": "ReasoningTrace",
    "category": "AI",
    "summary": "The steps an agent took, as a collapsible list with per-step timing.",
    "status": "New",
    "props": [
      {
        "name": "steps",
        "type": "TraceStep[]",
        "default": "—",
        "description": "id, label, detail, status, time."
      },
      {
        "name": "title",
        "type": "ReactNode",
        "default": "'Reasoning'",
        "description": "Header caption."
      },
      {
        "name": "summary",
        "type": "ReactNode",
        "default": "step count",
        "description": "Right-hand caption when idle."
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "default": "true",
        "description": "Initial expanded state."
      },
      {
        "name": "open",
        "type": "boolean",
        "default": "—",
        "description": "Controlled state."
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "default": "—",
        "description": "Fires on toggle."
      }
    ],
    "a11y": [
      "The header is a button with aria-expanded; the list is an ordered list, so step order is announced.",
      "Status is never carried by colour alone — the active step is also the one with a running summary."
    ],
    "related": [
      "tool-call",
      "message",
      "context-meter"
    ],
    "intro": "A trace is an audit trail, not a feature. It stays open while a step is running — a trace you have to click to watch is a trace nobody watches — and collapses to one line when it finishes.",
    "examples": [
      "Mid-run",
      "Collapsed"
    ]
  },
  {
    "slug": "tool-call",
    "name": "ToolCall",
    "category": "AI",
    "summary": "One tool invocation: name, arguments, status, duration and raw result.",
    "status": "New",
    "props": [
      {
        "name": "name",
        "type": "string",
        "default": "—",
        "description": "Tool identifier, printed in monospace."
      },
      {
        "name": "args",
        "type": "Record<string, string | number | boolean>",
        "default": "—",
        "description": "Arguments shown inline."
      },
      {
        "name": "status",
        "type": "'running' | 'done' | 'failed'",
        "default": "'done'",
        "description": "Drives icon and status colour."
      },
      {
        "name": "result",
        "type": "ReactNode",
        "default": "—",
        "description": "Payload; a string is printed as-is."
      },
      {
        "name": "duration",
        "type": "string",
        "default": "—",
        "description": "Formatted elapsed time."
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "default": "false",
        "description": "Expands the payload initially."
      }
    ],
    "a11y": [
      "The toggle is a button with aria-expanded and an accessible label.",
      "A failed call prints the error text in the body, so the failure is not only a red status word."
    ],
    "related": [
      "reasoning-trace",
      "message",
      "table"
    ],
    "intro": "The header is meant to be readable without expanding it — name, arguments, duration, outcome. The body is the payload exactly as it came back, in monospace, because the first thing anyone does with a failed call is read it.",
    "examples": [
      "Running, done, failed"
    ]
  },
  {
    "slug": "context-meter",
    "name": "ContextMeter",
    "category": "AI",
    "summary": "How much of the context window is spent, split by what spent it.",
    "status": "New",
    "props": [
      {
        "name": "segments",
        "type": "ContextSegment[]",
        "default": "—",
        "description": "label, tokens, tone."
      },
      {
        "name": "limit",
        "type": "number",
        "default": "—",
        "description": "Context window size in tokens."
      },
      {
        "name": "label",
        "type": "ReactNode",
        "default": "'Context'",
        "description": "Left caption."
      },
      {
        "name": "showLegend",
        "type": "boolean",
        "default": "true",
        "description": "Prints the per-segment counts."
      }
    ],
    "a11y": [
      "The bar is role=\"img\" with an aria-label listing every segment and its token count, so the legend is not the only way to read it."
    ],
    "related": [
      "progress",
      "stat",
      "reasoning-trace"
    ],
    "intro": "The bar is scaled to the limit, not to the used total: an empty half means room left. Segments are tokens, not percentages, so the legend can show the real numbers.",
    "examples": [
      "Segmented usage"
    ]
  },
  {
    "slug": "message",
    "name": "Message",
    "category": "Chat",
    "summary": "One turn in a transcript, with role, timing and an optional streaming caret.",
    "status": "New",
    "props": [
      {
        "name": "role",
        "type": "'user' | 'assistant' | 'system' | 'tool'",
        "default": "—",
        "description": "Sets the treatment and the label."
      },
      {
        "name": "author",
        "type": "ReactNode",
        "default": "—",
        "description": "Display name next to the role."
      },
      {
        "name": "time",
        "type": "ReactNode",
        "default": "—",
        "description": "Right-aligned timestamp."
      },
      {
        "name": "streaming",
        "type": "boolean",
        "default": "false",
        "description": "Adds the caret and aria-busy."
      },
      {
        "name": "meta",
        "type": "Array<{ label, value }>",
        "default": "—",
        "description": "Token counts, latency, cost."
      },
      {
        "name": "actions",
        "type": "ReactNode",
        "default": "—",
        "description": "Trailing controls under the body."
      }
    ],
    "a11y": [
      "aria-busy on a streaming turn tells assistive technology the text is still arriving.",
      "Role is printed as text, so it is not conveyed by colour alone."
    ],
    "related": [
      "composer",
      "typing-indicator",
      "thread-list"
    ],
    "intro": "A transcript, not a bubble sheet. The role sits above the text in 9.5px monospace; a user turn gets a tinted block with a 2px edge, an assistant turn stays on the page. System turns are monospace and dim.",
    "examples": [
      "Transcript",
      "Streaming"
    ]
  },
  {
    "slug": "composer",
    "name": "Composer",
    "category": "Chat",
    "summary": "The input line: attach, hint, counter, and send that becomes stop.",
    "status": "New",
    "props": [
      {
        "name": "value",
        "type": "string",
        "default": "—",
        "description": "Controlled text; omit for uncontrolled."
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "default": "—",
        "description": "Fires on every keystroke."
      },
      {
        "name": "onSend",
        "type": "() => void",
        "default": "—",
        "description": "Enter or the send button."
      },
      {
        "name": "onStop",
        "type": "() => void",
        "default": "—",
        "description": "The stop button, shown while busy."
      },
      {
        "name": "busy",
        "type": "boolean",
        "default": "false",
        "description": "Swaps send for stop and blocks Enter."
      },
      {
        "name": "maxLength",
        "type": "number",
        "default": "—",
        "description": "Adds the character counter."
      },
      {
        "name": "rows",
        "type": "number",
        "default": "2",
        "description": "Initial height in rows."
      },
      {
        "name": "hint",
        "type": "ReactNode",
        "default": "'⏎ send · ⇧⏎ line break'",
        "description": "Keyboard legend."
      }
    ],
    "a11y": [
      "The textarea is labelled by aria-label; both buttons carry their own labels rather than relying on the icon.",
      "The stop button stays focusable while busy — stopping a run must not require a mouse."
    ],
    "related": [
      "message",
      "textarea",
      "button"
    ],
    "intro": "Enter sends, Shift+Enter breaks the line. That contract is printed as a mono hint rather than explained in a tooltip, because it is the one thing people get wrong in a chat box.",
    "examples": [
      "Composing and streaming"
    ]
  },
  {
    "slug": "typing-indicator",
    "name": "TypingIndicator",
    "category": "Chat",
    "summary": "Three dots and a caption: what the surface does while it waits.",
    "status": "New",
    "props": [
      {
        "name": "label",
        "type": "ReactNode",
        "default": "'Generating'",
        "description": "Monospace caption after the dots."
      }
    ],
    "a11y": [
      "The dots are aria-hidden; the caption carries the meaning.",
      "Under prefers-reduced-motion the dots hold still and the caption does the work."
    ],
    "related": [
      "spinner",
      "message",
      "skeleton"
    ],
    "intro": "The dots run on a 1.15s cycle with 140ms between them. The caption is the useful half — \"Retrieving tiles\" tells you more than three dots ever will.",
    "examples": [
      "Captions"
    ]
  },
  {
    "slug": "thread-list",
    "name": "ThreadList",
    "category": "Chat",
    "summary": "Conversations as rows: title, preview, time, unread count.",
    "status": "New",
    "props": [
      {
        "name": "items",
        "type": "ThreadItem[]",
        "default": "—",
        "description": "id, title, preview, time, unread."
      },
      {
        "name": "value",
        "type": "string",
        "default": "—",
        "description": "Active thread id."
      },
      {
        "name": "onSelect",
        "type": "(id: string) => void",
        "default": "—",
        "description": "Fires on row click."
      }
    ],
    "a11y": [
      "Rows are buttons inside a list; the active row carries aria-current.",
      "The unread count is inside the title text, so it is read out with the thread name."
    ],
    "related": [
      "message",
      "sidebar",
      "menu"
    ],
    "intro": "Dense rows with a 2px accent edge on the active one. Each row is a button, so the whole surface is keyboard reachable without a roving tabindex.",
    "examples": [
      "With unread"
    ]
  },
  {
    "slug": "quantity",
    "name": "Quantity",
    "category": "Science",
    "summary": "A measured value: digits, ± uncertainty, power of ten, unit.",
    "status": "New",
    "props": [
      {
        "name": "value",
        "type": "number | string",
        "default": "—",
        "description": "The measurement."
      },
      {
        "name": "unit",
        "type": "ReactNode",
        "default": "—",
        "description": "Printed after the digits, de-emphasised."
      },
      {
        "name": "uncertainty",
        "type": "number | string",
        "default": "—",
        "description": "Absolute uncertainty, printed as ±."
      },
      {
        "name": "precision",
        "type": "number",
        "default": "0",
        "description": "Decimal places for a numeric value."
      },
      {
        "name": "exponent",
        "type": "number",
        "default": "—",
        "description": "Power of ten, printed as ×10ⁿ."
      },
      {
        "name": "size",
        "type": "'sm' | 'md' | 'lg'",
        "default": "'md'",
        "description": "Type scale."
      }
    ],
    "a11y": [
      "The exponent carries an aria-label (\"times ten to the minus thirty-one\") because a superscript is not read out reliably.",
      "Uncertainty and unit are plain text in the same node, so a screen reader reads the whole quantity as one string."
    ],
    "related": [
      "key-value",
      "stat",
      "vector-readout"
    ],
    "intro": "Every part is monospace and tabular, so a column of quantities lines up on the decimal point. The exponent is separated into ×10⁻⁹ rather than folded into the digits — that is how the number is written on paper.",
    "examples": [
      "In a readout",
      "Sizes"
    ]
  },
  {
    "slug": "vector-readout",
    "name": "VectorReadout",
    "category": "Science",
    "summary": "Three components and a magnitude, sharing one decimal column.",
    "status": "New",
    "props": [
      {
        "name": "x",
        "type": "number",
        "default": "—",
        "description": "First component."
      },
      {
        "name": "y",
        "type": "number",
        "default": "—",
        "description": "Second component."
      },
      {
        "name": "z",
        "type": "number",
        "default": "—",
        "description": "Optional third component."
      },
      {
        "name": "unit",
        "type": "string",
        "default": "—",
        "description": "Shown on every row."
      },
      {
        "name": "magnitude",
        "type": "number",
        "default": "—",
        "description": "Adds the |v| row."
      },
      {
        "name": "precision",
        "type": "number",
        "default": "1",
        "description": "Decimal places."
      },
      {
        "name": "labels",
        "type": "[string, string, string]",
        "default": "['x','y','z']",
        "description": "Axis captions."
      }
    ],
    "a11y": [
      "Axis labels are text, not icons; the magnitude row is labelled \"|v|\" rather than a bare number."
    ],
    "related": [
      "quantity",
      "coordinate-readout",
      "key-value"
    ],
    "intro": "Each row is its own grid with the value right-aligned, so x, y and z stack on the decimal point instead of drifting with the label width. Labels default to x/y/z and can be swapped for e/n/u or anything else.",
    "examples": [
      "ECEF and ENU"
    ]
  },
  {
    "slug": "histogram",
    "name": "Histogram",
    "category": "Science",
    "summary": "Binned counts as a static SVG, linear or log, with an optional marker.",
    "status": "New",
    "props": [
      {
        "name": "bins",
        "type": "HistogramBin[]",
        "default": "—",
        "description": "x0, x1, count per bin."
      },
      {
        "name": "height",
        "type": "number",
        "default": "120",
        "description": "View-box height in px."
      },
      {
        "name": "log",
        "type": "boolean",
        "default": "false",
        "description": "Log-scaled counts."
      },
      {
        "name": "unit",
        "type": "string",
        "default": "—",
        "description": "Appended to the caption and the aria-label."
      },
      {
        "name": "marker",
        "type": "number",
        "default": "—",
        "description": "Dashed vertical line with a value label."
      }
    ],
    "a11y": [
      "The SVG is role=\"img\" with a label naming the bin count, the total and the unit; the numbers are also printed in the footer."
    ],
    "related": [
      "sparkline",
      "progress",
      "stat"
    ],
    "intro": "Static on purpose: a histogram in an instrument panel is read at a glance, and every pixel of interaction is a pixel that can lag behind the data. The bin geometry comes from the data — pass x0/x1/count and the axis follows.",
    "examples": [
      "Linear",
      "Log counts"
    ]
  },
  {
    "slug": "event-display",
    "name": "EventDisplay",
    "category": "Science",
    "summary": "A transverse view of one collision: tracker, tracks and calorimeter towers.",
    "status": "New",
    "props": [
      {
        "name": "tracks",
        "type": "EventTrack[]",
        "default": "[]",
        "description": "angle (deg), length (0–1), charge."
      },
      {
        "name": "calorimeter",
        "type": "EventCalo[]",
        "default": "[]",
        "description": "angle, energy (0–1)."
      },
      {
        "name": "hits",
        "type": "EventHit[]",
        "default": "[]",
        "description": "x/y in −1…1 of the detector radius."
      },
      {
        "name": "label",
        "type": "string",
        "default": "—",
        "description": "Mono caption in the corner."
      },
      {
        "name": "size",
        "type": "number",
        "default": "—",
        "description": "Rendered px; the view-box is 240."
      }
    ],
    "a11y": [
      "role=\"img\" with a label that states the track count; the caption prop carries the run and event numbers.",
      "Charge is encoded by colour and by stroke style — dashed for neutral — so it survives a greyscale print."
    ],
    "related": [
      "histogram",
      "compass",
      "legend"
    ],
    "intro": "Geometry only — no simulation and no randomness, so the same event always draws the same picture. Tracks curve with charge, the calorimeter towers grow from the inner ring by energy, and the vertex is a single filled dot.",
    "examples": [
      "One event"
    ]
  },
  {
    "slug": "sequence-view",
    "name": "SequenceView",
    "category": "Science",
    "summary": "A wrapped nucleotide or protein sequence with a position ruler.",
    "status": "New",
    "props": [
      {
        "name": "sequence",
        "type": "string",
        "default": "—",
        "description": "Residues, one letter each."
      },
      {
        "name": "kind",
        "type": "'dna' | 'protein'",
        "default": "'dna'",
        "description": "Selects the colour classes."
      },
      {
        "name": "start",
        "type": "number",
        "default": "1",
        "description": "First position in the ruler."
      },
      {
        "name": "perLine",
        "type": "number",
        "default": "60",
        "description": "Residues per row."
      },
      {
        "name": "highlight",
        "type": "{ start, end }",
        "default": "—",
        "description": "0-based, end exclusive."
      },
      {
        "name": "colorBy",
        "type": "boolean",
        "default": "true",
        "description": "Colour residues by class."
      },
      {
        "name": "label",
        "type": "string",
        "default": "—",
        "description": "Caption and legend."
      }
    ],
    "a11y": [
      "The sequence is real text, so it can be selected and copied; the ruler is a separate span and is not read as part of the sequence.",
      "Colour is an annotation, not the only encoding — every residue letter is still printed."
    ],
    "related": [
      "table",
      "key-value",
      "quantity"
    ],
    "intro": "Residues are coloured by chemical class, the way an alignment viewer does it: for DNA that is one colour per base, for protein it is hydrophobic / polar / basic / acidic / special. Pass colorBy={false} for a plain alignment view.",
    "examples": [
      "DNA with a highlighted range",
      "Protein"
    ]
  },
  {
    "slug": "dose-response",
    "name": "DoseResponse",
    "category": "Science",
    "summary": "A four-parameter dose–response curve on a log x axis, with IC50 marked.",
    "status": "New",
    "props": [
      {
        "name": "ic50",
        "type": "number",
        "default": "—",
        "description": "Half-maximal concentration."
      },
      {
        "name": "hill",
        "type": "number",
        "default": "1",
        "description": "Hill slope."
      },
      {
        "name": "top",
        "type": "number",
        "default": "100",
        "description": "Upper asymptote."
      },
      {
        "name": "bottom",
        "type": "number",
        "default": "0",
        "description": "Lower asymptote."
      },
      {
        "name": "points",
        "type": "DosePoint[]",
        "default": "[]",
        "description": "Measured x/y pairs."
      },
      {
        "name": "xRange",
        "type": "[number, number]",
        "default": "ic50/100…ic50×100",
        "description": "Log axis extent."
      },
      {
        "name": "unit",
        "type": "string",
        "default": "—",
        "description": "Appended to the IC50 label."
      }
    ],
    "a11y": [
      "role=\"img\" with a label stating the IC50 and unit; the decade ticks are real text in the SVG."
    ],
    "related": [
      "histogram",
      "sparkline",
      "stat"
    ],
    "intro": "Log scale is not an option here: a linear axis turns every dose–response plot into an L. The curve is drawn from ic50 and hill; measured points are overlaid so you can see the fit against the data.",
    "examples": [
      "IC50 with measured points"
    ]
  }
];

export const catalogByCategory: Array<{ category: CatalogCategory; docs: CatalogEntry[] }> = [
  {
    category: "Actions",
    docs: catalog.filter((d) => d.category === "Actions"),
  },
  {
    category: "Forms",
    docs: catalog.filter((d) => d.category === "Forms"),
  },
  {
    category: "Display",
    docs: catalog.filter((d) => d.category === "Display"),
  },
  {
    category: "Layout",
    docs: catalog.filter((d) => d.category === "Layout"),
  },
  {
    category: "Data",
    docs: catalog.filter((d) => d.category === "Data"),
  },
  {
    category: "Navigation",
    docs: catalog.filter((d) => d.category === "Navigation"),
  },
  {
    category: "Overlay",
    docs: catalog.filter((d) => d.category === "Overlay"),
  },
  {
    category: "HUD",
    docs: catalog.filter((d) => d.category === "HUD"),
  },
  {
    category: "AI",
    docs: catalog.filter((d) => d.category === "AI"),
  },
  {
    category: "Chat",
    docs: catalog.filter((d) => d.category === "Chat"),
  },
  {
    category: "Science",
    docs: catalog.filter((d) => d.category === "Science"),
  },
];

export const catalogCount = catalog.length;

export const findEntry = (slug: string): CatalogEntry | undefined =>
  catalog.find((entry) => entry.slug === slug);
