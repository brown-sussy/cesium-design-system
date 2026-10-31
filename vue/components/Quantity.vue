<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../lib/cx';
import { fixed, superscript } from '../lib/format';

/**
 * A measured value: digits, uncertainty, power of ten, unit. Every part is
 * tabular and monospace so a column of these lines up on the decimal point.
 */
const props = withDefaults(
  defineProps<{
    value: number | string;
    unit?: string;
    /** Absolute uncertainty, printed as ±. */
    uncertainty?: number | string;
    /** Decimal places applied to a numeric value and uncertainty. */
    precision?: number;
    /** Powers of ten, printed as ×10⁻⁹ rather than crammed into the value. */
    exponent?: number;
    size?: 'sm' | 'md' | 'lg';
  }>(),
  { size: 'md' },
);

function render(v: number | string, precision?: number): string {
  return typeof v === 'number' ? fixed(v, precision ?? 0) : v;
}

const main = computed(() => render(props.value, props.precision));
const pm = computed(() =>
  props.uncertainty === undefined ? '' : render(props.uncertainty, props.precision),
);
</script>

<template>
  <span :class="cx('cs-qty', size !== 'md' && `cs-qty--${size}`)">
    <span class="cs-qty__value">{{ main }}</span>
    <span v-if="exponent !== undefined" class="cs-qty__exp" :aria-label="`times ten to the ${exponent}`">
      ×10{{ superscript(exponent) }}
    </span>
    <span v-if="uncertainty !== undefined" class="cs-qty__pm">± {{ pm }}</span>
    <span v-if="unit" class="cs-qty__unit">{{ unit }}</span>
  </span>
</template>
