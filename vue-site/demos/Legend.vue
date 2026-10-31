<script setup lang="ts">
import { Legend } from '../../vue';
import type { LegendItem } from '../../vue';

const inline: LegendItem[] = [
  { label: 'Imagery', value: '62%', color: 'var(--cs-accent)' },
  { label: 'Terrain', value: '28%', color: 'var(--cs-success)' },
  { label: 'Overlay', value: '10%', color: 'var(--cs-warning)' },
];

const column: LegendItem[] = [
  { label: 'Mean', shape: 'line', color: 'var(--cs-accent)' },
  { label: 'p95', shape: 'line', color: 'var(--cs-warning)' },
  { label: 'Outliers', shape: 'circle', color: 'var(--cs-danger)' },
];
</script>

<template>
  <div style="display: grid; gap: 22px; justify-items: start">
    <Legend :items="inline" />
    <Legend :items="column" column />
  </div>
</template>
