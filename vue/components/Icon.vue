<script setup lang="ts">
import { computed } from 'vue';
import { iconPaths, type IconName } from '../lib/icons';

/**
 * Icon set — 24px grid, 1.5px stroke, round caps.
 * Deliberately geometric: these read as instrumentation, not decoration.
 */
const props = withDefaults(
  defineProps<{
    name: IconName;
    size?: number;
    strokeWidth?: number;
  }>(),
  { size: 16, strokeWidth: 1.5 },
);

const paths = computed<readonly string[]>(() => iconPaths[props.name] ?? []);
</script>

<template>
  <svg
    class="cs-icon"
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    :style="{ width: `${size}px`, height: `${size}px`, flex: 'none' }"
  >
    <path v-for="(d, i) in paths" :key="i" :d="d" />
  </svg>
</template>
