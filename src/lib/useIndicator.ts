import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export interface IndicatorBox {
  /** Offset from the container's left edge, in px. */
  x: number;
  /** Width of the active item, in px. */
  w: number;
}

/**
 * Measures the active child of a container so an absolutely positioned
 * overlay can slide to it. Re-measures on value change, resize and font load.
 *
 * `inset` shrinks the box horizontally — used by the tab underline, which sits
 * inside the tab's padding rather than spanning its full width.
 */
export function useIndicator<T extends HTMLElement = HTMLDivElement>(
  activeKey: unknown,
  inset = 0,
) {
  const ref = useRef<T>(null);
  const [box, setBox] = useState<IndicatorBox | null>(null);

  const measure = useCallback(() => {
    const root = ref.current;
    if (!root) return;
    const active = root.querySelector<HTMLElement>('[data-active="true"]');
    if (!active) return;
    const rootBox = root.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();
    setBox({
      x: activeBox.left - rootBox.left + inset,
      w: Math.max(0, activeBox.width - inset * 2),
    });
  }, [inset]);

  useLayoutEffect(measure, [measure, activeKey]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(measure).catch(() => undefined);
    }
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  return { ref, box };
}
