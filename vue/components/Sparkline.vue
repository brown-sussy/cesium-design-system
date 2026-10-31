<script setup lang="ts">
import { computed, useId } from 'vue';
import { cx } from '../lib/cx';

const props = withDefaults(
  defineProps<{
    data: number[];
    width?: number;
    height?: number;
    area?: boolean;
    showDot?: boolean;
    color?: string;
  }>(),
  { width: 120, height: 32, area: true, showDot: false },
);

const uid = useId();
const gradientId = `cs-spark-${uid.replace(/:/g, '')}`;

const geometry = computed(() => {
  const data = props.data;
  if (data.length < 2) return null;

  const pad = 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = (props.width - pad * 2) / (data.length - 1);

  const points = data.map((value, i) => {
    const x = pad + i * step;
    const y = props.height - pad - ((value - min) / range) * (props.height - pad * 2);
    return [x, y] as const;
  });

  const line = points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(' ');
  const areaPath = `${line} L${(props.width - pad).toFixed(2)} ${props.height} L${pad} ${props.height} Z`;

  return { line, areaPath, last: points[points.length - 1] };
});
</script>

<template>
  <svg
    v-if="geometry"
    :class="cx('cs-spark')"
    :viewBox="`0 0 ${width} ${height}`"
    :width="width"
    :height="height"
    preserveAspectRatio="none"
    aria-hidden="true"
    :style="color ? ({ '--cs-accent': color } as never) : undefined"
  >
    <template v-if="area">
      <defs>
        <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--cs-accent)" stop-opacity="0.28" />
          <stop offset="100%" stop-color="var(--cs-accent)" stop-opacity="0" />
        </linearGradient>
      </defs>
      <path class="cs-spark__area" :d="geometry.areaPath" :fill="`url(#${gradientId})`" />
    </template>
    <path class="cs-spark__line" :d="geometry.line" />
    <circle
      v-if="showDot"
      class="cs-spark__dot"
      :cx="geometry.last[0]"
      :cy="geometry.last[1]"
      :r="2.5"
    />
  </svg>
</template>
