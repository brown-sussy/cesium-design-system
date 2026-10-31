<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../lib/cx';

const props = withDefaults(
  defineProps<{
    value?: number;
    max?: number;
    label?: string;
    tone?: 'accent' | 'success' | 'warning' | 'danger';
    indeterminate?: boolean;
    thin?: boolean;
    showValue?: boolean;
    formatValue?: (value: number, max: number) => string;
  }>(),
  { value: 0, max: 100, tone: 'accent', indeterminate: false, thin: false, showValue: false },
);

const pct = computed(() => Math.max(0, Math.min(100, (props.value / props.max) * 100)));
const text = computed(() =>
  props.formatValue ? props.formatValue(props.value, props.max) : `${Math.round(pct.value)}%`,
);
</script>

<template>
  <div
    :class="
      cx(
        'cs-progress',
        tone !== 'accent' && `cs-progress--${tone}`,
        indeterminate && 'cs-progress--indeterminate',
        thin && 'cs-progress--thin',
      )
    "
  >
    <div v-if="label || showValue" class="cs-progress__meta">
      <span v-if="label">{{ label }}</span>
      <span v-if="showValue && !indeterminate" class="cs-progress__value">{{ text }}</span>
    </div>
    <div
      class="cs-progress__track"
      role="progressbar"
      :aria-valuenow="indeterminate ? undefined : Math.round(value)"
      :aria-valuemin="0"
      :aria-valuemax="max"
    >
      <div class="cs-progress__bar" :style="{ width: `${pct}%` }" />
    </div>
  </div>
</template>
