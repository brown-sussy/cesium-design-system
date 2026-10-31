<script setup lang="ts">
import { computed, ref, useId } from 'vue';
import { cx } from '../lib/cx';
import { useValue } from '../lib/useValue';

/**
 * A track, a fill and a thumb, all drawn by the system.
 *
 * The native range input renders a different widget in every engine and can
 * only be reached through `::-webkit-slider-thumb` / `::-moz-range-thumb`,
 * which means no ticks, no drag readout and no consistent hit area. This
 * builds the same affordance from a div with `role="slider"` and keeps the
 * keyboard model intact.
 */
const props = withDefaults(
  defineProps<{
    modelValue?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    /** Readout to the right of the track. */
    showValue?: boolean;
    formatValue?: (value: number) => string;
    /** Explicit marks under the track, in value units. */
    ticks?: number[];
    disabled?: boolean;
    /** Posts the value with a native form via a hidden input. */
    name?: string;
    /** Accessible name, when there is no visible Field label. */
    label?: string;
  }>(),
  { min: 0, max: 100, step: 1, showValue: false, disabled: false },
);

const emit = defineEmits<{ 'update:modelValue': [number] }>();

const uid = useId();
const { current, set } = useValue(
  () => props.modelValue,
  (value) => emit('update:modelValue', value),
  props.defaultValue ?? props.min,
);

const dragging = ref(false);
const trackRef = ref<HTMLDivElement | null>(null);

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const span = computed(() => props.max - props.min);
const pct = computed(() => (span.value === 0 ? 0 : ((current.value - props.min) / span.value) * 100));
const text = computed(() =>
  props.formatValue ? props.formatValue(current.value) : String(current.value),
);

function commit(next: number) {
  const snapped = clamp(
    props.min + Math.round((next - props.min) / props.step) * props.step,
    props.min,
    props.max,
  );
  const clean = Number(snapped.toFixed(6));
  if (clean === current.value) return;
  set(clean);
}

function fromClientX(clientX: number) {
  const r = trackRef.value?.getBoundingClientRect();
  if (!r || r.width === 0) return;
  commit(props.min + clamp((clientX - r.left) / r.width, 0, 1) * span.value);
}

function onPointerDown(e: PointerEvent) {
  if (props.disabled) return;
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  dragging.value = true;
  fromClientX(e.clientX);
  (e.currentTarget as HTMLElement).focus();
}

function onPointerMove(e: PointerEvent) {
  if (!dragging.value || props.disabled) return;
  fromClientX(e.clientX);
}

function endDrag(e: PointerEvent) {
  const el = e.currentTarget as HTMLElement;
  if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  dragging.value = false;
}

function onKeyDown(e: KeyboardEvent) {
  if (props.disabled) return;
  const big = props.step * 10;
  const map: Record<string, number> = {
    ArrowRight: current.value + props.step,
    ArrowUp: current.value + props.step,
    ArrowLeft: current.value - props.step,
    ArrowDown: current.value - props.step,
    PageUp: current.value + big,
    PageDown: current.value - big,
    Home: props.min,
    End: props.max,
  };
  if (!(e.key in map)) return;
  e.preventDefault();
  commit(map[e.key]);
}

const tickList = computed(() =>
  (props.ticks ?? []).filter((t) => t >= props.min && t <= props.max),
);
</script>

<template>
  <div
    :class="cx('cs-slider')"
    :data-dragging="dragging || undefined"
    :data-disabled="disabled || undefined"
  >
    <input v-if="name" type="hidden" :name="name" :value="current" />

    <div class="cs-slider__rail">
      <div
        ref="trackRef"
        class="cs-slider__track"
        role="slider"
        :tabindex="disabled ? -1 : 0"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-valuenow="current"
        :aria-valuetext="text"
        :aria-label="label"
        :aria-disabled="disabled || undefined"
        aria-orientation="horizontal"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="endDrag"
        @pointercancel="endDrag"
        @keydown="onKeyDown"
      >
        <span class="cs-slider__fill" :style="{ width: `${pct}%` }" />
        <span class="cs-slider__thumb" :style="{ left: `${pct}%` }">
          <span class="cs-slider__bubble" aria-hidden="true">{{ text }}</span>
        </span>
      </div>

      <div v-if="tickList.length > 0" class="cs-slider__ticks" aria-hidden="true">
        <span
          v-for="t in tickList"
          :key="t"
          class="cs-slider__tick"
          :data-on="t <= current || undefined"
          :style="{ left: `${((t - min) / (span || 1)) * 100}%` }"
        />
      </div>
    </div>

    <span v-if="showValue" :id="`cs-slider-val-${uid}`" class="cs-slider__value">{{ text }}</span>
  </div>
</template>
