import { computed, ref, type ComputedRef } from 'vue';

/**
 * Controlled-if-bound, uncontrolled-if-not — the same contract React's
 * `value` / `defaultValue` pair gives, expressed the Vue way.
 *
 * `v-model` binds a prop that is always defined, so the fallback branch only
 * runs when the prop is omitted entirely (`<CsSlider :default-value="20" />`).
 */
export function useValue<T>(
  read: () => T | undefined,
  write: (value: T) => void,
  fallback: T,
): { current: ComputedRef<T>; set: (value: T) => void } {
  const inner = ref(fallback) as { value: T };

  const current = computed<T>(() => {
    const bound = read();
    return bound === undefined ? inner.value : bound;
  });

  function set(value: T) {
    if (read() === undefined) inner.value = value;
    write(value);
  }

  return { current, set };
}
