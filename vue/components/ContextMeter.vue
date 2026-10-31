<script setup lang="ts">
import { computed } from 'vue';
import { cx } from '../lib/cx';
import { compactCount } from '../lib/format';
import type { ContextSegment } from '../types';

/**
 * How much of the context window is spent, split by what spent it. The bar is
 * scaled to the limit, not to the used total — an empty half means room left.
 */
const props = withDefaults(
  defineProps<{
    segments: ContextSegment[];
    /** Context window size, in tokens. */
    limit: number;
    label?: string;
    showLegend?: boolean;
  }>(),
  { label: 'Context', showLegend: true },
);

const used = computed(() => props.segments.reduce((sum, s) => sum + s.tokens, 0));
const raw = computed(() => (props.limit > 0 ? (used.value / props.limit) * 100 : 0));
const scale = computed(() => (raw.value > 100 ? 100 / raw.value : 1));

function widthOf(seg: ContextSegment) {
  return `${Math.min((seg.tokens / props.limit) * 100 * scale.value, 100)}%`;
}
</script>

<template>
  <div :class="cx('cs-ctx')">
    <div class="cs-ctx__head">
      <span>{{ label }}</span>
      <span class="cs-ctx__value">{{ compactCount(used) }} / {{ compactCount(limit) }}</span>
    </div>

    <div
      class="cs-ctx__bar"
      role="img"
      :aria-label="`${compactCount(used)} of ${compactCount(limit)} tokens used: ${segments
        .map((s) => `${s.label} ${compactCount(s.tokens)}`)
        .join(', ')}`"
    >
      <span
        v-for="seg in segments"
        :key="seg.label"
        class="cs-ctx__seg"
        :data-tone="seg.tone ?? 'neutral'"
        :style="{ width: widthOf(seg) }"
      />
    </div>

    <div v-if="showLegend" class="cs-ctx__legend">
      <span
        v-for="seg in segments"
        :key="seg.label"
        class="cs-ctx__key"
        :data-tone="seg.tone ?? 'neutral'"
      >
        <i aria-hidden="true" />
        {{ seg.label }} {{ compactCount(seg.tokens) }}
      </span>
    </div>
  </div>
</template>
