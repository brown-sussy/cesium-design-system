<script setup lang="ts">
import { cx } from '../lib/cx';

withDefaults(
  defineProps<{
    variant?: 'text' | 'circle' | 'rect';
    width?: number | string;
    height?: number | string;
  }>(),
  { variant: 'text' },
);
</script>

<template>
  <span
    aria-hidden="true"
    :class="cx('cs-skeleton', variant !== 'rect' && `cs-skeleton--${variant}`)"
    :style="{ width, height }"
  />
</template>
