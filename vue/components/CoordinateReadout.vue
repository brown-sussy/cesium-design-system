<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../lib/cx';

const props = withDefaults(
  defineProps<{
    lat: number;
    lon: number;
    alt?: number;
    precision?: number;
    altUnit?: string;
    accentAlt?: boolean;
  }>(),
  { precision: 4, altUnit: 'm', accentAlt: true },
);

function fmt(value: number, precision: number, pos: string, neg: string) {
  const hemisphere = value >= 0 ? pos : neg;
  return `${Math.abs(value).toFixed(precision)}° ${hemisphere}`;
}

const lat = computed(() => fmt(props.lat, props.precision, 'N', 'S'));
const lon = computed(() => fmt(props.lon, props.precision, 'E', 'W'));
const alt = computed(() =>
  props.alt === undefined
    ? ''
    : props.alt.toLocaleString('en-US', { maximumFractionDigits: 0 }),
);
</script>

<template>
  <div :class="cx('cs-coords')" aria-label="Camera position">
    <div class="cs-coords__item">
      <span class="cs-coords__key">Lat</span>
      <span class="cs-coords__value">{{ lat }}</span>
    </div>
    <div class="cs-coords__item">
      <span class="cs-coords__key">Lon</span>
      <span class="cs-coords__value">{{ lon }}</span>
    </div>
    <div v-if="alt !== ''" class="cs-coords__item">
      <span class="cs-coords__key">Alt</span>
      <span :class="cx('cs-coords__value', accentAlt && 'cs-coords__value--accent')">
        {{ alt }} {{ altUnit }}
      </span>
    </div>
  </div>
</template>
