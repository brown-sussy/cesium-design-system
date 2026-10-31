import { computed, onBeforeUnmount, ref, watch, type CSSProperties } from 'vue';

/**
 * Shared placement engine for every floating surface in the system —
 * Menu, Dropdown, Select. One implementation, so a menu, a panel and a
 * listbox all flip, clamp and scroll identically.
 *
 * Nothing here touches the browser's own popup machinery: the panel is a
 * regular element teleported to `document.body` and positioned with fixed
 * coordinates measured from the trigger.
 *
 * Vue port notes: `open` and `minWidth` are passed as getters rather than
 * values so the composable re-reads them without a re-render.
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
  minWidth?: () => number | undefined;
  /** Panel takes the trigger's width (selects, dropdowns that mirror a field). */
  matchWidth?: boolean;
  /** Cap the height to the available space so long content scrolls instead of clipping. */
  constrain?: boolean;
  /** Controlled open state. Return `undefined` for uncontrolled. */
  open?: () => boolean | undefined;
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

export function usePopover(options: PopoverOptions = {}) {
  const align = options.align ?? 'start';
  const side = options.side ?? 'bottom';
  const offset = options.offset ?? 6;
  const constrain = options.constrain ?? true;

  const inner = ref(false);
  const box = ref<PopoverBox | null>(null);
  const triggerRef = ref<HTMLElement | null>(null);
  const panelRef = ref<HTMLElement | null>(null);

  const open = computed(() => options.open?.() ?? inner.value);

  function setOpen(next: boolean) {
    if (options.open?.() === undefined) inner.value = next;
    options.onOpenChange?.(next);
  }

  function place() {
    const trigger = triggerRef.value;
    if (!trigger) return;
    const r = trigger.getBoundingClientRect();
    const panel = panelRef.value;
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

    const width = options.matchWidth ? r.width : Math.max(options.minWidth?.() ?? 0, pw);

    // Horizontal clamp: keep the panel inside the viewport without
    // changing which edge it is anchored to.
    let left = align === 'end' ? r.right : r.left;
    const leftEdge = align === 'end' ? left - width : left;
    if (leftEdge + width > vw - PAD) left = vw - PAD - width + (align === 'end' ? width : 0);
    if (leftEdge < PAD) left = align === 'end' ? PAD + width : PAD;

    box.value = {
      top: placement === 'bottom' ? r.bottom + offset : r.top - offset,
      left,
      minWidth: width || undefined,
      maxHeight: constrain ? Math.max(96, placement === 'bottom' ? below : above) : undefined,
      placement,
      align,
    };
  }

  function onPointerDown(e: PointerEvent) {
    const t = e.target as Node;
    if (panelRef.value?.contains(t) || triggerRef.value?.contains(t)) return;
    setOpen(false);
  }

  function onScroll() {
    const r = triggerRef.value?.getBoundingClientRect();
    if (!r || r.bottom < 0 || r.top > window.innerHeight) setOpen(false);
    else place();
  }

  let listening = false;
  function listen(on: boolean) {
    if (on === listening) return;
    listening = on;
    if (on) {
      document.addEventListener('pointerdown', onPointerDown, true);
      window.addEventListener('resize', place);
      window.addEventListener('scroll', onScroll, true);
    } else {
      document.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('resize', place);
      window.removeEventListener('scroll', onScroll, true);
    }
  }

  let raf = 0;
  watch(
    open,
    (isOpen) => {
      listen(isOpen);
      if (!isOpen) {
        box.value = null;
        return;
      }
      // The panel mounts with this same flush; measure it, then measure once
      // more after content settles — height changes the flip decision and
      // width changes the clamp.
      place();
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(place);
    },
    { flush: 'post', immediate: true },
  );

  onBeforeUnmount(() => {
    cancelAnimationFrame(raf);
    listen(false);
  });

  /** Fixed-position style for the panel, including the anchor transform. */
  const panelStyle = computed<CSSProperties>(() => ({
    top: `${box.value?.top ?? -9999}px`,
    left: `${box.value?.left ?? -9999}px`,
    minWidth: box.value?.minWidth ? `${box.value.minWidth}px` : undefined,
    maxHeight: box.value?.maxHeight ? `${box.value.maxHeight}px` : undefined,
    transform: `translate(${align === 'end' ? '-100%' : '0'}, ${
      box.value?.placement === 'top' ? '-100%' : '0'
    })`,
    opacity: box.value ? undefined : 0,
  }));

  return {
    open,
    setOpen,
    toggle: () => setOpen(!open.value),
    box,
    triggerRef,
    panelRef,
    place,
    panelStyle,
  };
}
