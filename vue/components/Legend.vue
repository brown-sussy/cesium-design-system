<script setup lang="ts">
import { cx } from '../lib/cx';
import type { LegendItem } from '../types';

withDefaults(defineProps<{ items: LegendItem[]; column?: boolean }>(), {
  items: () => [],
  column: false,
});
</script>

<template>
  <ul :class="cx('cs-legend', column && 'cs-legend--column')">
    <li v-for="(item, i) in items" :key="i" class="cs-legend__item">
      <span
        :class="cx('cs-legend__swatch', item.shape === 'line' && 'cs-legend__swatch--line')"
        :style="{
          background: item.color ?? 'var(--cs-accent)',
          borderRadius: item.shape === 'circle' ? '50%' : undefined,
        }"
        aria-hidden="true"
      />
      {{ item.label }}
      <span v-if="item.value !== undefined" class="cs-legend__value">{{ item.value }}</span>
    </li>
  </ul>
</template>
