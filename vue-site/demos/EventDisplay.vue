<script setup lang="ts">
import { EventDisplay } from '../../vue';
import type { EventCalo, EventHit, EventTrack } from '../../vue';

/** One deterministic event — same picture every render. */
const tracks: EventTrack[] = [
  { angle: 14, length: 0.92, charge: 1 },
  { angle: 68, length: 0.78, charge: -1 },
  { angle: 121, length: 0.64, charge: 1 },
  { angle: 158, length: 0.48, charge: -1 },
  { angle: 204, length: 0.86, charge: 1 },
  { angle: 262, length: 0.55, charge: -1 },
  { angle: 318, length: 0.71, charge: 1 },
];

const hits: EventHit[] = [
  { x: 0.12, y: 0.18, r: 2 },
  { x: -0.22, y: 0.09, r: 2.6 },
  { x: 0.34, y: -0.28, r: 2.2 },
  { x: -0.41, y: -0.16, r: 1.8 },
  { x: 0.05, y: 0.44, r: 2.4 },
  { x: -0.08, y: -0.38, r: 2 },
];

const calorimeter: EventCalo[] = [
  { angle: 15, energy: 0.42 },
  { angle: 67, energy: 0.28 },
  { angle: 122, energy: 0.36 },
  { angle: 160, energy: 0.18 },
  { angle: 205, energy: 0.51 },
  { angle: 264, energy: 0.24 },
  { angle: 317, energy: 0.33 },
];
</script>

<template>
  <div style="display: flex; gap: 24px; align-items: center">
    <EventDisplay
      :tracks="tracks"
      :hits="hits"
      :calorimeter="calorimeter"
      label="Run 4128 · event 37"
      :size="240"
      aria-label="Transverse view of a collision event"
    />
    <EventDisplay :tracks="tracks" :size="120" />
  </div>
</template>
