<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../lib/cx';

const props = withDefaults(
  defineProps<{
    /** Camera heading in degrees, 0 = north. */
    heading?: number;
    size?: number;
    showHeading?: boolean;
  }>(),
  { heading: 0, size: 72, showHeading: true },
);

const C = 36;

const TICKS = Array.from({ length: 24 }, (_, i) => i * 15);
const LABELS = [
  { text: 'N', angle: 0, cls: 'cs-compass__label--n' },
  { text: 'E', angle: 90, cls: '' },
  { text: 'S', angle: 180, cls: '' },
  { text: 'W', angle: 270, cls: '' },
];

const normalized = computed(() => ((props.heading % 360) + 360) % 360);
const showPlate = computed(() => props.showHeading && props.size >= 80);

function polar(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return [C + Math.cos(rad) * radius, C + Math.sin(rad) * radius] as const;
}

const ticks = computed(() =>
  TICKS.map((angle) => {
    const major = angle % 45 === 0;
    const [x1, y1] = polar(angle, major ? 26.5 : 28);
    const [x2, y2] = polar(angle, 31.5);
    return { angle, major, x1, y1, x2, y2 };
  }),
);

const labels = computed(() =>
  LABELS.map((label) => {
    const [x, y] = polar(label.angle, 21.5);
    return { ...label, x, y };
  }),
);
</script>

<template>
  <div
    :class="cx('cs-compass')"
    :style="{ '--cs-compass-size': `${size}px` }"
    role="img"
    :aria-label="`Compass, heading ${Math.round(normalized)} degrees`"
  >
    <span class="cs-compass__dial">
      <svg class="cs-compass__svg" viewBox="0 0 72 72">
        <circle class="cs-compass__ring" :cx="C" :cy="C" :r="33.5" />
        <circle class="cs-compass__inner" :cx="C" :cy="C" :r="17.5" />

        <!-- Card — fixed. Ticks and cardinal letters never move. -->
        <g class="cs-compass__card">
          <line
            v-for="tick in ticks"
            :key="tick.angle"
            :x1="tick.x1"
            :y1="tick.y1"
            :x2="tick.x2"
            :y2="tick.y2"
            :class="tick.major ? 'cs-compass__tick cs-compass__tick--major' : 'cs-compass__tick'"
          />
          <text
            v-for="label in labels"
            :key="label.text"
            :class="cx('cs-compass__label', label.cls)"
            :x="label.x"
            :y="label.y"
            text-anchor="middle"
            dominant-baseline="central"
          >
            {{ label.text }}
          </text>
        </g>

        <!-- Needle — the only thing that turns. It tracks north, so it
             rotates by the negative of the camera heading. -->
        <g class="cs-compass__needle" :style="{ transform: `rotate(${-normalized}deg)` }">
          <polygon class="cs-compass__needle-n" points="36,19.5 38.6,32.8 36,30.9 33.4,32.8" />
          <polygon class="cs-compass__needle-s" points="36,52.5 38.6,39.2 36,41.1 33.4,39.2" />
        </g>

        <circle class="cs-compass__hub" :cx="C" :cy="C" :r="2.1" />
      </svg>
    </span>
    <span v-if="showPlate" class="cs-compass__heading">
      {{ String(Math.round(normalized)).padStart(3, '0') }}°
    </span>
  </div>
</template>
