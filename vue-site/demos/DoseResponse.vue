<script setup lang="ts">
import { DoseResponse } from '../../vue';
import type { DosePoint } from '../../vue';

const points: DosePoint[] = [
  { x: 0.03, y: 98 },
  { x: 0.1, y: 95 },
  { x: 0.3, y: 88 },
  { x: 1, y: 71 },
  { x: 3, y: 44 },
  { x: 10, y: 18 },
  { x: 30, y: 7 },
  { x: 100, y: 3 },
];
</script>

<template>
  <div style="display: grid; gap: 22px; width: 100%; max-width: 460px">
    <DoseResponse :ic50="2.4" :hill="1.1" :points="points" unit="nM" aria-label="Dose response" />
    <DoseResponse :ic50="0.4" :hill="2.2" :height="120" unit="µM" />
  </div>
</template>
