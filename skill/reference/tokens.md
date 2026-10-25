# Tokens

GENERATED FILE — do not edit. Source: `tokens/tokens.json`.

Every value in the system is a CSS custom property. Components reference **semantic** tokens
only; primitives exist for charts and illustrations.

- Dark is the default (`:root`).
- Light is activated by `<html data-theme="light">`.
- Total: 39 themed colours, 5 elevations, 109 static values.

## Colour (themed)

### Surfaces

| Token | Dark | Light |
| --- | --- | --- |
| `--cs-bg-base` | `#08090A` | `#F3F4F5` |
| `--cs-bg-canvas` | `#0B0C0E` | `#FAFAFB` |
| `--cs-bg-surface` | `#111214` | `#FFFFFF` |
| `--cs-bg-raised` | `#18191C` | `#FFFFFF` |
| `--cs-bg-inset` | `#050506` | `#EEF0F2` |
| `--cs-bg-hover` | `rgba(255,255,255,0.05)` | `rgba(12,13,15,0.045)` |
| `--cs-bg-active` | `rgba(255,255,255,0.085)` | `rgba(12,13,15,0.08)` |
| `--cs-bg-selected` | `rgba(255,255,255,0.10)` | `rgba(12,13,15,0.07)` |

### Borders

| Token | Dark | Light |
| --- | --- | --- |
| `--cs-border-subtle` | `rgba(255,255,255,0.07)` | `rgba(12,13,15,0.08)` |
| `--cs-border` | `rgba(255,255,255,0.13)` | `rgba(12,13,15,0.14)` |
| `--cs-border-strong` | `rgba(255,255,255,0.24)` | `rgba(12,13,15,0.26)` |

### Text

| Token | Dark | Light |
| --- | --- | --- |
| `--cs-text-primary` | `#F5F6F7` | `#0D0E10` |
| `--cs-text-secondary` | `#A2A6AC` | `#54585E` |
| `--cs-text-tertiary` | `#7A7F86` | `#6A6F76` |
| `--cs-text-disabled` | `#4E5359` | `#A5A9AF` |
| `--cs-text-inverse` | `#0B0C0E` | `#FFFFFF` |

### Solid (primary action)

| Token | Dark | Light |
| --- | --- | --- |
| `--cs-solid` | `#F5F6F7` | `#131417` |
| `--cs-solid-hover` | `#E4E6E8` | `#000000` |
| `--cs-solid-active` | `#D3D6DA` | `#2C2E33` |
| `--cs-solid-contrast` | `#0B0C0E` | `#FFFFFF` |

### Accent (interaction signal)

| Token | Dark | Light |
| --- | --- | --- |
| `--cs-accent` | `#7BB1C6` | `#2A6E85` |
| `--cs-accent-hover` | `#97C2D3` | `#1F5B6F` |
| `--cs-accent-active` | `#5B9EB9` | `#164755` |
| `--cs-accent-contrast` | `#08151A` | `#FFFFFF` |
| `--cs-accent-soft` | `rgba(123,177,198,0.13)` | `rgba(42,110,133,0.09)` |
| `--cs-accent-line` | `rgba(123,177,198,0.36)` | `rgba(42,110,133,0.34)` |

### State

| Token | Dark | Light |
| --- | --- | --- |
| `--cs-success` | `#3ED598` | `#12855C` |
| `--cs-success-soft` | `rgba(62,213,152,0.12)` | `rgba(18,133,92,0.10)` |
| `--cs-warning` | `#F2B33D` | `#A6690A` |
| `--cs-warning-soft` | `rgba(242,179,61,0.12)` | `rgba(166,105,10,0.10)` |
| `--cs-danger` | `#FF6B7D` | `#C42F45` |
| `--cs-danger-soft` | `rgba(255,107,125,0.12)` | `rgba(196,47,69,0.09)` |
| `--cs-danger-contrast` | `#1B0409` | `#FFFFFF` |
| `--cs-info` | `#8AA4FF` | `#3A52C4` |
| `--cs-info-soft` | `rgba(138,164,255,0.12)` | `rgba(58,82,196,0.09)` |

### Texture & overlay

| Token | Dark | Light |
| --- | --- | --- |
| `--cs-grid-line` | `rgba(255,255,255,0.045)` | `rgba(12,13,15,0.045)` |
| `--cs-grid-line-strong` | `rgba(255,255,255,0.08)` | `rgba(12,13,15,0.08)` |
| `--cs-overlay` | `rgba(0,0,0,0.72)` | `rgba(12,13,15,0.40)` |
| `--cs-shadow-color` | `0,0,0` | `12,13,15` |

## Elevation (themed)

| Token | Dark | Light |
| --- | --- | --- |
| `--cs-shadow-xs` | `0 1px 2px rgba(0,0,0,0.5)` | `0 1px 2px rgba(12,13,15,0.07)` |
| `--cs-shadow-sm` | `0 2px 8px -2px rgba(0,0,0,0.6)` | `0 2px 6px -1px rgba(12,13,15,0.10)` |
| `--cs-shadow-md` | `0 10px 28px -8px rgba(0,0,0,0.66)` | `0 10px 28px -8px rgba(12,13,15,0.16)` |
| `--cs-shadow-lg` | `0 28px 64px -16px rgba(0,0,0,0.78)` | `0 28px 64px -16px rgba(12,13,15,0.22)` |
| `--cs-shadow-inset` | `inset 0 1px 0 rgba(255,255,255,0.05)` | `inset 0 1px 0 rgba(255,255,255,0.9)` |

## Static

### Font families

| Token | Value |
| --- | --- |
| `--cs-font-sans` | `"Instrument Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif` |
| `--cs-font-mono` | `"JetBrains Mono", "SF Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace` |
| `--cs-font-display` | `"Newsreader", "Newsreader Variable", "Iowan Old Style", Georgia, "Songti SC", "Times New Roman", serif` |

### Font sizes

| Token | Value |
| --- | --- |
| `--cs-fs-2xs` | `10px` |
| `--cs-fs-xs` | `11px` |
| `--cs-fs-sm` | `12px` |
| `--cs-fs-base` | `13px` |
| `--cs-fs-md` | `14px` |
| `--cs-fs-lg` | `16px` |
| `--cs-fs-xl` | `18px` |
| `--cs-fs-2xl` | `22px` |
| `--cs-fs-3xl` | `28px` |
| `--cs-fs-4xl` | `36px` |
| `--cs-fs-5xl` | `48px` |
| `--cs-fs-6xl` | `64px` |

### Line heights

| Token | Value |
| --- | --- |
| `--cs-lh-2xs` | `14px` |
| `--cs-lh-xs` | `16px` |
| `--cs-lh-sm` | `18px` |
| `--cs-lh-base` | `20px` |
| `--cs-lh-md` | `22px` |
| `--cs-lh-lg` | `24px` |
| `--cs-lh-xl` | `26px` |
| `--cs-lh-2xl` | `30px` |
| `--cs-lh-3xl` | `36px` |
| `--cs-lh-4xl` | `42px` |
| `--cs-lh-5xl` | `54px` |
| `--cs-lh-6xl` | `68px` |

### Weights & tracking

| Token | Value |
| --- | --- |
| `--cs-fw-regular` | `400` |
| `--cs-fw-medium` | `500` |
| `--cs-fw-semibold` | `600` |
| `--cs-fw-bold` | `700` |
| `--cs-tracking-display` | `-0.021em` |
| `--cs-tracking-tight` | `-0.014em` |
| `--cs-tracking-snug` | `-0.007em` |
| `--cs-tracking-normal` | `0em` |
| `--cs-tracking-wide` | `0.02em` |
| `--cs-tracking-wider` | `0.08em` |
| `--cs-tracking-widest` | `0.14em` |

### Space

| Token | Value |
| --- | --- |
| `--cs-space-2` | `2px` |
| `--cs-space-4` | `4px` |
| `--cs-space-6` | `6px` |
| `--cs-space-8` | `8px` |
| `--cs-space-10` | `10px` |
| `--cs-space-12` | `12px` |
| `--cs-space-16` | `16px` |
| `--cs-space-20` | `20px` |
| `--cs-space-24` | `24px` |
| `--cs-space-32` | `32px` |
| `--cs-space-40` | `40px` |
| `--cs-space-48` | `48px` |
| `--cs-space-64` | `64px` |
| `--cs-space-80` | `80px` |
| `--cs-space-96` | `96px` |
| `--cs-space-128` | `128px` |

### Radius

| Token | Value |
| --- | --- |
| `--cs-radius-xs` | `2px` |
| `--cs-radius-sm` | `3px` |
| `--cs-radius-md` | `5px` |
| `--cs-radius-lg` | `8px` |
| `--cs-radius-xl` | `12px` |
| `--cs-radius-2xl` | `16px` |
| `--cs-radius-pill` | `999px` |
| `--cs-radius-control` | `5px` |

### Motion

| Token | Value |
| --- | --- |
| `--cs-dur-instant` | `80ms` |
| `--cs-dur-fast` | `120ms` |
| `--cs-dur-base` | `180ms` |
| `--cs-dur-slow` | `260ms` |
| `--cs-dur-slower` | `420ms` |
| `--cs-ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--cs-ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `--cs-ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

### Layers & layout

| Token | Value |
| --- | --- |
| `--cs-z-base` | `0` |
| `--cs-z-sticky` | `20` |
| `--cs-z-overlay` | `40` |
| `--cs-z-modal` | `50` |
| `--cs-z-toast` | `60` |
| `--cs-z-tooltip` | `70` |
| `--cs-control-sm` | `28px` |
| `--cs-control-md` | `34px` |
| `--cs-control-lg` | `40px` |
| `--cs-header-h` | `56px` |
| `--cs-sidebar-w` | `252px` |
| `--cs-content-max` | `900px` |

### Primitive ramps

| Token | Value |
| --- | --- |
| `--cs-atmos-50` | `#EDF5F8` |
| `--cs-atmos-100` | `#D6E9F0` |
| `--cs-atmos-200` | `#B4D6E2` |
| `--cs-atmos-300` | `#97C2D3` |
| `--cs-atmos-400` | `#7BB1C6` |
| `--cs-atmos-500` | `#5B9EB9` |
| `--cs-atmos-600` | `#47849A` |
| `--cs-atmos-700` | `#376A7D` |
| `--cs-atmos-800` | `#2B5463` |
| `--cs-atmos-900` | `#1F3D48` |
| `--cs-atmos-950` | `#122630` |
| `--cs-slate-50` | `#F5F6F7` |
| `--cs-slate-100` | `#E7E9EB` |
| `--cs-slate-200` | `#D2D5D9` |
| `--cs-slate-300` | `#B0B4BA` |
| `--cs-slate-400` | `#888D94` |
| `--cs-slate-500` | `#676C73` |
| `--cs-slate-600` | `#4E5359` |
| `--cs-slate-700` | `#3B3F45` |
| `--cs-slate-800` | `#282B30` |
| `--cs-slate-900` | `#17191D` |
| `--cs-slate-950` | `#0B0C0E` |
| `--cs-signal-mint` | `#3ED598` |
| `--cs-signal-amber` | `#F2B33D` |
| `--cs-signal-rose` | `#FF6B7D` |
| `--cs-signal-iris` | `#8AA4FF` |
| `--cs-signal-teal` | `#35D6C0` |
