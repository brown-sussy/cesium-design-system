<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../lib/cx';
import { fixed } from '../lib/format';
import type { HistogramBin } from '../types';

/**
 * Binned counts as a static SVG. No animation, no tooltip layer: a histogram in
 * an instrument panel is read at a glance, and every pixel of interaction is a
 * pixel that can lag behind the data.
 */
const props = withDefaults(
  defineProps<{
    bins: HistogramBin[];
    height?: number;
    /** Log-scaled counts — the only way a spectrum with a 10⁴ dynamic range reads. */
    log?: boolean;
    unit?: string;
    marker?: number;
    ariaLabel?: string;
  }>(),
  { height: 120, log: false },
);

const W = 320;
const padL = 30;
const padR = 6;
const padT = 8;
const padB = 18;
const plotW = W - padL - padR;

const plotH = computed(() => props.height - padT - padB);
const n = computed(() => props.bins.length);
const peak = computed(() => Math.max(1, ...props.bins.map((b) => b.count)));
const top = computed(() => scale(peak.value));
const total = computed(() => props.bins.reduce((sum, b) => sum + b.count, 0));

const barW = computed(() => plotW / Math.max(n.value, 1));
const gap = computed(() => (barW.value > 6 ? 1 : barW.value > 3 ? 0.6 : 0.3));

const first = computed(() => props.bins[0]?.x0 ?? 0);
const last = computed(() => props.bins[n.value - 1]?.x1 ?? 1);
const span = computed(() => last.value - first.value);
const dp = computed(() =>
  span.value >= 100 ? 0 : span.value >= 10 ? 0 : span.value >= 1 ? 1 : 2,
);

function scale(c: number) {
  return props.log ? Math.log10(c + 1) : c;
}

const yOf = (count: number) => padT + plotH.value - (scale(count) / top.value) * plotH.value;
const xOf = (v: number) => padL + ((v - first.value) / (span.value || 1)) * plotW;

const gridValues = computed(() => [0, peak.value / 2, peak.value]);
const xTicks = computed(() => [
  props.bins[0]?.x0 ?? 0,
  props.bins[Math.floor(n.value / 2)]?.x0 ?? 0,
  last.value,
]);

const bars = computed(() =>
  props.bins.map((bin) => ({
    x0: bin.x0,
    count: bin.count,
    x: padL + (bin.x0 - first.value) * (plotW / (span.value || 1)),
    y: yOf(bin.count),
    w: Math.max(barW.value - gap.value, 0.5),
    h: Math.max(padT + plotH.value - yOf(bin.count), 0),
  })),
);

const summary = computed(
  () =>
    props.ariaLabel ??
    `Histogram of ${n.value} bins, ${total.value} events${props.unit ? `, ${props.unit}` : ''}`,
);

const tickText = (value: number) =>
  fixed(props.log ? Math.round(10 ** scale(value) - 1) : value, 0);
</script>

<template>
  <div :class="cx('cs-hist')">
    <div class="cs-hist__frame">
      <svg :viewBox="`0 0 ${W} ${height}`" role="img" :aria-label="summary">
        <g v-for="value in gridValues" :key="value">
          <line class="cs-hist__grid" :x1="padL" :x2="W - padR" :y1="yOf(value)" :y2="yOf(value)" />
          <text class="cs-hist__tick" :x="padL - 5" :y="yOf(value) + 2.5" text-anchor="end">
            {{ tickText(value) }}
          </text>
        </g>

        <rect
          v-for="bar in bars"
          :key="bar.x0"
          class="cs-hist__bar"
          :data-empty="bar.count === 0 || undefined"
          :x="bar.x"
          :y="bar.y"
          :width="bar.w"
          :height="bar.h"
        />

        <template v-if="marker !== undefined">
          <line
            class="cs-hist__marker"
            :x1="xOf(marker)"
            :x2="xOf(marker)"
            :y1="padT"
            :y2="padT + plotH"
          />
          <text class="cs-hist__marker-label" :x="xOf(marker) + 3" :y="padT + 7" text-anchor="start">
            {{ fixed(marker, dp) }}
          </text>
        </template>

        <line
          class="cs-hist__axis"
          :x1="padL"
          :x2="W - padR"
          :y1="padT + plotH"
          :y2="padT + plotH"
        />

        <text
          v-for="(tick, i) in xTicks"
          :key="tick"
          class="cs-hist__tick"
          :x="xOf(tick)"
          :y="height - 6"
          :text-anchor="i === 0 ? 'start' : i === xTicks.length - 1 ? 'end' : 'middle'"
        >
          {{ fixed(tick, dp) }}
        </text>
      </svg>
    </div>

    <div class="cs-hist__foot">
      <span>{{ n }} bins{{ unit ? ` · ${unit}` : '' }}</span>
      <span>{{ fixed(total, 0) }} events</span>
    </div>
  </div>
</template>
