<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../lib/cx';
import { fixed } from '../lib/format';
import type { DosePoint } from '../types';

/**
 * A four-parameter dose–response curve on a log x axis, with the measured
 * points and the IC50 marked. Log scale is not an option here: a linear axis
 * turns every dose–response plot into an L.
 */
const props = withDefaults(
  defineProps<{
    /** Half-maximal concentration, in the units of x. */
    ic50: number;
    /** Hill slope. 1 is the plain sigmoid. */
    hill?: number;
    top?: number;
    bottom?: number;
    points?: DosePoint[];
    xRange?: [number, number];
    height?: number;
    unit?: string;
    ariaLabel?: string;
  }>(),
  { hill: 1, top: 100, bottom: 0, points: () => [], height: 150 },
);

const W = 320;
const padL = 26;
const padR = 10;
const padT = 10;
const padB = 18;
const plotW = W - padL - padR;

const plotH = computed(() => props.height - padT - padB);
const x0 = computed(() => props.xRange?.[0] ?? props.ic50 / 100);
const x1 = computed(() => props.xRange?.[1] ?? props.ic50 * 100);
const l0 = computed(() => Math.log10(x0.value));
const l1 = computed(() => Math.log10(x1.value));

const xOf = (v: number) => padL + ((Math.log10(v) - l0.value) / (l1.value - l0.value)) * plotW;
const yOf = (v: number) => padT + plotH.value - (v / props.top) * plotH.value;

const curve = (x: number) => props.bottom + (props.top - props.bottom) / (1 + (props.ic50 / x) ** props.hill);

const path = computed(() => {
  const samples = Array.from({ length: 72 }, (_, i) => {
    const x = 10 ** (l0.value + ((l1.value - l0.value) * i) / 71);
    return `${i === 0 ? 'M' : 'L'} ${xOf(x).toFixed(2)} ${yOf(curve(x)).toFixed(2)}`;
  });
  return samples.join(' ');
});

const decades = computed(() => {
  const out: number[] = [];
  for (let e = Math.ceil(l0.value); e <= Math.floor(l1.value); e += 1) out.push(10 ** e);
  return out;
});

const gridValues = computed(() => [0, props.top / 2, props.top]);

const dots = computed(() =>
  props.points.map((point, i) => ({ i, cx: xOf(point.x), cy: yOf(point.y) })),
);

function tickLabel(v: number): string {
  if (v >= 1000) return `${v / 1000}k`;
  return String(v);
}

const summary = computed(
  () =>
    props.ariaLabel ?? `Dose response, IC50 ${props.ic50}${props.unit ? ` ${props.unit}` : ''}`,
);
</script>

<template>
  <div :class="cx('cs-dose')">
    <svg :viewBox="`0 0 ${W} ${height}`" role="img" :aria-label="summary">
      <g v-for="value in gridValues" :key="value">
        <line class="cs-dose__rule" :x1="padL" :x2="W - padR" :y1="yOf(value)" :y2="yOf(value)" />
        <text class="cs-dose__label" :x="padL - 5" :y="yOf(value) + 2.5" text-anchor="end">
          {{ fixed(value, 0) }}
        </text>
      </g>

      <line
        class="cs-dose__ic50"
        :x1="xOf(ic50)"
        :x2="xOf(ic50)"
        :y1="yOf(top)"
        :y2="yOf(0)"
      />
      <text class="cs-dose__label cs-dose__label--mark" :x="xOf(ic50) + 4" :y="yOf(top) + 8">
        IC50 {{ fixed(ic50, ic50 < 10 ? 1 : 0) }}{{ unit ? ` ${unit}` : '' }}
      </text>

      <path class="cs-dose__curve" :d="path" />

      <circle
        v-for="dot in dots"
        :key="dot.i"
        class="cs-dose__point"
        :cx="dot.cx"
        :cy="dot.cy"
        :r="2.2"
      />

      <line
        class="cs-dose__rule"
        :x1="padL"
        :x2="W - padR"
        :y1="padT + plotH"
        :y2="padT + plotH"
      />

      <text
        v-for="(value, i) in decades"
        :key="value"
        class="cs-dose__label"
        :x="xOf(value)"
        :y="height - 6"
        :text-anchor="i === 0 ? 'start' : i === decades.length - 1 ? 'end' : 'middle'"
      >
        {{ tickLabel(value) }}
      </text>
    </svg>
  </div>
</template>
