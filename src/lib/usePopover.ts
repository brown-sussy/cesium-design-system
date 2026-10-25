import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react';

/**
 * Shared placement engine for every floating surface in the system —
 * Menu, Dropdown, Select. One implementation, so a menu, a panel and a
 * listbox all flip, clamp and scroll identically.
 *
 * Nothing here touches the browser's own popup machinery: the panel is a
 * regular element portalled to `document.body` and positioned with fixed
 * coordinates measured from the trigger.
 */

export type PopoverSide = 'bottom' | 'top' | 'auto';
export type PopoverAlign = 'start' | 'end';

export interface PopoverOptions {
  /** Which trigger edge the panel hangs from. */
  align?: PopoverAlign;
  /** Preferred side. `auto` picks whichever side has more room. */
  side?: PopoverSide;
  /** Gap between trigger and panel, in px. */
  offset?: number;
  /** Floor for the panel width, in px. */
  minWidth?: number;
  /** Panel takes the trigger's width (selects, dropdowns that mirror a field). */
  matchWidth?: boolean;
  /** Cap the height to the available space so long content scrolls instead of clipping. */
  constrain?: boolean;
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface PopoverBox {
  top: number;
  left: number;
  minWidth?: number;
  maxHeight?: number;
  placement: 'top' | 'bottom';
  align: PopoverAlign;
}

const PAD = 8;

export function usePopover<T extends HTMLElement = HTMLButtonElement>({
  align = 'start',
  side = 'bottom',
  offset = 6,
  minWidth,
  matchWidth,
  constrain = true,
  open: openProp,
  onOpenChange,
}: PopoverOptions = {}) {
  const controlled = openProp !== undefined;
  const [internal, setInternal] = useState(false);
  const open = controlled ? (openProp as boolean) : internal;

  const [box, setBox] = useState<PopoverBox | null>(null);
  const triggerNode = useRef<T | null>(null);
  // Exposed as a non-null ref so it can be handed straight to a DOM element.
  const triggerRef = triggerNode as unknown as RefObject<T>;
  const panelRef = useRef<HTMLDivElement | null>(null);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!controlled) setInternal(next);
      onOpenChange?.(next);
    },
    [controlled, onOpenChange],
  );

  const place = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const r = trigger.getBoundingClientRect();
    const panel = panelRef.current;
    const ph = panel?.offsetHeight ?? 0;
    const pw = panel?.offsetWidth ?? 0;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const below = vh - r.bottom - offset - PAD;
    const above = r.top - offset - PAD;

    let placement: 'top' | 'bottom' = 'bottom';
    if (side === 'top') placement = 'top';
    else if (side === 'auto' || side === 'bottom') {
      // Flip only when the preferred side genuinely cannot hold the panel.
      if (ph > below && above > below) placement = 'top';
    }

    const width = matchWidth ? r.width : Math.max(minWidth ?? 0, pw);

    // Horizontal clamp: keep the panel inside the viewport without
    // changing which edge it is anchored to.
    let left = align === 'end' ? r.right : r.left;
    const leftEdge = align === 'end' ? left - width : left;
    if (leftEdge + width > vw - PAD) left = vw - PAD - width + (align === 'end' ? width : 0);
    if (leftEdge < PAD) left = align === 'end' ? PAD + width : PAD;

    setBox({
      top: placement === 'bottom' ? r.bottom + offset : r.top - offset,
      left,
      minWidth: width || undefined,
      maxHeight: constrain ? Math.max(96, placement === 'bottom' ? below : above) : undefined,
      placement,
      align,
    });
  }, [align, side, offset, minWidth, matchWidth, constrain]);

  useLayoutEffect(() => {
    if (!open) {
      setBox(null);
      return;
    }
    place();
    // A second pass after the panel has content: its height changes the flip
    // decision, and its width changes the clamp.
    const id = requestAnimationFrame(place);
    return () => cancelAnimationFrame(id);
  }, [open, place]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onScroll = () => {
      const r = triggerRef.current?.getBoundingClientRect();
      if (!r || r.bottom < 0 || r.top > window.innerHeight) setOpen(false);
      else place();
    };

    document.addEventListener('pointerdown', onPointerDown, true);
    window.addEventListener('resize', place);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [open, place, setOpen]);

  /** Fixed-position style for the panel, including the anchor transform. */
  const panelStyle: CSSProperties = {
    top: box?.top ?? -9999,
    left: box?.left ?? -9999,
    minWidth: box?.minWidth,
    maxHeight: box?.maxHeight,
    transform: `translate(${align === 'end' ? '-100%' : '0'}, ${
      box?.placement === 'top' ? '-100%' : '0'
    })`,
    opacity: box ? undefined : 0,
  };

  return { open, setOpen, toggle: () => setOpen(!open), box, triggerRef, panelRef, place, panelStyle };
}
