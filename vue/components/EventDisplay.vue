<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../lib/cx';
import type { EventCalo, EventHit, EventTrack } from '../types';

/**
 * A transverse view of one collision: tracker layers, charged tracks from the
 * vertex, and calorimeter towers. Geometry only — no simulation, no randomness,
 * so the same event always draws the same picture.
 */
const props = withDefaults(
  defineProps<{
    tracks?: EventTrack[];
    hits?: EventHit[];
    calorimeter?: EventCalo[];
    label?: string;
    size?: number;
    ariaLabel?: string;
  }>(),
  { tracks: () => [], hits: () => [], calorimeter: () => [] },
);

const S = 240;
const C = S / 2;
const TRACKER = [26, 44, 62];
const CALO_INNER = 78;
const CALO_OUTER = 96;

const rad = (deg: number) => (deg * Math.PI) / 180;

const towers = computed(() =>
  props.calorimeter.map((tower, i) => {
    const a = rad(tower.angle);
    const r2 = CALO_INNER + Math.min(Math.max(tower.energy, 0), 1) * (CALO_OUTER - CALO_INNER);
    return {
      i,
      x1: C + Math.cos(a) * (CALO_INNER + 1),
      y1: C - Math.sin(a) * (CALO_INNER + 1),
      x2: C + Math.cos(a) * r2,
      y2: C - Math.sin(a) * r2,
    };
  }),
);

const dots = computed(() =>
  props.hits.map((hit, i) => ({
    i,
    cx: C + hit.x * CALO_OUTER,
    cy: C - hit.y * CALO_OUTER,
    r: hit.r ?? 1.1,
  })),
);

const tracks = computed(() =>
  props.tracks.map((track, i) => {
    const a = rad(track.angle);
    const r = TRACKER[0] + Math.min(Math.max(track.length, 0), 1) * (CALO_INNER - TRACKER[0]);
    const ex = C + Math.cos(a) * r;
    const ey = C - Math.sin(a) * r;
    const charge = track.charge ?? 0;
    const bend = charge * 9;
    const mx = (C + ex) / 2 + Math.sin(a) * bend;
    const my = (C + ey) / 2 + Math.cos(a) * bend;
    return { i, charge, d: `M ${C} ${C} Q ${mx} ${my} ${ex} ${ey}` };
  }),
);

const summary = computed(
  () => props.ariaLabel ?? `Event display with ${props.tracks.length} tracks`,
);
</script>

<template>
  <svg
    :class="cx('cs-event')"
    :viewBox="`0 0 ${S} ${S}`"
    :width="size"
    :height="size"
    role="img"
    :aria-label="summary"
  >
    <!-- beam axis -->
    <line
      class="cs-event__ring"
      :x1="8"
      :x2="S - 8"
      :y1="C"
      :y2="C"
      stroke-dasharray="2 4"
    />

    <circle v-for="r in TRACKER" :key="r" class="cs-event__ring" :cx="C" :cy="C" :r="r" />
    <circle class="cs-event__ring cs-event__ring--detector" :cx="C" :cy="C" :r="CALO_INNER" />
    <circle class="cs-event__ring cs-event__ring--detector" :cx="C" :cy="C" :r="CALO_OUTER" />

    <line
      v-for="tower in towers"
      :key="`t-${tower.i}`"
      class="cs-event__calo"
      :x1="tower.x1"
      :y1="tower.y1"
      :x2="tower.x2"
      :y2="tower.y2"
      :stroke-width="3.2"
    />

    <circle
      v-for="hit in dots"
      :key="`h-${hit.i}`"
      class="cs-event__hit"
      :cx="hit.cx"
      :cy="hit.cy"
      :r="hit.r"
    />

    <path
      v-for="track in tracks"
      :key="`k-${track.i}`"
      :class="
        cx(
          'cs-event__track',
          track.charge < 0 && 'cs-event__track--negative',
          track.charge === 0 && 'cs-event__track--neutral',
        )
      "
      :d="track.d"
    />

    <circle class="cs-event__vertex" :cx="C" :cy="C" :r="1.8" />

    <text v-if="label" class="cs-event__label" :x="8" :y="13">{{ label }}</text>
  </svg>
</template>
