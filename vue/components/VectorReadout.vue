<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../lib/cx';
import { fixed } from '../lib/format';

/**
 * Three components and, optionally, the magnitude. Each row is its own grid so
 * the numbers share a decimal column instead of drifting with the labels.
 */
const props = withDefaults(
  defineProps<{
    x: number;
    y: number;
    z?: number;
    unit?: string;
    /** Shown under the components, above a hairline. */
    magnitude?: number;
    precision?: number;
    labels?: [string, string, string];
  }>(),
  { precision: 1, labels: () => ['x', 'y', 'z'] as [string, string, string] },
);

const rows = computed<Array<[string, number]>>(() => {
  const list: Array<[string, number]> = [
    [props.labels[0], props.x],
    [props.labels[1], props.y],
  ];
  if (props.z !== undefined) list.push([props.labels[2], props.z]);
  return list;
});
</script>

<template>
  <div :class="cx('cs-vec')">
    <div v-for="[axis, value] in rows" :key="axis" class="cs-vec__row">
      <span class="cs-vec__axis">{{ axis }}</span>
      <span class="cs-vec__val">{{ fixed(value, precision) }}</span>
      <span v-if="unit" class="cs-vec__unit">{{ unit }}</span>
    </div>

    <div v-if="magnitude !== undefined" class="cs-vec__mag">
      <span class="cs-vec__axis">|v|</span>
      <span class="cs-vec__val">{{ fixed(magnitude, precision) }}</span>
      <span v-if="unit" class="cs-vec__unit">{{ unit }}</span>
    </div>
  </div>
</template>
