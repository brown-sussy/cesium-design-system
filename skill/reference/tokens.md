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
| `--cs-bg-base` | `#090A0E` | `#F4F5F7` |
| `--cs-bg-canvas` | `#0D0F14` | `#F9FAFB` |
| `--cs-bg-surface` | `#13161F` | `#FFFFFF` |
| `--cs-bg-raised` | `#1A1E29` | `#FFFFFF` |
| `--cs-bg-inset` | `#07080B` | `#EEF0F3` |
| `--cs-bg-hover` | `rgba(255,255,255,0.06)` | `rgba(12,13,15,0.045)` |
| `--cs-bg-active` | `rgba(255,255,255,0.095)` | `rgba(12,13,15,0.08)` |
| `--cs-bg-selected` | `rgba(78,184,222,0.13)` | `rgba(31,108,135,0.08)` |

### Borders

| Token | Dark | Light |
| --- | --- | --- |
| `--cs-border-subtle` | `rgba(255,255,255,0.08)` | `rgba(12,13,15,0.08)` |
| `--cs-border` | `rgba(255,255,255,0.14)` | `rgba(12,13,15,0.14)` |
| `--cs-border-strong` | `rgba(255,255,255,0.26)` | `rgba(12,13,15,0.26)` |

### Text

| Token | Dark | Light |
| --- | --- | --- |
| `--cs-text-primary` | `#F8F9FA` | `#0D0E11` |
| `--cs-text-secondary` | `#A6ABB3` | `#545960` |
| `--cs-text-tertiary` | `#7E848D` | `#6D727B` |
| `--cs-text-disabled` | `#4B5057` | `#A4A8AE` |
| `--cs-text-inverse` | `#090A0E` | `#FFFFFF` |

### Solid (primary action)

| Token | Dark | Light |
| --- | --- | --- |
| `--cs-solid` | `#F8F9FA` | `#111317` |
| `--cs-solid-hover` | `#FFFFFF` | `#000000` |
| `--cs-solid-active` | `#D6D9DD` | `#26282E` |
| `--cs-solid-contrast` | `#090A0E` | `#FFFFFF` |

### Accent (interaction signal)

| Token | Dark | Light |
| --- | --- | --- |
| `--cs-accent` | `#4EB8DE` | `#1F6C87` |
| `--cs-accent-hover` | `#6EC7EA` | `#17576E` |
| `--cs-accent-active` | `#3EA0C4` | `#124355` |
| `--cs-accent-contrast` | `#041217` | `#FFFFFF` |
| `--cs-accent-soft` | `rgba(78,184,222,0.14)` | `rgba(31,108,135,0.09)` |
| `--cs-accent-line` | `rgba(78,184,222,0.38)` | `rgba(31,108,135,0.34)` |

### State

| Token | Dark | Light |
| --- | --- | --- |
| `--cs-success` | `#34D399` | `#0E8A5E` |
| `--cs-success-soft` | `rgba(52,211,153,0.14)` | `rgba(14,138,94,0.10)` |
| `--cs-warning` | `#FBBF24` | `#B46A08` |
| `--cs-warning-soft` | `rgba(251,191,36,0.14)` | `rgba(180,106,8,0.10)` |
| `--cs-danger` | `#F87171` | `#C53046` |
| `--cs-danger-soft` | `rgba(248,113,113,0.14)` | `rgba(197,48,70,0.10)` |
| `--cs-danger-contrast` | `#1B0409` | `#FFFFFF` |
| `--cs-info` | `#60A5FA` | `#2563EB` |
| `--cs-info-soft` | `rgba(96,165,250,0.14)` | `rgba(37,99,235,0.10)` |

### Texture & overlay

| Token | Dark | Light |
| --- | --- | --- |
| `--cs-grid-line` | `rgba(255,255,255,0.04)` | `rgba(12,13,15,0.04)` |
| `--cs-grid-line-strong` | `rgba(255,255,255,0.08)` | `rgba(12,13,15,0.08)` |
| `--cs-overlay` | `rgba(4,5,7,0.76)` | `rgba(12,13,15,0.42)` |
| `--cs-shadow-color` | `0,0,0` | `12,13,15` |

## Elevation (themed)

| Token | Dark | Light |
| --- | --- | --- |
| `--cs-shadow-xs` | `0 1px 2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)` | `0 1px 2px rgba(12,13,15,0.05), inset 0 1px 0 rgba(255,255,255,0.9)` |
| `--cs-shadow-sm` | `0 2px 8px -2px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.09)` | `0 2px 6px -1px rgba(12,13,15,0.08), 0 1px 2px rgba(12,13,15,0.04), inset 0 1px 0 rgba(255,255,255,0.9)` |
| `--cs-shadow-md` | `0 12px 28px -6px rgba(0,0,0,0.65), 0 4px 12px -2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)` | `0 10px 28px -6px rgba(12,13,15,0.14), 0 2px 8px -2px rgba(12,13,15,0.06), inset 0 1px 0 rgba(255,255,255,0.9)` |
| `--cs-shadow-lg` | `0 28px 64px -14px rgba(0,0,0,0.8), 0 8px 24px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)` | `0 24px 60px -12px rgba(12,13,15,0.2), 0 6px 18px -3px rgba(12,13,15,0.08), inset 0 1px 0 rgba(255,255,255,0.9)` |
| `--cs-shadow-inset` | `inset 0 1px 0 rgba(255,255,255,0.08)` | `inset 0 1px 0 rgba(255,255,255,0.95)` |

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
| `--cs-radius-xs` | `3px` |
| `--cs-radius-sm` | `4px` |
| `--cs-radius-md` | `6px` |
| `--cs-radius-lg` | `10px` |
| `--cs-radius-xl` | `14px` |
| `--cs-radius-2xl` | `18px` |
| `--cs-radius-pill` | `999px` |
| `--cs-radius-control` | `6px` |

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
| `--cs-atmos-300` | `#85C4DB` |
| `--cs-atmos-400` | `#4EB8DE` |
| `--cs-atmos-500` | `#349FCA` |
| `--cs-atmos-600` | `#2483AB` |
| `--cs-atmos-700` | `#1C6B8D` |
| `--cs-atmos-800` | `#165570` |
| `--cs-atmos-900` | `#103E52` |
| `--cs-atmos-950` | `#0A2836` |
| `--cs-slate-50` | `#F8F9FA` |
| `--cs-slate-100` | `#ECEEF0` |
| `--cs-slate-200` | `#D6D9DE` |
| `--cs-slate-300` | `#B3B8C1` |
| `--cs-slate-400` | `#8D939F` |
| `--cs-slate-500` | `#6A717E` |
| `--cs-slate-600` | `#4E545F` |
| `--cs-slate-700` | `#393E48` |
| `--cs-slate-800` | `#242831` |
| `--cs-slate-900` | `#151820` |
| `--cs-slate-950` | `#0D0F14` |
| `--cs-signal-mint` | `#34D399` |
| `--cs-signal-amber` | `#FBBF24` |
| `--cs-signal-rose` | `#F87171` |
| `--cs-signal-iris` | `#60A5FA` |
| `--cs-signal-teal` | `#2DD4BF` |
