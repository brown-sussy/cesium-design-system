<script setup lang="ts">
import { cx } from '../lib/cx';

const props = withDefaults(
  defineProps<{
    distance: number;
    unit?: string;
    width?: number;
    label?: string;
  }>(),
  { unit: 'km', width: 132 },
);
</script>

<template>
  <div
    :class="cx('cs-scalebar')"
    :style="{ '--cs-scalebar-w': `${width}px` }"
    :aria-label="`Scale: ${distance} ${unit}`"
  >
    <span class="cs-scalebar__label">{{ label ?? `${distance} ${unit}` }}</span>
    <div class="cs-scalebar__track">
      <span class="cs-scalebar__mid" />
    </div>
  </div>
</template>
