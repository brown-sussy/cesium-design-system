import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

export interface IndicatorBox {
  /** Offset from the container's left edge, in px. */
  x: number;
  /** Width of the active item, in px. */
  w: number;
}

/**
 * Measures the active child of a container so an absolutely positioned
 * overlay can slide to it. Re-measures on value change, resize, font load and
 * container resize.
 *
 * `inset` shrinks the box horizontally — kept for parity with the React
 * version, which uses it where the indicator sits inside an item's padding.
 */
export function useIndicator(activeKey: () => unknown, inset = 0) {
  const rootRef = ref<HTMLElement | null>(null);
  const box = ref<IndicatorBox | null>(null);

  function measure() {
    const root = rootRef.value;
    if (!root) return;
    const active = root.querySelector<HTMLElement>('[data-active="true"]');
    if (!active) return;
    const rootBox = root.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();
    box.value = {
      x: activeBox.left - rootBox.left + inset,
      w: Math.max(0, activeBox.width - inset * 2),
    };
  }

  watch(activeKey, () => nextTick(measure));

  let ro: ResizeObserver | undefined;
  onMounted(() => {
    // One paint after mount so the items have their final width.
    requestAnimationFrame(measure);
    ro = new ResizeObserver(measure);
    if (rootRef.value) ro.observe(rootRef.value);
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure).catch(() => undefined);
  });

  onBeforeUnmount(() => {
    ro?.disconnect();
    window.removeEventListener('resize', measure);
  });

  return { ref: rootRef, box };
}
