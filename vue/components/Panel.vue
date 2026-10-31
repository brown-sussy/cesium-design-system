<script setup lang="ts">
import { cx } from '../lib/cx';

withDefaults(
  defineProps<{
    title?: string;
    accent?: boolean;
    flush?: boolean;
  }>(),
  { accent: false, flush: false },
);
</script>

<template>
  <div :class="cx('cs-panel', accent && 'cs-panel--accent', flush && 'cs-panel--flush')">
    <div v-if="title || $slots.actions" class="cs-panel__head">
      <div v-if="title" class="cs-panel__title">{{ title }}</div>
      <div v-if="$slots.actions" class="cs-row" :style="{ gap: '2px' }">
        <slot name="actions" />
      </div>
    </div>
    <slot />
  </div>
</template>
