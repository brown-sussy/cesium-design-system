<script setup lang="ts">
import { ContextMeter } from '../../vue';
import type { ContextSegment } from '../../vue';

const segments: ContextSegment[] = [
  { label: 'System', tokens: 1800, tone: 'neutral' },
  { label: 'Tools', tokens: 4200, tone: 'accent' },
  { label: 'Retrieved', tokens: 9600, tone: 'success' },
  { label: 'History', tokens: 5400, tone: 'warning' },
  { label: 'Free', tokens: 18400, tone: 'neutral' },
];

const tight: ContextSegment[] = [
  { label: 'System', tokens: 1800 },
  { label: 'Retrieved', tokens: 22000, tone: 'accent' },
  { label: 'History', tokens: 14800, tone: 'danger' },
];
</script>

<template>
  <div style="display: grid; gap: 24px; width: 100%; max-width: 420px">
    <ContextMeter :segments="segments" :limit="39400" label="Context window" show-legend />
    <ContextMeter :segments="tight" :limit="40000" label="Nearly full" :show-legend="false" />
  </div>
</template>
