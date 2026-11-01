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

/**
 * `#title` is the rich form, matching `Field`'s `#label`: a heading that
 * carries a badge — "Danger zone" + "Irreversible" — is not a string.
 */
defineSlots<{ default?: () => unknown; title?: () => unknown; actions?: () => unknown }>();
</script>

<template>
  <div :class="cx('cs-panel', accent && 'cs-panel--accent', flush && 'cs-panel--flush')">
    <div v-if="title || $slots.title || $slots.actions" class="cs-panel__head">
      <div v-if="title || $slots.title" class="cs-panel__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.actions" class="cs-row" :style="{ gap: '2px' }">
        <slot name="actions" />
      </div>
    </div>
    <slot />
  </div>
</template>
